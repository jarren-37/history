"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import type { Room, Word } from "@/content/types";
import { ROOMS } from "@/content/rooms";
import { wordsInRoom } from "@/content/words";
import { getPalette, paletteVars } from "@/content/palettes";
import { useApp } from "@/lib/store";
import { RoomScene } from "./RoomScene";
import { WordTile } from "./WordTile";
import { WordReveal } from "./WordReveal";
import { AchievementToast } from "./AchievementToast";
import { Reveal } from "./ui";

export function RoomView({ room }: { room: Room }) {
  const { has } = useApp();
  const words = wordsInRoom(room.id);
  const pal = getPalette(room.palette);
  const [viewing, setViewing] = useState<Word | null>(null);

  const idx = ROOMS.findIndex((r) => r.id === room.id);
  const prev = ROOMS[(idx - 1 + ROOMS.length) % ROOMS.length];
  const next = ROOMS[(idx + 1) % ROOMS.length];
  const found = words.filter((w) => has(w.id)).length;

  return (
    <div
      className="mx-auto max-w-5xl px-4 pb-20 pt-6 sm:px-6"
      style={paletteVars(room.palette)}
    >
      <AchievementToast />

      <Link
        href="/#halls"
        className="lnk-desk mb-3 inline-flex items-center gap-1.5 text-sm font-bold"
      >
        ← All halls
      </Link>

      {/* header */}
      <Reveal>
        <div className="flex items-start gap-4">
          <span className="text-5xl">{room.motif}</span>
          <div className="flex-1">
            <div
              className="text-[11px] font-bold uppercase tracking-widest"
              style={{ color: pal.secondary }}
            >
              {room.theme} · {room.mood}
            </div>
            <h1 className="h-desk font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              {room.name}
            </h1>
            <p className="t-desk mt-2 max-w-2xl leading-relaxed">{room.intro}</p>
          </div>
        </div>
      </Reveal>

      {/* the explorable scene */}
      <Reveal delay={0.05}>
        <div className="mt-5">
          <RoomScene room={room} />
          <p className="t-desk mt-2 text-center text-sm">
            ✨ Tap the glowing objects to uncover the words hidden in this hall.
          </p>
        </div>
      </Reveal>

      {/* treasures of the hall */}
      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="h-desk font-display text-2xl font-extrabold">
            Treasures of this hall
          </h2>
          <span className="text-sm font-bold" style={{ color: pal.secondary }}>
            {found}/{words.length} found
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {words.map((w, i) => (
            <WordTile
              key={w.id}
              word={w}
              index={i}
              onClick={() => {
                if (has(w.id)) setViewing(w);
              }}
            />
          ))}
        </div>
      </section>

      {/* hall navigation */}
      <nav className="mt-10 flex items-center justify-between gap-3">
        <Link
          href={`/room/${prev.id}`}
          className="lift flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--parch)] px-4 py-2.5 text-sm font-bold text-ink"
        >
          <span className="text-xl">{prev.motif}</span>
          <span className="hidden sm:inline">← {prev.theme}</span>
        </Link>
        <Link
          href="/collection"
          className="lnk-desk text-sm font-bold"
        >
          View collection
        </Link>
        <Link
          href={`/room/${next.id}`}
          className="lift flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--parch)] px-4 py-2.5 text-sm font-bold text-ink"
        >
          <span className="hidden sm:inline">{next.theme} →</span>
          <span className="text-xl">{next.motif}</span>
        </Link>
      </nav>

      <AnimatePresence>
        {viewing && (
          <WordReveal word={viewing} xpGained={0} onClose={() => setViewing(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
