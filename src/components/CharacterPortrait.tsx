"use client";

import { motion } from "framer-motion";
import { getPalette, type PaletteKey } from "@/content/palettes";

/**
 * Hand-built, consistent vector portraits for every historical figure.
 * One parametric face system → the whole cast shares a single art style, while
 * hair, facial hair, glasses and caps make each person recognisable. Faces
 * gently "breathe" (subtle scale) for a living, storybook feel.
 *
 * Portraits are stylised and respectful — friendly editorial characters, not
 * caricatures — in keeping with an educational storybook.
 */

type HairStyle = "sidepart" | "swept" | "balding" | "bald" | "short" | "cap";
type Facial = "none" | "stache-sm" | "stache-wide" | "stache-bushy" | "beard";
type Glasses = "none" | "round";

interface FaceSpec {
  skin: string;
  hair: string;
  hairStyle: HairStyle;
  facial: Facial;
  glasses: Glasses;
  /** small accent used for tie / collar. */
  accent: PaletteKey;
  /** optional emoji flag shown as a tiny badge. */
  flag: string;
}

const FACES: Record<string, FaceSpec> = {
  hitler: { skin: "#f0c9a8", hair: "#3a2c22", hairStyle: "sidepart", facial: "stache-sm", glasses: "none", accent: "hitler", flag: "🇩🇪" },
  chamberlain: { skin: "#f2d0ad", hair: "#c9c4bd", hairStyle: "balding", facial: "stache-wide", glasses: "none", accent: "versailles", flag: "🇬🇧" },
  churchill: { skin: "#f4d1af", hair: "#e7e2db", hairStyle: "bald", facial: "none", glasses: "none", accent: "coldwar", flag: "🇬🇧" },
  roosevelt: { skin: "#f1cca6", hair: "#8a7a63", hairStyle: "sidepart", facial: "none", glasses: "round", accent: "coldwar", flag: "🇺🇸" },
  truman: { skin: "#f1cca6", hair: "#d8d2c8", hairStyle: "sidepart", facial: "none", glasses: "round", accent: "coldwar", flag: "🇺🇸" },
  stalin: { skin: "#e8bd97", hair: "#2c2620", hairStyle: "swept", facial: "stache-bushy", glasses: "none", accent: "coldwar", flag: "🇷🇺" },
  khrushchev: { skin: "#f0c6a0", hair: "#e7e2db", hairStyle: "bald", facial: "none", glasses: "none", accent: "cuba", flag: "🇷🇺" },
  kennedy: { skin: "#f3cfab", hair: "#7a5a3a", hairStyle: "sidepart", facial: "none", glasses: "none", accent: "cuba", flag: "🇺🇸" },
  castro: { skin: "#e6b98f", hair: "#2c2620", hairStyle: "cap", facial: "beard", glasses: "none", accent: "cuba", flag: "🇨🇺" },
  gorbachev: { skin: "#f0c6a0", hair: "#e0dad0", hairStyle: "balding", facial: "none", glasses: "none", accent: "collapse", flag: "🇷🇺" },
  "hirohito-era": { skin: "#eec39c", hair: "#2c2620", hairStyle: "cap", facial: "none", glasses: "round", accent: "japan", flag: "🇯🇵" },
  "kim-il-sung": { skin: "#eec39c", hair: "#2c2620", hairStyle: "short", facial: "none", glasses: "none", accent: "korea", flag: "🇰🇵" },
  mao: { skin: "#edc199", hair: "#2c2620", hairStyle: "swept", facial: "none", glasses: "none", accent: "korea", flag: "🇨🇳" },
  "ho-chi-minh": { skin: "#eec39c", hair: "#e0dad0", hairStyle: "balding", facial: "beard", glasses: "none", accent: "vietnam", flag: "🇻🇳" },
  "ngo-dinh-diem": { skin: "#edc199", hair: "#2c2620", hairStyle: "sidepart", facial: "none", glasses: "none", accent: "vietnam", flag: "🇻🇳" },
};

