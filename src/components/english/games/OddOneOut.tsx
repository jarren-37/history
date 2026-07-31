"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Word } from "@/content/english/types";
import { shuffle, sample } from "@/lib/english/quizgen";
import { useApp } from "@/lib/english/store";
import { playChime } from "@/lib/sound";
import { Confetti } from "@/components/english/ui";

const ROUND = 6;

interface Puzzle {
  word: Word;
  tiles: string[];
  odd: string; // the antonym — the odd one out
  answerIdx: number;
}

export function OddOneOut({ pool }: { pool: Word[] }) {
  const { addXp, recordAnswer } = useApp();
  const [seed, setSeed] = useState(0);
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const puzzles = useMemo<Puzzle[]>(() => {
    const picks = sample(
      pool,
      ROUND,
      (w) => w.synonyms.length < 2 || w.antonyms.length < 1
    );
    return picks.map((w) => {
      const syns = shuffle(w.synonyms).slice(0, 2);
      const belong = new Set([w.word, ...syns].map((s) => s.toLowerCase()));
      const odd =
        shuffle(w.antonyms).find((a) => !belong.has(a.toLowerCase())) ??
        w.antonyms[0];
      const tiles = shuffle([w.word, ...syns, odd]);
      return { word: w, tiles, odd, answerIdx: tiles.indexOf(odd) };
    });
    // Capture the pool once per round (keyed on seed only). Answering records a
    // review, which changes the pool prop; without this the puzzles would
    // regenerate and the tiles would reshuffle mid-round.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  const puzzle = puzzles[pos];

  function pick(i: number) {
    if (picked !== null || !puzzle) return;
    setPicked(i);
    const correct = i === puzzle.answerIdx;
    playChime(correct);
    recordAnswer(puzzle.word.id, correct);
    if (correct) {
      setScore((s) => s + 1);
      addXp(10);
    }
  }

  function next() {
    if (pos + 1 >= puzzles.length) {
      setDone(true);
      return;
    }
    setPos((p) => p + 1);
    setPicked(null);
  }

  function reset() {
    setPos(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setSeed((s) => s + 1);
  }

  if (puzzles.length === 0) {
    return (
      <div className="page page-frame p-8 text-center">
        <div className="text-5xl">🧩</div>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          Discover a few more words with clear opposites, then come back to sort
          the misfits.
        </p>
      </div>
    );
  }

  if (done) {
    const perfect = score === puzzles.length;
    return (
      <div className="page page-frame relative overflow-hidden p-8 text-center">
        <Confetti count={28} />
        <div className="relative">
          <div className="text-5xl">🧩</div>
          <h2 className="mt-3 font-display text-3xl font-black text-ink">
            {score}/{puzzles.length} misfits spotted
          </h2>
          <p className="mt-2 font-hand text-2xl text-[var(--c-deep)]">
            {perfect ? "A sharp eye for meaning!" : "Nicely sorted — keep training that ear."}
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
    <div>
      <div className="mb-3 text-center text-sm font-bold text-ink-soft">
        Puzzle {pos + 1} of {puzzles.length}
      </div>
      <div className="page page-frame p-5 sm:p-7">
        <p className="text-center text-ink-soft">
          Three of these are <strong className="text-ink">close in meaning</strong>.
          Tap the <strong className="text-ink">odd one out</strong>.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {puzzle.tiles.map((t, i) => {
            const show = picked !== null;
            const isAns = i === puzzle.answerIdx;
            let cls =
              "border-[var(--border)] bg-[var(--parch)] text-ink hover:-translate-y-0.5 hover:border-[var(--c-primary)]";
            if (show && isAns) cls = "border-emerald-500 bg-emerald-500/15 text-emerald-800";
            else if (show && picked === i) cls = "border-rose-500 bg-rose-500/15 text-rose-800";
            else if (show) cls = "border-[var(--border)] bg-[var(--parch)] text-ink opacity-60";
            return (
              <motion.button
                key={t}
                data-testid="misfit-tile"
                disabled={show}
                onClick={() => pick(i)}
                animate={show && picked === i && !isAns ? { x: [0, -6, 6, -4, 0] } : {}}
                className={`rounded-xl border-2 px-4 py-3.5 text-center font-display text-lg font-bold transition-all ${cls}`}
              >
                {t}
                {show && isAns && " ✓"}
                {show && picked === i && !isAns && " ✗"}
              </motion.button>
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
              <p className="mt-4 text-center text-sm text-ink-soft">
                {picked === puzzle.answerIdx ? "✅ " : "Not quite — "}
                <strong className="text-ink">“{puzzle.odd}”</strong> is the opposite;
                the others all sit close to{" "}
                <strong className="text-ink">“{puzzle.word.word}”</strong>.
              </p>
              <div className="mt-3 text-center">
                <button
                  onClick={next}
                  className="rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-7 py-2.5 font-display font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105"
                >
                  {pos + 1 >= puzzles.length ? "See results →" : "Next puzzle →"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 text-center text-sm text-ink-faint">
        Spotted: {score}/{puzzles.length}
      </div>
    </div>
  );
}
