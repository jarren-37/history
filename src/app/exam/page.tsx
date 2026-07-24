"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CHAPTERS } from "@/content/chapters";
import { getPalette } from "@/content/palettes";
import { ExamCard } from "@/components/ExamCard";
import { Reveal } from "@/components/ui";

function ExamContent() {
  const params = useSearchParams();
  const initial = params.get("chapter") ?? "all";
  const [filter, setFilter] = useState(initial);

  const questions = useMemo(() => {
    const chapters =
      filter === "all"
        ? CHAPTERS
        : CHAPTERS.filter((c) => c.slug === filter);
    return chapters.flatMap((c) =>
      c.exam.map((q) => ({ q, chapter: c }))
    );
  }, [filter]);

  const activePalette =
    filter === "all"
      ? getPalette("neutral")
      : getPalette(CHAPTERS.find((c) => c.slug === filter)?.palette ?? "neutral");

  const sbqCount = questions.filter((x) => x.q.format === "SBQ").length;
  const seqCount = questions.filter((x) => x.q.format === "SEQ").length;

  return (
    <div
      className="pb-24"
      style={
        {
          ["--c-primary" as string]: activePalette.primary,
          ["--c-secondary" as string]: activePalette.secondary,
          ["--c-deep" as string]: activePalette.deep,
          ["--c-surface" as string]: activePalette.surface,
        } as React.CSSProperties
      }
    >
      <section className="relative overflow-hidden px-4 pt-10">
        <div className="aurora" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--c-primary)]">
            🎯 Exam mode · 2261
          </span>
          <h1 className="mt-4 font-display text-4xl font-black sm:text-5xl">
            Prove you understand it
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[var(--text-soft)]">
            Real O-Level style questions — SBQ source skills and SEQ essays —
            each with a marking guide and a model answer.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm font-bold">
            <span className="rounded-full bg-[var(--c-surface)] px-4 py-1.5 text-[var(--c-deep)]">
              {sbqCount} SBQ
            </span>
            <span className="rounded-full bg-[var(--c-surface)] px-4 py-1.5 text-[var(--c-deep)]">
              {seqCount} SEQ
            </span>
          </div>
        </div>
      </section>

      {/* Chapter filter */}
      <div className="mx-auto mt-8 max-w-4xl px-4">
        <div className="flex flex-wrap justify-center gap-2">
          <FilterChip
            label="All chapters"
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          {CHAPTERS.map((c) => (
            <FilterChip
              key={c.slug}
              label={`${getPalette(c.palette).motif} ${c.title}`}
              active={filter === c.slug}
              onClick={() => setFilter(c.slug)}
            />
          ))}
        </div>
      </div>

      {/* Questions */}
      <div className="mx-auto mt-8 max-w-3xl space-y-5 px-4">
        {questions.map(({ q, chapter }, i) => (
          <div key={q.id}>
            {filter === "all" && (i === 0 || questions[i - 1].chapter.slug !== chapter.slug) && (
              <Reveal>
                <p className="mb-2 mt-6 font-display text-sm font-black uppercase tracking-wide text-[var(--text-faint)]">
                  {getPalette(chapter.palette).motif} {chapter.title}
                </p>
              </Reveal>
            )}
            <ExamCard q={q} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
        active
          ? "bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] text-white shadow-soft"
          : "border border-[var(--border)] bg-[var(--card)] hover:border-[var(--c-primary)]"
      }`}
    >
      {label}
    </motion.button>
  );
}

export default function ExamPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[50vh] place-items-center text-[var(--text-faint)]">
          Loading exam mode…
        </div>
      }
    >
      <ExamContent />
    </Suspense>
  );
}
