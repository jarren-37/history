"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { STATIONS, MASTERPIECE } from "@/content/physics/stations";
import { useObservatory, inventorTitle } from "@/lib/physics/store";

export default function ObservatoryHome() {
  const { hydrated, xp, level, completed, isDone, streak } = useObservatory();
  const doneCount = STATIONS.filter((s) => completed.includes(s.id)).length;
  const allStationsDone = doneCount === STATIONS.length;

  return (
    <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6">
      {/* drifting sparks */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute h-1 w-1 rounded-full"
          style={{ left: `${(i * 47) % 100}%`, top: `${(i * 29) % 90}%`, background: "var(--sci-glow)" }}
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: 3 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* Opening */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative text-center"
      >
        <motion.div
          className="text-6xl"
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          ⚙️
        </motion.div>
        <h1 className="mt-3 font-display text-5xl font-black tracking-tight sm:text-6xl" style={{ color: "var(--sci-ink)" }}>
          The Inventor&apos;s Observatory
        </h1>
        <p className="mx-auto mt-3 max-w-xl font-hand text-2xl" style={{ color: "var(--sci-accent)" }}>
          Physics is discovering the rules that govern the universe
        </p>
        <p className="mx-auto mt-4 max-w-2xl italic leading-relaxed opacity-85" style={{ color: "var(--sci-ink)" }}>
          &ldquo;Listen — the great clock is ticking and the telescope is trained
          on the stars. The universe follows rules, apprentice. Let us pull its
          levers and discover them for ourselves.&rdquo;
        </p>
      </motion.section>

      {/* Inventor rank */}
      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <RankCard label="Rank" value={hydrated ? inventorTitle(level.level) : "Apprentice"} sub={hydrated ? `Level ${level.level}` : ""} icon="🎓" />
        <RankCard label="Charge (XP)" value={`${xp}`} sub={hydrated ? `${level.into}/${level.span} to next` : ""} icon="⚡" />
        <RankCard label="Stations" value={`${doneCount}/${STATIONS.length}`} sub="mastered" icon="🔧" />
        <RankCard label="Streak" value={hydrated ? `${streak.count}` : "—"} sub="days" icon="🔥" />
      </section>

      {/* Stations */}
      <section className="mt-8">
        <h2 className="mb-3 font-display text-2xl font-extrabold" style={{ color: "var(--sci-ink)" }}>
          Stations of the Observatory
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {STATIONS.map((s, i) => {
            const done = isDone(s.id);
            return (
              <motion.div key={s.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.06 }}>
                <Link href={`/physics/lab/${s.id}`} className="block h-full">
                  <div
                    className="group relative h-full overflow-hidden rounded-2xl border p-5 transition-transform hover:-translate-y-1"
                    style={{ background: "var(--sci-panel)", borderColor: done ? "#10b981" : "var(--sci-border)", color: "var(--sci-ink)", backdropFilter: "blur(8px)" }}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-4xl transition-transform group-hover:scale-110">{s.icon}</span>
                      {done && <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">✓ Mastered</span>}
                    </div>
                    <div className="mt-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--sci-accent)" }}>{s.topic}</div>
                    <h3 className="font-display text-xl font-extrabold">{s.name}</h3>
                    <p className="mt-1 text-sm opacity-80">{s.tagline}</p>
                    <div className="mt-3 text-sm font-bold" style={{ color: "var(--sci-accent)" }}>
                      {done ? "Revisit →" : `Enter · +${s.xp} XP →`}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Masterpiece */}
      <section className="mt-6">
        <Link href="/physics/masterpiece" className="block">
          <div
            className="relative overflow-hidden rounded-2xl border-2 p-6 transition-transform hover:-translate-y-1"
            style={{ borderColor: "var(--sci-accent)", background: "linear-gradient(120deg, color-mix(in srgb, var(--sci-accent) 22%, transparent), var(--sci-panel))", color: "var(--sci-ink)" }}
          >
            <div className="flex items-center gap-4">
              <span className="text-5xl">🏆</span>
              <div className="flex-1">
                <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--sci-accent)" }}>
                  Masterpiece Challenge · {MASTERPIECE.topic}
                </div>
                <h3 className="font-display text-2xl font-black">{MASTERPIECE.name}</h3>
                <p className="mt-1 text-sm opacity-85">{MASTERPIECE.intro}</p>
              </div>
            </div>
            <div className="mt-3 text-sm font-bold" style={{ color: "var(--sci-accent)" }}>
              {isDone(MASTERPIECE.id)
                ? "✓ Completed — revisit →"
                : allStationsDone
                  ? `Take the challenge · +${MASTERPIECE.xp} XP →`
                  : `Best attempted after the stations · +${MASTERPIECE.xp} XP →`}
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}

function RankCard({ label, value, sub, icon }: { label: string; value: string; sub?: string; icon: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border p-3.5" style={{ background: "var(--sci-panel)", borderColor: "var(--sci-border)", color: "var(--sci-ink)", backdropFilter: "blur(8px)" }}>
      <span className="text-2xl">{icon}</span>
      <div className="min-w-0">
        <div className="font-display text-lg font-extrabold leading-none">{value}</div>
        <div className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-wide opacity-70">{label}</div>
        {sub && <div className="truncate text-[11px] opacity-60">{sub}</div>}
      </div>
    </div>
  );
}
