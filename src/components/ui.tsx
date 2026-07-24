"use client";

import { motion } from "framer-motion";
import React from "react";
import { useGlossary } from "./Glossary";

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
 * If a highlighted phrase is a glossary term (and a GlossaryProvider is above
 * in the tree), it becomes a tappable button that opens its definition —
 * shown with a dotted underline to invite the tap.
 * Matching is case-insensitive and longest-first so overlaps behave.
 */
export function HighlightedText({
  text,
  highlights = [],
}: {
  text: string;
  highlights?: string[];
}) {
  const glossary = useGlossary();
  if (!highlights.length) return <>{text}</>;
  const sorted = [...highlights].sort((a, b) => b.length - a.length);
  const escaped = sorted.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) => {
        const isHighlight = sorted.some(
          (h) => h.toLowerCase() === part.toLowerCase()
        );
        if (!isHighlight) return <React.Fragment key={i}>{part}</React.Fragment>;
        if (glossary?.has(part)) {
          return (
            <button
              key={i}
              onClick={() => glossary.openTerm(part)}
              className="hl cursor-pointer underline decoration-dotted decoration-[var(--wax)] decoration-2 underline-offset-4 transition-colors hover:decoration-solid"
              title={`Definition: ${part}`}
            >
              {part}
            </button>
          );
        }
        return (
          <span key={i} className="hl">
            {part}
          </span>
        );
      })}
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

/**
 * A title written by an invisible quill: the ink sweeps in left-to-right while
 * a nib glides along the writing edge. Used for cinematic chapter reveals.
 */
export function QuillTitle({
  text,
  className = "",
  duration = 1.2,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  return (
    <div className="relative inline-block">
      <motion.h1
        className={className}
        initial={{ clipPath: "inset(0 100% -10% 0)" }}
        animate={{ clipPath: "inset(0 0% -10% 0)" }}
        transition={{ duration, ease: [0.5, 0, 0.2, 1] }}
      >
        {text}
      </motion.h1>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute top-0 text-2xl"
        initial={{ left: "0%", opacity: 0 }}
        animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration, ease: [0.5, 0, 0.2, 1] }}
        style={{ transform: "translate(-40%, -20%) rotate(8deg)" }}
      >
        🖋️
      </motion.span>
    </div>
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
