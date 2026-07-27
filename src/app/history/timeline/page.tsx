"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { TIMELINE } from "@/content/history/timeline";
import { getPalette } from "@/content/history/palettes";
import { Reveal } from "@/components/history/ui";

export default function TimelinePage() {
  const [active, setActive] = useState<string | null>(TIMELINE[0].id);
  const activeEvent = TIMELINE.find((e) => e.id === active) ?? TIMELINE[0];
  const p = getPalette(activeEvent.palette);

  return (
    <div
      className="pb-24"
      style={
        {
          ["--c-primary" as string]: p.primary,
          ["--c-secondary" as string]: p.secondary,
          ["--c-deep" as string]: p.deep,
          ["--c-surface" as string]: p.surface,
        } as React.CSSProperties
      }
    >
      <section className="relative overflow-hidden px-4 pt-10">
        <div className="aurora" />
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--c-primary)]">
            🕰️ Timeline mode
          </span>
          <h1 className="mt-4 gold-text font-display text-4xl font-black sm:text-5xl">
            The whole story, in order
          </h1>
          <p className="mx-auto mt-3 max-w-xl font-serif text-[#e4cfa2]">
            Scroll along the spine of history. Tap any moment to see what
            happened — and jump into its chapter.
          </p>
        </div>
      </section>

      {/* Horizontal rail */}
      <div className="relative mt-10">
        <div className="timeline-scroll overflow-x-auto pb-6">
          <div className="relative mx-auto flex w-max gap-0 px-8">
            {/* spine */}
            <div className="absolute left-0 right-0 top-[46px] h-1 rounded-full bg-gradient-to-r from-[var(--c-secondary)] via-[var(--c-primary)] to-[var(--c-deep)]" />
            {TIMELINE.map((e, i) => {
              const ep = getPalette(e.palette);
              const isActive = e.id === active;
              return (
                <button
                  key={e.id}
                  onClick={() => setActive(e.id)}
                  className="relative flex w-36 shrink-0 flex-col items-center pt-2 text-center"
                >
                  <span
                    className={`font-display text-sm font-black transition-colors ${
                      isActive ? "text-[#f2c94c]" : "text-[#c9ad78]"
                    }`}
                  >
                    {e.year}
                  </span>
                  <motion.span
                    animate={{
                      scale: isActive ? 1.25 : 1,
                    }}
                    className="relative z-10 mt-2 grid h-11 w-11 place-items-center rounded-2xl text-lg shadow-soft"
                    style={{
                      background: `linear-gradient(135deg, ${ep.secondary}, ${ep.primary})`,
                    }}
                  >
                    {e.icon}
                    {isActive && (
                      <motion.span
                        layoutId="tl-ring"
                        className="absolute inset-0 rounded-2xl ring-2 ring-[var(--c-deep)] ring-offset-2 ring-offset-[var(--bg)]"
                      />
                    )}
                  </motion.span>
                  <span
                    className={`mt-2 line-clamp-2 text-xs font-semibold transition-colors ${
                      isActive ? "text-[#f2e0b4]" : "text-[#b89a6a]"
                    }`}
                  >
                    {e.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div className="mx-auto mt-4 max-w-3xl px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="card overflow-hidden rounded-3xl"
          >
            <div className="flex items-center gap-4 bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-6 py-5 text-white">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/20 text-3xl">
                {activeEvent.icon}
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide opacity-80">
                  {activeEvent.dateLabel ?? activeEvent.year}
                </p>
                <h2 className="font-display text-2xl font-extrabold">
                  {activeEvent.title}
                </h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-lg leading-relaxed text-[var(--text-soft)]">
                {activeEvent.description}
              </p>
              <Link
                href={`/history/chapters/${activeEvent.chapterSlug}`}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-5 py-2.5 font-bold text-white transition-transform hover:scale-[1.03]"
              >
                Read this chapter →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Vertical fallback list for quick scanning */}
      <div className="mx-auto mt-14 max-w-3xl px-4">
        <Reveal>
          <h3 className="mb-4 font-display text-xl font-black text-[#ecd6a4]">
            Every moment at a glance
          </h3>
        </Reveal>
        <div className="space-y-2">
          {TIMELINE.map((e, i) => {
            const ep = getPalette(e.palette);
            return (
              <Reveal key={e.id} delay={Math.min(i * 0.03, 0.3)}>
                <button
                  onClick={() => {
                    setActive(e.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-left transition-colors hover:border-[var(--c-primary)]"
                >
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-base"
                    style={{
                      background: `linear-gradient(135deg, ${ep.secondary}, ${ep.primary})`,
                    }}
                  >
                    {e.icon}
                  </span>
                  <span className="w-16 shrink-0 font-display text-sm font-black text-[var(--text-faint)]">
                    {e.year}
                  </span>
                  <span className="text-sm font-semibold">{e.title}</span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
