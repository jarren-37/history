import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STATIONS, getStation } from "@/content/physics/stations";
import { RocketGantry } from "@/components/physics/RocketGantry";
import { CircuitBench } from "@/components/physics/CircuitBench";
import { WaveTable } from "@/components/physics/WaveTable";
import { Orrery } from "@/components/physics/Orrery";
import { Magnetism } from "@/components/physics/Magnetism";

export function generateStaticParams() {
  return STATIONS.map((s) => ({ id: s.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const s = getStation(params.id);
  return { title: s ? `${s.name} — The Observatory` : "The Observatory" };
}

export default function LabPage({ params }: { params: { id: string } }) {
  switch (params.id) {
    case "forces":
      return <RocketGantry />;
    case "circuits":
      return <CircuitBench />;
    case "waves":
      return <WaveTable />;
    case "gravity":
      return <Orrery />;
    case "magnetism":
      return <Magnetism />;
    default:
      notFound();
  }
}
