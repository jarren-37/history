"use client";

import type { Rarity } from "@/content/types";
import { rarityMeta } from "@/content/rarity";

/** A small gem-coloured badge showing a word's rarity. */
export function RarityBadge({
  rarity,
  size = "md",
}: {
  rarity: Rarity;
  size?: "sm" | "md";
}) {
  const m = rarityMeta(rarity);
  const pad = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-bold uppercase tracking-wider ${pad}`}
      style={{
        color: m.color,
        borderColor: m.color,
        background: `color-mix(in srgb, ${m.glow} 30%, transparent)`,
      }}
    >
      <span aria-hidden>{m.motif}</span>
      {m.label}
    </span>
  );
}
