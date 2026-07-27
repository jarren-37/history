import type { Rarity } from "./types";

/**
 * The rarity ladder. Difficult-but-beautiful words sit higher and feel more
 * rewarding to unlock — each tier has its own colour, glow and XP value.
 */
export interface RarityMeta {
  key: Rarity;
  label: string;
  /** Ordinal, 0 (common) … 5 (mythical). */
  tier: number;
  /** Accent colour for badges, borders and the reveal glow. */
  color: string;
  /** Soft companion for gradients. */
  glow: string;
  motif: string;
  /** XP awarded the first time this word is discovered. */
  xp: number;
}

export const RARITIES: Record<Rarity, RarityMeta> = {
  common: {
    key: "common",
    label: "Common",
    tier: 0,
    color: "#8a8f98",
    glow: "#c6cbd2",
    motif: "○",
    xp: 10,
  },
  uncommon: {
    key: "uncommon",
    label: "Uncommon",
    tier: 1,
    color: "#3f8f5a",
    glow: "#a9d8ab",
    motif: "◇",
    xp: 20,
  },
  rare: {
    key: "rare",
    label: "Rare",
    tier: 2,
    color: "#2f7bb0",
    glow: "#9cc9e8",
    motif: "◆",
    xp: 35,
  },
  epic: {
    key: "epic",
    label: "Epic",
    tier: 3,
    color: "#8459b3",
    glow: "#c6a7e4",
    motif: "✦",
    xp: 55,
  },
  legendary: {
    key: "legendary",
    label: "Legendary",
    tier: 4,
    color: "#c9962b",
    glow: "#f0d488",
    motif: "★",
    xp: 80,
  },
  mythical: {
    key: "mythical",
    label: "Mythical",
    tier: 5,
    color: "#d15a86",
    glow: "#f4b8cd",
    motif: "❋",
    xp: 120,
  },
};

export function rarityMeta(r: Rarity): RarityMeta {
  return RARITIES[r] ?? RARITIES.common;
}

export const RARITY_ORDER: Rarity[] = [
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
  "mythical",
];
