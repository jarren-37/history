"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MCQuestion } from "@/lib/quizgen";
import { speak, playChime } from "@/lib/sound";

/**
 * A single multiple-choice question with instant feedback. Controlled from the
 * outside: reports the outcome via `onAnswered`, then reveals a Next button.
 */
export function MCQuestionCard({
  q,
  onAnswered,
  onNext,
  nextLabel = "Next →",
  speakWord = false,
}: {
  q: MCQuestion;
  onAnswered: (correct: boolean) => void;
  onNext: () => void;
  nextLabel?: string;
  speakWord?: boolean;
}) {
  const [picked, setPicked] = useState<number | null>(null);

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === q.answer;
    playChime(correct);
    if (speakWord) speak(q.word.word);
    onAnswered(correct);
  }

  const revealed = picked !== null;

  return (
    <div className="page page-frame p-5 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <p className="font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
          {q.prompt}
        </p>
        <span className="shrink-0 text-3xl" aria-hidden>
          {q.word.motif}
        </span>
      </div>

      <div className="mt-5 grid gap-2.5">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answer;
          const isPicked = picked === i;
          let cls =
            "border-[var(--border)] bg-[var(--parch)] hover:border-[var(--c-primary)] hover:-translate-y-0.5";
          if (revealed && isAnswer)
            cls = "border-emerald-600 bg-emerald-500/15 text-emerald-900";
          else if (revealed && isPicked)
            cls = "border-rose-600 bg-rose-500/15 text-rose-900";
          else if (revealed) cls = "border-[var(--border)] opacity-55";
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={revealed}
              className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-[15px] font-semibold text-ink transition-all ${cls}`}
            >
              <span>{opt}</span>
              {revealed && isAnswer && <span aria-hidden>✓</span>}
              {revealed && isPicked && !isAnswer && <span aria-hidden>✗</span>}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-between gap-3"
          >
            <p className="text-sm text-ink-soft">
              {picked === q.answer ? (
                <span className="font-bold text-emerald-800">
                  Correct! “{q.word.word}” — {q.word.meaning}
                </span>
              ) : (
                <span className="font-bold text-rose-800">
                  The answer is “{q.word.word}” — {q.word.meaning}
                </span>
              )}
            </p>
            <button
              onClick={onNext}
              className="shrink-0 rounded-full bg-[var(--c-primary)] px-5 py-2 font-bold text-white transition-transform hover:scale-105 active:scale-95"
            >
              {nextLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
