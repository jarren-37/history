"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Dialogue } from "@/content/types";
import { getCharacter } from "@/content/characters";

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

  const portrait = (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--c-secondary)] to-[var(--c-primary)] text-xl shadow-soft">
      {emoji}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -24 : 24, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2.5 ${
        side === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      {character ? (
        <Link href={`/characters/${character.id}`} aria-label={character.name}>
          {portrait}
        </Link>
      ) : (
        portrait
      )}
      <div
        className={`relative max-w-[80%] rounded-3xl px-4 py-2.5 ${
          side === "right"
            ? "rounded-br-md bg-gradient-to-br from-[var(--c-primary)] to-[var(--c-deep)] text-white"
            : "rounded-bl-md bg-[var(--card)] text-[var(--text)] shadow-soft"
        }`}
      >
        <p className="text-[11px] font-bold uppercase tracking-wide opacity-70">
          {name}
        </p>
        <p className="text-[15px] leading-snug">“{dialogue.text}”</p>
      </div>
    </motion.div>
  );
}
