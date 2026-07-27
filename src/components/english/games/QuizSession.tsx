"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { MCQuestion } from "@/lib/english/quizgen";
import { MCQuestionCard } from "@/components/english/MCQuestionCard";
import { Confetti } from "@/components/english/ui";

/**
 * Runs a fixed list of multiple-choice questions with a progress bar and a
 * celebratory summary. Reports each outcome via `onResult`, and the tally to
 * `onComplete` (useful for awarding XP once at the end).
 */
export function QuizSession({
  questions,
  onResult,
  onComplete,
  finishHref = "/english/games",
  onReplay,
}: {
  questions: MCQuestion[];
  onResult?: (q: MCQuestion, correct: boolean) => void;
  onComplete?: (correct: number, total: number) => void;
  finishHref?: string;
  onReplay?: () => void;
}) {
  const [pos, setPos] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);

  const q = questions[pos];

  function handleAnswered(ok: boolean) {
    if (answered) return;
    setAnswered(true);
    if (ok) setCorrect((c) => c + 1);
    if (q) onResult?.(q, ok);
  }

  function handleNext() {
    if (pos + 1 >= questions.length) {
      setDone(true);
      onComplete?.(correct, questions.length);
    } else {
      setPos((p) => p + 1);
      setAnswered(false);
    }
  }

  if (done) {
    const pct = Math.round((correct / questions.length) * 100);
    return (
      <div className="page page-frame relative overflow-hidden p-8 text-center">
        <Confetti count={28} />
        <div className="relative">
          <div className="text-5xl">{pct === 100 ? "🌟" : pct >= 60 ? "🎉" : "📖"}</div>
          <h2 className="mt-3 font-display text-3xl font-black text-ink">
            {correct}/{questions.length} correct
          </h2>
          <p className="mt-2 font-hand text-2xl text-[var(--c-deep)]">
            {pct === 100
              ? "Flawless! A true wordsmith."
              : pct >= 60
                ? "Nicely done!"
                : "Good effort — every round makes you sharper."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {onReplay && (
              <button
                onClick={() => {
                  setPos(0);
                  setCorrect(0);
                  setAnswered(false);
                  setDone(false);
                  onReplay();
                }}
                className="rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-6 py-3 font-display font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105"
              >
                Play again
              </button>
            )}
            <a
              href={finishHref}
              className="rounded-full border-2 border-[var(--gold)] px-6 py-3 font-display font-bold text-[var(--c-deep)] transition-transform hover:scale-105"
            >
              Back to games
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--ink)_12%,transparent)]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b]"
            animate={{ width: `${(pos / questions.length) * 100}%` }}
          />
        </div>
        <span className="t-desk text-sm font-bold">
          {pos + 1}/{questions.length}
        </span>
      </div>
      <MCQuestionCard
        key={pos}
        q={q}
        onAnswered={handleAnswered}
        onNext={handleNext}
        nextLabel={pos + 1 >= questions.length ? "Finish" : "Next →"}
      />
    </div>
  );
}
