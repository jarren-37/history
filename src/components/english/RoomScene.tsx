"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Room, Word } from "@/content/english/types";
import { getWord } from "@/content/english/words";
import { paletteVars, getPalette } from "@/content/english/palettes";
import { useApp } from "@/lib/english/store";
import { playPageTurn } from "@/lib/sound";
import { WordReveal } from "./WordReveal";
import { rarityMeta } from "@/content/english/rarity";

/**
 * An explorable hall. Objects glow until discovered; clicking one uncovers its
 * word treasure with the full cinematic reveal. Discovered objects settle into
 * a calm "found" state with a checkmark.
 */
export function RoomScene({ room }: { room: Room }) {
  const { has, discoverWord } = useApp();
  const [active, setActive] = useState<{ word: Word; xp: number } | null>(null);
  const palette = getPalette(room.palette);

  function open(wordId: string) {
    const word = getWord(wordId);
    if (!word) return;
    const wasNew = !has(wordId);
    const xp = wasNew ? discoverWord(wordId) : 0;
    playPageTurn();
    setActive({ word, xp });
  }

  return (
    <div style={paletteVars(room.palette)}>
      <div
        className="relative h-[440px] w-full overflow-hidden rounded-3xl border-2 sm:h-[520px]"
        style={{
          borderColor: "color-mix(in srgb, var(--c-deep) 40%, transparent)",
          background: `radial-gradient(120% 90% at 50% 0%, ${palette.secondary}55, transparent 60%), radial-gradient(100% 100% at 50% 120%, ${palette.deep}66, transparent 60%), linear-gradient(180deg, ${palette.surface}, color-mix(in srgb, ${palette.primary} 22%, var(--parch)))`,
        }}
      >
        {/* paper grain */}
        <div className="paper pointer-events-none absolute inset-0 opacity-30" />

        {/* drifting motes */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              background: "rgba(255,255,255,0.5)",
            }}
            animate={{ y: [0, -18, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* hall title */}
        <div className="pointer-events-none absolute left-4 top-4 max-w-[60%]">
          <div className="text-2xl">{room.motif}</div>
          <div
            className="font-display text-lg font-extrabold leading-tight"
            style={{ color: palette.deep }}
          >
            {room.name}
          </div>
        </div>

        {/* discoverable objects */}
        {room.objects.map((obj) => {
          const found = has(obj.wordId);
          const word = getWord(obj.wordId);
          const rm = word ? rarityMeta(word.rarity) : null;
          return (
            <button
              key={obj.id}
              onClick={() => open(obj.wordId)}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center focus:outline-none"
              style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
              aria-label={found ? `Revisit ${word?.word}` : `Investigate ${obj.label}`}
            >
              {/* glow ring for undiscovered treasures */}
              {!found && (
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 animate-pulse-ring rounded-full"
                  style={{
                    boxShadow: `0 0 24px 6px ${rm?.glow ?? "#fff"}`,
                    background: `${rm?.glow ?? "#fff"}55`,
                  }}
                />
              )}
              <motion.span
                whileHover={{ scale: 1.18, rotate: found ? 0 : 6 }}
                whileTap={{ scale: 0.9 }}
                className="grid h-14 w-14 place-items-center rounded-2xl text-3xl shadow-lg transition-shadow"
                style={{
                  background: found
                    ? "color-mix(in srgb, var(--parch) 85%, transparent)"
                    : `color-mix(in srgb, ${rm?.glow ?? "#fff"} 55%, var(--parch))`,
                  filter: found ? "grayscale(0.15)" : "none",
                }}
              >
                {obj.emoji}
              </motion.span>

              {/* discovered check */}
              {found && (
                <span
                  aria-hidden
                  className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-600 text-[11px] text-white shadow"
                >
                  ✓
                </span>
              )}

              {/* hover hint / found word */}
              <span
                className="pointer-events-none mt-2 max-w-[160px] rounded-lg border px-2 py-1 text-center text-[11px] font-semibold opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus:opacity-100"
                style={{
                  background: "var(--parch)",
                  borderColor: "var(--border)",
                  color: "var(--ink)",
                }}
              >
                {found ? word?.word : obj.hint}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <WordReveal
            word={active.word}
            xpGained={active.xp}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
