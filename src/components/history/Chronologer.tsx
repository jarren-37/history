"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TIMELINE, type TimelineEvent } from "@/content/history/timeline";
import { getPalette } from "@/content/history/palettes";
import { useApp } from "@/lib/history/store";
import { playChime, playPageTurn, playDiscovery } from "@/lib/sound";
import { Confetti } from "./ui";

const BEST_KEY = "chronicle:chronologer";

/** One event per distinct year, so any subset is unambiguously orderable. */
const POOL: TimelineEvent[] = (() => {
  const seen = new Set<number>();
  const out: TimelineEvent[] = [];
  for (const e of TIMELINE) {
    if (!seen.has(e.year)) {
      seen.add(e.year);
      out.push(e);
    }
  }
  return out;
})();

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function roundSize(roundIdx: number): number {
  return Math.min(4 + roundIdx, 7);
}

interface Round {
  cards: TimelineEvent[]; // stable base order (chronological)
  order: number[]; // display permutation of indices into cards
}

/** Deterministic first round so SSR and first client render agree. */
function initialRound(): Round {
  const cards = POOL.slice(0, 4).sort((a, b) => a.year - b.year);
  return { cards, order: cards.map((_, i) => i) };
}

function makeRound(roundIdx: number): Round {
  const size = roundSize(roundIdx);
  const cards = shuffled(POOL).slice(0, size).sort((a, b) => a.year - b.year);
  // shuffle the display order, but never hand back the already-solved order
  let order = shuffled(cards.map((_, i) => i));
  let guard = 0;
  while (order.every((v, i) => v === i) && guard++ < 8) {
    order = shuffled(cards.map((_, i) => i));
  }
  return { cards, order };
}

