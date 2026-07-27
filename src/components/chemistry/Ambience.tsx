"use client";

import { useAtelier } from "@/lib/chemistry/store";
import { SciAmbience } from "@/components/science/SciAmbience";

export function Ambience() {
  const { soundOn, hydrated } = useAtelier();
  return <SciAmbience soundOn={soundOn} hydrated={hydrated} />;
}
