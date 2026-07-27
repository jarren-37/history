"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";
import { getWord } from "@/content/words";

/** A hand-drawn owl librarian — the keeper of the Lexicon. */
export function OwlKeeper({ size = 84 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden
      initial={{ y: 0 }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* body */}
      <ellipse cx="50" cy="58" rx="30" ry="33" fill="#5a3a1d" />
      <ellipse cx="50" cy="60" rx="23" ry="26" fill="#8a5f34" />
      {/* wings */}
      <path d="M22 50 Q16 66 26 82 Q30 70 30 56 Z" fill="#4a2f16" />
      <path d="M78 50 Q84 66 74 82 Q70 70 70 56 Z" fill="#4a2f16" />
      {/* ear tufts */}
      <path d="M30 30 L26 14 L40 26 Z" fill="#5a3a1d" />
      <path d="M70 30 L74 14 L60 26 Z" fill="#5a3a1d" />
      {/* face disc */}
      <ellipse cx="50" cy="44" rx="24" ry="21" fill="#c8a86f" />
      {/* eyes (spectacles) */}
      <circle cx="40" cy="42" r="11" fill="#fbf7f0" stroke="#e6c15a" strokeWidth="2" />
      <circle cx="60" cy="42" r="11" fill="#fbf7f0" stroke="#e6c15a" strokeWidth="2" />
      <line x1="51" y1="42" x2="49" y2="42" stroke="#e6c15a" strokeWidth="2" />
      <motion.g
        animate={{ scaleY: [1, 1, 0.1, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.9, 0.95, 1] }}
        style={{ transformOrigin: "50px 42px" }}
      >
        <circle cx="41" cy="43" r="4.5" fill="#2b2a33" />
        <circle cx="59" cy="43" r="4.5" fill="#2b2a33" />
        <circle cx="42.5" cy="41.5" r="1.5" fill="#fff" />
        <circle cx="60.5" cy="41.5" r="1.5" fill="#fff" />
      </motion.g>
      {/* beak */}
      <path d="M50 48 L45 55 L55 55 Z" fill="#e07b39" />
      {/* feet */}
      <path d="M42 89 l-4 5 m4 -5 l0 6 m0 -6 l4 5" stroke="#e07b39" strokeWidth="2" strokeLinecap="round" />
      <path d="M58 89 l-4 5 m4 -5 l0 6 m0 -6 l4 5" stroke="#e07b39" strokeWidth="2" strokeLinecap="round" />
    </motion.svg>
  );
}

/** Derive the librarian's current line from the player's progress. */
export function useLibrarianLine(): {
  message: string;
  action?: { label: string; href: string };
} {
  const { hydrated, discoveredCount, dueWordIds, streak, level } = useApp();

  if (!hydrated) {
    return { message: "Mind the dust — I'm just lighting the lamps…" };
  }

  const due = dueWordIds();
  if (due.length > 0) {
    const w = getWord(due[0]);
    return {
      message: `I believe you've almost forgotten one of our rare discoveries… “${
        w?.word ?? "a word"
      }” has been fading from the shelves. Shall we revisit it?`,
      action: { label: "Revisit words", href: "/review" },
    };
  }

  if (discoveredCount === 0) {
    return {
      message:
        "Welcome, traveller. Millions of forgotten words sleep in these halls. Touch anything that glows — and let us wake the very first.",
      action: { label: "Wake the first word", href: "/room/nature" },
    };
  }

  if (streak.count >= 3) {
    return {
      message: `${streak.count} days you've returned to me — the halls have grown fond of your footsteps. A new adventure awaits.`,
      action: { label: "Today's adventure", href: "/daily" },
    };
  }

  const lines = [
    "The shelves rearrange themselves at night, you know. There is always something new to find.",
    "A word you master is a tool you keep for life — not merely for the examination hall.",
    "Curiosity, my friend, is the only key this library respects.",
    `Level ${level.level}, ${level.title}. Wear the title well.`,
  ];
  return {
    message: lines[discoveredCount % lines.length],
    action: { label: "Keep exploring", href: "/#halls" },
  };
}

/**
 * The librarian card: owl keeper + a speech bubble. Pass a `message`/`action`,
 * or omit them to use the contextual line derived from progress.
 */
export function Librarian({
  message,
  action,
  compact = false,
}: {
  message?: string;
  action?: { label: string; href: string };
  compact?: boolean;
}) {
  const derived = useLibrarianLine();
  const msg = message ?? derived.message;
  const act = action ?? (message ? undefined : derived.action);

  return (
    <div className={`flex items-start gap-3 ${compact ? "" : "sm:gap-5"}`}>
      <div className="shrink-0">
        <OwlKeeper size={compact ? 56 : 84} />
      </div>
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative flex-1 rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--parch)_88%,transparent)] p-4 shadow-soft"
      >
        {/* speech-bubble tail */}
        <div
          aria-hidden
          className="absolute -left-2 top-6 h-4 w-4 rotate-45 border-b border-l border-[var(--border)] bg-[var(--parch)]"
        />
        <div className="text-[11px] font-bold uppercase tracking-widest text-ink-faint">
          The Keeper of the Lexicon
        </div>
        <p className={`mt-1 leading-relaxed text-ink ${compact ? "text-sm" : "text-[15px]"}`}>
          {msg}
        </p>
        {act && (
          <Link
            href={act.href}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--c-primary)] px-4 py-1.5 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
          >
            {act.label} →
          </Link>
        )}
      </motion.div>
    </div>
  );
}
