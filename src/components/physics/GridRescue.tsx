"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useObservatory } from "@/lib/physics/store";
import { playZap, playChime } from "@/lib/sound";
import { SciPanel, StationTopBar, SciConfetti } from "@/components/science/ui";

interface Sw { id: number; type: "main" | "house" | "short"; label: string; closed: boolean; }

const ROUNDS = [
  { houses: 2, shorts: 1, main: false },
  { houses: 3, shorts: 1, main: true },
  { houses: 3, shorts: 2, main: true },
];

function build(r: number): Sw[] {
  const cfg = ROUNDS[r];
  const list: Sw[] = [];
  let id = 0;
  if (cfg.main) list.push({ id: id++, type: "main", label: "Main breaker", closed: false });
  for (let i = 0; i < cfg.houses; i++) list.push({ id: id++, type: "house", label: `House ${i + 1}`, closed: false });
  for (let i = 0; i < cfg.shorts; i++) list.push({ id: id++, type: "short", label: "Faulty line", closed: false });
  // Deterministic per-round shuffle (seeded) so the faulty line isn't always
  // last — and so server and client render the same order (no hydration drift).
  let s = (r + 1) * 9301 + 49297;
  for (let i = list.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

export function GridRescue() {
  const { addXp } = useObservatory();
  const [round, setRound] = useState(0);
  const [sw, setSw] = useState<Sw[]>(() => build(0));
  const [blown, setBlown] = useState(false);
  const [won, setWon] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => { setSw(build(round)); setBlown(false); setWon(false); }, [round]);

  const cfg = ROUNDS[round];
  const anyShort = sw.some((s) => s.type === "short" && s.closed);
  const mainOk = !cfg.main || sw.find((s) => s.type === "main")?.closed;
  const housesLit = mainOk && !anyShort && !blown;

  function toggle(id: number) {
    if (blown || won) return;
    const target = sw.find((s) => s.id === id)!;
    const next = sw.map((s) => (s.id === id ? { ...s, closed: !s.closed } : s));
    setSw(next);
    if (target.type === "short" && !target.closed) {
      // just closed a faulty line → blow the fuse
      setBlown(true);
      playChime(false);
      setTimeout(() => setSw(build(round)), 1400);
      return;
    }
    playZap();
    // check win
    const short = next.some((s) => s.type === "short" && s.closed);
    const main = !cfg.main || next.find((s) => s.type === "main")?.closed;
    const allHouses = next.filter((s) => s.type === "house").every((s) => s.closed);
    if (!short && main && allHouses) {
      setWon(true);
      playChime(true);
      setScore((sc) => sc + 1);
      setTimeout(() => {
        if (round + 1 >= ROUNDS.length) { setFinished(true); addXp((score + 1) * 25); }
        else setRound((r) => r + 1);
      }, 1500);
    }
  }

  function restart() { setScore(0); setFinished(false); setRound(0); setSw(build(0)); }

  if (finished) {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
        <StationTopBar backHref="/physics/games" backLabel="Games room" />
        <SciPanel className="relative overflow-hidden text-center">
          <SciConfetti count={28} />
          <div className="relative">
            <div className="text-5xl">🏙️</div>
            <h2 className="mt-2 font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>The city is lit!</h2>
            <p className="mt-2 opacity-85" style={{ color: "var(--sci-ink)" }}>Every grid restored across {ROUNDS.length} districts. +{score * 25} XP.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button onClick={restart} className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105" style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}>Play again</button>
              <Link href="/physics/games" className="rounded-full border-2 px-6 py-3 font-display font-bold" style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>Games room</Link>
            </div>
          </div>
        </SciPanel>
      </div>
    );
  }

  const houses = sw.filter((s) => s.type === "house");

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/physics/games" backLabel="Games room" />
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🏙️</span>
          <div>
            <h1 className="font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>Grid Rescue</h1>
            <p className="opacity-80" style={{ color: "var(--sci-ink)" }}>District {round + 1} of {ROUNDS.length}</p>
          </div>
        </div>
        <div className="font-display text-lg font-extrabold" style={{ color: "var(--sci-accent)" }}>Score {score}</div>
      </div>

      <SciPanel>
        <p className="mb-3 text-sm opacity-80" style={{ color: "var(--sci-ink)" }}>
          Close every <strong>house</strong> switch{cfg.main ? " and the main breaker" : ""} to light the district — but never close a <strong>faulty line</strong>, or you&apos;ll blow the fuse.
        </p>

        {/* town */}
        <div className="mb-4 flex flex-wrap justify-center gap-4">
          {houses.map((h) => {
            const lit = h.closed && housesLit;
            return (
              <div key={h.id} className="flex flex-col items-center">
                <div className="text-4xl" style={{ filter: lit ? "none" : "grayscale(1) brightness(0.5)" }}>🏠</div>
                <div className="text-lg">{lit ? "💡" : "🌑"}</div>
              </div>
            );
          })}
        </div>

        {/* fuse */}
        <div className="mb-3 text-center text-sm font-bold" style={{ color: blown ? "#f43f5e" : won ? "#4bbf7a" : "var(--sci-ink)" }}>
          {blown ? "💥 Fuse blown — resetting the district…" : won ? "⚡ District powered!" : `Fuse: intact`}
        </div>

        {/* switches */}
        <div className="flex flex-wrap justify-center gap-2">
          {sw.map((s) => (
            <motion.button
              key={s.id}
              onClick={() => toggle(s.id)}
              disabled={blown || won}
              animate={blown && s.type === "short" && s.closed ? { x: [0, -6, 6, 0] } : {}}
              className="rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-colors"
              style={{
                borderColor: s.closed ? (s.type === "short" ? "#f43f5e" : "var(--sci-accent)") : "var(--sci-border)",
                background: s.closed ? (s.type === "short" ? "rgba(244,63,94,0.15)" : "color-mix(in srgb, var(--sci-accent) 18%, transparent)") : "transparent",
                color: "var(--sci-ink)",
              }}
            >
              {s.type === "short" ? "⚠ " : s.type === "main" ? "🔌 " : "🏠 "}
              {s.label} · {s.closed ? "ON" : "off"}
            </motion.button>
          ))}
        </div>
      </SciPanel>
    </div>
  );
}
