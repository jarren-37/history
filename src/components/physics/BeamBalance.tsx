"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useObservatory } from "@/lib/physics/store";
import { playChime, playZap, playTick } from "@/lib/sound";
import { SciPanel, StationTopBar, SciConfetti, Slider } from "@/components/science/ui";

const XP_PER = 15;

interface Round {
  leftForce: number; // N
  leftDist: number; // cm from pivot
  rightForce: number; // N
  min: number;
  max: number;
  start: number;
}

/** Every round has an exact integer solution inside [min, max]. */
const ROUNDS: Round[] = [
  { leftForce: 4, leftDist: 30, rightForce: 6, min: 5, max: 50, start: 5 }, // → 20
  { leftForce: 10, leftDist: 20, rightForce: 5, min: 5, max: 50, start: 5 }, // → 40
  { leftForce: 8, leftDist: 15, rightForce: 6, min: 5, max: 50, start: 5 }, // → 20
  { leftForce: 12, leftDist: 25, rightForce: 10, min: 5, max: 50, start: 5 }, // → 30
  { leftForce: 9, leftDist: 40, rightForce: 12, min: 5, max: 50, start: 5 }, // → 30
];

export function BeamBalance() {
  const { addXp } = useObservatory();
  const [round, setRound] = useState(0);
  const [dist, setDist] = useState(ROUNDS[0].start);
  const [locked, setLocked] = useState(false);
  const [miss, setMiss] = useState(false);
  const [finished, setFinished] = useState(false);

  const r = ROUNDS[round];
  const leftMoment = r.leftForce * r.leftDist;
  const rightMoment = r.rightForce * dist;
  const balanced = leftMoment === rightMoment;

  // Tilt: right side heavier -> right drops (positive angle). Clamped for looks.
  const tilt = useMemo(() => {
    if (locked && balanced) return 0;
    const net = rightMoment - leftMoment;
    return Math.max(-13, Math.min(13, net / 40));
  }, [rightMoment, leftMoment, locked, balanced]);

  function lockIn() {
    if (locked) return;
    if (balanced) {
      setLocked(true);
      playChime(true);
      playZap();
      addXp(XP_PER);
    } else {
      setMiss(true);
      playChime(false);
      setTimeout(() => setMiss(false), 700);
    }
  }

  function next() {
    if (round + 1 >= ROUNDS.length) {
      setFinished(true);
      return;
    }
    const nr = round + 1;
    setRound(nr);
    setDist(ROUNDS[nr].start);
    setLocked(false);
  }

  function restart() {
    setRound(0);
    setDist(ROUNDS[0].start);
    setLocked(false);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
        <StationTopBar backHref="/physics/games" backLabel="Games room" />
        <SciPanel className="relative overflow-hidden text-center">
          <SciConfetti count={28} />
          <div className="relative">
            <div className="text-5xl">⚖️</div>
            <h2 className="mt-2 font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>
              Every beam balanced!
            </h2>
            <p className="mt-2 opacity-85" style={{ color: "var(--sci-ink)" }}>
              You mastered all {ROUNDS.length} levers. +{ROUNDS.length * XP_PER} XP.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                onClick={restart}
                className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105"
                style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}
              >
                Play again
              </button>
              <Link
                href="/physics/games"
                className="rounded-full border-2 px-6 py-3 font-display font-bold"
                style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}
              >
                Games room
              </Link>
            </div>
          </div>
        </SciPanel>
      </div>
    );
  }

  // Scale distances to horizontal offsets (cm → px), pivot at centre.
  const HALF = 150; // px each side at 50 cm
  const leftX = -(r.leftDist / 50) * HALF;
  const rightX = (dist / 50) * HALF;

  const Weight = ({ x, force, tone }: { x: number; force: number; tone: string }) => (
    <div
      className="absolute top-1/2 flex flex-col items-center"
      style={{ left: `calc(50% + ${x}px)`, transform: "translate(-50%, 0)" }}
    >
      <div className="h-4 w-px" style={{ background: "var(--sci-ink)", opacity: 0.5 }} />
      <div
        className="grid place-items-center rounded-md border-2 font-mono text-xs font-bold"
        style={{
          width: 30 + force * 1.6,
          height: 22 + force * 1.2,
          borderColor: tone,
          background: `color-mix(in srgb, ${tone} 22%, transparent)`,
          color: "var(--sci-ink)",
        }}
      >
        {force}N
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/physics/games" backLabel="Games room" />
      <div className="mb-4 flex items-center gap-3">
        <span className="text-4xl">⚖️</span>
        <div>
          <h1 className="font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>
            Balance the Beam
          </h1>
          <p className="opacity-80" style={{ color: "var(--sci-ink)" }}>
            Lever {round + 1} of {ROUNDS.length}
          </p>
        </div>
      </div>

      <SciPanel>
        <p className="text-center text-sm opacity-85" style={{ color: "var(--sci-ink)" }}>
          A <strong>{r.leftForce} N</strong> load hangs <strong>{r.leftDist} cm</strong> left of the pivot.
          Slide the <strong>{r.rightForce} N</strong> load until the beam is level.
        </p>

        {/* beam stage */}
        <div className="relative mx-auto mt-4 h-52 w-full max-w-md">
          <motion.div
            className="absolute left-1/2 top-1/2 h-0 w-full"
            style={{ transformOrigin: "center", x: "-50%" }}
            animate={{ rotate: tilt }}
            transition={miss ? { duration: 0.4 } : { type: "spring", stiffness: 120, damping: 14 }}
          >
            {/* the bar */}
            <div
              className="absolute left-0 top-1/2 h-2.5 w-full -translate-y-1/2 rounded-full"
              style={{ background: "var(--sci-accent)", boxShadow: `0 0 14px var(--sci-glow)` }}
            />
            <Weight x={leftX} force={r.leftForce} tone="#e0913f" />
            <Weight x={rightX} force={r.rightForce} tone="var(--sci-accent)" />
          </motion.div>

          {/* pivot */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "18px solid transparent",
              borderRight: "18px solid transparent",
              borderBottom: "30px solid var(--sci-border)",
            }}
          />
          <div className="absolute bottom-2 left-1/2 h-2 w-40 -translate-x-1/2 rounded-full" style={{ background: "var(--sci-border)" }} />
        </div>

        {/* moment readout */}
        <div className="mt-2 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-xl border p-2" style={{ borderColor: "var(--sci-border)" }}>
            <div className="text-[11px] font-bold uppercase tracking-widest opacity-70">Left moment</div>
            <div className="font-mono text-lg font-bold" style={{ color: "var(--sci-ink)" }}>
              {r.leftForce} × {r.leftDist} = {leftMoment}
            </div>
          </div>
          <div className="rounded-xl border p-2" style={{ borderColor: balanced ? "#4bbf7a" : "var(--sci-border)" }}>
            <div className="text-[11px] font-bold uppercase tracking-widest opacity-70">Right moment</div>
            <div className="font-mono text-lg font-bold" style={{ color: balanced ? "#4bbf7a" : "var(--sci-ink)" }}>
              {r.rightForce} × {dist} = {rightMoment}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Slider
            label={`Distance of the ${r.rightForce} N load`}
            min={r.min}
            max={r.max}
            step={1}
            value={dist}
            onChange={(v) => {
              if (!locked) {
                setDist(v);
                playTick();
              }
            }}
            unit=" cm"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {!locked ? (
            <button
              onClick={lockIn}
              className="rounded-full px-7 py-3 font-display text-base font-extrabold shadow-lg transition-transform hover:scale-105 active:scale-95"
              style={{
                background: balanced ? "#4bbf7a" : "var(--sci-accent)",
                color: "#0c0c0c",
              }}
            >
              {balanced ? "Balanced — lock it in ⚖️" : "Lock it in ⚖️"}
            </button>
          ) : (
            <>
              <span
                className="inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 font-display font-bold"
                style={{ borderColor: "#4bbf7a", color: "var(--sci-ink)" }}
              >
                ✓ Perfectly level — moments equal at {leftMoment}
              </span>
              <button
                onClick={next}
                className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105"
                style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}
              >
                {round + 1 >= ROUNDS.length ? "See results →" : "Next beam →"}
              </button>
            </>
          )}
        </div>

        {miss && (
          <p className="mt-3 text-center text-sm font-bold text-rose-400">
            Not level yet — the {rightMoment > leftMoment ? "right" : "left"} side still drops. Match the moments.
          </p>
        )}
      </SciPanel>

      <p className="mt-3 text-center text-sm opacity-70" style={{ color: "var(--sci-ink)" }}>
        Principle of moments: a beam balances when <strong>force × distance</strong> is equal on both sides.
      </p>
    </div>
  );
}
