"use client";

import { useMemo, useState } from "react";
import type { Word } from "@/content/types";
import { contextQuestion, sample } from "@/lib/quizgen";
import { useApp } from "@/lib/store";
import { QuizSession } from "./QuizSession";

/** Fill-in-the-blank drawn from the words' own example sentences. */
export function ContextDetective({ pool }: { pool: Word[] }) {
  const { recordAnswer } = useApp();
  const [seed, setSeed] = useState(0);

  const questions = useMemo(
    () => sample(pool, Math.min(8, pool.length)).map((w) => contextQuestion(w)),
    [pool, seed]
  );

  return (
    <QuizSession
      key={seed}
      questions={questions}
      onResult={(q, ok) => recordAnswer(q.word.id, ok)}
      onReplay={() => setSeed((s) => s + 1)}
    />
  );
}
