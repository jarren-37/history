"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { resumeAudio } from "@/lib/sound";

export interface SciNavLink {
  href: string;
  label: string;
  icon: string;
}

/**
 * Shared control-panel navigation for the science subjects. Dark glass with the
 * subject accent — deliberately unlike the leather nav of the library subjects.
 * Store-agnostic: sound state is passed in.
 */
export function SciNavBar({
  brand,
  motif,
  homeHref,
  links,
  soundOn,
  toggleSound,
  hydrated,
  level,
  profileHref,
}: {
  brand: string;
  motif: string;
  homeHref: string;
  links: SciNavLink[];
  soundOn: boolean;
  toggleSound: () => void;
  hydrated: boolean;
  level?: number;
  profileHref?: string;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className="mx-auto flex max-w-6xl items-center gap-2 rounded-2xl border px-3 py-2 sm:px-4"
        style={{
          background: "color-mix(in srgb, var(--sci-panel) 92%, #000)",
          borderColor: "var(--sci-border)",
          color: "var(--sci-ink)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 10px 40px -18px rgba(0,0,0,0.8)",
        }}
      >
        <Link
          href="/"
          title="The Athenaeum — all subjects"
          aria-label="Back to The Athenaeum"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border text-lg transition-transform hover:scale-105 active:scale-95"
          style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}
        >
          🏛️
        </Link>
        <Link
          href={homeHref}
          className="flex items-center gap-2 pr-1 font-display text-lg font-extrabold"
          style={{ color: "var(--sci-ink)" }}
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-lg"
            style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}
          >
            {motif}
          </span>
          <span className="hidden sm:inline" style={{ color: "var(--sci-accent)" }}>
            {brand}
          </span>
        </Link>

        <div className="mx-1 flex flex-1 items-center gap-0.5 overflow-x-auto sm:gap-1">
          {links.map((l) => {
            const active =
              l.href === homeHref
                ? pathname === homeHref
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-display text-sm font-semibold transition-colors sm:px-3"
                style={{ color: active ? "#0c0c0c" : "var(--sci-ink)" }}
              >
                {active && (
                  <motion.span
                    layoutId="sci-nav-pill"
                    className="absolute inset-0 -z-10 rounded-xl"
                    style={{ background: "var(--sci-accent)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span aria-hidden>{l.icon}</span>
                <span className="hidden md:inline">{l.label}</span>
              </Link>
            );
          })}
        </div>

        {profileHref && (
          <Link
            href={profileHref}
            title="Your profile"
            className="hidden shrink-0 items-center gap-1.5 rounded-xl border px-2.5 py-1.5 sm:flex"
            style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}
          >
            <span aria-hidden>🎖️</span>
            <span className="font-display text-sm font-extrabold" style={{ color: "var(--sci-accent)" }}>
              Lv {hydrated ? (level ?? 1) : "—"}
            </span>
          </Link>
        )}
        <button
          onClick={() => {
            void resumeAudio();
            toggleSound();
          }}
          aria-label="Toggle ambience"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border text-lg transition-transform hover:scale-105 active:scale-95"
          style={{ borderColor: "var(--sci-border)", color: "var(--sci-ink)" }}
        >
          {hydrated ? (soundOn ? "🔊" : "🔈") : "🔈"}
        </button>
      </nav>
    </header>
  );
}
