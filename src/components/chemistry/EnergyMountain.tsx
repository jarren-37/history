"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAtelier } from "@/lib/chemistry/store";
import { getStation } from "@/content/chemistry/stations";
import { playChime } from "@/lib/sound";
import {
  SciPanel,
  StationTopBar,
  StationHeading,
  Slider,
  WhyGate,
  CompleteButton,
} from "@/components/science/ui";

const REACT_X = 60;
const END_X = 540;
const REACT_Y = 190;

export function EnergyMountain() {
  const { isDone, complete } = useAtelier();
  const st = getStation("energy")!;
  const [catalyst, setCatalyst] = useState(0);
  const [exo, setExo] = useState(true);
  const [runId, setRunId] = useState(0);
  const [result, setResult] = useState<"none" | "over" | "back">("none");
  const [understood, setUnderstood] = useState(false);
  const [triedCatalyst, setTriedCatalyst] = useState(false);
  const done = isDone("energy");

  const prodY = exo ? 216 : 162;
  const peakY = 72 + catalyst * 1.08; // higher catalyst → lower barrier
  const barrier = REACT_Y - peakY;
  const canClear = barrier <= 74;

  const sampleX = (t: number) => REACT_X + (END_X - REACT_X) * t;
  const sampleY = (t: number) =>
    REACT_Y * (1 - t) + prodY * t - barrier * Math.pow(Math.sin(Math.PI * t), 0.9);

  const pathD = useMemo(() => {
    let d = "";
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      d += `${i === 0 ? "M" : "L"} ${sampleX(t).toFixed(1)} ${sampleY(t).toFixed(1)} `;
    }
    return d;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalyst, exo]);

  const ball = useMemo(() => {
    const ts = canClear
      ? Array.from({ length: 13 }, (_, i) => i / 12)
      : [0, 0.12, 0.24, 0.34, 0.4, 0.34, 0.24, 0.12, 0];
    return { cx: ts.map(sampleX), cy: ts.map(sampleY) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId, canClear, catalyst, exo]);

  function react() {
    setResult("none");
    setRunId((r) => r + 1);
    setTimeout(() => {
      setResult(canClear ? "over" : "back");
      playChime(canClear);
    }, 1500);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/chemistry" />
      <StationHeading icon={st.icon} topic={st.topic} title={st.name}>
        Every reaction must climb an energy barrier — its <em>activation energy</em>.
        Add a catalyst and watch the mountain shrink into a hill the reaction can
        easily cross.
      </StationHeading>

      <SciPanel>
        <svg viewBox="0 0 600 260" className="w-full">
          {/* axes */}
          <line x1="40" y1="20" x2="40" y2="240" stroke="var(--sci-border)" strokeWidth="1" />
          <line x1="40" y1="240" x2="580" y2="240" stroke="var(--sci-border)" strokeWidth="1" />
          <text x="20" y="130" fontSize="10" fill="var(--sci-ink)" opacity="0.7" transform="rotate(-90 20 130)">Energy</text>
          <text x="300" y="256" fontSize="10" textAnchor="middle" fill="var(--sci-ink)" opacity="0.7">Reaction progress →</text>

          {/* curve */}
          <path d={pathD} fill="none" stroke="var(--sci-accent)" strokeWidth="3" />
          {/* activation energy marker */}
          <line x1={sampleX(0.5)} y1={REACT_Y} x2={sampleX(0.5)} y2={peakY} stroke="var(--sci-accent2)" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x={sampleX(0.5) + 6} y={(REACT_Y + peakY) / 2} fontSize="11" fill="var(--sci-accent2)" fontWeight="700">Ea</text>

          {/* labels */}
          <text x={REACT_X} y={REACT_Y - 8} fontSize="11" fill="var(--sci-ink)" opacity="0.8">reactants</text>
          <text x={END_X - 10} y={prodY + (exo ? 16 : -8)} fontSize="11" textAnchor="end" fill="var(--sci-ink)" opacity="0.8">products</text>

          {/* rolling ball */}
          <motion.circle
            key={runId}
            r="7"
            fill="#fff"
            style={{ filter: "drop-shadow(0 0 5px var(--sci-glow))" }}
            initial={{ cx: ball.cx[0], cy: ball.cy[0] }}
            animate={{ cx: ball.cx, cy: ball.cy }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Slider
            label="Catalyst strength"
            min={0}
            max={100}
            value={catalyst}
            onChange={(v) => { setCatalyst(v); setTriedCatalyst(true); }}
            unit="%"
          />
          <div className="flex items-end gap-2">
            <button
              onClick={() => setExo((e) => !e)}
              className="flex-1 rounded-xl border-2 px-3 py-2 text-sm font-bold transition-colors"
              style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}
            >
              {exo ? "🔥 Exothermic (releases heat)" : "❄️ Endothermic (absorbs heat)"}
            </button>
            <button
              onClick={react}
              className="rounded-xl px-4 py-2 font-display font-extrabold shadow transition-transform hover:scale-105"
              style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}
            >
              ▶ React
            </button>
          </div>
        </div>

        <div className="mt-2 min-h-[24px] text-center text-sm">
          {result === "over" && (
            <span style={{ color: "var(--sci-accent)" }} className="font-bold">
              ✓ Over the barrier — the reaction proceeds!
            </span>
          )}
          {result === "back" && (
            <span className="font-bold text-rose-400">
              ✗ Not enough energy — the barrier is too high. Add a catalyst!
            </span>
          )}
        </div>
      </SciPanel>

      <div className="mt-4">
        <WhyGate
          question="How does a catalyst speed up a reaction?"
          options={[
            "It lowers the activation energy by offering an easier pathway",
            "It adds extra heat energy to the reactants",
            "It makes the products more stable",
            "It increases the temperature of the room",
          ]}
          answer={0}
          explain="A catalyst provides an alternative route with a lower activation energy, so more particles have enough energy to react — and it is not used up itself."
          onResolved={() => setUnderstood(true)}
        />
      </div>

      <div className="mt-5">
        <CompleteButton
          done={done}
          xp={st.xp}
          disabled={!understood || !triedCatalyst}
          onComplete={() => complete("energy", st.xp)}
          nextHref="/chemistry/lab/electrolysis"
          hint="Try the catalyst slider and answer the question first."
        />
      </div>
    </div>
  );
}
