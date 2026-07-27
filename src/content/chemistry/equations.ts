/** Species and equations for the "Power the Engine" balancing game. */
export interface Species {
  /** Display formula, e.g. "H₂O". */
  formula: string;
  /** Atom counts in one unit, e.g. { H: 2, O: 1 }. */
  atoms: Record<string, number>;
}

export interface Equation {
  reactants: Species[];
  products: Species[];
  /** A known balanced set of coefficients (for the "give up / show" hint). */
  solution: number[];
}

export const EQUATIONS: Equation[] = [
  {
    // 2H₂ + O₂ → 2H₂O
    reactants: [
      { formula: "H₂", atoms: { H: 2 } },
      { formula: "O₂", atoms: { O: 2 } },
    ],
    products: [{ formula: "H₂O", atoms: { H: 2, O: 1 } }],
    solution: [2, 1, 2],
  },
  {
    // 2Mg + O₂ → 2MgO
    reactants: [
      { formula: "Mg", atoms: { Mg: 1 } },
      { formula: "O₂", atoms: { O: 2 } },
    ],
    products: [{ formula: "MgO", atoms: { Mg: 1, O: 1 } }],
    solution: [2, 1, 2],
  },
  {
    // CH₄ + 2O₂ → CO₂ + 2H₂O
    reactants: [
      { formula: "CH₄", atoms: { C: 1, H: 4 } },
      { formula: "O₂", atoms: { O: 2 } },
    ],
    products: [
      { formula: "CO₂", atoms: { C: 1, O: 2 } },
      { formula: "H₂O", atoms: { H: 2, O: 1 } },
    ],
    solution: [1, 2, 1, 2],
  },
  {
    // N₂ + 3H₂ → 2NH₃
    reactants: [
      { formula: "N₂", atoms: { N: 2 } },
      { formula: "H₂", atoms: { H: 2 } },
    ],
    products: [{ formula: "NH₃", atoms: { N: 1, H: 3 } }],
    solution: [1, 3, 2],
  },
  {
    // 2Na + Cl₂ → 2NaCl
    reactants: [
      { formula: "Na", atoms: { Na: 1 } },
      { formula: "Cl₂", atoms: { Cl: 2 } },
    ],
    products: [{ formula: "NaCl", atoms: { Na: 1, Cl: 1 } }],
    solution: [2, 1, 2],
  },
];
