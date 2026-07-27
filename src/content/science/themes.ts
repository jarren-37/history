import type { CSSProperties } from "react";

/**
 * Visual identities for the science subjects. Each sets the shared --sci-*
 * custom properties (consumed by src/components/science/ui.tsx) and a full-bleed
 * atmospheric background, so the Atelier and the Observatory feel like entirely
 * different worlds while reusing the same components.
 */

export const CHEMISTRY_THEME = {
  ["--sci-accent" as string]: "#e0913f",
  ["--sci-accent2" as string]: "#4bbf7a",
  ["--sci-glow" as string]: "#cf8a3a",
  ["--sci-ink" as string]: "#f2e7d3",
  ["--sci-panel" as string]: "rgba(16,40,28,0.55)",
  ["--sci-border" as string]: "rgba(207,138,58,0.38)",
} as CSSProperties;

export const CHEMISTRY_BG =
  "radial-gradient(90% 60% at 20% 0%, rgba(207,138,58,0.20), transparent 55%)," +
  "radial-gradient(80% 70% at 90% 100%, rgba(75,191,122,0.16), transparent 55%)," +
  "linear-gradient(180deg, #14241c, #0a1712)";

export const PHYSICS_THEME = {
  ["--sci-accent" as string]: "#6a97ff",
  ["--sci-accent2" as string]: "#d8b24a",
  ["--sci-glow" as string]: "#5a8bff",
  ["--sci-ink" as string]: "#e7ecff",
  ["--sci-panel" as string]: "rgba(18,24,50,0.58)",
  ["--sci-border" as string]: "rgba(106,151,255,0.38)",
} as CSSProperties;

export const PHYSICS_BG =
  "radial-gradient(90% 60% at 80% 0%, rgba(90,139,255,0.20), transparent 55%)," +
  "radial-gradient(70% 60% at 10% 100%, rgba(216,178,74,0.14), transparent 55%)," +
  "linear-gradient(180deg, #10142c, #070a16)";
