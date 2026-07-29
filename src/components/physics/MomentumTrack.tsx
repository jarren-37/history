"use client";

import { useEffect, useRef, useState } from "react";
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

const W = 560;
const CY = 120;

export function MomentumTrack() {
  const { isDone, complete } = useObservatory();
  const st = getStation("momentum")!;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const [mA, setMA] = useState(2);
  const [vA, setVA] = useState(3);
  const [mB, setMB] = useState(3);
  const [vB, setVB] = useState(-1);
  const [mode, setMode] = useState<"inelastic" | "elastic">("inelastic");
  const [ran, setRan] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const done = isDone("momentum");

  const pBefore = mA * vA + mB * vB;

  function accent() {
    return (getComputedStyle(canvasRef.current!).getPropertyValue("--sci-accent") || "#6a97ff").trim();
  }
  function accent2() {
    return (getComputedStyle(canvasRef.current!).getPropertyValue("--sci-accent2") || "#d8b24a").trim();
  }

  function draw(ax: number, bx: number, wA: number, wB: number) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, W, 200);
    // track
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, CY + 26);
    ctx.lineTo(W, CY + 26);
    ctx.stroke();
    const drawCart = (x: number, w: number, color: string, label: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x - w / 2, CY - 18, w, 40, 6);
      ctx.fill();
      ctx.fillStyle = "#0c0c0c";
      ctx.font = "bold 14px serif";
      ctx.textAlign = "center";
      ctx.fillText(label, x, CY + 6);
      // wheels
      ctx.fillStyle = "#0c0c0c";
      ctx.beginPath(); ctx.arc(x - w / 4, CY + 24, 5, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(x + w / 4, CY + 24, 5, 0, 7); ctx.fill();
    };
    drawCart(ax, wA, accent(), `${mA}kg`);
    drawCart(bx, wB, accent2(), `${mB}kg`);
  }

  // idle preview
  useEffect(() => {
    if (ran) return;
    const wA = 26 + mA * 8, wB = 26 + mB * 8;
    draw(150, 410, wA, wB);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mA, mB, ran]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current!), []);

  function run() {
    cancelAnimationFrame(rafRef.current!);
    setRan(true);
    playZap();
    const massA = mA, massB = mB, vAi = vA, vBi = vB;
    const wA = 26 + massA * 8, wB = 26 + massB * 8;
    let ax = 150, bx = 410;
    let va = vAi * 0.7, vb = vBi * 0.7;
    let collided = false;
    let vaf: number, vbf: number;
    if (mode === "inelastic") {
      const vf = (massA * vAi + massB * vBi) / (massA + massB);
      vaf = vf; vbf = vf;
    } else {
      vaf = ((massA - massB) * vAi + 2 * massB * vBi) / (massA + massB);
      vbf = ((massB - massA) * vBi + 2 * massA * vAi) / (massA + massB);
    }
    let frames = 0;
    const step = () => {
      if (!collided && ax + wA / 2 >= bx - wB / 2) {
        collided = true;
        va = vaf * 0.7; vb = vbf * 0.7;
      }
      ax += va;
      if (collided && mode === "inelastic") bx = ax + (wA + wB) / 2;
      else bx += vb;
      draw(ax, bx, wA, wB);
      frames++;
      if (frames < 150 && ax > -60 && ax < W + 60 && bx > -60 && bx < W + 60) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/physics" />
      <StationHeading icon={st.icon} topic={st.topic} title={st.name}>
        Crash two carts together and prove one of physics&apos; deepest laws: the
        total momentum before a collision always equals the total momentum after.
      </StationHeading>

      <SciPanel>
        <canvas ref={canvasRef} width={W} height={200} className="w-full rounded-xl" style={{ background: "linear-gradient(180deg,#0b1024,#0a0e1e)" }} />

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Slider label="Cart A mass" min={1} max={5} value={mA} onChange={(v) => { setMA(v); setRan(false); }} unit=" kg" />
          <Slider label="Cart A velocity (→)" min={0} max={5} value={vA} onChange={(v) => { setVA(v); setRan(false); }} unit=" m/s" />
          <Slider label="Cart B mass" min={1} max={5} value={mB} onChange={(v) => { setMB(v); setRan(false); }} unit=" kg" />
          <Slider label="Cart B velocity" min={-5} max={5} value={vB} onChange={(v) => { setVB(v); setRan(false); }} unit=" m/s" />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <button onClick={() => setMode((m) => (m === "inelastic" ? "elastic" : "inelastic"))}
            className="rounded-full border-2 px-4 py-2 text-sm font-bold" style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>
            {mode === "inelastic" ? "🧲 Inelastic (they stick)" : "🎾 Elastic (they bounce)"}
          </button>
          <button onClick={run} className="rounded-full px-6 py-2.5 font-display font-extrabold shadow transition-transform hover:scale-105" style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>
            💥 Crash!
          </button>
        </div>

        {/* momentum conservation readout */}
        <div className="mt-4 rounded-xl border p-3 text-center font-mono" style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>
          <div className="text-sm opacity-80">
            p = mv &nbsp;·&nbsp; A: {mA}×{vA} = {mA * vA} &nbsp; B: {mB}×{vB} = {mB * vB}
          </div>
          <div className="mt-1 font-display text-lg font-black" style={{ color: "var(--sci-accent)" }}>
            Total before = {pBefore} kg·m/s &nbsp;=&nbsp; Total after = {pBefore} kg·m/s ✓
          </div>
        </div>
      </SciPanel>

      <div className="mt-4">
        <WhyGate
          question="In any collision (with no outside forces), the total momentum…"
          options={[
            "stays exactly the same — it is conserved",
            "always increases",
            "always drops to zero",
            "doubles on impact",
          ]}
          answer={0}
          explain="Momentum is conserved: the total before a collision equals the total after. It can be shared differently between the carts, but the sum never changes."
          onResolved={() => setUnderstood(true)}
        />
      </div>

      <div className="mt-5">
        <CompleteButton
          done={done}
          xp={st.xp}
          disabled={!understood || !ran}
          onComplete={() => complete("momentum", st.xp)}
          nextHref="/physics/masterpiece"
          nextLabel="The Masterpiece →"
          hint="Run a collision and answer the question first."
        />
      </div>
    </div>
  );
}
