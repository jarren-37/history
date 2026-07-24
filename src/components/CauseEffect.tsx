"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CauseEffectChain } from "@/content/types";

/** The "Big Picture" cause-and-effect chain that ends every chapter. */
export function CauseEffect({ chain }: { chain: CauseEffectChain }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {chain.intro && (
        <p className="mb-6 max-w-2xl text-[var(--text-soft)]">{chain.intro}</p>
      )}
      <ol className="relative space-y-3">
        {chain.nodes.map((node, i) => {
          const isOpen = open === i;
          return (
            <li key={node.id}>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`flex w-full items-center gap-4 rounded-3xl border-2 px-4 py-4 text-left transition-all ${
                    isOpen
                      ? "border-[var(--c-primary)] bg-[var(--c-surface)] shadow-soft"
                      : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--c-secondary)]"
                  }`}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--c-secondary)] to-[var(--c-primary)] text-2xl shadow-soft">
                    {node.icon ?? "•"}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-lg font-extrabold leading-tight">
                      {node.label}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-[var(--text-faint)]">
                      Step {i + 1} of {chain.nodes.length}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="grid h-8 w-8 place-items-center rounded-full bg-[var(--c-surface)] text-lg text-[var(--c-deep)]"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-1 pt-3 text-sm leading-relaxed text-[var(--text-soft)]">
                        {node.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              {i < chain.nodes.length - 1 && (
                <div className="flex justify-start pl-9 pt-1">
                  <motion.span
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-2xl text-[var(--c-primary)]"
                  >
                    ↓
                  </motion.span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
