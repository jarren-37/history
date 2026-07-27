"use client";

import { motion } from "framer-motion";
import type { SceneKey } from "@/content/history/types";
import { VB, Sky, FloatCloud, Figure, Ground, Sparkle } from "./primitives";

/**
 * Hand-built animated illustrations, one per SceneKey. They use the ambient
 * palette CSS variables (--c-primary / --c-secondary / --c-deep / --c-surface)
 * so every scene automatically matches its chapter's colour identity.
 *
 * These are deliberately lightweight SVG + Framer Motion rather than external
 * Lottie files, so the whole storybook works offline with no network requests.
 */
export function SceneIllustration({
  scene,
  className = "",
}: {
  scene: SceneKey;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl ${className}`}
      style={{
        background:
          "linear-gradient(160deg, var(--c-surface), color-mix(in srgb, var(--c-secondary) 35%, white))",
      }}
    >
      <svg viewBox={VB} className="h-full w-full" role="img" aria-hidden>
        <Sky />
        {renderScene(scene)}
      </svg>
      {/* editorial depth: soft vignette + top-light inner highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -40px 60px -40px rgba(40,30,50,0.22), inset 0 0 0 1px rgba(255,255,255,0.35)",
        }}
      />
    </div>
  );
}

function renderScene(scene: SceneKey) {
  switch (scene) {
    case "treaty-signing":
      return <TreatySigning />;
    case "shrinking-germany":
      return <ShrinkingGermany />;
    case "reparations-coins":
      return <ReparationsCoins />;
    case "angry-crowd":
      return <AngryCrowd />;
    case "rising-leader":
      return <RisingLeader />;
    case "marching-troops":
      return <MarchingTroops />;
    case "rising-sun":
      return <RisingSun />;
    case "island-map":
      return <IslandMap />;
    case "iron-curtain":
      return <IronCurtain />;
    case "money-flow":
      return <MoneyFlow />;
    case "berlin-airlift":
      return <BerlinAirlift />;
    case "divided-line":
      return <DividedLine />;
    case "missiles-standoff":
      return <MissilesStandoff />;
    case "falling-wall":
      return <FallingWall />;
    case "handshake":
      return <Handshake />;
    case "empty-factory":
      return <EmptyFactory />;
    case "voting-hands":
      return <VotingHands />;
    case "world-map":
    default:
      return <WorldMap />;
  }
}

/* ── Scenes ─────────────────────────────────────────────────────────────── */

function TreatySigning() {
  return (
    <g>
      <FloatCloud x={60} y={40} scale={0.9} />
      <FloatCloud x={280} y={30} scale={1.1} delay={-4} />
      {/* table */}
      <rect x="90" y="150" width="220" height="18" rx="6" fill="var(--c-deep)" />
      <rect x="110" y="168" width="10" height="46" fill="var(--c-deep)" opacity={0.8} />
      <rect x="280" y="168" width="10" height="46" fill="var(--c-deep)" opacity={0.8} />
      {/* document */}
      <motion.g
        initial={{ rotate: -2 }}
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "200px 150px" }}
      >
        <rect x="168" y="118" width="64" height="40" rx="4" fill="#fff" />
        <line x1="176" y1="128" x2="224" y2="128" stroke="var(--c-primary)" strokeWidth="2" />
        <line x1="176" y1="136" x2="224" y2="136" stroke="var(--c-secondary)" strokeWidth="2" />
        <line x1="176" y1="144" x2="210" y2="144" stroke="var(--c-secondary)" strokeWidth="2" />
      </motion.g>
      {/* quill */}
      <motion.line
        x1="228"
        y1="150"
        stroke="var(--c-primary)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ x2: 248, y2: 118 }}
        animate={{ x2: [248, 240, 248], y2: [118, 122, 118] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <Figure x={120} y={150} scale={1.2} />
      <Figure x={280} y={150} scale={1.2} color="var(--c-primary)" />
      <Sparkle x={250} y={112} />
      <Ground />
    </g>
  );
}

function ShrinkingGermany() {
  return (
    <g>
      <FloatCloud x={70} y={40} scale={0.8} />
      <FloatCloud x={300} y={55} scale={1} delay={-5} />
      {/* outer original border */}
      <path
        d="M150 70 L250 70 L280 130 L250 200 L150 200 L120 130 Z"
        fill="none"
        stroke="var(--c-primary)"
        strokeWidth="2.5"
        strokeDasharray="6 6"
        opacity={0.6}
      />
      {/* shrinking fill */}
      <motion.path
        d="M150 70 L250 70 L280 130 L250 200 L150 200 L120 130 Z"
        fill="url(#prim)"
        animate={{ scale: [1, 0.7, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "200px 135px" }}
      />
      {/* pieces breaking away */}
      {[
        { x: 40, y: -6 },
        { x: -46, y: 8 },
        { x: 30, y: 40 },
      ].map((d, i) => (
        <motion.circle
          key={i}
          cx={200}
          cy={135}
          r={10}
          fill="var(--c-secondary)"
          animate={{ x: [0, d.x], y: [0, d.y], opacity: [1, 0.2] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
      <Ground />
    </g>
  );
}

function ReparationsCoins() {
  const stacks = [70, 130, 190, 250, 310];
  return (
    <g>
      <Ground />
      {stacks.map((x, i) => {
        const count = 4 + i * 2;
        return (
          <g key={x}>
            {Array.from({ length: count }).map((_, j) => (
              <motion.g
                key={j}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (i * count + j) * 0.12,
                  repeat: Infinity,
                  repeatDelay: count * 0.9,
                }}
              >
                <ellipse
                  cx={x}
                  cy={200 - j * 9}
                  rx="16"
                  ry="6"
                  fill="url(#soft)"
                  stroke="var(--c-deep)"
                  strokeWidth="1"
                />
              </motion.g>
            ))}
            <text
              x={x}
              y={222}
              textAnchor="middle"
              fontSize="12"
              fill="var(--c-deep)"
              fontWeight="700"
            >
              €
            </text>
          </g>
        );
      })}
      <FloatCloud x={280} y={40} scale={0.8} delay={-3} />
    </g>
  );
}

function crowdRow(y: number, n: number, angry = true) {
  return Array.from({ length: n }).map((_, i) => {
    const x = 40 + i * (320 / (n - 1));
    return (
      <g key={`${y}-${i}`}>
        <Figure x={x} y={y} scale={0.9} color={i % 2 ? "var(--c-primary)" : "var(--c-deep)"} />
        {angry && (
          <motion.line
            x1={x}
            y1={y - 26}
            x2={x}
            y2={y - 44}
            stroke={i % 2 ? "var(--c-primary)" : "var(--c-deep)"}
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ y2: [y - 44, y - 52, y - 44] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 4) * 0.15,
            }}
          />
        )}
      </g>
    );
  });
}

function AngryCrowd() {
  return (
    <g>
      <Ground color="var(--c-deep)" />
      {crowdRow(210, 9)}
      {crowdRow(180, 7)}
      <Sparkle x={200} y={60} />
      <Sparkle x={120} y={90} delay={1} />
      <Sparkle x={300} y={80} delay={0.6} />
    </g>
  );
}

function RisingLeader() {
  return (
    <g>
      <Ground color="var(--c-deep)" />
      {crowdRow(215, 9, false)}
      {/* podium */}
      <rect x="180" y="150" width="40" height="60" rx="4" fill="var(--c-deep)" />
      {/* leader growing */}
      <motion.g
        animate={{ scale: [1, 1.12, 1], y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "200px 150px" }}
      >
        <Figure x={200} y={150} scale={1.5} color="url(#prim)" />
      </motion.g>
      {/* radiating support rings */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="200"
          cy="120"
          r="20"
          fill="none"
          stroke="var(--c-primary)"
          strokeWidth="2"
          initial={{ scale: 0.6, opacity: 0.6 }}
          animate={{ scale: 2.6, opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut",
          }}
          style={{ transformOrigin: "200px 120px" }}
        />
      ))}
    </g>
  );
}

function soldier(x: number, y: number, delay: number) {
  return (
    <motion.g
      key={`${x}-${y}`}
      animate={{ x: [0, 12, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Figure x={x} y={y} scale={0.85} color="var(--c-deep)" />
      <motion.line
        x1={x + 8}
        y1={y - 24}
        x2={x + 20}
        y2={y - 32}
        stroke="var(--c-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </motion.g>
  );
}

function MarchingTroops() {
  const rows = [
    { y: 210, xs: [40, 90, 140, 190, 240, 290, 340] },
    { y: 180, xs: [70, 120, 170, 220, 270, 320] },
    { y: 155, xs: [100, 150, 200, 250, 300] },
  ];
  return (
    <g>
      <Ground color="var(--c-secondary)" />
      {/* big directional arrow */}
      <motion.g
        animate={{ x: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M60 90 H300 M300 90 L285 80 M300 90 L285 100"
          stroke="var(--c-primary)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.7}
        />
      </motion.g>
      {rows.map((r, ri) =>
        r.xs.map((x, i) => soldier(x, r.y, (ri + i) * 0.2))
      )}
    </g>
  );
}

function RisingSun() {
  return (
    <g>
      {/* sea */}
      <rect x="0" y="170" width="400" height="90" fill="var(--c-primary)" opacity={0.35} />
      {/* sun */}
      <motion.circle
        cx="200"
        r="44"
        fill="url(#prim)"
        initial={{ cy: 150 }}
        animate={{ cy: [155, 135, 155] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* rays */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <motion.line
            key={i}
            x1={200 + Math.cos(a) * 52}
            y1={150 + Math.sin(a) * 52}
            x2={200 + Math.cos(a) * 78}
            y2={150 + Math.sin(a) * 78}
            stroke="var(--c-secondary)"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          />
        );
      })}
      {/* waves */}
      {[190, 210, 230].map((y, i) => (
        <motion.path
          key={y}
          d={`M0 ${y} Q50 ${y - 6} 100 ${y} T200 ${y} T300 ${y} T400 ${y}`}
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          opacity={0.5}
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}
    </g>
  );
}

function IslandMap() {
  return (
    <g>
      <rect x="0" y="0" width="400" height="260" fill="var(--c-primary)" opacity={0.15} />
      {/* landmass */}
      <path
        d="M20 120 Q80 70 160 100 Q220 60 300 90 L360 140 Q320 200 240 190 Q160 220 80 190 Q30 170 20 120 Z"
        fill="var(--c-secondary)"
        stroke="var(--c-deep)"
        strokeWidth="2"
        opacity={0.8}
      />
      {/* island */}
      <ellipse cx="300" cy="180" rx="30" ry="16" fill="url(#prim)" />
      {/* arrows reaching out */}
      {[
        { d: "M180 130 Q230 120 280 170", },
        { d: "M120 150 Q200 200 280 185" },
      ].map((a, i) => (
        <motion.path
          key={i}
          d={a.d}
          fill="none"
          stroke="var(--c-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="7 7"
          animate={{ strokeDashoffset: [0, -28] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
        />
      ))}
      <Sparkle x={300} y={178} />
    </g>
  );
}

function IronCurtain() {
  return (
    <g>
      {/* west */}
      <rect x="0" y="0" width="200" height="260" fill="var(--c-secondary)" opacity={0.4} />
      {/* east */}
      <rect x="200" y="0" width="200" height="260" fill="var(--c-primary)" opacity={0.35} />
      {/* curtain */}
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.rect
          key={i}
          x={186 + i * 4}
          y="0"
          width="4"
          height="260"
          fill="var(--c-deep)"
          animate={{ scaleX: [1, 1.4, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
          style={{ transformOrigin: "center" }}
        />
      ))}
      <Figure x={90} y={190} scale={1.2} color="var(--c-deep)" />
      <Figure x={310} y={190} scale={1.2} color="var(--c-primary)" />
      <text x="90" y="60" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--c-deep)">
        WEST
      </text>
      <text x="310" y="60" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--c-deep)">
        EAST
      </text>
    </g>
  );
}

function MoneyFlow() {
  return (
    <g>
      <Ground />
      {/* source */}
      <rect x="30" y="150" width="70" height="50" rx="8" fill="url(#prim)" />
      <text x="65" y="182" textAnchor="middle" fontSize="20" fill="#fff">
        $
      </text>
      {/* destinations */}
      {[250, 300, 350].map((x, i) => (
        <rect key={x} x={x - 20} y={150 + i * 4} width="40" height="46" rx="6" fill="var(--c-secondary)" />
      ))}
      {/* flowing coins */}
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          r="8"
          fill="url(#soft)"
          stroke="var(--c-deep)"
          strokeWidth="1"
          initial={{ cx: 100, cy: 170, opacity: 0 }}
          animate={{
            cx: [100, 300],
            cy: [170, 165 - i * 2],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            delay: i * 0.55,
            ease: "easeInOut",
          }}
        />
      ))}
      <path
        d="M100 175 Q200 130 280 168"
        fill="none"
        stroke="var(--c-primary)"
        strokeWidth="2"
        strokeDasharray="4 6"
        opacity={0.5}
      />
    </g>
  );
}

function BerlinAirlift() {
  return (
    <g>
      <FloatCloud x={60} y={40} scale={0.9} />
      <FloatCloud x={260} y={30} scale={1.1} delay={-6} />
      {/* city skyline */}
      {[
        [40, 170, 30, 60],
        [80, 150, 34, 80],
        [122, 175, 26, 55],
        [300, 160, 30, 70],
        [338, 178, 28, 52],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="var(--c-deep)" opacity={0.85} />
      ))}
      {/* planes */}
      {[
        { y: 60, delay: 0, s: 1 },
        { y: 95, delay: 1.2, s: 0.8 },
        { y: 130, delay: 2.1, s: 0.9 },
      ].map((p, i) => (
        <motion.g
          key={i}
          initial={{ x: -60 }}
          animate={{ x: 460 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: p.delay }}
        >
          <g transform={`translate(0 ${p.y}) scale(${p.s})`}>
            <path d="M0 0 L40 0 L52 6 L40 12 L0 12 L-8 6 Z" fill="url(#prim)" />
            <path d="M14 0 L24 -12 L30 -12 L26 0 Z" fill="var(--c-deep)" />
            <path d="M14 12 L24 22 L30 22 L26 12 Z" fill="var(--c-deep)" />
          </g>
        </motion.g>
      ))}
      {/* supply drops */}
      {[150, 220].map((x, i) => (
        <motion.rect
          key={x}
          x={x}
          width="12"
          height="12"
          rx="2"
          fill="var(--c-secondary)"
          stroke="var(--c-deep)"
          initial={{ y: 70, opacity: 1 }}
          animate={{ y: [70, 180], opacity: [1, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 1.1, ease: "easeIn" }}
        />
      ))}
    </g>
  );
}

function DividedLine() {
  return (
    <g>
      <rect x="0" y="0" width="200" height="260" fill="var(--c-secondary)" opacity={0.35} />
      <rect x="200" y="0" width="200" height="260" fill="var(--c-primary)" opacity={0.3} />
      {/* buildings both sides */}
      {[50, 100, 150].map((x) => (
        <rect key={x} x={x} y={150} width="30" height="70" rx="3" fill="var(--c-deep)" opacity={0.8} />
      ))}
      {[240, 300, 350].map((x) => (
        <rect key={x} x={x} y={150} width="30" height="70" rx="3" fill="var(--c-deep)" opacity={0.6} />
      ))}
      {/* dividing wall rising */}
      <motion.rect
        x="194"
        width="12"
        rx="3"
        fill="var(--c-deep)"
        initial={{ y: 260, height: 0 }}
        animate={{ y: [260, 70], height: [0, 190] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={i}
          x1="194"
          y1={90 + i * 32}
          x2="206"
          y2={90 + i * 32}
          stroke="var(--c-surface)"
          strokeWidth="2"
        />
      ))}
    </g>
  );
}

function MissilesStandoff() {
  return (
    <g>
      <Ground color="var(--c-deep)" />
      {/* left missile */}
      <motion.g
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(60 150)">
          <rect x="0" y="0" width="70" height="20" rx="10" fill="url(#prim)" />
          <path d="M70 0 L92 10 L70 20 Z" fill="var(--c-deep)" />
          <path d="M0 0 L-14 -8 L0 6 Z" fill="var(--c-secondary)" />
          <motion.g
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            style={{ transformOrigin: "-10px 10px" }}
          >
            <path d="M-4 4 L-22 10 L-4 16 Z" fill="var(--c-primary)" />
          </motion.g>
        </g>
      </motion.g>
      {/* right missile */}
      <motion.g
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(340 190) scale(-1 1)">
          <rect x="0" y="0" width="70" height="20" rx="10" fill="var(--c-deep)" />
          <path d="M70 0 L92 10 L70 20 Z" fill="var(--c-primary)" />
          <path d="M0 0 L-14 -8 L0 6 Z" fill="var(--c-secondary)" />
        </g>
      </motion.g>
      {/* tension spark in the middle */}
      <Sparkle x={200} y={150} />
      <Sparkle x={210} y={130} delay={0.5} />
      <motion.circle
        cx="200"
        cy="150"
        r="6"
        fill="var(--c-primary)"
        animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0.2, 0.8] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
    </g>
  );
}

function FallingWall() {
  return (
    <g>
      <Ground color="var(--c-secondary)" />
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => {
          const x = 60 + col * 36 + (row % 2 ? 18 : 0);
          const y = 80 + row * 28;
          return (
            <motion.rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width="32"
              height="24"
              rx="3"
              fill={row % 2 ? "var(--c-secondary)" : "var(--c-primary)"}
              stroke="var(--c-deep)"
              strokeWidth="1"
              animate={{
                y: [y, y + 160],
                rotate: [0, (col - 4) * 20],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatDelay: 1.2,
                delay: (row * 8 + col) * 0.06,
                ease: "easeIn",
              }}
              style={{ transformOrigin: "center" }}
            />
          );
        })
      )}
      <Sparkle x={200} y={50} />
      <Sparkle x={140} y={40} delay={0.8} />
      <Sparkle x={280} y={46} delay={0.4} />
    </g>
  );
}

function Handshake() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="200"
          cy="130"
          r="30"
          fill="none"
          stroke="var(--c-primary)"
          strokeWidth="2"
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
          style={{ transformOrigin: "200px 130px" }}
        />
      ))}
      {/* two arms */}
      <motion.g
        animate={{ x: [-6, 0, -6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="70" y="120" width="120" height="22" rx="11" fill="url(#prim)" />
        <circle cx="185" cy="131" r="18" fill="var(--c-deep)" />
      </motion.g>
      <motion.g
        animate={{ x: [6, 0, 6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="210" y="120" width="120" height="22" rx="11" fill="var(--c-secondary)" />
        <circle cx="215" cy="131" r="18" fill="var(--c-deep)" />
      </motion.g>
      <Sparkle x={200} y={110} />
      <Ground />
    </g>
  );
}

function EmptyFactory() {
  return (
    <g>
      <Ground color="var(--c-deep)" />
      {/* factory */}
      <rect x="90" y="130" width="150" height="90" rx="4" fill="var(--c-deep)" opacity={0.85} />
      <rect x="150" y="90" width="20" height="50" fill="var(--c-deep)" />
      <rect x="185" y="80" width="20" height="60" fill="var(--c-deep)" />
      {/* saw-tooth roof */}
      <path d="M90 130 L110 112 L130 130 L150 112 L170 130 L190 112 L210 130 L230 112 L240 130 Z" fill="var(--c-primary)" />
      {/* windows dimming */}
      {[110, 140, 170, 200].map((x, i) => (
        <motion.rect
          key={x}
          x={x}
          y="160"
          width="18"
          height="18"
          rx="2"
          fill="var(--c-secondary)"
          animate={{ opacity: [0.9, 0.15, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        />
      ))}
      {/* faint stopped smoke */}
      <motion.circle
        cx="195"
        cy="70"
        r="8"
        fill="#bbb"
        animate={{ y: [0, -12], opacity: [0.4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      />
      <text x="300" y="150" textAnchor="middle" fontSize="30" opacity={0.5}>
        📉
      </text>
    </g>
  );
}

function VotingHands() {
  return (
    <g>
      <Ground color="var(--c-secondary)" />
      {/* ballot box */}
      <rect x="170" y="150" width="60" height="50" rx="6" fill="url(#prim)" />
      <rect x="190" y="146" width="20" height="6" rx="2" fill="var(--c-deep)" />
      {/* ballots dropping */}
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x="194"
          width="12"
          height="14"
          rx="1"
          fill="#fff"
          stroke="var(--c-deep)"
          initial={{ y: 90, opacity: 1 }}
          animate={{ y: [90, 148], opacity: [1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.7, ease: "easeIn" }}
        />
      ))}
      {/* raised hands / counting */}
      {[40, 90, 300, 350].map((x, i) => (
        <motion.g
          key={x}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        >
          <Figure x={x} y={200} scale={0.9} color={i % 2 ? "var(--c-primary)" : "var(--c-deep)"} />
        </motion.g>
      ))}
      <Sparkle x={200} y={120} />
    </g>
  );
}

function WorldMap() {
  return (
    <g>
      <circle cx="200" cy="130" r="90" fill="url(#soft)" opacity={0.3} />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 130px" }}
      >
        <circle cx="200" cy="130" r="80" fill="none" stroke="var(--c-primary)" strokeWidth="2" opacity={0.4} />
        <ellipse cx="200" cy="130" rx="80" ry="30" fill="none" stroke="var(--c-primary)" strokeWidth="1.5" opacity={0.4} />
        <ellipse cx="200" cy="130" rx="30" ry="80" fill="none" stroke="var(--c-primary)" strokeWidth="1.5" opacity={0.4} />
        <path d="M150 100 Q180 90 200 110 Q170 130 150 120 Z" fill="var(--c-secondary)" />
        <path d="M220 140 Q260 130 250 160 Q220 170 210 150 Z" fill="var(--c-secondary)" />
        <path d="M170 160 Q200 155 190 180 Q165 178 170 160 Z" fill="var(--c-secondary)" />
      </motion.g>
      <Sparkle x={130} y={70} />
      <Sparkle x={280} y={90} delay={1} />
      <Sparkle x={250} y={200} delay={0.5} />
    </g>
  );
}
