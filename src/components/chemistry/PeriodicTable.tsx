"use client";

import { useState } from "react";
import { useAtelier } from "@/lib/chemistry/store";
import { getStation } from "@/content/chemistry/stations";
import { ELEMENTS, GROUP_LABELS, CAT_LABEL, type Element } from "@/content/chemistry/elements";
import { playBubble } from "@/lib/sound";
import {
  SciPanel,
  StationTopBar,
  StationHeading,
  WhyGate,
  CompleteButton,
} from "@/components/science/ui";

const CAT_COLOR: Record<string, string> = {
  metal: "#e0913f",
  nonmetal: "#4bbf7a",
  metalloid: "#d8b24a",
  noble: "#a97be0",
};

export function PeriodicTable() {
  const { isDone, complete } = useAtelier();
  const st = getStation("periodic")!;
  const [sel, setSel] = useState<Element | null>(null);
  const [understood, setUnderstood] = useState(false);
  const done = isDone("periodic");

  function pick(e: Element) {
    setSel(e);
    playBubble();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/chemistry" />
      <StationHeading icon={st.icon} topic={st.topic} title={st.name}>
        The periodic table is a map of every element, arranged so that its
        patterns leap out. Columns are <em>groups</em>; rows are <em>periods</em>.
        Tap an element to read it.
      </StationHeading>

      <SciPanel>
        <div className="overflow-x-auto">
          <div className="min-w-[420px]">
            {/* group headers */}
            <div className="grid grid-cols-8 gap-1">
              {GROUP_LABELS.map((g) => (
                <div key={g} className="text-center text-[10px] font-bold opacity-60" style={{ color: "var(--sci-ink)" }}>
                  {g}
                </div>
              ))}
            </div>
            {/* periods */}
            {[1, 2, 3, 4].map((period) => (
              <div key={period} className="mt-1 grid grid-cols-8 gap-1">
                {Array.from({ length: 8 }).map((_, col) => {
                  const el = ELEMENTS.find((e) => e.period === period && e.col === col);
                  if (!el) return <div key={col} />;
                  const highlighted = sel && sel.col === el.col;
                  const isSel = sel?.z === el.z;
                  return (
                    <button
                      key={col}
                      onClick={() => pick(el)}
                      className="relative aspect-square rounded-md border-2 transition-transform hover:scale-105"
                      style={{
                        borderColor: isSel ? "#fff" : CAT_COLOR[el.cat],
                        background: `color-mix(in srgb, ${CAT_COLOR[el.cat]} ${highlighted ? 40 : 16}%, transparent)`,
                        color: "var(--sci-ink)",
                      }}
                    >
                      <span className="absolute left-1 top-0.5 text-[8px] opacity-70">{el.z}</span>
                      <span className="font-display text-base font-black">{el.sym}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* legend */}
        <div className="mt-3 flex flex-wrap justify-center gap-2 text-[11px]">
          {Object.entries(CAT_LABEL).map(([k, label]) => (
            <span key={k} className="flex items-center gap-1" style={{ color: "var(--sci-ink)" }}>
              <span className="h-3 w-3 rounded" style={{ background: CAT_COLOR[k] }} /> {label}
            </span>
          ))}
        </div>

        {/* info panel */}
        <div className="mt-4 rounded-xl border p-4 text-center" style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>
          {sel ? (
            <div>
              <div className="font-display text-4xl font-black" style={{ color: CAT_COLOR[sel.cat] }}>{sel.sym}</div>
              <div className="mt-1 text-lg font-bold">{sel.name}</div>
              <div className="mt-1 text-sm opacity-80">
                Atomic number {sel.z} · Group {GROUP_LABELS[sel.col]} · Period {sel.period} · {CAT_LABEL[sel.cat]}
              </div>
              {["0"].includes(GROUP_LABELS[sel.col]) && (
                <div className="mt-1 text-xs opacity-70">A noble gas — a full outer shell makes it unreactive.</div>
              )}
              {GROUP_LABELS[sel.col] === "1" && sel.cat === "metal" && (
                <div className="mt-1 text-xs opacity-70">An alkali metal — 1 outer electron; reactivity increases down the group.</div>
              )}
            </div>
          ) : (
            <div className="opacity-70">Tap an element to reveal its secrets.</div>
          )}
        </div>
      </SciPanel>

      <div className="mt-4">
        <WhyGate
          question="Elements in the same group (column) share the same number of…"
          options={[
            "outer-shell electrons — so they react in similar ways",
            "protons in the nucleus",
            "neutrons",
            "atoms in total",
          ]}
          answer={0}
          explain="A group shares the same number of outer (valence) electrons, which is why the whole group behaves in a similar, predictable way."
          onResolved={() => setUnderstood(true)}
        />
      </div>

      <div className="mt-5">
        <CompleteButton
          done={done}
          xp={st.xp}
          disabled={!understood || !sel}
          onComplete={() => complete("periodic", st.xp)}
          nextHref="/chemistry/lab/separation"
          hint="Explore an element and answer the question first."
        />
      </div>
    </div>
  );
}
