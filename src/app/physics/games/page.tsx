"use client";

import Link from "next/link";
import { GAMES } from "@/content/physics/games";
import { StationTopBar } from "@/components/science/ui";

export default function PhysicsGamesHub() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/physics" backLabel="The Observatory" />
      <div className="mb-5 flex items-center gap-3">
        <span className="text-4xl">🎲</span>
        <div>
          <h1 className="font-display text-3xl font-black" style={{ color: "var(--sci-ink)" }}>
            The Games Room
          </h1>
          <p className="opacity-80" style={{ color: "var(--sci-ink)" }}>
            Put the laws of the universe to the test.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {GAMES.map((g) => (
          <Link key={g.slug} href={`/physics/games/${g.slug}`} className="block">
            <div
              className="group h-full rounded-2xl border p-5 transition-transform hover:-translate-y-1"
              style={{ background: "var(--sci-panel)", borderColor: "var(--sci-border)", color: "var(--sci-ink)", backdropFilter: "blur(8px)" }}
            >
              <span className="text-4xl transition-transform group-hover:scale-110">{g.icon}</span>
              <h2 className="mt-2 font-display text-xl font-extrabold">{g.name}</h2>
              <p className="mt-1 text-sm opacity-80">{g.tagline}</p>
              <div className="mt-3 text-sm font-bold" style={{ color: "var(--sci-accent)" }}>Play →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
