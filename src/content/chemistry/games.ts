/** Mini-games in the Atelier's games room. */
export interface GameMeta {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
}

export const GAMES: GameMeta[] = [
  {
    slug: "balance",
    name: "Power the Engine",
    icon: "⚖️",
    tagline: "Balance the chemical equation to bring the alchemical engine to life.",
  },
];

export function getGame(slug: string): GameMeta | undefined {
  return GAMES.find((g) => g.slug === slug);
}
