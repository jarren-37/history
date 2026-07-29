/** The interactive stations of The Inventor's Observatory. */
export interface Station {
  id: string;
  name: string;
  icon: string;
  topic: string;
  tagline: string;
  xp: number;
}

export const STATIONS: Station[] = [
  {
    id: "forces",
    name: "The Rocket Gantry",
    icon: "🚀",
    topic: "Forces · F = ma",
    tagline: "Balance thrust against mass and feel Newton's second law in your hands.",
    xp: 40,
  },
  {
    id: "circuits",
    name: "The Circuit Bench",
    icon: "🔌",
    topic: "Electricity · Ohm's Law",
    tagline: "Wire up a circuit and watch current glow — then slow as resistance climbs.",
    xp: 45,
  },
  {
    id: "waves",
    name: "The Wave Table",
    icon: "🌊",
    topic: "Waves · v = fλ",
    tagline: "Turn the dial and watch wavelength shrink as frequency rises.",
    xp: 40,
  },
  {
    id: "gravity",
    name: "The Orrery",
    icon: "🪐",
    topic: "Gravity & Orbits",
    tagline: "Fire a satellite at just the right speed to catch a stable orbit.",
    xp: 50,
  },
  {
    id: "magnetism",
    name: "The Lodestone Array",
    icon: "🧲",
    topic: "Magnetism & Induction",
    tagline: "Bend invisible fields, then conjure electricity from pure motion.",
    xp: 45,
  },
  {
    id: "thermal",
    name: "The Heat Forge",
    icon: "🌡️",
    topic: "Thermal Physics",
    tagline: "Turn up the heat and watch particles wake, race and change state.",
    xp: 45,
  },
  {
    id: "momentum",
    name: "The Collision Track",
    icon: "🚃",
    topic: "Momentum",
    tagline: "Crash two carts together and prove momentum is never lost.",
    xp: 45,
  },
];

export function getStation(id: string): Station | undefined {
  return STATIONS.find((s) => s.id === id);
}

export const MASTERPIECE = {
  id: "masterpiece-storm",
  name: "The Darkened Station",
  icon: "🏆",
  topic: "Circuits · Ohm's Law · Optics",
  intro:
    "A storm has knocked out the remote research station. Rebuild the circuit, choose the right fuse, and use a lens to relight the signal lamp before dawn.",
  xp: 120,
};
