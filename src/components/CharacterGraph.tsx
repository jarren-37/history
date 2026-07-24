"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CHARACTERS } from "@/content/characters";

const SENTIMENT: Record<string, string> = {
  friendly: "#2f8f83",
  tense: "#e07b39",
  hostile: "#c0392b",
};

/** Interactive radial graph of the historical figures and their relationships. */
export function CharacterGraph() {
  const [focus, setFocus] = useState<string | null>(null);

  const size = 460;
  const cx = size / 2;
  const cy = size / 2;
  const r = 170;

  const nodes = CHARACTERS.map((c, i) => {
    const angle = (i / CHARACTERS.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...c,
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  });

  const pos = (id: string) => nodes.find((n) => n.id === id);

  const edges: {
    from: string;
    to: string;
    sentiment: string;
    relation: string;
  }[] = [];
  for (const c of CHARACTERS) {
    for (const rel of c.relationships) {
      if (pos(rel.to)) {
        edges.push({
          from: c.id,
          to: rel.to,
          sentiment: rel.sentiment,
          relation: rel.relation,
        });
      }
    }
  }

  const isDim = (id: string) =>
    focus !== null &&
    focus !== id &&
    !edges.some(
      (e) =>
        (e.from === focus && e.to === id) || (e.to === focus && e.from === id)
    );

  return (
    <div className="card overflow-hidden rounded-3xl p-3 sm:p-5">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="mx-auto h-auto w-full max-w-xl"
      >
        {/* edges */}
        {edges.map((e, i) => {
          const a = pos(e.from)!;
          const b = pos(e.to)!;
          const active =
            focus === null || focus === e.from || focus === e.to;
          return (
            <motion.line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={SENTIMENT[e.sentiment]}
              strokeWidth={active ? 2.5 : 1}
              strokeDasharray={e.sentiment === "hostile" ? "6 5" : undefined}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: active ? 0.75 : 0.12 }}
              transition={{ duration: 0.8, delay: i * 0.03 }}
            />
          );
        })}

        {/* nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: isDim(n.id) ? 0.25 : 1 }}
            transition={{ delay: 0.2 + i * 0.04, type: "spring", stiffness: 200 }}
            onMouseEnter={() => setFocus(n.id)}
            onMouseLeave={() => setFocus(null)}
            onClick={() => setFocus(focus === n.id ? null : n.id)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r={focus === n.id ? 30 : 26}
              fill="var(--card)"
              stroke={getPaletteColor(n.palette)}
              strokeWidth={focus === n.id ? 4 : 2.5}
            />
            <text
              x={n.x}
              y={n.y + 7}
              textAnchor="middle"
              fontSize="22"
            >
              {n.emoji}
            </text>
            <text
              x={n.x}
              y={n.y + 46}
              textAnchor="middle"
              fontSize="11"
              fontWeight="800"
              fill="var(--text)"
            >
              {n.name.split(" ").slice(-1)[0]}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Legend + focus detail */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
        {Object.entries(SENTIMENT).map(([k, v]) => (
          <span key={k} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-6 rounded-full"
              style={{ background: v }}
            />
            <span className="capitalize text-[var(--text-soft)]">{k}</span>
          </span>
        ))}
      </div>

      {focus && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl bg-[var(--c-surface)] p-4 text-center"
        >
          {(() => {
            const c = CHARACTERS.find((x) => x.id === focus)!;
            const rels = edges.filter(
              (e) => e.from === focus || e.to === focus
            );
            return (
              <>
                <p className="font-display text-lg font-extrabold">
                  {c.emoji} {c.name}
                </p>
                <p className="text-sm text-[var(--text-soft)]">{c.tagline}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {rels.map((e, i) => {
                    const otherId = e.from === focus ? e.to : e.from;
                    const other = CHARACTERS.find((x) => x.id === otherId);
                    return (
                      <span
                        key={i}
                        className="rounded-full border px-2.5 py-1 text-xs font-semibold"
                        style={{ borderColor: SENTIMENT[e.sentiment] }}
                      >
                        {e.relation} {other?.emoji}
                      </span>
                    );
                  })}
                </div>
                <Link
                  href={`/characters/${c.id}`}
                  className="mt-3 inline-block rounded-full bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-4 py-1.5 text-sm font-bold text-white"
                >
                  Open profile →
                </Link>
              </>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}

function getPaletteColor(key: string) {
  const map: Record<string, string> = {
    versailles: "#d6455b",
    hitler: "#c0392b",
    japan: "#e07b39",
    coldwar: "#2f6fb0",
    berlin: "#5c6b7a",
    korea: "#2f8f83",
    cuba: "#4257a8",
    collapse: "#8459b3",
    neutral: "#8a7a63",
  };
  return map[key] ?? "#8a7a63";
}
