"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { StoryChoice } from "@/content/history/types";

/** A "what would you do?" branching moment. */
export function StoryChoiceCard({ choice }: { choice: StoryChoice }) {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div className="card overflow-hidden rounded-3xl">
      <div className="flex items-center gap-2 bg-gradient-to-r from-[var(--c-deep)] to-[var(--c-primary)] px-5 py-3 text-white">
        <span className="text-lg">🧭</span>
        <p className="font-display text-sm font-extrabold uppercase tracking-wide">
          Your choice
        </p>
      </div>
      <div className="p-5">
        <p className="mb-4 font-display text-lg font-bold">{choice.question}</p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {choice.options.map((opt, i) => {
            const isPicked = picked === i;
            return (
              <button
                key={i}
                onClick={() => setPicked(i)}
                className={`rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold transition-all ${
                  isPicked
                    ? "border-[var(--c-primary)] bg-[var(--c-surface)] shadow-soft"
                    : picked !== null
                    ? "border-[var(--border)] opacity-60 hover:opacity-100"
                    : "border-[var(--border)] bg-[var(--card)] hover:-translate-y-0.5 hover:border-[var(--c-primary)]"
                }`}
              >
                <span className="mr-1.5 font-display text-[var(--c-primary)]">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {picked !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-3"
            >
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--c-surface)] px-4 py-3">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[var(--c-deep)]">
                  {choice.options[picked].historical
                    ? "That's close to what happened"
                    : "You chose differently"}
                </p>
                <p className="text-sm leading-relaxed">
                  {choice.options[picked].outcome}
                </p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-[var(--c-primary)] to-[var(--c-deep)] px-4 py-3 text-white">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide opacity-80">
                  What actually happened
                </p>
                <p className="text-sm leading-relaxed">{choice.reality}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
