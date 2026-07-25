import type { PaletteKey } from "./palettes";

/**
 * Content model for Project Chronicle.
 *
 * Everything here is authored to align with the Singapore Cambridge SEAB
 * O-Level Combined History (2261) syllabus. Each chapter is a "storybook":
 * a sequence of illustrated pages that answer What happened? / Why? / So what
 * happened next? — and ends with a Big Picture cause-and-effect chain plus
 * active-recall boosters and O-Level exam practice.
 */

/** A visual scene keyword. Each maps to a hand-built animated SVG illustration. */
export type SceneKey =
  | "treaty-signing"
  | "shrinking-germany"
  | "reparations-coins"
  | "angry-crowd"
  | "rising-leader"
  | "marching-troops"
  | "rising-sun"
  | "island-map"
  | "iron-curtain"
  | "money-flow"
  | "berlin-airlift"
  | "divided-line"
  | "missiles-standoff"
  | "falling-wall"
  | "handshake"
  | "empty-factory"
  | "voting-hands"
  | "world-map";

export interface Dialogue {
  /** Character id (see characters.ts) or a plain speaker label. */
  speaker: string;
  /** Character id if this is a recurring figure — used to pull a portrait. */
  characterId?: string;
  text: string;
  /** left | right — which side the speech bubble sits on. */
  side?: "left" | "right";
}

export interface StoryChoice {
  question: string;
  options: {
    label: string;
    /** What the app reveals after the student picks this option. */
    outcome: string;
    /** Was this close to what actually happened? Used only for gentle framing. */
    historical?: boolean;
  }[];
  /** The reveal shown after any choice: what actually happened and why. */
  reality: string;
}

export interface StoryPage {
  id: string;
  /** Small kicker shown above the page, e.g. "1919 · Paris". */
  kicker?: string;
  title: string;
  scene: SceneKey;
  /** 2–4 short paragraphs maximum. The illustration carries the rest. */
  narration: string[];
  /** Words to visually highlight (matched case-insensitively in narration). */
  highlights?: string[];
  dialogues?: Dialogue[];
  /** Optional branching "what would you do?" moment. */
  choice?: StoryChoice;
}

export interface CauseEffectNode {
  id: string;
  label: string;
  /** Expanded explanation revealed when the student opens the node. */
  detail: string;
  /** Emoji/icon motif. */
  icon?: string;
}

export interface CauseEffectChain {
  title: string;
  intro?: string;
  nodes: CauseEffectNode[];
}

/** Active-recall exercises used as "memory boosters" between pages. */
export type Booster =
  | {
      type: "order";
      prompt: string;
      /** Items in the CORRECT order; the UI shuffles them. */
      items: string[];
    }
  | {
      type: "match";
      prompt: string;
      pairs: { left: string; right: string }[];
    }
  | {
      type: "fill";
      prompt: string;
      /** Sentence with {{blank}} tokens. */
      sentence: string;
      /** Correct answers for each blank, in order. */
      answers: string[];
      /** Word bank (includes distractors). */
      bank: string[];
    }
  | {
      type: "recall";
      prompt: string;
      /** A self-check question; answer is revealed on tap. */
      question: string;
      answer: string;
    };

/** O-Level exam practice aligned to 2261 skills. */
export interface ExamQuestion {
  id: string;
  /** Skill being trained. */
  skill:
    | "Inference"
    | "Purpose"
    | "Reliability"
    | "Comparison"
    | "Assertion"
    | "Utility"
    | "Explain (SEQ)"
    | "Judgement (SEQ)";
  format: "SBQ" | "SEQ";
  marks: number;
  question: string;
  /** For SBQ: a short source description (syllabus-safe, paraphrased). */
  source?: { label: string; text: string };
  /** Bullet-point marking guidance in the style of 2261 mark schemes. */
  markScheme: string[];
  /** A model paragraph / worked answer. */
  modelAnswer: string;
}

export interface Chapter {
  id: string;
  slug: string;
  /** Section + order, e.g. "1.1". */
  number: string;
  section: "The Road to War" | "The Cold War";
  title: string;
  subtitle: string;
  /** The driving inquiry question of the chapter. */
  inquiry: string;
  palette: PaletteKey;
  era: string;
  /** One-line hook for the library cover. */
  hook: string;
  /** Syllabus learning outcomes this chapter addresses. */
  outcomes: string[];
  pages: StoryPage[];
  /** Boosters interleaved by index — shown after page[index]. */
  boosters: { afterPage: number; booster: Booster }[];
  bigPicture: CauseEffectChain;
  /** Character ids appearing in this chapter. */
  characterIds: string[];
  /** Timeline event ids belonging to this chapter. */
  timelineIds: string[];
  exam: ExamQuestion[];
}
