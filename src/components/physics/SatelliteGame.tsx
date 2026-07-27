"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useObservatory } from "@/lib/physics/store";
import { playZap, playChime } from "@/lib/sound";
import { SciPanel, StationTopBar, SciConfetti } from "@/components/science/ui";

const CX = 300;
const CY = 185;
const PR = 22;
const GM = 690;

type Phase = "idle" | "flying" | "over";

export function SatelliteGame() {
  const { addXp } = useObservatory();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const starsRef = useRef<{ x: number; y: number; r: number }[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [speed, setSpeed] = useState(2.4);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [round, setRound] = useState(1);
  const [r0, setR0] = useState(115);
  const [msg, setMsg] = useState("Find the speed for a stable orbit.");
  const awardedRef = useRef(false);

  if (starsRef.current.length === 0) {
    starsRef.current = Array.from({ length: 60 }, () => ({ x: Math.random() * 600, y: Math.random() * 370, r: Math.random() * 1.2 + 0.3 }));
  }

  function accent() {
    return (getComputedStyle(canvasRef.current!).getPropertyValue("--sci-accent") || "#6a97ff").trim();
  }

  function paint(ctx: CanvasRenderingContext2D, sat: { x: number; y: number } | null, trail: { x: number; y: number }[], startR: number) {
    ctx.clearRect(0, 0, 600, 370);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    starsRef.current.forEach((s) => { ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill(); });
    const g = ctx.createRadialGradient(CX, CY, PR * 0.4, CX, CY, PR * 2.4);
    g.addColorStop(0, "rgba(216,178,74,0.5)"); g.addColorStop(1, "transparent");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(CX, CY, PR * 2.4, 0, 7); ctx.fill();
    ctx.fillStyle = "#4a6bd0"; ctx.beginPath(); ctx.arc(CX, CY, PR, 0, 7); ctx.fill();
    const ac = accent();
    ctx.strokeStyle = ac; ctx.lineWidth = 2; ctx.beginPath();
    trail.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.stroke();
    if (sat) { ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(sat.x, sat.y, 5, 0, 7); ctx.fill(); }
    else {
      // preview marker + velocity arrow
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(CX + startR, CY, 5, 0, 7); ctx.fill();
      ctx.strokeStyle = ac; ctx.lineWidth = 2; ctx.beginPath();
      ctx.moveTo(CX + startR, CY); ctx.lineTo(CX + startR, CY - 20 - speed * 8); ctx.stroke();
    }
  }

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && phase === "idle") paint(ctx, null, [], r0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, speed, r0]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current!), []);

  function nextRound(newScore: number) {
    const nr = round + 1;
    setRound(nr);
    setScore(newScore);
    setR0(85 + Math.floor(Math.random() * 70)); // 85..155 → shifting target speed
    setPhase("idle");
    setMsg(`Orbit ${newScore} locked! New altitude — adjust your speed.`);
  }

  function loseLife() {
    const nl = lives - 1;
    setLives(nl);
    if (nl <= 0) {
      setPhase("over");
      if (!awardedRef.current) { awardedRef.current = true; addXp(score * 20); }
    } else {
      setPhase("idle");
    }
  }

  function launch() {
    cancelAnimationFrame(rafRef.current!);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    setPhase("flying");
    setMsg("In flight…");
    playZap();
    const sat = { x: CX + r0, y: CY, vx: 0, vy: -speed };
    const trail: { x: number; y: number }[] = [];
    let frames = 0;
    const step = () => {
      for (let s = 0; s < 4; s++) {
        const dx = CX - sat.x, dy = CY - sat.y, r = Math.hypot(dx, dy) || 1, a = GM / (r * r);
        sat.vx += (a * dx) / r * 0.5; sat.vy += (a * dy) / r * 0.5;
        sat.x += sat.vx * 0.5; sat.y += sat.vy * 0.5;
      }
      const r = Math.hypot(CX - sat.x, CY - sat.y);
      trail.push({ x: sat.x, y: sat.y }); if (trail.length > 240) trail.shift();
      paint(ctx, sat, trail, r0);
      frames++;
      if (r < PR + 6) { setMsg("💥 Crashed — too slow!"); playChime(false); loseLife(); return; }
      if (r > 250) { setMsg("🚀 Lost to deep space — too fast!"); playChime(false); loseLife(); return; }
      if (frames > 430) { setMsg("🛰️ Stable orbit!"); playChime(true); nextRound(score + 1); return; }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }

  function restart() {
    awardedRef.current = false;
    setScore(0); setLives(3); setRound(1); setR0(115); setPhase("idle");
    setMsg("Find the speed for a stable orbit.");
  }

  if (phase === "over") {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
        <StationTopBar backHref="/physics/games" backLabel="Games room" />
        <SciPanel className="relative overflow-hidden text-center">
          {score > 0 && <SciConfetti count={26} />}
          <div className="relative">
            <div className="text-5xl">🛰️</div>
            <h2 className="mt-2 font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>
              {score} satellite{score === 1 ? "" : "s"} in orbit
            </h2>
            <p className="mt-2 opacity-85" style={{ color: "var(--sci-ink)" }}>
              {score >= 5 ? "Master of the cosmos!" : score >= 2 ? "A fine flight controller." : "Every launch teaches the dance of gravity."} +{score * 20} XP.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button onClick={restart} className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105" style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>Play again</button>
              <Link href="/physics/games" className="rounded-full border-2 px-6 py-3 font-display font-bold" style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>Games room</Link>
            </div>
          </div>
        </SciPanel>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/physics/games" backLabel="Games room" />
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🛰️</span>
          <div>
            <h1 className="font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>Satellite Command</h1>
            <p className="opacity-80" style={{ color: "var(--sci-ink)" }}>Round {round}</p>
          </div>
        </div>
        <div className="text-right" style={{ color: "var(--sci-ink)" }}>
          <div className="font-display text-lg font-extrabold" style={{ color: "var(--sci-accent)" }}>Score {score}</div>
          <div>{"🛰️".repeat(lives)}{"·".repeat(3 - lives)}</div>
        </div>
      </div>

      <SciPanel>
        <canvas ref={canvasRef} width={600} height={370} className="w-full rounded-xl" style={{ background: "linear-gradient(180deg,#070a1a,#0d1230)" }} />
        <div className="mt-2 min-h-[24px] text-center text-sm font-semibold" style={{ color: msg.includes("Stable") || msg.includes("locked") ? "#4bbf7a" : msg.includes("Crash") || msg.includes("deep space") ? "#f43f5e" : "var(--sci-ink)" }}>
          {msg}
        </div>
        <div className="mt-2 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <label className="block">
            <div className="mb-1 flex justify-between text-sm font-semibold" style={{ color: "var(--sci-ink)" }}>
              <span>Launch speed</span><span style={{ color: "var(--sci-accent)" }}>{speed.toFixed(1)}</span>
            </div>
            <input type="range" min={0.6} max={4} step={0.1} value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} disabled={phase === "flying"} className="sci-range w-full" />
          </label>
          <button onClick={launch} disabled={phase === "flying"}
            className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform enabled:hover:scale-105 disabled:opacity-50"
            style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>
            🛰️ Launch
          </button>
        </div>
      </SciPanel>
    </div>
  );
}
