// Per-chapter colour palettes.
// Each chapter has a unique palette so that colour itself becomes a memory cue
// (as described in the design brief: Cold War = blue, WW2 = red, Japan = orange...).
//
// Every value is a plain hex string so palettes can be injected as inline CSS
// variables and animated smoothly with Framer Motion.

export type PaletteKey =
  | "versailles"
  | "hitler"
  | "japan"
  | "coldwar"
  | "berlin"
  | "korea"
  | "cuba"
  | "vietnam"
  | "endwar"
  | "collapse"
  | "neutral";

export interface Palette {
  key: PaletteKey;
  name: string;
  /** Primary accent — buttons, highlights, the "spine" of the story. */
  primary: string;
  /** A lighter partner used for gradients and soft fills. */
  secondary: string;
  /** Deep tone for text-on-colour and dramatic scenes. */
  deep: string;
  /** Very soft tinted surface for cards on light backgrounds. */
  surface: string;
  /** Emoji motif used on covers / progress markers. */
  motif: string;
  /** A short mood word shown on the chapter cover. */
  mood: string;
}

export const PALETTES: Record<PaletteKey, Palette> = {
  versailles: {
    key: "versailles",
    name: "Treaty Red",
    primary: "#d6455b",
    secondary: "#f6a5a0",
    deep: "#7c2233",
    surface: "#fdeeec",
    motif: "📜",
    mood: "A fragile peace",
  },
  hitler: {
    key: "hitler",
    name: "Crimson Storm",
    primary: "#c0392b",
    secondary: "#e79a86",
    deep: "#5e1e1a",
    surface: "#fbe9e4",
    motif: "🕯️",
    mood: "The rising storm",
  },
  japan: {
    key: "japan",
    name: "Rising Sun Orange",
    primary: "#e07b39",
    secondary: "#f6c37a",
    deep: "#8a3d17",
    surface: "#fdf1e3",
    motif: "🌅",
    mood: "An empire reaches out",
  },
  coldwar: {
    key: "coldwar",
    name: "Cold War Blue",
    primary: "#2f6fb0",
    secondary: "#8fc0e6",
    deep: "#1c3d63",
    surface: "#e8f1fa",
    motif: "❄️",
    mood: "A world divides",
  },
  berlin: {
    key: "berlin",
    name: "Berlin Grey",
    primary: "#5c6b7a",
    secondary: "#a7b4c0",
    deep: "#2e3742",
    surface: "#eef1f4",
    motif: "🧱",
    mood: "A city on the edge",
  },
  korea: {
    key: "korea",
    name: "Frontline Teal",
    primary: "#2f8f83",
    secondary: "#8fd3c7",
    deep: "#184a45",
    surface: "#e6f5f1",
    motif: "🗺️",
    mood: "A line drawn in war",
  },
  cuba: {
    key: "cuba",
    name: "Brink Indigo",
    primary: "#4257a8",
    secondary: "#9aa7e0",
    deep: "#232b5c",
    surface: "#eceffb",
    motif: "🚀",
    mood: "Thirteen days",
  },
  vietnam: {
    key: "vietnam",
    name: "Jungle Green",
    primary: "#4b7a3f",
    secondary: "#a9c48f",
    deep: "#274a20",
    surface: "#e9f1e0",
    motif: "🌿",
    mood: "The jungle war",
  },
  endwar: {
    key: "endwar",
    name: "Victory Dusk",
    primary: "#b06a3a",
    secondary: "#e0b98a",
    deep: "#5e3418",
    surface: "#f6ecdd",
    motif: "🎆",
    mood: "The guns fall silent",
  },
  collapse: {
    key: "collapse",
    name: "Thaw Violet",
    primary: "#8459b3",
    secondary: "#c6a7e4",
    deep: "#432a63",
    surface: "#f3ecfa",
    motif: "🕊️",
    mood: "The great thaw",
  },
  neutral: {
    key: "neutral",
    name: "Parchment",
    primary: "#8a7a63",
    secondary: "#d8c9ae",
    deep: "#4a3f30",
    surface: "#f6f0e6",
    motif: "📖",
    mood: "The whole story",
  },
};

export function getPalette(key: PaletteKey): Palette {
  return PALETTES[key] ?? PALETTES.neutral;
}

/** Turn a palette into inline CSS custom properties for a scoped theme. */
export function paletteVars(key: PaletteKey): React.CSSProperties {
  const p = getPalette(key);
  return {
    ["--c-primary" as string]: p.primary,
    ["--c-secondary" as string]: p.secondary,
    ["--c-deep" as string]: p.deep,
    ["--c-surface" as string]: p.surface,
  } as React.CSSProperties;
}
