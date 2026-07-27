"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { lookupTerm } from "@/content/history/glossary";

interface GlossaryApi {
  openTerm: (term: string) => void;
  has: (term: string) => boolean;
}

const GlossaryContext = createContext<GlossaryApi | null>(null);

export function useGlossary(): GlossaryApi | null {
  return useContext(GlossaryContext);
}

/**
 * Provides tappable key-term definitions. Any glossary term in the story can be
 * opened; a parchment note unfolds from the foot of the page with the meaning —
 * the "textbook margin note", made interactive.
 */
export function GlossaryProvider({ children }: { children: ReactNode }) {
  const [term, setTerm] = useState<string | null>(null);
  const definition = term ? lookupTerm(term) : undefined;

  const openTerm = useCallback((t: string) => {
    if (lookupTerm(t)) setTerm(t);
  }, []);
  const has = useCallback((t: string) => Boolean(lookupTerm(t)), []);

  return (
    <GlossaryContext.Provider value={{ openTerm, has }}>
      {children}
      <AnimatePresence>
        {term && definition && (
          <motion.div
            key="glossary-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setTerm(null)}
            className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-center sm:p-6"
            style={{ background: "rgba(20,12,4,0.55)", backdropFilter: "blur(2px)" }}
          >
            <motion.div
              key="glossary-card"
              initial={{ opacity: 0, y: 40, rotate: -0.6 }}
              animate={{ opacity: 1, y: 0, rotate: -0.4 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="page relative w-full max-w-md overflow-hidden rounded-2xl px-5 pb-5 pt-6"
            >
              <span
                className="absolute -top-2 left-8 h-4 w-4 rounded-full"
                style={{
                  background: "radial-gradient(circle at 35% 30%, #c14a3d, #8f2d24)",
                }}
              />
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--gold)]">
                From the glossary
              </p>
              <h3 className="mt-1 font-display text-2xl font-black text-[var(--ink)]">
                {term}
              </h3>
              <div
                className="my-3 h-px w-full"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, var(--parch-edge) 0 6px, transparent 6px 12px)",
                }}
              />
              <p className="font-serif text-[1.02rem] leading-relaxed text-[var(--ink-soft)]">
                {definition}
              </p>
              <button
                onClick={() => setTerm(null)}
                className="mt-4 w-full rounded-xl border border-[var(--parch-edge)] bg-[var(--parch-2)] py-2.5 font-display text-sm font-bold text-[var(--ink-soft)] transition-transform active:scale-95"
              >
                Close the note
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlossaryContext.Provider>
  );
}
