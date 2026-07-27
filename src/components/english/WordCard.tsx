"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Word } from "@/content/english/types";
import { rarityMeta } from "@/content/english/rarity";
import { getRoom } from "@/content/english/rooms";
import { useApp } from "@/lib/english/store";
import { speak, playChime } from "@/lib/sound";
import { RarityBadge } from "./RarityBadge";
import { MasteryMeter } from "./MasteryMeter";
import { HighlightedText } from "./ui";

const CLASS_LABEL: Record<Word["class"], string> = {
  noun: "noun",
  verb: "verb",
  adjective: "adjective",
  adverb: "adverb",
  phrase: "phrase",
};

type Tab = "memory" | "words" | "usage" | "quiz";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "memory", label: "Memory", icon: "🧠" },
  { id: "words", label: "Word Web", icon: "🕸️" },
  { id: "usage", label: "In Use", icon: "✍️" },
  { id: "quiz", label: "Test Me", icon: "🎯" },
];

/**
 * The full, storybook-style entry for a word. Meaning is always visible; the
 * deeper riches (memory trick, synonyms, examples, mini-quiz) live behind tabs.
 */
export function WordCard({ word }: { word: Word }) {
  const { has, collection, toggleFavourite } = useApp();
  const [tab, setTab] = useState<Tab>("memory");
  const discovered = has(word.id);
  const prog = collection[word.id];
  const room = getRoom(word.room);
  const rm = rarityMeta(word.rarity);

  return (
    <div className="page page-frame relative overflow-hidden p-5 sm:p-7">
      {/* soft rarity wash in the corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-2xl"
        style={{ background: rm.glow }}
      />

      {/* ── Header ── */}
      <div className="relative flex items-start gap-4">
        <div
          className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-4xl shadow-inner"
          style={{ background: `color-mix(in srgb, ${rm.glow} 45%, var(--parch))` }}
        >
          {word.motif}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl font-extrabold leading-none text-ink sm:text-4xl">
              {word.word}
            </h1>
            <RarityBadge rarity={word.rarity} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
            <button
              onClick={() => speak(word.word)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--c-surface)] px-2.5 py-1 font-semibold text-[var(--c-deep)] transition-transform hover:scale-105 active:scale-95"
              title="Hear it spoken"
            >
              🔊 <span className="font-hand text-base">{word.pronunciation}</span>
            </button>
            {word.ipa && <span className="text-ink-faint">{word.ipa}</span>}
            <em className="italic">{CLASS_LABEL[word.class]}</em>
            {room && (
              <span className="text-ink-faint">
                · {room.motif} {room.theme}
              </span>
            )}
          </div>
        </div>
        {discovered && (
          <button
            onClick={() => toggleFavourite(word.id)}
            aria-label={prog?.favourite ? "Remove favourite" : "Mark as favourite"}
            className="shrink-0 text-2xl transition-transform hover:scale-110 active:scale-90"
            title="Favourite"
          >
            {prog?.favourite ? "⭐" : "☆"}
          </button>
        )}
      </div>

      {/* ── Meaning ── */}
      <div className="relative mt-5 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--c-surface)_60%,transparent)] p-4">
        <div className="text-[11px] font-bold uppercase tracking-widest text-ink-faint">
          Meaning
        </div>
        <p className="mt-1 text-lg leading-relaxed text-ink">{word.meaning}</p>
      </div>

      {discovered && prog && (
        <div className="relative mt-3">
          <MasteryMeter box={prog.review.box} />
        </div>
      )}

      {/* ── Tabs ── */}
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ${
                active ? "text-white" : "text-ink-soft hover:text-ink"
              }`}
            >
              {active && (
                <motion.span
                  layoutId={`wc-tab-${word.id}`}
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{ background: "var(--c-primary)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span aria-hidden className="mr-1">
                {t.icon}
              </span>
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="relative mt-4 min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "memory" && <MemoryTab word={word} />}
            {tab === "words" && <WordsTab word={word} />}
            {tab === "usage" && <UsageTab word={word} />}
            {tab === "quiz" && <QuizTab word={word} discovered={discovered} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--parch)_70%,transparent)] p-3.5">
      <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-ink-faint">
        <span aria-hidden>{icon}</span> {label}
      </div>
      <div className="text-[15px] leading-relaxed text-ink">{children}</div>
    </div>
  );
}

function MemoryTab({ word }: { word: Word }) {
  return (
    <div className="grid gap-3">
      <Field label="Memory Trick" icon="✨">
        {word.trick}
      </Field>
      <Field label="A Little Story" icon="📖">
        <span className="italic">{word.story}</span>
      </Field>
    </div>
  );
}

function Chips({ items, tone }: { items: string[]; tone: "good" | "bad" | "neutral" }) {
  if (!items.length)
    return <span className="text-ink-faint">— none to speak of —</span>;
  const style =
    tone === "good"
      ? "border-emerald-600/40 text-emerald-800 bg-emerald-500/10"
      : tone === "bad"
        ? "border-rose-600/40 text-rose-800 bg-rose-500/10"
        : "border-[var(--border)] text-ink-soft bg-[var(--c-surface)]";
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <span
          key={s}
          className={`rounded-full border px-2.5 py-1 text-sm font-semibold ${style}`}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function WordsTab({ word }: { word: Word }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="Synonyms" icon="🟢">
        <Chips items={word.synonyms} tone="good" />
      </Field>
      <Field label="Antonyms" icon="🔴">
        <Chips items={word.antonyms} tone="bad" />
      </Field>
      <Field label="Goes well with" icon="🔗">
        <Chips items={word.collocations} tone="neutral" />
      </Field>
      <Field label="Common phrases" icon="💬">
        <Chips items={word.phrases} tone="neutral" />
      </Field>
    </div>
  );
}

function UsageTab({ word }: { word: Word }) {
  return (
    <div className="grid gap-3">
      <Field label="Examples" icon="💡">
        <ul className="space-y-2">
          {word.examples.map((ex, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="text-ink-faint">
                “
              </span>
              <span>
                <HighlightedText text={ex} highlights={[word.word]} />
              </span>
            </li>
          ))}
        </ul>
      </Field>
      <Field label="O-Level Standard" icon="🎓">
        <span className="italic">
          <HighlightedText text={word.olevel} highlights={[word.word]} />
        </span>
      </Field>
      <Field label="Watch out!" icon="⚠️">
        {word.mistake}
      </Field>
    </div>
  );
}

/** The single-question mastery check, with instant feedback. */
function QuizTab({ word, discovered }: { word: Word; discovered: boolean }) {
  const { recordAnswer } = useApp();
  const [picked, setPicked] = useState<number | null>(null);
  const q = word.quiz;

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === q.answer;
    playChime(correct);
    if (discovered) recordAnswer(word.id, correct);
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--parch)_70%,transparent)] p-4">
      <p className="font-display text-lg font-bold text-ink">{q.prompt}</p>
      <div className="mt-3 grid gap-2">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answer;
          const isPicked = picked === i;
          const revealed = picked !== null;
          let cls =
            "border-[var(--border)] bg-[var(--parch)] hover:border-[var(--c-primary)]";
          if (revealed && isAnswer)
            cls = "border-emerald-600 bg-emerald-500/15 text-emerald-900";
          else if (revealed && isPicked)
            cls = "border-rose-600 bg-rose-500/15 text-rose-900";
          else if (revealed) cls = "border-[var(--border)] opacity-60";
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={revealed}
              className={`flex items-center justify-between rounded-xl border-2 px-4 py-2.5 text-left font-semibold text-ink transition-colors ${cls}`}
            >
              <span>{opt}</span>
              {revealed && isAnswer && <span aria-hidden>✓</span>}
              {revealed && isPicked && !isAnswer && <span aria-hidden>✗</span>}
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {picked !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 overflow-hidden"
          >
            <p className="text-sm text-ink-soft">
              {picked === q.answer ? (
                <span className="font-bold text-emerald-800">Correct! </span>
              ) : (
                <span className="font-bold text-rose-800">Not quite. </span>
              )}
              {q.explain}
              {discovered && picked === q.answer && (
                <span className="ml-1 text-[var(--c-deep)]">+5 XP</span>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
