"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useObservatory } from "@/lib/physics/store";
import { getStation } from "@/content/physics/stations";
import {
  SciPanel,
  StationTopBar,
  StationHeading,
  Slider,
  WhyGate,
  CompleteButton,
} from "@/components/science/ui";

const LOOP = "M110 70 H490 V210 H110 Z";

export function CircuitBench() {
  const { isDone, complete } = useObservatory();
  const st = getStation("circuits")!;
  const [volts, setVolts] = useState(6);
  const [ohms, setOhms] = useState(3);
  const [understood, setUnderstood] = useState(false);
  const [tinkered, setTinkered] = useState(false);
  const done = isDone("circuits");

  const current = volts / ohms; // I = V / R
  const brightness = Math.min(1, current / 4);
  const flowDur = Math.max(0.3, Math.min(6, 3.5 / current));

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/physics" />
      <StationHeading icon={st.icon} topic={st.topic} title={st.name}>
        The city has lost power. Wire up the circuit, then use Ohm&apos;s law —
        voltage = current × resistance — to light the lamp.
      </StationHeading>

      <SciPanel>
        <svg viewBox="0 0 600 260" className="w-full">
          {/* dim base wire */}
          <path d={LOOP} fill="none" stroke="var(--sci-border)" strokeWidth="6" />
          {/* glowing current flow */}
          <motion.path
            key={Math.round(flowDur * 20)}
            d={LOOP}
            fill="none"
            stroke="var(--sci-accent)"
            strokeWidth="4"
            strokeDasharray="10 16"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 5px var(--sci-glow))" }}
            animate={{ strokeDashoffset: [0, -26] }}
            transition={{ duration: flowDur, repeat: Infinity, ease: "linear" }}
          />

          {/* battery (left) */}
          <g>
            <rect x="98" y="120" width="24" height="40" fill="var(--sci-panel)" stroke="var(--sci-ink)" />
            <line x1="110" y1="112" x2="110" y2="120" stroke="var(--sci-ink)" strokeWidth="4" />
            <line x1="110" y1="160" x2="110" y2="168" stroke="var(--sci-ink)" strokeWidth="2" />
            <text x="80" y="145" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--sci-accent)">{volts}V</text>
          </g>

          {/* resistor (top, zig-zag) */}
          <polyline points="250,70 262,58 274,82 286,58 298,82 310,58 322,82 334,70" fill="none" stroke="var(--sci-ink)" strokeWidth="3" />
          <text x="292" y="46" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--sci-accent)">{ohms}Ω</text>

          {/* bulb (right) */}
          <g>
            <circle cx="490" cy="140" r="26" fill="#facc15" opacity={0.15 + brightness * 0.85} style={{ filter: `drop-shadow(0 0 ${8 + brightness * 22}px #facc15)` }} />
            <circle cx="490" cy="140" r="26" fill="none" stroke="var(--sci-ink)" strokeWidth="2" />
            <text x="490" y="145" textAnchor="middle" fontSize="16">💡</text>
          </g>
        </svg>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Slider label="Battery voltage (V)" min={1} max={12} value={volts} onChange={(v) => { setVolts(v); setTinkered(true); }} unit=" V" />
          <Slider label="Resistance (R)" min={1} max={20} value={ohms} onChange={(v) => { setOhms(v); setTinkered(true); }} unit=" Ω" />
        </div>
        <div className="mt-3 text-center font-mono text-lg font-bold" style={{ color: "var(--sci-accent)" }}>
          I = V ÷ R = {volts} ÷ {ohms} = {current.toFixed(2)} A
        </div>
      </SciPanel>

      <div className="mt-4">
        <WhyGate
          question="You increase the resistance while keeping the voltage the same. What happens to the current?"
          options={["It decreases", "It increases", "It stays the same", "It reverses direction"]}
          answer={0}
          explain="From I = V/R, a larger resistance (with fixed voltage) means a smaller current — so the bulb dims."
          onResolved={() => setUnderstood(true)}
        />
      </div>

      <div className="mt-5">
        <CompleteButton
          done={done}
          xp={st.xp}
          disabled={!understood || !tinkered}
          onComplete={() => complete("circuits", st.xp)}
          nextHref="/physics/lab/waves"
          hint="Adjust the circuit and answer the question first."
        />
      </div>
    </div>
  );
}
