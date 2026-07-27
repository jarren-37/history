"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useApp, todayKey } from "@/lib/english/store";
import { wordOfDay, missionOfDay, DAILY_BONUS_XP } from "@/lib/english/daily";
import { getPalette, paletteVars } from "@/content/english/palettes";
import { WordReveal } from "@/components/english/WordReveal";
import { AchievementToast } from "@/components/english/AchievementToast";
import { Reveal, Confetti } from "@/components/english/ui";

export default function DailyPage() {
  const { hydrated, has, discoverWord, dailyClaimedOn, claimDaily, streak } =
    useApp();
  const today = todayKey();
  const wotd = wordOfDay(today);
  const mission = missionOfDay(today);
  const pal = getPalette(wotd.room);

  const [reveal, setReveal] = useState<{ xp: number } | null>(null);
  const [justClaimed, setJustClaimed] = useState(false);

  const found = has(wotd.id);
  const claimed = dailyClaimedOn === today;

  function uncover() {
    const xp = has(wotd.id) ? 0 : discoverWord(wotd.id);
    setReveal({ xp });
  }

  function claim() {
    if (claimDaily(today, DAILY_BONUS_XP)) setJustClaimed(true);
  }

  const dateLabel = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <AchievementToast />
      <Link
        href="/english"
        className="lnk-desk mb-3 inline-flex items-center gap-1.5 text-sm font-bold"
      >
        ← Great Hall
      </Link>

      <Reveal>
        <div className="flex items-center gap-3">
          <span className="text-4xl">🗓️</span>
          <div>
            <h1 className="h-desk font-display text-4xl font-black">
              Today's Adventure
            </h1>
            <p className="t-desk">
              {dateLabel} · 🔥 {hydrated ? streak.count : "—"} day streak
            </p>
          </div>
        </div>
      </Reveal>

      {/* Word of the Day */}
      <Reveal delay={0.05}>
        <div
          className="mt-5 overflow-hidden rounded-3xl border-2 p-6"
          style={{
            ...paletteVars(wotd.room),
            borderColor: `color-mix(in srgb, ${pal.primary} 45%, transparent)`,
            background: `linear-gradient(160deg, ${pal.surface}, color-mix(in srgb, ${pal.primary} 18%, var(--parch)))`,
          }}
        >
          <div className="text-[11px] font-bold uppercase tracking-widest text-ink-faint">
            Word of the Day
          </div>
          <div className="mt-2 flex items-center gap-4">
            <span
              className="text-5xl"
              style={{ filter: found ? "none" : "grayscale(1) brightness(0.6)" }}
            >
              {found ? wotd.motif : "❔"}
            </span>
            <div className="flex-1">
              <div className="font-display text-3xl font-black text-ink">
                {found ? wotd.word : "A mystery word"}
              </div>
              <div className="font-hand text-xl text-ink-soft">
                {found ? wotd.meaning : "Uncover it to reveal its secrets…"}
              </div>
            </div>
          </div>
          <button
            onClick={uncover}
            className="mt-4 rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-6 py-3 font-display font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            {found ? "Revisit the entry" : "✨ Uncover today's word"}
          </button>
        </div>
      </Reveal>

      {/* Quests grid */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Reveal delay={0.1}>
          <Link
            href="/english/write"
            className="lift block h-full rounded-2xl border-2 border-[var(--border)] bg-[color-mix(in_srgb,var(--parch)_90%,transparent)] p-5"
          >
            <div className="text-3xl">🪶</div>
            <h2 className="mt-2 font-display text-xl font-extrabold text-ink">
              Daily Writing Quest
            </h2>
            <p className="mt-1 text-sm text-ink-soft">“{mission.title}” — {mission.prompt}</p>
            <span className="mt-2 inline-block text-sm font-bold text-[var(--c-deep)]">
              Take up the quill →
            </span>
          </Link>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            href="/english/games/duel"
            className="lift block h-full rounded-2xl border-2 border-[var(--border)] bg-[color-mix(in_srgb,var(--parch)_90%,transparent)] p-5"
          >
            <div className="text-3xl">⚔️</div>
            <h2 className="mt-2 font-display text-xl font-extrabold text-ink">
              Daily Challenge
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Test your speed and memory in a timed Word Duel.
            </p>
            <span className="mt-2 inline-block text-sm font-bold text-[var(--c-deep)]">
              Enter the duel →
            </span>
          </Link>
        </Reveal>
      </div>

      {/* Bonus chest */}
      <Reveal delay={0.2}>
        <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-[var(--gold)] bg-[color-mix(in_srgb,var(--parch)_88%,transparent)] p-6 text-center sm:flex-row sm:text-left">
          <motion.span
            animate={claimed ? {} : { rotate: [0, -8, 8, -8, 0] }}
            transition={{ duration: 1.4, repeat: claimed ? 0 : Infinity, repeatDelay: 1 }}
            className="text-5xl"
          >
            {claimed ? "📖" : "🎁"}
          </motion.span>
          <div className="flex-1">
            <h2 className="font-display text-xl font-extrabold text-ink">
              {claimed ? "Bonus claimed!" : "Daily Treasure Chest"}
            </h2>
            <p className="text-sm text-ink-soft">
              {claimed
                ? "Come back tomorrow for another reward and a fresh adventure."
                : `Claim today's bonus of ${DAILY_BONUS_XP} XP for visiting the Lexicon.`}
            </p>
          </div>
          <div className="relative">
            <button
              onClick={claim}
              disabled={claimed}
              className="rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-6 py-3 font-display font-extrabold text-[#2a1a0a] shadow-lg transition-transform enabled:hover:scale-105 enabled:active:scale-95 disabled:opacity-50"
            >
              {claimed ? "✓ Claimed" : `Claim +${DAILY_BONUS_XP} XP`}
            </button>
            <AnimatePresence>
              {justClaimed && <Confetti count={22} />}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>

      <AnimatePresence>
        {reveal && (
          <WordReveal
            word={wotd}
            xpGained={reveal.xp}
            onClose={() => setReveal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
