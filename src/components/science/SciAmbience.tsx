"use client";

import { useEffect } from "react";
import {
  resumeAudio,
  startAtelierBed,
  stopAtelierBed,
  startObservatoryBed,
  stopObservatoryBed,
} from "@/lib/sound";

/**
 * Bridges a subject's sound preference to its own distinct procedural ambient
 * bed — bubbling warmth for the Atelier, an electric clockwork hum for the
 * Observatory.
 */
export function SciAmbience({
  soundOn,
  hydrated,
  bed,
}: {
  soundOn: boolean;
  hydrated: boolean;
  bed: "atelier" | "observatory";
}) {
  const start = bed === "atelier" ? startAtelierBed : startObservatoryBed;
  const stop = bed === "atelier" ? stopAtelierBed : stopObservatoryBed;

  useEffect(() => {
    if (!hydrated) return;
    if (soundOn) {
      void resumeAudio();
      start();
    } else {
      stop();
    }
    return () => stop();
  }, [soundOn, hydrated, start, stop]);

  useEffect(() => {
    if (!soundOn) return;
    const kick = () => void resumeAudio();
    window.addEventListener("pointerdown", kick, { once: true });
    return () => window.removeEventListener("pointerdown", kick);
  }, [soundOn]);

  return null;
}
