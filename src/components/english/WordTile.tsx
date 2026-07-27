"use client";

import { motion } from "framer-motion";
import type { Word } from "@/content/english/types";
import { rarityMeta } from "@/content/english/rarity";
import { useApp } from "@/lib/english/store";
import { MAX_BOX } from "@/lib/english/progression";

/**
 * A single tile in the collection grid. Discovered words show their motif and
 * mastery; undiscovered words are a shadowed silhouette — a treasure to find.
 */
export function WordTile({
  word,
  onClick,
  index = 0,
}: {
  word: Word;
  onClick: () => void;
  index?: number;
}) {
  const { has, collection } = useApp();
  const found = has(word.id);
  const prog = collection[word.id];
  const rm = rarityMeta(word.rarity);
  const mastered = (prog?.review.box ?? 0) >= MAX_BOX;

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.min(index * 0.015, 0.3) }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.96 }}
      className="lift group relative flex aspect-square flex-col items-center justify-center rounded-2xl border-2 p-2 text-center"
      style={{
        borderColor: found ? rm.color : "var(--border)",
        background: found
          ? `color-mix(in srgb, ${rm.glow} 25%, var(--parch))`
          : "color-mix(in srgb, var(--ink) 5%, var(--parch))",
      }}
      aria-label={found ? word.word : "Undiscovered word"}
    >
      {found && mastered && (
        <span className="absolute right-1.5 top-1.5 text-xs" aria-hidden title="Mastered">
          👑
        </span>
      )}
      {found && prog?.favourite && (
        <span className="absolute left-1.5 top-1.5 text-xs" aria-hidden>
          ⭐
        </span>
      )}
      <span
        className="text-3xl transition-transform group-hover:scale-110"
        style={{ filter: found ? "none" : "grayscale(1) brightness(0.5)" }}
        aria-hidden
      >
        {found ? word.motif : "❔"}
      </span>
      <span
        className="mt-1 line-clamp-1 text-xs font-bold"
        style={{ color: found ? "var(--ink)" : "var(--ink-faint)" }}
      >
        {found ? word.word : "? ? ?"}
      </span>
      {found && (
        <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wide" style={{ color: rm.color }}>
          {rm.label}
        </span>
      )}
    </motion.button>
  );
}
