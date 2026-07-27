// Per-hall colour palettes for LEXICON.
//
// Each themed hall carries its own colour so that colour itself becomes a
// memory cue — Nature is verdant green, Conflict is smouldering crimson,
// Success is triumphant gold. Values are plain hex so palettes can be injected
// as inline CSS variables and animated smoothly with Framer Motion.

export type PaletteKey =
  | "nature"
  | "emotion"
  | "conflict"
  | "success"
  | "failure"
  | "science"
  | "politics"
  | "travel"
  | "relationships"
  | "technology"
  | "education"
  | "neutral";

export interface Palette {
  key: PaletteKey;
  name: string;
  /** Primary accent — buttons, highlights, the "spine" of the hall. */
  primary: string;
  /** A lighter partner used for gradients and soft fills. */
  secondary: string;
  /** Deep tone for text-on-colour and dramatic scenes. */
  deep: string;
  /** Very soft tinted surface for cards on parchment. */
  surface: string;
  /** Emoji motif used on doors / progress markers. */
  motif: string;
  /** A short mood word shown on the hall's door. */
  mood: string;
}

export const PALETTES: Record<PaletteKey, Palette> = {
  nature: {
    key: "nature",
    name: "Verdant Green",
    primary: "#3f8f5a",
    secondary: "#a9d8ab",
    deep: "#234f31",
    surface: "#e8f4e6",
    motif: "🌿",
    mood: "Wild and breathing",
  },
  emotion: {
    key: "emotion",
    name: "Heartsong Rose",
    primary: "#d15a86",
    secondary: "#f4b8cd",
    deep: "#7c2e4d",
    surface: "#fceaf1",
    motif: "🎭",
    mood: "The colour of feeling",
  },
  conflict: {
    key: "conflict",
    name: "Smouldering Crimson",
    primary: "#c0392b",
    secondary: "#e79a86",
    deep: "#5e1e1a",
    surface: "#fbe7e2",
    motif: "⚔️",
    mood: "Tension in the air",
  },
  success: {
    key: "success",
    name: "Triumphant Gold",
    primary: "#c9962b",
    secondary: "#f0d488",
    deep: "#7a5a12",
    surface: "#fbf1d8",
    motif: "🏆",
    mood: "The summit calls",
  },
  failure: {
    key: "failure",
    name: "Ashen Slate",
    primary: "#6b7482",
    secondary: "#b3bcc7",
    deep: "#353c46",
    surface: "#eef1f4",
    motif: "🌫️",
    mood: "Lessons in the dust",
  },
  science: {
    key: "science",
    name: "Aether Teal",
    primary: "#2f9aa8",
    secondary: "#93d7dd",
    deep: "#165059",
    surface: "#e3f5f6",
    motif: "🔬",
    mood: "Curiosity uncaged",
  },
  politics: {
    key: "politics",
    name: "Senate Indigo",
    primary: "#5a5ab0",
    secondary: "#adaee4",
    deep: "#2e2c63",
    surface: "#ececfb",
    motif: "⚖️",
    mood: "Power and persuasion",
  },
  travel: {
    key: "travel",
    name: "Voyager Blue",
    primary: "#2f7bb0",
    secondary: "#9cc9e8",
    deep: "#1b4468",
    surface: "#e6f1fa",
    motif: "🧭",
    mood: "Beyond the horizon",
  },
  relationships: {
    key: "relationships",
    name: "Ember Coral",
    primary: "#e0743a",
    secondary: "#f4c199",
    deep: "#8a3d17",
    surface: "#fdefe3",
    motif: "🤝",
    mood: "Bonds and belonging",
  },
  technology: {
    key: "technology",
    name: "Circuit Violet",
    primary: "#8459b3",
    secondary: "#c6a7e4",
    deep: "#432a63",
    surface: "#f2ecfa",
    motif: "⚙️",
    mood: "The machine awakes",
  },
  education: {
    key: "education",
    name: "Scholar Amber",
    primary: "#b0803a",
    secondary: "#e6c78a",
    deep: "#5e3f18",
    surface: "#f7eeda",
    motif: "📜",
    mood: "The mind sharpened",
  },
  neutral: {
    key: "neutral",
    name: "Parchment",
    primary: "#8a7a63",
    secondary: "#d8c9ae",
    deep: "#4a3f30",
    surface: "#f6f0e6",
    motif: "📖",
    mood: "The whole Lexicon",
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
