"use client";

import React, { createContext, useContext } from "react";
import { useSubjectState, type SubjectState } from "@/lib/science/subjectStore";

const Ctx = createContext<SubjectState | null>(null);

/** Progress provider for The Inventor's Observatory (Physics). */
export function ObservatoryProvider({ children }: { children: React.ReactNode }) {
  const value = useSubjectState("observatory:v1");
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useObservatory(): SubjectState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useObservatory must be used within ObservatoryProvider");
  return ctx;
}

/** Titles earned as the inventor rises. */
export function inventorTitle(level: number): string {
  if (level >= 9) return "Grand Inventor";
  if (level >= 6) return "Master of the Cosmos";
  if (level >= 4) return "Journeyman Engineer";
  if (level >= 2) return "Apprentice Inventor";
  return "Novice of the Observatory";
}
