"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SENTENCES } from "@/content/english/sentences";
import { shuffle, sample } from "@/lib/english/quizgen";
import { useApp } from "@/lib/english/store";
import { playChime, playPageTurn } from "@/lib/sound";
import { Confetti } from "@/components/english/ui";

const ROUND = 6;

export function SentenceBuilder() {
  const { addXp } = useApp();
  const [seed, setSeed] = useState(0);
  const [pos, setPos] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const sentences = useMemo(
    () => sample(SENTENCES, Math.min(ROUND, SENTENCES.length)),
    [seed]
  );

  function advance(ok: boolean) {
    if (ok) { setCorrect((c) => c + 1); addXp(10); }
    if (pos + 1 >= sentences.length) setDone(true);
    else setPos((p) => p + 1);
  }

  function reset() {
    setPos(0); setCorrect(0); setDone(false); setSeed((s) => s + 1);
  }

  if (done) {
    return (
      <div className="page page-frame relative overflow-hidden p-8 text-center">
        <Confetti count={28} />
        <div className="relative">
          <div className="text-5xl">🧱</div>
          <h2 className="mt-3 font-display text-3xl font-black text-ink">
            {correct}/{sentences.length} sentences built
          </h2>
          <p className="mt-2 font-hand text-2xl text-[var(--c-deep)]">
            {correct === sentences.length ? "Every sentence, flawlessly ordered!" : "Fine craftsmanship — keep building."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={reset} className="rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-6 py-3 font-display font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105">Play again</button>
            <a href="/english/games" className="rounded-full border-2 border-[var(--gold)] px-6 py-3 font-display font-bold text-[var(--c-deep)] transition-transform hover:scale-105">Back to games</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 text-center text-sm font-bold text-ink-soft">
        Sentence {pos + 1} of {sentences.length}
      </div>
      <SentenceRound
        key={`${seed}-${pos}`}
        sentence={sentences[pos]}
        onSolved={() => advance(true)}
        onSkip={() => advance(false)}
      />
    </div>
  );
}

function SentenceRound({
  sentence,
  onSolved,
  onSkip,
}: {
  sentence: string;
  onSolved: () => void;
  onSkip: () => void;
}) {
  const target = sentence.split(" ");
  const tiles = useMemo(() => {
    const items = target.map((w, i) => ({ id: i, w }));
    let out = shuffle(items);
    let guard = 0;
    while (out.map((t) => t.id).join(",") === items.map((t) => t.id).join(",") && guard++ < 8) {
      out = shuffle(items);
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentence]);

  const [chosen, setChosen] = useState<number[]>([]); // indices into tiles
  const [state, setState] = useState<"typing" | "right" | "wrong">("typing");
  const [revealed, setRevealed] = useState(false);

  function tap(i: number) {
    if (state === "right" || chosen.includes(i)) return;
    const next = [...chosen, i];
    setChosen(next);
    playPageTurn();
    if (next.length === target.length) {
      const guess = next.map((k) => tiles[k].w).join(" ");
      if (guess === target.join(" ")) {
        setState("right");
        playChime(true);
        setTimeout(onSolved, 1100);
      } else {
        setState("wrong");
        playChime(false);
        setTimeout(() => { setChosen([]); setState("typing"); }, 800);
      }
    }
  }

  function backspace() {
    if (state === "right") return;
    setChosen((c) => c.slice(0, -1));
  }

  const built = chosen.map((k) => tiles[k].w);

  return (
    <div className="page page-frame p-5 sm:p-7">
      <p className="text-center text-sm text-ink-soft">
        Tap the words in order to rebuild the sentence.
      </p>

      {/* answer row */}
      <motion.div
        animate={state === "wrong" ? { x: [0, -8, 8, -4, 0] } : {}}
        className="mt-4 flex min-h-[52px] flex-wrap items-center justify-center gap-2 rounded-xl border-2 border-dashed p-3"
        style={{ borderColor: state === "right" ? "#10b981" : "var(--border)" }}
      >
        {built.length === 0 && <span className="text-ink-faint">…</span>}
        {built.map((w, i) => (
          <span key={i} className="rounded-lg bg-[var(--c-surface)] px-3 py-1.5 font-semibold text-ink">
            {w}
          </span>
        ))}
      </motion.div>

      {revealed && state !== "right" && (
        <p className="mt-2 text-center text-sm italic text-ink-faint">{sentence}</p>
      )}

      {/* tile pool */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {tiles.map((t, i) => {
          const used = chosen.includes(i);
          return (
            <button
              key={t.id}
              onClick={() => tap(i)}
              disabled={used || state === "right"}
              className={`rounded-lg border-2 px-3 py-2 font-semibold transition-all ${
                used
                  ? "border-[var(--border)] text-ink-faint opacity-30"
                  : "border-[var(--border)] bg-[var(--parch)] text-ink shadow hover:-translate-y-0.5 hover:border-[var(--c-primary)]"
              }`}
            >
              {t.w}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <button onClick={backspace} disabled={chosen.length === 0 || state === "right"} className="rounded-full border border-[var(--border)] bg-[var(--parch)] px-4 py-2 text-sm font-bold text-ink-soft transition-colors hover:text-ink disabled:opacity-40">⌫ Undo</button>
        <button onClick={() => setRevealed(true)} disabled={revealed || state === "right"} className="rounded-full border border-[var(--border)] bg-[var(--parch)] px-4 py-2 text-sm font-bold text-ink-soft transition-colors hover:text-ink disabled:opacity-40">💡 Hint</button>
        <button onClick={onSkip} disabled={state === "right"} className="rounded-full border border-[var(--border)] bg-[var(--parch)] px-4 py-2 text-sm font-bold text-ink-soft transition-colors hover:text-ink">Skip →</button>
      </div>
    </div>
  );
}
