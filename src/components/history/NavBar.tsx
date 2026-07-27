"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useApp } from "@/lib/history/store";
import { resumeAudio } from "@/lib/sound";

const LINKS = [
  { href: "/history", label: "Contents", icon: "📖" },
  { href: "/history/timeline", label: "Timeline", icon: "🕰️" },
  { href: "/history/characters", label: "The Cast", icon: "🎭" },
  { href: "/history/map", label: "Atlas", icon: "🗺️" },
  { href: "/history/exam", label: "Exams", icon: "🪶" },
  { href: "/history/search", label: "Index", icon: "🔍" },
];

export function NavBar() {
  const pathname = usePathname();
  const { theme, toggleTheme, hydrated, soundOn, toggleSound } = useApp();

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <nav className="leather mx-auto flex max-w-6xl items-center gap-2 rounded-2xl px-3 py-2 sm:px-4">
        <Link
          href="/"
          title="The Athenaeum — all subjects"
          aria-label="Back to The Athenaeum"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[rgba(255,210,140,0.25)] text-lg text-[#f3dcae] transition-transform hover:scale-105 active:scale-95"
        >
          🏛️
        </Link>
        <Link
          href="/history"
          className="group flex items-center gap-2 pr-2 font-display text-lg font-extrabold text-[#f3dcae]"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl text-lg transition-transform group-hover:scale-105"
            style={{ background: "linear-gradient(180deg,#e6c15a,#8a5f1a)", boxShadow: "inset 0 1px 0 rgba(255,240,190,0.6)" }}>
            📖
          </span>
          <span className="hidden gold-text sm:inline">Chronicle</span>
        </Link>

        <div className="mx-1 flex flex-1 items-center gap-0.5 overflow-x-auto sm:gap-1">
          {LINKS.map((l) => {
            const active =
              l.href === "/history"
                ? pathname === "/history"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-display text-sm font-semibold transition-colors sm:px-3 ${
                  active ? "text-[#2a1a0a]" : "text-[#e8cfa0] hover:text-[#fff2d8]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-xl"
                    style={{
                      background: "linear-gradient(180deg,#e6c15a,#b8892b)",
                      boxShadow: "inset 0 1px 0 rgba(255,240,190,0.6), 0 2px 6px rgba(0,0,0,0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span aria-hidden>{l.icon}</span>
                <span className="hidden md:inline">{l.label}</span>
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => {
            void resumeAudio();
            toggleSound();
          }}
          aria-label="Toggle library ambience"
          title="Library ambience"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[rgba(255,210,140,0.25)] text-lg text-[#f3dcae] transition-transform hover:scale-105 active:scale-95"
        >
          {hydrated ? (soundOn ? "🔊" : "🔈") : "🔈"}
        </button>
        <button
          onClick={toggleTheme}
          aria-label="Toggle candlelight"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[rgba(255,210,140,0.25)] text-lg text-[#f3dcae] transition-transform hover:scale-105 active:scale-95"
        >
          {hydrated ? (theme === "dark" ? "🌙" : "🕯️") : "🕯️"}
        </button>
      </nav>
    </header>
  );
}
