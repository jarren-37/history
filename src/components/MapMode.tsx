"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getPalette, type PaletteKey } from "@/content/palettes";

/**
 * A stylised, schematic world map (not geographically exact) built for clarity.
 * Each scenario animates arrows and regions to "replay" a syllabus event.
 */

interface Region {
  id: string;
  label: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

const REGIONS: Region[] = [
  { id: "usa", label: "USA", cx: 150, cy: 150, rx: 70, ry: 45 },
  { id: "cuba", label: "Cuba", cx: 210, cy: 215, rx: 18, ry: 9 },
  { id: "britain", label: "Britain", cx: 400, cy: 110, rx: 20, ry: 14 },
  { id: "france", label: "France", cx: 420, cy: 150, rx: 24, ry: 18 },
  { id: "germany", label: "Germany", cx: 470, cy: 130, rx: 26, ry: 20 },
  { id: "poland", label: "Poland", cx: 520, cy: 120, rx: 24, ry: 16 },
  { id: "ussr", label: "USSR", cx: 640, cy: 120, rx: 90, ry: 55 },
  { id: "japan", label: "Japan", cx: 720, cy: 230, rx: 22, ry: 16 },
  { id: "china", label: "China", cx: 650, cy: 240, rx: 40, ry: 26 },
];

interface Arrow {
  from: string;
  to: string;
  label?: string;
  /** curve offset. */
  bend?: number;
}

interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  palette: PaletteKey;
  chapter: string;
  /** highlighted regions -> role colour. */
  highlight: Record<string, "aggressor" | "target" | "west" | "east">;
  arrows: Arrow[];
  planes?: boolean; // Berlin airlift
  ring?: string; // blockade ring around region id
  caption: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "german-expansion",
    title: "German expansion",
    subtitle: "1936 – 1939",
    palette: "hitler",
    chapter: "rise-of-hitler",
    highlight: {
      germany: "aggressor",
      france: "target",
      poland: "target",
    },
    arrows: [
      { from: "germany", to: "france", bend: 30 },
      { from: "germany", to: "poland", bend: -24 },
    ],
    caption:
      "Step by step, Hitler broke Versailles — remilitarising the Rhineland, expanding, and finally invading Poland in 1939.",
  },
  {
    id: "japanese-expansion",
    title: "Japanese expansion",
    subtitle: "1931 – 1941",
    palette: "japan",
    chapter: "japans-road-to-war",
    highlight: {
      japan: "aggressor",
      china: "target",
      usa: "target",
    },
    arrows: [
      { from: "japan", to: "china", bend: -20 },
      { from: "japan", to: "usa", bend: 60, label: "Pearl Harbor" },
    ],
    caption:
      "Hungry for resources, Japan seized Manchuria and China, then struck Pearl Harbor in 1941, bringing the USA into the war.",
  },
  {
    id: "iron-curtain",
    title: "A divided Europe",
    subtitle: "NATO vs the Warsaw Pact",
    palette: "coldwar",
    chapter: "origins-of-the-cold-war",
    highlight: {
      usa: "west",
      britain: "west",
      france: "west",
      germany: "west",
      ussr: "east",
      poland: "east",
    },
    arrows: [],
    caption:
      "Europe split into two camps: the Western allies (later NATO) and the Soviet-led East — the 'Iron Curtain'.",
  },
  {
    id: "berlin-airlift",
    title: "The Berlin Airlift",
    subtitle: "1948 – 1949",
    palette: "berlin",
    chapter: "berlin-blockade",
    highlight: { germany: "target", ussr: "aggressor" },
    arrows: [{ from: "france", to: "germany", bend: -30, label: "supplies by air" }],
    planes: true,
    caption:
      "Stalin blockaded West Berlin, deep inside the Soviet zone. The West flew in supplies for nearly a year until he backed down.",
  },
  {
    id: "cuban-crisis",
    title: "Cuban Missile Crisis",
    subtitle: "October 1962",
    palette: "cuba",
    chapter: "cuban-missile-crisis",
    highlight: { usa: "west", cuba: "aggressor", ussr: "east" },
    arrows: [{ from: "ussr", to: "cuba", bend: 80, label: "missiles" }],
    ring: "cuba",
    caption:
      "The USSR placed missiles in Cuba, 90 miles from the USA. Kennedy's naval blockade forced a tense, negotiated retreat.",
  },
];

const ROLE_COLOR: Record<string, string> = {
  aggressor: "#c0392b",
  target: "#e07b39",
  west: "#2f6fb0",
  east: "#7c2233",
};

