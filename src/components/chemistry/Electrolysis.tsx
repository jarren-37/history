"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAtelier } from "@/lib/chemistry/store";
import { getStation } from "@/content/chemistry/stations";
import { playZap } from "@/lib/sound";
import {
  SciPanel,
  StationTopBar,
  StationHeading,
  WhyGate,
  CompleteButton,
} from "@/components/science/ui";

interface Ion {
  id: number;
  x0: number;
  y0: number;
  cation: boolean;
}

export function Electrolysis() {
  const { isDone, complete } = useAtelier();
  const st = getStation("electrolysis")!;
  const [on, setOn] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const done = isDone("electrolysis");

  const ions = useMemo<Ion[]>(() => {
    const arr: Ion[] = [];
    let id = 0;
    for (let i = 0; i < 4; i++) arr.push({ id: id++, x0: 160 + Math.random() * 280, y0: 90 + Math.random() * 90, cation: true });
    for (let i = 0; i < 8; i++) arr.push({ id: id++, x0: 160 + Math.random() * 280, y0: 90 + Math.random() * 90, cation: false });
    return arr;
  }, []);

  function power() {
    setOn(true);
    playZap();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/chemistry" />
      <StationHeading icon={st.icon} topic={st.topic} title={st.name}>
        Molten lead(II) bromide is a soup of free-moving ions: lead cations
        (Pb²⁺) and bromide anions (Br⁻). Switch on the power and command them to
        move.
      </StationHeading>

      <SciPanel>
        <svg viewBox="0 0 600 260" className="w-full">
          {/* power source + switch */}
          <line x1="120" y1="20" x2="480" y2="20" stroke="var(--sci-ink)" strokeWidth="2" opacity="0.6" />
          <line x1="120" y1="20" x2="120" y2="70" stroke="var(--sci-ink)" strokeWidth="2" opacity="0.6" />
          <line x1="480" y1="20" x2="480" y2="70" stroke="var(--sci-ink)" strokeWidth="2" opacity="0.6" />
          <rect x="280" y="8" width="40" height="24" rx="4" fill="var(--sci-panel)" stroke="var(--sci-border)" />
          <text x="300" y="25" textAnchor="middle" fontSize="12" fill={on ? "var(--sci-accent)" : "var(--sci-ink)"} fontWeight="800">
            {on ? "ON" : "OFF"}
          </text>

          {/* cell */}
          <rect x="90" y="70" width="420" height="140" rx="10" fill="var(--sci-panel)" stroke="var(--sci-border)" strokeWidth="2" />
          {/* molten glow */}
          <rect x="94" y="120" width="412" height="86" rx="8" fill="var(--sci-accent)" opacity="0.12" />

          {/* electrodes */}
          <rect x="112" y="60" width="14" height="150" rx="3" fill="#8a97a0" />
          <text x="119" y="52" textAnchor="middle" fontSize="16" fill="var(--sci-ink)" fontWeight="800">−</text>
          <text x="119" y="228" textAnchor="middle" fontSize="9" fill="var(--sci-ink)" opacity="0.8">cathode</text>
          <rect x="474" y="60" width="14" height="150" rx="3" fill="#8a97a0" />
          <text x="481" y="52" textAnchor="middle" fontSize="16" fill="var(--sci-ink)" fontWeight="800">+</text>
          <text x="481" y="228" textAnchor="middle" fontSize="9" fill="var(--sci-ink)" opacity="0.8">anode</text>

          {/* lead deposit at cathode */}
          {on && (
            <motion.rect x="126" width="10" rx="2" fill="#cfd6db"
              initial={{ y: 200, height: 0 }} animate={{ y: 110, height: 90 }} transition={{ duration: 3, delay: 1 }} />
          )}
          {/* bromine bubbles at anode */}
          {on && Array.from({ length: 5 }).map((_, i) => (
            <motion.circle key={i} cx={468 - (i % 2) * 8} r="4" fill="#7a4a1a"
              initial={{ cy: 190 }} animate={{ cy: 80, opacity: [0.9, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 1 + i * 0.3 }} />
          ))}

          {/* ions */}
          {ions.map((ion) => {
            const target = ion.cation
              ? { x: 140 + Math.random() * 8, y: 90 + Math.random() * 100 }
              : { x: 452 + Math.random() * 8, y: 90 + Math.random() * 100 };
            return (
              <motion.g
                key={ion.id}
                initial={{ x: 0, y: 0 }}
                animate={on ? { x: target.x - ion.x0, y: target.y - ion.y0 } : { x: 0, y: 0 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              >
                <circle cx={ion.x0} cy={ion.y0} r="11" fill={ion.cation ? "#e0913f" : "#4bbf7a"} opacity="0.9" />
                <text x={ion.x0} y={ion.y0 + 4} textAnchor="middle" fontSize="10" fontWeight="800" fill="#0c0c0c">
                  {ion.cation ? "Pb²⁺" : "Br⁻"}
                </text>
              </motion.g>
            );
          })}
        </svg>

        <div className="mt-2 text-center">
          {!on ? (
            <button
              onClick={power}
              className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105"
              style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}
            >
              ⚡ Switch on the power
            </button>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="font-mono text-sm font-bold" style={{ color: "var(--sci-accent)" }}>
                Cathode (−): Pb²⁺ + 2e⁻ → Pb &nbsp;·&nbsp; Anode (+): 2Br⁻ → Br₂ + 2e⁻
              </p>
              <p className="mt-1 text-sm opacity-80">
                Silvery <strong>lead metal</strong> plates the cathode; brown
                <strong> bromine gas</strong> bubbles off the anode.
              </p>
            </motion.div>
          )}
        </div>
      </SciPanel>

      {on && (
        <div className="mt-4">
          <WhyGate
            question="Why do the positive Pb²⁺ ions travel to the cathode?"
            options={[
              "The cathode is negative, and opposite charges attract",
              "The cathode is closer to them",
              "Positive ions are lighter and float left",
              "The anode repels everything equally",
            ]}
            answer={0}
            explain="The cathode is the negative electrode. Positive ions (cations) are attracted to it, gain electrons (reduction) and become neutral atoms. Negative ions go to the positive anode."
            onResolved={() => setUnderstood(true)}
          />
        </div>
      )}

      <div className="mt-5">
        <CompleteButton
          done={done}
          xp={st.xp}
          disabled={!understood}
          onComplete={() => complete("electrolysis", st.xp)}
          nextHref="/chemistry/lab/organic"
          hint="Switch on the power and answer the question first."
        />
      </div>
    </div>
  );
}
