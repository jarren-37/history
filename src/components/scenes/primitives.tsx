"use client";

import { motion } from "framer-motion";
import React from "react";

/** Shared building blocks for the animated scenes. */

export const VB = "0 0 400 260";

export function Sky({ from, to }: { from?: string; to?: string }) {
  return (
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={from ?? "var(--c-surface)"} />
        <stop offset="100%" stopColor={to ?? "#ffffff00"} />
      </linearGradient>
      <linearGradient id="prim" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--c-primary)" />
        <stop offset="100%" stopColor="var(--c-deep)" />
      </linearGradient>
      <linearGradient id="soft" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--c-secondary)" />
        <stop offset="100%" stopColor="var(--c-primary)" />
      </linearGradient>
    </defs>
  );
}

export function FloatCloud({
  x,
  y,
  scale = 1,
  delay = 0,
}: {
  x: number;
  y: number;
  scale?: number;
  delay?: number;
}) {
  return (
    <motion.g
      initial={{ x: x - 14 }}
      animate={{ x: [x - 14, x + 14, x - 14] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay }}
      opacity={0.85}
    >
      <g transform={`translate(0 ${y}) scale(${scale})`} fill="#ffffff">
        <circle cx="0" cy="0" r="12" />
        <circle cx="14" cy="2" r="15" />
        <circle cx="30" cy="0" r="11" />
        <rect x="-4" y="0" width="38" height="12" rx="6" />
      </g>
    </motion.g>
  );
}

/** A friendly rounded "character" silhouette. */
export function Figure({
  x,
  y,
  color = "var(--c-deep)",
  scale = 1,
}: {
  x: number;
  y: number;
  color?: string;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={color}>
      <circle cx="0" cy="-18" r="8" />
      <path d="M -11 8 Q -11 -8 0 -8 Q 11 -8 11 8 Z" />
    </g>
  );
}

export function Ground({ color = "var(--c-secondary)" }: { color?: string }) {
  return (
    <path
      d="M0 210 Q100 195 200 205 T400 205 V260 H0 Z"
      fill={color}
      opacity={0.5}
    />
  );
}

export function Sparkle({
  x,
  y,
  delay = 0,
}: {
  x: number;
  y: number;
  delay?: number;
}) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={2.5}
      fill="#fff"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}
