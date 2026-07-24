import { CHAPTERS } from "./chapters";
import { CHARACTERS } from "./characters";
import { TIMELINE } from "./timeline";

/**
 * A small, syllabus-safe knowledge base powering natural-language search and the
 * "AI Tutor" panel. Answers are pre-authored so the app works fully offline and
 * never wanders outside the 2261 syllabus. A real OpenAI key can be wired into
 * /api/tutor later; this is the deterministic fallback the UI always uses.
 */

export interface QA {
  q: string;
  /** keywords used for matching. */
  keys: string[];
  answer: string;
  /** chapter slug to jump to. */
  chapter?: string;
}

export const QUESTIONS: QA[] = [
  {
    q: "Why did Hitler invade Poland?",
    keys: ["hitler", "invade", "poland", "1939", "start", "war"],
    chapter: "rise-of-hitler",
    answer:
      "Hitler wanted to expand German territory and overturn the Treaty of Versailles. Because Britain and France had not stopped his earlier moves (like the Rhineland and the Sudetenland), he believed he could take Poland too. This time Britain and France had promised to defend Poland, so when he invaded in September 1939 they declared war — beginning the Second World War in Europe.",
  },
  {
    q: "What caused the Cold War?",
    keys: ["cause", "cold war", "usa", "ussr", "origins", "why"],
    chapter: "origins-of-the-cold-war",
    answer:
      "The Cold War grew out of deep differences between the USA (capitalist and democratic) and the USSR (communist), each fearing the other would spread its system. Wartime conferences revealed disagreement over Eastern Europe, where Stalin set up communist governments. The USA responded with containment — the Truman Doctrine and Marshall Plan — and mutual suspicion turned wartime allies into rivals.",
  },
  {
    q: "Explain the Berlin Blockade.",
    keys: ["berlin", "blockade", "airlift", "stalin", "1948"],
    chapter: "berlin-blockade",
    answer:
      "In 1948 Stalin cut off all road, rail and canal routes into West Berlin to force the Western powers out. The West refused to leave and instead supplied the city entirely by air for almost a year — the Berlin Airlift. Stalin eventually lifted the blockade, handing the West a propaganda victory, but Germany was left permanently divided and NATO was formed.",
  },
  {
    q: "What is the difference between NATO and the Warsaw Pact?",
    keys: ["nato", "warsaw", "pact", "difference", "alliance"],
    chapter: "berlin-blockade",
    answer:
      "NATO was a defensive military alliance of Western nations, led by the USA, formed in 1949 to protect against the Soviet threat. The Warsaw Pact was the communist answer — an alliance of the USSR and Eastern European states, formed in 1955. Together they show how the Cold War divided Europe into two armed camps.",
  },
  {
    q: "Why did Japan attack Pearl Harbor?",
    keys: ["japan", "pearl harbor", "attack", "usa", "1941", "oil"],
    chapter: "japans-road-to-war",
    answer:
      "Japan needed raw materials, especially oil, for its war in China. When the USA cut off supplies to pressure Japan, its leaders decided to seize the resources of Southeast Asia by force. They attacked Pearl Harbor in December 1941 to cripple the US fleet — but this brought the USA fully into the war.",
  },
  {
    q: "Why were Germans angry about the Treaty of Versailles?",
    keys: ["versailles", "treaty", "germans", "angry", "reparations", "guilt"],
    chapter: "treaty-of-versailles",
    answer:
      "Germans were angry because the Treaty forced them to accept sole blame for the war (the War Guilt Clause), pay huge reparations, lose land, and cut their army to 100,000 men. They called it a 'diktat' — a dictated peace — and this resentment later helped Hitler win support by promising to overturn it.",
  },
  {
    q: "How did the Cuban Missile Crisis end?",
    keys: ["cuba", "missile", "crisis", "kennedy", "khrushchev", "end", "1962"],
    chapter: "cuban-missile-crisis",
    answer:
      "It ended through negotiation. Khrushchev agreed to remove the Soviet missiles from Cuba, and in return the USA promised not to invade Cuba and secretly removed some of its own missiles near the USSR. Both sides, shaken by how close they came to nuclear war, then took steps to reduce tension, such as setting up a hotline.",
  },
  {
    q: "What was appeasement?",
    keys: ["appeasement", "munich", "chamberlain", "sudetenland", "1938"],
    chapter: "rise-of-hitler",
    answer:
      "Appeasement was the policy of Britain and France of giving in to some of Hitler's demands to avoid another war. At the Munich Agreement of 1938 they let Germany take the Sudetenland. It bought time but encouraged Hitler to demand more, and failed when he invaded Poland in 1939.",
  },
  {
    q: "Why did the Cold War end?",
    keys: ["cold war", "end", "gorbachev", "collapse", "ussr", "1991"],
    chapter: "end-of-the-cold-war",
    answer:
      "The USSR was economically exhausted by the arms race and the cost of controlling Eastern Europe. Gorbachev's reforms eased tension with the West, and crucially he refused to use force to keep Eastern European governments in power. Communism there collapsed, the Berlin Wall fell in 1989, and the Soviet Union broke apart in 1991.",
  },
  {
    q: "What was the Marshall Plan?",
    keys: ["marshall", "plan", "aid", "money", "europe", "containment"],
    chapter: "origins-of-the-cold-war",
    answer:
      "The Marshall Plan was American economic aid to rebuild Western Europe after the war. The idea was that prosperous countries would be less likely to turn communist, so it was part of the US policy of containment. Stalin saw it as an attempt to spread US influence, which deepened the Cold War divide.",
  },
];

/** Very small ranked search over questions, chapters, characters and events. */
export interface SearchResult {
  kind: "answer" | "chapter" | "character" | "event";
  title: string;
  snippet: string;
  href: string;
  score: number;
}

export function searchAll(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const terms = q.split(/\s+/).filter((t) => t.length > 1);
  const score = (haystack: string) => {
    const h = haystack.toLowerCase();
    let s = 0;
    for (const t of terms) if (h.includes(t)) s += 1;
    if (h.includes(q)) s += 3;
    return s;
  };

  const results: SearchResult[] = [];

  for (const qa of QUESTIONS) {
    const s = score(qa.q + " " + qa.keys.join(" ") + " " + qa.answer);
    if (s > 0) {
      results.push({
        kind: "answer",
        title: qa.q,
        snippet: qa.answer,
        href: qa.chapter ? `/chapters/${qa.chapter}` : "/search",
        score: s + 2,
      });
    }
  }
  for (const c of CHAPTERS) {
    const s = score(c.title + " " + c.subtitle + " " + c.inquiry + " " + c.hook);
    if (s > 0)
      results.push({
        kind: "chapter",
        title: c.title,
        snippet: c.subtitle,
        href: `/chapters/${c.slug}`,
        score: s + 1,
      });
  }
  for (const ch of CHARACTERS) {
    const s = score(ch.name + " " + ch.role + " " + ch.tagline + " " + ch.bio);
    if (s > 0)
      results.push({
        kind: "character",
        title: ch.name,
        snippet: ch.tagline,
        href: `/characters/${ch.id}`,
        score: s,
      });
  }
  for (const e of TIMELINE) {
    const s = score(e.title + " " + e.description);
    if (s > 0)
      results.push({
        kind: "event",
        title: `${e.year} · ${e.title}`,
        snippet: e.description,
        href: `/chapters/${e.chapterSlug}`,
        score: s,
      });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 12);
}
