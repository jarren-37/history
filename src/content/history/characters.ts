import type { PaletteKey } from "./palettes";

export interface Relationship {
  to: string;
  relation: string;
  sentiment: "friendly" | "tense" | "hostile";
}

export interface Character {
  id: string;
  name: string;
  role: string;
  country: string;
  emoji: string;
  palette: PaletteKey;
  years: string;
  tagline: string;
  bio: string;
  goals: string[];
  beliefs: string[];
  actions: string[];
  consequences: string[];
  relationships: Relationship[];
  chapters: string[];
}

/**
 * Recurring historical figures. Biographies stay within the roles they play in
 * the 2261 syllabus — no extra-syllabus trivia.
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
    bio: "Leader of the Nazi Party who became dictator of Germany in 1933. He exploited resentment at Versailles and the hardship of the Depression to win power, then pursued an aggressive foreign policy that led to the Second World War in Europe.",
    goals: ["Overturn the Treaty of Versailles", "Rebuild German strength", "Expand German territory"],
    beliefs: ["Germany was treated unfairly at Versailles", "A strong leader should replace weak democracy"],
    actions: ["Built a one-party dictatorship", "Rearmed Germany and undid Versailles", "Invaded Poland (1939)"],
    consequences: ["Triggered the Second World War in Europe", "Ended the policy of appeasement"],
    relationships: [
      { to: "chamberlain", relation: "appeased by", sentiment: "tense" },
      { to: "stalin", relation: "pact then war", sentiment: "hostile" },
      { to: "churchill", relation: "wartime enemy", sentiment: "hostile" },
    ],
    chapters: ["nazi-germany", "outbreak-europe"],
  },
  {
    id: "chamberlain",
    name: "Neville Chamberlain",
    role: "British Prime Minister",
    country: "Britain",
    emoji: "🇬🇧",
    palette: "berlin",
    years: "PM 1937–1940",
    tagline: "Chose appeasement to avoid another war",
    bio: "British Prime Minister who followed appeasement, hoping to satisfy Hitler's demands and avoid another war. At Munich in 1938 he agreed to let Germany take the Sudetenland, believing he had secured 'peace for our time'.",
    goals: ["Avoid another world war", "Satisfy Germany's 'reasonable' demands"],
    beliefs: ["Another war would be catastrophic", "Some German grievances at Versailles were fair"],
    actions: ["Signed the Munich Agreement (1938)", "Guaranteed Poland", "Declared war after Poland was invaded"],
    consequences: ["Appeasement gave Germany time and territory", "War came anyway in 1939"],
    relationships: [
      { to: "hitler", relation: "appeased", sentiment: "tense" },
      { to: "churchill", relation: "succeeded by", sentiment: "friendly" },
    ],
    chapters: ["outbreak-europe"],
  },
  {
    id: "churchill",
    name: "Winston Churchill",
    role: "British Prime Minister (wartime)",
    country: "Britain",
    emoji: "🇬🇧",
    palette: "coldwar",
    years: "PM 1940–1945",
    tagline: "Led Britain in war; named the 'Iron Curtain'",
    bio: "British wartime leader who had warned against appeasement. He led Britain through the war, and afterwards warned in 1946 that an 'Iron Curtain' had descended across Europe — capturing the start of the Cold War.",
    goals: ["Defeat Nazi Germany", "Warn the West about Soviet expansion"],
    beliefs: ["Aggressors must be resisted, not appeased", "The USSR threatened Western Europe"],
    actions: ["Led Britain through the war", "Delivered the 'Iron Curtain' speech (1946)"],
    consequences: ["Helped defeat the Axis", "Shaped Western fears of communism"],
    relationships: [
      { to: "hitler", relation: "wartime enemy", sentiment: "hostile" },
      { to: "stalin", relation: "uneasy ally", sentiment: "tense" },
      { to: "roosevelt", relation: "wartime ally", sentiment: "friendly" },
    ],
    chapters: ["outbreak-europe", "end-of-ww2", "cold-war-origins"],
  },
  {
    id: "roosevelt",
    name: "Franklin D. Roosevelt",
    role: "US President",
    country: "USA",
    emoji: "🇺🇸",
    palette: "endwar",
    years: "President 1933–1945",
    tagline: "Led the USA through most of the war",
    bio: "US President during the Second World War. He brought America's vast resources into the Allied war effort and planned the post-war world with Britain and the USSR, but died shortly before the war in Europe ended.",
    goals: ["Defeat the Axis", "Shape a stable post-war order"],
    beliefs: ["America's strength could win the war", "Cooperation between the Allies was possible"],
    actions: ["Led the US war effort", "Met Stalin and Churchill at Yalta (1945)"],
    consequences: ["Helped secure Allied victory", "Left post-war decisions to Truman"],
    relationships: [
      { to: "churchill", relation: "wartime ally", sentiment: "friendly" },
      { to: "stalin", relation: "wartime ally", sentiment: "tense" },
      { to: "truman", relation: "succeeded by", sentiment: "friendly" },
    ],
    chapters: ["end-of-ww2", "cold-war-origins"],
  },
  {
    id: "truman",
    name: "Harry S. Truman",
    role: "US President",
    country: "USA",
    emoji: "🇺🇸",
    palette: "coldwar",
    years: "President 1945–1953",
    tagline: "Author of 'containment'",
    bio: "US President after Roosevelt. Suspicious of Soviet intentions, he adopted containment to stop the spread of communism — announcing the Truman Doctrine and Marshall Plan — and led the USA into the Korean War.",
    goals: ["Contain the spread of communism", "Rebuild Western Europe"],
    beliefs: ["Communism must be stopped from spreading"],
    actions: ["Announced the Truman Doctrine and Marshall Plan (1947)", "Sent US forces to Korea (1950)"],
    consequences: ["Hardened the Cold War divide", "Committed the USA to resisting communism worldwide"],
    relationships: [
      { to: "stalin", relation: "rival", sentiment: "hostile" },
      { to: "roosevelt", relation: "succeeded", sentiment: "friendly" },
    ],
    chapters: ["cold-war-origins", "korean-war"],
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
    bio: "Leader of the Soviet Union during and after the war. Determined to protect the USSR from future invasion, he installed communist governments across Eastern Europe — the 'Iron Curtain' — and blockaded West Berlin in 1948.",
    goals: ["Protect the USSR with a buffer of friendly states", "Spread Soviet influence"],
    beliefs: ["The USSR needed secure borders after being invaded", "Capitalism and communism were opposed"],
    actions: ["Set up communist governments in Eastern Europe", "Blockaded West Berlin (1948)"],
    consequences: ["Deepened Western distrust", "Helped divide Europe into two camps"],
    relationships: [
      { to: "truman", relation: "rival", sentiment: "hostile" },
      { to: "churchill", relation: "uneasy ally", sentiment: "tense" },
      { to: "hitler", relation: "pact then war", sentiment: "hostile" },
    ],
    chapters: ["end-of-ww2", "cold-war-origins"],
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
    bio: "Last leader of the Soviet Union. His reforms — glasnost and perestroika — and his refusal to use force to hold Eastern Europe opened the way for the fall of the Berlin Wall and the end of the Cold War.",
    goals: ["Reform the struggling Soviet system", "Reduce Cold War tension"],
    beliefs: ["The USSR could not sustain the arms race and control of the bloc"],
    actions: ["Introduced glasnost and perestroika", "Chose not to use force in Eastern Europe"],
    consequences: ["Eastern European communist governments fell", "The Cold War came to an end"],
    relationships: [],
    chapters: ["end-of-cold-war"],
  },
  {
    id: "hirohito-era",
    name: "Militarist Japan",
    role: "Ultranationalist military leadership",
    country: "Japan",
    emoji: "🇯🇵",
    palette: "japan",
    years: "1920s–1945",
    tagline: "Turned Japan into an aggressive war state",
    bio: "By the 1930s Japan's government was dominated by ultranationalist military leaders. Amid economic hardship they promised salvation through empire, seized Manchuria and China, and — when the USA cut off resources — attacked Pearl Harbor.",
    goals: ["Secure resources and markets", "Build a Japanese empire in Asia"],
    beliefs: ["Expansion was the solution to Japan's problems", "Japan should lead Asia"],
    actions: ["Took over the government", "Invaded Manchuria (1931) and China (1937)", "Attacked Pearl Harbor (1941)"],
    consequences: ["Brought the USA into the war", "Spread the war across the Asia-Pacific"],
    relationships: [],
    chapters: ["militarist-japan", "outbreak-asia"],
  },
  {
    id: "kim-il-sung",
    name: "Kim Il Sung",
    role: "Leader of North Korea",
    country: "North Korea",
    emoji: "🇰🇵",
    palette: "korea",
    years: "in power from 1948",
    tagline: "Sought to unite Korea under communism",
    bio: "Communist leader of North Korea. Backed by the USSR, he launched the invasion of South Korea in 1950 to unite the peninsula under communism — starting the Korean War.",
    goals: ["Unite Korea under communism"],
    beliefs: ["Korea should be one communist nation"],
    actions: ["Invaded South Korea (1950)"],
    consequences: ["Started the Korean War", "Korea was left divided after 1953"],
    relationships: [{ to: "mao", relation: "ally", sentiment: "friendly" }],
    chapters: ["korean-war"],
  },
  {
    id: "mao",
    name: "Mao Zedong",
    role: "Leader of Communist China",
    country: "China",
    emoji: "🇨🇳",
    palette: "korea",
    years: "in power from 1949",
    tagline: "Led communist China into the Cold War",
    bio: "Leader of communist China from 1949. His troops drove UN forces back in the Korean War, and China supported the communist North in Vietnam — making China a major player in the Cold War in Asia.",
    goals: ["Protect China's borders", "Support fellow communists"],
    beliefs: ["China must not allow hostile armies on its border"],
    actions: ["Sent Chinese troops into Korea (1950)", "Backed North Vietnam"],
    consequences: ["Created the Korean stalemate", "Strengthened the communist bloc in Asia"],
    relationships: [
      { to: "kim-il-sung", relation: "ally", sentiment: "friendly" },
      { to: "ho-chi-minh", relation: "ally", sentiment: "friendly" },
    ],
    chapters: ["korean-war", "vietnam-war"],
  },
  {
    id: "ho-chi-minh",
    name: "Ho Chi Minh",
    role: "Leader of North Vietnam",
    country: "Vietnam",
    emoji: "🇻🇳",
    palette: "vietnam",
    years: "in power from 1945",
    tagline: "Fought to unite Vietnam under communism",
    bio: "Communist leader of North Vietnam, determined to unite the country under communism. The North's support for the insurgency in the South drew in the USA and turned Vietnam into a Cold War battleground.",
    goals: ["Unite Vietnam under communism", "End foreign control"],
    beliefs: ["Vietnam should be one free, communist nation"],
    actions: ["Led communist North Vietnam", "Backed the insurgency in the South"],
    consequences: ["Drew the USA into the war", "Vietnam reunified under communism in 1975"],
    relationships: [
      { to: "ngo-dinh-diem", relation: "rival", sentiment: "hostile" },
      { to: "mao", relation: "ally", sentiment: "friendly" },
    ],
    chapters: ["vietnam-war"],
  },
  {
    id: "ngo-dinh-diem",
    name: "Ngo Dinh Diem",
    role: "Leader of South Vietnam",
    country: "South Vietnam",
    emoji: "🇻🇳",
    palette: "vietnam",
    years: "ruled 1955–1963",
    tagline: "The unpopular US-backed leader of the South",
    bio: "Leader of South Vietnam, backed by the USA. His harsh and corrupt rule, and his refusal to hold the promised 1956 elections, made him unpopular and helped a Northern-backed insurgency grow.",
    goals: ["Keep South Vietnam non-communist"],
    beliefs: ["Communism must be resisted"],
    actions: ["Refused the 1956 elections", "Ruled harshly, losing support"],
    consequences: ["Instability in the South", "Deeper US involvement in Vietnam"],
    relationships: [{ to: "ho-chi-minh", relation: "rival", sentiment: "hostile" }],
    chapters: ["vietnam-war"],
  },
];

export function getCharacter(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}
