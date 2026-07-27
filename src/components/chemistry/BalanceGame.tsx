"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAtelier } from "@/lib/chemistry/store";
import { EQUATIONS, type Species } from "@/content/chemistry/equations";
import { playChime, playBubble } from "@/lib/sound";
import { SciPanel, StationTopBar, SciConfetti } from "@/components/science/ui";

const XP_PER = 15;

export function BalanceGame() {
  const { addXp } = useAtelier();
  const [idx, setIdx] = useState(0);
  const [coeffs, setCoeffs] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const eq = EQUATIONS[idx];
  const species = useMemo(() => [...eq.reactants, ...eq.products], [eq]);

  useEffect(() => {
    setCoeffs(species.map(() => 1));
    setLocked(false);
  }, [species]);

  const elements = useMemo(() => {
    const s = new Set<string>();
    species.forEach((sp) => Object.keys(sp.atoms).forEach((e) => s.add(e)));
    return [...s];
  }, [species]);

  function sideCount(list: Species[], offset: number, el: string) {
    return list.reduce((sum, sp, i) => sum + (coeffs[offset + i] || 0) * (sp.atoms[el] || 0), 0);
  }
  const tally = elements.map((el) => {
    const lhs = sideCount(eq.reactants, 0, el);
    const rhs = sideCount(eq.products, eq.reactants.length, el);
    return { el, lhs, rhs, ok: lhs === rhs };
  });
  const balanced = coeffs.length > 0 && tally.every((t) => t.ok);

  useEffect(() => {
    if (!balanced || locked) return;
    setLocked(true);
    playChime(true);
    setScore((s) => s + 1);
    addXp(XP_PER);
    const t = setTimeout(() => {
      if (idx + 1 >= EQUATIONS.length) setFinished(true);
      else setIdx((i) => i + 1);
    }, 1500);
    return () => clearTimeout(t);
  }, [balanced, locked, idx, addXp]);

  function bump(i: number) {
    if (locked) return;
    playBubble();
    setCoeffs((c) => c.map((v, j) => (j === i ? (v >= 6 ? 1 : v + 1) : v)));
  }

  function reset() {
    setIdx(0); setScore(0); setFinished(false); setCoeffs(species.map(() => 1)); setLocked(false);
  }

  if (finished) {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
        <StationTopBar backHref="/chemistry/games" backLabel="Games room" />
        <SciPanel className="relative overflow-hidden text-center">
          <SciConfetti count={30} />
          <div className="relative">
            <div className="text-5xl">⚙️</div>
            <h2 className="mt-2 font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>
              Every engine roars to life!
            </h2>
            <p className="mt-2 opacity-85" style={{ color: "var(--sci-ink)" }}>
              You balanced all {EQUATIONS.length} equations. +{score * XP_PER} XP earned.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button onClick={reset} className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105" style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>Play again</button>
              <Link href="/chemistry/games" className="rounded-full border-2 px-6 py-3 font-display font-bold" style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>Games room</Link>
            </div>
          </div>
        </SciPanel>
      </div>
    );
  }

  const CoeffChip = ({ i }: { i: number }) => (
    <button onClick={() => bump(i)} disabled={locked}
      className="grid h-9 w-9 place-items-center rounded-lg border-2 font-display text-lg font-black transition-transform hover:scale-105"
      style={{ borderColor: "var(--sci-accent)", color: "var(--sci-accent)", background: "color-mix(in srgb, var(--sci-accent) 12%, transparent)" }}
      title="Tap to change">
      {coeffs[i] ?? 1}
    </button>
  );

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/chemistry/games" backLabel="Games room" />
      <div className="mb-4 flex items-center gap-3">
        <span className="text-4xl">⚖️</span>
        <div>
          <h1 className="font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>Power the Engine</h1>
          <p className="opacity-80" style={{ color: "var(--sci-ink)" }}>
            Equation {idx + 1} of {EQUATIONS.length} · tap the numbers so both sides have equal atoms.
          </p>
        </div>
      </div>

      <SciPanel>
        {/* the machine */}
        <div className="mb-4 flex justify-center">
          <motion.div className="text-5xl" animate={balanced ? { rotate: 360 } : {}} transition={{ duration: 1.2, repeat: balanced ? Infinity : 0, ease: "linear" }} style={{ filter: balanced ? "drop-shadow(0 0 12px var(--sci-glow))" : "grayscale(0.6)" }}>
            ⚙️
          </motion.div>
        </div>

        {/* equation */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xl font-bold" style={{ color: "var(--sci-ink)" }}>
          {eq.reactants.map((sp, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="opacity-60">+</span>}
              <CoeffChip i={i} />
              <span className="font-mono">{sp.formula}</span>
            </span>
          ))}
          <span className="mx-1 opacity-70">→</span>
          {eq.products.map((sp, i) => {
            const gi = eq.reactants.length + i;
            return (
              <span key={gi} className="flex items-center gap-1.5">
                {i > 0 && <span className="opacity-60">+</span>}
                <CoeffChip i={gi} />
                <span className="font-mono">{sp.formula}</span>
              </span>
            );
          })}
        </div>

        {/* atom tally */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {tally.map((t) => (
            <span key={t.el} className="rounded-full border px-3 py-1 text-sm font-bold"
              style={{ borderColor: t.ok ? "#10b981" : "var(--sci-border)", color: t.ok ? "#4bbf7a" : "var(--sci-ink)", background: t.ok ? "rgba(16,185,129,0.12)" : "transparent" }}>
              {t.el}: {t.lhs} {t.ok ? "=" : "≠"} {t.rhs} {t.ok ? "✓" : ""}
            </span>
          ))}
        </div>

        <div className="mt-4 min-h-[24px] text-center font-display font-bold" style={{ color: "var(--sci-accent)" }}>
          {balanced ? "⚡ Balanced — the engine powers up!" : ""}
        </div>
      </SciPanel>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm opacity-70" style={{ color: "var(--sci-ink)" }}>Balanced: {score}/{EQUATIONS.length}</span>
        <button onClick={() => setCoeffs(species.map(() => 1))} disabled={locked}
          className="rounded-full border px-4 py-2 text-sm font-bold disabled:opacity-40" style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>
          ↺ Reset
        </button>
      </div>
    </div>
  );
}
