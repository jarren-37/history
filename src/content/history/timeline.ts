import type { PaletteKey } from "./palettes";

export interface TimelineEvent {
  id: string;
  year: number;
  dateLabel?: string;
  title: string;
  chapterSlug: string;
  palette: PaletteKey;
  description: string;
  icon?: string;
}

/**
 * The single spine of the whole story, ordered chronologically. Each event
 * links back to its chapter (by slug), so the timeline doubles as a map of the
 * 2261 syllabus.
 */
export const TIMELINE: TimelineEvent[] = [
  { id: "versailles-signed", year: 1919, dateLabel: "Jun 1919", title: "Treaty of Versailles signed", chapterSlug: "paris-peace-conference", palette: "versailles", icon: "📜", description: "Harsh terms on Germany: war guilt, reparations, disarmament and loss of land." },
  { id: "league-formed", year: 1920, title: "League of Nations begins", chapterSlug: "paris-peace-conference", palette: "versailles", icon: "🕊️", description: "An organisation for collective security — but weakened from the start by absent great powers and no army." },
  { id: "depression", year: 1929, title: "The Great Depression", chapterSlug: "nazi-germany", palette: "hitler", icon: "📉", description: "A worldwide slump brought mass unemployment, feeding support for extremists like the Nazis." },
  { id: "japan-depression", year: 1930, title: "Depression hits Japan", chapterSlug: "militarist-japan", palette: "japan", icon: "📉", description: "Economic hardship strengthened the ultranationalists who promised strength through empire." },
  { id: "manchuria", year: 1931, title: "Japan invades Manchuria", chapterSlug: "outbreak-asia", palette: "japan", icon: "🌅", description: "Japan seized Manchuria for its resources; the League condemned it but could not act." },
  { id: "hitler-power", year: 1933, title: "Hitler comes to power", chapterSlug: "nazi-germany", palette: "hitler", icon: "🕯️", description: "Amid depression and anger at Versailles, Hitler became leader of Germany and built a dictatorship." },
  { id: "abyssinia", year: 1935, title: "Abyssinian Crisis", chapterSlug: "outbreak-europe", palette: "berlin", icon: "⚠️", description: "Italy's invasion of Abyssinia exposed the League's helplessness against a great power." },
  { id: "rhineland", year: 1936, title: "Rhineland remilitarised", chapterSlug: "outbreak-europe", palette: "berlin", icon: "🪖", description: "Hitler sent troops into the demilitarised Rhineland, breaking Versailles; Britain and France did not act." },
  { id: "china-war", year: 1937, title: "Japan invades China", chapterSlug: "outbreak-asia", palette: "japan", icon: "⚔️", description: "Japan's war in China deepened, straining relations with the USA and its need for oil." },
  { id: "anschluss", year: 1938, dateLabel: "Mar 1938", title: "Anschluss with Austria", chapterSlug: "outbreak-europe", palette: "berlin", icon: "🇩🇪", description: "Germany united with Austria, forbidden by Versailles — again without resistance." },
  { id: "munich", year: 1938, dateLabel: "Sep 1938", title: "Munich Agreement", chapterSlug: "outbreak-europe", palette: "berlin", icon: "🤝", description: "Britain and France let Germany take the Sudetenland — the high point of appeasement." },
  { id: "poland", year: 1939, dateLabel: "Sep 1939", title: "Germany invades Poland", chapterSlug: "outbreak-europe", palette: "berlin", icon: "🔥", description: "After the Nazi-Soviet Pact, Hitler invaded Poland; Britain and France declared war." },
  { id: "pearl-harbor", year: 1941, dateLabel: "Dec 1941", title: "Attack on Pearl Harbor", chapterSlug: "outbreak-asia", palette: "japan", icon: "🌅", description: "After the USA cut off oil, Japan attacked the US fleet, bringing America into the war." },
  { id: "dday", year: 1944, dateLabel: "Jun 1944", title: "D-Day landings", chapterSlug: "end-of-ww2", palette: "endwar", icon: "🪂", description: "The Allies landed in France, opening a second front against Germany in the west." },
  { id: "hiroshima", year: 1945, dateLabel: "Aug 1945", title: "The atomic bomb", chapterSlug: "end-of-ww2", palette: "endwar", icon: "💥", description: "The dropping of the atomic bomb brought a shattering end to the war against Japan." },
  { id: "ww2-ends", year: 1945, title: "The Second World War ends", chapterSlug: "end-of-ww2", palette: "endwar", icon: "🎆", description: "The Axis were defeated, leaving the USA and USSR as rival superpowers." },
  { id: "yalta", year: 1945, dateLabel: "Feb 1945", title: "Yalta Conference", chapterSlug: "cold-war-origins", palette: "coldwar", icon: "❄️", description: "The Allies planned the post-war world, but disagreements over Eastern Europe surfaced." },
  { id: "korea-divided", year: 1945, title: "Korea divided at the 38th parallel", chapterSlug: "korean-war", palette: "korea", icon: "🗺️", description: "Korea was split into a communist North and a capitalist South — a Cold War fault line in Asia." },
  { id: "potsdam", year: 1945, dateLabel: "Jul 1945", title: "Potsdam Conference", chapterSlug: "cold-war-origins", palette: "coldwar", icon: "❄️", description: "With new leaders and growing suspicion, tension between the USA and USSR deepened." },
  { id: "iron-curtain", year: 1946, title: "'Iron Curtain' speech", chapterSlug: "cold-war-origins", palette: "coldwar", icon: "🎙️", description: "Churchill warned that an 'Iron Curtain' had descended across Europe." },
  { id: "truman-doctrine", year: 1947, title: "Truman Doctrine & Marshall Plan", chapterSlug: "cold-war-origins", palette: "coldwar", icon: "💵", description: "The USA pledged to contain communism and sent aid to rebuild Western Europe." },
  { id: "berlin-blockade", year: 1948, dateLabel: "1948–49", title: "Berlin Blockade & Airlift", chapterSlug: "cold-war-origins", palette: "coldwar", icon: "✈️", description: "Stalin blockaded West Berlin; the West supplied it by air until the blockade was lifted." },
  { id: "nato", year: 1949, title: "NATO formed", chapterSlug: "cold-war-origins", palette: "coldwar", icon: "🛡️", description: "The West formed a defensive alliance; the Warsaw Pact answered it in 1955." },
  { id: "korea-invasion", year: 1950, dateLabel: "Jun 1950", title: "North Korea invades the South", chapterSlug: "korean-war", palette: "korea", icon: "⚔️", description: "The North crossed the 38th parallel, turning the Cold War 'hot' for the first time." },
  { id: "china-enters-korea", year: 1950, dateLabel: "Oct 1950", title: "China enters the Korean War", chapterSlug: "korean-war", palette: "korea", icon: "🇨🇳", description: "As UN forces neared its border, China sent huge numbers of troops, forcing a stalemate." },
  { id: "korea-armistice", year: 1953, title: "Korean War armistice", chapterSlug: "korean-war", palette: "korea", icon: "🤝", description: "A ceasefire left Korea divided at the 38th parallel, with a demilitarised zone." },
  { id: "vietnam-partition", year: 1954, title: "Vietnam partitioned", chapterSlug: "vietnam-war", palette: "vietnam", icon: "🌿", description: "The Geneva Accords split Vietnam into a communist North and a non-communist South." },
  { id: "vietnam-escalation", year: 1965, title: "US troops escalate in Vietnam", chapterSlug: "vietnam-war", palette: "vietnam", icon: "🪖", description: "Fearing the domino theory, the USA sent troops to prop up the unstable South." },
  { id: "vietnam-end", year: 1975, title: "Vietnam reunified", chapterSlug: "vietnam-war", palette: "vietnam", icon: "🕊️", description: "After the US withdrawal, the North's victory reunified Vietnam under communism." },
  { id: "wall-falls", year: 1989, title: "Fall of the Berlin Wall", chapterSlug: "end-of-cold-war", palette: "collapse", icon: "🧱", description: "As communist governments collapsed, the Berlin Wall was opened — a symbol of the Cold War's end." },
  { id: "ussr-ends", year: 1991, title: "The Soviet Union ends", chapterSlug: "end-of-cold-war", palette: "collapse", icon: "🕊️", description: "The Soviet Union broke apart, bringing the Cold War to a close after more than forty years." },
];

export function eventsForChapter(slug: string): TimelineEvent[] {
  return TIMELINE.filter((e) => e.chapterSlug === slug);
}
