"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { WORDS, getWord } from "@/content/english/words";
import { ROOMS } from "@/content/english/rooms";
import { ACHIEVEMENTS } from "@/content/english/missions";
import { rarityMeta } from "@/content/english/rarity";
import {
  initReview,
  reviewNext,
  isDue,
  isMastered,
  levelFromXp,
  type LevelInfo,
  type ReviewState,
} from "@/lib/english/progression";

type Theme = "light" | "dark";

/** Everything the player has learned about a single word. */
export interface WordProgress {
  discoveredAt: number;
  review: ReviewState;
  /** Times the word was used in a writing mission. */
  timesUsed: number;
  quizAttempts: number;
  quizCorrect: number;
  favourite: boolean;
}

interface Streak {
  count: number;
  /** Local date string (YYYY-MM-DD) of the last visit. */
  lastVisit: string;
}

interface AppState {
  hydrated: boolean;
  theme: Theme;
  toggleTheme: () => void;
  soundOn: boolean;
  toggleSound: () => void;
  reduceMotion: boolean;

  /** The word collection, keyed by word id. */
  collection: Record<string, WordProgress>;
  xp: number;
  level: LevelInfo;
  streak: Streak;
  missionsCompleted: string[];
  dailyClaimedOn: string;

  // ── actions ──
  /** Discover a word. Returns the XP gained (0 if already discovered). */
  discoverWord: (id: string) => number;
  /** Record a mini-quiz / game answer for a word (also nudges the SRS box). */
  recordAnswer: (id: string, correct: boolean) => void;
  /** Record a spaced-repetition review outcome. */
  reviewWord: (id: string, correct: boolean) => void;
  toggleFavourite: (id: string) => void;
  /** Mark words used in writing; awards a little XP per new usage. */
  markWordsUsed: (ids: string[]) => void;
  completeMission: (id: string, xp: number) => void;
  claimDaily: (dateKey: string, xp: number) => boolean;
  addXp: (amount: number) => void;
  resetProgress: () => void;

  // ── derived helpers ──
  has: (id: string) => boolean;
  dueWordIds: () => string[];
  discoveredCount: number;
  masteredCount: number;
  achievementsUnlocked: string[];
  newAchievements: string[];
  markAchievementsSeen: () => void;
}

const AppContext = createContext<AppState | null>(null);
const STORAGE_KEY = "lexicon:v1";

interface Persisted {
  theme: Theme;
  soundOn: boolean;
  collection: Record<string, WordProgress>;
  xp: number;
  streak: Streak;
  missionsCompleted: string[];
  dailyClaimedOn: string;
  achievementsSeen: string[];
}

function todayKey(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = Date.UTC(ay, am - 1, ad);
  const db = Date.UTC(by, bm - 1, bd);
  return Math.round((db - da) / (24 * 60 * 60 * 1000));
}

