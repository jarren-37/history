"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playChime } from "@/lib/sound";

/**
 * Shared, store-agnostic UI for the science subjects. Everything is themed via
 * CSS custom properties (--sci-accent, --sci-glow, --sci-ink, --sci-panel,
 * --sci-border) that each subject's layout sets, so the Atelier (copper) and
 * the Observatory (electric blue) reuse the exact same components.
 */

export function SciPanel({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${className}`}
      style={{
        background: "var(--sci-panel)",
        borderColor: "var(--sci-border)",
        color: "var(--sci-ink)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function StationTopBar({
  backHref,
  backLabel = "The Atelier",
}: {
  backHref: string;
  backLabel?: string;
}) {
  return (
    <Link
      href={backHref}
      className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold opacity-80 transition-opacity hover:opacity-100"
      style={{ color: "var(--sci-ink)" }}
    >
      ← {backLabel}
    </Link>
  );
}

export function Slider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  unit = "",
  format,
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  format?: (v: number) => string;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between text-sm font-semibold" style={{ color: "var(--sci-ink)" }}>
        <span>{label}</span>
        <span style={{ color: "var(--sci-accent)" }}>
          {format ? format(value) : value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="sci-range w-full"
      />
    </label>
  );
}

/**
 * A "why is this happening?" gate. The learner must answer before the concept
 * counts as understood. Reports the first correct answer via onResolved.
 */
export function WhyGate({
  question,
  options,
  answer,
  explain,
  onResolved,
}: {
  question: string;
  options: string[];
  answer: number;
  explain: string;
  onResolved?: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);

  function choose(i: number) {
    if (solved) return;
    setPicked(i);
    const correct = i === answer;
    playChime(correct);
    if (correct) {
      setSolved(true);
      onResolved?.();
    }
  }

  return (
    <SciPanel>
      <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--sci-accent)" }}>
        🤔 Before you continue…
      </div>
      <p className="mt-1 font-display text-lg font-bold">{question}</p>
      <div className="mt-3 grid gap-2">
        {options.map((opt, i) => {
          const isAns = i === answer;
          const show = picked !== null;
          let border = "var(--sci-border)";
          let bg = "transparent";
          if (show && isAns) {
            border = "#10b981";
            bg = "rgba(16,185,129,0.15)";
          } else if (show && picked === i) {
            border = "#f43f5e";
            bg = "rgba(244,63,94,0.15)";
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={solved}
              className="rounded-xl border-2 px-4 py-2.5 text-left font-semibold transition-colors"
              style={{ borderColor: border, background: bg, color: "var(--sci-ink)" }}
            >
              {opt}
              {show && isAns && " ✓"}
              {show && picked === i && !isAns && " ✗"}
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {picked !== null && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 overflow-hidden text-sm opacity-90"
          >
            {picked === answer ? "✅ " : "Not quite — "}
            {explain}
          </motion.p>
        )}
      </AnimatePresence>
    </SciPanel>
  );
}

export function CompleteButton({
  done,
  xp,
  disabled,
  onComplete,
  nextHref,
  nextLabel = "Next station →",
  hint,
}: {
  done: boolean;
  xp: number;
  disabled?: boolean;
  onComplete: () => void;
  nextHref?: string;
  nextLabel?: string;
  hint?: string;
}) {
  const [justDone, setJustDone] = useState(false);
  function click() {
    if (disabled || done) return;
    onComplete();
    setJustDone(true);
  }
  const finished = done || justDone;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {!finished ? (
        <>
          <button
            onClick={click}
            disabled={disabled}
            className="rounded-full px-6 py-3 font-display text-base font-extrabold shadow-lg transition-transform enabled:hover:scale-105 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}
          >
            Complete station (+{xp} XP)
          </button>
          {disabled && hint && (
            <span className="text-sm opacity-70" style={{ color: "var(--sci-ink)" }}>
              {hint}
            </span>
          )}
        </>
      ) : (
        <>
          <span
            className="inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 font-display font-bold"
            style={{ borderColor: "#10b981", color: "var(--sci-ink)" }}
          >
            ✓ Station complete
          </span>
          {nextHref && (
            <Link
              href={nextHref}
              className="rounded-full px-6 py-3 font-display text-base font-extrabold shadow-lg transition-transform hover:scale-105"
              style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}
            >
              {nextLabel}
            </Link>
          )}
        </>
      )}
    </div>
  );
}

/** A one-shot confetti burst for completing a masterpiece. */
export function SciConfetti({ count = 28 }: { count?: number }) {
  const colors = ["#e0913f", "#4bbf7a", "#6a97ff", "#d8b24a", "#ffce6b", "#f4b8cd"];
  const pieces = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 320,
    rot: Math.random() * 360,
    delay: Math.random() * 0.25,
    color: colors[i % colors.length],
    square: i % 2 === 0,
  }));
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center overflow-visible">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-2"
          initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
          animate={{ opacity: [0, 1, 1, 0], y: [0, 200], x: [0, p.x], rotate: [0, p.rot + 240] }}
          transition={{ duration: 1.8, delay: p.delay, ease: "easeOut" }}
          style={{ width: 9, height: p.square ? 9 : 12, borderRadius: p.square ? 2 : 999, background: p.color }}
        />
      ))}
    </div>
  );
}

export function StationHeading({
  icon,
  topic,
  title,
  children,
}: {
  icon: string;
  topic: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{icon}</span>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--sci-accent)" }}>
            {topic}
          </div>
          <h1 className="font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>
            {title}
          </h1>
        </div>
      </div>
      {children && (
        <p className="mt-2 max-w-2xl opacity-85" style={{ color: "var(--sci-ink)" }}>
          {children}
        </p>
      )}
    </div>
  );
}
