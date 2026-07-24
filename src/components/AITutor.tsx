"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TUTOR } from "@/content/tutor";
import { searchAll } from "@/content/answers";

interface Msg {
  role: "you" | "tutor";
  text: string;
}

const QUICK = [
  { key: "simpler", label: "Explain simpler", icon: "🪶" },
  { key: "eli10", label: "Like I'm 10", icon: "🧒" },
  { key: "analogy", label: "Give an analogy", icon: "🔗" },
  { key: "matters", label: "Why it matters", icon: "💡" },
  { key: "memorise", label: "What to memorise", icon: "📌" },
  { key: "mistakes", label: "Common mistakes", icon: "⚠️" },
] as const;

/**
 * Floating tutor. Context-aware when a chapterSlug is provided. All answers are
 * drawn from pre-authored, syllabus-safe content (or the local search index),
 * so it works offline and never wanders outside 2261.
 */
export function AITutor({
  chapterSlug,
  chapterTitle,
}: {
  chapterSlug?: string;
  chapterTitle?: string;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const tutor = chapterSlug ? TUTOR[chapterSlug] : undefined;

  function push(role: Msg["role"], text: string) {
    setMessages((m) => [...m, { role, text }]);
  }

  function quick(key: (typeof QUICK)[number]["key"]) {
    if (!tutor) return;
    push("you", QUICK.find((q) => q.key === key)!.label);
    let ans = "";
    if (key === "memorise") ans = "📌 " + tutor.memorise.join("\n📌 ");
    else if (key === "mistakes") ans = "⚠️ " + tutor.mistakes.join("\n⚠️ ");
    else ans = tutor[key];
    setTimeout(() => push("tutor", ans), 250);
  }

  function ask(q: string) {
    if (!q.trim()) return;
    push("you", q);
    setInput("");
    const results = searchAll(q);
    const answer = results.find((r) => r.kind === "answer");
    setTimeout(() => {
      if (answer) push("tutor", answer.snippet);
      else if (results[0]) push("tutor", results[0].snippet);
      else
        push(
          "tutor",
          "That looks like it's outside this syllabus, so I can't help with it here. Try asking about the Treaty of Versailles, the rise of Hitler, Japan's expansion, the Cold War, Berlin, Cuba, or how the Cold War ended."
        );
    }, 300);
  }

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[var(--c-primary)] to-[var(--c-deep)] text-2xl text-white shadow-soft-lg"
        aria-label="Open the AI tutor"
      >
        {open ? "✕" : "🦉"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="card fixed bottom-24 right-5 z-50 flex max-h-[70vh] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl"
          >
            <div className="bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-4 py-3 text-white">
              <p className="font-display text-base font-extrabold">Owl, your history tutor</p>
              <p className="text-xs opacity-80">
                {chapterTitle
                  ? `Helping with: ${chapterTitle}`
                  : "Ask me anything in the syllabus"}
              </p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="rounded-2xl bg-[var(--c-surface)] px-4 py-3 text-sm text-[var(--text-soft)]">
                  {tutor
                    ? "Hi! Tap a shortcut below, or type a question about this chapter."
                    : "Hi! Ask me a question like “What caused the Cold War?”"}
                </div>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "you"
                      ? "ml-auto rounded-br-md bg-gradient-to-br from-[var(--c-primary)] to-[var(--c-deep)] text-white"
                      : "rounded-bl-md bg-[var(--c-surface)] text-[var(--text)]"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {tutor && (
              <div className="flex flex-wrap gap-1.5 border-t border-[var(--border)] px-3 py-2">
                {QUICK.map((q) => (
                  <button
                    key={q.key}
                    onClick={() => quick(q.key)}
                    className="rounded-full border border-[var(--border)] bg-[var(--card)] px-2.5 py-1 text-xs font-semibold transition-colors hover:border-[var(--c-primary)]"
                  >
                    {q.icon} {q.label}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 border-t border-[var(--border)] p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm outline-none focus:border-[var(--c-primary)]"
              />
              <button
                type="submit"
                className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[var(--c-primary)] to-[var(--c-deep)] text-white"
                aria-label="Send"
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
