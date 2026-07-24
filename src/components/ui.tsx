"use client";

import { motion } from "framer-motion";
import React from "react";

/** Fade-and-rise wrapper used throughout for gentle entrances. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Renders a paragraph, wrapping any highlight phrases in a coloured mark.
 * Matching is case-insensitive and longest-first so overlaps behave.
 */
export function HighlightedText({
  text,
  highlights = [],
}: {
  text: string;
  highlights?: string[];
}) {
  if (!highlights.length) return <>{text}</>;
  const sorted = [...highlights].sort((a, b) => b.length - a.length);
  const escaped = sorted.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        sorted.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
          <span key={i} className="hl">
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

/** A soft rounded pill/badge. */
export function Pill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--c-surface)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--c-deep)] ${className}`}
    >
      {children}
    </span>
  );
}

/** A gentle one-shot confetti burst for achievements. */
export function Confetti({ count = 26 }: { count?: number }) {
  const colors = [
    "#d6455b",
    "#e07b39",
    "#2f8f83",
    "#2f6fb0",
    "#8459b3",
    "#ffce6b",
  ];
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
          className="absolute top-6"
          initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [0, 180 + Math.random() * 80],
            x: [0, p.x],
            rotate: [0, p.rot + 240],
          }}
          transition={{ duration: 1.8, delay: p.delay, ease: "easeOut" }}
          style={{
            width: 9,
            height: p.square ? 9 : 12,
            borderRadius: p.square ? 2 : 999,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}

/** Slim progress bar coloured with the active palette. */
export function ProgressBar({
  value,
  className = "",
}: {
  value: number; // 0..1
  className?: string;
}) {
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-[var(--c-surface)] ${className}`}
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-[var(--c-secondary)] to-[var(--c-primary)]"
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
