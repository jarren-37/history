"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";

interface ChapterProgress {
  /** highest page index reached. */
  page: number;
  /** total pages, for percentage. */
  total: number;
  completed: boolean;
}

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  progress: Record<string, ChapterProgress>;
  recordPage: (slug: string, page: number, total: number) => void;
  completeChapter: (slug: string) => void;
  /** ids of characters the student has "met". */
  met: string[];
  meetCharacter: (id: string) => void;
  soundOn: boolean;
  toggleSound: () => void;
  reduceMotion: boolean;
  hydrated: boolean;
}

const AppContext = createContext<AppState | null>(null);

const STORAGE_KEY = "chronicle:v1";

interface Persisted {
  theme: Theme;
  progress: Record<string, ChapterProgress>;
  met: string[];
  soundOn: boolean;
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
  const [progress, setProgress] = useState<Record<string, ChapterProgress>>({});
  const [met, setMet] = useState<string[]>([]);
  const [soundOn, setSoundOn] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    const p = load();
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    setTheme(p.theme ?? (prefersDark ? "dark" : "light"));
    setProgress(p.progress ?? {});
    setMet(p.met ?? []);
    setSoundOn(p.soundOn ?? false);
    setReduceMotion(
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    );
    setHydrated(true);
  }, []);

  // Reflect theme onto <html> and persist all state.
  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    const data: Persisted = { theme, progress, met, soundOn };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
  }, [theme, progress, met, soundOn, hydrated]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    []
  );
  const toggleSound = useCallback(() => setSoundOn((s) => !s), []);

  const recordPage = useCallback(
    (slug: string, page: number, total: number) => {
      setProgress((prev) => {
        const cur = prev[slug];
        const nextPage = Math.max(cur?.page ?? 0, page);
        return {
          ...prev,
          [slug]: {
            page: nextPage,
            total,
            completed: cur?.completed || nextPage >= total - 1,
          },
        };
      });
    },
    []
  );

  const completeChapter = useCallback((slug: string) => {
    setProgress((prev) => ({
      ...prev,
      [slug]: {
        page: prev[slug]?.page ?? 0,
        total: prev[slug]?.total ?? 1,
        completed: true,
      },
    }));
  }, []);

  const meetCharacter = useCallback((id: string) => {
    setMet((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const value = useMemo<AppState>(
    () => ({
      theme,
      toggleTheme,
      progress,
      recordPage,
      completeChapter,
      met,
      meetCharacter,
      soundOn,
      toggleSound,
      reduceMotion,
      hydrated,
    }),
    [
      theme,
      toggleTheme,
      progress,
      recordPage,
      completeChapter,
      met,
      meetCharacter,
      soundOn,
      toggleSound,
      reduceMotion,
      hydrated,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
