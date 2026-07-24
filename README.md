# 📖 Project Chronicle

### The storybook that teaches Singapore O-Level Combined History (2261)

Project Chronicle turns the entire Singapore Cambridge / SEAB O-Level Combined
History (2261) syllabus into an **interactive animated storybook**. The goal is
not to display notes — it is to make students feel like they are reading an
illustrated historical novel where every event naturally flows into the next, so
that **understanding leads to long-term memory retention** and better exam
performance.

> Every explanation stays **strictly inside the official 2261 syllabus**. No
> myths, no extra facts, no content beyond the Cambridge / SEAB learning
> outcomes.

---

## ✨ What's inside

A calm, Ghibli-meets-Duolingo design language — soft colours, rounded UI, gentle
shadows and smooth Framer Motion transitions — wrapped around evidence-based
learning science.

| Feature | What it does |
| --- | --- |
| **📚 Story Mode** | Each chapter is a page-turning storybook: large hand-built animated illustrations, narration (2–4 short paragraphs), dialogue bubbles, highlighted key words and smooth transitions. |
| **🧭 Story Choices** | "If you were Britain in 1938, what would you do?" — the student chooses, then the app reveals what actually happened and why. |
| **🧠 Memory Boosters** | Active-recall breaks between pages: drag-to-order timelines, matching, fill-the-blank and think-first recall. The story only continues once you engage. |
| **🖼️ Big Picture** | Every chapter ends with an expandable cause-and-effect chain so the whole story clicks into place. |
| **🎯 Exam Memory Mode** | Layered revision: one-sentence → three-sentence → five-sentence → full PEEL exam paragraph. |
| **📝 Exam Mode** | Real O-Level SBQ (Inference, Purpose, Reliability, Comparison…) and SEQ (Explain, Judgement) questions, each with a 2261-style mark scheme and a model answer. |
| **🕰️ Timeline Mode** | An interactive horizontal spine of history; tap any moment to expand it and jump into its chapter. |
| **🎭 Characters** | Historical figures as recurring characters, with an interactive relationship graph and full profiles (goals, beliefs, actions, consequences). |
| **🗺️ Map Mode** | A stylised, replayable world map — German & Japanese expansion, the Iron Curtain, the Berlin Airlift and the Cuban Missile Crisis come to life. |
| **🔍 Natural-language Search** | Ask "Why did Hitler invade Poland?" and get a syllabus-safe answer. |
| **🦉 AI Tutor** | A floating tutor on every chapter: "Explain simpler", "Like I'm 10", "Give an analogy", "What to memorise", "Common O-Level mistakes". |
| **🎨 Per-chapter palettes** | Each chapter has its own colour identity (WW2 red, Japan orange, Cold War blue, Berlin grey…) so colour itself becomes a memory cue. |
| **🌗 Dark / light mode · PWA · Offline** | Theme-aware, installable, and fully usable offline. |

## 📚 Chapters (all within 2261)

**World War Two** — Treaty of Versailles · The Rise of Hitler & the Road to War ·
Japan's Road to War
**The Cold War** — Origins of the Cold War · The Berlin Blockade & Airlift ·
The Cuban Missile Crisis · The End of the Cold War

---

## 🛠️ Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for the design system
- **Framer Motion** for all animation (fade / slide / zoom / parallax / SVG)
- Hand-built, self-contained **animated SVG scenes** (no external Lottie assets →
  works fully offline)
- **PWA**: web manifest + service worker (network-first pages, cache-first assets)
- Client-side progress persistence via `localStorage`
- **Prisma + SQLite** reference schema (`prisma/schema.prisma`) for optional
  server-side, cross-device progress sync
- **OpenAI API placeholder** (`src/app/api/tutor/route.ts`) — pins the assistant
  to the syllabus; falls back to a deterministic, syllabus-safe knowledge base so
  nothing is ever invented

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

## 🗂️ Project structure

```
src/
├── app/                  # App Router pages (library, chapter reader, timeline,
│   │                     #   characters, map, exam, search, api/tutor)
│   ├── globals.css       # design tokens, palette variables, dark mode
│   └── layout.tsx
├── components/
│   ├── scenes/           # hand-built animated SVG illustrations
│   ├── StoryReader.tsx   # the page-turning storybook engine
│   ├── MemoryBooster.tsx # drag-order / match / fill / recall
│   ├── CauseEffect.tsx   # Big Picture chains
│   ├── ExamCard.tsx      # O-Level questions + mark schemes
│   ├── ExamMemory.tsx    # layered summaries + PEEL
│   ├── CharacterGraph.tsx# relationship graph
│   ├── MapMode.tsx       # replayable map scenarios
│   └── AITutor.tsx       # floating syllabus tutor
├── content/              # all syllabus content (chapters, characters,
│   │                     #   timeline, exam, tutor, palettes) — typed
│   └── types.ts
└── lib/store.tsx         # theme + progress context (localStorage)
```

## 🎓 Learning-science principles

- **Storytelling over facts** — cause → effect → consequence, so events feel
  inevitable rather than arbitrary.
- **Active recall** — the story pauses for retrieval practice before continuing.
- **Dual coding** — words paired with illustrations and colour-coded chapters.
- **Spaced, layered revision** — Exam Memory Mode lets students expand and
  compress the same idea.
- **Understanding first** — every chapter aims to leave the student thinking
  *"that makes complete sense"* rather than *"I need to memorise this."*

---

_Built as a beautiful, calm, syllabus-faithful way to learn history as one big,
unfolding story._
