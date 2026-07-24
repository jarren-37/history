"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

/**
 * Hand-drawn decorative chrome used across the book: corner flourishes, ink
 * dividers, wax seals, a compass rose, a candle and floating dust motes.
 * All pure vector so they stay crisp and work offline.
 */

export function CornerFlourish({
  className = "",
  color = "var(--gold)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" aria-hidden>
      <path
        d="M4 4 L4 30 M4 4 L30 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 4 C 20 6 28 14 30 30 C 30 18 22 10 8 8"
        stroke={color}
        strokeWidth="1.2"
        fill={color}
        fillOpacity="0.15"
      />
      <circle cx="6" cy="6" r="2.4" fill={color} />
      <path d="M14 6 C 20 6 22 10 22 16" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M6 14 C 6 20 10 22 16 22" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function InkDivider({
  className = "",
  color = "var(--ink-faint)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 240 20" className={className} fill="none" aria-hidden>
      <path d="M10 10 H100" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M140 10 H230" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M100 10 C108 4 112 4 120 10 C128 16 132 16 140 10"
        stroke={color}
        strokeWidth="1.4"
        fill="none"
      />
      <circle cx="120" cy="10" r="3" fill={color} />
      <circle cx="100" cy="10" r="1.6" fill={color} />
      <circle cx="140" cy="10" r="1.6" fill={color} />
      <path d="M120 3 L121.4 7 L120 6 L118.6 7 Z" fill={color} />
      <path d="M120 17 L121.4 13 L120 14 L118.6 13 Z" fill={color} />
    </svg>
  );
}

export function WaxSeal({
  size = 64,
  label,
  className = "",
}: {
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative grid place-items-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="wax-g" cx="38%" cy="34%" r="70%">
            <stop offset="0%" stopColor="#c14a3d" />
            <stop offset="60%" stopColor="#8f2d24" />
            <stop offset="100%" stopColor="#661d16" />
          </radialGradient>
        </defs>
        <path
          d="M50 4 C60 8 70 4 76 14 C86 18 92 26 88 38 C96 46 96 58 86 64 C90 76 82 86 70 84 C64 94 50 96 42 88 C30 92 20 84 22 72 C12 66 10 54 20 46 C14 34 22 22 34 24 C40 12 42 8 50 4 Z"
          fill="url(#wax-g)"
          stroke="#5c1712"
          strokeWidth="1.5"
        />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#5c1712" strokeOpacity="0.5" strokeWidth="1.5" />
      </svg>
      {label && (
        <span className="absolute font-display text-xs font-black uppercase tracking-widest text-[#f3d9b0]">
          {label}
        </span>
      )}
    </div>
  );
}

export function CompassRose({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="60" cy="60" r="52" fill="none" stroke="var(--ink-faint)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="var(--ink-faint)" strokeWidth="0.8" opacity="0.4" />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1="60"
            y1="60"
            x2={60 + 50 * Math.cos((a * Math.PI) / 180)}
            y2={60 + 50 * Math.sin((a * Math.PI) / 180)}
            stroke="var(--ink-faint)"
            strokeWidth="0.6"
            opacity="0.4"
          />
        ))}
      </motion.g>
      {/* main star */}
      <path d="M60 12 L67 60 L60 108 L53 60 Z" fill="var(--wax)" opacity="0.85" />
      <path d="M12 60 L60 53 L108 60 L60 67 Z" fill="var(--ink-soft)" opacity="0.85" />
      <path d="M60 12 L63 57 L60 60 L57 57 Z" fill="var(--gold)" />
      <circle cx="60" cy="60" r="4" fill="var(--gold)" stroke="var(--ink)" strokeWidth="1" />
      <text x="60" y="9" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--ink-soft)">N</text>
    </svg>
  );
}

export function Candle({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 60 120" className="h-full w-full" aria-hidden>
        {/* glow */}
        <motion.ellipse
          cx="30"
          cy="34"
          rx="26"
          ry="30"
          fill="rgba(255,196,120,0.35)"
          animate={{ opacity: [0.35, 0.5, 0.35], rx: [26, 28, 26] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(6px)" }}
        />
        {/* body */}
        <rect x="20" y="56" width="20" height="52" rx="4" fill="#f0e2c0" />
        <rect x="20" y="56" width="7" height="52" rx="4" fill="#fff7e2" opacity="0.6" />
        {/* wick */}
        <rect x="29" y="48" width="2" height="10" fill="#3a2a17" />
        {/* flame */}
        <motion.g
          animate={{ scaleY: [1, 1.12, 0.96, 1], x: [0, 1, -1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "30px 48px" }}
        >
          <path d="M30 24 C38 34 38 46 30 50 C22 46 22 34 30 24 Z" fill="#ffb43c" />
          <path d="M30 32 C34 38 34 45 30 48 C26 45 26 38 30 32 Z" fill="#ffe58a" />
        </motion.g>
      </svg>
    </div>
  );
}

/** Floating dust motes that drift through the candlelight. */
export function DustMotes({ count = 18 }: { count?: number }) {
  // Client-only: random positions would mismatch server vs client, so we render
  // nothing until mounted (avoids a hydration error).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 40 + Math.random() * 60,
        size: 1 + Math.random() * 2.5,
        dur: 8 + Math.random() * 10,
        delay: Math.random() * 8,
      })),
    [count]
  );
  if (!mounted) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {motes.map((m) => (
        <span
          key={m.id}
          className="absolute rounded-full"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            background: "rgba(255,220,160,0.8)",
            boxShadow: "0 0 6px rgba(255,210,150,0.7)",
            animation: `mote ${m.dur}s linear ${m.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
