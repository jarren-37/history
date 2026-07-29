import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GAMES, getGame } from "@/content/chemistry/games";
import { BalanceGame } from "@/components/chemistry/BalanceGame";
import { BrewGame } from "@/components/chemistry/BrewGame";

export function generateStaticParams() {
  return GAMES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGame(params.slug);
  return { title: g ? `${g.name} — The Atelier` : "The Atelier" };
}

export default function ChemistryGameRoute({ params }: { params: { slug: string } }) {
  switch (params.slug) {
    case "balance":
      return <BalanceGame />;
    case "brew":
      return <BrewGame />;
    default:
      notFound();
  }
}
