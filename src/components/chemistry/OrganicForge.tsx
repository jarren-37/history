"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAtelier } from "@/lib/chemistry/store";
import { getStation } from "@/content/chemistry/stations";
import { playBubble } from "@/lib/sound";
import {
  SciPanel,
  StationTopBar,
  StationHeading,
  WhyGate,
  CompleteButton,
} from "@/components/science/ui";

const ALKANE = ["methane", "ethane", "propane", "butane", "pentane", "hexane"];
const ALCOHOL = ["methanol", "ethanol", "propanol", "butanol", "pentanol", "hexanol"];

function sub(n: number) {
  return String(n)
    .split("")
    .map((d) => "₀₁₂₃₄₅₆₇₈₉"[+d])
    .join("");
}

export function OrganicForge() {
  const { isDone, complete } = useAtelier();
  const st = getStation("organic")!;
  const [n, setN] = useState(1);
  const [alcohol, setAlcohol] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const [built, setBuilt] = useState(false);
  const done = isDone("organic");

  const name = (alcohol ? ALCOHOL : ALKANE)[n - 1];
  const formula = alcohol
    ? `C${n > 1 ? sub(n) : ""}H${sub(2 * n + 1)}OH`
    : `C${n > 1 ? sub(n) : ""}H${sub(2 * n + 2)}`;

  function setChain(v: number) {
    const c = Math.max(1, Math.min(6, v));
    setN(c);
    setBuilt(true);
    playBubble();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/chemistry" />
      <StationHeading icon={st.icon} topic={st.topic} title={st.name}>
        Carbon is the great builder — it links into chains. Forge longer chains
        and watch a whole <em>family</em> of molecules appear, each differing by
        one CH₂ unit.
      </StationHeading>

      <SciPanel>
        <svg viewBox="0 0 480 220" className="w-full">
          {/* bonds */}
          {Array.from({ length: n - 1 }).map((_, i) => {
            const x1 = 70 + i * 66, y1 = 130 + (i % 2 ? -34 : 0);
            const x2 = 70 + (i + 1) * 66, y2 = 130 + ((i + 1) % 2 ? -34 : 0);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--sci-ink)" strokeWidth="3" opacity="0.7" />;
          })}
          {/* carbons */}
          {Array.from({ length: n }).map((_, i) => {
            const x = 70 + i * 66, y = 130 + (i % 2 ? -34 : 0);
            return (
              <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} style={{ transformOrigin: `${x}px ${y}px` }}>
                <circle cx={x} cy={y} r="16" fill="var(--sci-accent)" />
                <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0c0c0c">C</text>
              </motion.g>
            );
          })}
          {/* -OH group */}
          {alcohol && (() => {
            const i = n - 1, x = 70 + i * 66, y = 130 + (i % 2 ? -34 : 0);
            return (
              <g>
                <line x1={x} y1={y} x2={x + 40} y2={y} stroke="var(--sci-ink)" strokeWidth="3" opacity="0.7" />
                <circle cx={x + 52} cy={y} r="14" fill="var(--sci-accent2)" />
                <text x={x + 52} y={y + 5} textAnchor="middle" fontSize="12" fontWeight="800" fill="#0c0c0c">OH</text>
              </g>
            );
          })()}
        </svg>

        <div className="mt-2 text-center">
          <div className="font-display text-3xl font-black capitalize" style={{ color: "var(--sci-ink)" }}>{name}</div>
          <div className="font-mono text-xl" style={{ color: "var(--sci-accent)" }}>{formula}</div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button onClick={() => setChain(n - 1)} disabled={n <= 1}
            className="grid h-11 w-11 place-items-center rounded-full text-2xl font-black shadow disabled:opacity-40"
            style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>−</button>
          <span className="min-w-[8ch] text-center font-display text-lg font-bold" style={{ color: "var(--sci-ink)" }}>
            {n} carbon{n > 1 ? "s" : ""}
          </span>
          <button onClick={() => setChain(n + 1)} disabled={n >= 6}
            className="grid h-11 w-11 place-items-center rounded-full text-2xl font-black shadow disabled:opacity-40"
            style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>+</button>
          <button onClick={() => { setAlcohol((a) => !a); setBuilt(true); }}
            className="rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors"
            style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>
            {alcohol ? "🧪 Alcohol (−OH)" : "⛓️ Alkane"}
          </button>
        </div>
      </SciPanel>

      <div className="mt-4">
        <WhyGate
          question="Each time you add one carbon to an alkane chain, the formula changes by…"
          options={["one carbon and two hydrogens (CH₂)", "one carbon only (C)", "two carbons (C₂)", "one hydrogen only (H)"]}
          answer={0}
          explain="Members of a homologous series differ by CH₂. That is why they share the general formula CₙH₂ₙ₊₂ and behave in similar, predictable ways."
          onResolved={() => setUnderstood(true)}
        />
      </div>

      <div className="mt-5">
        <CompleteButton
          done={done}
          xp={st.xp}
          disabled={!understood || !built}
          onComplete={() => complete("organic", st.xp)}
          nextHref="/chemistry/games"
          nextLabel="The Games Room →"
          hint="Build a chain and answer the question first."
        />
      </div>
    </div>
  );
}
