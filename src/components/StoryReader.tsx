"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Chapter } from "@/content/types";
import { getPalette, paletteVars } from "@/content/palettes";
import { TUTOR } from "@/content/tutor";
import { useApp } from "@/lib/store";
import { SceneIllustration } from "./scenes/SceneIllustration";
import { DialogueBubble } from "./DialogueBubble";
import { StoryChoiceCard } from "./StoryChoiceCard";
import { MemoryBooster } from "./MemoryBooster";
import { CauseEffect } from "./CauseEffect";
import { ExamMemory } from "./ExamMemory";
import { AITutor } from "./AITutor";
import { HighlightedText, ProgressBar, Pill } from "./ui";

type Step =
  | { kind: "page"; pageIndex: number }
  | { kind: "booster"; boosterIndex: number }
  | { kind: "bigpicture" }
  | { kind: "wrap" };

export function StoryReader({ chapter }: { chapter: Chapter }) {
  const palette = getPalette(chapter.palette);
  const { recordPage, completeChapter, meetCharacter } = useApp();
  const tutor = TUTOR[chapter.slug];

  const steps = useMemo<Step[]>(() => {
    const s: Step[] = [];
    chapter.pages.forEach((_, i) => {
      s.push({ kind: "page", pageIndex: i });
      const bIdx = chapter.boosters.findIndex((b) => b.afterPage === i);
      if (bIdx !== -1) s.push({ kind: "booster", boosterIndex: bIdx });
    });
    s.push({ kind: "bigpicture" });
    s.push({ kind: "wrap" });
    return s;
  }, [chapter]);

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const step = steps[index];

  const go = (d: number) => {
    setDir(d);
    setIndex((i) => Math.max(0, Math.min(steps.length - 1, i + d)));
  };

  // Progress + character bookkeeping.
  useEffect(() => {
    if (step.kind === "page") {
      recordPage(chapter.slug, step.pageIndex, chapter.pages.length);
      chapter.pages[step.pageIndex].dialogues?.forEach((d) => {
        if (d.characterId) meetCharacter(d.characterId);
      });
    }
    if (step.kind === "wrap") completeChapter(chapter.slug);
  }, [index, step, chapter, recordPage, completeChapter, meetCharacter]);

  // Keyboard navigation.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const progress = (index + 1) / steps.length;

  return (
    <div
      style={paletteVars(chapter.palette)}
      className="relative mx-auto max-w-5xl px-4 pb-28 pt-4"
    >
      {/* Chapter header + progress */}
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[var(--border)] text-lg transition-transform hover:scale-105"
          aria-label="Back to library"
        >
          ←
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate font-display text-sm font-bold text-[var(--c-deep)]">
              {palette.motif} {chapter.number} · {chapter.title}
            </p>
            <p className="shrink-0 text-xs font-bold text-[var(--text-faint)]">
              {index + 1}/{steps.length}
            </p>
          </div>
          <ProgressBar value={progress} className="mt-1.5" />
        </div>
      </div>

      {/* Animated step */}
      <div className="relative min-h-[60vh]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {step.kind === "page" && (
              <PageView chapter={chapter} pageIndex={step.pageIndex} />
            )}
            {step.kind === "booster" && (
              <div className="mx-auto max-w-2xl pt-4">
                <MemoryBooster
                  booster={chapter.boosters[step.boosterIndex].booster}
                />
              </div>
            )}
            {step.kind === "bigpicture" && (
              <div className="mx-auto max-w-2xl pt-2">
                <div className="mb-6 text-center">
                  <Pill>🖼️ The big picture</Pill>
                  <h2 className="mt-3 font-display text-3xl font-extrabold">
                    {chapter.bigPicture.title}
                  </h2>
                </div>
                <CauseEffect chain={chapter.bigPicture} />
              </div>
            )}
            {step.kind === "wrap" && tutor && (
              <WrapUp chapter={chapter} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav controls */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          className="rounded-2xl border border-[var(--border)] px-5 py-3 font-bold transition-colors disabled:opacity-30 enabled:hover:bg-[var(--c-surface)]"
        >
          ← Back
        </button>
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Go to step ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-[var(--c-primary)]"
                  : "w-2 bg-[var(--c-secondary)] opacity-50 hover:opacity-100"
              }`}
            />
          ))}
        </div>
        {index < steps.length - 1 ? (
          <button
            onClick={() => go(1)}
            className="rounded-2xl bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-5 py-3 font-bold text-white transition-transform hover:scale-[1.03] active:scale-95"
          >
            Next →
          </button>
        ) : (
          <Link
            href="/"
            className="rounded-2xl bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-5 py-3 font-bold text-white transition-transform hover:scale-[1.03]"
          >
            Finish ✓
          </Link>
        )}
      </div>

      <AITutor chapterSlug={chapter.slug} chapterTitle={chapter.title} />
    </div>
  );
}

/* ── A single storybook page ────────────────────────────────────────────── */
function PageView({
  chapter,
  pageIndex,
}: {
  chapter: Chapter;
  pageIndex: number;
}) {
  const page = chapter.pages[pageIndex];
  return (
    <div className="grid items-center gap-6 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="order-1"
      >
        <SceneIllustration
          scene={page.scene}
          className="aspect-[4/3] shadow-soft-lg"
        />
      </motion.div>

      <div className="order-2 space-y-4">
        {page.kicker && (
          <Pill>
            {getPalette(chapter.palette).motif} {page.kicker}
          </Pill>
        )}
        <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
          {page.title}
        </h1>
        {page.narration.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="text-lg leading-relaxed text-[var(--text-soft)]"
          >
            <HighlightedText text={para} highlights={page.highlights} />
          </motion.p>
        ))}

        {page.dialogues && page.dialogues.length > 0 && (
          <div className="space-y-3 pt-2">
            {page.dialogues.map((d, i) => (
              <DialogueBubble key={i} dialogue={d} index={i} />
            ))}
          </div>
        )}

        {page.choice && (
          <div className="pt-2">
            <StoryChoiceCard choice={page.choice} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── End-of-chapter wrap up ─────────────────────────────────────────────── */
function WrapUp({ chapter }: { chapter: Chapter }) {
  const tutor = TUTOR[chapter.slug];
  return (
    <div className="mx-auto max-w-2xl space-y-6 pt-2">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card overflow-hidden rounded-3xl text-center"
      >
        <div className="bg-gradient-to-br from-[var(--c-primary)] to-[var(--c-deep)] px-6 py-8 text-white">
          <motion.div
            animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1 }}
            className="mx-auto mb-2 text-5xl"
          >
            {getPalette(chapter.palette).motif}
          </motion.div>
          <h2 className="font-display text-2xl font-extrabold">Chapter complete!</h2>
          <p className="mt-1 text-sm opacity-85">
            You've followed the whole story of “{chapter.title}”.
          </p>
        </div>
      </motion.div>

      {tutor && <ExamMemory tutor={tutor} />}

      <Link
        href={`/exam?chapter=${chapter.slug}`}
        className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-6 py-5 text-white transition-transform hover:scale-[1.01]"
      >
        <span>
          <span className="block font-display text-lg font-extrabold">
            Ready to test yourself?
          </span>
          <span className="text-sm opacity-85">
            Switch into O-Level exam mode for this chapter →
          </span>
        </span>
        <span className="text-3xl">🎯</span>
      </Link>
    </div>
  );
}
