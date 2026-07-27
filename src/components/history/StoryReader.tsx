"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Chapter } from "@/content/history/types";
import { getPalette, paletteVars } from "@/content/history/palettes";
import { TUTOR } from "@/content/history/tutor";
import { useApp } from "@/lib/history/store";
import { playPageTurn } from "@/lib/sound";
import { SceneIllustration } from "./scenes/SceneIllustration";
import { DialogueBubble } from "./DialogueBubble";
import { StoryChoiceCard } from "./StoryChoiceCard";
import { MemoryBooster } from "./MemoryBooster";
import { CauseEffect } from "./CauseEffect";
import { ExamMemory } from "./ExamMemory";
import { AITutor } from "./AITutor";
import { GlossaryProvider } from "./Glossary";
import { HighlightedText, ProgressBar, Confetti, QuillTitle } from "./ui";
import {
  DustMotes,
  CornerFlourish,
  InkDivider,
  WaxSeal,
} from "./Ornaments";

type Step =
  | { kind: "page"; pageIndex: number }
  | { kind: "booster"; boosterIndex: number }
  | { kind: "bigpicture" }
  | { kind: "wrap" };

export function StoryReader({ chapter }: { chapter: Chapter }) {
  const palette = getPalette(chapter.palette);
  const {
    recordPage,
    completeChapter,
    meetCharacter,
    soundOn,
    progress,
    hydrated,
  } = useApp();
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

  // Resume where the student left off: once saved progress has loaded, jump to
  // the last-read page (only on first load, and only if the chapter isn't done).
  const resumedRef = useRef(false);
  useEffect(() => {
    if (!hydrated || resumedRef.current) return;
    resumedRef.current = true;
    const prog = progress[chapter.slug];
    if (prog && !prog.completed && prog.page > 0) {
      const target = steps.findIndex(
        (s) => s.kind === "page" && s.pageIndex === prog.page
      );
      if (target > 0) {
        setDir(1);
        setIndex(target);
      }
    }
  }, [hydrated, progress, chapter.slug, steps]);

  const go = (d: number) => {
    setDir(d);
    setIndex((i) => {
      const next = Math.max(0, Math.min(steps.length - 1, i + d));
      if (next !== i && soundOn) playPageTurn();
      return next;
    });
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

  const readFraction = (index + 1) / steps.length;

  return (
    <GlossaryProvider>
    <div
      style={paletteVars(chapter.palette)}
      className="relative mx-auto max-w-5xl px-3 pb-28 pt-4 sm:px-4"
    >
      <DustMotes count={10} />

      {/* Running header */}
      <div className="relative z-10 mb-3 flex items-center gap-3">
        <Link
          href="/history"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--parch-edge)] bg-[var(--parch-2)] text-lg text-[var(--ink-soft)] transition-transform hover:scale-105"
          aria-label="Close the book"
        >
          ❮
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate font-display text-sm font-bold text-[var(--ink-soft)]">
              {palette.motif} Chapter {chapter.number} · {chapter.title}
            </p>
            <p className="shrink-0 font-hand text-base text-[var(--ink-faint)]">
              folio {index + 1} of {steps.length}
            </p>
          </div>
          <ProgressBar value={readFraction} className="mt-1.5" />
        </div>
      </div>

      {/* The open parchment page — turns like paper */}
      <div className="relative z-10" style={{ perspective: "2200px" }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60, rotateY: dir * 14 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: dir * -60, rotateY: dir * -14 }}
            transition={{ duration: 0.5, ease: [0.33, 0, 0.2, 1] }}
            style={{ transformStyle: "preserve-3d", transformOrigin: dir >= 0 ? "left center" : "right center" }}
            className="page page-frame relative min-h-[62vh] overflow-hidden rounded-[18px] px-5 py-8 sm:px-10 sm:py-10"
          >
            <CornerFlourish className="absolute left-2.5 top-2.5 h-9 w-9" />
            <CornerFlourish className="absolute right-2.5 top-2.5 h-9 w-9 -scale-x-100" />
            <CornerFlourish className="absolute bottom-2.5 left-2.5 h-9 w-9 -scale-y-100" />
            <CornerFlourish className="absolute bottom-2.5 right-2.5 h-9 w-9 -scale-100" />

            {step.kind === "page" && (
              <PageView chapter={chapter} pageIndex={step.pageIndex} />
            )}
            {step.kind === "booster" && (
              <div className="relative z-10 mx-auto max-w-2xl">
                <MemoryBooster
                  booster={chapter.boosters[step.boosterIndex].booster}
                />
              </div>
            )}
            {step.kind === "bigpicture" && (
              <div className="relative z-10 mx-auto max-w-2xl">
                <div className="mb-6 text-center">
                  <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-[var(--gold)]">
                    ✦ The Whole Story ✦
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-black text-[var(--ink)]">
                    {chapter.bigPicture.title}
                  </h2>
                  <InkDivider className="mx-auto mt-3 h-4 w-48" />
                </div>
                <CauseEffect chain={chapter.bigPicture} />
              </div>
            )}
            {step.kind === "wrap" && tutor && <WrapUp chapter={chapter} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Page-turn controls */}
      <div className="relative z-10 mt-6 flex items-center justify-between gap-3">
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          className="rounded-xl border border-[var(--parch-edge)] bg-[var(--parch-2)] px-5 py-3 font-display font-bold text-[var(--ink-soft)] transition-transform disabled:opacity-30 enabled:hover:-translate-y-0.5"
        >
          ❮ turn back
        </button>
        {/* Progress dots — small marks with generous tap targets for touch */}
        <div className="flex max-w-[45vw] flex-wrap items-center justify-center gap-0.5 sm:max-w-none">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Go to folio ${i + 1}`}
              aria-current={i === index}
              className="grid h-7 w-5 place-items-center"
            >
              <span
                className={`block transition-all ${
                  i === index
                    ? "h-2.5 w-2.5 rotate-45 bg-[var(--wax)]"
                    : "h-1.5 w-1.5 rounded-full bg-[var(--parch-edge)] hover:bg-[var(--ink-faint)]"
                }`}
              />
            </button>
          ))}
        </div>
        {index < steps.length - 1 ? (
          <button
            onClick={() => go(1)}
            className="rounded-xl px-5 py-3 font-display font-bold text-[#f6e6c4] transition-transform hover:-translate-y-0.5 active:scale-95"
            style={{ background: "linear-gradient(180deg,#a5433a,#6f2620)", boxShadow: "inset 0 1px 0 rgba(255,220,180,0.3), 0 4px 12px rgba(0,0,0,0.35)" }}
          >
            turn the page ❯
          </button>
        ) : (
          <Link
            href="/history"
            className="rounded-xl px-5 py-3 font-display font-bold text-[#2a1a0a] transition-transform hover:-translate-y-0.5"
            style={{ background: "linear-gradient(180deg,#e6c15a,#b8892b)", boxShadow: "inset 0 1px 0 rgba(255,240,190,0.6)" }}
          >
            close the book ✦
          </Link>
        )}
      </div>

      <AITutor chapterSlug={chapter.slug} chapterTitle={chapter.title} />
    </div>
    </GlossaryProvider>
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
  const motif = getPalette(chapter.palette).motif;
  return (
    <div className="relative z-10 grid items-center gap-7 lg:grid-cols-2">
      {/* Pop-up plate: the illustration pasted into the page like a print */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -1.2 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="order-1"
      >
        <div className="relative rounded-[14px] bg-[var(--parch)] p-2.5 shadow-[0_14px_36px_-16px_rgba(0,0,0,0.6)] ring-1 ring-[var(--parch-edge)]">
          {/* washi-tape corners */}
          <span className="absolute -left-2 -top-2 h-6 w-12 -rotate-12 rounded-sm bg-[rgba(184,137,43,0.35)]" />
          <span className="absolute -right-2 -top-2 h-6 w-12 rotate-12 rounded-sm bg-[rgba(184,137,43,0.35)]" />
          <SceneIllustration scene={page.scene} className="aspect-[4/3]" />
          {page.kicker && (
            <p className="mt-2 text-center font-hand text-lg text-[var(--ink-faint)]">
              {motif} {page.kicker}
            </p>
          )}
        </div>
      </motion.div>

      <div className="order-2">
        {/* Quill-written title */}
        <QuillTitle
          text={page.title}
          className="font-display text-3xl font-black leading-tight text-[var(--ink)] sm:text-4xl"
        />
        <InkDivider className="mt-3 h-4 w-40" />

        {page.narration.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 + i * 0.25, duration: 0.7 }}
            className={`mt-4 text-[1.12rem] leading-relaxed text-[var(--ink-soft)] ${
              i === 0 ? "dropcap" : ""
            }`}
          >
            <HighlightedText text={para} highlights={page.highlights} />
          </motion.p>
        ))}

        {page.dialogues && page.dialogues.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-5 space-y-3"
          >
            {page.dialogues.map((d, i) => (
              <DialogueBubble key={i} dialogue={d} index={i} />
            ))}
          </motion.div>
        )}

        {page.choice && (
          <div className="pt-4">
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
    <div className="relative z-10 mx-auto max-w-2xl space-y-6">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative overflow-visible text-center"
      >
        <Confetti />
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
          >
            <WaxSeal size={92} label="✦" />
          </motion.div>
          <p className="mt-4 font-display text-xs font-bold uppercase tracking-[0.3em] text-[var(--gold)]">
            The Chapter is Sealed
          </p>
          <h2 className="mt-1 font-display text-3xl font-black text-[var(--ink)]">
            {chapter.title}
          </h2>
          <p className="mt-2 font-serif italic text-[var(--ink-soft)]">
            You have read the whole story. Let it settle in your memory.
          </p>
        </div>
      </motion.div>

      {tutor && <ExamMemory tutor={tutor} />}

      <Link
        href={`/exam?chapter=${chapter.slug}`}
        className="lift flex items-center justify-between rounded-2xl border border-[var(--parch-edge)] bg-[var(--parch-2)] px-6 py-5"
      >
        <span>
          <span className="block font-display text-lg font-black text-[var(--ink)]">
            Test your knowledge
          </span>
          <span className="font-serif italic text-[var(--ink-soft)]">
            Sit the O-Level examination for this chapter →
          </span>
        </span>
        <span className="text-3xl">🪶</span>
      </Link>
    </div>
  );
}
