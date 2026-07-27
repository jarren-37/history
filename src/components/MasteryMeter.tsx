"use client";

import { MAX_BOX, masteryLabel } from "@/lib/progression";

/**
 * A row of pips showing how deeply a word is mastered (its Leitner box).
 * Filled pips = confidence; the last, filled pip means fully mastered.
 */
export function MasteryMeter({
  box,
  showLabel = true,
  className = "",
}: {
  box: number;
  showLabel?: boolean;
  className?: string;
}) {
  const filled = Math.max(0, Math.min(MAX_BOX, box));
  const mastered = filled >= MAX_BOX;
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1" aria-hidden>
        {Array.from({ length: MAX_BOX }, (_, i) => (
          <span
            key={i}
            className="h-2 w-4 rounded-full transition-colors"
            style={{
              background:
                i < filled
                  ? mastered
                    ? "linear-gradient(90deg,#e6c15a,#b8892b)"
                    : "var(--c-primary)"
                  : "color-mix(in srgb, var(--ink) 14%, transparent)",
            }}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-xs font-semibold text-ink-soft">
          {masteryLabel(filled)}
        </span>
      )}
    </div>
  );
}