function load(): Partial<Persisted> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Persisted) : {};
  } catch {
    return {};
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [soundOn, setSoundOn] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const [collection, setCollection] = useState<Record<string, WordProgress>>({});
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState<Streak>({ count: 0, lastVisit: "" });
  const [missionsCompleted, setMissionsCompleted] = useState<string[]>([]);
  const [dailyClaimedOn, setDailyClaimedOn] = useState("");
  const [achievementsSeen, setAchievementsSeen] = useState<string[]>([]);

  // Hydrate once, and update the daily streak on arrival.
  useEffect(() => {
    const p = load();
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    setTheme(p.theme ?? (prefersDark ? "dark" : "light"));
    setSoundOn(p.soundOn ?? false);
    setReduceMotion(
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    );
    setCollection(p.collection ?? {});
    setXp(p.xp ?? 0);
    setMissionsCompleted(p.missionsCompleted ?? []);
    setDailyClaimedOn(p.dailyClaimedOn ?? "");
    setAchievementsSeen(p.achievementsSeen ?? []);

    // Streak: continue if last visit was yesterday, keep if today, else reset.
    const today = todayKey();
    const prev = p.streak ?? { count: 0, lastVisit: "" };
    let next: Streak;
    if (!prev.lastVisit) next = { count: 1, lastVisit: today };
    else {
      const gap = daysBetween(prev.lastVisit, today);
      if (gap === 0) next = prev;
      else if (gap === 1) next = { count: prev.count + 1, lastVisit: today };
      else next = { count: 1, lastVisit: today };
    }
    setStreak(next);
    setHydrated(true);
  }, []);

  // Persist + reflect theme onto <html>.
  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    const data: Persisted = {
      theme,
      soundOn,
      collection,
      xp,
      streak,
      missionsCompleted,
      dailyClaimedOn,
      achievementsSeen,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
  }, [
    hydrated,
    theme,
    soundOn,
    collection,
    xp,
    streak,
    missionsCompleted,
    dailyClaimedOn,
    achievementsSeen,
  ]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    []
  );
  const toggleSound = useCallback(() => setSoundOn((s) => !s), []);
  const addXp = useCallback((amount: number) => setXp((x) => x + amount), []);

  const discoverWord = useCallback((id: string): number => {
    const word = getWord(id);
    if (!word) return 0;
    let gained = 0;
    setCollection((prev) => {
      if (prev[id]) return prev; // already discovered
      gained = rarityMeta(word.rarity).xp;
      return {
        ...prev,
        [id]: {
          discoveredAt: Date.now(),
          review: initReview(),
          timesUsed: 0,
          quizAttempts: 0,
          quizCorrect: 0,
          favourite: false,
        },
      };
    });
    if (gained) setXp((x) => x + gained);
    return gained;
  }, []);

  const recordAnswer = useCallback((id: string, correct: boolean) => {
    setCollection((prev) => {
      const cur = prev[id];
      if (!cur) return prev;
      return {
        ...prev,
        [id]: {
          ...cur,
          quizAttempts: cur.quizAttempts + 1,
          quizCorrect: cur.quizCorrect + (correct ? 1 : 0),
          review: reviewNext(cur.review, correct),
        },
      };
    });
    if (correct) setXp((x) => x + 5);
  }, []);

  const reviewWord = useCallback((id: string, correct: boolean) => {
    setCollection((prev) => {
      const cur = prev[id];
      if (!cur) return prev;
      return {
        ...prev,
        [id]: {
          ...cur,
          quizAttempts: cur.quizAttempts + 1,
          quizCorrect: cur.quizCorrect + (correct ? 1 : 0),
          review: reviewNext(cur.review, correct),
        },
      };
    });
    if (correct) setXp((x) => x + 8);
  }, []);

  const toggleFavourite = useCallback((id: string) => {
    setCollection((prev) => {
      const cur = prev[id];
      if (!cur) return prev;
      return { ...prev, [id]: { ...cur, favourite: !cur.favourite } };
    });
  }, []);

  const markWordsUsed = useCallback((ids: string[]) => {
    let bonus = 0;
    setCollection((prev) => {
      const next = { ...prev };
      ids.forEach((id) => {
        const cur = next[id];
        if (cur) {
          next[id] = { ...cur, timesUsed: cur.timesUsed + 1 };
          bonus += 3;
        }
      });
      return next;
    });
    if (bonus) setXp((x) => x + bonus);
  }, []);

  const completeMission = useCallback((id: string, missionXp: number) => {
    setMissionsCompleted((prev) => {
      if (prev.includes(id)) return prev;
      setXp((x) => x + missionXp);
      return [...prev, id];
    });
  }, []);

  const claimDaily = useCallback(
    (dateKey: string, dailyXp: number): boolean => {
      if (dailyClaimedOn === dateKey) return false;
      setDailyClaimedOn(dateKey);
      setXp((x) => x + dailyXp);
      return true;
    },
    [dailyClaimedOn]
  );

  const resetProgress = useCallback(() => {
    setCollection({});
    setXp(0);
    setMissionsCompleted([]);
    setDailyClaimedOn("");
    setAchievementsSeen([]);
    setStreak({ count: 1, lastVisit: todayKey() });
  }, []);

  const has = useCallback((id: string) => Boolean(collection[id]), [collection]);

  const dueWordIds = useCallback((): string[] => {
    const now = Date.now();
    return Object.entries(collection)
      .filter(([, p]) => isDue(p.review, now))
      .sort((a, b) => a[1].review.dueAt - b[1].review.dueAt)
      .map(([id]) => id);
  }, [collection]);

  const level = useMemo(() => levelFromXp(xp), [xp]);
  const discoveredCount = useMemo(
    () => Object.keys(collection).length,
    [collection]
  );
  const masteredCount = useMemo(
    () =>
      Object.values(collection).filter((p) => isMastered(p.review.box)).length,
    [collection]
  );

  // Derive which achievements are unlocked from current progress.
  const achievementsUnlocked = useMemo(() => {
    const total = WORDS.length;
    const discovered = Object.keys(collection);
    const anyMythical = discovered.some(
      (id) => getWord(id)?.rarity === "mythical"
    );
    const roomCleared = ROOMS.some((room) =>
      room.objects.every((o) => collection[o.wordId])
    );
    const unlocked = new Set<string>();
    if (discoveredCount >= 1) unlocked.add("first-word");
    if (discoveredCount >= 10) unlocked.add("ten-words");
    if (discoveredCount >= Math.ceil(total / 2)) unlocked.add("half-lexicon");
    if (discoveredCount >= total) unlocked.add("full-lexicon");
    if (anyMythical) unlocked.add("first-mythical");
    if (streak.count >= 3) unlocked.add("streak-3");
    if (streak.count >= 7) unlocked.add("streak-7");
    if (masteredCount >= 1) unlocked.add("first-mastered");
    if (masteredCount >= 10) unlocked.add("ten-mastered");
    if (level.level >= 5) unlocked.add("level-5");
    if (missionsCompleted.length >= 1) unlocked.add("first-mission");
    if (roomCleared) unlocked.add("room-cleared");
    // Preserve the authored order.
    return ACHIEVEMENTS.filter((a) => unlocked.has(a.id)).map((a) => a.id);
  }, [collection, discoveredCount, masteredCount, streak.count, level.level, missionsCompleted.length]);

  const newAchievements = useMemo(
    () => achievementsUnlocked.filter((id) => !achievementsSeen.includes(id)),
    [achievementsUnlocked, achievementsSeen]
  );

  const markAchievementsSeen = useCallback(() => {
    setAchievementsSeen(achievementsUnlocked);
  }, [achievementsUnlocked]);

  const value = useMemo<AppState>(
    () => ({
      hydrated,
      theme,
      toggleTheme,
      soundOn,
      toggleSound,
      reduceMotion,
      collection,
      xp,
      level,
      streak,
      missionsCompleted,
      dailyClaimedOn,
      discoverWord,
      recordAnswer,
      reviewWord,
      toggleFavourite,
      markWordsUsed,
      completeMission,
      claimDaily,
      addXp,
      resetProgress,
      has,
      dueWordIds,
      discoveredCount,
      masteredCount,
      achievementsUnlocked,
      newAchievements,
      markAchievementsSeen,
    }),
    [
      hydrated,
      theme,
      toggleTheme,
      soundOn,
      toggleSound,
      reduceMotion,
      collection,
      xp,
      level,
      streak,
      missionsCompleted,
      dailyClaimedOn,
      discoverWord,
      recordAnswer,
      reviewWord,
      toggleFavourite,
      markWordsUsed,
      completeMission,
      claimDaily,
      addXp,
      resetProgress,
      has,
      dueWordIds,
      discoveredCount,
      masteredCount,
      achievementsUnlocked,
      newAchievements,
      markAchievementsSeen,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

/** Stable helper for daily content, shared by the home + daily views. */
export { todayKey };
