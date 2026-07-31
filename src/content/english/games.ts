/** Metadata for the mini-games hub. Each game lives at /games/[slug]. */
export interface GameMeta {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  /** Minimum discovered words needed before the game can be played. */
  minWords: number;
}

export const GAMES: GameMeta[] = [
  {
    slug: "duel",
    name: "Word Duel",
    icon: "⚔️",
    tagline: "A timed blitz — recall as many words as you can before the sands run out.",
    minWords: 4,
  },
  {
    slug: "detective",
    name: "Context Detective",
    icon: "🕵️",
    tagline: "Sniff out the perfect word to complete each sentence.",
    minWords: 4,
  },
  {
    slug: "synonyms",
    name: "Synonym Match",
    icon: "🔗",
    tagline: "Pair each word with its closest companion.",
    minWords: 5,
  },
  {
    slug: "letters",
    name: "Lost Letters",
    icon: "🔤",
    tagline: "The letters have scattered — restore each word from its meaning.",
    minWords: 3,
  },
  {
    slug: "builder",
    name: "Sentence Builder",
    icon: "🧱",
    tagline: "Reassemble the scattered words into a well-formed sentence.",
    minWords: 0,
  },
  {
    slug: "misfit",
    name: "Odd One Out",
    icon: "🧩",
    tagline: "Three words share a meaning; one is its opposite. Spot the misfit.",
    minWords: 5,
  },
];

export function getGame(slug: string): GameMeta | undefined {
  return GAMES.find((g) => g.slug === slug);
}
