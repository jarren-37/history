import type { PaletteKey } from "./palettes";

export interface Relationship {
  /** id of the other character. */
  to: string;
  /** short label for the edge, e.g. "rival", "ally". */
  relation: string;
  /** friendly | tense | hostile — colours the connection line. */
  sentiment: "friendly" | "tense" | "hostile";
}

export interface Character {
  id: string;
  name: string;
  /** e.g. "Leader of Nazi Germany". */
  role: string;
  country: string;
  /** Country flag / emoji used as a lightweight portrait motif. */
  emoji: string;
  palette: PaletteKey;
  years: string;
  /** One-line tagline for cards. */
  tagline: string;
  /** 2–3 sentence biography — syllabus scope only. */
  bio: string;
  goals: string[];
  beliefs: string[];
  actions: string[];
  consequences: string[];
  relationships: Relationship[];
  /** Chapters this character appears in (slugs). */
  chapters: string[];
}

/**
 * Recurring historical figures. Biographies are deliberately kept to the roles
 * they play within the 2261 syllabus narrative — no extra-syllabus trivia.
 */
export const CHARACTERS: Character[] = [
  {
    id: "hitler",
    name: "Adolf Hitler",
    role: "Leader of Nazi Germany",
    country: "Germany",
    emoji: "🇩🇪",
    palette: "hitler",
    years: "in power 1933–1945",
    tagline: "Turned German anger into dictatorship and war",
    bio: "Leader of the Nazi Party who became dictator of Germany in 1933. He exploited the resentment caused by the Treaty of Versailles and the hardship of the Depression to win support, then pursued an aggressive foreign policy that led to the Second World War in Europe.",
    goals: [
      "Overturn the Treaty of Versailles",
      "Rebuild German military strength",
      "Expand German territory (Lebensraum)",
    ],
    beliefs: [
      "Germany had been unfairly treated at Versailles",
      "A strong leader should replace weak democracy",
      "Germany was destined to dominate Europe",
    ],
    actions: [
      "Rearmed Germany, breaking Versailles",
      "Remilitarised the Rhineland (1936)",
      "United with Austria and took the Sudetenland (1938)",
      "Invaded Poland (1939), starting the war",
    ],
    consequences: [
      "Triggered the Second World War in Europe",
      "Ended the policy of appeasement",
    ],
    relationships: [
      { to: "chamberlain", relation: "appeased by", sentiment: "tense" },
      { to: "stalin", relation: "pact then war", sentiment: "hostile" },
      { to: "churchill", relation: "wartime enemy", sentiment: "hostile" },
    ],
    chapters: ["treaty-of-versailles", "rise-of-hitler"],
  },
  {
    id: "chamberlain",
    name: "Neville Chamberlain",
    role: "British Prime Minister",
    country: "Britain",
    emoji: "🇬🇧",
    palette: "versailles",
    years: "PM 1937–1940",
    tagline: "Chose appeasement to avoid another war",
    bio: "British Prime Minister who followed the policy of appeasement, hoping to satisfy Hitler's demands to avoid another war. At Munich in 1938 he agreed to let Germany take the Sudetenland, believing he had secured 'peace for our time'.",
    goals: ["Avoid another world war", "Give Germany 'reasonable' demands"],
    beliefs: [
      "Another war would be catastrophic",
      "Some of Germany's grievances at Versailles were fair",
      "Hitler could be satisfied and contained",
    ],
    actions: [
      "Signed the Munich Agreement (1938)",
      "Guaranteed Poland's independence (1939)",
      "Declared war after Poland was invaded",
    ],
    consequences: [
      "Appeasement gave Germany time and territory",
      "War came anyway in 1939",
    ],
    relationships: [
      { to: "hitler", relation: "appeased", sentiment: "tense" },
      { to: "churchill", relation: "succeeded by", sentiment: "friendly" },
    ],
    chapters: ["rise-of-hitler"],
  },
  {
    id: "churchill",
    name: "Winston Churchill",
    role: "British Prime Minister (wartime)",
    country: "Britain",
    emoji: "🇬🇧",
    palette: "coldwar",
    years: "PM 1940–1945",
    tagline: "Named the 'Iron Curtain' dividing Europe",
    bio: "British wartime leader who had warned against appeasement. After the war he described the growing division of Europe, warning in 1946 that an 'Iron Curtain' had descended across the continent — an image that captured the start of the Cold War.",
    goals: ["Defeat Nazi Germany", "Warn the West about Soviet expansion"],
    beliefs: [
      "Aggressors must be resisted, not appeased",
      "The Soviet Union threatened Western Europe",
    ],
    actions: [
      "Led Britain through the war",
      "Delivered the 'Iron Curtain' speech (1946)",
    ],
    consequences: [
      "Helped shape Western fears of communism",
      "Signalled the emerging Cold War divide",
    ],
    relationships: [
      { to: "hitler", relation: "wartime enemy", sentiment: "hostile" },
      { to: "stalin", relation: "uneasy ally", sentiment: "tense" },
      { to: "roosevelt", relation: "wartime ally", sentiment: "friendly" },
    ],
    chapters: ["rise-of-hitler", "origins-of-the-cold-war"],
  },
  {
    id: "roosevelt",
    name: "Franklin D. Roosevelt",
    role: "US President",
    country: "USA",
    emoji: "🇺🇸",
    palette: "coldwar",
    years: "President 1933–1945",
    tagline: "Led the USA through the war until 1945",
    bio: "US President during the Second World War. He worked with Britain and the USSR to defeat the Axis powers and met Stalin and Churchill at the Yalta Conference to plan the post-war world, but died shortly before the war in Europe ended.",
    goals: ["Defeat the Axis", "Shape a stable post-war order"],
    beliefs: ["Cooperation between the Allies was possible"],
    actions: ["Joined the Allied war effort", "Attended the Yalta Conference (1945)"],
    consequences: ["Left post-war decisions to his successor, Truman"],
    relationships: [
      { to: "churchill", relation: "wartime ally", sentiment: "friendly" },
      { to: "stalin", relation: "wartime ally", sentiment: "tense" },
      { to: "truman", relation: "succeeded by", sentiment: "friendly" },
    ],
    chapters: ["origins-of-the-cold-war"],
  },
  {
    id: "truman",
    name: "Harry S. Truman",
    role: "US President",
    country: "USA",
    emoji: "🇺🇸",
    palette: "coldwar",
    years: "President 1945–1953",
    tagline: "Author of 'containment' and the Truman Doctrine",
    bio: "US President after Roosevelt. Suspicious of Soviet intentions, he adopted a policy of containment to stop the spread of communism, announced the Truman Doctrine and the Marshall Plan, and ordered the Berlin Airlift.",
    goals: ["Contain the spread of communism", "Rebuild Western Europe"],
    beliefs: [
      "Communism must be stopped from spreading",
      "Economic aid would keep countries out of communism",
    ],
    actions: [
      "Announced the Truman Doctrine (1947)",
      "Launched the Marshall Plan",
      "Ordered the Berlin Airlift (1948–49)",
    ],
    consequences: [
      "Hardened the Cold War divide",
      "Committed the USA to defending Western Europe",
    ],
    relationships: [
      { to: "stalin", relation: "rival", sentiment: "hostile" },
      { to: "roosevelt", relation: "succeeded", sentiment: "friendly" },
    ],
    chapters: ["origins-of-the-cold-war", "berlin-blockade"],
  },
  {
    id: "stalin",
    name: "Joseph Stalin",
    role: "Leader of the Soviet Union",
    country: "USSR",
    emoji: "🇷🇺",
    palette: "coldwar",
    years: "in power 1924–1953",
    tagline: "Built a buffer of communist states in Eastern Europe",
    bio: "Leader of the Soviet Union during and after the war. Determined to protect the USSR from future invasion, he installed communist governments across Eastern Europe, creating the divide Churchill called the 'Iron Curtain', and blockaded West Berlin in 1948.",
    goals: [
      "Protect the USSR with a buffer of friendly states",
      "Spread Soviet influence in Eastern Europe",
    ],
    beliefs: [
      "The USSR needed secure borders after being invaded",
      "Capitalism and communism were opposed",
    ],
    actions: [
      "Set up communist governments in Eastern Europe",
      "Blockaded West Berlin (1948)",
    ],
    consequences: [
      "Deepened Western distrust",
      "Helped divide Europe into two camps",
    ],
    relationships: [
      { to: "truman", relation: "rival", sentiment: "hostile" },
      { to: "churchill", relation: "uneasy ally", sentiment: "tense" },
      { to: "hitler", relation: "pact then war", sentiment: "hostile" },
    ],
    chapters: ["origins-of-the-cold-war", "berlin-blockade"],
  },
  {
    id: "khrushchev",
    name: "Nikita Khrushchev",
    role: "Leader of the Soviet Union",
    country: "USSR",
    emoji: "🇷🇺",
    palette: "cuba",
    years: "in power 1953–1964",
    tagline: "Placed missiles in Cuba, then stepped back",
    bio: "Soviet leader who secretly placed nuclear missiles in Cuba in 1962, triggering the Cuban Missile Crisis. After thirteen tense days he agreed to remove them in return for US promises, pulling the world back from the brink.",
    goals: ["Protect communist Cuba", "Match US missile strength"],
    beliefs: ["The USSR should stand up to the USA"],
    actions: [
      "Placed missiles in Cuba (1962)",
      "Agreed to remove them after negotiation",
    ],
    consequences: [
      "Brought the world close to nuclear war",
      "Led to steps to reduce tension afterwards",
    ],
    relationships: [
      { to: "kennedy", relation: "rival", sentiment: "hostile" },
      { to: "castro", relation: "ally", sentiment: "friendly" },
    ],
    chapters: ["cuban-missile-crisis"],
  },
  {
    id: "kennedy",
    name: "John F. Kennedy",
    role: "US President",
    country: "USA",
    emoji: "🇺🇸",
    palette: "cuba",
    years: "President 1961–1963",
    tagline: "Faced down the Cuban Missile Crisis",
    bio: "US President during the Cuban Missile Crisis. When US spy planes discovered Soviet missiles in Cuba, he ordered a naval 'quarantine' of the island and demanded their removal, resolving the crisis through negotiation rather than war.",
    goals: ["Remove Soviet missiles from Cuba", "Avoid nuclear war"],
    beliefs: ["The USA must resist Soviet pressure firmly but carefully"],
    actions: [
      "Ordered a naval blockade of Cuba (1962)",
      "Negotiated the removal of the missiles",
    ],
    consequences: ["Resolved the crisis peacefully", "Reduced Cold War tension afterwards"],
    relationships: [
      { to: "khrushchev", relation: "rival", sentiment: "hostile" },
      { to: "castro", relation: "opponent", sentiment: "hostile" },
    ],
    chapters: ["cuban-missile-crisis"],
  },
  {
    id: "castro",
    name: "Fidel Castro",
    role: "Leader of Cuba",
    country: "Cuba",
    emoji: "🇨🇺",
    palette: "cuba",
    years: "in power from 1959",
    tagline: "Cuba's communist leader on the USA's doorstep",
    bio: "Communist leader of Cuba, an island close to the USA. His alliance with the Soviet Union allowed Khrushchev to place missiles on Cuban soil, making the island the flashpoint of the Cuban Missile Crisis.",
    goals: ["Protect Cuba from US pressure", "Secure Soviet support"],
    beliefs: ["Cuba should be free of US control"],
    actions: ["Allied Cuba with the USSR", "Allowed Soviet missiles on the island"],
    consequences: ["Made Cuba the centre of the 1962 crisis"],
    relationships: [
      { to: "khrushchev", relation: "ally", sentiment: "friendly" },
      { to: "kennedy", relation: "opponent", sentiment: "hostile" },
    ],
    chapters: ["cuban-missile-crisis"],
  },
  {
    id: "gorbachev",
    name: "Mikhail Gorbachev",
    role: "Leader of the Soviet Union",
    country: "USSR",
    emoji: "🇷🇺",
    palette: "collapse",
    years: "in power 1985–1991",
    tagline: "Reforms that helped end the Cold War",
    bio: "Last leader of the Soviet Union. His reforms and willingness to ease tension with the West, together with his decision not to use force to hold Eastern Europe, opened the way for the fall of the Berlin Wall and the end of the Cold War.",
    goals: ["Reform the struggling Soviet system", "Reduce Cold War tension"],
    beliefs: ["The USSR could not sustain the arms race and control of Eastern Europe"],
    actions: [
      "Introduced reforms at home",
      "Chose not to use force to keep Eastern Europe communist",
    ],
    consequences: [
      "Eastern European communist governments fell",
      "The Cold War came to an end",
    ],
    relationships: [],
    chapters: ["end-of-the-cold-war"],
  },
  {
    id: "hirohito-era",
    name: "Militarist Japan",
    role: "Expansionist military leadership",
    country: "Japan",
    emoji: "🇯🇵",
    palette: "japan",
    years: "1930s–1945",
    tagline: "Sought empire and resources across Asia-Pacific",
    bio: "By the 1930s Japan's government was dominated by military leaders who believed expansion would solve Japan's need for raw materials and living space. They invaded Manchuria and China and, when the USA cut off resources, attacked Pearl Harbor — bringing war to the Asia-Pacific.",
    goals: [
      "Secure raw materials and markets",
      "Build a Japanese empire in Asia",
    ],
    beliefs: [
      "Expansion was the solution to Japan's economic problems",
      "Japan should lead Asia",
    ],
    actions: [
      "Invaded Manchuria (1931)",
      "Invaded China (1937)",
      "Attacked Pearl Harbor (1941)",
    ],
    consequences: [
      "Brought the USA into the war",
      "Spread the war across the Asia-Pacific",
    ],
    relationships: [],
    chapters: ["japans-road-to-war"],
  },
];

export function getCharacter(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}
