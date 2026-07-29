"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useObservatory } from "@/lib/physics/store";
import { getStation } from "@/content/physics/stations";
import { playZap } from "@/lib/sound";
import {
  SciPanel,
  StationTopBar,
  StationHeading,
  WhyGate,
  CompleteButton,
} from "@/components/science/ui";

export function Magnetism() {
  const { isDone, complete } = useObservatory();
  const st = getStation("magnetism")!;
  const [flip, setFlip] = useState(false);
  const [magIn, setMagIn] = useState(false);
  const [deflect, setDeflect] = useState(0); // -1, 0, 1
  const [lit, setLit] = useState(false);
  const [moved, setMoved] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const done = isDone("magnetism");

  const leftColor = flip ? "#4a6bd0" : "#d8453b";
  const rightColor = flip ? "#d8453b" : "#4a6bd0";
  const leftLabel = flip ? "S" : "N";
  const rightLabel = flip ? "N" : "S";

  function move(into: boolean) {
    if (into === magIn) return;
    setMagIn(into);
    setMoved(true);
    playZap();
    setDeflect(into ? 1 : -1);
    setLit(true);
    setTimeout(() => setDeflect(0), 550);
    setTimeout(() => setLit(false), 550);
  }

  // compass positions around the magnet
  const compasses = [
    { x: 300, y: 60 },
    { x: 300, y: 190 },
    { x: 150, y: 125 },
    { x: 450, y: 125 },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/physics" />
      <StationHeading icon={st.icon} topic={st.topic} title={st.name}>
        A magnet fills the space around it with an invisible field. Flip it and
        watch the compasses obey — then discover how a <em>moving</em> magnet can
        conjure electricity from nothing.
      </StationHeading>

      {/* Field */}
      <SciPanel>
        <div className="mb-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--sci-accent)" }}>
          The invisible field
        </div>
        <svg viewBox="0 0 600 250" className="w-full">
          {/* field-line loops */}
          {[35, 70, 105].map((d, i) => (
            <g key={i} stroke="var(--sci-accent)" strokeWidth="1.5" fill="none" opacity={0.5 - i * 0.1}>
              <path d={`M270 125 C ${270 - d} ${125 - d - 30}, ${330 + d} ${125 - d - 30}, 330 125`} />
              <path d={`M270 125 C ${270 - d} ${125 + d + 30}, ${330 + d} ${125 + d + 30}, 330 125`} />
            </g>
          ))}
          {/* magnet */}
          <g>
            <rect x="240" y="108" width="60" height="34" fill={leftColor} />
            <rect x="300" y="108" width="60" height="34" fill={rightColor} />
            <text x="270" y="131" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fff">{leftLabel}</text>
            <text x="330" y="131" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fff">{rightLabel}</text>
          </g>
          {/* compasses */}
          {compasses.map((c, i) => (
            <motion.g key={i} animate={{ rotate: flip ? 180 : 0 }} transition={{ type: "spring", stiffness: 120, damping: 12 }} style={{ transformOrigin: `${c.x}px ${c.y}px` }}>
              <circle cx={c.x} cy={c.y} r="12" fill="var(--sci-panel)" stroke="var(--sci-border)" />
              <path d={`M${c.x - 9} ${c.y} L${c.x + 9} ${c.y}`} stroke="var(--sci-ink)" strokeWidth="1" />
              <path d={`M${c.x + 9} ${c.y} l-5 -3 l0 6 z`} fill="#d8453b" />
            </motion.g>
          ))}
        </svg>
        <div className="text-center">
          <button onClick={() => setFlip((f) => !f)}
            className="rounded-full px-5 py-2 font-display font-extrabold shadow transition-transform hover:scale-105"
            style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>
            🔄 Flip the magnet
          </button>
        </div>
      </SciPanel>

      {/* Induction */}
      <SciPanel className="mt-4">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--sci-accent)" }}>
          Electricity from motion
        </div>
        <svg viewBox="0 0 600 210" className="w-full">
          {/* coil */}
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={i} cx={330 + i * 20} cy={120} rx="10" ry="42" fill="none" stroke="var(--sci-ink)" strokeWidth="2" opacity="0.7" />
          ))}
          {/* wires to galvanometer + bulb */}
          <path d="M330 162 L330 190 L120 190 L120 150" fill="none" stroke="var(--sci-ink)" strokeWidth="2" opacity="0.6" />
          <path d="M430 162 L430 178 L500 178" fill="none" stroke="var(--sci-ink)" strokeWidth="2" opacity="0.6" />
          {/* magnet, animated in/out */}
          <motion.g animate={{ x: magIn ? 90 : 0 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
            <rect x="200" y="104" width="44" height="32" fill="#d8453b" />
            <rect x="244" y="104" width="44" height="32" fill="#4a6bd0" />
            <text x="222" y="126" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">N</text>
            <text x="266" y="126" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">S</text>
          </motion.g>
          {/* galvanometer */}
          <circle cx="120" cy="120" r="30" fill="var(--sci-panel)" stroke="var(--sci-ink)" strokeWidth="2" />
          <motion.line x1="120" y1="120" x2="120" y2="96" stroke="#d8453b" strokeWidth="2.5"
            animate={{ rotate: deflect * 38 }} transition={{ type: "spring", stiffness: 200, damping: 10 }}
            style={{ transformOrigin: "120px 120px" }} />
          <text x="120" y="162" textAnchor="middle" fontSize="9" fill="var(--sci-ink)" opacity="0.7">galvanometer</text>
          {/* bulb */}
          <circle cx="520" cy="178" r="16" fill="#facc15" opacity={lit ? 0.95 : 0.12} style={{ filter: lit ? "drop-shadow(0 0 14px #facc15)" : "none" }} />
          <text x="520" y="183" textAnchor="middle" fontSize="14">💡</text>
        </svg>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => move(true)} disabled={magIn}
            className="rounded-full px-5 py-2.5 font-display font-extrabold shadow transition-transform hover:scale-105 disabled:opacity-40"
            style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>
            → Push magnet in
          </button>
          <button onClick={() => move(false)} disabled={!magIn}
            className="rounded-full px-5 py-2.5 font-display font-extrabold shadow transition-transform hover:scale-105 disabled:opacity-40"
            style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>
            ← Pull magnet out
          </button>
        </div>
        <p className="mt-2 text-center text-sm opacity-70" style={{ color: "var(--sci-ink)" }}>
          The needle only kicks while the magnet is moving. Hold it still — nothing.
        </p>
      </SciPanel>

      <div className="mt-4">
        <WhyGate
          question="When is a current induced in the coil?"
          options={[
            "Only while the magnet is moving (the field through the coil is changing)",
            "Only when the magnet sits still inside the coil",
            "All the time, as long as a magnet is nearby",
            "Never — magnets cannot make electricity",
          ]}
          answer={0}
          explain="Electromagnetic induction needs a changing magnetic field. Moving the magnet changes the field through the coil, inducing a current; a stationary magnet induces nothing."
          onResolved={() => setUnderstood(true)}
        />
      </div>

      <div className="mt-5">
        <CompleteButton
          done={done}
          xp={st.xp}
          disabled={!understood || !moved}
          onComplete={() => complete("magnetism", st.xp)}
          nextHref="/physics/lab/thermal"
          hint="Move the magnet and answer the question first."
        />
      </div>
    </div>
  );
}
