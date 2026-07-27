"use client";

import { useMemo, useState } from "react";
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

const W = 600;
const SPEED = 200; // px/sec — fixed wave speed, so v = fλ holds

export function WaveTable() {
  const { isDone, complete } = useObservatory();
  const st = getStation("waves")!;
  const [freq, setFreq] = useState(3);
  const [amp, setAmp] = useState(36);
  const [understood, setUnderstood] = useState(false);
  const [tinkered, setTinkered] = useState(false);
  const done = isDone("waves");

  const wavelength = W / freq;

  const path = useMemo(() => {
    let d = "";
    for (let x = 0; x <= W * 2; x += 4) {
      const y = 100 - amp * Math.sin((2 * Math.PI * freq * x) / W);
      d += `${x === 0 ? "M" : "L"} ${x} ${y.toFixed(1)} `;
    }
    return d;
  }, [freq, amp]);

  const travelDur = wavelength / SPEED;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/physics" />
      <StationHeading icon={st.icon} topic={st.topic} title={st.name}>
        A wave&apos;s speed stays fixed. Turn up the frequency and watch the
        wavelength shrink to keep the equation <em>v = f λ</em> true.
      </StationHeading>

      <SciPanel>
        <div className="relative mx-auto w-full overflow-hidden rounded-xl" style={{ background: "linear-gradient(180deg,#0b1230,#10184a)", height: 200 }}>
          <svg viewBox="0 0 600 200" className="h-[200px] w-full" preserveAspectRatio="none">
            <line x1="0" y1="100" x2="600" y2="100" stroke="var(--sci-border)" strokeWidth="1" />
            <motion.g
              key={`${freq}-${amp}`}
              animate={{ x: [0, -wavelength] }}
              transition={{ duration: travelDur, repeat: Infinity, ease: "linear" }}
            >
              <path d={path} fill="none" stroke="var(--sci-accent)" strokeWidth="3" style={{ filter: "drop-shadow(0 0 5px var(--sci-glow))" }} />
            </motion.g>
            {/* wavelength marker for one cycle */}
            <g stroke="var(--sci-accent2)" strokeWidth="1.5">
              <line x1="20" y1="30" x2={20 + wavelength} y2="30" />
              <line x1="20" y1="24" x2="20" y2="36" />
              <line x1={20 + wavelength} y1="24" x2={20 + wavelength} y2="36" />
            </g>
            <text x={20 + wavelength / 2} y="22" textAnchor="middle" fontSize="12" fill="var(--sci-accent2)" fontWeight="700">λ</text>
          </svg>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Slider label="Frequency (f)" min={1} max={8} value={freq} onChange={(v) => { setFreq(v); setTinkered(true); }} unit=" Hz" />
          <Slider label="Amplitude" min={6} max={60} value={amp} onChange={(v) => { setAmp(v); setTinkered(true); }} />
        </div>
        <div className="mt-3 text-center font-mono text-lg font-bold" style={{ color: "var(--sci-accent)" }}>
          v = f × λ &nbsp;·&nbsp; λ = {Math.round(wavelength)} px &nbsp;·&nbsp; speed fixed
        </div>
      </SciPanel>

      <div className="mt-4">
        <WhyGate
          question="At a fixed wave speed, if you increase the frequency, the wavelength…"
          options={["gets shorter", "gets longer", "stays the same", "becomes zero"]}
          answer={0}
          explain="Because v = f λ and v is fixed, raising the frequency must shorten the wavelength — the crests bunch up closer together."
          onResolved={() => setUnderstood(true)}
        />
      </div>

      <div className="mt-5">
        <CompleteButton
          done={done}
          xp={st.xp}
          disabled={!understood || !tinkered}
          onComplete={() => complete("waves", st.xp)}
          nextHref="/physics/lab/gravity"
          hint="Adjust the wave and answer the question first."
        />
      </div>
    </div>
  );
}