export function CharacterPortrait({
  id,
  size = 96,
  breathing = true,
  ring = true,
  className = "",
}: {
  id: string;
  size?: number;
  breathing?: boolean;
  ring?: boolean;
  className?: string;
}) {
  const f = FACES[id];
  const accent = getPalette(f?.accent ?? "neutral");
  if (!f) {
    return (
      <div
        className={`grid place-items-center rounded-full ${className}`}
        style={{ width: size, height: size, background: accent.surface }}
      >
        🎭
      </div>
    );
  }

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      initial={breathing ? { scale: 1 } : undefined}
      animate={breathing ? { scale: [1, 1.025, 1] } : undefined}
      transition={
        breathing
          ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <radialGradient id={`bg-${id}`} cx="50%" cy="38%" r="75%">
            <stop offset="0%" stopColor={accent.surface} />
            <stop offset="100%" stopColor={accent.secondary} />
          </radialGradient>
          <linearGradient id={`sk-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={f.skin} />
            <stop offset="100%" stopColor={shade(f.skin, -10)} />
          </linearGradient>
        </defs>

        {/* soft background disc */}
        <circle cx="50" cy="50" r="50" fill={`url(#bg-${id})`} />
        {ring && (
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke={accent.primary}
            strokeOpacity="0.35"
            strokeWidth="2"
          />
        )}

        {/* shoulders / collar */}
        <path d="M20 100 Q22 78 50 78 Q78 78 80 100 Z" fill={accent.deep} />
        <path d="M42 80 L50 92 L58 80 Z" fill="#fff" opacity="0.9" />
        <path
          d="M47 82 L50 92 L53 82 Z"
          fill={accent.primary}
        />

        {/* neck */}
        <rect x="44" y="66" width="12" height="14" rx="5" fill={shade(f.skin, -14)} />

        {/* ears */}
        <circle cx="28" cy="46" r="5" fill={`url(#sk-${id})`} />
        <circle cx="72" cy="46" r="5" fill={`url(#sk-${id})`} />

        {/* head */}
        <path
          d="M30 44 Q30 22 50 22 Q70 22 70 44 Q70 66 50 68 Q30 66 30 44 Z"
          fill={`url(#sk-${id})`}
        />

        {renderHair(f)}
        {/* eyebrows */}
        <path d={`M37 42 Q41 40 45 42`} stroke={f.hair} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d={`M55 42 Q59 40 63 42`} stroke={f.hair} strokeWidth="1.6" fill="none" strokeLinecap="round" />

        {/* eyes */}
        <circle cx="41" cy="47" r="2.1" fill="#3a3340" />
        <circle cx="59" cy="47" r="2.1" fill="#3a3340" />

        {/* nose */}
        <path d="M50 48 L48 55 Q50 57 52 55" fill="none" stroke={shade(f.skin, -22)} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

        {renderMouthAndFacial(f)}
        {f.glasses === "round" && (
          <g stroke="#3a3340" strokeWidth="1.6" fill="none">
            <circle cx="41" cy="47" r="5.2" />
            <circle cx="59" cy="47" r="5.2" />
            <path d="M46 47 H54" />
            <path d="M35.8 47 Q33 46 31 48" />
            <path d="M64.2 47 Q67 46 69 48" />
          </g>
        )}

        {renderCap(f, accent)}
      </svg>

      {/* tiny flag badge */}
      <span
        className="absolute -bottom-0.5 -right-0.5 grid place-items-center rounded-full bg-white shadow-soft"
        style={{ width: size * 0.32, height: size * 0.32, fontSize: size * 0.18 }}
      >
        {f.flag}
      </span>
    </motion.div>
  );
}

function renderHair(f: FaceSpec) {
  switch (f.hairStyle) {
    case "bald":
      return (
        <>
          <path d="M31 44 Q31 38 34 34" stroke={f.hair} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M69 44 Q69 38 66 34" stroke={f.hair} strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      );
    case "balding":
      return (
        <>
          <path d="M32 40 Q34 30 44 27" stroke={f.hair} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M68 40 Q66 30 56 27" stroke={f.hair} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M30 46 Q28 40 30 34" stroke={f.hair} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M70 46 Q72 40 70 34" stroke={f.hair} strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      );
    case "swept":
      return (
        <path
          d="M29 42 Q28 20 50 20 Q72 20 71 42 Q66 30 50 30 Q40 30 34 36 Q31 39 29 42 Z"
          fill={f.hair}
        />
      );
    case "short":
      return (
        <path d="M30 42 Q30 21 50 21 Q70 21 70 42 Q66 32 50 32 Q34 32 30 42 Z" fill={f.hair} />
      );
    case "cap":
      // hair mostly under cap; render sideburns only
      return (
        <>
          <path d="M31 46 Q30 40 32 36" stroke={f.hair} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M69 46 Q70 40 68 36" stroke={f.hair} strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      );
    case "sidepart":
    default:
      return (
        <path
          d="M30 43 Q30 21 50 21 Q70 21 70 43 Q68 33 58 31 Q56 26 46 27 Q36 28 33 36 Q31 39 30 43 Z"
          fill={f.hair}
        />
      );
  }
}

function renderMouthAndFacial(f: FaceSpec) {
  const mouth = (
    <path d="M45 60 Q50 63 55 60" stroke="#a5573f" strokeWidth="1.8" fill="none" strokeLinecap="round" />
  );
  switch (f.facial) {
    case "stache-sm":
      return (
        <>
          <rect x="47" y="56" width="6" height="3" rx="1" fill={f.hair} />
          {mouth}
        </>
      );
    case "stache-wide":
      return (
        <>
          <path d="M42 57 Q50 54 58 57 Q50 60 42 57 Z" fill={f.hair} />
          {mouth}
        </>
      );
    case "stache-bushy":
      return (
        <>
          <path d="M39 56 Q50 52 61 56 Q57 62 50 61 Q43 62 39 56 Z" fill={f.hair} />
        </>
      );
    case "beard":
      return (
        <>
          <path d="M34 50 Q35 70 50 72 Q65 70 66 50 Q60 60 50 60 Q40 60 34 50 Z" fill={f.hair} />
          <path d="M44 58 Q50 61 56 58" stroke={shade(f.skin, -20)} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </>
      );
    default:
      return mouth;
  }
}

function renderCap(f: FaceSpec, accent: ReturnType<typeof getPalette>) {
  if (f.hairStyle !== "cap") return null;
  return (
    <g>
      <path d="M30 32 Q50 14 70 32 Q70 28 66 26 Q50 16 34 26 Q30 28 30 32 Z" fill={accent.deep} />
      <path d="M28 33 Q50 27 72 33 L72 36 Q50 31 28 36 Z" fill={shade(accent.deep, -8)} />
      <rect x="45" y="20" width="10" height="7" rx="1.5" fill={accent.primary} />
    </g>
  );
}

/** Lighten/darken a hex colour by percent (-100..100). */
function shade(hex: string, percent: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const r = Math.max(0, Math.min(255, (n >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amt));
  const b = Math.max(0, Math.min(255, (n & 0xff) + amt));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