export function MapMode() {
  const [active, setActive] = useState(0);
  const s = SCENARIOS[active];
  const p = getPalette(s.palette);
  const region = (id: string) => REGIONS.find((r) => r.id === id)!;

  return (
    <div
      style={
        {
          ["--c-primary" as string]: p.primary,
          ["--c-secondary" as string]: p.secondary,
          ["--c-deep" as string]: p.deep,
          ["--c-surface" as string]: p.surface,
        } as React.CSSProperties
      }
    >
      {/* Scenario chips */}
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {SCENARIOS.map((sc, i) => (
          <button
            key={sc.id}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
              i === active
                ? "bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] text-white shadow-soft"
                : "border border-[var(--border)] bg-[var(--card)] hover:border-[var(--c-primary)]"
            }`}
          >
            {sc.title}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden rounded-3xl">
        <div
          className="relative"
          style={{
            background:
              "linear-gradient(160deg, var(--c-surface), color-mix(in srgb, var(--c-secondary) 30%, white))",
          }}
        >
          <svg viewBox="0 0 800 340" className="h-auto w-full">
            {/* ocean grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M40 0 H0 V40"
                  fill="none"
                  stroke="var(--c-primary)"
                  strokeOpacity="0.08"
                  strokeWidth="1"
                />
              </pattern>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0 0 L6 3 L0 6 Z" fill="var(--c-deep)" />
              </marker>
            </defs>
            <rect width="800" height="340" fill="url(#grid)" />

            {/* regions */}
            {REGIONS.map((r) => {
              const role = s.highlight[r.id];
              const color = role ? ROLE_COLOR[role] : undefined;
              return (
                <g key={r.id}>
                  <motion.ellipse
                    cx={r.cx}
                    cy={r.cy}
                    rx={r.rx}
                    ry={r.ry}
                    animate={{
                      fill: color ?? "var(--c-secondary)",
                      opacity: color ? 0.9 : 0.4,
                    }}
                    transition={{ duration: 0.6 }}
                    stroke="var(--c-deep)"
                    strokeWidth="1.5"
                    strokeOpacity={0.3}
                  />
                  <text
                    x={r.cx}
                    y={r.cy + 4}
                    textAnchor="middle"
                    fontSize={r.rx > 30 ? 15 : 11}
                    fontWeight="800"
                    fill={color ? "#fff" : "var(--c-deep)"}
                  >
                    {r.label}
                  </text>
                </g>
              );
            })}

            {/* blockade ring */}
            {s.ring && (
              <motion.circle
                cx={region(s.ring).cx}
                cy={region(s.ring).cy}
                r={40}
                fill="none"
                stroke="var(--c-deep)"
                strokeWidth="3"
                strokeDasharray="8 6"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                transition={{
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                }}
                style={{ transformOrigin: `${region(s.ring).cx}px ${region(s.ring).cy}px` }}
              />
            )}

            {/* arrows */}
            <AnimatePresence mode="wait">
              <g key={s.id}>
                {s.arrows.map((a, i) => {
                  const from = region(a.from);
                  const to = region(a.to);
                  const mx = (from.cx + to.cx) / 2;
                  const my = (from.cy + to.cy) / 2 - (a.bend ?? 0);
                  const d = `M ${from.cx} ${from.cy} Q ${mx} ${my} ${to.cx} ${to.cy}`;
                  return (
                    <g key={i}>
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="var(--c-deep)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        markerEnd="url(#arrowhead)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.2, delay: i * 0.4 }}
                      />
                      {a.label && (
                        <motion.text
                          x={mx}
                          y={my - 6}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="800"
                          fill="var(--c-deep)"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 + i * 0.4 }}
                        >
                          {a.label}
                        </motion.text>
                      )}
                    </g>
                  );
                })}

                {/* airlift planes */}
                {s.planes &&
                  [0, 1, 2].map((i) => (
                    <motion.text
                      key={i}
                      fontSize="18"
                      initial={{ x: region("france").cx, y: region("france").cy }}
                      animate={{
                        x: region("germany").cx,
                        y: region("germany").cy,
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "linear",
                      }}
                    >
                      ✈️
                    </motion.text>
                  ))}
              </g>
            </AnimatePresence>
          </svg>
        </div>

        {/* caption */}
        <AnimatePresence mode="wait">
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-6"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--c-primary)]">
              {s.subtitle}
            </p>
            <h3 className="font-display text-2xl font-extrabold">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-[var(--text-soft)]">
              {s.caption}
            </p>
            <a
              href={`/chapters/${s.chapter}`}
              className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-5 py-2.5 font-bold text-white transition-transform hover:scale-[1.03]"
            >
              Read the chapter →
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
