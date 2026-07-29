"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAtelier } from "@/lib/chemistry/store";
import { getStation } from "@/content/chemistry/stations";
import { playBubble, playChime } from "@/lib/sound";
import {
  SciPanel,
  StationTopBar,
  StationHeading,
  CompleteButton,
} from "@/components/science/ui";

interface Mixture {
  name: string;
  icon: string;
  options: string[];
  answer: number;
  explain: string;
}

const MIXTURES: Mixture[] = [
  {
    name: "Sand mixed with water",
    icon: "🏖️",
    options: ["Filtration", "Evaporation", "Chromatography", "Using a magnet"],
    answer: 0,
    explain: "Sand is insoluble, so filtration traps it in the paper while the water runs through.",
  },
  {
    name: "Salt dissolved in water",
    icon: "🧂",
    options: ["Evaporation", "Filtration", "Using a magnet", "A separating funnel"],
    answer: 0,
    explain: "The salt is dissolved, so filtration can't catch it. Evaporate the water and the salt is left behind.",
  },
  {
    name: "Iron filings mixed with sulfur",
    icon: "🧲",
    options: ["Using a magnet", "Filtration", "Chromatography", "Evaporation"],
    answer: 0,
    explain: "Iron is magnetic and sulfur is not, so a magnet lifts the iron straight out of the mixture.",
  },
  {
    name: "The colours in a felt-tip ink",
    icon: "🖊️",
    options: ["Chromatography", "Distillation", "Filtration", "Using a magnet"],
    answer: 0,
    explain: "Chromatography carries the dyes up the paper at different speeds, spreading them into separate colours.",
  },
];

export function SeparationLab() {
  const { isDone, complete } = useAtelier();
  const st = getStation("separation")!;
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [allDone, setAllDone] = useState(false);
  const done = isDone("separation");

  const mix = MIXTURES[idx];

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === mix.answer;
    playChime(correct);
    if (correct) {
      playBubble();
      setTimeout(() => {
        if (idx + 1 >= MIXTURES.length) setAllDone(true);
        else { setIdx((n) => n + 1); setPicked(null); }
      }, 1700);
    } else {
      setTimeout(() => setPicked(null), 1400);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/chemistry" />
      <StationHeading icon={st.icon} topic={st.topic} title={st.name}>
        A mixture is just substances jumbled together — not chemically joined.
        Each one comes apart with the right technique. Sort all four.
      </StationHeading>

      {/* progress dots */}
      <div className="mb-3 flex gap-1.5">
        {MIXTURES.map((_, i) => (
          <div key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i < idx || allDone ? "var(--sci-accent)" : "var(--sci-border)" }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!allDone ? (
          <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <SciPanel>
              <div className="text-center">
                <div className="text-5xl">{mix.icon}</div>
                <div className="mt-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--sci-accent)" }}>
                  Mixture {idx + 1} of {MIXTURES.length}
                </div>
                <div className="font-display text-2xl font-black" style={{ color: "var(--sci-ink)" }}>{mix.name}</div>
                <p className="mt-1 opacity-80" style={{ color: "var(--sci-ink)" }}>How would you separate it?</p>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {mix.options.map((opt, i) => {
                  const isA = i === mix.answer;
                  const show = picked !== null;
                  let border = "var(--sci-border)", bg = "transparent";
                  if (show && isA) { border = "#10b981"; bg = "rgba(16,185,129,0.15)"; }
                  else if (show && picked === i) { border = "#f43f5e"; bg = "rgba(244,63,94,0.15)"; }
                  return (
                    <button key={i} onClick={() => pick(i)} disabled={show}
                      className="rounded-xl border-2 px-4 py-3 text-left font-semibold transition-colors"
                      style={{ borderColor: border, background: bg, color: "var(--sci-ink)" }}>
                      {opt}{show && isA && " ✓"}
                    </button>
                  );
                })}
              </div>

              {picked !== null && (
                <p className="mt-3 text-sm opacity-90" style={{ color: "var(--sci-ink)" }}>
                  {picked === mix.answer ? "✅ Separated! " : "Not the best tool — "}{mix.explain}
                </p>
              )}
            </SciPanel>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <SciPanel className="text-center">
              <div className="text-5xl">🧫</div>
              <h2 className="mt-2 font-display text-2xl font-black" style={{ color: "var(--sci-ink)" }}>All mixtures sorted!</h2>
              <p className="mt-1 opacity-85" style={{ color: "var(--sci-ink)" }}>
                Filtration, evaporation, magnetism and chromatography — the right technique for each mixture.
              </p>
            </SciPanel>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5">
        <CompleteButton
          done={done}
          xp={st.xp}
          disabled={!allDone}
          onComplete={() => complete("separation", st.xp)}
          nextHref="/chemistry/masterpiece"
          nextLabel="The Masterpiece →"
          hint="Separate all four mixtures first."
        />
      </div>
    </div>
  );
}
