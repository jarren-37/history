"use client";

import { useEffect } from "react";
import { useApp } from "@/lib/english/store";
import { startAmbience, stopAmbience, resumeAudio } from "@/lib/sound";

/**
 * Bridges the "sound on" preference to the procedural ambience engine.
 * Mounted once in the layout; renders nothing.
 */
export function Ambience() {
  const { soundOn, hydrated } = useApp();

  useEffect(() => {
    if (!hydrated) return;
    if (soundOn) {
      void resumeAudio();
      startAmbience();
    } else {
      stopAmbience();
    }
  }, [soundOn, hydrated]);

  // Browsers require a gesture before audio; resume on the first interaction
  // so a returning student with sound enabled hears it immediately.
  useEffect(() => {
    if (!soundOn) return;
    const kick = () => void resumeAudio();
    window.addEventListener("pointerdown", kick, { once: true });
    return () => window.removeEventListener("pointerdown", kick);
  }, [soundOn]);

  return null;
}
