"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The home hero illustration: an open storybook from which the seven chapters
 * rise as glowing colour-orbs — visualising the core idea that history is one
 * big, colourful story. Fully vector, self-contained, animated with springs.
 */

const CHAPTER_HUES = [
  { c: "#d6455b", x: 120, delay: 0 }, // Versailles
  { c: "#c0392b", x: 165, delay: 0.6 }, // Hitler
  { c: "#e07b39", x: 205, delay: 1.2 }, // Japan
  { c: "#2f6fb0", x: 250, delay: 0.3 }, // Cold War
  { c: "#5c6b7a", x: 150, delay: 1.5 }, // Berlin
  { c: "#4257a8", x: 285, delay: 0.9 }, // Cuba
  { c: "#8459b3", x: 230, delay: 1.8 }, // Collapse
];

export function HeroBook() {
  const reduce = useReducedMotion();

  return (
    <div className="relative aspect-square w-full">
      {/* ambient glow */}
      <div
        className="absolute inset-[8%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(214,69,91,0.25), rgba(66,87,168,0.18) 45%, transparent 70%)",
        }}
      />
      <svg viewBox="0 0 400 400" className="relative h-full w-full">
        <defs>
          <linearGradient id="pageL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fffdf8" />
            <stop offset="100%" stopColor="#f1e7d6" />
          </linearGradient>
          <linearGradient id="pageR" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffdf8" />
            <stop offset="100%" stopColor="#f1e7d6" />
          </linearGradient>
          <linearGradient id="cover" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d6455b" />
            <stop offset="50%" stopColor="#8459b3" />
            <stop offset="100%" stopColor="#2f6fb0" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe9b8" />
            <stop offset="100%" stopColor="#ffe9b800" />
          </radialGradient>
          <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* rising story glow from the gutter */}
        <motion.ellipse
          cx="200"
          cy="250"
          rx="120"
          ry="90"
          fill="url(#glow)"
          initial={{ opacity: 0.4 }}
          animate={reduce ? undefined : { opacity: [0.4, 0.75, 0.4], ry: [90, 105, 90] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* floating chapter orbs */}
        {CHAPTER_HUES.map((h, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            animate={
              reduce
                ? { opacity: 0.9 }
                : {
                    y: [10, -120],
                    opacity: [0, 1, 1, 0],
                    x: [h.x, h.x + (i % 2 ? 14 : -14)],
                  }
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: h.delay,
              ease: "easeInOut",
            }}
          >
            <circle cx={h.x} cy={250} r="16" fill={h.c} opacity={0.25} filter="url(#soft)" />
            <circle cx={h.x} cy={250} r="10" fill={h.c} />
            <circle cx={h.x - 3} cy={247} r="3.5" fill="#fff" opacity={0.7} />
          </motion.g>
        ))}

        {/* book cover peeking behind pages */}
        <g transform="translate(200 300)">
          <path d="M-150 -40 Q0 -58 150 -40 L150 20 Q0 4 -150 20 Z" fill="url(#cover)" />
        </g>

        {/* left page */}
        <motion.g
          initial={{ rotateY: 0 }}
          style={{ transformOrigin: "200px 260px" }}
          animate={reduce ? undefined : { rotate: [-0.6, 0.6, -0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M200 250 L60 268 Q52 300 60 330 L200 314 Z"
            fill="url(#pageL)"
            stroke="#e6d8c0"
            strokeWidth="1.5"
          />
          {[280, 292, 304].map((y, i) => (
            <line
              key={y}
              x1={78 - i}
              y1={y}
              x2={188}
              y2={y - 3}
              stroke="#d0b48a"
              strokeWidth="2"
              opacity={0.6}
            />
          ))}
          {/* little scene motif on left page */}
          <circle cx="110" cy="270" r="7" fill="#f6a5a0" />
          <path d="M96 288 Q110 278 124 288" stroke="#d6455b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* right page */}
        <motion.g
          style={{ transformOrigin: "200px 260px" }}
          animate={reduce ? undefined : { rotate: [0.6, -0.6, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M200 250 L340 268 Q348 300 340 330 L200 314 Z"
            fill="url(#pageR)"
            stroke="#e6d8c0"
            strokeWidth="1.5"
          />
          {[280, 292, 304].map((y, i) => (
            <line
              key={y}
              x1={212}
              y1={y - 3}
              x2={322 + i}
              y2={y}
              stroke="#d0b48a"
              strokeWidth="2"
              opacity={0.6}
            />
          ))}
          <circle cx="292" cy="270" r="7" fill="#8fc0e6" />
          <path d="M278 288 Q292 280 306 288" stroke="#2f6fb0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* spine highlight */}
        <path d="M200 250 L200 314" stroke="#c9a86f" strokeWidth="2" opacity={0.5} />

        {/* sparkles */}
        {[
          [150, 150],
          [260, 130],
          [200, 100],
          [300, 190],
        ].map(([x, y], i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={reduce ? { opacity: 0.8, scale: 1 } : { opacity: [0, 1, 0], scale: [0, 1.3, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
          >
            <path
              d={`M${x} ${y - 6} L${x + 1.6} ${y - 1.6} L${x + 6} ${y} L${x + 1.6} ${y + 1.6} L${x} ${y + 6} L${x - 1.6} ${y + 1.6} L${x - 6} ${y} L${x - 1.6} ${y - 1.6} Z`}
              fill="#ffce6b"
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
