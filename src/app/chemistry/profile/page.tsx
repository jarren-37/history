"use client";

import { useAtelier, alchemistTitle } from "@/lib/chemistry/store";
import { STATIONS, MASTERPIECE } from "@/content/chemistry/stations";
import { SciProfile } from "@/components/science/SciProfile";

export default function AtelierProfile() {
  const state = useAtelier();
  return (
    <SciProfile
      state={state}
      rankTitle={state.hydrated ? alchemistTitle(state.level.level) : "Apprentice Alchemist"}
      stations={STATIONS}
      masterpieceId={MASTERPIECE.id}
      homeHref="/chemistry"
      homeLabel="The Atelier"
    />
  );
}
