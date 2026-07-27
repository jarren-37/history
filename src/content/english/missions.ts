import type { Achievement, WritingMission } from "./types";

/**
 * Writing quests. The player weaves the target words into a short piece; a
 * local checker confirms each word was used and awards XP. No network needed.
 */
export const MISSIONS: WritingMission[] = [
  {
    id: "storm-survivor",
    title: "The Storm Survivor",
    prompt:
      "Write a short paragraph about someone who rebuilds their life after a disaster. Show us their determination.",
    targetWords: ["resilient", "perseverance", "futile", "triumphant"],
    minWords: 45,
    xp: 60,
  },
  {
    id: "the-debate",
    title: "The Great Debate",
    prompt:
      "You are writing a persuasive speech. Argue for a cause you believe in and make your case impossible to ignore.",
    targetWords: ["eloquent", "pragmatic", "advocate", "diplomatic"],
    minWords: 50,
    xp: 65,
  },
  {
    id: "quiet-goodbye",
    title: "A Quiet Goodbye",
    prompt:
      "Describe a farewell between two people. Let the reader feel the mood without being told it outright.",
    targetWords: ["melancholy", "wistful", "estranged", "reconcile"],
    minWords: 45,
    xp: 60,
  },
  {
    id: "the-explorer",
    title: "Into the Unknown",
    prompt:
      "Write the opening of an adventure story. Take your reader somewhere they have never been.",
    targetWords: ["expedition", "treacherous", "meander", "serendipity"],
    minWords: 50,
    xp: 70,
  },
  {
    id: "brave-new-world",
    title: "Brave New World",
    prompt:
      "Write about how technology is changing the way we live — for better or worse.",
    targetWords: ["innovative", "ubiquitous", "obsolete", "streamline"],
    minWords: 50,
    xp: 65,
  },
];

export function getMission(id: string): WritingMission | undefined {
  return MISSIONS.find((m) => m.id === id);
}

/**
 * Achievements. Unlocked purely from local progress — see the store's
 * `achievementsUnlocked` derivation.
 */
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-word",
    name: "First Light",
    description: "Discover your very first word treasure.",
    motif: "✨",
  },
  {
    id: "ten-words",
    name: "Word Collector",
    description: "Discover ten words.",
    motif: "📚",
  },
  {
    id: "half-lexicon",
    name: "Keeper of the Halls",
    description: "Discover half of the entire Lexicon.",
    motif: "🗝️",
  },
  {
    id: "full-lexicon",
    name: "Grand Lexicographer",
    description: "Discover every word in the library.",
    motif: "👑",
  },
  {
    id: "first-mythical",
    name: "Myth Hunter",
    description: "Unlock a Mythical word.",
    motif: "❋",
  },
  {
    id: "streak-3",
    name: "Devoted Reader",
    description: "Visit the Lexicon three days in a row.",
    motif: "🔥",
  },
  {
    id: "streak-7",
    name: "Lorekeeper",
    description: "Keep a seven-day streak alive.",
    motif: "🌟",
  },
  {
    id: "first-mastered",
    name: "True Mastery",
    description: "Fully master your first word.",
    motif: "🎓",
  },
  {
    id: "ten-mastered",
    name: "Silver Tongue",
    description: "Master ten words.",
    motif: "🏅",
  },
  {
    id: "level-5",
    name: "Rising Scholar",
    description: "Reach Scholar Level 5.",
    motif: "⭐",
  },
  {
    id: "first-mission",
    name: "The Quill Awakens",
    description: "Complete your first writing mission.",
    motif: "🪶",
  },
  {
    id: "room-cleared",
    name: "Hall Master",
    description: "Discover every word in a single hall.",
    motif: "🏛️",
  },
];
