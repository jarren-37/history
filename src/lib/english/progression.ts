/**
 * Progression maths for LEXICON: XP → Scholar Level, level titles, and a
 * gentle Leitner-style spaced-repetition scheduler. All pure functions so they
 * are trivial to test and safe to run on the server or client.
 */

export interface LevelInfo {
  level: number;
  /** XP earned within the current level. */
  into: number;
  /** XP span of the current level. */
  span: number;
  /** Cumulative XP at the start of the current level. */
  floor: number;
  /** 0..1 progress through the current level. */
  progress: number;
  title: string;
}

/** Titles awarded as the scholar climbs. */
export function levelTitle(level: number): string {
  if (level >= 16) return "Grand Lexicographer";
  if (level >= 12) return "Loremaster";
  if (level >= 9) return "Lexicographer";
  if (level >= 7) return "Sage of Words";
  if (level >= 5) return "Scholar";
  if (level >= 3) return "Apprentice Scribe";
  return "Novice Reader";
}

/**
 * XP curve. Level 1→2 costs 100 XP; each further level costs 40 more than the
 * last, so the climb steepens gently and never feels grindy early on.
 */
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
  return {
    level,
    into,
    span: need,
    floor,
    progress: need > 0 ? into / need : 0,
    title: levelTitle(level),
  };
}

// ── Spaced repetition (Leitner boxes) ──────────────────────────────────────

const DAY = 24 * 60 * 60 * 1000;

/** Box → days until the word should resurface. Box 5 = deeply mastered. */
export const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16, 40];
export const MAX_BOX = 5;

export interface ReviewState {
  /** Leitner box, 0 (just met) … 5 (mastered). */
  box: number;
  /** Timestamp (ms) when this word next becomes due for review. */
  dueAt: number;
  /** Total review attempts. */
  reps: number;
  /** Times the answer was wrong. */
  lapses: number;
}

export function initReview(now: number = Date.now()): ReviewState {
  return { box: 1, dueAt: now + BOX_INTERVAL_DAYS[1] * DAY, reps: 0, lapses: 0 };
}

/** Advance (or demote) a word after a review. */
export function reviewNext(
  state: ReviewState,
  correct: boolean,
  now: number = Date.now()
): ReviewState {
  const box = correct
    ? Math.min(MAX_BOX, state.box + 1)
    : Math.max(1, state.box - 2);
  return {
    box,
    dueAt: now + BOX_INTERVAL_DAYS[box] * DAY,
    reps: state.reps + 1,
    lapses: state.lapses + (correct ? 0 : 1),
  };
}

export function isDue(state: ReviewState | undefined, now: number = Date.now()): boolean {
  if (!state) return false;
  return state.dueAt <= now;
}

/** 0..1 mastery derived from the Leitner box. */
export function masteryFraction(box: number): number {
  return Math.max(0, Math.min(1, box / MAX_BOX));
}

export function isMastered(box: number): boolean {
  return box >= MAX_BOX;
}

/** Friendly label for a mastery box. */
export function masteryLabel(box: number): string {
  return (
    ["Newly found", "Seen once", "Familiar", "Confident", "Strong", "Mastered"][
      Math.max(0, Math.min(MAX_BOX, box))
    ] ?? "Newly found"
  );
}
