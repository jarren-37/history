"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CHAPTERS } from "@/content/chapters";
import { useApp } from "@/lib/store";
import { ChapterCard } from "@/components/ChapterCard";
import { Reveal } from "@/components/ui";
import { SceneIllustration } from "@/components/scenes/SceneIllustration";

const MODES = [
  { href: "/timeline", label: "Timeline", desc: "The whole story, in order", icon: "🕰️" },
  { href: "/characters", label: "Characters", desc: "Meet the people of history", icon: "🎭" },
  { href: "/map", label: "Map Mode", desc: "Watch the world change", icon: "🗺️" },
  { href: "/exam", label: "Exam Mode", desc: "Practise O-Level questions", icon: "🎯" },
];

export default function Home() {
  const { progress, hydrated } = useApp();

  const completed = Object.values(progress).filter((p) => p.completed).length;
  const overall = hydrated
    ? Math.round((completed / CHAPTERS.length) * 100)
    : 0;
  const inProgress = CHAPTERS.find(
    (c) => progress[c.slug] && !progress[c.slug].completed
  );

  const ww2 = CHAPTERS.filter((c) => c.section === "World War Two");
  const cold = CHAPTERS.filter((c) => c.section === "The Cold War");

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-8 sm:pt-12">
        <div className="aurora" />
        <div className="relative mx-auto max-w-5xl">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--c-primary)] shadow-soft"
              >
                📖 Singapore O-Level Combined History · 2261
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mt-5 font-display text-5xl font-black leading-[1.05] sm:text-6xl"
              >
                History isn't dates.
                <br />
                <span className="gradient-text">It's one big story.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="mt-5 max-w-lg text-lg text-[var(--text-soft)]"
              >
                An animated storybook that turns the whole syllabus into an
                illustrated novel — where every event flows into the next, and
                understanding leads to remembering.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <Link
                  href={
                    inProgress
                      ? `/chapters/${inProgress.slug}`
                      : `/chapters/${CHAPTERS[0].slug}`
                  }
                  className="rounded-2xl bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-6 py-3.5 font-display font-bold text-white shadow-soft transition-transform hover:scale-[1.03] active:scale-95"
                >
                  {inProgress ? "Continue reading →" : "Begin the story →"}
                </Link>
                <Link
                  href="/timeline"
                  className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-3.5 font-display font-bold transition-colors hover:bg-[var(--c-surface)]"
                >
                  Explore the timeline
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
              className="hidden lg:block"
            >
              <div className="animate-float">
                <SceneIllustration
                  scene="world-map"
                  className="aspect-square shadow-soft-lg"
                />
              </div>
            </motion.div>
          </div>

          {/* Progress strip */}
          {hydrated && (
            <Reveal className="mt-10">
              <div className="card flex flex-wrap items-center gap-4 rounded-3xl p-5">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[var(--c-primary)] to-[var(--c-deep)] font-display text-xl font-black text-white">
                  {overall}%
                </div>
                <div className="flex-1">
                  <p className="font-display font-bold">Your journey</p>
                  <p className="text-sm text-[var(--text-soft)]">
                    {completed} of {CHAPTERS.length} chapters completed.
                    {inProgress && ` Currently reading “${inProgress.title}”.`}
                  </p>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Modes */}
      <section className="mx-auto mt-14 max-w-5xl px-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {MODES.map((m, i) => (
            <Reveal key={m.href} delay={i * 0.05}>
              <Link
                href={m.href}
                className="card group flex h-full flex-col gap-1 rounded-3xl p-4 transition-transform hover:-translate-y-1"
              >
                <span className="text-2xl">{m.icon}</span>
                <span className="mt-1 font-display font-extrabold group-hover:text-[var(--c-primary)]">
                  {m.label}
                </span>
                <span className="text-xs text-[var(--text-faint)]">{m.desc}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Chapters */}
      <Section
        title="World War Two"
        subtitle="How the world fell into war"
        chapters={ww2}
      />
      <Section
        title="The Cold War"
        subtitle="A divided world, on the edge"
        chapters={cold}
      />

      {/* Footer note */}
      <div className="mx-auto mt-16 max-w-3xl px-4 text-center">
        <Reveal>
          <div className="card rounded-3xl p-6">
            <p className="font-display text-lg font-bold">
              Built for understanding, not memorising 🌱
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--text-soft)]">
              Every chapter stays strictly inside the official Cambridge / SEAB
              2261 syllabus. The goal is that you finish thinking
              <em> “that makes complete sense” </em>— and remember it for the exam.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  chapters,
}: {
  title: string;
  subtitle: string;
  chapters: typeof CHAPTERS;
}) {
  return (
    <section className="mx-auto mt-16 max-w-5xl px-4">
      <Reveal>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-black">{title}</h2>
            <p className="text-[var(--text-soft)]">{subtitle}</p>
          </div>
          <span className="rounded-full bg-[var(--c-surface)] px-3 py-1 text-xs font-bold text-[var(--text-faint)]">
            {chapters.length} chapters
          </span>
        </div>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((c, i) => (
          <ChapterCard key={c.id} chapter={c} index={i} />
        ))}
      </div>
    </section>
  );
}
