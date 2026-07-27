import type { Word } from "@/content/types";
import { WORDS } from "@/content/words";

/** Deterministic-ish shuffle (Fisher–Yates with Math.random). */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample<T>(arr: T[], n: number, exclude: (x: T) => boolean = () => false): T[] {
  return shuffle(arr.filter((x) => !exclude(x))).slice(0, n);
}

export interface MCQuestion {
  /** The word this question is really about. */
  word: Word;
  prompt: string;
  options: string[];
  answer: number;
  kind: string;
}

/** Pick plausible distractor words, preferring the same part of speech. */
function distractorWords(word: Word, n: number, pool: Word[]): Word[] {
  const sameClass = pool.filter(
    (w) => w.id !== word.id && w.class === word.class
  );
  const rest = pool.filter((w) => w.id !== word.id && w.class !== word.class);
  return [...shuffle(sameClass), ...shuffle(rest)].slice(0, n);
}

/** "Which word means …?" — meaning → word. Trains recall for writing. */
export function meaningToWord(word: Word, pool: Word[] = WORDS): MCQuestion {
  const distractors = distractorWords(word, 3, pool).map((w) => w.word);
  const options = shuffle([word.word, ...distractors]);
  return {
    word,
    prompt: `Which word means: “${word.meaning}”`,
    options,
    answer: options.indexOf(word.word),
    kind: "meaning-to-word",
  };
}

/** "What does X mean?" — word → meaning. */
export function wordToMeaning(word: Word, pool: Word[] = WORDS): MCQuestion {
  const distractors = distractorWords(word, 3, pool).map((w) => w.meaning);
  const options = shuffle([word.meaning, ...distractors]);
  return {
    word,
    prompt: `What does “${word.word}” mean?`,
    options,
    answer: options.indexOf(word.meaning),
    kind: "word-to-meaning",
  };
}

/** "Which is a synonym of X?" using the word's own synonym list. */
export function synonymQuestion(word: Word, pool: Word[] = WORDS): MCQuestion | null {
  if (!word.synonyms.length) return null;
  const correct = shuffle(word.synonyms)[0];
  // Distractors: other words' synonyms / antonyms that aren't synonyms here.
  const banned = new Set(
    [word.word, ...word.synonyms].map((s) => s.toLowerCase())
  );
  const others = shuffle(
    pool
      .filter((w) => w.id !== word.id)
      .flatMap((w) => [...w.synonyms, w.word])
      .filter((s) => !banned.has(s.toLowerCase()))
  ).slice(0, 3);
  if (others.length < 3) return null;
  const options = shuffle([correct, ...others]);
  return {
    word,
    prompt: `Which word is closest in meaning to “${word.word}”?`,
    options,
    answer: options.indexOf(correct),
    kind: "synonym",
  };
}

/**
 * "Choose the best word to fill the blank." Blanks the word out of one of its
 * own example sentences. Falls back to a definition question if no example
 * contains the exact base word (e.g. it only appears inflected).
 */
export function contextQuestion(word: Word, pool: Word[] = WORDS): MCQuestion {
  const escaped = word.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\b${escaped}\\b`, "i");
  const source = [...word.examples, word.olevel].find((s) => re.test(s));
  if (!source) return wordToMeaning(word, pool);
  const blanked = source.replace(
    new RegExp(`\\b${escaped}\\b`, "ig"),
    "______"
  );
  const distractors = distractorWords(word, 3, pool).map((w) => w.word);
  const options = shuffle([word.word, ...distractors]);
  return {
    word,
    prompt: `Choose the best word: “${blanked}”`,
    options,
    answer: options.indexOf(word.word),
    kind: "context",
  };
}

/** Build a varied review question for a word (rotates between styles). */
export function reviewQuestion(word: Word, pool: Word[] = WORDS): MCQuestion {
  const builders = [meaningToWord, wordToMeaning, synonymQuestion];
  for (const b of shuffle(builders)) {
    const q = b(word, pool);
    if (q) return q;
  }
  return meaningToWord(word, pool);
}
