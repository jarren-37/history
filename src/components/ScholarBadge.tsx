"use client";

import { motion } from "framer-motion";
import { useApp } from "@/lib/store";

/**
 * Compact scholar rank: a circular XP ring with the level inside, plus the
 * current title and XP-to-next-level. Used in the nav and on the home hall.
 */
export function ScholarBadge({ showTitle = true }: { showTitle?: boolean }) {
  const { level, xp, hydrated } = useApp();
  const r = 15;
  const circ = 2 * Math.PI * r;
  const pct = hydrated ? level.progress : 0;

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative h-10 w-10 shrink-0">
        <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90">
          <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(255,210,140,0.2)" strokeWidth="4" />
          <motion.circle
            cx="20"
            cy="20"
            r={r}
            fill="none"
            stroke="url(#xpgrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ * (1 - pct) }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
          />
          <defs>
            <linearGradient id="xpgrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e6c15a" />
              <stop offset="1" stopColor="#b8892b" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-sm font-extrabold text-[#f3dcae]">
          {hydrated ? level.level : "—"}
        </span>
      </div>
      {showTitle && (
        <div className="leading-tight">
          <div className="gold-text font-display text-sm font-bold">
            {hydrated ? level.title : "Novice Reader"}
          </div>
          <div className="text-[11px] text-[#e8cfa0]/80">
            {hydrated ? `${xp} XP` : "— XP"}
          </div>
        </div>
      )}
    </div>
  );
}
