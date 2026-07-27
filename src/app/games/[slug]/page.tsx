import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GAMES, getGame } from "@/content/games";
import { GamePlayer } from "@/components/games/GamePlayer";

export function generateStaticParams() {
  return GAMES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const game = getGame(params.slug);
  return {
    title: game ? `${game.name} — Lexicon` : "Lexicon",
    description: game?.tagline,
  };
}

export default function GameRoute({ params }: { params: { slug: string } }) {
  if (!getGame(params.slug)) notFound();
  return <GamePlayer slug={params.slug} />;
}
