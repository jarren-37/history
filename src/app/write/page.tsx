"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MISSIONS } from "@/content/missions";
import type { WritingMission } from "@/content/types";
import { getWord } from "@/content/words";
import { useApp } from "@/lib/store";
import { checkTargets, countWords, styleTips } from "@/lib/writing";
import { Confetti, Reveal } from "@/components/ui";
import { AchievementToast } from "@/components/AchievementToast";

export default function WritePage() {
  const { missionsCompleted } = useApp();
  const [active, setActive] = useState<WritingMission | null>(null);

  if (active) {
    return <MissionView mission={active} onBack={() => setActive(null)} />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-6 sm:px-6">
      <AchievementToast />
      <Reveal>
        <div className="mb-1 flex items-center gap-3">
          <span className="text-4xl">🪶</span>
          <h1 className="h-desk font-display text-4xl font-black">
            Writing Quests
          </h1>
        </div>
        <p className="t-desk">
          Weave the treasure-words into your own writing. Master a word by using
          it — and any words you use for the first time will be added to your
          collection.
        </p>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {MISSIONS.map((m, i) => {
          const complete = missionsCompleted.includes(m.id);
          return (
            <Reveal key={m.id} delay={Math.min(i * 0.05, 0.3)}>
              <button
                onClick={() => setActive(m)}
                className="lift group flex h-full w-full flex-col rounded-2xl border-2 border-[var(--border)] bg-[color-mix(in_srgb,var(--parch)_90%,transparent)] p-5 text-left"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-extrabold text-ink">
                    {m.title}
                  </h2>
                  {complete && (
                    <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      ✓ Done
                    </span>
                  )}
                </div>
                <p className="mt-1 flex-1 text-sm text-ink-soft">{m.prompt}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.targetWords.map((id) => (
                    <span
                      key={id}
                      className="rounded-full border border-[var(--border)] bg-[var(--c-surface)] px-2.5 py-0.5 text-xs font-bold text-[var(--c-deep)]"
                    >
                      {getWord(id)?.word ?? id}
                    </span>
                  ))}
                </div>
                <span className="mt-3 text-sm font-bold text-[var(--c-deep)]">
                  {complete ? "Write it again →" : `Begin quest · +${m.xp} XP →`}
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

function MissionView({
  mission,
  onBack,
}: {
  mission: WritingMission;
  onBack: () => void;
}) {
  const { has, completeMission, markWordsUsed, discoverWord, missionsCompleted } =
    useApp();
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { used, missing } = useMemo(
    () => checkTargets(text, mission.targetWords),
    [text, mission.targetWords]
  );
  const words = countWords(text);
  const tips = useMemo(() => styleTips(text), [text]);
  const alreadyDone = missionsCompleted.includes(mission.id);

  const enoughWords = words >= mission.minWords;
  const allUsed = missing.length === 0;
  const canSubmit = enoughWords && allUsed && !submitted;

  function submit() {
    // Using an undiscovered target word in writing reveals it.
    mission.targetWords.forEach((id) => {
      if (used.includes(id) && !has(id)) discoverWord(id);
    });
    markWordsUsed(used);
    completeMission(mission.id, mission.xp);
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <AchievementToast />
      <button
        onClick={onBack}
        className="lnk-desk mb-3 inline-flex items-center gap-1.5 text-sm font-bold"
      >
        ← All quests
      </button>

      <Reveal>
        <div className="page page-frame p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-black text-ink sm:text-3xl">
              {mission.title}
            </h1>
            <span className="rounded-full bg-[var(--c-surface)] px-3 py-1 text-sm font-bold text-[var(--c-deep)]">
              +{mission.xp} XP
            </span>
          </div>
          <p className="mt-2 text-ink">{mission.prompt}</p>

          {/* target words */}
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {mission.targetWords.map((id) => {
              const w = getWord(id);
              if (!w) return null;
              const done = used.includes(id);
              return (
                <div
                  key={id}
                  className={`flex items-start gap-2 rounded-xl border-2 p-3 transition-colors ${
                    done
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-[var(--border)] bg-[var(--parch)]"
                  }`}
                >
                  <span className="text-xl" aria-hidden>
                    {done ? "✅" : w.motif}
                  </span>
                  <div className="min-w-0">
                    <div className="font-display font-extrabold text-ink">
                      {w.word}
                    </div>
                    <div className="text-xs text-ink-soft">{w.meaning}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* writing area */}
      <div className="mt-4">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (submitted) setSubmitted(false);
          }}
          rows={9}
          placeholder="Begin writing here… let the words flow."
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--parch)] p-4 font-serif text-lg leading-relaxed text-ink placeholder:text-ink-faint focus:border-[var(--gold)] focus:outline-none"
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className={enoughWords ? "font-bold text-emerald-400" : "t-desk"}>
            {words} / {mission.minWords} words {enoughWords && "✓"}
          </span>
          <span className="t-desk">
            {used.length}/{mission.targetWords.length} target words used
          </span>
        </div>
      </div>

      {/* style tips */}
      <AnimatePresence>
        {tips.length > 0 && !submitted && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5"
          >
            <div className="text-[11px] font-bold uppercase tracking-widest text-amber-700">
              🖋️ The Keeper suggests
            </div>
            <ul className="mt-1 space-y-1 text-sm text-ink">
              {tips.slice(0, 3).map((t) => (
                <li key={t.weak}>
                  Instead of <strong>“{t.weak}”</strong>, try{" "}
                  {t.suggestions.map((s, i) => (
                    <span key={s}>
                      <em className="text-[var(--c-deep)]">{s}</em>
                      {i < t.suggestions.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  .
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* submit / result */}
      {!submitted ? (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={submit}
            disabled={!canSubmit}
            className="rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-7 py-3 font-display text-lg font-extrabold text-[#2a1a0a] shadow-lg transition-transform enabled:hover:scale-105 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit for review
          </button>
          {!canSubmit && (
            <span className="t-desk text-sm">
              {!enoughWords
                ? `Write at least ${mission.minWords} words…`
                : `Still to use: ${missing
                    .map((id) => getWord(id)?.word)
                    .join(", ")}`}
            </span>
          )}
          {alreadyDone && (
            <span className="text-sm font-semibold text-emerald-400">
              (Already completed — re-writing won't earn XP again.)
            </span>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="page page-frame relative mt-4 overflow-hidden p-6 text-center"
        >
          <Confetti count={28} />
          <div className="relative">
            <div className="text-5xl">🎉</div>
            <h2 className="mt-2 font-display text-2xl font-black text-ink">
              Beautifully written!
            </h2>
            <p className="mt-1 text-ink-soft">
              You used all {mission.targetWords.length} treasure-words with skill.
              {alreadyDone
                ? " (No new XP — you'd already completed this quest.)"
                : ` +${mission.xp} XP earned!`}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                onClick={onBack}
                className="rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-6 py-3 font-display font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105"
              >
                More quests
              </button>
              <Link
                href="/collection"
                className="rounded-full border-2 border-[var(--gold)] px-6 py-3 font-display font-bold text-[var(--c-deep)] transition-transform hover:scale-105"
              >
                View collection
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
