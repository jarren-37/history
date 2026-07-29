"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAtelier } from "@/lib/chemistry/store";
import { CATIONS, ANIONS, COMPOUNDS } from "@/content/chemistry/compounds";
import { playChime, playBubble } from "@/lib/sound";
import { SciPanel, StationTopBar, SciConfetti } from "@/components/science/ui";

const XP_PER = 15;

export function BrewGame() {
  const { addXp } = useAtelier();
  const [idx, setIdx] = useState(0);
  const [cat, setCat] = useState<string | null>(null);
  const [anion, setAnion] = useState<string | null>(null);
  const [state, setState] = useState<"choosing" | "right" | "wrong">("choosing");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const target = COMPOUNDS[idx];

  useEffect(() => {
    if (!cat || !anion || state !== "choosing") return;
    const correct = cat === target.cation && anion === target.anion;
    if (correct) {
      setState("right");
      playChime(true);
      setScore((s) => s + 1);
      addXp(XP_PER);
      const t = setTimeout(() => {
        if (idx + 1 >= COMPOUNDS.length) setFinished(true);
        else { setIdx((i) => i + 1); setCat(null); setAnion(null); setState("choosing"); }
      }, 1600);
      return () => clearTimeout(t);
    } else {
      setState("wrong");
      playChime(false);
      const t = setTimeout(() => { setCat(null); setAnion(null); setState("choosing"); }, 1300);
      return () => clearTimeout(t);
    }
  }, [cat, anion, state, target, idx, addXp]);

  function restart() {
    setIdx(0); setCat(null); setAnion(null); setState("choosing"); setScore(0); setFinished(false);
  }

  if (finished) {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
        <StationTopBar backHref="/chemistry/games" backLabel="Games room" />
        <SciPanel className="relative overflow-hidden text-center">
          <SciConfetti count={28} />
          <div className="relative">
            <div className="text-5xl">⚗️</div>
            <h2 className="mt-2 font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>Every phial brewed!</h2>
            <p className="mt-2 opacity-85" style={{ color: "var(--sci-ink)" }}>You brewed all {COMPOUNDS.length} compounds. +{score * XP_PER} XP.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button onClick={restart} className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105" style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>Brew again</button>
              <Link href="/chemistry/games" className="rounded-full border-2 px-6 py-3 font-display font-bold" style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>Games room</Link>
            </div>
          </div>
        </SciPanel>
      </div>
    );
  }

  const IonBtn = ({ id, display, group, sel, onPick }: { id: string; display: string; group: "cat" | "an"; sel: boolean; onPick: () => void }) => (
    <button
      onClick={onPick}
      disabled={state !== "choosing"}
      className="rounded-xl border-2 px-4 py-3 font-display text-lg font-bold transition-transform hover:scale-105 disabled:opacity-60"
      style={{
        borderColor: sel ? "var(--sci-accent)" : "var(--sci-border)",
        background: sel ? "color-mix(in srgb, var(--sci-accent) 20%, transparent)" : "transparent",
        color: "var(--sci-ink)",
      }}
    >
      {display}
    </button>
  );

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/chemistry/games" backLabel="Games room" />
      <div className="mb-4 flex items-center gap-3">
        <span className="text-4xl">⚗️</span>
        <div>
          <h1 className="font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>Brew the Compound</h1>
          <p className="opacity-80" style={{ color: "var(--sci-ink)" }}>Recipe {idx + 1} of {COMPOUNDS.length}</p>
        </div>
      </div>

      <SciPanel>
        <div className="text-center">
          <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--sci-accent)" }}>The recipe calls for</div>
          <div className="font-display text-2xl font-black" style={{ color: "var(--sci-ink)" }}>{target.name}</div>
        </div>

        {/* flask */}
        <div className="my-4 flex justify-center">
          <motion.div
            className="grid h-24 w-24 place-items-center rounded-b-3xl rounded-t-lg border-2 text-2xl font-mono font-bold"
            style={{
              borderColor: state === "right" ? "#4bbf7a" : "var(--sci-border)",
              background: state === "right" ? "rgba(75,191,122,0.18)" : "color-mix(in srgb, var(--sci-accent) 8%, transparent)",
              color: "var(--sci-ink)",
            }}
            animate={state === "wrong" ? { x: [0, -8, 8, -4, 0] } : {}}
          >
            {state === "right" ? target.formula : "?"}
          </motion.div>
        </div>

        <div className="text-[11px] font-bold uppercase tracking-widest opacity-70" style={{ color: "var(--sci-ink)" }}>Choose a metal ion (cation)</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {CATIONS.map((i) => (
            <IonBtn key={i.id} id={i.id} display={i.display} group="cat" sel={cat === i.id} onPick={() => { setCat(i.id); playBubble(); }} />
          ))}
        </div>

        <div className="mt-4 text-[11px] font-bold uppercase tracking-widest opacity-70" style={{ color: "var(--sci-ink)" }}>Choose a non-metal / group ion (anion)</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {ANIONS.map((i) => (
            <IonBtn key={i.id} id={i.id} display={i.display} group="an" sel={anion === i.id} onPick={() => { setAnion(i.id); playBubble(); }} />
          ))}
        </div>

        <div className="mt-4 min-h-[24px] text-center font-display font-bold">
          {state === "right" && <span style={{ color: "#4bbf7a" }}>✓ {target.formula} — a perfect brew!</span>}
          {state === "wrong" && <span className="text-rose-400">Those ions don&apos;t make {target.name}. Try again!</span>}
        </div>
      </SciPanel>

      <div className="mt-3 text-sm opacity-70" style={{ color: "var(--sci-ink)" }}>Brewed: {score}/{COMPOUNDS.length}</div>
    </div>
  );
}
