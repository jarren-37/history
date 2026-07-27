"use client";

import Link from "next/link";
import { GAMES } from "@/content/games";
import { useApp } from "@/lib/store";
import { Reveal } from "@/components/ui";
import { AchievementToast } from "@/components/AchievementToast";

export default function GamesPage() {
  const { hydrated, discoveredCount } = useApp();

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-6 sm:px-6">
      <AchievementToast />
      <Reveal>
        <div className="mb-1 flex items-center gap-3">
          <span className="text-4xl">🎲</span>
          <h1 className="h-desk font-display text-4xl font-black">
            The Games Room
          </h1>
        </div>
        <p className="t-desk">
          Sharpen your words through play. Every game draws from the treasures
          you've discovered.
        </p>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {GAMES.map((g, i) => {
          const locked = hydrated && discoveredCount < g.minWords;
          return (
            <Reveal key={g.slug} delay={Math.min(i * 0.05, 0.3)}>
              <Link
                href={`/games/${g.slug}`}
                className="lift group flex h-full items-start gap-4 rounded-2xl border-2 border-[var(--border)] bg-[color-mix(in_srgb,var(--parch)_90%,transparent)] p-5"
              >
                <span className="text-4xl transition-transform group-hover:scale-110">
                  {g.icon}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-xl font-extrabold text-ink">
                      {g.name}
                    </h2>
                    {locked && (
                      <span className="rounded-full bg-[color-mix(in_srgb,var(--ink)_10%,transparent)] px-2 py-0.5 text-[10px] font-bold text-ink-faint">
                        🔒 {g.minWords} words
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">{g.tagline}</p>
                  <span className="mt-2 inline-block text-sm font-bold text-[var(--c-deep)]">
                    {locked ? "Discover more to unlock →" : "Play →"}
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
