/** Mini-games in the Observatory's games room. */
export interface GameMeta {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
}

export const GAMES: GameMeta[] = [
  {
    slug: "satellite",
    name: "Satellite Command",
    icon: "🛰️",
    tagline: "Launch satellites into stable orbit — three lives, rising difficulty.",
  },
  {
    slug: "grid",
    name: "Grid Rescue",
    icon: "🏙️",
    tagline: "Close the right switches to power every home — without blowing the fuse.",
  },
  {
    slug: "beam",
    name: "Balance the Beam",
    icon: "⚖️",
    tagline: "Slide the load until the moments match and the lever sits perfectly level.",
  },
];

export function getGame(slug: string): GameMeta | undefined {
  return GAMES.find((g) => g.slug === slug);
}