export function Chronologer() {
  const { hydrated } = useApp();
  const pal = getPalette("neutral");

  const [roundIdx, setRoundIdx] = useState(0);
  const [round, setRound] = useState<Round>(initialRound);
  const [checked, setChecked] = useState(false);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);

  // Build the first real (shuffled) round after mount; load best streak.
  useEffect(() => {
    setRound(makeRound(0));
    try {
      const raw = window.localStorage.getItem(BEST_KEY);
      if (raw) setBest(parseInt(raw, 10) || 0);
    } catch {
      /* storage unavailable — non-fatal */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayed = round.order.map((i) => round.cards[i]);
  const solved = useMemo(
    () => [...round.cards].sort((a, b) => a.year - b.year),
    [round]
  );
  const correctFlags = displayed.map((e, i) => e.year === solved[i].year);
  const perfect = checked && correctFlags.every(Boolean);
  const rightCount = correctFlags.filter(Boolean).length;

  function move(pos: number, dir: -1 | 1) {
    if (checked) return;
    setRound((r) => {
      const target = pos + dir;
      if (target < 0 || target >= r.order.length) return r;
      const order = [...r.order];
      [order[pos], order[target]] = [order[target], order[pos]];
      return { ...r, order };
    });
    playPageTurn();
  }

  function check() {
    if (checked) return;
    setChecked(true);
    const ok = displayed.every((e, i) => e.year === solved[i].year);
    playChime(ok);
    if (ok) {
      playDiscovery();
      setStreak((s) => {
        const ns = s + 1;
        setBest((b) => {
          const nb = Math.max(b, ns);
          try {
            window.localStorage.setItem(BEST_KEY, String(nb));
          } catch {
            /* non-fatal */
          }
          return nb;
        });
        return ns;
      });
    } else {
      setStreak(0);
    }
  }

  function nextRound() {
    const ni = roundIdx + 1;
    setRoundIdx(ni);
    setRound(makeRound(ni));
    setChecked(false);
  }

  function retry() {
    // reshuffle the same-size round for another attempt
    setRound(makeRound(roundIdx));
    setChecked(false);
  }

  return (
    <div
      className="mx-auto max-w-2xl px-4 pb-24 pt-6 sm:px-6"
      style={
        {
          ["--c-primary" as string]: pal.primary,
          ["--c-secondary" as string]: pal.secondary,
          ["--c-deep" as string]: pal.deep,
          ["--c-surface" as string]: pal.surface,
        } as React.CSSProperties
      }
    >
      <Link
        href="/history/timeline"
        className="mb-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#e8cfa0] transition-colors hover:text-[#fff2d8]"
      >
        ← The Timeline
      </Link>

      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--c-primary)]">
          ⏳ The Chronologer · 2261
        </span>
        <h1 className="mt-4 gold-text font-display text-4xl font-black sm:text-5xl">
          Restore the Chronicle
        </h1>
        <p className="mx-auto mt-3 max-w-lg font-serif text-[#e4cfa2]">
          The pages have scattered out of order. Arrange the events from earliest
          to latest, then check your work against history itself.
        </p>
        <div className="mt-4 flex justify-center gap-3 text-sm font-bold">
          <span className="rounded-full bg-[var(--c-surface)] px-4 py-1.5 text-[var(--c-deep)]">
            🔥 Streak {streak}
          </span>
          <span className="rounded-full bg-[var(--c-surface)] px-4 py-1.5 text-[var(--c-deep)]">
            🏅 Best {hydrated ? best : 0}
          </span>
          <span className="rounded-full bg-[var(--c-surface)] px-4 py-1.5 text-[var(--c-deep)]">
            {displayed.length} fragments
          </span>
        </div>
      </div>

      <div className="relative mt-6 space-y-2.5">
        {perfect && <Confetti count={30} />}
        <div className="mb-1 flex items-center justify-between px-1 text-[11px] font-bold uppercase tracking-widest text-[#c9a86a]">
          <span>⤒ Earliest</span>
          <span>Latest ⤓</span>
        </div>

        {displayed.map((e, pos) => {
          const ok = correctFlags[pos];
          let border = "var(--border)";
          if (checked) border = ok ? "#2f8f83" : "#c0574e";
          return (
            <motion.div
              key={e.id}
              layout
              data-testid="chrono-card"
              transition={{ type: "spring", stiffness: 500, damping: 34 }}
              className="page flex items-center gap-3 rounded-2xl border-2 p-3 sm:p-4"
              style={{ borderColor: border }}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--c-surface)] text-xl">
                {e.icon ?? "📜"}
              </span>
              <div className="min-w-0 flex-1">
                <div data-testid="chrono-title" className="truncate font-display font-bold text-[var(--ink)]">
                  {e.title}
                </div>
                <AnimatePresence>
                  {checked && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="overflow-hidden text-sm font-semibold"
                      style={{ color: ok ? "#2f8f83" : "#c0574e" }}
                    >
                      {e.dateLabel ?? e.year} {ok ? "✓" : "✗"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {!checked && (
                <div className="flex shrink-0 flex-col gap-1">
                  <button
                    onClick={() => move(pos, -1)}
                    disabled={pos === 0}
                    aria-label={`Move ${e.title} earlier`}
                    className="grid h-7 w-7 place-items-center rounded-lg border border-[var(--border)] bg-[var(--c-surface)] text-[var(--c-deep)] transition-transform hover:scale-110 disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => move(pos, 1)}
                    disabled={pos === displayed.length - 1}
                    aria-label={`Move ${e.title} later`}
                    className="grid h-7 w-7 place-items-center rounded-lg border border-[var(--border)] bg-[var(--c-surface)] text-[var(--c-deep)] transition-transform hover:scale-110 disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        {!checked ? (
          <button
            onClick={check}
            className="rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-8 py-3 font-display text-lg font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            Check the order
          </button>
        ) : (
          <div>
            <p className="font-display text-2xl font-black gold-text">
              {perfect
                ? "Perfectly ordered!"
                : `${rightCount} of ${displayed.length} in the right place`}
            </p>
            <p className="mx-auto mt-1 max-w-md font-serif text-[#e4cfa2]">
              {perfect
                ? "The Chronicle is whole again. On to the next fragments."
                : "History remembers a different order. Study the dates and try again."}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {perfect ? (
                <button
                  onClick={nextRound}
                  className="rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-7 py-3 font-display font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105"
                >
                  Next fragments →
                </button>
              ) : (
                <button
                  onClick={retry}
                  className="rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-7 py-3 font-display font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105"
                >
                  New fragments
                </button>
              )}
              <Link
                href="/history/timeline"
                className="rounded-full border-2 border-[var(--border)] px-7 py-3 font-display font-bold text-[#e8cfa0] transition-transform hover:scale-105"
              >
                Study the timeline
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
