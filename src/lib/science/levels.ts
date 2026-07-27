/** Generic XP → level maths shared by the science subjects. */

export interface LevelInfo {
  level: number;
  into: number;
  span: number;
  floor: number;
  progress: number;
}

/** Level 1→2 costs 100 XP; each further level costs 40 more than the last. */
export function levelFromXp(xp: number): LevelInfo {
  let level = 1;
  let need = 100;
  let floor = 0;
  const safe = Math.max(0, Math.floor(xp));
  while (safe >= floor + need) {
    floor += need;
    level += 1;
    need += 40;
  }
  const into = safe - floor;
  return { level, into, span: need, floor, progress: need > 0 ? into / need : 0 };
}
