"use client";

import { useEffect, useRef, useState } from "react";
import { useObservatory } from "@/lib/physics/store";
import { getStation } from "@/content/physics/stations";
import { playZap, playChime } from "@/lib/sound";
import {
  SciPanel,
  StationTopBar,
  StationHeading,
  Slider,
  WhyGate,
  CompleteButton,
} from "@/components/science/ui";

const CX = 300;
const CY = 185;
const PR = 24;
const R0 = 115;
const GM = 690;

type Status = "idle" | "flying" | "crash" | "escape" | "stable";

export function Orrery() {
  const { isDone, complete } = useObservatory();
  const st = getStation("gravity")!;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const starsRef = useRef<{ x: number; y: number; r: number }[]>([]);
  const [speed, setSpeed] = useState(2.4);
  const [status, setStatus] = useState<Status>("idle");
  const [everStable, setEverStable] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const done = isDone("gravity");

  if (starsRef.current.length === 0) {
    starsRef.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * 600,
      y: Math.random() * 370,
      r: Math.random() * 1.2 + 0.3,
    }));
  }

  function paint(
    ctx: CanvasRenderingContext2D,
    sat: { x: number; y: number } | null,
    trail: { x: number; y: number }[],
    accent: string
  ) {
    ctx.clearRect(0, 0, 600, 370);
    // stars
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    starsRef.current.forEach((s) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 7);
      ctx.fill();
    });
    // planet glow
    const g = ctx.createRadialGradient(CX, CY, PR * 0.4, CX, CY, PR * 2.4);
    g.addColorStop(0, "rgba(216,178,74,0.5)");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(CX, CY, PR * 2.4, 0, 7);
    ctx.fill();
    // planet
    ctx.fillStyle = "#4a6bd0";
    ctx.beginPath();
    ctx.arc(CX, CY, PR, 0, 7);
    ctx.fill();
    // trail
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    trail.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.stroke();
    // satellite
    if (sat) {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(sat.x, sat.y, 5, 0, 7);
      ctx.fill();
    }
  }

  // Idle preview.
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || status !== "idle") return;
    const accent =
      getComputedStyle(canvasRef.current!).getPropertyValue("--sci-accent") || "#6a97ff";
    paint(ctx, { x: CX + R0, y: CY }, [], accent.trim());
    // draw velocity arrow
    ctx.strokeStyle = accent.trim();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(CX + R0, CY);
    ctx.lineTo(CX + R0, CY - 20 - speed * 8);
    ctx.stroke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, speed]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current!), []);

  function launch() {
    cancelAnimationFrame(rafRef.current!);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const accent = (
      getComputedStyle(canvasRef.current!).getPropertyValue("--sci-accent") || "#6a97ff"
    ).trim();
    setStatus("flying");
    playZap();
    const sat = { x: CX + R0, y: CY, vx: 0, vy: -speed };
    const trail: { x: number; y: number }[] = [];
    let frames = 0;

    const step = () => {
      for (let s = 0; s < 4; s++) {
        const dx = CX - sat.x;
        const dy = CY - sat.y;
        const r = Math.hypot(dx, dy) || 1;
        const a = GM / (r * r);
        sat.vx += (a * dx) / r * 0.5;
        sat.vy += (a * dy) / r * 0.5;
        sat.x += sat.vx * 0.5;
        sat.y += sat.vy * 0.5;
      }
      const r = Math.hypot(CX - sat.x, CY - sat.y);
      trail.push({ x: sat.x, y: sat.y });
      if (trail.length > 240) trail.shift();
      paint(ctx, sat, trail, accent);
      frames++;
      if (r < PR + 6) {
        setStatus("crash");
        playChime(false);
        return;
      }
      if (r > 250) {
        setStatus("escape");
        playChime(false);
        return;
      }
      if (frames > 460) {
        setStatus("stable");
        setEverStable(true);
        playChime(true);
        return;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }

  const msg: Record<Status, string> = {
    idle: "Set a launch speed and fire the satellite sideways.",
    flying: "In flight…",
    crash: "💥 Too slow — gravity pulled it down. Give it more speed!",
    escape: "🚀 Too fast — it broke free and flew off into space. Ease off!",
    stable: "🛰️ A stable orbit! Perfectly balanced between falling and flying.",
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/physics" />
      <StationHeading icon={st.icon} topic={st.topic} title={st.name}>
        A satellite in orbit is really <em>falling</em> — it just moves sideways
        fast enough to keep missing the planet. Find that perfect speed.
      </StationHeading>

      <SciPanel>
        <canvas ref={canvasRef} width={600} height={370} className="w-full rounded-xl" style={{ background: "linear-gradient(180deg,#070a1a,#0d1230)" }} />
        <div className="mt-2 min-h-[24px] text-center text-sm font-semibold" style={{ color: status === "stable" ? "#4bbf7a" : status === "idle" || status === "flying" ? "var(--sci-ink)" : "#f43f5e" }}>
          {msg[status]}
        </div>
        <div className="mt-2 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <Slider label="Launch speed" min={0.6} max={4} step={0.1} value={speed} onChange={setSpeed} format={(v) => v.toFixed(1)} />
          <button onClick={launch} className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105" style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>
            🛰️ Launch satellite
          </button>
        </div>
      </SciPanel>

      <div className="mt-4">
        <WhyGate
          question="Why does a satellite stay in orbit instead of falling straight down?"
          options={[
            "It moves sideways fast enough that it keeps 'falling past' the planet",
            "There is no gravity that high up",
            "Its engines fire constantly to hold it up",
            "It is too light for gravity to affect",
          ]}
          answer={0}
          explain="Gravity is always pulling it down, but its sideways speed means that as it falls, the ground curves away beneath it — so it falls forever in a circle."
          onResolved={() => setUnderstood(true)}
        />
      </div>

      <div className="mt-5">
        <CompleteButton
          done={done}
          xp={st.xp}
          disabled={!understood || !everStable}
          onComplete={() => complete("gravity", st.xp)}
          nextHref="/physics/lab/magnetism"
          hint="Achieve a stable orbit and answer the question first."
        />
      </div>
    </div>
  );
}
