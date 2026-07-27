"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAtelier } from "@/lib/chemistry/store";
import { MASTERPIECE } from "@/content/chemistry/stations";
import { playChime, playBubble } from "@/lib/sound";
import {
  SciPanel,
  StationTopBar,
  StationHeading,
  SciConfetti,
} from "@/components/science/ui";

interface McqStep {
  kind: "mcq";
  label: string;
  q: string;
  options: string[];
  a: number;
  explain: string;
}

const MCQ_STEPS: McqStep[] = [
  {
    kind: "mcq",
    label: "Diagnose",
    q: "Blue litmus paper turns red in the well water. What does this tell you?",
    options: ["The water is acidic", "The water is alkaline", "The water is pure", "The water is merely cold"],
    a: 0,
    explain: "Blue litmus turning red means the water is acidic — that must be neutralised later.",
  },
  {
    kind: "mcq",
    label: "Remove sand",
    q: "The water is cloudy with insoluble sand. Which technique removes it?",
    options: ["Filtration", "Distillation", "Chromatography", "Simply waiting"],
    a: 0,
    explain: "Filtration traps insoluble solids (the sand) while the liquid passes through.",
  },
  {
    kind: "mcq",
    label: "Remove salt",
    q: "The water is now clear but still salty — the salt is dissolved. How do you obtain pure water?",
    options: ["Simple distillation", "Filtration again", "Adding limestone", "Decanting"],
    a: 0,
    explain: "Distillation boils off water and condenses it pure, leaving the dissolved salt behind.",
  },
];

export default function PoisonedWell() {
  const { isDone, complete } = useAtelier();
  const alreadyDone = isDone(MASTERPIECE.id);
  const [step, setStep] = useState(0); // 0-2 mcq, 3 neutralise, 4 done
  const [picked, setPicked] = useState<number | null>(null);
  const [ph, setPh] = useState(3);
  const [finished, setFinished] = useState(false);

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === MCQ_STEPS[step].a;
    playChime(correct);
    if (correct) setTimeout(() => { setStep((s) => s + 1); setPicked(null); }, 1400);
    else setTimeout(() => setPicked(null), 1400);
  }

  function addAlkali() {
    playBubble();
    setPh((p) => Math.round((p + 0.6) * 10) / 10);
  }
  const neutral = ph >= 6.6 && ph <= 7.4;
  const tooFar = ph > 8;

  function finish() {
    complete(MASTERPIECE.id, MASTERPIECE.xp);
    setFinished(true);
  }

  const totalSteps = 4;
  const labels = ["Diagnose", "Remove sand", "Remove salt", "Neutralise"];

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/chemistry" />
      <StationHeading icon="🏆" topic={MASTERPIECE.topic} title={MASTERPIECE.name}>
        {MASTERPIECE.intro}
      </StationHeading>

      {/* stepper */}
      <div className="mb-4 flex items-center gap-1.5">
        {labels.map((l, i) => (
          <div key={l} className="flex-1">
            <div
              className="h-1.5 rounded-full"
              style={{ background: i < step || finished ? "var(--sci-accent)" : "var(--sci-border)" }}
            />
            <div className="mt-1 text-[10px] font-bold uppercase tracking-wide opacity-70" style={{ color: "var(--sci-ink)" }}>
              {l}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!finished && step < 3 && (
          <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <SciPanel>
              <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--sci-accent)" }}>
                Step {step + 1} of {totalSteps} · {MCQ_STEPS[step].label}
              </div>
              <p className="mt-1 font-display text-xl font-bold">{MCQ_STEPS[step].q}</p>
              <div className="mt-3 grid gap-2">
                {MCQ_STEPS[step].options.map((opt, i) => {
                  const isA = i === MCQ_STEPS[step].a;
                  const show = picked !== null;
                  let border = "var(--sci-border)", bg = "transparent";
                  if (show && isA) { border = "#10b981"; bg = "rgba(16,185,129,0.15)"; }
                  else if (show && picked === i) { border = "#f43f5e"; bg = "rgba(244,63,94,0.15)"; }
                  return (
                    <button key={i} onClick={() => pick(i)} disabled={show}
                      className="rounded-xl border-2 px-4 py-2.5 text-left font-semibold transition-colors"
                      style={{ borderColor: border, background: bg, color: "var(--sci-ink)" }}>
                      {opt}{show && isA && " ✓"}
                    </button>
                  );
                })}
              </div>
              {picked !== null && (
                <p className="mt-3 text-sm opacity-90">
                  {picked === MCQ_STEPS[step].a ? "✅ " : "Not quite — "}
                  {MCQ_STEPS[step].explain}
                </p>
              )}
            </SciPanel>
          </motion.div>
        )}

        {!finished && step === 3 && (
          <motion.div key="neut" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <SciPanel>
              <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--sci-accent)" }}>
                Step 4 of {totalSteps} · Neutralise
              </div>
              <p className="mt-1 font-display text-xl font-bold">
                The pure water is still acidic. Add alkali until it is neutral (pH 7).
              </p>

              {/* pH bar */}
              <div className="mt-4">
                <div className="relative h-6 w-full overflow-hidden rounded-full"
                  style={{ background: "linear-gradient(90deg,#e0453b,#e0913f,#4bbf7a,#2f7bb0,#5a4bd0)" }}>
                  <motion.div
                    className="absolute top-0 h-6 w-1.5 -translate-x-1/2 rounded bg-white"
                    animate={{ left: `${(ph / 14) * 100}%` }}
                    style={{ boxShadow: "0 0 8px #fff" }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-[10px] opacity-70" style={{ color: "var(--sci-ink)" }}>
                  <span>0 acidic</span><span>7 neutral</span><span>14 alkaline</span>
                </div>
                <div className="mt-2 text-center font-display text-2xl font-black"
                  style={{ color: neutral ? "#4bbf7a" : tooFar ? "#f43f5e" : "var(--sci-accent)" }}>
                  pH {ph.toFixed(1)} {neutral && "✓ neutral"} {tooFar && "— too alkaline!"}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {!tooFar && !neutral && (
                  <button onClick={addAlkali}
                    className="rounded-full px-5 py-2.5 font-display font-extrabold shadow transition-transform hover:scale-105"
                    style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>
                    💧 Add a drop of alkali
                  </button>
                )}
                {tooFar && (
                  <button onClick={() => setPh(3)}
                    className="rounded-full border-2 px-5 py-2.5 font-bold"
                    style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>
                    ↺ Overshot — start again
                  </button>
                )}
                {neutral && (
                  <button onClick={finish}
                    className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105"
                    style={{ background: "#4bbf7a", color: "#0c0c0c" }}>
                    ✓ Confirm — the water is safe!
                  </button>
                )}
              </div>
            </SciPanel>
          </motion.div>
        )}

        {finished && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <SciPanel className="relative overflow-hidden text-center">
              <SciConfetti count={30} />
              <div className="relative">
                <div className="text-5xl">🏆</div>
                <h2 className="mt-2 font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>
                  The well is pure again!
                </h2>
                <p className="mt-2 opacity-85" style={{ color: "var(--sci-ink)" }}>
                  You filtered the sand, distilled away the salt, and neutralised
                  the acid. The village is saved.
                  {alreadyDone ? " (Already completed — no new XP.)" : ` +${MASTERPIECE.xp} XP!`}
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <Link href="/chemistry" className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105"
                    style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>
                    Back to the Atelier
                  </Link>
                  <Link href="/" className="rounded-full border-2 px-6 py-3 font-display font-bold"
                    style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>
                    The Athenaeum
                  </Link>
                </div>
              </div>
            </SciPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
