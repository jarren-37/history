"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { searchAll, QUESTIONS, type SearchResult } from "@/content/history/answers";
import { Reveal } from "@/components/history/ui";

const KIND_META: Record<
  SearchResult["kind"],
  { icon: string; label: string }
> = {
  answer: { icon: "💡", label: "Answer" },
  chapter: { icon: "📖", label: "Chapter" },
  character: { icon: "🎭", label: "Character" },
  event: { icon: "🕰️", label: "Event" },
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const results = submitted ? searchAll(submitted) : [];

  const run = (q: string) => {
    setQuery(q);
    setSubmitted(q);
  };

  return (
    <div className="pb-24">
      <section className="relative overflow-hidden px-4 pt-10">
        <div className="aurora" />
        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--c-primary)]">
            🔍 Ask anything
          </span>
          <h1 className="mt-4 gold-text font-display text-4xl font-black sm:text-5xl">
            Search the story
          </h1>
          <p className="mx-auto mt-3 max-w-lg font-serif text-[#e4cfa2]">
            Ask in plain English. Every answer stays inside the 2261 syllabus.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(query);
            }}
            className="card mt-6 flex items-center gap-2 rounded-2xl p-2"
          >
            <span className="pl-3 text-xl">🔍</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Why did Hitler invade Poland?"
              className="flex-1 bg-transparent px-2 py-2 text-base outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-5 py-2.5 font-bold text-white transition-transform hover:scale-[1.03]"
            >
              Ask
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto mt-8 max-w-2xl px-4">
        {!submitted ? (
          <Reveal>
            <p className="mb-3 text-center text-sm font-bold uppercase tracking-wide text-[#d8b978]">
              Try one of these
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {QUESTIONS.slice(0, 8).map((q) => (
                <button
                  key={q.q}
                  onClick={() => run(q.q)}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-left text-sm font-semibold transition-colors hover:border-[var(--c-primary)]"
                >
                  {q.q}
                </button>
              ))}
            </div>
          </Reveal>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={submitted}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <p className="text-sm font-bold text-[#d8b978]">
                {results.length} result{results.length === 1 ? "" : "s"} for “
                {submitted}”
              </p>
              {results.length === 0 && (
                <div className="card rounded-3xl p-6 text-center">
                  <p className="text-3xl">🧭</p>
                  <p className="mt-2 font-display font-bold">
                    That looks outside the syllabus
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">
                    Try asking about the Treaty of Versailles, Hitler, Japan, the
                    Cold War, Berlin, Cuba, or how the Cold War ended.
                  </p>
                </div>
              )}
              {results.map((r, i) => {
                const meta = KIND_META[r.kind];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={r.href}
                      className="card block rounded-3xl p-5 transition-transform hover:-translate-y-1"
                    >
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="text-lg">{meta.icon}</span>
                        <span className="rounded-full bg-[var(--c-surface)] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-[var(--c-deep)]">
                          {meta.label}
                        </span>
                      </div>
                      <p className="font-display text-lg font-extrabold leading-tight">
                        {r.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-soft)]">
                        {r.snippet}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
