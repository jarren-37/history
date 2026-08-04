"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { NewsItem, NewsResponse } from "@/lib/news/types";
import { CATEGORY_ORDER, DEFAULT_CATEGORY } from "@/content/news/sources";

type Status = "loading" | "ready" | "empty" | "error";

function timeAgo(ms: number): string {
  if (!ms) return "";
  const s = Math.floor((Date.now() - ms) / 1000);
  if (s < 45) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(ms).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

export function Feed() {
  const [status, setStatus] = useState<Status>("loading");
  const [items, setItems] = useState<NewsItem[]>([]);
  const [sources, setSources] = useState<NewsResponse["sources"]>([]);
  const [reason, setReason] = useState("");
  const [cat, setCat] = useState<string>(DEFAULT_CATEGORY);
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/news", { cache: "no-store" });
      const data: NewsResponse = await res.json();
      setSources(data.sources ?? []);
      if (data.ok && data.items?.length) {
        setItems(data.items);
        setActive(0);
        // Open on Asia when there are Asia stories; otherwise show everything.
        const hasDefault = data.items.some((it) => it.category === DEFAULT_CATEGORY);
        setCat(hasDefault ? DEFAULT_CATEGORY : "All");
        setStatus("ready");
      } else {
        setReason(data.reason ?? "No live headlines right now.");
        setStatus("empty");
      }
    } catch {
      setReason("Couldn't reach the news service. Check your connection and try again.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Category chips present in the fetched stories, in a sensible order.
  const categories = useMemo(() => {
    const present = new Set(items.map((it) => it.category));
    const ordered = CATEGORY_ORDER.filter((c) => present.has(c));
    const extras = [...present].filter((c) => !CATEGORY_ORDER.includes(c)).sort();
    return ["All", ...ordered, ...extras];
  }, [items]);

  const filtered = useMemo(
    () => (cat === "All" ? items : items.filter((it) => it.category === cat)),
    [items, cat]
  );

  // Track which card is centred in the viewport.
  useEffect(() => {
    if (status !== "ready") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        }
      },
      { root: scrollerRef.current, threshold: 0.6 }
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [status, filtered]);

  // Reset to the top when the category changes.
  useEffect(() => {
    setActive(0);
    scrollerRef.current?.scrollTo({ top: 0 });
  }, [cat]);

  const go = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(filtered.length - 1, i));
      cardRefs.current[clamped]?.scrollIntoView({ behavior: "smooth" });
    },
    [filtered.length]
  );

  // Keyboard navigation between stories.
  useEffect(() => {
    if (status !== "ready") return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        go(active + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        go(active - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, active, go]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#08080b] text-white">
      {/* Top bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 bg-gradient-to-b from-black/85 via-black/45 to-transparent px-4 pb-8 pt-3 sm:px-6">
        <div className="pointer-events-auto mx-auto flex max-w-3xl items-center gap-3">
          <Link
            href="/"
            aria-label="Back to The Athenaeum"
            title="The Athenaeum"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/20 text-lg transition-transform hover:scale-105 active:scale-95"
          >
            🏛️
          </Link>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-black tracking-tight">📰 The Gazette</span>
            <span className="hidden text-xs text-white/50 sm:inline">Asia &amp; the world, one swipe at a time</span>
          </div>
          <div className="ml-auto flex items-center gap-3 text-xs font-semibold text-white/70">
            {status === "ready" && (
              <span className="tabular-nums" data-testid="gazette-counter">
                {filtered.length ? active + 1 : 0} / {filtered.length}
              </span>
            )}
            <button
              onClick={load}
              aria-label="Refresh headlines"
              title="Refresh"
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/20 text-base transition-transform hover:scale-105 active:scale-95"
            >
              ⟳
            </button>
          </div>
        </div>

        {/* Category chips */}
        {status === "ready" && categories.length > 1 && (
          <div className="pointer-events-auto mx-auto mt-2 flex max-w-3xl gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]{display:none}">
            {categories.map((c) => {
              const on = c === cat;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  data-testid="gazette-chip"
                  aria-pressed={on}
                  className={`shrink-0 rounded-full px-3.5 py-1 text-sm font-bold transition-colors ${
                    on ? "bg-white text-black" : "border border-white/25 text-white/75 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        )}

        {status === "ready" && filtered.length > 0 && (
          <div className="mx-auto mt-2 h-0.5 max-w-3xl overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-white/70 transition-[width] duration-300"
              style={{ width: `${((active + 1) / filtered.length) * 100}%` }}
            />
          </div>
        )}
      </div>

      {status === "loading" && (
        <div className="grid h-[100dvh] place-items-center">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="mx-auto text-4xl"
            >
              📰
            </motion.div>
            <p className="mt-3 text-white/60">Gathering today&apos;s headlines…</p>
          </div>
        </div>
      )}

      {(status === "empty" || status === "error") && (
        <div className="grid h-[100dvh] place-items-center px-6 text-center">
          <div className="max-w-md">
            <div className="text-6xl">📰</div>
            <h1 className="mt-4 font-display text-3xl font-black">The Gazette is quiet</h1>
            <p className="mt-3 leading-relaxed text-white/70">{reason}</p>
            {sources.length > 0 && (
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {sources.map((s) => (
                  <a
                    key={s.key}
                    href={s.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border px-3 py-1 text-xs font-bold"
                    style={{ borderColor: `color-mix(in srgb, ${s.accent} 55%, transparent)`, color: "#fff" }}
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            )}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={load}
                className="rounded-full bg-white px-6 py-3 font-display font-extrabold text-black transition-transform hover:scale-105"
              >
                Try again
              </button>
              <Link
                href="/"
                className="rounded-full border-2 border-white/30 px-6 py-3 font-display font-bold text-white transition-transform hover:scale-105"
              >
                Back to the Athenaeum
              </Link>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-white/40">
              Live news needs these newsrooms to be reachable from the app&apos;s network. Nothing here is
              ever invented — if the feeds can&apos;t be reached, the page stays empty rather than showing
              made-up stories.
            </p>
          </div>
        </div>
      )}

      {status === "ready" && (
        <div
          ref={scrollerRef}
          data-testid="gazette-scroller"
          className="h-[100dvh] snap-y snap-mandatory overflow-y-scroll overscroll-contain scroll-smooth"
        >
          {filtered.length === 0 ? (
            <div className="grid h-[100dvh] place-items-center px-6 text-center">
              <div>
                <div className="text-5xl">🗺️</div>
                <p className="mt-3 text-white/70">No {cat} stories in this refresh.</p>
                <button
                  onClick={() => setCat("All")}
                  className="mt-4 rounded-full bg-white px-5 py-2.5 font-display font-extrabold text-black transition-transform hover:scale-105"
                >
                  Show all headlines
                </button>
              </div>
            </div>
          ) : (
            filtered.map((it, i) => (
              <StoryCard key={it.id} item={it} index={i} refCb={(el) => (cardRefs.current[i] = el)} />
            ))
          )}

          {/* scroll hint on the first story */}
          {active === 0 && filtered.length > 1 && (
            <motion.div
              aria-hidden
              className="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex justify-center"
              animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
                Swipe up for more ↑
              </span>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

function StoryCard({
  item,
  index,
  refCb,
}: {
  item: NewsItem;
  index: number;
  refCb: (el: HTMLElement | null) => void;
}) {
  const [imgOk, setImgOk] = useState(true);
  const rel = timeAgo(item.publishedAt);

  return (
    <section
      ref={refCb}
      data-idx={index}
      data-testid="gazette-card"
      className="relative flex h-[100dvh] snap-start snap-always flex-col justify-end overflow-hidden"
    >
      {/* base accent wash (also the fallback when there's no/broken image) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 80% 0%, color-mix(in srgb, ${item.accent} 45%, #08080b), #08080b 70%)`,
        }}
      />
      {item.image && imgOk && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt=""
          loading="lazy"
          onError={() => setImgOk(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* legibility gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(4,4,7,0.96) 0%, rgba(4,4,7,0.82) 34%, rgba(4,4,7,0.35) 62%, rgba(4,4,7,0.15) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide text-white"
            style={{ background: item.accent }}
          >
            <span className="grid h-4 min-w-4 place-items-center rounded-full bg-white/25 px-1 text-[9px] leading-none">
              {item.sourceShort}
            </span>
            {item.source}
          </span>
          <span className="rounded-full border border-white/25 px-2.5 py-1 text-[11px] font-bold text-white/80">
            {item.category}
          </span>
          {rel && <span className="text-[11px] font-semibold text-white/55">{rel}</span>}
        </div>

        <h2
          className="mt-3 font-display text-[26px] font-black leading-[1.12] drop-shadow sm:text-4xl"
          style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {item.title}
        </h2>

        {item.summary && (
          <p
            className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:text-base"
            style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          >
            {item.summary}
          </p>
        )}

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="gazette-read"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display text-sm font-extrabold text-black shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          Read full story on {item.source} ↗
        </a>
      </div>
    </section>
  );
}
