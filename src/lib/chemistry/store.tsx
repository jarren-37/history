"use client";

import React, { createContext, useContext } from "react";
import { useSubjectState, type SubjectState } from "@/lib/science/subjectStore";

const Ctx = createContext<SubjectState | null>(null);

/** Progress provider for The Alchemist's Atelier (Chemistry). */
export function AtelierProvider({ children }: { children: React.ReactNode }) {
  const value = useSubjectState("atelier:v1");
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAtelier(): SubjectState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAtelier must be used within AtelierProvider");
  return ctx;
}

/** Titles earned as the apprentice rises. */
export function alchemistTitle(level: number): string {
  if (level >= 9) return "Grand Alchemist";
  if (level >= 6) return "Master of Elements";
  if (level >= 4) return "Journeyman Alchemist";
  if (level >= 2) return "Apprentice Alchemist";
  return "Novice of the Atelier";
}
