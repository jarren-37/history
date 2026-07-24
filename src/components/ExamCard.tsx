"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ExamQuestion } from "@/content/types";

const SKILL_COLORS: Record<string, string> = {
  Inference: "#2f6fb0",
  Purpose: "#8459b3",
  Reliability: "#c0392b",
  Comparison: "#2f8f83",
  Assertion: "#e07b39",
  Utility: "#d6455b",
  "Explain (SEQ)": "#4257a8",
  "Judgement (SEQ)": "#7c2233",
};

/** A single O-Level practice question with reveal-able guidance. */
export function ExamCard({ q, index }: { q: ExamQuestion; index?: number }) {
  const [showScheme, setShowScheme] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [notes, setNotes] = useState("");
  const color = SKILL_COLORS[q.skill] ?? "var(--c-primary)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index ?? 0) * 0.05 }}
      className="card overflow-hidden rounded-3xl"
    >
      <div className="flex flex-wrap items-center gap-2 px-5 pt-5">
        <span
          className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
          style={{ background: color }}
        >
          {q.skill}
        </span>
        <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-bold text-[var(--text-soft)]">
          {q.format}
        </span>
        <span className="ml-auto rounded-full bg-[var(--c-surface)] px-3 py-1 text-xs font-bold text-[var(--c-deep)]">
          [{q.marks}]
        </span>
      </div>

      <div className="p-5">
        {q.source && (
          <div className="mb-4 rounded-2xl border-l-4 border-[var(--c-primary)] bg-[var(--c-surface)] px-4 py-3">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[var(--c-deep)]">
              Source · {q.source.label}
            </p>
            <p className="text-sm italic leading-relaxed">{q.source.text}</p>
          </div>
        )}

        <p className="font-display text-lg font-bold leading-snug">{q.question}</p>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Plan or write your answer here first…"
          rows={3}
          className="mt-3 w-full resize-y rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--c-primary)]"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setShowScheme((s) => !s)}
            className="rounded-full border-2 border-[var(--c-secondary)] px-4 py-1.5 text-sm font-bold transition-colors hover:bg-[var(--c-surface)]"
          >
            {showScheme ? "Hide" : "Show"} mark scheme
          </button>
          <button
            onClick={() => setShowModel((s) => !s)}
            className="rounded-full bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-4 py-1.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
          >
            {showModel ? "Hide" : "Reveal"} model answer
          </button>
        </div>

        <AnimatePresence>
          {showScheme && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--c-surface)] p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--c-deep)]">
                  How it's marked (2261 style)
                </p>
                <ul className="space-y-1.5">
                  {q.markScheme.map((m, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed">
                      <span className="text-[var(--c-primary)]">▸</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showModel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4 dark:bg-emerald-900/20">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  Model answer
                </p>
                <p className="text-sm leading-relaxed">{q.modelAnswer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
