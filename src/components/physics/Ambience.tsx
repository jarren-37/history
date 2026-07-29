"use client";

import { useObservatory } from "@/lib/physics/store";
import { SciAmbience } from "@/components/science/SciAmbience";

export function Ambience() {
  const { soundOn, hydrated } = useObservatory();
  return <SciAmbience soundOn={soundOn} hydrated={hydrated} bed="observatory" />;
}
