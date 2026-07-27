"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Dialogue } from "@/content/history/types";
import { getCharacter } from "@/content/history/characters";
import { CharacterPortrait } from "./CharacterPortrait";

/** A speech bubble with an optional linked character portrait. */
export function DialogueBubble({
  dialogue,
  index = 0,
}: {
  dialogue: Dialogue;
  index?: number;
}) {
  const character = dialogue.characterId
    ? getCharacter(dialogue.characterId)
    : undefined;
  const side = dialogue.side ?? (index % 2 === 0 ? "left" : "right");
  const name = character?.name ?? dialogue.speaker;
  const emoji = character?.emoji ?? "💬";

  const portrait = character ? (
    <CharacterPortrait id={character.id} size={48} breathing={false} className="shrink-0" />
  ) : (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--c-secondary)] to-[var(--c-primary)] text-xl shadow-soft">
      {emoji}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -20 : 20, scale: 0.97 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-2.5 ${
        side === "right" ? "flex-row-reverse" : ""
      }`}
    >
      {character ? (
        <Link href={`/history/characters/${character.id}`} aria-label={character.name}>
          {portrait}
        </Link>
      ) : (
        portrait
      )}
      {/* aged parchment note, slightly rotated, sealed with wax */}
      <div
        className="relative max-w-[82%] rounded-[10px] px-4 py-2.5"
        style={{
          background:
            "linear-gradient(135deg, #f6ead0, #ecdcb6)",
          border: "1px solid var(--parch-edge)",
          boxShadow: "0 6px 16px -8px rgba(0,0,0,0.45), inset 0 0 20px rgba(150,110,60,0.12)",
          transform: side === "right" ? "rotate(1.1deg)" : "rotate(-1.1deg)",
        }}
      >
        <span
          className={`absolute -top-1.5 h-3 w-3 rounded-full ${
            side === "right" ? "right-3" : "left-3"
          }`}
          style={{ background: "radial-gradient(circle at 35% 30%, #c14a3d, #8f2d24)" }}
        />
        <p className="font-display text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--wax)]">
          {name}
        </p>
        <p className="font-serif text-[15px] italic leading-snug text-[var(--ink)]">
          “{dialogue.text}”
        </p>
      </div>
    </motion.div>
  );
}
