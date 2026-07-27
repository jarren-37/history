"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { WORDS } from "@/content/english/words";
import { ACHIEVEMENTS } from "@/content/english/missions";
import { useApp } from "@/lib/english/store";
import { Reveal } from "@/components/english/ui";
import { AchievementToast } from "@/components/english/AchievementToast";

export default function ProfilePage() {
  const {
    hydrated,
    level,
    xp,
    streak,
    collection,
    discoveredCount,
    masteredCount,
    missionsCompleted,
    achievementsUnlocked,
    resetProgress,
  } = useApp();
  const [confirmReset, setConfirmReset] = useState(false);

  const favourites = Object.values(collection).filter((p) => p.favourite).length;
  const attempts = Object.values(collection).reduce(
    (s, p) => s + p.quizAttempts,
    0
  );
  const hits = Object.values(collection).reduce((s, p) => s + p.quizCorrect, 0);
  const accuracy = attempts ? Math.round((hits / attempts) * 100) : 0;
  const unlocked = new Set(achievementsUnlocked);

  const r = 34;
  const circ = 2 * Math.PI * r;

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-6 sm:px-6">
      <AchievementToast />
      <Link
        href="/english"
        className="lnk-desk mb-3 inline-flex items-center gap-1.5 text-sm font-bold"
      >
        ← Great Hall
      </Link>

      {/* Scholar summary */}
      <Reveal>
        <div className="page page-frame flex flex-col items-center gap-5 p-6 sm:flex-row sm:p-8">
          <div className="relative h-24 w-24 shrink-0">
            <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
              <circle cx="40" cy="40" r={r} fill="none" stroke="color-mix(in srgb, var(--ink) 12%, transparent)" strokeWidth="7" />
              <motion.circle
                cx="40"
                cy="40"
                r={r}
                fill="none"
                stroke="url(#pgrad)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circ}
                initial={{ strokeDashoffset: circ }}
                animate={{ strokeDashoffset: circ * (1 - (hydrated ? level.progress : 0)) }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
              />
              <defs>
                <linearGradient id="pgrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#e6c15a" />
                  <stop offset="1" stopColor="#b8892b" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 grid place-items-center font-display text-3xl font-black text-ink">
              {hydrated ? level.level : "—"}
            </span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="gradient-text font-display text-3xl font-black">
              {hydrated ? level.title : "Novice Reader"}
            </h1>
            <p className="mt-1 text-ink-soft">
              {xp} XP total · {hydrated ? `${level.into}/${level.span} to Level ${level.level + 1}` : ""}
            </p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--c-surface)] px-3 py-1 text-sm font-bold text-[var(--c-deep)]">
              🔥 {hydrated ? streak.count : "—"} day streak
            </div>
          </div>
        </div>
      </Reveal>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Stat icon="📚" value={`${discoveredCount}/${WORDS.length}`} label="Discovered" />
        <Stat icon="👑" value={`${masteredCount}`} label="Mastered" />
        <Stat icon="🎯" value={`${accuracy}%`} label="Quiz accuracy" />
        <Stat icon="🪶" value={`${missionsCompleted.length}`} label="Quests done" />
        <Stat icon="⭐" value={`${favourites}`} label="Favourites" />
        <Stat icon="🏅" value={`${unlocked.size}/${ACHIEVEMENTS.length}`} label="Achievements" />
      </div>

      {/* Achievements */}
      <Reveal>
        <h2 className="h-desk mt-8 font-display text-2xl font-extrabold">
          Achievements
        </h2>
      </Reveal>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a, i) => {
          const got = unlocked.has(a.id);
          return (
            <Reveal key={a.id} delay={Math.min(i * 0.03, 0.3)}>
              <div
                className={`flex items-center gap-3 rounded-2xl border-2 p-4 transition-colors ${
                  got
                    ? "border-[var(--gold)] bg-[color-mix(in_srgb,var(--gold)_12%,var(--parch))]"
                    : "border-[var(--border)] bg-[color-mix(in_srgb,var(--ink)_4%,var(--parch))]"
                }`}
              >
                <span
                  className="text-3xl"
                  style={{ filter: got ? "none" : "grayscale(1) opacity(0.4)" }}
                >
                  {got ? a.motif : "🔒"}
                </span>
                <div>
                  <div className="font-display font-extrabold text-ink">
                    {a.name}
                  </div>
                  <div className="text-xs text-ink-soft">{a.description}</div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Danger zone */}
      <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--parch)_88%,transparent)] p-5">
        <h3 className="font-display text-lg font-bold text-ink">
          Start afresh
        </h3>
        <p className="mt-1 text-sm text-ink-soft">
          This erases your entire collection, XP, streak and achievements. It
          cannot be undone.
        </p>
        {!confirmReset ? (
          <button
            onClick={() => setConfirmReset(true)}
            className="mt-3 rounded-full border-2 border-[var(--wax)] px-5 py-2 text-sm font-bold text-[var(--wax)] transition-colors hover:bg-[var(--wax)] hover:text-white"
          >
            Reset all progress
          </button>
        ) : (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-[var(--wax)]">
              Are you sure? Everything will be lost.
            </span>
            <button
              onClick={() => {
                resetProgress();
                setConfirmReset(false);
              }}
              className="rounded-full bg-[var(--wax)] px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-105"
            >
              Yes, erase everything
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="rounded-full border border-[var(--border)] px-5 py-2 text-sm font-bold text-ink-soft hover:text-ink"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <div className="page flex flex-col items-center justify-center p-3 text-center">
      <span className="text-2xl">{icon}</span>
      <span className="mt-1 font-display text-xl font-extrabold text-ink">
        {value}
      </span>
      <span className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">
        {label}
      </span>
    </div>
  );
}
