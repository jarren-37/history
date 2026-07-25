import type { Chapter } from "./types";

/**
 * The storybook chapters, aligned to the Singapore Cambridge SEAB O-Level
 * Combined History (2261) syllabus:
 *
 *  Unit 1 — The Road to War
 *   1. The Paris Peace Conference & the League of Nations
 *   2. Case Study: Nazi Germany
 *   3. Case Study: Militarist Japan
 *   4. The Outbreak of War in Europe
 *   5. The Outbreak of War in the Asia-Pacific
 *  Unit 2 — The Cold War
 *   6. The End of the Second World War
 *   7. Origins of the Cold War in Europe
 *   8. Case Study: The Korean War
 *   9. Case Study: The Vietnam War
 *  10. The End of the Cold War
 *
 * Content stays strictly within the syllabus, focusing on understanding
 * (cause → effect → consequence) rather than trivia.
 */
export const CHAPTERS: Chapter[] = [
  // ── 1. THE PARIS PEACE CONFERENCE & THE LEAGUE ───────────────────────────
  {
    id: "ch-paris",
    slug: "paris-peace-conference",
    number: "1",
    section: "The Road to War",
    title: "The Paris Peace Conference & the League",
    subtitle: "The peace of 1919 and the search for security",
    inquiry: "Could the peace of 1919 keep the world safe?",
    palette: "versailles",
    era: "1919–1920s",
    hook: "The Great War was over. Now the victors had to build a peace — and hope it would last.",
    outcomes: [
      "Explain the aims and main terms of the Treaty of Versailles",
      "Explain how borders were redrawn through self-determination",
      "Assess the successes and failures of the League of Nations in the 1920s",
    ],
    characterIds: [],
    timelineIds: ["versailles-signed", "league-formed"],
    pages: [
      {
        id: "p-1",
        kicker: "1919 · Paris",
        title: "A room full of anger",
        scene: "treaty-signing",
        narration: [
          "The First World War had ended, and the victorious powers gathered at Paris to decide the peace. Three leaders — the Big Three — dominated the talks.",
          "France's Clemenceau wanted Germany crushed; America's Wilson wanted a fair peace and a League of Nations; Britain's Lloyd George stood in between. Germany was not even allowed to negotiate.",
        ],
        highlights: ["Big Three", "League of Nations"],
        dialogues: [
          { speaker: "Clemenceau (France)", side: "left", text: "Germany must be made powerless. Never again." },
          { speaker: "Wilson (USA)", side: "right", text: "A peace without fairness will not last." },
        ],
      },
      {
        id: "p-2",
        kicker: "The terms",
        title: "The price Germany paid",
        scene: "reparations-coins",
        narration: [
          "The Treaty of Versailles hit Germany hard. The War Guilt Clause forced Germany to accept blame for the war, and huge reparations followed.",
          "Germany was disarmed — its army capped, the Rhineland demilitarised — and it lost territory on every side. Germans called it a humiliating 'diktat'.",
        ],
        highlights: ["Treaty of Versailles", "War Guilt Clause", "reparations", "demilitarised", "diktat"],
      },
      {
        id: "p-3",
        kicker: "A new map",
        title: "New nations from old empires",
        scene: "shrinking-germany",
        narration: [
          "The war had shattered the old empires. From their ruins, new nation-states were created across Europe, guided by the idea of self-determination — that peoples should rule themselves.",
          "But borders could not be drawn perfectly. Millions ended up as minorities in the wrong country, planting grievances that would trouble the years ahead.",
        ],
        highlights: ["nation-states", "self-determination", "minorities"],
      },
      {
        id: "p-4",
        kicker: "1920s",
        title: "A parliament of the world",
        scene: "voting-hands",
        narration: [
          "To keep the peace, the powers created the League of Nations, built on collective security — nations acting together against any aggressor.",
          "In the 1920s the League had some successes settling small disputes. But it was weak: the USA never joined, it had no army, and it could not force great powers to obey.",
        ],
        highlights: ["League of Nations", "collective security", "no army"],
        choice: {
          question: "You lead the League in the 1920s. A powerful nation ignores your ruling. What can you do?",
          options: [
            { label: "Send in an army to enforce it", outcome: "The League had no army of its own — it simply could not." },
            { label: "Impose trade sanctions", outcome: "Possible, but slow and easily dodged, especially without US support.", historical: true },
            { label: "Condemn it and hope", outcome: "Too often this was all the League could do — exposing its weakness." },
          ],
          reality: "The League relied on persuasion and sanctions, not force. It could settle quarrels between small states, but had no way to compel a determined great power. In the 1930s that weakness would prove fatal.",
        },
      },
    ],
    boosters: [
      { afterPage: 1, booster: { type: "match", prompt: "Match each term of Versailles to what it did.", pairs: [
        { left: "War Guilt Clause", right: "Germany accepted blame for the war" },
        { left: "Reparations", right: "Germany paid for war damage" },
        { left: "Demilitarisation", right: "The Rhineland kept free of troops" },
        { left: "Self-determination", right: "New nation-states for peoples" },
      ] } },
      { afterPage: 3, booster: { type: "recall", prompt: "Check your understanding.", question: "Why was the League of Nations weak in the 1920s?", answer: "The USA never joined, it had no army of its own, and its decisions could not force great powers to obey — so it relied only on persuasion and sanctions." } },
    ],
    bigPicture: {
      title: "The peace that had to hold",
      nodes: [
        { id: "n1", label: "Harsh treaty", icon: "📜", detail: "Versailles blamed and punished Germany, breeding resentment." },
        { id: "n2", label: "New nations", icon: "🗺️", detail: "Old empires broke up into nation-states by self-determination." },
        { id: "n3", label: "The League", icon: "🕊️", detail: "Set up for collective security — to keep the peace together." },
        { id: "n4", label: "Weak foundations", icon: "⚠️", detail: "No US membership, no army: the League could not compel great powers." },
        { id: "n5", label: "Trouble ahead", icon: "⛈️", detail: "Grievances and a weak League left the peace fragile." },
      ],
    },
    exam: [
      { id: "p-exam-1", skill: "Explain (SEQ)", format: "SEQ", marks: 8, question: "Explain why many Germans were angry about the Treaty of Versailles.",
        markScheme: ["Valid reasons: War Guilt Clause, reparations, disarmament, loss of land.", "Explain HOW each caused anger.", "L3: two developed reasons with links."],
        modelAnswer: "Germans were angry mainly because the War Guilt Clause forced them to accept sole blame for the war, which felt deeply humiliating, and justified huge reparations that damaged the economy. They were also angered by disarmament and the loss of territory, which left Germany weak and treated, they felt, unfairly — a resentment they called a 'diktat'." },
      { id: "p-exam-2", skill: "Judgement (SEQ)", format: "SEQ", marks: 12, question: "'The League of Nations was a failure in the 1920s.' How far do you agree?",
        markScheme: ["AGAINST (successes): settled some small disputes, humanitarian work.", "FOR (weaknesses): no USA, no army, could not compel great powers.", "L4/L5: balanced judgement with a conclusion."],
        modelAnswer: "In the 1920s the League had real successes, settling several disputes between smaller states and doing valuable humanitarian work, so it was not a complete failure. However, its weaknesses were serious: the USA never joined, it had no army, and it could not force great powers to obey. On balance the League worked while the stakes were low, but its fragile foundations meant it was not equipped for the greater challenges to come." },
    ],
  },

  // ── 2. CASE STUDY: NAZI GERMANY ──────────────────────────────────────────
  {
    id: "ch-nazi",
    slug: "nazi-germany",
    number: "2",
    section: "The Road to War",
    title: "Nazi Germany",
    subtitle: "How Hitler rose and seized total power",
    inquiry: "How did an unstable democracy become a dictatorship?",
    palette: "hitler",
    era: "1919–1939",
    hook: "A young democracy, blamed for defeat and battered by crisis — and a party that promised to make Germany great again.",
    outcomes: [
      "Explain the weaknesses of the Weimar government",
      "Explain the appeal of Hitler and the methods of the Nazi Party",
      "Explain how Hitler consolidated power and the impact of his policies",
    ],
    characterIds: ["hitler"],
    timelineIds: ["weimar", "depression", "hitler-power"],
    pages: [
      {
        id: "n-1",
        kicker: "1919–1929",
        title: "A democracy born in defeat",
        scene: "empty-factory",
        narration: [
          "After the war, Germany became a democracy — the Weimar Republic. But it was blamed for signing Versailles, and its constitution let too many small parties squabble, so governments were weak and short-lived.",
          "Hyperinflation in 1923 wiped out savings. Even when things recovered, many Germans never trusted their fragile new democracy.",
        ],
        highlights: ["Weimar Republic", "constitution", "weak"],
      },
      {
        id: "n-2",
        kicker: "1929",
        title: "The world runs out of money",
        scene: "empty-factory",
        narration: [
          "Then came the Great Depression. Factories closed, millions lost their jobs, and the Weimar government seemed powerless to help.",
          "Desperate people looked for someone with answers — and turned away from the moderate parties towards the extremes.",
        ],
        highlights: ["Great Depression", "unemployment", "extremes"],
      },
      {
        id: "n-3",
        kicker: "The Nazi appeal",
        title: "The promise of a strong leader",
        scene: "rising-leader",
        narration: [
          "Hitler and the Nazi Party promised jobs, pride and an end to Versailles. Powerful propaganda and mass rallies spread the message, while the SA used force against opponents.",
          "The Nazis also played the democratic game, winning votes in elections. In 1933 Hitler was legally made Chancellor — then moved quickly to destroy the democracy that had raised him.",
        ],
        highlights: ["Nazi Party", "propaganda", "force", "elections", "Chancellor"],
        dialogues: [
          { speaker: "hitler", characterId: "hitler", side: "left", text: "Give me power, and I will give Germany back its strength and its pride." },
        ],
      },
      {
        id: "n-4",
        kicker: "1933–1939",
        title: "One party, one leader",
        scene: "angry-crowd",
        narration: [
          "Hitler established a dictatorship: other parties were banned and opponents silenced. Germany became a one-party state under his total control.",
          "His policies cut unemployment through public works and rearmament, moving Germany towards a war economy. But this came with fierce German nationalism and the brutal persecution of Jews and other minorities, as society was tightly controlled.",
        ],
        highlights: ["dictatorship", "one-party state", "war economy", "nationalism", "persecution"],
        choice: {
          question: "It is 1933. You are a German worker with a new job under the Nazis. How do you feel?",
          options: [
            { label: "Grateful — at last, work", outcome: "Many felt this way; jobs bought loyalty, and few asked how it was paid for.", historical: true },
            { label: "Uneasy about lost freedoms", outcome: "Some were — but opposition was dangerous under a police state." },
            { label: "Afraid for my neighbours", outcome: "Persecution of minorities grew steadily, and speaking out was risky." },
          ],
          reality: "Hitler's dictatorship won support by ending unemployment and restoring pride — but it rested on propaganda, terror, and the persecution of those it labelled enemies. Consent and fear went hand in hand.",
        },
      },
    ],
    boosters: [
      { afterPage: 1, booster: { type: "fill", prompt: "Complete the sentence.", sentence: "The {{blank}} of 1929 caused mass {{blank}}, which helped {{blank}} win support.", answers: ["Depression", "unemployment", "Hitler"], bank: ["Depression", "unemployment", "Hitler", "Weimar", "reparations", "pride"] } },
      { afterPage: 3, booster: { type: "recall", prompt: "Check your understanding.", question: "Name two methods the Nazis used to gain and keep power.", answer: "Any two of: powerful propaganda, force/violence through the SA, contesting elections, and — once in power — banning other parties to create a one-party dictatorship." } },
    ],
    bigPicture: {
      title: "From democracy to dictatorship",
      nodes: [
        { id: "n1", label: "Weak Weimar", icon: "🏛️", detail: "A fragile democracy blamed for Versailles and prone to crisis." },
        { id: "n2", label: "Depression", icon: "📉", detail: "Mass unemployment left Germans desperate for strong leadership." },
        { id: "n3", label: "Nazi appeal", icon: "🕯️", detail: "Propaganda, force and elections won Hitler mass support." },
        { id: "n4", label: "Dictatorship", icon: "⛓️", detail: "Hitler banned rivals and built a one-party state." },
        { id: "n5", label: "Control & persecution", icon: "⚠️", detail: "Rearmament and nationalism came with terror and persecution." },
      ],
    },
    exam: [
      { id: "n-exam-1", skill: "Explain (SEQ)", format: "SEQ", marks: 8, question: "Explain why Hitler was able to come to power in Germany by 1933.",
        markScheme: ["Valid reasons: Weimar weakness, the Depression, Nazi appeal/methods.", "Explain HOW each helped Hitler.", "L3: two developed reasons with links."],
        modelAnswer: "Hitler came to power partly because the Weimar Republic was weak and unpopular, blamed for Versailles and unable to provide stable government. The Great Depression then caused mass unemployment, leaving Germans desperate for a strong leader. The Nazis exploited this with powerful propaganda and promises of jobs and pride, while also winning votes — so that in 1933 Hitler could be legally made Chancellor." },
      { id: "n-exam-2", skill: "Inference", format: "SBQ", marks: 5, question: "What can you infer about Nazi methods from this source? Explain using the source and your knowledge.",
        source: { label: "A description of a Nazi rally, 1930s (paraphrased)", text: "Thousands stand in ordered ranks beneath huge banners as loudspeakers carry Hitler's voice; uniformed men line the edges of the crowd." },
        markScheme: ["L1: describes the source.", "L2: a supported inference (e.g. the Nazis used propaganda).", "L3: developed inference using source detail AND knowledge (propaganda + force/control)."],
        modelAnswer: "The source suggests the Nazis relied on propaganda and control. The banners, loudspeakers and ordered ranks imply a carefully staged spectacle to inspire loyalty, while the uniformed men lining the crowd hint at force and intimidation. This fits my knowledge that the Nazis combined mass propaganda with the threat of violence to build and keep support." },
    ],
  },

  // ── 3. CASE STUDY: MILITARIST JAPAN ──────────────────────────────────────
  {
    id: "ch-japan-dom",
    slug: "militarist-japan",
    number: "3",
    section: "The Road to War",
    title: "Militarist Japan",
    subtitle: "How the army came to rule Japan",
    inquiry: "Why did democracy give way to military rule in Japan?",
    palette: "japan",
    era: "1920s–1930s",
    hook: "A modern democracy shaken by hardship — and generals who promised strength through empire.",
    outcomes: [
      "Explain the weaknesses of democratic government in Japan",
      "Explain the appeal of the ultranationalists",
      "Explain how the militarists consolidated power and their policies",
    ],
    characterIds: ["hirohito-era"],
    timelineIds: ["japan-depression"],
    pages: [
      {
        id: "j-1",
        kicker: "1920s",
        title: "A fragile democracy",
        scene: "voting-hands",
        narration: [
          "In the 1920s Japan had a democratic government, but it was weak. Politicians were seen as corrupt and divided, and many Japanese lost faith in them.",
          "Real power was drifting towards those who promised order and strength — above all, the army.",
        ],
        highlights: ["democratic", "weak", "army"],
      },
      {
        id: "j-2",
        kicker: "Hard times",
        title: "A nation under strain",
        scene: "empty-factory",
        narration: [
          "Japan faced serious economic troubles: inflation, unemployment, and bitter disputes between landlords and struggling farmers.",
          "Then the Great Depression struck, devastating trade. Hardship spread anger — and the ultranationalists offered a bold, simple answer: expansion.",
        ],
        highlights: ["unemployment", "Great Depression", "expansion"],
      },
      {
        id: "j-3",
        kicker: "The ultranationalists",
        title: "Strength through the sword",
        scene: "rising-sun",
        narration: [
          "Ultranationalist army officers argued that only military strength and an Asian empire could save Japan. Military successes abroad made them heroes at home.",
          "They also used terror: political assassinations struck down moderate leaders who stood in their way, cowing the government.",
        ],
        highlights: ["military strength", "empire", "assassinations"],
        dialogues: [
          { speaker: "hirohito-era", characterId: "hirohito-era", side: "right", text: "Weak politicians have failed Japan. The army will make her great." },
        ],
      },
      {
        id: "j-4",
        kicker: "1930s",
        title: "The army takes charge",
        scene: "marching-troops",
        narration: [
          "By the 1930s the militarists dominated the government. They increased state control over industry and launched campaigns to revitalise the economy for war.",
          "Society was reshaped for conflict: education was militarised to breed loyal soldiers, and independent labour unions were crushed.",
        ],
        highlights: ["militarists", "state control", "militarised", "labour unions"],
        choice: {
          question: "You are a Japanese moderate politician in the 1930s. The army is seizing control. What do you do?",
          options: [
            { label: "Resist openly", outcome: "Dangerous — moderates who opposed the militarists risked assassination." },
            { label: "Go along quietly", outcome: "Many did, out of fear or patriotism, letting the militarists tighten their grip.", historical: true },
            { label: "Appeal to the League", outcome: "The League had already proved powerless to restrain Japan." },
          ],
          reality: "Economic misery and the failure of the politicians let the militarists take over. Through military success, assassination and control of society, they turned Japan into an aggressive, war-focused state.",
        },
      },
    ],
    boosters: [
      { afterPage: 1, booster: { type: "order", prompt: "Order Japan's slide towards military rule.", items: ["A weak, distrusted democracy", "Economic hardship and the Depression", "Ultranationalists gain support", "Assassinations silence moderates", "The militarists take control"] } },
      { afterPage: 3, booster: { type: "recall", prompt: "Check your understanding.", question: "How did the militarists reshape Japanese society for war?", answer: "They increased state control over industry, militarised education to produce loyal soldiers, and crushed independent labour unions — focusing the whole nation on military strength." } },
    ],
    bigPicture: {
      title: "Why the army came to rule",
      nodes: [
        { id: "n1", label: "Weak democracy", icon: "🏛️", detail: "Divided, distrusted politicians lost the people's faith." },
        { id: "n2", label: "Economic misery", icon: "📉", detail: "Inflation, unemployment and the Depression bred anger." },
        { id: "n3", label: "Ultranationalists", icon: "🌅", detail: "Officers promised salvation through empire and strength." },
        { id: "n4", label: "Terror & success", icon: "⚔️", detail: "Assassinations and military victories won them power." },
        { id: "n5", label: "A war state", icon: "🪖", detail: "State control, militarised schools and crushed unions." },
      ],
    },
    exam: [
      { id: "j-exam-1", skill: "Explain (SEQ)", format: "SEQ", marks: 8, question: "Explain why the militarists were able to gain power in Japan in the 1930s.",
        markScheme: ["Valid reasons: weak democracy, economic hardship/Depression, ultranationalist appeal & methods.", "Explain HOW each helped the militarists.", "L3: two developed reasons with links."],
        modelAnswer: "The militarists gained power partly because Japan's democracy was weak and distrusted, leaving a gap they could fill. Economic hardship, worsened by the Depression, spread anger and made the ultranationalists' promise of strength through empire appealing. They reinforced this through military successes that made them popular and through assassinations that silenced moderate opponents, allowing them to dominate the government." },
      { id: "j-exam-2", skill: "Explain (SEQ)", format: "SEQ", marks: 8, question: "Explain how the militarists tried to control Japanese society.",
        markScheme: ["Valid points: militarised education, crushing labour unions, state control of industry, propaganda.", "Explain HOW each increased control.", "L3: two developed points."],
        modelAnswer: "The militarists tightened control over society in several ways. They militarised education so that children were raised to be loyal, obedient soldiers for the state. They crushed independent labour unions, removing a source of opposition and workers' power. They also increased government control over industry, directing the economy towards military strength — binding the whole nation to their war aims." },
    ],
  },

  // ── 4. THE OUTBREAK OF WAR IN EUROPE ─────────────────────────────────────
  {
    id: "ch-outbreak-eu",
    slug: "outbreak-europe",
    number: "4",
    section: "The Road to War",
    title: "The Outbreak of War in Europe",
    subtitle: "From a weak League to world war",
    inquiry: "Why did war break out in Europe in 1939?",
    palette: "berlin",
    era: "1930s–1939",
    hook: "Step by step, a defeated Germany rose again — while the world hoped, in vain, that giving in would keep the peace.",
    outcomes: [
      "Explain the ineffectiveness of the League in the 1930s",
      "Describe Germany's aggressive foreign policy step by step",
      "Explain the policy of appeasement and why war broke out",
    ],
    characterIds: ["hitler", "chamberlain", "churchill"],
    timelineIds: ["abyssinia", "rhineland", "anschluss", "munich", "poland"],
    pages: [
      {
        id: "o-1",
        kicker: "1930s",
        title: "The League fails the test",
        scene: "voting-hands",
        narration: [
          "In the 1930s the League of Nations was tested by aggression — and failed. Efforts at disarmament collapsed as nations rearmed.",
          "The Abyssinian Crisis of 1935, when Italy invaded Abyssinia, exposed the League's helplessness: it could condemn, but it could not stop a great power. Aggressors took note.",
        ],
        highlights: ["disarmament", "Abyssinian Crisis", "helplessness"],
      },
      {
        id: "o-2",
        kicker: "1935–1938",
        title: "Germany on the march",
        scene: "marching-troops",
        narration: [
          "Hitler tore up Versailles piece by piece. A plebiscite returned the Saar in 1935; in 1936 he remilitarised the Rhineland; in 1938 came the Anschluss, union with Austria.",
          "Each move broke the treaty. Each time, Britain and France did nothing — and Hitler grew bolder.",
        ],
        highlights: ["Saar", "remilitarised", "Rhineland", "Anschluss"],
        dialogues: [
          { speaker: "hitler", characterId: "hitler", side: "left", text: "They protest, but they will not act. Germany rises again." },
        ],
      },
      {
        id: "o-3",
        kicker: "1938–1939",
        title: "'Peace for our time'",
        scene: "handshake",
        narration: [
          "Rather than risk war, Britain and France chose appeasement. At the Munich Agreement of 1938 they let Germany take the Sudetenland; Chamberlain promised 'peace for our time'.",
          "But in March 1939 Hitler seized the rest of Czechoslovakia, breaking his word. Appeasement had failed.",
        ],
        highlights: ["appeasement", "Munich Agreement", "Sudetenland", "Czechoslovakia"],
        dialogues: [
          { speaker: "chamberlain", characterId: "chamberlain", side: "left", text: "I believe it is peace for our time." },
          { speaker: "churchill", characterId: "churchill", side: "right", text: "You chose dishonour, and you will have war." },
        ],
      },
      {
        id: "o-4",
        kicker: "1939",
        title: "The line is crossed",
        scene: "marching-troops",
        narration: [
          "In August 1939 came a shock: the Nazi-Soviet Pact, in which sworn enemies agreed not to fight, and secretly to divide Poland.",
          "Freed from the fear of a two-front war, Hitler invaded Poland in September 1939. This time Britain and France declared war — and the Second World War in Europe had begun.",
        ],
        highlights: ["Nazi-Soviet Pact", "divide Poland", "invaded Poland", "declared war"],
        choice: {
          question: "It is 1938. Hitler demands the Sudetenland. You are Britain. What do you do?",
          options: [
            { label: "Appease — give in to avoid war", outcome: "This is what Britain did at Munich. It bought time but encouraged Hitler.", historical: true },
            { label: "Fight now", outcome: "Britain's forces were not ready and the public feared another war." },
            { label: "Set a firm limit", outcome: "Attempted at Munich — but Hitler never intended to stop." },
          ],
          reality: "Britain and France appeased Hitler, hoping to satisfy him. Instead it convinced him they were weak. Within a year he invaded Poland and war broke out — leaving appeasement one of history's most debated decisions.",
        },
      },
    ],
    boosters: [
      { afterPage: 1, booster: { type: "order", prompt: "Order Hitler's steps to war.", items: ["Saar plebiscite (1935)", "Rhineland remilitarised (1936)", "Anschluss with Austria (1938)", "Sudetenland / Munich (1938)", "Rest of Czechoslovakia (1939)", "Invasion of Poland (1939)"] } },
      { afterPage: 2, booster: { type: "recall", prompt: "Check your understanding.", question: "What was the policy of appeasement?", answer: "Giving in to some of Hitler's demands to avoid another war — most famously letting Germany take the Sudetenland at Munich in 1938. It failed when Hitler invaded Poland in 1939." } },
    ],
    bigPicture: {
      title: "How war returned to Europe",
      nodes: [
        { id: "n1", label: "League fails", icon: "⚠️", detail: "Disarmament collapsed and Abyssinia showed the League powerless." },
        { id: "n2", label: "German aggression", icon: "🪖", detail: "Saar, Rhineland, Anschluss — Versailles undone step by step." },
        { id: "n3", label: "Appeasement", icon: "🤝", detail: "Britain and France gave in at Munich, encouraging Hitler." },
        { id: "n4", label: "Pact with the USSR", icon: "✍️", detail: "The Nazi-Soviet Pact removed the fear of a two-front war." },
        { id: "n5", label: "War", icon: "🔥", detail: "The invasion of Poland finally triggered the Second World War." },
      ],
    },
    exam: [
      { id: "o-exam-1", skill: "Explain (SEQ)", format: "SEQ", marks: 8, question: "Explain why appeasement was adopted by Britain and France in the 1930s.",
        markScheme: ["Valid reasons: fear of another war, weakness of forces, belief some German grievances were fair, distraction by economic problems.", "Explain HOW each led to appeasement.", "L3: two developed reasons."],
        modelAnswer: "Appeasement was adopted mainly because Britain and France feared another devastating war so soon after 1918, and their forces and economies were not ready to fight. Many also believed that some of Germany's grievances over Versailles were genuinely unfair, so giving in seemed reasonable. By satisfying Hitler's demands, they hoped to keep the peace — not yet realising he could not be satisfied." },
      { id: "o-exam-2", skill: "Judgement (SEQ)", format: "SEQ", marks: 12, question: "'Appeasement was the main reason war broke out in 1939.' How far do you agree?",
        markScheme: ["FOR: appeasement emboldened Hitler, gave him land and time.", "AGAINST: Hitler's own aims, the failed League, the Nazi-Soviet Pact.", "L4/L5: balanced judgement with a conclusion."],
        modelAnswer: "Appeasement made war more likely, since giving in at Munich convinced Hitler the great powers were weak and encouraged him to invade Poland. However, it was not the main cause. The deeper cause was Hitler's own determination to overturn Versailles and expand, helped by a League too weak to stop him and the Nazi-Soviet Pact that freed his hand. On balance, appeasement contributed to war, but Hitler's ambitions were the fundamental reason it broke out." },
    ],
  },

  // ── 5. THE OUTBREAK OF WAR IN THE ASIA-PACIFIC ───────────────────────────
  {
    id: "ch-outbreak-asia",
    slug: "outbreak-asia",
    number: "5",
    section: "The Road to War",
    title: "The Outbreak of War in the Asia-Pacific",
    subtitle: "Japan's road to Pearl Harbor",
    inquiry: "Why did war break out in the Asia-Pacific?",
    palette: "japan",
    era: "1931–1941",
    hook: "An empire hungry for resources reaches across Asia — towards a collision with the United States.",
    outcomes: [
      "Explain the ineffectiveness of the League over Manchuria",
      "Explain the worsening of US–Japan relations",
      "Explain Japan's expansion and the attack on Pearl Harbor",
    ],
    characterIds: ["hirohito-era"],
    timelineIds: ["manchuria", "china-war", "pearl-harbor"],
    pages: [
      {
        id: "a-1",
        kicker: "1931–1933",
        title: "The League humiliated",
        scene: "island-map",
        narration: [
          "In 1931 Japan seized Manchuria in China for its resources. The League of Nations condemned the invasion — but could do nothing more.",
          "Japan simply walked out of the League in 1933 and kept its conquest. The world had learned that aggression could pay.",
        ],
        highlights: ["Manchuria", "League of Nations", "aggression"],
      },
      {
        id: "a-2",
        kicker: "From 1937",
        title: "War with China",
        scene: "marching-troops",
        narration: [
          "In 1937 Japan launched a full invasion of China. Its dream was a vast empire — the Greater East Asia Co-Prosperity Sphere, led by Japan.",
          "But the war devoured resources, especially oil — much of it bought from the United States, which watched Japan's aggression with growing alarm.",
        ],
        highlights: ["invasion of China", "Greater East Asia Co-Prosperity Sphere", "oil"],
        dialogues: [
          { speaker: "hirohito-era", characterId: "hirohito-era", side: "left", text: "Asia should be led by Asians — by Japan. We need its resources to be strong." },
        ],
      },
      {
        id: "a-3",
        kicker: "US–Japan relations",
        title: "The tightening noose",
        scene: "rising-sun",
        narration: [
          "As Japan pushed south towards the resources of Southeast Asia, relations with the USA collapsed. To pressure Japan, the USA cut off supplies — including vital oil.",
          "Japan now faced a stark choice: back down and abandon its empire, or seize what it needed by force.",
        ],
        highlights: ["oil embargo", "seize"],
      },
      {
        id: "a-4",
        kicker: "December 1941",
        title: "Pearl Harbor",
        scene: "rising-sun",
        narration: [
          "Japan chose war. In December 1941 it launched a surprise attack on the US fleet at Pearl Harbor, hoping to cripple American power in the Pacific.",
          "Instead, the attack united America in fury and brought the full weight of the USA into the Second World War.",
        ],
        highlights: ["Pearl Harbor", "brought the full weight of the USA"],
        choice: {
          question: "You are Japan in 1941. The USA has cut off your oil. What now?",
          options: [
            { label: "Back down and withdraw from China", outcome: "Unthinkable to the militarists — it would waste years of conquest and pride." },
            { label: "Seize the resources by force", outcome: "Japan chose this, striking to grab Southeast Asia's oil and materials.", historical: true },
          ],
          reality: "Facing an oil embargo, Japan's leaders decided to strike. Pearl Harbor was meant to disable the US fleet, but it brought America fully into the war — a decision that ultimately doomed Japan's empire.",
        },
      },
    ],
    boosters: [
      { afterPage: 1, booster: { type: "recall", prompt: "Check your understanding.", question: "Why did the League fail to stop Japan in Manchuria?", answer: "The League had no army, so although it condemned the invasion it could not force Japan out. Japan simply ignored it and left the League in 1933." } },
      { afterPage: 3, booster: { type: "order", prompt: "Order Japan's road to Pearl Harbor.", items: ["Invasion of Manchuria (1931)", "Full invasion of China (1937)", "Push south for resources", "USA cuts off oil", "Attack on Pearl Harbor (1941)"] } },
    ],
    bigPicture: {
      title: "Why war came to the Asia-Pacific",
      nodes: [
        { id: "n1", label: "League powerless", icon: "⚠️", detail: "It could not stop Japan taking Manchuria." },
        { id: "n2", label: "War in China", icon: "⚔️", detail: "From 1937 Japan invaded China, needing ever more resources." },
        { id: "n3", label: "US–Japan clash", icon: "🛢️", detail: "Aggression collapsed relations; the USA cut off oil." },
        { id: "n4", label: "Seize by force", icon: "🌅", detail: "Cornered, Japan chose to grab Southeast Asia's resources." },
        { id: "n5", label: "Pearl Harbor", icon: "💥", detail: "The 1941 attack brought the USA into the war." },
      ],
    },
    exam: [
      { id: "a-exam-1", skill: "Explain (SEQ)", format: "SEQ", marks: 8, question: "Explain why relations between the USA and Japan worsened in the 1930s.",
        markScheme: ["Valid reasons: Japan's aggression in China, the drive south, the US oil embargo.", "Explain HOW each worsened relations.", "L3: two developed reasons."],
        modelAnswer: "US–Japan relations worsened mainly because of Japan's aggression, especially its invasion of China from 1937, which the USA opposed. Japan's push south towards Southeast Asia's resources threatened American interests further. In response the USA cut off supplies, including oil, which Japan desperately needed — a step that pushed the two nations towards outright hostility." },
      { id: "a-exam-2", skill: "Explain (SEQ)", format: "SEQ", marks: 8, question: "Explain why Japan attacked Pearl Harbor in 1941.",
        markScheme: ["Valid reasons: the oil embargo, need for resources, hope to cripple the US fleet.", "Explain HOW each led to the attack.", "L3: two developed reasons."],
        modelAnswer: "Japan attacked Pearl Harbor mainly because the US oil embargo left it facing a choice between abandoning its empire or seizing resources by force, and it chose force. To grab Southeast Asia safely, Japan needed to remove the threat of the US Pacific fleet, so it launched a surprise attack at Pearl Harbor hoping to cripple American naval power — a gamble that instead brought the USA fully into the war." },
    ],
  },

  // ── 6. THE END OF THE SECOND WORLD WAR ───────────────────────────────────
  {
    id: "ch-endww2",
    slug: "end-of-ww2",
    number: "6",
    section: "The Cold War",
    title: "The End of the Second World War",
    subtitle: "Why the Allies won",
    inquiry: "Why did the Axis powers lose the war?",
    palette: "endwar",
    era: "1941–1945",
    hook: "The tide turns. Across two vast fronts, the strengths of the Allies and the weaknesses of the Axis decide the war.",
    outcomes: [
      "Explain the strengths of the Allies that led to victory",
      "Explain the military weaknesses of Germany",
      "Explain the military weaknesses of Japan",
    ],
    characterIds: ["churchill", "roosevelt", "stalin", "truman"],
    timelineIds: ["dday", "hiroshima", "ww2-ends"],
    pages: [
      {
        id: "e6-1",
        kicker: "The Allies' strength",
        title: "The weight of America and the USSR",
        scene: "money-flow",
        narration: [
          "When the USA entered the war, it brought vast economic resources and manpower, out-producing the Axis in ships, planes and tanks.",
          "In the east, the Soviet Union bled the German army in enormous battles, tying down and destroying huge forces. The Axis now faced enemies too strong to beat.",
        ],
        highlights: ["economic resources", "manpower", "Soviet Union"],
      },
      {
        id: "e6-2",
        kicker: "Winning strategies",
        title: "D-Day, island-hopping, the bomb",
        scene: "marching-troops",
        narration: [
          "The Allies chose war-winning strategies. In 1944, D-Day landed huge armies in France, opening a second front against Germany in the west.",
          "In the Pacific, the USA used island hopping to close in on Japan. Finally, the dropping of the atomic bomb in 1945 brought a shattering end to the war.",
        ],
        highlights: ["D-Day", "island hopping", "atomic bomb"],
      },
      {
        id: "e6-3",
        kicker: "Germany's weakness",
        title: "A war on two fronts",
        scene: "divided-line",
        narration: [
          "Germany's own mistakes hastened defeat. Hitler's interference created an ineffective command structure, with poor decisions overruling his generals.",
          "Worst of all, by invading the USSR while still fighting in the west, Germany was trapped in a war on two fronts — too much for even its powerful army.",
        ],
        highlights: ["command structure", "war on two fronts"],
      },
      {
        id: "e6-4",
        kicker: "Japan's weakness",
        title: "An empire stretched too thin",
        scene: "island-map",
        narration: [
          "Japan, too, was undone by weakness. Its empire was overextended, spread across a vast ocean that was impossible to defend.",
          "And though it had conquered resource-rich lands, it could not safely ship those raw materials home past Allied forces — slowly starving its war machine.",
        ],
        highlights: ["overextended", "raw materials"],
        choice: {
          question: "Which single factor best explains the Allied victory?",
          options: [
            { label: "Allied economic might", outcome: "Crucial — US production and Soviet manpower overwhelmed the Axis.", historical: true },
            { label: "Axis military blunders", outcome: "Important too — two-front war and overextension crippled the Axis." },
            { label: "War-winning strategies", outcome: "D-Day, island hopping and the bomb all mattered — victory had many causes." },
          ],
          reality: "There was no single cause. Allied strengths — American resources, Soviet manpower and effective strategies — combined with Axis weaknesses such as Germany's two-front war and Japan's overextension to bring the war to an end in 1945.",
        },
      },
    ],
    boosters: [
      { afterPage: 1, booster: { type: "match", prompt: "Match each strategy to its front.", pairs: [
        { left: "D-Day", right: "Second front against Germany (Europe)" },
        { left: "Island hopping", right: "Closing in on Japan (Pacific)" },
        { left: "Atomic bomb", right: "Forced Japan's surrender (1945)" },
        { left: "Soviet army", right: "Destroyed German forces in the east" },
      ] } },
      { afterPage: 3, booster: { type: "recall", prompt: "Check your understanding.", question: "Give one military weakness each for Germany and Japan.", answer: "Germany: an ineffective command structure and a war on two fronts. Japan: an overextended empire and an inability to ship raw materials safely back home." } },
    ],
    bigPicture: {
      title: "Why the Allies won",
      nodes: [
        { id: "n1", label: "American power", icon: "🏭", detail: "US resources and manpower out-produced the Axis." },
        { id: "n2", label: "Soviet sacrifice", icon: "🇷🇺", detail: "The USSR destroyed vast German forces in the east." },
        { id: "n3", label: "Winning strategies", icon: "🪂", detail: "D-Day, island hopping and the atomic bomb." },
        { id: "n4", label: "German weakness", icon: "↔️", detail: "Poor command and a crippling two-front war." },
        { id: "n5", label: "Japanese weakness", icon: "🌊", detail: "An overextended empire it could not supply." },
      ],
    },
    exam: [
      { id: "e6-exam-1", skill: "Explain (SEQ)", format: "SEQ", marks: 8, question: "Explain why the Allies were able to win the Second World War.",
        markScheme: ["Valid reasons: American resources/manpower, Soviet role, war-winning strategies.", "Explain HOW each helped victory.", "L3: two developed reasons."],
        modelAnswer: "The Allies won largely because of overwhelming strength. The USA brought huge economic resources and manpower, out-producing the Axis in weapons, while the Soviet Union destroyed massive German forces in the east. The Allies also used effective strategies — D-Day opened a second front against Germany, island hopping closed in on Japan, and the atomic bomb ended the war. Together these strengths were too much for the Axis to withstand." },
      { id: "e6-exam-2", skill: "Judgement (SEQ)", format: "SEQ", marks: 12, question: "'The Allies won the war because of their own strengths rather than Axis weaknesses.' How far do you agree?",
        markScheme: ["FOR strengths: US resources, Soviet manpower, strategies.", "FOR weaknesses: German two-front war/command, Japanese overextension.", "L4/L5: balanced judgement with a conclusion."],
        modelAnswer: "Allied strengths were vital: American resources, Soviet manpower and strategies like D-Day and the atomic bomb overwhelmed the Axis. Yet Axis weaknesses mattered too — Germany's ineffective command and self-inflicted two-front war, and Japan's overextended empire that it could not supply, all hastened defeat. On balance, Allied strengths were the decisive factor, but they were made even more effective by the serious weaknesses of their enemies." },
    ],
  },

  // ── 7. ORIGINS OF THE COLD WAR IN EUROPE ─────────────────────────────────
  {
    id: "ch-coldwar",
    slug: "cold-war-origins",
    number: "7",
    section: "The Cold War",
    title: "Origins of the Cold War in Europe",
    subtitle: "How wartime allies became rivals",
    inquiry: "Why did the USA and USSR become enemies after 1945?",
    palette: "coldwar",
    era: "1945–1949",
    hook: "They defeated Hitler together. Then the two most powerful nations on earth turned on each other.",
    outcomes: [
      "Explain the emergence of the USA and USSR as superpowers",
      "Explain the growing mistrust and the division of Europe",
      "Explain US containment and the Soviet responses",
    ],
    characterIds: ["stalin", "truman", "churchill", "roosevelt"],
    timelineIds: ["yalta", "potsdam", "iron-curtain", "truman-doctrine", "berlin-blockade", "nato"],
    pages: [
      {
        id: "c-1",
        kicker: "1945",
        title: "Two superpowers, two dreams",
        scene: "iron-curtain",
        narration: [
          "The war left Europe in ruins and two giants standing above the rest: the USA and the USSR, the new superpowers.",
          "But they believed in opposite systems — American capitalism and democracy versus Soviet communism — and each feared the other would spread its way of life.",
        ],
        highlights: ["superpowers", "capitalism", "democracy", "communism"],
        dialogues: [
          { speaker: "truman", characterId: "truman", side: "left", text: "Free peoples must choose their own governments." },
          { speaker: "stalin", characterId: "stalin", side: "right", text: "The Soviet Union must be safe. We will never be invaded again." },
        ],
      },
      {
        id: "c-2",
        kicker: "1945–1946",
        title: "The cracks appear",
        scene: "handshake",
        narration: [
          "At Yalta and Potsdam the Allies tried to plan the post-war world, but mistrust grew fast. Their wartime alliance was breaking down over the future of Eastern Europe.",
          "Stalin set up communist governments there as a buffer; the West saw free nations being swallowed. In 1946 Churchill warned that an 'Iron Curtain' had fallen across Europe.",
        ],
        highlights: ["Yalta", "Potsdam", "Eastern Europe", "Iron Curtain"],
      },
      {
        id: "c-3",
        kicker: "1947",
        title: "America draws a line",
        scene: "money-flow",
        narration: [
          "The USA answered with containment — stopping communism from spreading. The Truman Doctrine promised support to nations resisting it (a political and military stand).",
          "The Marshall Plan then poured economic aid into Western Europe, since prosperous countries were less likely to turn communist.",
        ],
        highlights: ["containment", "Truman Doctrine", "Marshall Plan"],
      },
      {
        id: "c-4",
        kicker: "1948–1949",
        title: "Blockade, airlift and alliance",
        scene: "berlin-airlift",
        narration: [
          "Stalin struck back. In 1948 he blockaded West Berlin, deep inside the Soviet zone. The West replied not with force but with the Berlin Airlift, supplying the city by air for almost a year until he backed down.",
          "The divide hardened into rival blocs: the West formed NATO in 1949, and the Soviets later answered with the Warsaw Pact.",
        ],
        highlights: ["Berlin Blockade", "Berlin Airlift", "NATO", "Warsaw Pact"],
        choice: {
          question: "You are the West in 1948. Berlin is blockaded. What do you do?",
          options: [
            { label: "Supply Berlin by air", outcome: "This was the Airlift — a peaceful win that kept the city free.", historical: true },
            { label: "Force through the blockade", outcome: "This risked direct war with the USSR, which both sides feared." },
            { label: "Abandon West Berlin", outcome: "This would hand Stalin a huge victory and shake the West's allies." },
          ],
          reality: "The West chose the Airlift, supplying two million people by air until Stalin lifted the blockade. It avoided war and confirmed the division of Europe into two hostile, armed camps — the shape of the Cold War.",
        },
      },
    ],
    boosters: [
      { afterPage: 0, booster: { type: "match", prompt: "Match each superpower to its beliefs.", pairs: [
        { left: "USA", right: "Capitalism and democracy" },
        { left: "USSR", right: "Communism and one-party rule" },
        { left: "US aim", right: "Contain the spread of communism" },
        { left: "Soviet aim", right: "A buffer of friendly states" },
      ] } },
      { afterPage: 2, booster: { type: "fill", prompt: "Complete the definition.", sentence: "The US policy of {{blank}} aimed to stop the spread of {{blank}}. The {{blank}} sent money to rebuild Western Europe.", answers: ["containment", "communism", "Marshall Plan"], bank: ["containment", "communism", "Marshall Plan", "appeasement", "capitalism", "Iron Curtain"] } },
    ],
    bigPicture: {
      title: "How allies became enemies",
      nodes: [
        { id: "n1", label: "Two superpowers", icon: "🌍", detail: "The USA and USSR emerged dominant — but opposed." },
        { id: "n2", label: "Opposing beliefs", icon: "⚖️", detail: "Capitalism/democracy vs communism bred deep distrust." },
        { id: "n3", label: "Divided Europe", icon: "🧱", detail: "Soviet control of the East drew the 'Iron Curtain'." },
        { id: "n4", label: "US containment", icon: "💵", detail: "The Truman Doctrine and Marshall Plan resisted communism." },
        { id: "n5", label: "Soviet response", icon: "🚧", detail: "The Berlin Blockade, and rival blocs in NATO and the Warsaw Pact." },
      ],
    },
    exam: [
      { id: "c-exam-1", skill: "Explain (SEQ)", format: "SEQ", marks: 8, question: "Explain why the USA and the USSR became rivals after 1945.",
        markScheme: ["Valid reasons: ideological differences, disagreement over Eastern Europe, mutual suspicion.", "Explain HOW each caused rivalry.", "L3: two developed reasons."],
        modelAnswer: "The USA and USSR became rivals mainly because of their opposing beliefs: the USA supported capitalism and democracy while the USSR was communist, and each feared the other would spread its system. This was deepened by their clash over Eastern Europe, where Stalin set up communist governments the West saw as aggression. Growing suspicion on both sides turned wartime allies into Cold War enemies." },
      { id: "c-exam-2", skill: "Reliability", format: "SBQ", marks: 7, question: "How reliable is this source as evidence of Soviet aims after the war? Explain using the source and your knowledge.",
        source: { label: "A US newspaper editorial, 1947 (paraphrased)", text: "The editorial warns that the USSR is determined to spread communism across the whole of Europe and must be stopped." },
        markScheme: ["Content: matches Soviet actions in Eastern Europe?", "Provenance/purpose: a US source in rising tension may be one-sided.", "L3: balanced judgement of usefulness vs bias."],
        modelAnswer: "The source is partly reliable. Its claim that the USSR was expanding fits real events, since Stalin did install communist governments across Eastern Europe. However, as a US editorial written during rising Cold War tension, it is likely one-sided — it presents Soviet aims purely as aggression and ignores Stalin's fear of invasion and desire for a buffer. It is useful for showing Western attitudes, but not a balanced account of Soviet aims." },
    ],
  },

  // ── 8. CASE STUDY: THE KOREAN WAR ────────────────────────────────────────
  {
    id: "ch-korea",
    slug: "korean-war",
    number: "8",
    section: "The Cold War",
    title: "The Korean War",
    subtitle: "The Cold War turns hot",
    inquiry: "Why did the Cold War lead to real fighting in Korea?",
    palette: "korea",
    era: "1950–1953",
    hook: "For the first time, the superpowers' rivalry exploded into open war — on a divided peninsula in Asia.",
    outcomes: [
      "Explain the post-war partition of Korea and the rise of communist China",
      "Explain the roles of the key players in the war",
      "Explain the armistice and its aftermath",
    ],
    characterIds: ["kim-il-sung", "mao", "truman"],
    timelineIds: ["korea-divided", "korea-invasion", "china-enters-korea", "korea-armistice"],
    pages: [
      {
        id: "k-1",
        kicker: "After 1945",
        title: "A country cut in two",
        scene: "divided-line",
        narration: [
          "After the war, Korea was occupied and then partitioned along the 38th parallel — a communist North backed by the USSR, a capitalist South backed by the USA.",
          "The border simmered with clashes. In the North, Kim Il Sung dreamed of uniting the whole country under communism.",
        ],
        highlights: ["38th parallel", "communist", "capitalist"],
        dialogues: [
          { speaker: "kim-il-sung", characterId: "kim-il-sung", side: "left", text: "Korea must be one nation — a communist nation." },
        ],
      },
      {
        id: "k-2",
        kicker: "1949–1950",
        title: "A communist bloc grows",
        scene: "world-map",
        narration: [
          "In 1949 China too became communist, under Mao. A vast new communist power stood in Asia, soon bound to the USSR by a Sino-Soviet alliance.",
          "To the USA, communism seemed to be spreading fast. So when North Korea invaded the South in June 1950, America saw a line that had to be held.",
        ],
        highlights: ["communist", "Sino-Soviet alliance", "invaded"],
      },
      {
        id: "k-3",
        kicker: "Roles in the war",
        title: "The world takes sides",
        scene: "marching-troops",
        narration: [
          "The USA led a United Nations force to defend South Korea — containment in action — driving the North back towards China's border.",
          "Alarmed, communist China sent huge numbers of troops that hurled the UN forces back. North Korea, South Korea, the USA, the UN, China and the USSR were all now entangled in one war.",
        ],
        highlights: ["United Nations", "containment", "China"],
        dialogues: [
          { speaker: "mao", characterId: "mao", side: "right", text: "We cannot let a hostile army sit on our border. China will act." },
        ],
      },
      {
        id: "k-4",
        kicker: "1953",
        title: "Armistice and aftermath",
        scene: "handshake",
        narration: [
          "The war ground into stalemate at the 38th parallel. In 1953 an armistice ended the fighting, leaving a heavily guarded demilitarised zone between the two Koreas — still there today.",
          "The war deepened the Cold War: it hardened US policy in Asia and sharpened the tension between NATO and the Warsaw Pact.",
        ],
        highlights: ["armistice", "demilitarised zone", "NATO", "Warsaw Pact"],
        choice: {
          question: "You are the USA in 1950. North Korea has invaded the South. What do you do?",
          options: [
            { label: "Send forces through the UN", outcome: "This is what the USA did — containment in action.", historical: true },
            { label: "Stay out of a distant war", outcome: "The USA feared this would let communism spread unchecked." },
            { label: "Attack China and the USSR", outcome: "Far too dangerous — it risked a third world war." },
          ],
          reality: "The USA led a UN force to defend South Korea. After China intervened, the war became a stalemate ending in the 1953 armistice, leaving Korea divided — showing the superpowers would fight through limited wars but pull back from direct all-out war.",
        },
      },
    ],
    boosters: [
      { afterPage: 0, booster: { type: "recall", prompt: "Quick check.", question: "Why was Korea divided after 1945?", answer: "After the war Korea was partitioned at the 38th parallel into a communist North (backed by the USSR) and a capitalist South (backed by the USA) — a Cold War division." } },
      { afterPage: 2, booster: { type: "order", prompt: "Order the events of the Korean War.", items: ["Korea divided at the 38th parallel (1945)", "China becomes communist (1949)", "North invades the South (1950)", "UN forces push north; China enters", "Armistice; Korea stays divided (1953)"] } },
    ],
    bigPicture: {
      title: "Why the Cold War turned hot in Korea",
      nodes: [
        { id: "n1", label: "A divided Korea", icon: "🗺️", detail: "Partitioned at the 38th parallel into North and South." },
        { id: "n2", label: "Communist China", icon: "🇨🇳", detail: "China turned communist (1949), allied to the USSR." },
        { id: "n3", label: "The North invades", icon: "⚔️", detail: "In 1950 the North attacked to unite Korea by force." },
        { id: "n4", label: "The world responds", icon: "🛡️", detail: "A UN force under the USA fought; China intervened." },
        { id: "n5", label: "Armistice & aftermath", icon: "🤝", detail: "1953 armistice, a DMZ, and sharper NATO–Warsaw tension." },
      ],
    },
    exam: [
      { id: "k-exam-1", skill: "Explain (SEQ)", format: "SEQ", marks: 8, question: "Explain why war broke out in Korea in 1950.",
        markScheme: ["Valid reasons: division of Korea, Cold War rivalry, Kim Il Sung's aim, superpower/communist backing.", "Explain HOW each led to war.", "L3: two developed reasons."],
        modelAnswer: "War broke out largely because Korea had been divided at the 38th parallel into a communist North and a capitalist South, creating two hostile states. Cold War rivalry, sharpened by the rise of communist China, raised the stakes. When Kim Il Sung's North invaded the South in 1950 to unite Korea under communism, the USA saw it as communism spreading and intervened — turning a local invasion into a Cold War conflict." },
      { id: "k-exam-2", skill: "Judgement (SEQ)", format: "SEQ", marks: 12, question: "'The Korean War was a success for the policy of containment.' How far do you agree?",
        markScheme: ["FOR: communism stopped from taking the South; South survived.", "AGAINST: huge cost; Korea left divided; China strengthened.", "L4/L5: balanced judgement with a conclusion."],
        modelAnswer: "In one sense containment succeeded: South Korea was saved from communism and the USA showed it would resist Soviet-backed expansion. However, the war was hugely costly and ended in stalemate, with Korea left divided and communist China emerging stronger. Communism was contained but not defeated. On balance the Korean War was a limited success for containment — it held the line, but at great cost and without a clear victory." },
    ],
  },

  // ── 9. CASE STUDY: THE VIETNAM WAR ───────────────────────────────────────
  {
    id: "ch-vietnam",
    slug: "vietnam-war",
    number: "9",
    section: "The Cold War",
    title: "The Vietnam War",
    subtitle: "The Cold War in the jungle",
    inquiry: "Why did the USA fight — and fail — in Vietnam?",
    palette: "vietnam",
    era: "1954–1975",
    hook: "A divided nation, a stubborn insurgency, and a superpower drawn into a war it could not win.",
    outcomes: [
      "Explain the partition of Vietnam and instability in the South",
      "Explain the roles of the key players in the conflict",
      "Explain the end of the war and its immediate aftermath",
    ],
    characterIds: ["ho-chi-minh", "ngo-dinh-diem", "mao"],
    timelineIds: ["vietnam-partition", "vietnam-escalation", "vietnam-end"],
    pages: [
      {
        id: "v-1",
        kicker: "1954",
        title: "A nation divided",
        scene: "divided-line",
        narration: [
          "In 1954 Vietnam was partitioned by the Geneva Accords: a communist North under Ho Chi Minh, and a non-communist South.",
          "In the North, communist control was consolidated. The South was to hold national elections to reunite the country — but the promise would not be kept.",
        ],
        highlights: ["Geneva Accords", "communist", "elections"],
        dialogues: [
          { speaker: "ho-chi-minh", characterId: "ho-chi-minh", side: "left", text: "Vietnam is one country. It will be united — and it will be free." },
        ],
      },
      {
        id: "v-2",
        kicker: "1955–1960s",
        title: "Trouble in the South",
        scene: "angry-crowd",
        narration: [
          "There was deep discontent over the Geneva Accords, and the national elections due in 1956 were never held — for fear the communists would win.",
          "The South's leader, Ngo Dinh Diem, grew unpopular through harsh and corrupt rule. The North supported a growing insurgency against him in the South.",
        ],
        highlights: ["elections", "Ngo Dinh Diem", "insurgency"],
      },
      {
        id: "v-3",
        kicker: "Roles in the war",
        title: "The superpowers step in",
        scene: "marching-troops",
        narration: [
          "As the South weakened, the USA poured in aid and then troops, fearing the domino theory — that if Vietnam fell, its neighbours would follow.",
          "The North was backed by the USSR and communist China. What began as a local struggle became a full Cold War battleground fought in the jungle.",
        ],
        highlights: ["domino theory", "USSR", "China"],
      },
      {
        id: "v-4",
        kicker: "1973–1975",
        title: "The end, and détente",
        scene: "world-map",
        narration: [
          "The war proved unwinnable for the USA. Facing huge costs and fierce opposition at home, American forces withdrew.",
          "In 1975 the North's victory reunified Vietnam under communism. Yet even as the USA lost, the superpowers were cautiously easing tension — the beginning of détente.",
        ],
        highlights: ["withdrew", "reunification", "détente"],
        choice: {
          question: "You advise the US President in the 1960s. Should the USA send more troops to Vietnam?",
          options: [
            { label: "Yes — stop the dominoes", outcome: "The USA escalated for exactly this reason — but the war became a quagmire.", historical: true },
            { label: "No — it is unwinnable", outcome: "Some argued this; in the end the USA did withdraw, but only after huge costs." },
            { label: "Negotiate a settlement", outcome: "Attempted eventually, but the North was determined to unite Vietnam." },
          ],
          reality: "Fearing the domino theory, the USA escalated its involvement — but could not defeat a determined insurgency backed by the USSR and China. Facing mounting costs and opposition at home, it withdrew, and in 1975 Vietnam was reunified under communism.",
        },
      },
    ],
    boosters: [
      { afterPage: 1, booster: { type: "recall", prompt: "Check your understanding.", question: "Why were the 1956 elections in Vietnam never held?", answer: "The South (and the USA) feared the communists under Ho Chi Minh would win, so the elections promised by the Geneva Accords were never carried out — deepening the conflict." } },
      { afterPage: 3, booster: { type: "order", prompt: "Order the Vietnam War's key stages.", items: ["Vietnam partitioned (Geneva Accords, 1954)", "1956 elections never held", "Insurgency in the South grows", "USA sends troops (domino theory)", "US withdrawal; reunification (1975)"] } },
    ],
    bigPicture: {
      title: "The Cold War in Vietnam",
      nodes: [
        { id: "n1", label: "Divided Vietnam", icon: "🌿", detail: "Partitioned in 1954 into a communist North and non-communist South." },
        { id: "n2", label: "Unstable South", icon: "⚠️", detail: "Diem's harsh rule and no elections bred an insurgency." },
        { id: "n3", label: "US involvement", icon: "🛡️", detail: "The USA escalated, fearing the domino theory." },
        { id: "n4", label: "Communist backing", icon: "🇨🇳", detail: "The North was supported by the USSR and China." },
        { id: "n5", label: "Withdrawal & détente", icon: "🕊️", detail: "The USA withdrew; Vietnam reunified; tension eased." },
      ],
    },
    exam: [
      { id: "v-exam-1", skill: "Explain (SEQ)", format: "SEQ", marks: 8, question: "Explain why the USA became involved in the Vietnam War.",
        markScheme: ["Valid reasons: domino theory/containment, instability in the South, communist backing of the North.", "Explain HOW each drew the USA in.", "L3: two developed reasons."],
        modelAnswer: "The USA became involved mainly because of the domino theory — the fear that if South Vietnam fell to communism, its neighbours would follow — making containment seem essential. The growing instability of the South, with Diem's unpopular rule and a rising communist insurgency, threatened to let this happen. As the North, backed by the USSR and China, supported that insurgency, the USA stepped up its aid and then sent troops to hold the line against communism." },
      { id: "v-exam-2", skill: "Explain (SEQ)", format: "SEQ", marks: 8, question: "Explain why South Vietnam was unstable in the 1950s and 1960s.",
        markScheme: ["Valid reasons: discontent over Geneva Accords, no 1956 elections, Diem's unpopular rule, Northern-backed insurgency.", "Explain HOW each caused instability.", "L3: two developed reasons."],
        modelAnswer: "South Vietnam was unstable partly because of anger over the Geneva Accords and the failure to hold the promised 1956 elections, which denied people a peaceful path to reunification. Its leader Ngo Dinh Diem was harsh and corrupt, losing the support of his own people. This discontent was exploited by the North, which backed a growing insurgency in the South — steadily undermining the government." },
    ],
  },

  // ── 10. THE END OF THE COLD WAR ──────────────────────────────────────────
  {
    id: "ch-end",
    slug: "end-of-cold-war",
    number: "10",
    section: "The Cold War",
    title: "The End of the Cold War",
    subtitle: "How the long standoff finally thawed",
    inquiry: "Why did the Soviet Union — and the Cold War — collapse?",
    palette: "collapse",
    era: "1980s–1991",
    hook: "After forty years of fear, the walls came down — and a superpower quietly dissolved.",
    outcomes: [
      "Explain the structural weaknesses of the Soviet economy",
      "Explain the external burdens and the renewed arms race",
      "Explain the impact of Gorbachev's reforms and the fall of the USSR",
    ],
    characterIds: ["gorbachev"],
    timelineIds: ["wall-falls", "ussr-ends"],
    pages: [
      {
        id: "d-1",
        kicker: "The 1980s",
        title: "A system that could not deliver",
        scene: "empty-factory",
        narration: [
          "At the heart of the crisis lay the Soviet command economy. Planned entirely from the top, it was rigid and inefficient, unable to provide the goods people wanted.",
          "These structural weaknesses meant living standards fell far behind the West. Ordinary Soviet citizens queued for basics — and began to lose faith.",
        ],
        highlights: ["command economy", "structural weaknesses", "living standards"],
      },
      {
        id: "d-2",
        kicker: "The burden",
        title: "The weight the USSR could not carry",
        scene: "money-flow",
        narration: [
          "On top of a weak economy came crushing external burdens. Huge military spending drained the country, and holding the communist bloc together — with its Warsaw Pact commitments — cost dearly.",
          "Then, in the 1980s, the USA used its economic might to re-intensify the arms race, a contest the strained Soviet economy simply could not win.",
        ],
        highlights: ["military spending", "Warsaw Pact", "arms race"],
      },
      {
        id: "d-3",
        kicker: "Gorbachev",
        title: "Openness and restructuring",
        scene: "handshake",
        narration: [
          "Gorbachev tried to save the system with reform: glasnost, or 'openness', and perestroika, the 'restructuring' of the economy.",
          "But the reforms failed to revive the economy, while openness let people voice long-hidden anger. Confidence in the Soviet government drained away.",
        ],
        highlights: ["glasnost", "perestroika"],
        dialogues: [
          { speaker: "gorbachev", characterId: "gorbachev", side: "left", text: "We cannot go on as before. The country must open, and it must change." },
        ],
      },
      {
        id: "d-4",
        kicker: "1989–1991",
        title: "The empire dissolves",
        scene: "falling-wall",
        narration: [
          "Once people saw the USSR would not use force, the communist bloc collapsed. In 1989 the Berlin Wall fell as Eastern Europe broke free.",
          "Two years later the Soviet Union itself disintegrated into separate nations. The Cold War was over — ended not by war, but by the quiet collapse of one side.",
        ],
        highlights: ["Berlin Wall", "disintegrated", "Cold War was over"],
        choice: {
          question: "You are Gorbachev in 1989. Protests spread across Eastern Europe. What do you do?",
          options: [
            { label: "Do not use force", outcome: "This is what Gorbachev chose — allowing change and hastening the end.", historical: true },
            { label: "Send in the army", outcome: "Earlier leaders had, but by the 1980s the USSR could not afford it." },
          ],
          reality: "Gorbachev chose restraint. Without the threat of Soviet tanks, and with the economy in ruins, the communist bloc collapsed, the Berlin Wall fell, and in 1991 the Soviet Union broke apart — ending the Cold War.",
        },
      },
    ],
    boosters: [
      { afterPage: 1, booster: { type: "recall", prompt: "Check your understanding.", question: "Name two burdens that strained the Soviet economy.", answer: "Any two of: a weak, inefficient command economy; huge military spending; the cost of holding the communist bloc and Warsaw Pact together; and the renewed 1980s arms race with the USA." } },
      { afterPage: 3, booster: { type: "order", prompt: "Order the end of the Cold War.", items: ["Command economy struggles", "Costly arms race and bloc commitments", "Gorbachev's reforms (glasnost, perestroika)", "Berlin Wall falls (1989)", "USSR disintegrates (1991)"] } },
    ],
    bigPicture: {
      title: "Why the Cold War ended",
      nodes: [
        { id: "n1", label: "Weak economy", icon: "📉", detail: "The command economy could not provide or compete." },
        { id: "n2", label: "External burdens", icon: "💸", detail: "Military spending and the bloc drained the USSR." },
        { id: "n3", label: "Renewed arms race", icon: "🚀", detail: "1980s US pressure the Soviets could not match." },
        { id: "n4", label: "Failed reforms", icon: "🕊️", detail: "Glasnost and perestroika could not save the system." },
        { id: "n5", label: "Collapse", icon: "🧱", detail: "The bloc fell, the Wall came down, the USSR disintegrated." },
      ],
    },
    exam: [
      { id: "d-exam-1", skill: "Explain (SEQ)", format: "SEQ", marks: 8, question: "Explain why the Soviet economy was in crisis by the 1980s.",
        markScheme: ["Valid reasons: inefficient command economy, military spending, cost of the bloc, arms race.", "Explain HOW each caused crisis.", "L3: two developed reasons."],
        modelAnswer: "The Soviet economy was in crisis mainly because its command system was rigid and inefficient, unable to provide the goods people needed, so living standards fell behind the West. On top of this came crushing burdens: huge military spending and the cost of holding the communist bloc together. When the USA re-intensified the arms race in the 1980s, the strained Soviet economy simply could not keep up." },
      { id: "d-exam-2", skill: "Judgement (SEQ)", format: "SEQ", marks: 12, question: "'Gorbachev's reforms were the main reason the Cold War ended.' How far do you agree?",
        markScheme: ["FOR: reforms, openness, refusal to use force.", "AGAINST: deep economic weakness, arms race cost, resistance within the bloc.", "L4/L5: balanced judgement with a conclusion."],
        modelAnswer: "Gorbachev's reforms were very important: glasnost and perestroika, and his refusal to use force, allowed the communist bloc to collapse. However, he was responding to deeper problems — a failing command economy, crushing military and bloc costs, and a renewed arms race the USSR could not win. On balance, Gorbachev was the decisive trigger, but he was acting on long-term weaknesses that were already pushing the Soviet Union, and the Cold War, towards their end." },
    ],
  },
];

export function getChapter(slug: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.slug === slug);
}

export function chapterIndex(slug: string): number {
  return CHAPTERS.findIndex((c) => c.slug === slug);
}
