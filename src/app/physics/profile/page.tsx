"use client";

import { useObservatory, inventorTitle } from "@/lib/physics/store";
import { STATIONS, MASTERPIECE } from "@/content/physics/stations";
import { SciProfile } from "@/components/science/SciProfile";

export default function ObservatoryProfile() {
  const state = useObservatory();
  return (
    <SciProfile
      state={state}
      rankTitle={state.hydrated ? inventorTitle(state.level.level) : "Apprentice Inventor"}
      stations={STATIONS}
      masterpieceId={MASTERPIECE.id}
      homeHref="/physics"
      homeLabel="The Observatory"
    />
  );
}
