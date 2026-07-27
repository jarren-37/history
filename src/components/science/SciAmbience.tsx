"use client";

import { useEffect } from "react";
import { startAmbience, stopAmbience, resumeAudio } from "@/lib/sound";

/** Bridges a subject's sound preference to the procedural ambient bed. */
export function SciAmbience({
  soundOn,
  hydrated,
}: {
  soundOn: boolean;
  hydrated: boolean;
}) {
  useEffect(() => {
    if (!hydrated) return;
    if (soundOn) {
      void resumeAudio();
      startAmbience();
    } else {
      stopAmbience();
    }
  }, [soundOn, hydrated]);

  useEffect(() => {
    if (!soundOn) return;
    const kick = () => void resumeAudio();
    window.addEventListener("pointerdown", kick, { once: true });
    return () => window.removeEventListener("pointerdown", kick);
  }, [soundOn]);

  return null;
}
