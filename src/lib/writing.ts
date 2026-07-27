import { getWord } from "@/content/words";

/**
 * Local writing checks — no network needed. Lenient on inflections so students
 * are rewarded for using a word naturally (e.g. "meandered" counts for
 * "meander", "eloquently" for "eloquent").
 */
export function usesWord(text: string, base: string): boolean {
  const escaped = base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}[a-z]*\\b`, "i").test(text);
}

export function countWords(text: string): number {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}

/** Which target words are present / still missing. */
export function checkTargets(
  text: string,
  targetIds: string[]
): { used: string[]; missing: string[] } {
  const used: string[] = [];
  const missing: string[] = [];
  targetIds.forEach((id) => {
    const w = getWord(id);
    if (!w) return;
    (usesWord(text, w.word) ? used : missing).push(id);
  });
  return { used, missing };
}

/** Overused / weak words to gently flag, with stronger alternatives. */
const WEAK: Record<string, string[]> = {
  very: ["remarkably", "extremely", "profoundly"],
  really: ["genuinely", "truly", "decidedly"],
  good: ["admirable", "commendable", "exceptional"],
  bad: ["dreadful", "deplorable", "woeful"],
  nice: ["delightful", "gracious", "charming"],
  happy: ["elated", "jubilant", "content"],
  sad: ["melancholy", "despondent", "wistful"],
  big: ["immense", "substantial", "considerable"],
  said: ["remarked", "declared", "murmured"],
  a_lot: ["a great deal", "considerably", "immensely"],
  things: ["matters", "elements", "aspects"],
};

export interface StyleTip {
  weak: string;
  suggestions: string[];
}

/** Scan for weak words actually present in the text. */
export function styleTips(text: string): StyleTip[] {
  const tips: StyleTip[] = [];
  const lower = ` ${text.toLowerCase()} `;
  for (const [weak, suggestions] of Object.entries(WEAK)) {
    const phrase = weak.replace("_", " ");
    const re = new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    if (re.test(lower)) tips.push({ weak: phrase, suggestions });
  }
  return tips;
}
