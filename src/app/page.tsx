"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ROOMS } from "@/content/rooms";
import { WORDS } from "@/content/words";
import { getPalette, paletteVars } from "@/content/palettes";
import { useApp, todayKey } from "@/lib/store";
import { wordOfDay } from "@/lib/daily";
import { Reveal } from "@/components/ui";
import { Librarian } from "@/components/Librarian";
import { AchievementToast } from "@/components/AchievementToast";

export default function HomePage() {
  const {
    hydrated,
    discoveredCount,
    masteredCount,
    level,
    streak,
    has,
    dueWordIds,
  } = useApp();

  const total = WORDS.length;
  const due = hydrated ? dueWordIds().length : 0;
  const wotd = wordOfDay(todayKey());

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6">
      <AchievementToast />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-4xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--parch)_86%,transparent)] px-6 py-10 text-center shadow-soft-lg sm:px-10 sm:py-14">
        <div className="aurora" />
        {/* floating letters */}
        {["A", "e", "Q", "z", "&", "ß", "æ", "W"].map((ch, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute font-display text-3xl font-bold text-[var(--gold)] opacity-20 sm:text-5xl"
            style={{ left: `${8 + i * 11}%`, top: `${(i % 3) * 26 + 8}%` }}
            animate={{ y: [0, -14, 0], rotate: [0, (i - 4) * 4, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {ch}
          </motion.span>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="text-5xl">📖</div>
          <h1 className="gold-text mt-3 font-display text-5xl font-black tracking-tight sm:text-7xl">
            Lexicon
          </h1>
          <p className="mx-auto mt-2 max-w-xl font-hand text-2xl text-ink-soft sm:text-3xl">
            The Vocabulary Adventure
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft sm:text-lg">
            An ancient library where words are treasures. Explore its halls,
            uncover rare vocabulary, and become a master of the English language
            — for the O-Level, and for life.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#halls"
              className="rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-7 py-3.5 font-display text-lg font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              {discoveredCount > 0
                ? "Continue the adventure"
                : "Begin your adventure"}
            </Link>
            <Link
              href="/daily"
              className="rounded-full border-2 border-[var(--gold)] px-6 py-3 font-display text-base font-bold text-[var(--c-deep)] transition-transform hover:scale-105 active:scale-95"
            >
              🗓️ Today's quest
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Scholar stats ── */}
      <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon="🎓"
          label={hydrated ? level.title : "Scholar"}
          value={hydrated ? `Level ${level.level}` : "Level —"}
          sub={hydrated ? `${level.into}/${level.span} XP to next` : ""}
        />
        <StatCard
          icon="📚"
          label="Words found"
          value={`${discoveredCount}/${total}`}
          sub={`${Math.round((discoveredCount / total) * 100)}% of the Lexicon`}
        />
        <StatCard
          icon="👑"
          label="Mastered"
          value={`${masteredCount}`}
          sub="fully learned"
        />
        <StatCard
          icon="🔥"
          label="Day streak"
          value={hydrated ? `${streak.count}` : "—"}
          sub={
            due > 0 ? `${due} word${due > 1 ? "s" : ""} to review` : "all reviewed"
          }
          highlight={due > 0}
          href={due > 0 ? "/review" : undefined}
        />
      </section>

      {/* ── Librarian + Daily ── */}
      <section className="mt-6 grid gap-4 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="page p-4 sm:p-5">
            <Librarian />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-2">
          <Link
            href="/daily"
            className="lift block h-full rounded-2xl border border-[var(--border)] p-5"
            style={{
              ...paletteVars(wotd.room),
              background:
                "linear-gradient(180deg, var(--c-surface), color-mix(in srgb, var(--c-primary) 12%, var(--parch)))",
            }}
          >
            <div className="text-[11px] font-bold uppercase tracking-widest text-ink-faint">
              Word of the Day
            </div>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-4xl">{wotd.motif}</span>
              <div>
                <div className="font-display text-2xl font-extrabold text-ink">
                  {has(wotd.id) ? wotd.word : "A word awaits…"}
                </div>
                <div className="font-hand text-lg text-ink-soft">
                  {has(wotd.id) ? wotd.pronunciation : "Claim today's adventure"}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              {has(wotd.id)
                ? wotd.meaning
                : "A new quest, a hidden word and bonus treasure are waiting in today's adventure."}
            </p>
            <span className="mt-3 inline-block font-bold text-[var(--c-deep)]">
              Open today's quest →
            </span>
          </Link>
        </Reveal>
      </section>

      {/* ── Halls ── */}
      <section id="halls" className="mt-10 scroll-mt-20">
        <Reveal>
          <div className="mb-4">
            <h2 className="h-desk font-display text-3xl font-extrabold">
              The Halls of the Lexicon
            </h2>
            <p className="t-desk">
              Every hall is a world of words. Step inside and start discovering.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((room, i) => {
            const found = room.objects.filter((o) => has(o.wordId)).length;
            const totalInRoom = room.objects.length;
            const pal = getPalette(room.palette);
            const complete = found === totalInRoom && totalInRoom > 0;
            return (
              <Reveal key={room.id} delay={Math.min(i * 0.04, 0.3)}>
                <Link
                  href={`/room/${room.id}`}
                  className="lift group block overflow-hidden rounded-3xl border-2"
                  style={{
                    ...paletteVars(room.palette),
                    borderColor: `color-mix(in srgb, ${pal.primary} 45%, transparent)`,
                    background: `linear-gradient(160deg, ${pal.surface}, color-mix(in srgb, ${pal.primary} 20%, var(--parch)))`,
                  }}
                >
                  <div
                    className="relative flex h-28 items-center justify-center overflow-hidden"
                    style={{
                      background: `radial-gradient(80% 120% at 50% 0%, ${pal.secondary}, transparent 70%)`,
                    }}
                  >
                    <span className="text-6xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      {room.motif}
                    </span>
                    {complete && (
                      <span className="absolute right-2 top-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                        ✓ Complete
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div
                      className="text-[11px] font-bold uppercase tracking-widest"
                      style={{ color: pal.deep }}
                    >
                      {room.theme}
                    </div>
                    <div className="font-display text-lg font-extrabold leading-tight text-ink">
                      {room.name}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                      {room.tagline}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--ink)_12%,transparent)]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(found / totalInRoom) * 100}%`,
                            background: pal.primary,
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-bold"
                        style={{ color: pal.deep }}
                      >
                        {found}/{totalInRoom}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  highlight,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  href?: string;
}) {
  const inner = (
    <div
      className={`page flex h-full items-center gap-3 p-3.5 sm:p-4 ${
        highlight ? "ring-2 ring-[var(--wax)]" : ""
      }`}
    >
      <span className="text-3xl">{icon}</span>
      <div className="min-w-0">
        <div className="font-display text-xl font-extrabold leading-none text-ink">
          {value}
        </div>
        <div className="mt-1 truncate text-xs font-bold uppercase tracking-wide text-ink-faint">
          {label}
        </div>
        {sub && (
          <div className="mt-0.5 truncate text-[11px] text-ink-soft">{sub}</div>
        )}
      </div>
    </div>
  );
  return href ? (
    <Link href={href} className="lift block">
      {inner}
    </Link>
  ) : (
    inner
  );
}
