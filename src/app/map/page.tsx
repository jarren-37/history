"use client";

import { MapMode } from "@/components/MapMode";

export default function MapPage() {
  return (
    <div className="pb-24">
      <section className="relative overflow-hidden px-4 pt-10">
        <div className="aurora" />
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--c-primary)]">
            🗺️ Map mode
          </span>
          <h1 className="mt-4 font-display text-4xl font-black sm:text-5xl">
            Watch the world change
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[var(--text-soft)]">
            Replay the great movements of the syllabus. Pick a scenario and watch
            borders, alliances and armies come to life.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-4xl px-4">
        <MapMode />
      </section>
    </div>
  );
}
