# 📖 Lexicon

### The Vocabulary Adventure — an enchanted library for mastering English

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/jarren-37/history)

**One-click deploy →** the button above spins the whole app up on
[Render](https://render.com) from the included `render.yaml` blueprint (free
plan, no configuration, no secrets required).

**Lexicon** turns learning English vocabulary into an adventure. The player
steps into an ancient library — *The Lexicon* — whose halls are themed by
meaning (Nature, Emotion, Conflict, Success, Science, Politics, Travel…).
Words are not shown in lists; they are **treasures to be discovered**, hidden
among the objects of each hall. Uncover one and the page glows, ink spreads
across parchment, the word is written by an invisible quill, its pronunciation
plays, and a full illustrated entry unfurls.

The goal is not to help students *memorise* words. It is to make them **want to
discover a new word every day** — building vocabulary for the Singapore
Cambridge / SEAB O-Level English paper, and for life.

> "I discovered something fascinating" — never "I memorised vocabulary."

---

## ✨ What's inside

A warm, candlelit-library design language — parchment, gold leaf, iron-gall
ink, procedural ambience and smooth Framer Motion animation — wrapped around
evidence-based learning science.

| Feature | What it does |
| --- | --- |
| **🏛️ 11 themed halls** | Each hall has its own palette, mood and atmosphere. Explore, hover, and tap glowing objects to reveal the words hidden within. |
| **✨ Cinematic word reveal** | Glowing ink-spread, floating letters, an invisible quill writing the word, auto-played pronunciation and an XP reward. |
| **📇 Rich word entries** | Every word carries a plain-English meaning, memory trick, tiny story, synonyms, antonyms, collocations, phrases, real examples, an O-Level model sentence, a common-mistake warning and a mini-quiz. |
| **📚 Pokédex collection** | Discovered words enter your collection with rarity, mastery, favourites and discovery stats. Filter by hall, rarity or status; undiscovered words remain tantalising silhouettes. |
| **💎 Rarity system** | Uncommon → Rare → Epic → Legendary → Mythical. Difficult-but-beautiful words feel genuinely rewarding to unlock. |
| **🔮 Spaced repetition** | A gentle Leitner scheduler resurfaces fading words. The Keeper nudges you back — *"I believe you've almost forgotten one of our rare discoveries…"* |
| **🎲 Four mini-games** | **Word Duel** (timed blitz), **Context Detective** (fill the blank), **Synonym Match** (pairing) and **Lost Letters** (unscramble). |
| **🪶 Writing quests** | Weave target words into your own writing. A local checker verifies usage, flags weak words with stronger alternatives, and rewards you — words you use for the first time are even added to your collection. |
| **🗓️ Daily adventure** | A deterministic Word of the Day, a daily writing quest, a daily challenge and a claimable treasure chest. |
| **🎓 Progression** | XP, Scholar levels and titles, day streaks, and twelve unlockable achievements. |
| **🦉 The Keeper** | An owl librarian who guides you with contextual, in-character messages. |

---

## 🗺️ The halls

Nature · Emotion · Conflict · Success · Failure · Science · Politics · Travel ·
Relationships · Technology · Education — **46 hand-authored word treasures** in
all, chosen to lift O-Level writing and stay useful far beyond the exam.

---

## 🛠️ Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript** (strict)
- **Tailwind CSS** with CSS-variable theming (light / candlelight dark)
- **Framer Motion** for every animation
- **Web Audio API** — procedural library ambience, page turns and reward chimes (no audio files shipped)
- **Web Speech API** — offline word pronunciation (no assets)
- **localStorage** — the entire collection, XP, streak and spaced-repetition
  schedule persist locally; **no backend, no accounts, works fully offline**
- **PWA** — installable, offline-first via a service worker

---

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build and run in production mode:

```bash
npm run build
npm run start
```

Requires Node ≥ 18.17.

---

## 📲 Installable PWA (offline-first)

Lexicon ships a web app manifest and a service worker, so it can be installed to
a phone or desktop and used offline:

- **App shell precached** on first visit (core routes, icons, offline page).
- **Navigations** are network-first, falling back to cache, then a themed
  offline page.
- **Static assets** (JS chunks, fonts, images) are cached at runtime, so once a
  hall or game is visited it works fully offline.

All progress lives in `localStorage`, so a returning player keeps their entire
collection with no sign-in.

---

## ☁️ Deployment

The included `render.yaml` deploys the app on Render's free plan with no
configuration. Any Node host works too — the app is a standard Next.js server
(`npm run build && npm run start`). A `Dockerfile` is included for container
deploys (`output: "standalone"` is enabled via `BUILD_STANDALONE=1`).

---

## 🗂️ Project structure

```
src/
  app/                     # App Router pages
    page.tsx               # The Great Hall (home hub)
    room/[id]/             # Explore a themed hall
    collection/            # Pokédex-style word collection
    games/[slug]/          # Word Duel · Detective · Synonyms · Lost Letters
    review/                # Spaced-repetition review session
    write/                 # Writing quests
    daily/                 # Today's adventure
    profile/               # Scholar rank, stats & achievements
  components/              # Reveal, WordCard, RoomScene, Librarian, games/…
  content/                 # words.ts · rooms.ts · palettes.ts · rarity.ts · missions.ts
  lib/                     # store (state) · progression (XP + SRS) · quizgen · writing · sound · daily
```

- **`content/words.ts`** — the fully-authored word database (the heart of the app).
- **`content/rooms.ts`** — the 11 halls and the objects that hide each word.
- **`lib/store.tsx`** — collection, XP, streak, spaced repetition and achievements, persisted to `localStorage`.
- **`lib/progression.ts`** — the XP curve, level titles and the Leitner spaced-repetition scheduler.

---

## 🎓 Learning-science principles

- **Curiosity first** — discovery and story, not lists, drive engagement.
- **Dual coding** — every word pairs meaning with imagery, a memory trick and a scene.
- **Active recall** — quizzes and games test retrieval, not recognition.
- **Spaced repetition** — a Leitner schedule brings words back just as they fade.
- **Generative use** — writing quests force real production, the strongest form of learning.
- **Reward & progression** — rarity, XP, streaks and achievements make the habit stick.

---

*Built as a self-contained, offline-first Next.js app. Words are treasures —
go and discover them.*
