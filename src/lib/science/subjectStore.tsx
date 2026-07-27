"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { levelFromXp, type LevelInfo } from "./levels";

type Theme = "light" | "dark";

interface Streak {
  count: number;
  lastVisit: string;
}

export interface SubjectState {
  hydrated: boolean;
  theme: Theme;
  toggleTheme: () => void;
  soundOn: boolean;
  toggleSound: () => void;
  reduceMotion: boolean;
  xp: number;
  level: LevelInfo;
  /** ids of completed stations / challenges. */
  completed: string[];
  /** Mark something done; returns XP awarded (0 if already done). */
  complete: (id: string, xp: number) => number;
  isDone: (id: string) => boolean;
  addXp: (n: number) => void;
  streak: Streak;
  resetProgress: () => void;
}

interface Persisted {
  theme: Theme;
  soundOn: boolean;
  xp: number;
  completed: string[];
  streak: Streak;
}

function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round(
    (Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86400000
  );
}

/**
 * All the progress logic (XP, level, completed stations, theme, sound, streak)
 * for a science subject, persisted under its own localStorage key. Each subject
 * wraps this in its own React context + directly-exported Provider, so Next's
 * "use client" boundary produces proper client references.
 */
export function useSubjectState(storageKey: string): SubjectState {
  const [theme, setTheme] = useState<Theme>("light");
  const [soundOn, setSoundOn] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [streak, setStreak] = useState<Streak>({ count: 0, lastVisit: "" });

  useEffect(() => {
    let p: Partial<Persisted> = {};
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) p = JSON.parse(raw) as Persisted;
    } catch {
      /* ignore */
    }
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    setTheme(p.theme ?? (prefersDark ? "dark" : "light"));
    setSoundOn(p.soundOn ?? false);
    setReduceMotion(
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    );
    setXp(p.xp ?? 0);
    setCompleted(p.completed ?? []);

    const today = todayKey();
    const prev = p.streak ?? { count: 0, lastVisit: "" };
    let next: Streak;
    if (!prev.lastVisit) next = { count: 1, lastVisit: today };
    else {
      const gap = daysBetween(prev.lastVisit, today);
      next =
        gap === 0
          ? prev
          : gap === 1
            ? { count: prev.count + 1, lastVisit: today }
            : { count: 1, lastVisit: today };
    }
    setStreak(next);
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({ theme, soundOn, xp, completed, streak } as Persisted)
      );
    } catch {
      /* ignore */
    }
  }, [storageKey, hydrated, theme, soundOn, xp, completed, streak]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    []
  );
  const toggleSound = useCallback(() => setSoundOn((s) => !s), []);
  const addXp = useCallback((n: number) => setXp((x) => x + n), []);

  const complete = useCallback((id: string, gain: number): number => {
    let awarded = 0;
    setCompleted((prev) => {
      if (prev.includes(id)) return prev;
      awarded = gain;
      return [...prev, id];
    });
    if (awarded) setXp((x) => x + awarded);
    return awarded;
  }, []);

  const isDone = useCallback((id: string) => completed.includes(id), [completed]);

  const resetProgress = useCallback(() => {
    setXp(0);
    setCompleted([]);
    setStreak({ count: 1, lastVisit: todayKey() });
  }, []);

  const level = useMemo(() => levelFromXp(xp), [xp]);

  return useMemo<SubjectState>(
    () => ({
      hydrated,
      theme,
      toggleTheme,
      soundOn,
      toggleSound,
      reduceMotion,
      xp,
      level,
      completed,
      complete,
      isDone,
      addXp,
      streak,
      resetProgress,
    }),
    [
      hydrated,
      theme,
      toggleTheme,
      soundOn,
      toggleSound,
      reduceMotion,
      xp,
      level,
      completed,
      complete,
      isDone,
      addXp,
      streak,
      resetProgress,
    ]
  );
}
