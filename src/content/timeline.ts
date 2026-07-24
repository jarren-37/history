import type { PaletteKey } from "./palettes";

export interface TimelineEvent {
  id: string;
  year: number;
  /** Optional finer date label, e.g. "Oct 1962". */
  dateLabel?: string;
  title: string;
  chapterSlug: string;
  palette: PaletteKey;
  /** One or two sentences — syllabus scope. */
  description: string;
  /** Optional emoji motif. */
  icon?: string;
}

/**
 * The single spine of the whole story. Events are ordered chronologically and
 * every one links back to the chapter it belongs to, so the timeline doubles
 * as a map of the syllabus.
 */
export const TIMELINE: TimelineEvent[] = [
  {
    id: "versailles-signed",
    year: 1919,
    dateLabel: "Jun 1919",
    title: "Treaty of Versailles signed",
    chapterSlug: "treaty-of-versailles",
    palette: "versailles",
    icon: "📜",
    description:
      "The peace treaty forced harsh terms on Germany: loss of land, a tiny army, reparations and the War Guilt Clause.",
  },
  {
    id: "league-formed",
    year: 1920,
    title: "League of Nations begins",
    chapterSlug: "treaty-of-versailles",
    palette: "versailles",
    icon: "🕊️",
    description:
      "An international organisation set up to keep peace — but weakened from the start by absent great powers and no army.",
  },
  {
    id: "manchuria",
    year: 1931,
    title: "Japan invades Manchuria",
    chapterSlug: "japans-road-to-war",
    palette: "japan",
    icon: "🌅",
    description:
      "Japan seized Manchuria for its resources. The League of Nations condemned it but could not stop it.",
  },
  {
    id: "hitler-power",
    year: 1933,
    title: "Hitler comes to power",
    chapterSlug: "rise-of-hitler",
    palette: "hitler",
    icon: "🕯️",
    description:
      "Amid depression and anger at Versailles, Hitler became leader of Germany and began to overturn the treaty.",
  },
  {
    id: "rhineland",
    year: 1936,
    title: "Rhineland remilitarised",
    chapterSlug: "rise-of-hitler",
    palette: "hitler",
    icon: "🪖",
    description:
      "Hitler sent troops into the demilitarised Rhineland, breaking Versailles. Britain and France did not act.",
  },
  {
    id: "china-war",
    year: 1937,
    title: "Japan invades China",
    chapterSlug: "japans-road-to-war",
    palette: "japan",
    icon: "⚔️",
    description:
      "Japan's war in China deepened, straining relations with the USA and worsening its need for resources.",
  },
  {
    id: "munich",
    year: 1938,
    dateLabel: "Sep 1938",
    title: "Munich Agreement",
    chapterSlug: "rise-of-hitler",
    palette: "hitler",
    icon: "🤝",
    description:
      "Britain and France let Germany take the Sudetenland — the high point of appeasement — hoping for 'peace for our time'.",
  },
  {
    id: "poland",
    year: 1939,
    dateLabel: "Sep 1939",
    title: "Germany invades Poland",
    chapterSlug: "rise-of-hitler",
    palette: "hitler",
    icon: "🔥",
    description:
      "Hitler invaded Poland. Britain and France declared war — the Second World War in Europe had begun.",
  },
  {
    id: "pearl-harbor",
    year: 1941,
    dateLabel: "Dec 1941",
    title: "Attack on Pearl Harbor",
    chapterSlug: "japans-road-to-war",
    palette: "japan",
    icon: "🌅",
    description:
      "After the USA cut off resources, Japan attacked the US fleet at Pearl Harbor, bringing America into the war.",
  },
  {
    id: "yalta",
    year: 1945,
    dateLabel: "Feb 1945",
    title: "Yalta Conference",
    chapterSlug: "origins-of-the-cold-war",
    palette: "coldwar",
    icon: "❄️",
    description:
      "The Allies planned the post-war world, but disagreements over Eastern Europe began to surface.",
  },
  {
    id: "potsdam",
    year: 1945,
    dateLabel: "Jul 1945",
    title: "Potsdam Conference",
    chapterSlug: "origins-of-the-cold-war",
    palette: "coldwar",
    icon: "❄️",
    description:
      "With new leaders and growing suspicion, tension between the USA and USSR deepened after the war in Europe.",
  },
  {
    id: "korea-divided",
    year: 1945,
    title: "Korea divided at the 38th parallel",
    chapterSlug: "the-korean-war",
    palette: "korea",
    icon: "🗺️",
    description:
      "After the war, Korea was split into a communist North and a capitalist South — a Cold War fault line in Asia.",
  },
  {
    id: "iron-curtain",
    year: 1946,
    title: "'Iron Curtain' speech",
    chapterSlug: "origins-of-the-cold-war",
    palette: "coldwar",
    icon: "🎙️",
    description:
      "Churchill warned that an 'Iron Curtain' had descended across Europe, dividing the communist East from the West.",
  },
  {
    id: "truman-doctrine",
    year: 1947,
    title: "Truman Doctrine & Marshall Plan",
    chapterSlug: "origins-of-the-cold-war",
    palette: "coldwar",
    icon: "💵",
    description:
      "The USA pledged to contain communism and sent economic aid to rebuild Western Europe.",
  },
  {
    id: "berlin-blockade",
    year: 1948,
    dateLabel: "1948–49",
    title: "Berlin Blockade & Airlift",
    chapterSlug: "berlin-blockade",
    palette: "berlin",
    icon: "✈️",
    description:
      "Stalin blockaded West Berlin; the West supplied the city by air for almost a year until the blockade was lifted.",
  },
  {
    id: "nato",
    year: 1949,
    title: "NATO formed",
    chapterSlug: "berlin-blockade",
    palette: "berlin",
    icon: "🛡️",
    description:
      "Western nations formed a defensive alliance against the Soviet threat; the Warsaw Pact answered it in 1955.",
  },
  {
    id: "korea-invasion",
    year: 1950,
    dateLabel: "Jun 1950",
    title: "North Korea invades the South",
    chapterSlug: "the-korean-war",
    palette: "korea",
    icon: "⚔️",
    description:
      "North Korea crossed the 38th parallel to unite Korea by force, turning the Cold War 'hot' for the first time.",
  },
  {
    id: "china-enters-korea",
    year: 1950,
    dateLabel: "Oct 1950",
    title: "China enters the Korean War",
    chapterSlug: "the-korean-war",
    palette: "korea",
    icon: "🇨🇳",
    description:
      "As UN forces neared its border, China sent huge numbers of troops, driving them back to a stalemate.",
  },
  {
    id: "korea-armistice",
    year: 1953,
    title: "Korean War armistice",
    chapterSlug: "the-korean-war",
    palette: "korea",
    icon: "🤝",
    description:
      "A ceasefire left Korea divided at the 38th parallel — a war with no winner, and the country still split today.",
  },
  {
    id: "cuba-crisis",
    year: 1962,
    dateLabel: "Oct 1962",
    title: "Cuban Missile Crisis",
    chapterSlug: "cuban-missile-crisis",
    palette: "cuba",
    icon: "🚀",
    description:
      "For thirteen days the world stood on the brink of nuclear war before the missiles in Cuba were withdrawn.",
  },
  {
    id: "wall-falls",
    year: 1989,
    title: "Fall of the Berlin Wall",
    chapterSlug: "end-of-the-cold-war",
    palette: "collapse",
    icon: "🧱",
    description:
      "As communist governments collapsed across Eastern Europe, the Berlin Wall was opened — a symbol of the Cold War's end.",
  },
  {
    id: "ussr-ends",
    year: 1991,
    title: "The Soviet Union ends",
    chapterSlug: "end-of-the-cold-war",
    palette: "collapse",
    icon: "🕊️",
    description:
      "The Soviet Union broke apart, bringing the Cold War to a close after more than forty years.",
  },
];

export function eventsForChapter(slug: string): TimelineEvent[] {
  return TIMELINE.filter((e) => e.chapterSlug === slug);
}
