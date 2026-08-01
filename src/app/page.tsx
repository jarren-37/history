"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { levelFromXp } from "@/lib/science/levels";

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
  /** localStorage key for this subject's saved progress. */
  storageKey?: string;
  /** How to summarise saved progress into a short badge. */
  kind?: "history" | "english" | "science";
}

/** Read a subject's saved progress and turn it into a short badge string. */
function readProgress(s: Subject): string | null {
  if (!s.storageKey || typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(s.storageKey);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (s.kind === "history") {
      const prog = data.progress ?? {};
      const chapters = Object.values(prog).filter(
        (p: unknown) => (p as { completed?: boolean })?.completed
      ).length;
      return chapters > 0 ? `${chapters} chapter${chapters > 1 ? "s" : ""} read` : null;
    }
    if (s.kind === "english") {
      const words = Object.keys(data.collection ?? {}).length;
      const lv = levelFromXp(data.xp ?? 0).level;
      if (!words && !data.xp) return null;
      return `Lv ${lv} · ${words} word${words === 1 ? "" : "s"}`;
    }
    if (s.kind === "science") {
      const stations = (data.completed ?? []).length;
      const lv = levelFromXp(data.xp ?? 0).level;
      if (!stations && !data.xp) return null;
      return `Lv ${lv} · ${stations} mastered`;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function readJSON(key: string): Record<string, unknown> {
  try {
    return JSON.parse(window.localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

interface Scholar {
  totalXp: number;
  level: number;
  progress: number;
  into: number;
  span: number;
  title: string;
  words: number;
  stations: number;
  chapters: number;
  begun: number;
}

function scholarTitle(l: number): string {
  if (l >= 12) return "Sage of the Athenaeum";
  if (l >= 8) return "Polymath";
  if (l >= 5) return "Scholar";
  if (l >= 3) return "Junior Scholar";
  return "Curious Visitor";
}

/** Aggregate progress across every subject into one Athenaeum-wide identity. */
function readAthenaeum(): Scholar {
  const en = readJSON("lexicon:v1");
  const ch = readJSON("atelier:v1");
  const ph = readJSON("observatory:v1");
  const hi = readJSON("chronicle:v1");
  const xp = (n: unknown) => (typeof n === "number" ? n : 0);
  const len = (o: unknown) => (o && typeof o === "object" ? Object.keys(o as object).length : 0);
  const arr = (a: unknown) => (Array.isArray(a) ? a.length : 0);
  const totalXp = xp(en.xp) + xp(ch.xp) + xp(ph.xp);
  const words = len(en.collection);
  const stations = arr(ch.completed) + arr(ph.completed);
  const chapters = Object.values((hi.progress as Record<string, { completed?: boolean }>) ?? {}).filter((p) => p?.completed).length;
  const begun = [
    xp(en.xp) > 0 || words > 0,
    xp(ch.xp) > 0 || arr(ch.completed) > 0,
    xp(ph.xp) > 0 || arr(ph.completed) > 0,
    chapters > 0,
  ].filter(Boolean).length;
  const lvl = levelFromXp(totalXp);
  return { totalXp, level: lvl.level, progress: lvl.progress, into: lvl.into, span: lvl.span, title: scholarTitle(lvl.level), words, stations, chapters, begun };
}

interface DailyPath { label: string; href: string; emoji: string; }
const DAILY_PATHS: DailyPath[] = [
  { label: "Uncover a new word in the Lexicon", href: "/english", emoji: "📚" },
  { label: "Revisit your fading words", href: "/english/review", emoji: "🔮" },
  { label: "Balance an equation in the Atelier", href: "/chemistry/games/balance", emoji: "⚖️" },
  { label: "Brew a compound in the Atelier", href: "/chemistry/games/brew", emoji: "⚗️" },
  { label: "Launch a satellite in the Observatory", href: "/physics/games/satellite", emoji: "🛰️" },
  { label: "Rescue the city grid", href: "/physics/games/grid", emoji: "🏙️" },
  { label: "Read a chapter of the Chronicle", href: "/history", emoji: "📜" },
  { label: "Tune the wave table", href: "/physics/lab/waves", emoji: "🌊" },
];

function dailyPath(dateKey: string): DailyPath {
  let h = 2166136261;
  for (let i = 0; i < dateKey.length; i++) {
    h ^= dateKey.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return DAILY_PATHS[(h >>> 0) % DAILY_PATHS.length];
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
    storageKey: "chronicle:v1",
    kind: "history",
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
    storageKey: "lexicon:v1",
    kind: "english",
  },
  {
    brand: "The Alchemist's Atelier",
    subject: "Chemistry",
    motif: "🧪",
    tagline: "The art of transforming matter",
    blurb:
      "Enter a magical workshop of bubbling flasks and ancient furnaces. Brew compounds, watch bonds form, and master the elements.",
    href: "/chemistry",
    bg: "linear-gradient(155deg,#3c2a12,#10241a)",
    glow: "#cf8a3a",
    text: "#f0e4cf",
    storageKey: "atelier:v1",
    kind: "science",
  },
  {
    brand: "The Inventor's Observatory",
    subject: "Physics",
    motif: "⚡",
    tagline: "The rules that govern the universe",
    blurb:
      "Step into a steampunk observatory of gears and lightning. Build circuits, launch satellites and bend invisible fields.",
    href: "/physics",
    bg: "linear-gradient(155deg,#1a2140,#080b18)",
    glow: "#5a8bff",
    text: "#e6ecff",
    storageKey: "observatory:v1",
    kind: "science",
  },
];

export default function AthenaeumHub() {
  const [dark, setDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState<Record<string, string | null>>({});
  const [scholar, setScholar] = useState<Scholar | null>(null);
  const [daily, setDaily] = useState<DailyPath | null>(null);

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
    const p: Record<string, string | null> = {};
    SUBJECTS.forEach((s) => (p[s.subject] = readProgress(s)));
    setProgress(p);
    setScholar(readAthenaeum());
    const now = new Date();
    setDaily(dailyPath(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`));
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

        {/* Athenaeum Scholar + Today's Path */}
        {hydrated && (scholar?.begun || daily) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 grid gap-4 sm:grid-cols-5"
          >
            {scholar && scholar.begun > 0 && (
              <div className="rounded-2xl border border-[rgba(236,214,172,0.25)] bg-[rgba(30,22,10,0.5)] p-5 sm:col-span-3">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0">
                    <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
                      <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,210,140,0.18)" strokeWidth="5" />
                      <circle cx="28" cy="28" r="24" fill="none" stroke="url(#sgrad)" strokeWidth="5" strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 24}
                        strokeDashoffset={2 * Math.PI * 24 * (1 - scholar.progress)} />
                      <defs>
                        <linearGradient id="sgrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="#e6c15a" /><stop offset="1" stopColor="#b8892b" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute inset-0 grid place-items-center font-display text-lg font-black text-[#f3dcae]">
                      {scholar.level}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-[rgba(236,214,172,0.6)]">
                      Athenaeum Scholar
                    </div>
                    <div className="gold-text font-display text-xl font-black">{scholar.title}</div>
                    <div className="text-xs text-[rgba(236,214,172,0.7)]">
                      {scholar.totalXp} XP · {scholar.begun}/4 subjects explored
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  <Stat n={scholar.words} label="words" />
                  <Stat n={scholar.stations} label="stations" />
                  <Stat n={scholar.chapters} label="chapters" />
                </div>
              </div>
            )}
            {daily && (
              <Link
                href={daily.href}
                className="lift group flex flex-col justify-between rounded-2xl border border-[var(--gold)] bg-[rgba(30,22,10,0.5)] p-5 sm:col-span-2"
              >
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[rgba(236,214,172,0.6)]">
                    Today&apos;s Path
                  </div>
                  <div className="mt-2 flex items-start gap-3">
                    <span className="text-3xl">{daily.emoji}</span>
                    <span className="font-display text-lg font-extrabold text-[#f3dcae]">{daily.label}</span>
                  </div>
                </div>
                <span className="mt-3 inline-block font-bold text-[var(--gold-2)]">Set out →</span>
              </Link>
            )}
          </motion.div>
        )}

        {/* Subject doors */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {SUBJECTS.map((s, i) => (
            <motion.div
              key={s.subject}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <SubjectDoor subject={s} progress={hydrated ? progress[s.subject] : null} />
            </motion.div>
          ))}
        </div>

        {/* The Gazette — a cross-cutting current-affairs feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <Link href="/gazette" className="lift group block">
            <div
              className="relative overflow-hidden rounded-3xl border-2 p-6 shadow-soft-lg sm:p-7"
              style={{
                background: "linear-gradient(155deg,#2a170f,#0b0a12)",
                borderColor: "color-mix(in srgb, #e0142d 42%, transparent)",
                color: "#f4e9dd",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-70"
                style={{ background: "#e0142d" }}
              />
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="text-5xl sm:text-6xl">📰</div>
                <div className="flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#ff9aa8" }}>
                    Current Affairs
                  </div>
                  <h2 className="font-display text-2xl font-black sm:text-3xl">The Gazette</h2>
                  <p className="mt-0.5 font-hand text-xl text-[#e8cfa0]">
                    Today&apos;s world, one swipe at a time
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[rgba(244,233,221,0.8)]">
                    A vertical, swipeable feed of real headlines from newsrooms you can trust — The
                    Straits Times, CNA, BBC and The Guardian — each linking to the full story. Stay
                    sharp for essays, oral exams and the world beyond the syllabus.
                  </p>
                </div>
                <div className="shrink-0">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 font-display text-base font-extrabold shadow-lg transition-transform group-hover:scale-105"
                    style={{ background: "#e0142d", color: "#fff" }}
                  >
                    Open the feed →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        <p className="mt-10 text-center text-sm text-[rgba(236,214,172,0.6)]">
          Four halls and a newsstand — each with its own story to discover. More
          knowledge awaits within.
        </p>
      </div>
    </div>
  );
}

function SubjectDoor({
  subject: s,
  progress,
}: {
  subject: Subject;
  progress?: string | null;
}) {
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
      {!s.soon && progress && (
        <span
          className="absolute right-4 top-4 rounded-full border px-3 py-1 text-[11px] font-bold"
          style={{ borderColor: `color-mix(in srgb, ${s.glow} 50%, transparent)`, background: `color-mix(in srgb, ${s.glow} 18%, transparent)`, color: s.text }}
        >
          {progress}
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
              {progress ? "Continue →" : "Step inside →"}
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

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <span className="rounded-full border border-[rgba(236,214,172,0.25)] px-2.5 py-1 font-bold text-[#f3dcae]">
      {n} {label}
    </span>
  );
}
