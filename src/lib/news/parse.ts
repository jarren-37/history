/**
 * A small, dependency-free RSS 2.0 / Atom parser.
 *
 * It is deliberately forgiving: it extracts <item>/<entry> blocks and pulls the
 * fields we need, skipping anything malformed rather than throwing. It parses
 * feed markup only — it never fabricates content.
 */

export interface RawFeedItem {
  title: string;
  link: string;
  summary: string;
  image?: string;
  /** Epoch ms, or 0 if the feed gave no parseable date. */
  publishedAt: number;
}

const NAMED: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  ldquo: "“", rdquo: "”", lsquo: "‘", rsquo: "’",
  hellip: "…", mdash: "—", ndash: "–", copy: "©",
};

function stripCdata(s: string): string {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
}

function decodeEntities(s: string): string {
  return s.replace(/&(#x?[0-9a-f]+|[a-z0-9]+);/gi, (m, e: string) => {
    const key = e.toLowerCase();
    if (key[0] === "#") {
      const code = key[1] === "x" ? parseInt(key.slice(2), 16) : parseInt(key.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return NAMED[key] ?? m;
  });
}

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, " ");
}

function clean(s: string, max: number): string {
  let out = decodeEntities(stripTags(stripCdata(s))).replace(/\s+/g, " ").trim();
  if (out.length > max) out = out.slice(0, max - 1).trimEnd() + "…";
  return out;
}

function escapeRe(n: string): string {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Inner text of the first matching tag (tries each name in order). */
function tagContent(block: string, names: string[]): string | null {
  for (const n of names) {
    const t = escapeRe(n);
    const m = block.match(new RegExp(`<${t}(?:\\s[^>]*)?>([\\s\\S]*?)</${t}>`, "i"));
    if (m && m[1] != null) return m[1];
  }
  return null;
}

/** A named attribute from the first matching (possibly self-closing) tag. */
function tagAttr(block: string, names: string[], attr: string): string | null {
  for (const n of names) {
    const t = escapeRe(n);
    const m = block.match(new RegExp(`<${t}\\b[^>]*?\\b${attr}\\s*=\\s*["']([^"']+)["']`, "i"));
    if (m) return decodeEntities(m[1]);
  }
  return null;
}

function getLink(block: string): string {
  // RSS: <link>https://…</link>
  const rss = block.match(/<link>\s*([\s\S]*?)\s*<\/link>/i);
  if (rss && /^https?:\/\//i.test(rss[1].trim())) return decodeEntities(rss[1].trim());
  // Atom: <link href="…" rel="alternate"/> — prefer alternate, never "self".
  let fallback = "";
  for (const m of block.matchAll(/<link\b([^>]*?)\/?>/gi)) {
    const attrs = m[1];
    const href = attrs.match(/href\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!href) continue;
    const rel = attrs.match(/rel\s*=\s*["']([^"']+)["']/i)?.[1];
    if (rel === "self") continue;
    if (rel === "alternate" || !rel) return decodeEntities(href);
    if (!fallback) fallback = href;
  }
  return fallback ? decodeEntities(fallback) : "";
}

function getImage(block: string): string | undefined {
  const media = tagAttr(block, ["media:content", "media:thumbnail"], "url");
  if (media) return media;
  const enclImg = block.match(/<enclosure\b[^>]*\btype\s*=\s*["']image\/[^"']*["'][^>]*>/i)?.[0];
  if (enclImg) {
    const u = enclImg.match(/url\s*=\s*["']([^"']+)["']/i)?.[1];
    if (u) return decodeEntities(u);
  }
  const encl = tagAttr(block, ["enclosure"], "url");
  if (encl && /\.(jpe?g|png|webp|gif)(\?|$)/i.test(encl)) return encl;
  const desc = tagContent(block, ["content:encoded", "description", "summary", "content"]) || "";
  const img = stripCdata(desc).match(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i)?.[1];
  return img ? decodeEntities(img) : undefined;
}

export function parseFeed(xml: string): RawFeedItem[] {
  const items: RawFeedItem[] = [];
  for (const m of xml.matchAll(/<(item|entry)\b[\s\S]*?<\/\1>/gi)) {
    const b = m[0];
    const title = clean(tagContent(b, ["title"]) || "", 200);
    const link = getLink(b);
    if (!title || !link) continue;
    const summary = clean(
      tagContent(b, ["description", "summary", "content:encoded", "content"]) || "",
      320
    );
    const dateStr = (tagContent(b, ["pubDate", "published", "updated", "dc:date"]) || "").trim();
    const t = dateStr ? Date.parse(decodeEntities(stripCdata(dateStr))) : NaN;
    items.push({
      title,
      link,
      summary,
      image: getImage(b),
      publishedAt: Number.isFinite(t) ? t : 0,
    });
  }
  return items;
}
