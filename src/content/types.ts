import type { PaletteKey } from "./palettes";

/**
 * Content model for LEXICON — "The Vocabulary Adventure".
 *
 * The player explores an ancient library. Every hall is a vocabulary theme
 * (Nature, Emotion, Conflict …). Hidden in each hall are *word treasures* —
 * discovered by clicking objects, then revealed on glowing parchment with a
 * full, storybook-style entry.
 *
 * Everything is authored to strengthen writing for the Singapore Cambridge
 * O-Level English paper (1184) while staying useful far beyond the exam.
 */

export type WordClass =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "phrase";

/** How precious a word feels to unlock — difficult-but-beautiful words shine. */
export type Rarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "mythical";

/** The themed halls of the Lexicon. */
export type RoomId =
  | "nature"
  | "emotion"
  | "conflict"
  | "success"
  | "failure"
  | "science"
  | "politics"
  | "travel"
  | "relationships"
  | "technology"
  | "education";

/** A single multiple-choice question — reused by word cards and mini-games. */
export interface QuizQuestion {
  prompt: string;
  options: string[];
  /** Index of the correct option. */
  answer: number;
  /** One-line explanation shown after answering. */
  explain?: string;
}

/**
 * A word treasure. Every field is authored so the reveal feels like uncovering
 * something rare — a definition in *simple* English, a memory trick, a tiny
 * story, real examples and a model O-Level sentence.
 */
export interface Word {
  /** URL-safe id, usually the word itself. */
  id: string;
  word: string;
  /** Friendly respelling, e.g. "ih-LOK-wuhnt". */
  pronunciation: string;
  /** Optional IPA, e.g. "/ˈɛləkwənt/". */
  ipa?: string;
  class: WordClass;
  /** 1 (gentle) … 5 (formidable). Drives XP and rarity. */
  difficulty: 1 | 2 | 3 | 4 | 5;
  rarity: Rarity;
  room: RoomId;
  /** Definition in plain, simple English. */
  meaning: string;
  synonyms: string[];
  antonyms: string[];
  /** The mistake learners most often make with this word. */
  mistake: string;
  /** A vivid memory hook — imagery, sound-alike or analogy. */
  trick: string;
  /** A one- or two-sentence story that anchors the word in a scene. */
  story: string;
  /** Everyday example sentences. */
  examples: string[];
  /** A sentence pitched at O-Level essay standard. */
  olevel: string;
  /** Words this one loves to sit beside. */
  collocations: string[];
  /** Common fixed phrases / expressions. */
  phrases: string[];
  /** A single-question mastery check. */
  quiz: QuizQuestion;
  /** Emoji used as the word's little illustration. */
  motif: string;
}

/** A clickable thing in a hall that hides a word treasure. */
export interface DiscoveryObject {
  id: string;
  /** What the player sees before clicking, e.g. "a cracked terrarium". */
  label: string;
  emoji: string;
  /** A tempting whisper shown on hover, before discovery. */
  hint: string;
  /** The word revealed when this object is opened. */
  wordId: string;
  /** Position within the scene, as percentages (0–100). */
  x: number;
  y: number;
}

/** One themed hall of the Lexicon. */
export interface Room {
  id: RoomId;
  /** Ornate name, e.g. "The Conservatory of Wild Things". */
  name: string;
  /** The plain theme label, e.g. "Nature". */
  theme: string;
  /** One evocative line for the hall's door. */
  tagline: string;
  /** Atmospheric welcome read on entering. */
  intro: string;
  palette: PaletteKey;
  /** Emoji motif for the door and markers. */
  motif: string;
  /** A short mood word. */
  mood: string;
  /** The discoverable objects scattered through the hall. */
  objects: DiscoveryObject[];
}

/** A writing quest: use these words well and earn bonus treasure. */
export interface WritingMission {
  id: string;
  title: string;
  /** The scenario / prompt for the player to write to. */
  prompt: string;
  /** Word ids the player must weave in. */
  targetWords: string[];
  /** Minimum words expected, for gentle guidance. */
  minWords: number;
  xp: number;
}

/** An unlockable achievement. */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  motif: string;
}
