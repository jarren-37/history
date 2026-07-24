"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CHAPTERS } from "@/content/chapters";
import { getPalette } from "@/content/palettes";
import { useApp } from "@/lib/store";
import { BookCover } from "@/components/BookCover";
import { InkDivider, CornerFlourish, WaxSeal, DustMotes } from "@/components/Ornaments";

const MODES = [
  { href: "/timeline", label: "The Timeline", icon: "🕰️" },
  { href: "/characters", label: "The Cast", icon: "🎭" },
  { href: "/map", label: "The Atlas", icon: "🗺️" },
  { href: "/exam", label: "The Examinations", icon: "🪶" },
  { href: "/search", label: "The Index", icon: "🔍" },
];

export default function Home() {
  const { progress, hydrated } = useApp();
  const [opened, setOpened] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("chronicle:opened") === "1") setOpened(true);
    setReady(true);
  }, []);

  const openBook = () => {
    setOpened(true);
    sessionStorage.setItem("chronicle:opened", "1");
  };

  if (!ready) return <div className="min-h-screen" />;
  if (!opened) return <BookCover onOpened={openBook} />;

  const completed = Object.values(progress).filter((p) => p.completed).length;
  const overall = hydrated ? Math.round((completed / CHAPTERS.length) * 100) : 0;

  const ww2 = CHAPTERS.filter((c) => c.section === "World War Two");
  const cold = CHAPTERS.filter((c) => c.section === "The Cold War");

  return (
    <div className="relative mx-auto max-w-5xl px-3 py-8 sm:px-4">
      <DustMotes count={14} />
      <motion.div
        initial={{ opacity: 0, rotateX: 18, y: 30 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="page page-frame relative overflow-hidden rounded-[18px] px-5 py-10 sm:px-12 sm:py-12"
        style={{ transformPerspective: 1400 }}
      >
        <CornerFlourish className="absolute left-3 top-3 h-12 w-12" />
        <CornerFlourish className="absolute right-3 top-3 h-12 w-12 -scale-x-100" />
        <CornerFlourish className="absolute bottom-3 left-3 h-12 w-12 -scale-y-100" />
        <CornerFlourish className="absolute bottom-3 right-3 h-12 w-12 -scale-100" />

        {/* Header */}
        <header className="relative z-10 text-center">
          <p className="font-hand text-2xl text-[var(--ink-faint)]">Project Chronicle</p>
          <h1 className="mt-1 font-display text-4xl font-black text-[var(--ink)] sm:text-6xl">
            Table of Contents
          </h1>
          <InkDivider className="mx-auto mt-4 h-5 w-64" />
          <p className="mx-auto mt-3 max-w-md font-serif text-lg italic text-[var(--ink-soft)]">
            “History is not a list of dates — it is one long, unfolding story.
            Turn the page, and begin.”
          </p>
        </header>

        {/* Progress ex-libris */}
        {hydrated && (
          <div className="relative z-10 mt-6 flex items-center justify-center gap-4">
            <WaxSeal size={64} label={`${overall}%`} />
            <p className="font-serif text-[var(--ink-soft)]">
              {completed === 0
                ? "Your journey has not yet begun."
                : `${completed} of ${CHAPTERS.length} chapters read.`}
            </p>
          </div>
        )}

        {/* Two parts, like facing pages */}
        <div className="relative z-10 mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          <ContentsPart
            roman="I"
            title="The Coming of War"
            subtitle="World War Two"
            chapters={ww2}
            progress={progress}
            hydrated={hydrated}
          />
          <ContentsPart
            roman="II"
            title="The Long Cold Peace"
            subtitle="The Cold War"
            chapters={cold}
            progress={progress}
            hydrated={hydrated}
          />
        </div>

        <InkDivider className="mx-auto mt-12 h-5 w-72" />

        {/* The reading room */}
        <div className="relative z-10 mt-6 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-[var(--ink-faint)]">
            The Reading Room
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            {MODES.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="lift flex items-center gap-2 rounded-full border border-[var(--parch-edge)] bg-[var(--parch-2)] px-4 py-2 font-display text-sm font-bold text-[var(--ink-soft)] transition-colors hover:text-[var(--wax)]"
              >
                <span aria-hidden>{m.icon}</span>
                {m.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ContentsPart({
  roman,
  title,
  subtitle,
  chapters,
  progress,
  hydrated,
}: {
  roman: string;
  title: string;
  subtitle: string;
  chapters: typeof CHAPTERS;
  progress: Record<string, { completed: boolean; page: number; total: number }>;
  hydrated: boolean;
}) {
  return (
    <section>
      <div className="mb-4 text-center">
        <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-[var(--gold)]">
          Part the {roman}
        </p>
        <h2 className="font-display text-2xl font-black text-[var(--ink)]">{title}</h2>
        <p className="font-hand text-lg text-[var(--ink-faint)]">{subtitle}</p>
      </div>
      <ol className="space-y-1">
        {chapters.map((c, i) => {
          const p = getPalette(c.palette);
          const prog = progress[c.slug];
          const done = hydrated && prog?.completed;
          const reading = hydrated && prog && !prog.completed;
          return (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <Link
                href={`/chapters/${c.slug}`}
                className="group flex items-center gap-3 border-b border-dotted border-[var(--parch-edge)] py-2.5"
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-lg transition-transform group-hover:scale-110"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, ${p.secondary}, ${p.primary})`,
                    boxShadow: `0 0 0 2px var(--parch), 0 0 0 3px ${p.primary}55, 0 3px 8px rgba(0,0,0,0.25)`,
                  }}
                >
                  {p.motif}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-lg font-bold leading-tight text-[var(--ink)] transition-colors group-hover:text-[var(--wax)]">
                    {c.title}
                  </span>
                  <span className="block truncate font-serif text-sm italic text-[var(--ink-faint)]">
                    {c.era} · {c.subtitle}
                  </span>
                </span>
                <span className="shrink-0 font-hand text-lg text-[var(--ink-faint)]">
                  {done ? (
                    <span className="text-[var(--wax)]">✦ read</span>
                  ) : reading ? (
                    "reading…"
                  ) : (
                    `no. ${c.number}`
                  )}
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
