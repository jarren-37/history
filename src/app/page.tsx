"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Subject {
  brand: string;
  subject: string;
  motif: string;
  tagline: string;
  blurb: string;
  href: string | null;
  bg: string;
  glow: string;
  text: string;
  soon?: boolean;
}

const SUBJECTS: Subject[] = [
  {
    brand: "Chronicle",
    subject: "History",
    motif: "📜",
    tagline: "The History Storybook",
    blurb:
      "Journey through the Singapore O-Level Combined History syllabus as one illustrated, animated story where every event flows into the next.",
    href: "/history",
    bg: "linear-gradient(155deg,#6b4423,#2e1c0c)",
    glow: "#d8a24a",
    text: "#f3dcae",
  },
  {
    brand: "Lexicon",
    subject: "English",
    motif: "📚",
    tagline: "The Vocabulary Adventure",
    blurb:
      "Explore an ancient library where words are treasures — discover, collect and master rare vocabulary for O-Level English and for life.",
    href: "/english",
    bg: "linear-gradient(155deg,#1d5b4f,#0c2a25)",
    glow: "#57c9a9",
    text: "#eafff6",
  },
  {
    brand: "The Alchemist's Atelier",
    subject: "Chemistry",
    motif: "🧪",
    tagline: "The art of transforming matter",
    blurb:
      "Enter a magical workshop of bubbling flasks and ancient furnaces. Brew compounds, watch bonds form, and master the elements.",
    href: null,
    bg: "linear-gradient(155deg,#3c2a12,#10241a)",
    glow: "#cf8a3a",
    text: "#f0e4cf",
    soon: true,
  },
  {
    brand: "The Inventor's Observatory",
    subject: "Physics",
    motif: "⚡",
    tagline: "The rules that govern the universe",
    blurb:
      "Step into a steampunk observatory of gears and lightning. Build circuits, launch satellites and bend invisible fields.",
    href: null,
    bg: "linear-gradient(155deg,#1a2140,#080b18)",
    glow: "#5a8bff",
    text: "#e6ecff",
    soon: true,
  },
];

export default function AthenaeumHub() {
  const [dark, setDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("athenaeum:v1") || "{}");
      const d = s.theme
        ? s.theme === "dark"
        : window.matchMedia?.("(prefers-color-scheme: dark)").matches;
      setDark(Boolean(d));
      document.documentElement.classList.toggle("dark", Boolean(d));
    } catch {
      /* non-fatal */
    }
    setHydrated(true);
  }, []);

  function toggleTheme() {
    const d = !dark;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
    try {
      localStorage.setItem("athenaeum:v1", JSON.stringify({ theme: d ? "dark" : "light" }));
    } catch {
      /* non-fatal */
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="aurora" />
      {/* drifting motes */}
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-[rgba(255,220,160,0.5)]"
          style={{ left: `${(i * 61) % 100}%`, top: `${(i * 37) % 100}%` }}
          animate={{ y: [0, -22, 0], opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: 5 + (i % 6), repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* theme toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle candlelight"
        className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-xl border border-[rgba(255,210,140,0.25)] text-lg text-[#f3dcae] transition-transform hover:scale-105 active:scale-95"
      >
        {hydrated ? (dark ? "🌙" : "🕯️") : "🕯️"}
      </button>

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20">
        {/* Crest + title */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="text-5xl">🏛️</div>
          <h1 className="gold-text mt-3 font-display text-5xl font-black tracking-tight sm:text-7xl">
            The Athenaeum
          </h1>
          <p className="mx-auto mt-3 max-w-xl font-hand text-2xl text-[#e8cfa0] sm:text-3xl">
            A hall of all knowledge
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[rgba(236,214,172,0.82)] sm:text-lg">
            Every subject is its own world — a different game, a different
            atmosphere, a different adventure. Choose a door and step inside.
          </p>
        </motion.div>

        {/* Subject doors */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {SUBJECTS.map((s, i) => (
            <motion.div
              key={s.subject}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <SubjectDoor subject={s} />
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-[rgba(236,214,172,0.6)]">
          More halls are being built. The Atelier and the Observatory open soon.
        </p>
      </div>
    </div>
  );
}

function SubjectDoor({ subject: s }: { subject: Subject }) {
  const inner = (
    <div
      className="group relative h-full overflow-hidden rounded-3xl border-2 p-6 shadow-soft-lg transition-transform sm:p-7"
      style={{
        background: s.bg,
        borderColor: `color-mix(in srgb, ${s.glow} 40%, transparent)`,
        color: s.text,
      }}
    >
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-70"
        style={{ background: s.glow }}
      />
      {s.soon && (
        <span
          className="absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
          style={{ background: `color-mix(in srgb, ${s.glow} 30%, transparent)`, color: s.text }}
        >
          Coming soon
        </span>
      )}

      <div className="relative flex h-full flex-col">
        <div className="text-5xl drop-shadow sm:text-6xl">{s.motif}</div>
        <div
          className="mt-3 text-[11px] font-bold uppercase tracking-[0.25em]"
          style={{ color: `color-mix(in srgb, ${s.glow} 75%, white)` }}
        >
          {s.subject}
        </div>
        <h2 className="font-display text-2xl font-black leading-tight sm:text-3xl" style={{ color: s.text }}>
          {s.brand}
        </h2>
        <p className="mt-0.5 font-hand text-xl" style={{ color: `color-mix(in srgb, ${s.text} 85%, transparent)` }}>
          {s.tagline}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: `color-mix(in srgb, ${s.text} 78%, transparent)` }}>
          {s.blurb}
        </p>
        <div className="mt-5">
          {s.soon ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold"
              style={{ borderColor: `color-mix(in srgb, ${s.glow} 45%, transparent)`, color: `color-mix(in srgb, ${s.text} 80%, transparent)` }}
            >
              In the workshop…
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 font-display text-base font-extrabold shadow-lg transition-transform group-hover:scale-105"
              style={{ background: s.glow, color: "#1a1206" }}
            >
              Enter {s.brand} →
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (s.href) {
    return (
      <Link href={s.href} className="lift block h-full">
        {inner}
      </Link>
    );
  }
  return <div className="h-full cursor-default opacity-90">{inner}</div>;
}
