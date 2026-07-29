import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GAMES, getGame } from "@/content/physics/games";
import { SatelliteGame } from "@/components/physics/SatelliteGame";
import { GridRescue } from "@/components/physics/GridRescue";
import { BeamBalance } from "@/components/physics/BeamBalance";

export function generateStaticParams() {
  return GAMES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGame(params.slug);
  return { title: g ? `${g.name} — The Observatory` : "The Observatory" };
}

export default function PhysicsGameRoute({ params }: { params: { slug: string } }) {
  switch (params.slug) {
    case "satellite":
      return <SatelliteGame />;
    case "grid":
      return <GridRescue />;
    case "beam":
      return <BeamBalance />;
    default:
      notFound();
  }
}
