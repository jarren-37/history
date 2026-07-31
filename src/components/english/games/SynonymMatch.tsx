"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Word } from "@/content/english/types";
import { shuffle, sample } from "@/lib/english/quizgen";
import { useApp } from "@/lib/english/store";
import { playChime } from "@/lib/sound";
import { Confetti } from "@/components/english/ui";

const ROUND = 5;

interface RightItem {
  wordId: string;
  text: string;
}

export function SynonymMatch({ pool }: { pool: Word[] }) {
  const { recordAnswer } = useApp();
  const [seed, setSeed] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  const words = useMemo(
    () =>
      sample(pool, Math.min(ROUND, pool.length), (w) => w.synonyms.length === 0),
    // Capture the pool once per round (keyed on seed). Matching records a
    // review, which changes the pool prop; depending on it would reshuffle the
    // board mid-round.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed]
  );
  const lefts = useMemo(() => shuffle(words), [words]);
  const rights = useMemo<RightItem[]>(
    () =>
      shuffle(
        words.map((w) => ({ wordId: w.id, text: shuffle(w.synonyms)[0] }))
      ),
    [words]
  );

  const done = matched.size === words.length && words.length > 0;

  function reset() {
    setSelected(null);
    setMatched(new Set());
    setWrong(null);
    setAttempts(0);
    setSeed((s) => s + 1);
  }

  function pickRight(item: RightItem) {
    if (!selected || matched.has(item.wordId)) return;
    setAttempts((a) => a + 1);
    if (item.wordId === selected) {
      playChime(true);
      recordAnswer(item.wordId, true);
      setMatched((m) => new Set(m).add(item.wordId));
      setSelected(null);
    } else {
      playChime(false);
      setWrong(item.wordId);
      setTimeout(() => setWrong(null), 400);
    }
  }

  if (done) {
    const perfect = attempts === words.length;
    return (
      <div className="page page-frame relative overflow-hidden p-8 text-center">
        <Confetti count={28} />
        <div className="relative">
          <div className="text-5xl">🔗</div>
          <h2 className="mt-3 font-display text-3xl font-black text-ink">
            All matched!
          </h2>
          <p className="mt-2 font-hand text-2xl text-[var(--c-deep)]">
            {perfect
              ? "Flawless — not a single mismatch!"
              : `Solved in ${attempts} tries. Well linked!`}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={reset}
              className="rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-6 py-3 font-display font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105"
            >
              Play again
            </button>
            <a
              href="/english/games"
              className="rounded-full border-2 border-[var(--gold)] px-6 py-3 font-display font-bold text-[var(--c-deep)] transition-transform hover:scale-105"
            >
              Back to games
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-frame p-5 sm:p-7">
      <p className="mb-4 text-center text-ink-soft">
        Tap a <strong className="text-ink">word</strong>, then tap its closest{" "}
        <strong className="text-ink">synonym</strong>.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {/* words */}
        <div className="space-y-2.5">
          {lefts.map((w) => {
            const isMatched = matched.has(w.id);
            const isSel = selected === w.id;
            return (
              <button
                key={w.id}
                disabled={isMatched}
                onClick={() => setSelected(isSel ? null : w.id)}
                className={`flex w-full items-center gap-2 rounded-xl border-2 px-3 py-3 text-left font-bold transition-all ${
                  isMatched
                    ? "border-emerald-500 bg-emerald-500/15 text-emerald-800 opacity-70"
                    : isSel
                      ? "border-[var(--gold)] bg-[var(--c-surface)] text-ink"
                      : "border-[var(--border)] bg-[var(--parch)] text-ink hover:-translate-y-0.5 hover:border-[var(--c-primary)]"
                }`}
              >
                <span aria-hidden>{isMatched ? "✓" : w.motif}</span>
                {w.word}
              </button>
            );
          })}
        </div>
        {/* synonyms */}
        <div className="space-y-2.5">
          {rights.map((item) => {
            const isMatched = matched.has(item.wordId);
            const isWrong = wrong === item.wordId;
            return (
              <motion.button
                key={item.wordId}
                disabled={isMatched}
                onClick={() => pickRight(item)}
                animate={isWrong ? { x: [0, -6, 6, -4, 0] } : {}}
                className={`flex w-full items-center rounded-xl border-2 px-3 py-3 text-left font-semibold transition-all ${
                  isMatched
                    ? "border-emerald-500 bg-emerald-500/15 text-emerald-800 opacity-70"
                    : isWrong
                      ? "border-rose-500 bg-rose-500/15 text-rose-800"
                      : "border-[var(--border)] bg-[var(--parch)] text-ink hover:-translate-y-0.5 hover:border-[var(--c-primary)]"
                }`}
              >
                {item.text}
              </motion.button>
            );
          })}
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-ink-faint">
        {matched.size}/{words.length} pairs linked
      </div>
    </div>
  );
}
