"use client";

import { useEffect, useRef, useState } from "react";
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

const W = 560;
const H = 300;
const N = 46;

interface P { x: number; y: number; vx: number; vy: number; }

function stateOf(t: number) {
  if (t < 28) return { label: "Solid", note: "particles vibrate in a fixed lattice" };
  if (t < 66) return { label: "Liquid", note: "particles slip past one another" };
  return { label: "Gas", note: "particles fly freely and fill the space" };
}

function heatColor(t: number) {
  if (t < 33) return "#4a6bd0";
  if (t < 66) return "#e0913f";
  return "#d8453b";
}

export function HeatForge() {
  const { isDone, complete } = useObservatory();
  const st = getStation("thermal")!;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const tempRef = useRef(15);
  const partsRef = useRef<P[]>([]);
  const [temp, setTemp] = useState(15);
  const [understood, setUnderstood] = useState(false);
  const [raised, setRaised] = useState(false);
  const done = isDone("thermal");

  useEffect(() => {
    tempRef.current = temp;
  }, [temp]);

  useEffect(() => {
    // init particles near the bottom
    partsRef.current = Array.from({ length: N }, () => ({
      x: 20 + Math.random() * (W - 40),
      y: H - 20 - Math.random() * 80,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const loop = () => {
      const t = tempRef.current;
      const speed = 0.25 + (t / 100) * 4.2;
      const g = 0.14 * (1 - t / 130); // gravity fades as gas forms
      const col = heatColor(t);
      ctx.clearRect(0, 0, W, H);
      // vessel
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 2;
      ctx.strokeRect(6, 6, W - 12, H - 12);
      // flame glow at the base ∝ temp
      const grad = ctx.createLinearGradient(0, H, 0, H - 90);
      grad.addColorStop(0, `rgba(224,145,63,${0.05 + (t / 100) * 0.28})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(6, H - 96, W - 12, 90);

      for (const p of partsRef.current) {
        // re-scale velocity toward target speed, keep direction
        const mag = Math.hypot(p.vx, p.vy) || 1;
        p.vx = (p.vx / mag) * speed;
        p.vy = (p.vy / mag) * speed + g;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 12) { p.x = 12; p.vx = Math.abs(p.vx); }
        if (p.x > W - 12) { p.x = W - 12; p.vx = -Math.abs(p.vx); }
        if (p.y < 12) { p.y = 12; p.vy = Math.abs(p.vy); }
        if (p.y > H - 12) { p.y = H - 12; p.vy = -Math.abs(p.vy) * 0.9; }
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, 7);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current!);
  }, []);

  const s = stateOf(temp);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/physics" />
      <StationHeading icon={st.icon} topic={st.topic} title={st.name}>
        Temperature is really the <em>average kinetic energy</em> of particles.
        Turn up the heat and watch them wake, race, and break free into new states
        of matter.
      </StationHeading>

      <SciPanel>
        <canvas ref={canvasRef} width={W} height={H} className="w-full rounded-xl" style={{ background: "linear-gradient(180deg,#0b1024,#0a0e1e)" }} />
        <div className="mt-3 flex items-center justify-between">
          <div className="font-display text-xl font-black" style={{ color: heatColor(temp) }}>
            {s.label}
          </div>
          <div className="text-sm opacity-75" style={{ color: "var(--sci-ink)" }}>{s.note}</div>
        </div>
        <div className="mt-3">
          <Slider label="Temperature" min={0} max={100} value={temp} onChange={(v) => { setTemp(v); setRaised(true); }} unit=" °" />
        </div>
      </SciPanel>

      <div className="mt-4">
        <WhyGate
          question="When you heat a substance, what happens to its particles?"
          options={[
            "They gain energy and move (or vibrate) faster",
            "They shrink and get lighter",
            "They stop moving entirely",
            "They turn into a different element",
          ]}
          answer={0}
          explain="Heating transfers energy to the particles, so they move faster. Enough energy overcomes the forces holding them, changing solid → liquid → gas."
          onResolved={() => setUnderstood(true)}
        />
      </div>

      <div className="mt-5">
        <CompleteButton
          done={done}
          xp={st.xp}
          disabled={!understood || !raised}
          onComplete={() => complete("thermal", st.xp)}
          nextHref="/physics/games"
          nextLabel="The Games Room →"
          hint="Change the temperature and answer the question first."
        />
      </div>
    </div>
  );
}
