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
];

export function getGame(slug: string): GameMeta | undefined {
  return GAMES.find((g) => g.slug === slug);
}
