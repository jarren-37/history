"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";

const LINKS = [
  { href: "/", label: "Library", icon: "📚" },
  { href: "/timeline", label: "Timeline", icon: "🕰️" },
  { href: "/characters", label: "Characters", icon: "🎭" },
  { href: "/map", label: "Map", icon: "🗺️" },
  { href: "/exam", label: "Exam", icon: "🎯" },
  { href: "/search", label: "Search", icon: "🔍" },
];

export function NavBar() {
  const pathname = usePathname();
  const { theme, toggleTheme, hydrated } = useApp();

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <nav className="card mx-auto flex max-w-6xl items-center gap-2 rounded-3xl px-3 py-2 backdrop-blur-md sm:px-4">
        <Link
          href="/"
          className="group flex items-center gap-2 pr-2 font-display text-lg font-extrabold"
        >
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-[var(--c-primary)] to-[var(--c-deep)] text-lg shadow-soft transition-transform group-hover:scale-105">
            📖
          </span>
          <span className="hidden sm:inline">Chronicle</span>
        </Link>

        <div className="mx-1 flex flex-1 items-center gap-0.5 overflow-x-auto sm:gap-1">
          {LINKS.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative flex shrink-0 items-center gap-1.5 rounded-2xl px-2.5 py-1.5 text-sm font-semibold transition-colors sm:px-3 ${
                  active
                    ? "text-white"
                    : "text-[var(--text-soft)] hover:text-[var(--text)]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[var(--c-primary)] to-[var(--c-deep)]"
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
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-[var(--border)] text-lg transition-transform hover:scale-105 active:scale-95"
        >
          {hydrated ? (theme === "dark" ? "🌙" : "☀️") : "🌗"}
        </button>
      </nav>
    </header>
  );
}
