"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Word } from "@/content/types";
import { rarityMeta } from "@/content/rarity";
import { useApp } from "@/lib/store";
import { playDiscovery, speak } from "@/lib/sound";
import { WordCard } from "./WordCard";
import { QuillTitle } from "./ui";

/**
 * The cinematic reveal shown the moment a word treasure is uncovered.
 * The page glows, ink spreads across parchment, the word is written by an
 * invisible quill, its pronunciation plays, and XP is awarded — then the full
 * entry unfurls below. Set `xpGained` to 0 for a plain "view" (no reward).
 */
export function WordReveal({
  word,
  xpGained,
  onClose,
}: {
  word: Word;
  xpGained: number;
  onClose: () => void;
}) {
  const { soundOn, reduceMotion } = useApp();
  const rm = rarityMeta(word.rarity);
  const [showCard, setShowCard] = useState(reduceMotion);
  const isNew = xpGained > 0;

  useEffect(() => {
    if (soundOn) {
      playDiscovery();
      const t = setTimeout(() => speak(word.word), 700);
      return () => clearTimeout(t);
    }
  }, [soundOn, word.word]);

  useEffect(() => {
    if (reduceMotion) return;
    const t = setTimeout(() => setShowCard(true), 1500);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  // Letters that float up out of the ink during the reveal.
  const letters = word.word.slice(0, 8).split("");

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/70 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Word discovered: ${word.word}`}
    >
      <div
        className="my-auto w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Reveal stage ── */}
        <div className="relative mb-4 flex flex-col items-center py-6 text-center">
          {/* expanding ink / light glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full blur-2xl"
            style={{ background: rm.glow }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 1], opacity: [0, 0.7, 0.45] }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />

          {/* floating letters */}
          {!reduceMotion &&
            letters.map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="pointer-events-none absolute top-24 font-display text-2xl font-bold"
                style={{ color: rm.color, left: `${30 + i * 6}%` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 0.9, 0], y: [-10, -90], rotate: (i - 3) * 12 }}
                transition={{ duration: 2, delay: 0.2 + i * 0.08, ease: "easeOut" }}
              >
                {ch}
              </motion.span>
            ))}

          {isNew && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative mb-3 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ background: rm.color, color: "white" }}
            >
              ✦ New Discovery ✦
            </motion.div>
          )}

          <div className="relative text-6xl" aria-hidden>
            <motion.span
              initial={{ scale: 0, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
              className="inline-block drop-shadow"
            >
              {word.motif}
            </motion.span>
          </div>

          <div className="relative mt-3">
            <QuillTitle
              text={word.word}
              className="font-display text-5xl font-extrabold text-[#f3dcae] sm:text-6xl"
              duration={reduceMotion ? 0.001 : 1.1}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="relative mt-2 font-hand text-2xl text-[#e8cfa0]"
          >
            {word.pronunciation}
          </motion.p>

          {isNew && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 1.1 }}
              className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-5 py-2 font-display text-lg font-extrabold text-[#2a1a0a] shadow-lg"
            >
              +{xpGained} XP
            </motion.div>
          )}
        </div>

        {/* ── Full entry ── */}
        <AnimatePresence>
          {showCard && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <WordCard word={word} />
              <div className="mt-4 flex justify-center pb-4">
                <button
                  onClick={onClose}
                  className="rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-6 py-3 font-display text-base font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  Continue exploring →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
