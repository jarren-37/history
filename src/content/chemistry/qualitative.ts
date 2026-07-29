/**
 * Qualitative analysis cases for "Test Tube Detective".
 *
 * Each case is an authentic O-Level identification test: a reagent is added to
 * an unknown, an observation is made, and the learner must name the ion or gas
 * responsible. The `color` tints the on-screen test tube to match the real
 * result, so the visual reinforces the chemistry.
 */
export interface QualCase {
  id: string;
  kind: "cation" | "anion" | "gas";
  reagent: string;
  observation: string;
  /** The correct answer — must appear verbatim in `options`. */
  answer: string;
  options: string[];
  explain: string;
  /** Liquid/precipitate tint for the test tube. */
  color: string;
}

export const QUAL_CASES: QualCase[] = [
  {
    id: "cu-naoh",
    kind: "cation",
    reagent: "sodium hydroxide (NaOH), drop by drop",
    observation: "A light blue precipitate forms and does not dissolve in excess.",
    answer: "Cu²⁺ (copper(II))",
    options: ["Cu²⁺ (copper(II))", "Fe²⁺ (iron(II))", "Fe³⁺ (iron(III))", "Al³⁺ (aluminium)"],
    explain: "Only copper(II) gives a blue hydroxide precipitate with NaOH.",
    color: "#6fa8dc",
  },
  {
    id: "fe2-naoh",
    kind: "cation",
    reagent: "sodium hydroxide (NaOH)",
    observation: "A dirty-green precipitate forms, insoluble in excess.",
    answer: "Fe²⁺ (iron(II))",
    options: ["Fe²⁺ (iron(II))", "Cu²⁺ (copper(II))", "Zn²⁺ (zinc)", "Fe³⁺ (iron(III))"],
    explain: "Iron(II) hydroxide is a characteristic dirty-green precipitate.",
    color: "#5fae6d",
  },
  {
    id: "fe3-naoh",
    kind: "cation",
    reagent: "sodium hydroxide (NaOH)",
    observation: "A red-brown precipitate forms, insoluble in excess.",
    answer: "Fe³⁺ (iron(III))",
    options: ["Fe³⁺ (iron(III))", "Fe²⁺ (iron(II))", "Cu²⁺ (copper(II))", "Ca²⁺ (calcium)"],
    explain: "Iron(III) hydroxide is red-brown — never confuse it with green iron(II).",
    color: "#a5552f",
  },
  {
    id: "al-naoh",
    kind: "cation",
    reagent: "sodium hydroxide (NaOH), then excess",
    observation: "A white precipitate forms, then dissolves in excess to a colourless solution.",
    answer: "Al³⁺ (aluminium)",
    options: ["Al³⁺ (aluminium)", "Ca²⁺ (calcium)", "Cu²⁺ (copper(II))", "Fe²⁺ (iron(II))"],
    explain: "Aluminium hydroxide is amphoteric, so it redissolves in excess NaOH. (Zn²⁺ does too — use aqueous ammonia to tell them apart.)",
    color: "#e6e8ec",
  },
  {
    id: "ca-naoh",
    kind: "cation",
    reagent: "sodium hydroxide (NaOH), then excess",
    observation: "A white precipitate forms and remains, even in excess.",
    answer: "Ca²⁺ (calcium)",
    options: ["Ca²⁺ (calcium)", "Al³⁺ (aluminium)", "Zn²⁺ (zinc)", "Pb²⁺ (lead(II))"],
    explain: "Calcium gives a white precipitate that is insoluble in excess NaOH, unlike Al³⁺ and Zn²⁺.",
    color: "#eef0f3",
  },
  {
    id: "zn-nh3",
    kind: "cation",
    reagent: "aqueous ammonia (NH₃), then excess",
    observation: "A white precipitate forms, then dissolves in excess ammonia.",
    answer: "Zn²⁺ (zinc)",
    options: ["Zn²⁺ (zinc)", "Al³⁺ (aluminium)", "Ca²⁺ (calcium)", "Cu²⁺ (copper(II))"],
    explain: "Zinc hydroxide redissolves in excess ammonia; aluminium's does not — the key way to separate them.",
    color: "#e6e8ec",
  },
  {
    id: "nh4",
    kind: "cation",
    reagent: "sodium hydroxide (NaOH), warmed gently",
    observation: "A pungent gas is released that turns damp red litmus paper blue.",
    answer: "NH₄⁺ (ammonium)",
    options: ["NH₄⁺ (ammonium)", "Na⁺ (sodium)", "Ca²⁺ (calcium)", "K⁺ (potassium)"],
    explain: "The gas is ammonia — the unmistakable signature of the ammonium ion.",
    color: "#d7e9c9",
  },
  {
    id: "carbonate",
    kind: "anion",
    reagent: "dilute hydrochloric acid",
    observation: "The solution effervesces, and the gas turns limewater milky.",
    answer: "CO₃²⁻ (carbonate)",
    options: ["CO₃²⁻ (carbonate)", "SO₄²⁻ (sulfate)", "Cl⁻ (chloride)", "NO₃⁻ (nitrate)"],
    explain: "Fizzing plus milky limewater means carbon dioxide — released by a carbonate.",
    color: "#cfe3ef",
  },
  {
    id: "chloride",
    kind: "anion",
    reagent: "dilute nitric acid, then silver nitrate",
    observation: "A white precipitate forms.",
    answer: "Cl⁻ (chloride)",
    options: ["Cl⁻ (chloride)", "I⁻ (iodide)", "SO₄²⁻ (sulfate)", "CO₃²⁻ (carbonate)"],
    explain: "Silver chloride is a white precipitate with silver nitrate.",
    color: "#eef0f3",
  },
  {
    id: "iodide",
    kind: "anion",
    reagent: "dilute nitric acid, then silver nitrate",
    observation: "A yellow precipitate forms.",
    answer: "I⁻ (iodide)",
    options: ["I⁻ (iodide)", "Cl⁻ (chloride)", "SO₄²⁻ (sulfate)", "NO₃⁻ (nitrate)"],
    explain: "Silver iodide is yellow — silver chloride would have been white.",
    color: "#e6cf5a",
  },
  {
    id: "sulfate",
    kind: "anion",
    reagent: "dilute nitric acid, then barium nitrate",
    observation: "A white precipitate forms.",
    answer: "SO₄²⁻ (sulfate)",
    options: ["SO₄²⁻ (sulfate)", "Cl⁻ (chloride)", "CO₃²⁻ (carbonate)", "I⁻ (iodide)"],
    explain: "Barium sulfate is an insoluble white precipitate — the classic sulfate test.",
    color: "#eef0f3",
  },
  {
    id: "gas-h2",
    kind: "gas",
    reagent: "a lit splint at the mouth of the tube",
    observation: "The gas burns with a squeaky 'pop'.",
    answer: "Hydrogen",
    options: ["Hydrogen", "Oxygen", "Carbon dioxide", "Ammonia"],
    explain: "The squeaky-pop test is unique to hydrogen.",
    color: "#dfe9f5",
  },
  {
    id: "gas-o2",
    kind: "gas",
    reagent: "a glowing splint lowered into the tube",
    observation: "The splint relights.",
    answer: "Oxygen",
    options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Chlorine"],
    explain: "Oxygen relights a glowing splint.",
    color: "#e8f1f8",
  },
  {
    id: "gas-cl2",
    kind: "gas",
    reagent: "damp litmus paper held in the gas",
    observation: "The paper turns red, then is bleached white.",
    answer: "Chlorine",
    options: ["Chlorine", "Ammonia", "Oxygen", "Hydrogen"],
    explain: "Chlorine bleaches damp litmus paper — a test no other common gas passes.",
    color: "#e4ee9c",
  },
];
