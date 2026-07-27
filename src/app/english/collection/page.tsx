"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WORDS } from "@/content/english/words";
import { ROOMS } from "@/content/english/rooms";
import { RARITY_ORDER, rarityMeta } from "@/content/english/rarity";
import type { Rarity, RoomId, Word } from "@/content/english/types";
import { useApp } from "@/lib/english/store";
import { isMastered, isDue } from "@/lib/english/progression";
import { WordTile } from "@/components/english/WordTile";
import { WordReveal } from "@/components/english/WordReveal";
import { AchievementToast } from "@/components/english/AchievementToast";
import { Reveal } from "@/components/english/ui";

type Status = "all" | "found" | "favourites" | "mastered" | "due";

export default function CollectionPage() {
  const { has, collection, discoveredCount } = useApp();
  const [room, setRoom] = useState<RoomId | "all">("all");
  const [rarity, setRarity] = useState<Rarity | "all">("all");
  const [status, setStatus] = useState<Status>("all");
  const [query, setQuery] = useState("");
  const [viewing, setViewing] = useState<Word | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WORDS.filter((w) => {
      if (room !== "all" && w.room !== room) return false;
      if (rarity !== "all" && w.rarity !== rarity) return false;
      const prog = collection[w.id];
      if (status === "found" && !prog) return false;
      if (status === "favourites" && !prog?.favourite) return false;
      if (status === "mastered" && !(prog && isMastered(prog.review.box)))
        return false;
      if (status === "due" && !(prog && isDue(prog.review))) return false;
      // Search only matches words you've actually discovered (no cheating!).
      if (q) {
        if (!prog) return false;
        if (!w.word.toLowerCase().includes(q) && !w.meaning.toLowerCase().includes(q))
          return false;
      }
      return true;
    });
  }, [room, rarity, status, query, collection]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6">
      <AchievementToast />

      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="h-desk font-display text-4xl font-black">
              Your Collection
            </h1>
            <p className="t-desk">
              {discoveredCount} of {WORDS.length} word treasures uncovered.
            </p>
          </div>
        </div>
      </Reveal>

      {/* rarity legend */}
      <Reveal delay={0.05}>
        <div className="mt-4 flex flex-wrap gap-2">
          {RARITY_ORDER.map((r) => {
            const m = rarityMeta(r);
            const total = WORDS.filter((w) => w.rarity === r).length;
            const got = WORDS.filter(
              (w) => w.rarity === r && has(w.id)
            ).length;
            if (total === 0) return null;
            return (
              <div
                key={r}
                className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold"
                style={{
                  color: m.color,
                  borderColor: m.color,
                  background: `color-mix(in srgb, ${m.glow} 20%, transparent)`,
                }}
              >
                <span aria-hidden>{m.motif}</span>
                {m.label}
                <span className="opacity-70">
                  {got}/{total}
                </span>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* filters */}
      <div className="mt-5 space-y-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your discovered words…"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--parch)] px-4 py-2.5 text-ink placeholder:text-ink-faint focus:border-[var(--gold)] focus:outline-none"
        />
        <FilterRow label="Status">
          {(["all", "found", "favourites", "mastered", "due"] as Status[]).map(
            (s) => (
              <Chip key={s} active={status === s} onClick={() => setStatus(s)}>
                {s === "all" ? "All" : s[0].toUpperCase() + s.slice(1)}
              </Chip>
            )
          )}
        </FilterRow>
        <FilterRow label="Hall">
          <Chip active={room === "all"} onClick={() => setRoom("all")}>
            All halls
          </Chip>
          {ROOMS.map((r) => (
            <Chip key={r.id} active={room === r.id} onClick={() => setRoom(r.id)}>
              {r.motif} {r.theme}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Rarity">
          <Chip active={rarity === "all"} onClick={() => setRarity("all")}>
            All
          </Chip>
          {RARITY_ORDER.filter((r) => WORDS.some((w) => w.rarity === r)).map(
            (r) => (
              <Chip key={r} active={rarity === r} onClick={() => setRarity(r)}>
                {rarityMeta(r).motif} {rarityMeta(r).label}
              </Chip>
            )
          )}
        </FilterRow>
      </div>

      {/* grid */}
      {filtered.length === 0 ? (
        <div className="t-desk mt-10 rounded-2xl border border-dashed border-[rgba(236,214,172,0.3)] p-10 text-center">
          <div className="text-4xl">🕯️</div>
          <p className="mt-2">
            No treasures match that filter yet. Explore the halls to discover
            more!
          </p>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
          {filtered.map((w, i) => (
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
      )}

      <AnimatePresence>
        {viewing && (
          <WordReveal
            word={viewing}
            xpGained={0}
            onClose={() => setViewing(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="lbl-desk mr-1 text-[11px] font-bold uppercase tracking-widest">
        {label}
      </span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm font-semibold transition-colors ${
        active
          ? "border-[var(--gold)] bg-[var(--c-primary)] text-white"
          : "border-[var(--border)] bg-[var(--parch)] text-ink-soft hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
