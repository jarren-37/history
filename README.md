# 📖 Project Chronicle

### The storybook that teaches Singapore O-Level Combined History (2261)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/jarren-37/history)

**One-click deploy →** the button above spins the whole app up on
[Render](https://render.com) from the included `render.yaml` blueprint (free
plan, no configuration, no secrets required).

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
npm run start    # http://localhost:3000  (respects $PORT)
```

## 📲 Installable PWA (offline-first)

Project Chronicle is a full Progressive Web App — students can **install it to
the home screen** and read entirely **offline** (perfect for revising on the
train).

- **Web manifest** (`public/manifest.webmanifest`) — standalone display, dark
  candlelit theme colours, app shortcuts (Timeline, Cast, Exams) and a full
  icon set.
- **Icons** — maskable + "any" PNGs at 192/512, a 180px apple-touch-icon and a
  favicon, all rendered from the leather-book vector in `public/icons/`.
- **Service worker** (`public/sw.js`) — precaches the app shell and every core
  route, serves navigations network-first (falling back to cache, then a styled
  `offline.html`), and runtime-caches Next's static assets so any visited
  chapter works with no connection. Registered automatically in production only
  (`components/ServiceWorker.tsx`).

Install: open the production build in Chrome/Edge/Safari → **Install app** /
**Add to Home Screen**.

## ☁️ Deployment

The app is a standard Next.js 14 project and deploys anywhere.

**Render (one click):** click the **Deploy to Render** button at the top of this
README. It reads `render.yaml`, provisions a free web service, runs
`npm ci && npm run build`, starts it with `npm run start`, and health-checks
`/`. Node is pinned via `.node-version` / `NODE_VERSION`; nothing else is
required. To enable a live AI tutor later, add `OPENAI_API_KEY` in the Render
dashboard.

**Vercel / Netlify (zero-config):** import the repo — the framework is detected
automatically. No environment variables are required (the AI tutor falls back to
bundled syllabus content; set `OPENAI_API_KEY` later to enable a live model in
`app/api/tutor/route.ts`).

**Any Node host:** `npm run build && npm run start` (honours `$PORT`).

**Docker (self-contained, ~no extra config):**

```bash
docker build -t project-chronicle .
docker run -p 3000:3000 project-chronicle
```

The image builds with `BUILD_STANDALONE=1`, which emits Next's
[standalone output](https://nextjs.org/docs/app/api-reference/next-config-js/output)
(`.next/standalone`) — a minimal server bundled with only the dependencies it
needs — and copies `public/` and `.next/static` alongside it. The final image
runs `node server.js` as a non-root user. (Standalone is opt-in via the env var
so the plain `npm start` flow keeps working locally.)

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
