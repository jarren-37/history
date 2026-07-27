"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getWord } from "@/content/english/words";
import { useApp } from "@/lib/english/store";
import { reviewQuestion, sample } from "@/lib/english/quizgen";
import { MCQuestionCard } from "@/components/english/MCQuestionCard";
import { Confetti } from "@/components/english/ui";
import { AchievementToast } from "@/components/english/AchievementToast";
import { OwlKeeper } from "@/components/english/Librarian";

type Phase = "idle" | "active" | "done";

export default function ReviewPage() {
  const { hydrated, dueWordIds, collection, reviewWord } = useApp();
  const [phase, setPhase] = useState<Phase>("idle");
  const [ids, setIds] = useState<string[]>([]);
  const [pos, setPos] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answeredThis, setAnsweredThis] = useState(false);

  const dueNow = hydrated ? dueWordIds() : [];
  const discovered = Object.keys(collection);

  function start(list: string[]) {
    if (list.length === 0) return;
    setIds(list);
    setPos(0);
    setCorrect(0);
    setAnsweredThis(false);
    setPhase("active");
  }

  const currentWord = ids[pos] ? getWord(ids[pos]) : undefined;
  const question = useMemo(
    () => (currentWord ? reviewQuestion(currentWord) : null),
    // rebuild only when the word changes
    [currentWord?.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  function handleAnswered(ok: boolean) {
    if (answeredThis) return;
    setAnsweredThis(true);
    if (ok) setCorrect((c) => c + 1);
    if (currentWord) reviewWord(currentWord.id, ok);
  }

  function handleNext() {
    if (pos + 1 >= ids.length) {
      setPhase("done");
    } else {
      setPos((p) => p + 1);
      setAnsweredThis(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-6 sm:px-6">
      <AchievementToast />

      <Link
        href="/english"
        className="lnk-desk mb-3 inline-flex items-center gap-1.5 text-sm font-bold"
      >
        ← Great Hall
      </Link>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-4xl">🔮</span>
        <div>
          <h1 className="h-desk font-display text-3xl font-black">
            The Remembering
          </h1>
          <p className="t-desk">
            Strengthen the words fading from your shelves.
          </p>
        </div>
      </div>

      {/* IDLE */}
      {phase === "idle" && (
        <div className="page page-frame p-6 text-center">
          <div className="mx-auto w-fit">
            <OwlKeeper size={96} />
          </div>
          {!hydrated ? (
            <p className="mt-3 text-ink-soft">Lighting the lamps…</p>
          ) : dueNow.length > 0 ? (
            <>
              <p className="mt-3 text-lg text-ink">
                <strong>{dueNow.length}</strong> word
                {dueNow.length > 1 ? "s have" : " has"} begun to fade. Shall we
                revisit them?
              </p>
              <button
                onClick={() => start(dueNow)}
                className="mt-5 rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-7 py-3 font-display text-lg font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                Begin review ({dueNow.length})
              </button>
            </>
          ) : discovered.length > 0 ? (
            <>
              <p className="mt-3 text-lg text-ink">
                Nothing is fading right now — every word is fresh in your mind.
                Wonderful work.
              </p>
              <button
                onClick={() => start(sample(discovered, Math.min(10, discovered.length)))}
                className="mt-5 rounded-full border-2 border-[var(--gold)] px-6 py-3 font-display text-base font-bold text-[var(--c-deep)] transition-transform hover:scale-105 active:scale-95"
              >
                Practise anyway ✨
              </button>
            </>
          ) : (
            <>
              <p className="mt-3 text-lg text-ink">
                You haven't discovered any words yet. Explore a hall to find your
                first treasure!
              </p>
              <Link
                href="/english/#halls"
                className="mt-5 inline-block rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-7 py-3 font-display text-lg font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105"
              >
                Explore the halls
              </Link>
            </>
          )}
        </div>
      )}

      {/* ACTIVE */}
      {phase === "active" && question && (
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--ink)_12%,transparent)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b]"
                animate={{ width: `${(pos / ids.length) * 100}%` }}
              />
            </div>
            <span className="t-desk text-sm font-bold">
              {pos + 1}/{ids.length}
            </span>
          </div>
          <MCQuestionCard
            key={question.word.id}
            q={question}
            onAnswered={handleAnswered}
            onNext={handleNext}
            nextLabel={pos + 1 >= ids.length ? "Finish" : "Next →"}
            speakWord
          />
        </div>
      )}

      {/* DONE */}
      {phase === "done" && (
        <div className="page page-frame relative overflow-hidden p-8 text-center">
          <Confetti count={30} />
          <div className="relative">
            <div className="text-5xl">🏆</div>
            <h2 className="mt-3 font-display text-3xl font-black text-ink">
              Review complete!
            </h2>
            <p className="mt-2 text-lg text-ink-soft">
              You recalled <strong className="text-ink">{correct}</strong> of{" "}
              <strong className="text-ink">{ids.length}</strong> correctly.
            </p>
            <p className="mt-1 font-hand text-2xl text-[var(--c-deep)]">
              {correct === ids.length
                ? "A perfect memory! ✨"
                : correct >= ids.length / 2
                  ? "Well done — the words grow stronger."
                  : "Every revisit plants the word deeper. Keep going!"}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setPhase("idle")}
                className="rounded-full bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-6 py-3 font-display font-extrabold text-[#2a1a0a] shadow-lg transition-transform hover:scale-105"
              >
                Review again
              </button>
              <Link
                href="/english"
                className="rounded-full border-2 border-[var(--gold)] px-6 py-3 font-display font-bold text-[var(--c-deep)] transition-transform hover:scale-105"
              >
                Back to the Hall
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
