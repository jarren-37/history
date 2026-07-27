import { WORDS } from "@/content/english/words";
import { MISSIONS } from "@/content/english/missions";
import type { Word, WritingMission } from "@/content/english/types";

/** Deterministic string hash → non-negative integer. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** The same "Word of the Day" for everyone on a given date. */
export function wordOfDay(dateKey: string): Word {
  return WORDS[hash(dateKey + ":word") % WORDS.length];
}

/** The featured writing mission of the day. */
export function missionOfDay(dateKey: string): WritingMission {
  return MISSIONS[hash(dateKey + ":mission") % MISSIONS.length];
}

/** XP awarded for claiming the daily adventure bonus. */
export const DAILY_BONUS_XP = 40;
