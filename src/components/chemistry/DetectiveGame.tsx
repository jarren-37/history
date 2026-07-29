"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAtelier } from "@/lib/chemistry/store";
import { QUAL_CASES, type QualCase } from "@/content/chemistry/qualitative";
import { playChime, playBubble } from "@/lib/sound";
import { SciPanel, StationTopBar, SciConfetti } from "@/components/science/ui";

const XP_PER = 15;
const ROUND = 10;

interface Card {
  c: QualCase;
  opts: string[];
  ans: number;
}

/** Fisher–Yates — only ever called client-side (inside effects/handlers). */
function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): Card[] {
  return shuffled(QUAL_CASES)
    .slice(0, Math.min(ROUND, QUAL_CASES.length))
    .map((c) => {
      const opts = shuffled(c.options);
      return { c, opts, ans: opts.indexOf(c.answer) };
    });
}

/** Deterministic first deck so SSR and first client render agree. */
function initialDeck(): Card[] {
  return QUAL_CASES.slice(0, Math.min(ROUND, QUAL_CASES.length)).map((c) => ({
    c,
    opts: c.options,
    ans: c.options.indexOf(c.answer),
  }));
}

export function DetectiveGame() {
  const { addXp } = useAtelier();
  const [deck, setDeck] = useState<Card[]>(initialDeck);
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [seed, setSeed] = useState(0);

  // Reshuffle after mount (and on replay) — never during SSR.
  useEffect(() => {
    setDeck(buildDeck());
    setPos(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  }, [seed]);

  const card = deck[pos];

  function pick(i: number) {
    if (picked !== null || !card) return;
    setPicked(i);
    const correct = i === card.ans;
    playChime(correct);
    if (correct) {
      setScore((s) => s + 1);
      addXp(XP_PER);
    }
  }

  function next() {
    if (pos + 1 >= deck.length) {
      setFinished(true);
      return;
    }
    setPos((p) => p + 1);
    setPicked(null);
    playBubble();
  }

  if (finished) {
    const perfect = score === deck.length;
    return (
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
        <StationTopBar backHref="/chemistry/games" backLabel="Games room" />
        <SciPanel className="relative overflow-hidden text-center">
          <SciConfetti count={28} />
          <div className="relative">
            <div className="text-5xl">🔬</div>
            <h2 className="mt-2 font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>
              {perfect ? "A flawless investigation!" : "Case closed"}
            </h2>
            <p className="mt-2 opacity-85" style={{ color: "var(--sci-ink)" }}>
              You identified {score} of {deck.length} unknowns. +{score * XP_PER} XP.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSeed((s) => s + 1)}
                className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105"
                style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}
              >
                New cases
              </button>
              <Link
                href="/chemistry/games"
                className="rounded-full border-2 px-6 py-3 font-display font-bold"
                style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}
              >
                Games room
              </Link>
            </div>
          </div>
        </SciPanel>
      </div>
    );
  }

  if (!card) return null;
  const kindLabel = card.c.kind === "gas" ? "Unknown gas" : card.c.kind === "anion" ? "Unknown anion" : "Unknown cation";

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/chemistry/games" backLabel="Games room" />
      <div className="mb-4 flex items-center gap-3">
        <span className="text-4xl">🔬</span>
        <div>
          <h1 className="font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>
            Test Tube Detective
          </h1>
          <p className="opacity-80" style={{ color: "var(--sci-ink)" }}>
            Case {pos + 1} of {deck.length}
          </p>
        </div>
      </div>

      <SciPanel>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch">
          {/* test tube */}
          <div className="flex shrink-0 flex-col items-center justify-end">
            <div className="relative h-40 w-16">
              <div
                className="absolute inset-x-0 bottom-0 rounded-b-full rounded-t-md border-2"
                style={{ borderColor: "var(--sci-border)", height: "100%", background: "color-mix(in srgb, var(--sci-ink) 6%, transparent)" }}
              />
              <motion.div
                key={card.c.id}
                className="absolute inset-x-[3px] bottom-[3px] rounded-b-full"
                initial={{ height: "18%" }}
                animate={{ height: "62%" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ background: card.c.color, boxShadow: `0 0 18px ${card.c.color}` }}
              />
            </div>
            <div className="mt-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--sci-accent)" }}>
              {kindLabel}
            </div>
          </div>

          {/* clue */}
          <div className="flex-1">
            <div className="text-[11px] font-bold uppercase tracking-widest opacity-70" style={{ color: "var(--sci-ink)" }}>
              You add
            </div>
            <p className="font-display text-lg font-bold" style={{ color: "var(--sci-ink)" }}>
              {card.c.reagent}
            </p>
            <div className="mt-3 text-[11px] font-bold uppercase tracking-widest opacity-70" style={{ color: "var(--sci-ink)" }}>
              You observe
            </div>
            <p className="italic" style={{ color: "var(--sci-ink)" }}>
              {card.c.observation}
            </p>
          </div>
        </div>

        <div className="mt-5 text-center font-display font-bold" style={{ color: "var(--sci-ink)" }}>
          Which is present?
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {card.opts.map((opt, i) => {
            const show = picked !== null;
            const isAns = i === card.ans;
            let border = "var(--sci-border)";
            let bg = "transparent";
            if (show && isAns) {
              border = "#4bbf7a";
              bg = "rgba(75,191,122,0.15)";
            } else if (show && picked === i) {
              border = "#f43f5e";
              bg = "rgba(244,63,94,0.15)";
            }
            return (
              <button
                key={opt}
                onClick={() => pick(i)}
                disabled={show}
                className="rounded-xl border-2 px-4 py-3 text-left font-display text-lg font-bold transition-transform enabled:hover:scale-[1.02]"
                style={{ borderColor: border, background: bg, color: "var(--sci-ink)" }}
              >
                {opt}
                {show && isAns && " ✓"}
                {show && picked === i && !isAns && " ✗"}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {picked !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-sm opacity-90" style={{ color: "var(--sci-ink)" }}>
                {picked === card.ans ? "✅ " : "Not quite — "}
                {card.c.explain}
              </p>
              <button
                onClick={next}
                className="mt-4 rounded-full px-6 py-2.5 font-display font-extrabold shadow-lg transition-transform hover:scale-105"
                style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}
              >
                {pos + 1 >= deck.length ? "See results →" : "Next case →"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </SciPanel>

      <div className="mt-3 text-sm opacity-70" style={{ color: "var(--sci-ink)" }}>
        Solved: {score}/{deck.length}
      </div>
    </div>
  );
}
