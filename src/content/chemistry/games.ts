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
  {
    slug: "brew",
    name: "Brew the Compound",
    icon: "⚗️",
    tagline: "Combine the right ions to brew each compound the recipe demands.",
  },
  {
    slug: "detective",
    name: "Test Tube Detective",
    icon: "🔬",
    tagline: "Read the reagent and the result, then name the hidden ion or gas.",
  },
];

export function getGame(slug: string): GameMeta | undefined {
  return GAMES.find((g) => g.slug === slug);
}
