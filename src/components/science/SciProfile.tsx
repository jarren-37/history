"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SubjectState } from "@/lib/science/subjectStore";
import { SCI_ACHIEVEMENTS, sciUnlocked } from "@/content/science/achievements";
import { SciPanel, StationTopBar } from "@/components/science/ui";

interface StationLite { id: string; name: string; icon: string; }

/**
 * A reusable "scholar profile" for a science subject: rank ring, stats, a
 * station checklist, an achievements trophy case and a reset. Store-agnostic —
 * the subject passes its own state, stations, masterpiece and rank title.
 */
export function SciProfile({
  state,
  rankTitle,
  stations,
  masterpieceId,
  homeHref,
  homeLabel,
}: {
  state: SubjectState;
  rankTitle: string;
  stations: StationLite[];
  masterpieceId: string;
  homeHref: string;
  homeLabel: string;
}) {
  const { hydrated, level, xp, streak, completed, resetProgress } = state;
  const [confirm, setConfirm] = useState(false);

  const stationsDone = stations.filter((s) => completed.includes(s.id)).length;
  const masterpieceDone = completed.includes(masterpieceId);
  const unlocked = sciUnlocked({
    stationsDone,
    stationsTotal: stations.length,
    masterpieceDone,
    level: level.level,
    streak: streak.count,
  });

  const r = 34;
  const circ = 2 * Math.PI * r;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref={homeHref} backLabel={homeLabel} />

      {/* rank */}
      <SciPanel className="flex flex-col items-center gap-5 sm:flex-row">
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
            <circle cx="40" cy="40" r={r} fill="none" stroke="var(--sci-border)" strokeWidth="7" />
            <motion.circle cx="40" cy="40" r={r} fill="none" stroke="var(--sci-accent)" strokeWidth="7" strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: circ * (1 - (hydrated ? level.progress : 0)) }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }} />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>
            {hydrated ? level.level : "—"}
          </span>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="font-display text-3xl font-black" style={{ color: "var(--sci-accent)" }}>{rankTitle}</h1>
          <p className="mt-1 opacity-80" style={{ color: "var(--sci-ink)" }}>
            {xp} XP · {hydrated ? `${level.into}/${level.span} to Level ${level.level + 1}` : ""}
          </p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-bold" style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>
            🔥 {hydrated ? streak.count : "—"} day streak
          </div>
        </div>
      </SciPanel>

      {/* stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Stat icon="🔬" value={`${stationsDone}/${stations.length}`} label="Stations" />
        <Stat icon="🏆" value={masterpieceDone ? "✓" : "—"} label="Masterpiece" />
        <Stat icon="🎖️" value={`${unlocked.size}/${SCI_ACHIEVEMENTS.length}`} label="Achievements" />
      </div>

      {/* station checklist */}
      <h2 className="mt-6 mb-2 font-display text-xl font-extrabold" style={{ color: "var(--sci-ink)" }}>Stations</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {stations.map((s) => {
          const dn = completed.includes(s.id);
          return (
            <div key={s.id} className="flex items-center gap-2 rounded-xl border p-3" style={{ borderColor: dn ? "#10b981" : "var(--sci-border)", color: "var(--sci-ink)", background: dn ? "rgba(16,185,129,0.08)" : "transparent" }}>
              <span className="text-2xl">{s.icon}</span>
              <span className="flex-1 font-semibold">{s.name}</span>
              <span>{dn ? "✓" : "○"}</span>
            </div>
          );
        })}
      </div>

      {/* achievements */}
      <h2 className="mt-6 mb-2 font-display text-xl font-extrabold" style={{ color: "var(--sci-ink)" }}>Achievements</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SCI_ACHIEVEMENTS.map((a) => {
          const got = unlocked.has(a.id);
          return (
            <div key={a.id} className="flex items-center gap-3 rounded-2xl border-2 p-4" style={{ borderColor: got ? "var(--sci-accent)" : "var(--sci-border)", color: "var(--sci-ink)", background: got ? "color-mix(in srgb, var(--sci-accent) 10%, transparent)" : "transparent" }}>
              <span className="text-3xl" style={{ filter: got ? "none" : "grayscale(1) opacity(0.4)" }}>{got ? a.motif : "🔒"}</span>
              <div>
                <div className="font-display font-extrabold">{a.name}</div>
                <div className="text-xs opacity-75">{a.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* reset */}
      <div className="mt-8 rounded-2xl border p-5" style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>
        <h3 className="font-display text-lg font-bold">Start afresh</h3>
        <p className="mt-1 text-sm opacity-75">This erases your progress in this subject only. It cannot be undone.</p>
        {!confirm ? (
          <button onClick={() => setConfirm(true)} className="mt-3 rounded-full border-2 px-5 py-2 text-sm font-bold" style={{ borderColor: "#f43f5e", color: "#f87d92" }}>
            Reset this subject
          </button>
        ) : (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold" style={{ color: "#f87d92" }}>Are you sure?</span>
            <button onClick={() => { resetProgress(); setConfirm(false); }} className="rounded-full px-5 py-2 text-sm font-bold text-white" style={{ background: "#e0455b" }}>Yes, erase it</button>
            <button onClick={() => setConfirm(false)} className="rounded-full border px-5 py-2 text-sm font-bold" style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border p-3 text-center" style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)", background: "var(--sci-panel)" }}>
      <span className="text-2xl">{icon}</span>
      <span className="mt-1 font-display text-lg font-extrabold">{value}</span>
      <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">{label}</span>
    </div>
  );
}
