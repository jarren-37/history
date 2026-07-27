"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useObservatory } from "@/lib/physics/store";
import { MASTERPIECE } from "@/content/physics/stations";
import { playChime, playZap } from "@/lib/sound";
import {
  SciPanel,
  StationTopBar,
  StationHeading,
  SciConfetti,
} from "@/components/science/ui";

const MCQ = [
  {
    label: "Rebuild",
    q: "The signal lamp is dead. How must the battery, switch and lamp be connected?",
    options: ["In one complete, unbroken loop", "With a deliberate gap in the wire", "Using a single wire to the lamp", "Battery connected to nothing"],
    a: 0,
    explain: "Current only flows around a complete, unbroken circuit.",
  },
  {
    label: "Ohm's law",
    q: "The lamp is rated 12 V with a resistance of 4 Ω. Using I = V ÷ R, what current does it draw?",
    options: ["3 A", "48 A", "0.33 A", "16 A"],
    a: 0,
    explain: "I = V/R = 12 ÷ 4 = 3 A.",
  },
  {
    label: "Fuse",
    q: "Which fuse should protect the lamp — the smallest rating just above its 3 A working current?",
    options: ["5 A", "1 A", "3 A", "13 A"],
    a: 0,
    explain: "A fuse sits just above the working current. A 3 A fuse would blow at the normal 3 A, so choose the next size up: 5 A.",
  },
];

const F = 100; // focal length

export default function DarkenedStation() {
  const { isDone, complete } = useObservatory();
  const alreadyDone = isDone(MASTERPIECE.id);
  const [step, setStep] = useState(0); // 0-2 mcq, 3 optics, 4 done
  const [picked, setPicked] = useState<number | null>(null);
  const [dist, setDist] = useState(55);
  const [finished, setFinished] = useState(false);

  const parallel = Math.abs(dist - F) <= 12;
  const outSpread = F - dist;

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === MCQ[step].a;
    playChime(correct);
    if (correct) setTimeout(() => { setStep((s) => s + 1); setPicked(null); }, 1400);
    else setTimeout(() => setPicked(null), 1400);
  }

  function finish() {
    playZap();
    complete(MASTERPIECE.id, MASTERPIECE.xp);
    setFinished(true);
  }

  const labels = ["Rebuild", "Ohm's law", "Fuse", "Optics"];

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/physics" />
      <StationHeading icon="🏆" topic={MASTERPIECE.topic} title={MASTERPIECE.name}>
        {MASTERPIECE.intro}
      </StationHeading>

      <div className="mb-4 flex items-center gap-1.5">
        {labels.map((l, i) => (
          <div key={l} className="flex-1">
            <div className="h-1.5 rounded-full" style={{ background: i < step || finished ? "var(--sci-accent)" : "var(--sci-border)" }} />
            <div className="mt-1 text-[10px] font-bold uppercase tracking-wide opacity-70" style={{ color: "var(--sci-ink)" }}>{l}</div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!finished && step < 3 && (
          <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <SciPanel>
              <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--sci-accent)" }}>
                Step {step + 1} of 4 · {MCQ[step].label}
              </div>
              <p className="mt-1 font-display text-xl font-bold">{MCQ[step].q}</p>
              <div className="mt-3 grid gap-2">
                {MCQ[step].options.map((opt, i) => {
                  const isA = i === MCQ[step].a;
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
                  {picked === MCQ[step].a ? "✅ " : "Not quite — "}{MCQ[step].explain}
                </p>
              )}
            </SciPanel>
          </motion.div>
        )}

        {!finished && step === 3 && (
          <motion.div key="optics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <SciPanel>
              <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--sci-accent)" }}>
                Step 4 of 4 · Optics
              </div>
              <p className="mt-1 font-display text-xl font-bold">
                Slide the signal lamp to the lens&apos;s focal point to send a
                parallel beam to the horizon.
              </p>

              <svg viewBox="0 0 600 240" className="mt-3 w-full rounded-xl" style={{ background: "linear-gradient(180deg,#070a1a,#0d1230)" }}>
                <line x1="0" y1="140" x2="600" y2="140" stroke="var(--sci-border)" strokeWidth="1" strokeDasharray="4 6" />
                {/* focal point marker */}
                <circle cx={340 - F} cy="140" r="3" fill="var(--sci-accent2)" />
                <text x={340 - F} y="164" textAnchor="middle" fontSize="10" fill="var(--sci-accent2)">focal point</text>
                {/* lens */}
                <ellipse cx="340" cy="140" rx="10" ry="60" fill="color-mix(in srgb, var(--sci-accent) 30%, transparent)" stroke="var(--sci-accent)" strokeWidth="2" />
                {/* rays in */}
                <line x1={340 - dist} y1="140" x2="340" y2="88" stroke="#facc15" strokeWidth="1.5" />
                <line x1={340 - dist} y1="140" x2="340" y2="192" stroke="#facc15" strokeWidth="1.5" />
                {/* rays out */}
                <line x1="340" y1="88" x2="580" y2={88 - outSpread} stroke="#facc15" strokeWidth="1.5" opacity="0.9" />
                <line x1="340" y1="192" x2="580" y2={192 + outSpread} stroke="#facc15" strokeWidth="1.5" opacity="0.9" />
                {/* lamp */}
                <text x={340 - dist} y="146" textAnchor="middle" fontSize="20">💡</text>
                {/* receiver */}
                <text x="576" y="146" textAnchor="middle" fontSize="22" opacity={parallel ? 1 : 0.35}>📡</text>
                {parallel && (
                  <text x="500" y="40" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4bbf7a">signal locked ✓</text>
                )}
              </svg>

              <div className="mt-3">
                <label className="mb-1 flex justify-between text-sm font-semibold" style={{ color: "var(--sci-ink)" }}>
                  <span>Lamp distance from lens</span>
                  <span style={{ color: parallel ? "#4bbf7a" : "var(--sci-accent)" }}>
                    {dist} {parallel ? "· focused!" : dist < F ? "· too close" : "· too far"}
                  </span>
                </label>
                <input type="range" min={40} max={180} value={dist} onChange={(e) => setDist(parseInt(e.target.value))} className="sci-range w-full" />
              </div>

              <div className="mt-4 text-center">
                <button onClick={finish} disabled={!parallel}
                  className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ background: parallel ? "#4bbf7a" : "var(--sci-accent)", color: "#0c0c0c" }}>
                  ✓ Restore the signal
                </button>
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
                <h2 className="mt-2 font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>The station lives again!</h2>
                <p className="mt-2 opacity-85" style={{ color: "var(--sci-ink)" }}>
                  You rebuilt the circuit, calculated the current, fitted the right
                  fuse and focused the beam. Contact restored.
                  {alreadyDone ? " (Already completed — no new XP.)" : ` +${MASTERPIECE.xp} XP!`}
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <Link href="/physics" className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105" style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>
                    Back to the Observatory
                  </Link>
                  <Link href="/" className="rounded-full border-2 px-6 py-3 font-display font-bold" style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>
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
