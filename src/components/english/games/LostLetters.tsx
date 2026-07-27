"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Word } from "@/content/english/types";
import { shuffle, sample } from "@/lib/english/quizgen";
import { useApp } from "@/lib/english/store";
import { playChime, speak } from "@/lib/sound";
import { Confetti } from "@/components/english/ui";

const ROUND = 6;

export function LostLetters({ pool }: { pool: Word[] }) {
  const { recordAnswer } = useApp();
  const [seed, setSeed] = useState(0);
  const [pos, setPos] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const words = useMemo(
    () => sample(pool, Math.min(ROUND, pool.length)),
    [pool, seed]
  );

  function advance(ok: boolean) {
    if (ok) setCorrect((c) => c + 1);
    if (pos + 1 >= words.length) setDone(true);
    else setPos((p) => p + 1);
  }

  function reset() {
    setPos(0);
    setCorrect(0);
    setDone(false);
    setSeed((s) => s + 1);
  }

  if (done) {
    return (
      <div className="page page-frame relative overflow-hidden p-8 text-center">
        <Confetti count={26} />
        <div className="relative">
          <div className="text-5xl">🔤</div>
          <h2 className="mt-3 font-display text-3xl font-black text-ink">
            {correct}/{words.length} restored
          </h2>
          <p className="mt-2 font-hand text-2xl text-[var(--c-deep)]">
            {correct === words.length
              ? "Every scattered word made whole!"
              : "The Lexicon thanks you for your restorations."}
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
      <div className="t-desk mb-3 text-center text-sm font-bold">
        Word {pos + 1} of {words.length}
      </div>
      <LetterRound
        key={`${seed}-${pos}`}
        word={words[pos]}
        onSolved={() => {
          recordAnswer(words[pos].id, true);
          advance(true);
        }}
        onSkip={() => {
          recordAnswer(words[pos].id, false);
          advance(false);
        }}
      />
    </div>
  );
}

function scramble(word: string): string[] {
  const letters = word.split("");
  if (letters.length < 2) return letters;
  let out = shuffle(letters);
  let guard = 0;
  while (out.join("") === word && guard++ < 8) out = shuffle(letters);
  return out;
}

function LetterRound({
  word,
  onSolved,
  onSkip,
}: {
  word: Word;
  onSolved: () => void;
  onSkip: () => void;
}) {
  const target = word.word.toLowerCase();
  const tiles = useMemo(() => scramble(target), [target]);
  const [chosen, setChosen] = useState<number[]>([]);
  const [state, setState] = useState<"typing" | "right" | "wrong">("typing");
  const [revealed, setRevealed] = useState(false);

  const guess = chosen.map((i) => tiles[i]).join("");

  function tap(i: number) {
    if (state === "right" || chosen.includes(i)) return;
    const next = [...chosen, i];
    setChosen(next);
    if (next.length === target.length) {
      const attempt = next.map((k) => tiles[k]).join("");
      if (attempt === target) {
        setState("right");
        playChime(true);
        speak(word.word);
        setTimeout(onSolved, 1100);
      } else {
        setState("wrong");
        playChime(false);
        setTimeout(() => {
          setChosen([]);
          setState("typing");
        }, 600);
      }
    }
  }

  function backspace() {
    if (state === "right") return;
    setChosen((c) => c.slice(0, -1));
  }

  return (
    <div className="page page-frame p-5 sm:p-7">
      <div className="text-center">
        <span className="text-4xl">{word.motif}</span>
        <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-ink-faint">
          {word.class} · this word means…
        </div>
        <p className="mx-auto mt-1 max-w-md text-lg text-ink">{word.meaning}</p>
      </div>

      {/* answer slots */}
      <motion.div
        animate={state === "wrong" ? { x: [0, -8, 8, -5, 0] } : {}}
        className="mt-5 flex flex-wrap justify-center gap-1.5"
      >
        {Array.from({ length: target.length }).map((_, i) => {
          const ch = guess[i];
          return (
            <div
              key={i}
              className={`grid h-11 w-9 place-items-center rounded-lg border-2 font-display text-xl font-extrabold uppercase ${
                state === "right"
                  ? "border-emerald-500 bg-emerald-500/15 text-emerald-800"
                  : ch
                    ? "border-[var(--c-primary)] bg-[var(--c-surface)] text-ink"
                    : "border-dashed border-[var(--border)] text-ink-faint"
              }`}
            >
              {revealed && !ch ? (
                <span className="opacity-40">{target[i]}</span>
              ) : (
                ch ?? ""
              )}
            </div>
          );
        })}
      </motion.div>

      {/* letter tiles */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {tiles.map((ch, i) => {
          const used = chosen.includes(i);
          return (
            <button
              key={i}
              onClick={() => tap(i)}
              disabled={used || state === "right"}
              className={`grid h-12 w-11 place-items-center rounded-lg border-2 font-display text-xl font-extrabold uppercase transition-all ${
                used
                  ? "border-[var(--border)] bg-transparent text-ink-faint opacity-30"
                  : "border-[var(--border)] bg-[var(--parch)] text-ink shadow hover:-translate-y-0.5 hover:border-[var(--c-primary)]"
              }`}
            >
              {ch}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={backspace}
          disabled={chosen.length === 0 || state === "right"}
          className="rounded-full border border-[var(--border)] bg-[var(--parch)] px-4 py-2 text-sm font-bold text-ink-soft transition-colors hover:text-ink disabled:opacity-40"
        >
          ⌫ Backspace
        </button>
        <button
          onClick={() => setRevealed(true)}
          disabled={revealed || state === "right"}
          className="rounded-full border border-[var(--border)] bg-[var(--parch)] px-4 py-2 text-sm font-bold text-ink-soft transition-colors hover:text-ink disabled:opacity-40"
        >
          💡 Hint
        </button>
        <button
          onClick={onSkip}
          disabled={state === "right"}
          className="rounded-full border border-[var(--border)] bg-[var(--parch)] px-4 py-2 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
        >
          Skip →
        </button>
      </div>
    </div>
  );
}
