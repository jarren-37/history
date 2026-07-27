import { NextResponse } from "next/server";
import { searchAll } from "@/content/history/answers";
import { TUTOR } from "@/content/history/tutor";

/**
 * AI Tutor endpoint.
 *
 * If OPENAI_API_KEY is set, this is where a real model call would go, with a
 * system prompt that pins the assistant strictly to the 2261 syllabus. Until
 * then (and whenever offline), it falls back to the deterministic, pre-authored
 * syllabus-safe knowledge base so the app never invents extra facts.
 */

export const runtime = "nodejs";

interface TutorRequest {
  question?: string;
  chapterSlug?: string;
  mode?: keyof (typeof TUTOR)[string];
}

export async function POST(req: Request) {
  let body: TutorRequest;
  try {
    body = (await req.json()) as TutorRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { question, chapterSlug, mode } = body;

  // Chapter-scoped quick modes (simpler / eli10 / analogy / matters / …).
  if (chapterSlug && mode && TUTOR[chapterSlug]) {
    const content = TUTOR[chapterSlug][mode];
    return NextResponse.json({
      source: "syllabus",
      answer: Array.isArray(content) ? content.join("\n") : content,
    });
  }

  if (!question) {
    return NextResponse.json({ error: "Missing question" }, { status: 400 });
  }

  // Placeholder for a real model call, guarded so builds never require a key.
  // const key = process.env.OPENAI_API_KEY;
  // if (key) { /* call the model with a syllabus-locked system prompt */ }

  const results = searchAll(question);
  const best = results.find((r) => r.kind === "answer") ?? results[0];

  if (!best) {
    return NextResponse.json({
      source: "syllabus",
      answer:
        "That appears to be outside the 2261 syllabus, so I can't answer it here. Ask about the Treaty of Versailles, the rise of Hitler, Japan's expansion, the Cold War, Berlin, Cuba, or the end of the Cold War.",
    });
  }

  return NextResponse.json({
    source: "syllabus",
    answer: best.snippet,
    related: results.slice(0, 4).map((r) => ({ title: r.title, href: r.href })),
  });
}
