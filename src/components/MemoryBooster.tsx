"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import type { Booster } from "@/content/types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** A single active-recall exercise. Renders differently per booster type. */
export function MemoryBooster({
  booster,
  onComplete,
}: {
  booster: Booster;
  onComplete?: () => void;
}) {
  return (
    <div className="card overflow-hidden rounded-3xl">
      <div className="flex items-center gap-2 bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-5 py-3 text-white">
        <span className="text-lg">🧠</span>
        <p className="font-display text-sm font-extrabold uppercase tracking-wide">
          Memory booster
        </p>
      </div>
      <div className="p-5">
        <p className="mb-4 font-display text-lg font-bold">{booster.prompt}</p>
        {booster.type === "order" && (
          <OrderBooster booster={booster} onComplete={onComplete} />
        )}
        {booster.type === "match" && (
          <MatchBooster booster={booster} onComplete={onComplete} />
        )}
        {booster.type === "fill" && (
          <FillBooster booster={booster} onComplete={onComplete} />
        )}
        {booster.type === "recall" && <RecallBooster booster={booster} onComplete={onComplete} />}
      </div>
    </div>
  );
}

/* ── Order ──────────────────────────────────────────────────────────────── */
function OrderBooster({
  booster,
  onComplete,
}: {
  booster: Extract<Booster, { type: "order" }>;
  onComplete?: () => void;
}) {
  const [items, setItems] = useState(() => shuffle(booster.items));
  const [checked, setChecked] = useState(false);
  const correct =
    checked && items.every((it, i) => it === booster.items[i]);

  return (
    <div>
      <p className="mb-3 text-sm text-[var(--text-faint)]">
        Drag the cards into the correct order.
      </p>
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={(v) => {
          setItems(v);
          setChecked(false);
        }}
        className="flex flex-col gap-2"
      >
        {items.map((item, i) => (
          <Reorder.Item
            key={item}
            value={item}
            whileDrag={{ scale: 1.03 }}
            className={`flex cursor-grab items-center gap-3 rounded-2xl border-2 bg-[var(--card)] px-4 py-3 active:cursor-grabbing ${
              checked
                ? item === booster.items[i]
                  ? "border-emerald-400"
                  : "border-rose-300"
                : "border-[var(--border)]"
            }`}
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--c-surface)] text-sm font-bold text-[var(--c-deep)]">
              {i + 1}
            </span>
            <span className="flex-1 text-sm font-semibold">{item}</span>
            <span className="text-[var(--text-faint)]">⠿</span>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <CheckRow
        onCheck={() => {
          setChecked(true);
          if (items.every((it, i) => it === booster.items[i])) onComplete?.();
        }}
        checked={checked}
        correct={correct}
        successText="Perfect order!"
        retryText="Not quite — rearrange and try again."
      />
    </div>
  );
}

/* ── Match ──────────────────────────────────────────────────────────────── */
function MatchBooster({
  booster,
  onComplete,
}: {
  booster: Extract<Booster, { type: "match" }>;
  onComplete?: () => void;
}) {
  const rights = useMemo(() => shuffle(booster.pairs.map((p) => p.right)), [booster]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});

  const done = Object.keys(matches).length === booster.pairs.length;

  function pickRight(right: string) {
    if (!selectedLeft) return;
    setMatches((m) => {
      const next = { ...m, [selectedLeft]: right };
      if (
        Object.keys(next).length === booster.pairs.length &&
        booster.pairs.every((p) => next[p.left] === p.right)
      ) {
        onComplete?.();
      }
      return next;
    });
    setSelectedLeft(null);
  }

  const rightUsed = new Set(Object.values(matches));

  return (
    <div>
      <p className="mb-3 text-sm text-[var(--text-faint)]">
        Tap a term on the left, then its match on the right.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {booster.pairs.map((p) => {
            const matched = matches[p.left];
            const isCorrect = matched === p.right;
            return (
              <button
                key={p.left}
                onClick={() => setSelectedLeft(p.left)}
                className={`rounded-2xl border-2 px-3 py-3 text-left text-sm font-semibold transition-colors ${
                  selectedLeft === p.left
                    ? "border-[var(--c-primary)] bg-[var(--c-surface)]"
                    : matched
                    ? isCorrect
                      ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                      : "border-rose-300 bg-rose-50 dark:bg-rose-900/20"
                    : "border-[var(--border)] bg-[var(--card)]"
                }`}
              >
                {p.left}
                {matched && (
                  <span className="mt-1 block text-xs font-normal text-[var(--text-faint)]">
                    → {matched}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          {rights.map((r) => (
            <button
              key={r}
              disabled={rightUsed.has(r)}
              onClick={() => pickRight(r)}
              className={`rounded-2xl border-2 px-3 py-3 text-left text-sm transition-colors ${
                rightUsed.has(r)
                  ? "border-[var(--border)] opacity-40"
                  : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--c-primary)]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      {done && (
        <Feedback
          correct={booster.pairs.every((p) => matches[p.left] === p.right)}
          successText="All matched correctly!"
          retryText="Some matches are off — tap a term to redo it."
        />
      )}
    </div>
  );
}

/* ── Fill ───────────────────────────────────────────────────────────────── */
function FillBooster({
  booster,
  onComplete,
}: {
  booster: Extract<Booster, { type: "fill" }>;
  onComplete?: () => void;
}) {
  const segments = booster.sentence.split("{{blank}}");
  const [filled, setFilled] = useState<(string | null)[]>(
    Array(booster.answers.length).fill(null)
  );
  const bank = useMemo(() => shuffle(booster.bank), [booster]);
  const nextBlank = filled.findIndex((f) => f === null);
  const allFilled = nextBlank === -1;
  const correct =
    allFilled &&
    filled.every(
      (f, i) => f?.toLowerCase() === booster.answers[i].toLowerCase()
    );

  function place(word: string) {
    if (nextBlank === -1) return;
    setFilled((prev) => {
      const next = [...prev];
      next[nextBlank] = word;
      if (
        next.every((f) => f !== null) &&
        next.every(
          (f, i) => f?.toLowerCase() === booster.answers[i].toLowerCase()
        )
      ) {
        onComplete?.();
      }
      return next;
    });
  }

  const used = filled.filter(Boolean) as string[];

  return (
    <div>
      <p className="text-base leading-8">
        {segments.map((seg, i) => (
          <span key={i}>
            {seg}
            {i < booster.answers.length && (
              <button
                onClick={() =>
                  setFilled((prev) => {
                    const next = [...prev];
                    next[i] = null;
                    return next;
                  })
                }
                className={`mx-1 inline-flex min-w-[90px] items-center justify-center rounded-xl border-2 border-dashed px-2 py-0.5 align-middle text-sm font-bold ${
                  filled[i]
                    ? correct || !allFilled
                      ? "border-[var(--c-primary)] bg-[var(--c-surface)] text-[var(--c-deep)]"
                      : filled[i]?.toLowerCase() ===
                        booster.answers[i].toLowerCase()
                      ? "border-emerald-400 text-emerald-600"
                      : "border-rose-300 text-rose-500"
                    : "border-[var(--c-secondary)] text-[var(--text-faint)]"
                }`}
              >
                {filled[i] ?? "____"}
              </button>
            )}
          </span>
        ))}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {bank.map((word) => {
          const isUsed = used.includes(word);
          return (
            <button
              key={word}
              disabled={isUsed || allFilled}
              onClick={() => place(word)}
              className={`rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition-colors ${
                isUsed
                  ? "border-[var(--border)] opacity-30"
                  : "border-[var(--c-secondary)] bg-[var(--card)] hover:border-[var(--c-primary)]"
              }`}
            >
              {word}
            </button>
          );
        })}
      </div>
      {allFilled && (
        <Feedback
          correct={correct}
          successText="Exactly right!"
          retryText="Tap a filled blank to clear it and try again."
        />
      )}
    </div>
  );
}

/* ── Recall ─────────────────────────────────────────────────────────────── */
function RecallBooster({
  booster,
  onComplete,
}: {
  booster: Extract<Booster, { type: "recall" }>;
  onComplete?: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div>
      <p className="mb-4 rounded-2xl bg-[var(--c-surface)] px-4 py-3 font-display text-lg font-bold text-[var(--c-deep)]">
        {booster.question}
      </p>
      <AnimatePresence mode="wait">
        {revealed ? (
          <motion.div
            key="answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3 text-sm leading-relaxed dark:bg-emerald-900/20"
          >
            {booster.answer}
          </motion.div>
        ) : (
          <motion.button
            key="reveal"
            exit={{ opacity: 0 }}
            onClick={() => {
              setRevealed(true);
              onComplete?.();
            }}
            className="w-full rounded-2xl bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-4 py-3 font-bold text-white transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Think first… then reveal the answer
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Shared feedback UI ─────────────────────────────────────────────────── */
function CheckRow({
  onCheck,
  checked,
  correct,
  successText,
  retryText,
}: {
  onCheck: () => void;
  checked: boolean;
  correct: boolean;
  successText: string;
  retryText: string;
}) {
  return (
    <div className="mt-4">
      <button
        onClick={onCheck}
        className="rounded-2xl bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-5 py-2.5 font-bold text-white transition-transform hover:scale-[1.02] active:scale-95"
      >
        Check answer
      </button>
      {checked && (
        <Feedback correct={correct} successText={successText} retryText={retryText} />
      )}
    </div>
  );
}

function Feedback({
  correct,
  successText,
  retryText,
}: {
  correct: boolean;
  successText: string;
  retryText: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-3 flex items-center gap-2 text-sm font-bold ${
        correct ? "text-emerald-600" : "text-rose-500"
      }`}
    >
      <span>{correct ? "🎉" : "🔁"}</span>
      {correct ? successText : retryText}
    </motion.p>
  );
}
