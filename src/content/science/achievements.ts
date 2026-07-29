/** Shared achievements for the science subjects (Atelier & Observatory). */
export interface SciAchievement {
  id: string;
  name: string;
  description: string;
  motif: string;
}

export const SCI_ACHIEVEMENTS: SciAchievement[] = [
  { id: "first", name: "First Discovery", description: "Complete your first station.", motif: "🌱" },
  { id: "half", name: "Halfway There", description: "Master half of the stations.", motif: "📈" },
  { id: "all", name: "Hall Master", description: "Master every station.", motif: "🏛️" },
  { id: "masterpiece", name: "Masterwork", description: "Complete the Masterpiece challenge.", motif: "🏆" },
  { id: "level5", name: "Rising Star", description: "Reach Level 5.", motif: "⭐" },
  { id: "streak3", name: "Devoted", description: "Keep a three-day streak alive.", motif: "🔥" },
];

export function sciUnlocked(opts: {
  stationsDone: number;
  stationsTotal: number;
  masterpieceDone: boolean;
  level: number;
  streak: number;
}): Set<string> {
  const s = new Set<string>();
  if (opts.stationsDone >= 1) s.add("first");
  if (opts.stationsDone >= Math.ceil(opts.stationsTotal / 2)) s.add("half");
  if (opts.stationsDone >= opts.stationsTotal && opts.stationsTotal > 0) s.add("all");
  if (opts.masterpieceDone) s.add("masterpiece");
  if (opts.level >= 5) s.add("level5");
  if (opts.streak >= 3) s.add("streak3");
  return s;
}
