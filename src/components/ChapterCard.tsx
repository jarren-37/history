"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Chapter } from "@/content/types";
import { getPalette, paletteVars } from "@/content/palettes";
import { useApp } from "@/lib/store";
import { SceneIllustration } from "./scenes/SceneIllustration";
import { ProgressBar } from "./ui";

export function ChapterCard({
  chapter,
  index = 0,
}: {
  chapter: Chapter;
  index?: number;
}) {
  const palette = getPalette(chapter.palette);
  const { progress, hydrated } = useApp();
  const prog = progress[chapter.slug];
  const pct = prog ? (prog.completed ? 1 : (prog.page + 1) / prog.total) : 0;

  return (
    <motion.div
      style={paletteVars(chapter.palette)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/chapters/${chapter.slug}`} className="group block">
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="card h-full overflow-hidden rounded-3xl"
        >
          <div className="relative h-40 overflow-hidden">
            <SceneIllustration
              scene={chapter.pages[0]?.scene ?? "world-map"}
              className="h-full"
            />
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">
              {palette.motif} Chapter {chapter.number}
            </div>
            {hydrated && prog?.completed && (
              <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white text-base shadow-soft">
                ✓
              </div>
            )}
          </div>

          <div className="p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--c-primary)]">
              {chapter.era} · {palette.mood}
            </p>
            <h3 className="mt-1 font-display text-xl font-extrabold leading-tight transition-colors group-hover:text-[var(--c-primary)]">
              {chapter.title}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-sm text-[var(--text-soft)]">
              {chapter.hook}
            </p>

            {hydrated && pct > 0 && (
              <div className="mt-4">
                <ProgressBar value={pct} />
                <p className="mt-1.5 text-xs font-semibold text-[var(--text-faint)]">
                  {prog?.completed ? "Completed" : `${Math.round(pct * 100)}% read`}
                </p>
              </div>
            )}
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
