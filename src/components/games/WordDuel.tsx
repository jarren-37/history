"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Word } from "@/content/types";
import { reviewQuestion, type MCQuestion } from "@/lib/quizgen";
import { useApp } from "@/lib/store";
import { playChime } from "@/lib/sound";
import { Confetti } from "@/components/ui";

const DURATION = 45;

type Phase = "idle" | "play" | "done";

export function WordDuel({ pool }: { pool: Word[] }) {
  const { recordAnswer } = useApp();
  const [phase, setPhase] = useState<Phase>("idle");
  const [time, setTime] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [best, setBest] = useState(0);
  const [q, setQ] = useState<MCQuestion | null>(null);
  const [locked, setLocked] = useState(false);
  const [flash, setFlash] = useState<"none" | "hit" | "miss">("none");
  const lastId = useRef<string>("");

  const nextQuestion = useCallback(() => {
    let w = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1) {
      let guard = 0;
      while (w.id === lastId.current && guard++ < 5) {
        w = pool[Math.floor(Math.random() * pool.length)];
      }
    }
    lastId.current = w.id;
    setQ(reviewQuestion(w));
    setLocked(false);
  }, [pool]);

  function start() {
    setScore(0);
    setCombo(0);
    setTime(DURATION);
    setPhase("play");
    nextQuestion();
  }

  // Countdown.
  useEffect(() => {
    if (phase !== "play") return;
    if (time <= 0) {
      setPhase("done");
      setBest((b) => Math.max(b, score));
      return;
    }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, time, score]);

  function choose(i: number) {
    if (locked || !q) return;
    setLocked(true);
    const correct = i === q.answer;
    playChime(correct);
    recordAnswer(q.word.id, correct);
    if (correct) {
      setScore((s) => s + 10 + combo * 2);
      setCombo((c) => c + 1);
      setFlash("hit");
    } else {
      setCombo(0);
      setFlash("miss");
    }
    setTimeout(() => setFlash("none"), 300);
    setTimeout(nextQuestion, 420);
  }

  if (phase === "idle") {
    return (
      <div className="page page-frame p-8 text-center">
        <div className="text-5xl">⚔️</div>
        <h2 className="mt-3 font-display text-2xl font-black text-ink">
          Word Duel
        </h2>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          You have <strong>{DURATION} seconds</strong>. Answer as many as you can
          — chain correct answers to build a combo and multiply your score!
        </p>
        <button
          onClick={start}
          className="mt-6 rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-8 py-3.5 font-display text-lg font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          Draw your quill! ⚔️
        </button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="page page-frame relative overflow-hidden p-8 text-center">
        <Confetti count={30} />
        <div className="relative">
          <div className="text-5xl">🏅</div>
          <h2 className="mt-3 font-display text-3xl font-black text-ink">
            {score} points
          </h2>
          <p className="mt-2 font-hand text-2xl text-[var(--c-deep)]">
            {score >= 150
              ? "Masterful duelling!"
              : score >= 80
                ? "A worthy showing!"
                : "Every duel sharpens the blade."}
          </p>
          {best > 0 && (
            <p className="mt-1 text-sm text-ink-soft">Best this session: {best}</p>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={start}
              className="rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-6 py-3 font-display font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105"
            >
              Duel again
            </button>
            <a
              href="/games"
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
      {/* HUD */}
      <div className="mb-3 flex items-center gap-3">
        <div className="flex-1">
          <div className="h-3 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--ink)_12%,transparent)]">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  time <= 10
                    ? "linear-gradient(90deg,#c0392b,#e07b39)"
                    : "linear-gradient(90deg,#e6c15a,#b8892b)",
              }}
              animate={{ width: `${(time / DURATION) * 100}%` }}
              transition={{ ease: "linear", duration: 1 }}
            />
          </div>
        </div>
        <span className="h-desk w-10 text-right font-display text-xl font-black">
          {time}
        </span>
      </div>
      <div className="mb-3 flex items-center justify-between">
        <span className="h-desk font-display text-lg font-extrabold">
          Score: {score}
        </span>
        <AnimatePresence>
          {combo >= 2 && (
            <motion.span
              key={combo}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-full bg-[var(--wax)] px-3 py-1 text-sm font-bold text-white"
            >
              🔥 {combo}× combo
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Question */}
      <motion.div
        animate={{
          boxShadow:
            flash === "hit"
              ? "0 0 0 3px #10b981"
              : flash === "miss"
                ? "0 0 0 3px #e11d48"
                : "0 0 0 0px transparent",
        }}
        className="page page-frame rounded-2xl p-5 sm:p-7"
      >
        {q && (
          <>
            <div className="flex items-start justify-between gap-3">
              <p className="font-display text-lg font-bold leading-snug text-ink sm:text-xl">
                {q.prompt}
              </p>
              <span className="shrink-0 text-2xl" aria-hidden>
                {q.word.motif}
              </span>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={locked}
                  className="rounded-xl border-2 border-[var(--border)] bg-[var(--parch)] px-4 py-3 text-left font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-[var(--c-primary)] disabled:opacity-70"
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
