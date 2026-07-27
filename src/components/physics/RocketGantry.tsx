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
  Slider,
  WhyGate,
  CompleteButton,
} from "@/components/science/ui";

export function RocketGantry() {
  const { isDone, complete } = useObservatory();
  const st = getStation("forces")!;
  const [thrust, setThrust] = useState(60);
  const [mass, setMass] = useState(20);
  const [runId, setRunId] = useState(0);
  const [launched, setLaunched] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const done = isDone("forces");

  const a = thrust / mass; // F = ma  →  a = F/m
  const rise = Math.min(280, a * 55); // visual travel ∝ acceleration

  function launch() {
    setRunId((r) => r + 1);
    setLaunched(true);
    playZap();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/physics" />
      <StationHeading icon={st.icon} topic={st.topic} title={st.name}>
        Newton&apos;s second law says force = mass × acceleration. Set the engine
        thrust and the rocket&apos;s mass, then light the fuse and feel the law.
      </StationHeading>

      <SciPanel>
        <div className="relative mx-auto h-[320px] w-full max-w-sm overflow-hidden rounded-xl" style={{ background: "linear-gradient(180deg,#0a1020,#141b38)" }}>
          {/* stars */}
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="absolute h-0.5 w-0.5 rounded-full bg-white/60" style={{ left: `${(i * 53) % 100}%`, top: `${(i * 31) % 100}%` }} />
          ))}
          {/* ground */}
          <div className="absolute bottom-0 h-8 w-full" style={{ background: "var(--sci-border)" }} />
          {/* rocket */}
          <motion.div
            key={runId}
            className="absolute left-1/2 -translate-x-1/2 text-5xl"
            style={{ bottom: 28 }}
            initial={{ y: 0 }}
            animate={{ y: launched ? -rise : 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          >
            🚀
            {launched && (
              <motion.div
                className="mx-auto text-2xl"
                animate={{ opacity: [1, 0.4, 1], scaleY: [1, 1.4, 1] }}
                transition={{ duration: 0.2, repeat: 8 }}
                style={{ height: 8 + thrust / 6 }}
              >
                🔥
              </motion.div>
            )}
          </motion.div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Slider label="Engine thrust (force)" min={10} max={100} value={thrust} onChange={setThrust} unit=" N" />
          <Slider label="Rocket mass" min={2} max={50} value={mass} onChange={setMass} unit=" kg" />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="font-mono text-lg font-bold" style={{ color: "var(--sci-accent)" }}>
            a = F ÷ m = {thrust} ÷ {mass} = {a.toFixed(1)} m/s²
          </div>
          <button onClick={launch} className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105" style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>
            🔥 Launch
          </button>
        </div>
      </SciPanel>

      <div className="mt-4">
        <WhyGate
          question="You keep the thrust the same but double the rocket's mass. What happens to its acceleration?"
          options={["It halves", "It doubles", "It stays exactly the same", "It becomes zero"]}
          answer={0}
          explain="Since a = F/m, doubling the mass (with the same force) halves the acceleration. Heavier objects are harder to speed up."
          onResolved={() => setUnderstood(true)}
        />
      </div>

      <div className="mt-5">
        <CompleteButton
          done={done}
          xp={st.xp}
          disabled={!understood || !launched}
          onComplete={() => complete("forces", st.xp)}
          nextHref="/physics/lab/circuits"
          hint="Launch the rocket and answer the question first."
        />
      </div>
    </div>
  );
}
