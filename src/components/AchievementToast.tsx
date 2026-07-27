"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/store";
import { ACHIEVEMENTS } from "@/content/missions";
import { playDiscovery } from "@/lib/sound";
import { Confetti } from "./ui";

const BY_ID = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]));

/**
 * Watches for newly unlocked achievements and celebrates them, one at a time,
 * then marks them seen. Mount once per page that can trigger progress.
 */
export function AchievementToast() {
  const { newAchievements, markAchievementsSeen, soundOn, hydrated } = useApp();
  const [queue, setQueue] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);

  // Absorb any newly unlocked achievements into the queue, then mark seen.
  useEffect(() => {
    if (!hydrated || newAchievements.length === 0) return;
    setQueue((q) => [...q, ...newAchievements.filter((id) => !q.includes(id))]);
    markAchievementsSeen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, newAchievements.join(",")]);

  // Pull the next achievement off the queue.
  useEffect(() => {
    if (current || queue.length === 0) return;
    const [next, ...rest] = queue;
    setCurrent(next);
    setQueue(rest);
    if (soundOn) playDiscovery();
    const t = setTimeout(() => setCurrent(null), 4200);
    return () => clearTimeout(t);
  }, [queue, current, soundOn]);

  const ach = current ? BY_ID[current] : null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-[90] flex justify-center px-4">
      <AnimatePresence>
        {ach && (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="pointer-events-auto relative overflow-hidden rounded-2xl border-2 border-[var(--gold)] bg-[var(--parch)] px-5 py-3 shadow-soft-lg"
          >
            <Confetti count={22} />
            <div className="relative flex items-center gap-3">
              <span className="text-4xl">{ach.motif}</span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--gold)]">
                  Achievement unlocked
                </div>
                <div className="font-display text-lg font-extrabold text-ink">
                  {ach.name}
                </div>
                <div className="text-xs text-ink-soft">{ach.description}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
