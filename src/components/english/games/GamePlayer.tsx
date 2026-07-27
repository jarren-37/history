"use client";

import Link from "next/link";
import { useMemo } from "react";
import { getWord } from "@/content/english/words";
import { getGame } from "@/content/english/games";
import type { Word } from "@/content/english/types";
import { useApp } from "@/lib/english/store";
import { AchievementToast } from "@/components/english/AchievementToast";
import { WordDuel } from "./WordDuel";
import { ContextDetective } from "./ContextDetective";
import { SynonymMatch } from "./SynonymMatch";
import { LostLetters } from "./LostLetters";

export function GamePlayer({ slug }: { slug: string }) {
  const { hydrated, collection } = useApp();
  const game = getGame(slug);

  const pool = useMemo<Word[]>(
    () =>
      Object.keys(collection)
        .map((id) => getWord(id))
        .filter((w): w is Word => Boolean(w)),
    [collection]
  );

  if (!game) return null;

  const ready = pool.length >= game.minWords;

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-6 sm:px-6">
      <AchievementToast />
      <Link
        href="/english/games"
        className="lnk-desk mb-3 inline-flex items-center gap-1.5 text-sm font-bold"
      >
        ← All games
      </Link>

      <div className="mb-5 flex items-center gap-3">
        <span className="text-4xl">{game.icon}</span>
        <div>
          <h1 className="h-desk font-display text-3xl font-black">
            {game.name}
          </h1>
          <p className="t-desk">{game.tagline}</p>
        </div>
      </div>

      {!hydrated ? (
        <div className="page p-8 text-center text-ink-soft">Lighting the lamps…</div>
      ) : !ready ? (
        <div className="page page-frame p-8 text-center">
          <div className="text-5xl">🔒</div>
          <h2 className="mt-3 font-display text-2xl font-black text-ink">
            A few more treasures first
          </h2>
          <p className="mx-auto mt-2 max-w-md text-ink-soft">
            This game needs at least <strong>{game.minWords}</strong> discovered
            words to draw from. You have <strong>{pool.length}</strong>. Explore
            the halls to find a few more!
          </p>
          <Link
            href="/english/#halls"
            className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-7 py-3 font-display text-lg font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105"
          >
            Explore the halls
          </Link>
        </div>
      ) : (
        <>
          {slug === "duel" && <WordDuel pool={pool} />}
          {slug === "detective" && <ContextDetective pool={pool} />}
          {slug === "synonyms" && <SynonymMatch pool={pool} />}
          {slug === "letters" && <LostLetters pool={pool} />}
        </>
      )}
    </div>
  );
}
