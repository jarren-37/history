"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CHARACTERS } from "@/content/characters";
import { getPalette } from "@/content/palettes";
import { useApp } from "@/lib/store";
import { CharacterGraph } from "@/components/CharacterGraph";
import { CharacterPortrait } from "@/components/CharacterPortrait";
import { Reveal } from "@/components/ui";

export default function CharactersPage() {
  const { met, hydrated } = useApp();

  return (
    <div className="pb-24">
      <section className="relative overflow-hidden px-4 pt-10">
        <div className="aurora" />
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--c-primary)]">
            🎭 The cast of history
          </span>
          <h1 className="mt-4 gold-text font-display text-4xl font-black sm:text-5xl">
            Meet the people
          </h1>
          <p className="mx-auto mt-3 max-w-xl font-serif text-[#e4cfa2]">
            Remember history as characters, not names. Explore how their goals
            and choices connected — and clashed.
          </p>
          {hydrated && (
            <p className="mt-3 font-hand text-lg text-[#e0c07a]">
              You've met {met.length} of {CHARACTERS.length} figures so far.
            </p>
          )}
        </div>
      </section>

      {/* Relationship graph */}
      <section className="mx-auto mt-10 max-w-3xl px-4">
        <Reveal>
          <h2 className="mb-3 text-center font-display text-2xl font-black text-[#ecd6a4]">
            How they were connected
          </h2>
          <p className="mx-auto mb-5 max-w-md text-center font-serif text-sm italic text-[#cdb488]">
            Tap or hover a figure to light up their relationships.
          </p>
          <CharacterGraph />
        </Reveal>
      </section>

      {/* Roster */}
      <section className="mx-auto mt-16 max-w-5xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHARACTERS.map((c, i) => {
            const p = getPalette(c.palette);
            const isMet = hydrated && met.includes(c.id);
            return (
              <Reveal key={c.id} delay={Math.min(i * 0.04, 0.4)}>
                <Link href={`/characters/${c.id}`}>
                  <motion.article
                    whileHover={{ y: -5 }}
                    className="card group h-full overflow-hidden rounded-3xl"
                    style={
                      {
                        ["--c-primary" as string]: p.primary,
                        ["--c-secondary" as string]: p.secondary,
                        ["--c-deep" as string]: p.deep,
                        ["--c-surface" as string]: p.surface,
                      } as React.CSSProperties
                    }
                  >
                    <div
                      className="relative flex items-center gap-4 p-5"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--c-surface), transparent)",
                      }}
                    >
                      <CharacterPortrait
                        id={c.id}
                        size={68}
                        breathing={false}
                        className="shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-lg font-extrabold group-hover:text-[var(--c-primary)]">
                          {c.name}
                        </h3>
                        <p className="truncate text-xs font-bold uppercase tracking-wide text-[var(--c-primary)]">
                          {c.country}
                        </p>
                      </div>
                      {isMet && (
                        <span className="absolute right-3 top-3 rounded-full bg-[var(--c-primary)] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                          Met
                        </span>
                      )}
                    </div>
                    <div className="px-5 pb-5">
                      <p className="text-sm font-semibold text-[var(--text-soft)]">
                        {c.role}
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-sm text-[var(--text-faint)]">
                        {c.tagline}
                      </p>
                    </div>
                  </motion.article>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
