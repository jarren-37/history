/** The interactive stations of The Alchemist's Atelier. */
export interface Station {
  id: string;
  name: string;
  icon: string;
  topic: string;
  tagline: string;
  /** XP awarded the first time the station's challenge is completed. */
  xp: number;
}

export const STATIONS: Station[] = [
  {
    id: "bonding",
    name: "The Atomic Workshop",
    icon: "⚛️",
    topic: "Ionic Bonding",
    tagline: "Watch an electron leap from metal to non-metal, and a crystal is born.",
    xp: 40,
  },
  {
    id: "reaction",
    name: "The Reaction Cauldron",
    icon: "⚗️",
    topic: "Reactivity & Gases",
    tagline: "Drop metal into acid and witness hydrogen bubble to life.",
    xp: 40,
  },
  {
    id: "energy",
    name: "The Energy Mountain",
    icon: "🔥",
    topic: "Energy & Catalysts",
    tagline: "Every reaction must climb a mountain. A catalyst carves a tunnel through it.",
    xp: 45,
  },
  {
    id: "electrolysis",
    name: "The Electrolysis Chamber",
    icon: "⚡",
    topic: "Electrolysis",
    tagline: "Pass a current through a molten compound and tear it into its elements.",
    xp: 50,
  },
  {
    id: "organic",
    name: "The Carbon Forge",
    icon: "🧬",
    topic: "Organic Chemistry",
    tagline: "Forge carbon into chains and watch a family of molecules grow.",
    xp: 45,
  },
  {
    id: "periodic",
    name: "The Table of Elements",
    icon: "🔮",
    topic: "The Periodic Table",
    tagline: "Read the great map of matter — groups, periods and the trends within.",
    xp: 45,
  },
];

export function getStation(id: string): Station | undefined {
  return STATIONS.find((s) => s.id === id);
}

export const MASTERPIECE = {
  id: "masterpiece-water",
  name: "The Poisoned Well",
  icon: "🏆",
  topic: "Separation · Acids & Bases · Testing",
  intro:
    "The village's only well has been poisoned — cloudy, salty and dangerously acidic. Use everything you have learnt to make the water pure and safe again.",
  xp: 120,
};
