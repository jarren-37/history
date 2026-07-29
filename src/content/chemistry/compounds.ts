/** Ions and target compounds for the "Brew the Compound" game. */
export interface Ion {
  id: string;
  display: string; // e.g. "Mg²⁺"
  charge: number;
}

export const CATIONS: Ion[] = [
  { id: "Na", display: "Na⁺", charge: 1 },
  { id: "K", display: "K⁺", charge: 1 },
  { id: "Mg", display: "Mg²⁺", charge: 2 },
  { id: "Ca", display: "Ca²⁺", charge: 2 },
  { id: "Al", display: "Al³⁺", charge: 3 },
];

export const ANIONS: Ion[] = [
  { id: "Cl", display: "Cl⁻", charge: -1 },
  { id: "O", display: "O²⁻", charge: -2 },
  { id: "OH", display: "OH⁻", charge: -1 },
  { id: "CO3", display: "CO₃²⁻", charge: -2 },
  { id: "NO3", display: "NO₃⁻", charge: -1 },
];

export interface Compound {
  name: string;
  cation: string;
  anion: string;
  formula: string;
}

export const COMPOUNDS: Compound[] = [
  { name: "Sodium chloride", cation: "Na", anion: "Cl", formula: "NaCl" },
  { name: "Magnesium oxide", cation: "Mg", anion: "O", formula: "MgO" },
  { name: "Calcium chloride", cation: "Ca", anion: "Cl", formula: "CaCl₂" },
  { name: "Aluminium oxide", cation: "Al", anion: "O", formula: "Al₂O₃" },
  { name: "Magnesium hydroxide", cation: "Mg", anion: "OH", formula: "Mg(OH)₂" },
  { name: "Sodium carbonate", cation: "Na", anion: "CO3", formula: "Na₂CO₃" },
  { name: "Calcium nitrate", cation: "Ca", anion: "NO3", formula: "Ca(NO₃)₂" },
];
