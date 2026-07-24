"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { TutorContent } from "@/content/tutor";

const LEVELS = [
  { key: "oneSentence", label: "1 sentence", icon: "⚡" },
  { key: "threeSentence", label: "3 sentences", icon: "📝" },
  { key: "fiveSentence", label: "5 sentences", icon: "📄" },
  { key: "peel", label: "PEEL paragraph", icon: "🧩" },
] as const;

/** Layered revision summaries — the "Exam Memory Mode" from the brief. */
export function ExamMemory({ tutor }: { tutor: TutorContent }) {
  const [level, setLevel] = useState<(typeof LEVELS)[number]["key"]>("oneSentence");

  return (
    <div className="card overflow-hidden rounded-3xl">
      <div className="flex items-center gap-2 bg-gradient-to-r from-[var(--c-deep)] to-[var(--c-primary)] px-5 py-3 text-white">
        <span className="text-lg">🎯</span>
        <p className="font-display text-sm font-extrabold uppercase tracking-wide">
          Exam memory mode
        </p>
      </div>
      <div className="p-5">
        <p className="mb-4 text-sm text-[var(--text-soft)]">
          Zoom from a one-line hook out to a full exam paragraph. Read it, then try to rebuild it from memory.
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.key}
              onClick={() => setLevel(l.key)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ${
                level === l.key
                  ? "bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] text-white"
                  : "border border-[var(--border)] hover:border-[var(--c-primary)]"
              }`}
            >
              {l.icon} {l.label}
            </button>
          ))}
        </div>

        <motion.div
          key={level}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-[var(--c-surface)] p-5"
        >
          {level === "peel" ? (
            <div className="space-y-2.5">
              {(
                [
                  ["Point", tutor.peel.point, "#d6455b"],
                  ["Evidence", tutor.peel.evidence, "#e07b39"],
                  ["Explain", tutor.peel.explain, "#2f8f83"],
                  ["Link", tutor.peel.link, "#4257a8"],
                ] as const
              ).map(([label, text, c]) => (
                <div key={label} className="flex gap-3">
                  <span
                    className="mt-0.5 h-fit rounded-lg px-2 py-0.5 text-xs font-bold uppercase text-white"
                    style={{ background: c }}
                  >
                    {label}
                  </span>
                  <p className="flex-1 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-display text-lg font-semibold leading-relaxed">
              {tutor[level]}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
