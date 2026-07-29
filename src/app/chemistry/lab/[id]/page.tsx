import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STATIONS, getStation } from "@/content/chemistry/stations";
import { IonicBonding } from "@/components/chemistry/IonicBonding";
import { ReactionCauldron } from "@/components/chemistry/ReactionCauldron";
import { EnergyMountain } from "@/components/chemistry/EnergyMountain";
import { Electrolysis } from "@/components/chemistry/Electrolysis";
import { OrganicForge } from "@/components/chemistry/OrganicForge";
import { PeriodicTable } from "@/components/chemistry/PeriodicTable";

export function generateStaticParams() {
  return STATIONS.map((s) => ({ id: s.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const s = getStation(params.id);
  return { title: s ? `${s.name} — The Atelier` : "The Atelier" };
}

export default function LabPage({ params }: { params: { id: string } }) {
  switch (params.id) {
    case "bonding":
      return <IonicBonding />;
    case "reaction":
      return <ReactionCauldron />;
    case "energy":
      return <EnergyMountain />;
    case "electrolysis":
      return <Electrolysis />;
    case "organic":
      return <OrganicForge />;
    case "periodic":
      return <PeriodicTable />;
    default:
      notFound();
  }
}
