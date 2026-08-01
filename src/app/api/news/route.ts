import { NextResponse } from "next/server";
import { NEWS_SOURCES, type FeedSource } from "@/content/news/sources";
import { parseFeed } from "@/lib/news/parse";
import type { NewsItem, NewsResponse } from "@/lib/news/types";

/**
 * The Gazette feed endpoint.
 *
 * Fetches each trusted outlet's RSS server-side (no CORS), parses it, and
 * merges the newest stories. Every item links back to the original article —
 * nothing is rewritten or invented. If no outlet is reachable (e.g. the hosts
 * aren't in the environment's egress allow-list), it returns ok:false with an
 * honest reason instead of any placeholder content.
 */
export const runtime = "nodejs";
export const revalidate = 900; // seconds — refresh the cache every 15 minutes

const PER_FEED = 12;
const TOTAL = 60;
const TIMEOUT_MS = 8000;

function hashId(url: string): string {
  let h = 2166136261;
  for (let i = 0; i < url.length; i++) {
    h ^= url.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

interface FeedResult {
  url: string;
  items: NewsItem[];
  ok: boolean;
}

async function loadFeed(src: FeedSource, feed: FeedSource["feeds"][number]): Promise<FeedResult> {
  try {
    const res = await fetch(feed.url, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; AthenaeumGazette/1.0)",
        accept:
          "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
      next: { revalidate },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return { url: feed.url, items: [], ok: false };
    const xml = await res.text();
    const items: NewsItem[] = parseFeed(xml)
      .slice(0, src.perFeedCap ?? PER_FEED)
      .map((r) => ({
        id: hashId(r.link),
        title: r.title,
        summary: r.summary,
        url: r.link,
        source: src.name,
        sourceKey: src.key,
        sourceShort: src.short,
        accent: src.accent,
        category: feed.category,
        image: r.image,
        publishedAt: r.publishedAt,
      }));
    return { url: feed.url, items, ok: true };
  } catch {
    return { url: feed.url, items: [], ok: false };
  }
}

export async function GET() {
  const jobs: Promise<FeedResult>[] = [];
  for (const src of NEWS_SOURCES) {
    for (const feed of src.feeds) jobs.push(loadFeed(src, feed));
  }
  const results = await Promise.all(jobs);

  const seen = new Set<string>();
  const merged: NewsItem[] = [];
  for (const r of results) {
    for (const it of r.items) {
      if (!it.url || seen.has(it.id)) continue;
      seen.add(it.id);
      merged.push(it);
    }
  }
  merged.sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));

  const items = merged.slice(0, TOTAL);
  const failed = results.filter((r) => !r.ok).map((r) => r.url);
  const sources = NEWS_SOURCES.map((s) => ({
    key: s.key,
    name: s.name,
    short: s.short,
    accent: s.accent,
    homepage: s.homepage,
  }));
  const ok = items.length > 0;

  const body: NewsResponse = {
    ok,
    items,
    sources,
    fetchedAt: Date.now(),
    failed,
    reason: ok
      ? undefined
      : "No live headlines could be reached right now. The Gazette streams real stories from trusted newsrooms; they'll appear here once the app can reach them.",
  };

  return NextResponse.json(body, {
    headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" },
  });
}
