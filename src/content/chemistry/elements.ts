/** First 20 elements laid out on the main-group table (O-Level focus). */
export type ElemCategory = "metal" | "nonmetal" | "metalloid" | "noble";

export interface Element {
  z: number;
  sym: string;
  name: string;
  /** Column 0–7 → groups 1, 2, 3, 4, 5, 6, 7, 0. */
  col: number;
  period: number;
  cat: ElemCategory;
}

/** Group label shown for each column index. */
export const GROUP_LABELS = ["1", "2", "3", "4", "5", "6", "7", "0"];

export const ELEMENTS: Element[] = [
  { z: 1, sym: "H", name: "Hydrogen", col: 0, period: 1, cat: "nonmetal" },
  { z: 2, sym: "He", name: "Helium", col: 7, period: 1, cat: "noble" },
  { z: 3, sym: "Li", name: "Lithium", col: 0, period: 2, cat: "metal" },
  { z: 4, sym: "Be", name: "Beryllium", col: 1, period: 2, cat: "metal" },
  { z: 5, sym: "B", name: "Boron", col: 2, period: 2, cat: "metalloid" },
  { z: 6, sym: "C", name: "Carbon", col: 3, period: 2, cat: "nonmetal" },
  { z: 7, sym: "N", name: "Nitrogen", col: 4, period: 2, cat: "nonmetal" },
  { z: 8, sym: "O", name: "Oxygen", col: 5, period: 2, cat: "nonmetal" },
  { z: 9, sym: "F", name: "Fluorine", col: 6, period: 2, cat: "nonmetal" },
  { z: 10, sym: "Ne", name: "Neon", col: 7, period: 2, cat: "noble" },
  { z: 11, sym: "Na", name: "Sodium", col: 0, period: 3, cat: "metal" },
  { z: 12, sym: "Mg", name: "Magnesium", col: 1, period: 3, cat: "metal" },
  { z: 13, sym: "Al", name: "Aluminium", col: 2, period: 3, cat: "metal" },
  { z: 14, sym: "Si", name: "Silicon", col: 3, period: 3, cat: "metalloid" },
  { z: 15, sym: "P", name: "Phosphorus", col: 4, period: 3, cat: "nonmetal" },
  { z: 16, sym: "S", name: "Sulfur", col: 5, period: 3, cat: "nonmetal" },
  { z: 17, sym: "Cl", name: "Chlorine", col: 6, period: 3, cat: "nonmetal" },
  { z: 18, sym: "Ar", name: "Argon", col: 7, period: 3, cat: "noble" },
  { z: 19, sym: "K", name: "Potassium", col: 0, period: 4, cat: "metal" },
  { z: 20, sym: "Ca", name: "Calcium", col: 1, period: 4, cat: "metal" },
];

export const CAT_LABEL: Record<ElemCategory, string> = {
  metal: "Metal",
  nonmetal: "Non-metal",
  metalloid: "Metalloid",
  noble: "Noble gas",
};
