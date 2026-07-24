/**
 * Pre-authored "AI Tutor" and "Exam Memory" content, one entry per chapter.
 * Written to stay strictly within the 2261 syllabus. A real OpenAI key can be
 * plugged into /api/tutor later; until then these deterministic responses power
 * the tutor panel so everything works offline and never invents extra facts.
 */

export interface TutorContent {
  simpler: string;
  eli10: string;
  analogy: string;
  matters: string;
  memorise: string[];
  mistakes: string[];
  /** Exam Memory Mode: layered summaries + a model exam paragraph. */
  oneSentence: string;
  threeSentence: string;
  fiveSentence: string;
  peel: { point: string; evidence: string; explain: string; link: string };
}

export const TUTOR: Record<string, TutorContent> = {
  "treaty-of-versailles": {
    simpler:
      "After World War One, the winners made Germany sign a harsh peace treaty. Germany lost land, had its army cut, paid huge fines (reparations), and had to accept blame for the war. Germans felt this was unfair and stayed angry for years.",
    eli10:
      "Imagine your team loses a game, and the winners make you say sorry for everything, pay for all the broken equipment, and give away your best players — even though you weren't allowed to argue. You'd feel it was unfair, and you'd stay upset. That's how Germans felt about Versailles.",
    analogy:
      "Versailles was like squeezing a spring. Every harsh term pressed German anger down further — and years later that pressure sprang back when Hitler promised to release it.",
    matters:
      "It matters because the anger caused by Versailles is the starting point of the whole story. Without that resentment, Hitler would have had far less to campaign on — so this treaty helps explain how the Second World War became possible.",
    memorise: [
      "5 terms: land loss, army limited to 100,000, reparations, War Guilt Clause, demilitarised Rhineland",
      "'Diktat' = a dictated peace Germany was forced to sign",
      "Signed 1919; the League of Nations began 1920",
      "Key link: resentment → support for Hitler",
    ],
    mistakes: [
      "Listing terms without explaining WHY they caused anger",
      "Confusing reparations (payments) with the War Guilt Clause (blame)",
      "Forgetting to link the Treaty forward to the rise of Hitler",
    ],
    oneSentence:
      "The Treaty of Versailles punished Germany so harshly that lasting resentment helped make another war possible.",
    threeSentence:
      "The Treaty of Versailles forced Germany to lose land, limit its army, pay reparations and accept blame for the war. Germans saw it as an unfair 'diktat' and grew deeply resentful. This anger later helped Hitler gain support by promising to overturn the Treaty.",
    fiveSentence:
      "After World War One, the victorious powers imposed the Treaty of Versailles on Germany in 1919. Its terms took German land, cut the army to 100,000 men, demanded huge reparations, and blamed Germany through the War Guilt Clause. Germans, who had not been allowed to negotiate, called it a humiliating 'diktat'. This bitterness damaged Germany's new democracy and national pride. Years later, Hitler exploited that resentment by promising to tear the Treaty up.",
    peel: {
      point: "The Treaty of Versailles was a major long-term cause of the Second World War.",
      evidence:
        "It imposed reparations, the War Guilt Clause, army limits and loss of land on Germany.",
      explain:
        "These terms created deep resentment, which Hitler later exploited by promising to overturn the Treaty and restore German pride.",
      link:
        "In this way the peace of 1919 helped make another war more likely.",
    },
  },
  "rise-of-hitler": {
    simpler:
      "The Great Depression left millions of Germans jobless. Hitler promised jobs, pride and an end to Versailles, so people supported him and he became dictator in 1933. He broke the Treaty step by step; Britain and France appeased him until he invaded Poland in 1939.",
    eli10:
      "When everyone is scared and out of work, a loud person promising to fix everything can become very popular — even if their ideas are dangerous. Hitler was that person, and giving in to his demands only made him bolder.",
    analogy:
      "Appeasement was like feeding a bully your lunch to be left alone. It works for a day, but the bully just comes back hungrier — until you have no choice but to stand up to him.",
    matters:
      "It matters because it shows HOW anger and hard times turn into war. It also raises a big question O-Level loves: was appeasement a reasonable choice or a costly mistake?",
    memorise: [
      "Depression (1929) → unemployment → support for Hitler → power (1933)",
      "Steps: Rhineland 1936 → Sudetenland/Munich 1938 → Poland 1939",
      "Appeasement = giving in to avoid war",
      "War declared after the invasion of Poland",
    ],
    mistakes: [
      "Saying Hitler 'seized' power violently — he came to power legally in 1933",
      "Getting the order of his actions wrong",
      "Only blaming appeasement and ignoring Hitler's own aims",
    ],
    oneSentence:
      "Depression and resentment brought Hitler to power, and appeasement failed to stop his march to war in 1939.",
    threeSentence:
      "The Great Depression created mass unemployment that helped Hitler win support and become leader in 1933. He then broke the Treaty of Versailles step by step, while Britain and France appeased him. Appeasement failed when he invaded Poland in 1939, starting the war.",
    fiveSentence:
      "The Great Depression of 1929 caused huge unemployment and desperation in Germany. Hitler and the Nazis promised jobs, national pride and an end to Versailles, winning power in 1933. He rebuilt the army and remilitarised the Rhineland in 1936 without being stopped. Britain and France followed appeasement, letting him take the Sudetenland at Munich in 1938. When he invaded Poland in 1939, appeasement collapsed and the Second World War began.",
    peel: {
      point: "Appeasement made war more likely but was not its main cause.",
      evidence:
        "Britain and France gave in at Munich in 1938, letting Germany take the Sudetenland.",
      explain:
        "This convinced Hitler the great powers were weak, encouraging him to invade Poland — yet the deeper cause was his own aim to expand and overturn Versailles.",
      link:
        "So appeasement contributed to war, but Hitler's ambitions were the fundamental reason it broke out.",
    },
  },
  "japans-road-to-war": {
    simpler:
      "Japan was crowded and short of resources. Hit hard by the Depression, its military leaders decided to build an empire, seizing Manchuria and invading China. When the USA cut off oil, Japan attacked Pearl Harbor in 1941, bringing America into the war.",
    eli10:
      "If you run a factory but have no materials of your own, you might try to grab a neighbour's supplies. Japan did that with land and resources — and when the biggest neighbour (the USA) cut it off, Japan lashed out.",
    analogy:
      "Japan's expansion was like a runner who can't stop: each conquest needed more fuel, which meant grabbing more land, which needed even more fuel — until it collided with the USA.",
    matters:
      "It matters because it explains how the war spread beyond Europe into the Asia-Pacific and why the USA joined the fighting.",
    memorise: [
      "Cause: few resources + Depression → desire for empire",
      "Manchuria 1931 → China 1937 → Pearl Harbor 1941",
      "League condemned Manchuria but had no army to act",
      "US oil embargo pushed Japan to attack",
    ],
    mistakes: [
      "Forgetting the resource/economic motive behind expansion",
      "Not linking the US oil embargo to Pearl Harbor",
      "Mixing up the dates of Manchuria and China",
    ],
    oneSentence:
      "Japan's need for resources drove it to build an empire and, after a US oil embargo, to attack Pearl Harbor in 1941.",
    threeSentence:
      "Lacking resources and hit by the Depression, Japan's military leaders pursued expansion, seizing Manchuria in 1931 and invading China in 1937. This aggression alarmed the USA, which cut off oil. Rather than back down, Japan attacked Pearl Harbor in 1941, bringing the USA into the war.",
    fiveSentence:
      "Japan was a crowded island short of raw materials, and the Depression made its economic problems worse. Military leaders argued that building an empire would solve this, so Japan seized resource-rich Manchuria in 1931. The League of Nations condemned it but had no army to stop Japan. In 1937 Japan launched a full invasion of China, worsening relations with the USA, which cut off oil. Facing this embargo, Japan attacked Pearl Harbor in 1941 and drew America fully into the war.",
    peel: {
      point: "Japan expanded mainly because it needed resources.",
      evidence:
        "It seized Manchuria (1931) for coal and iron and invaded China (1937), needing ever more oil and steel.",
      explain:
        "Its dependence on imports, especially US oil, meant that when the USA imposed an embargo, Japan chose to seize resources by force rather than retreat.",
      link:
        "This resource-driven expansion led directly to the attack on Pearl Harbor and war in the Asia-Pacific.",
    },
  },
  "origins-of-the-cold-war": {
    simpler:
      "The USA (capitalist, democratic) and USSR (communist) had beaten Hitler together but distrusted each other. They clashed over Eastern Europe, where Stalin set up communist governments. The USA responded with containment — the Truman Doctrine and Marshall Plan — and the world split in two.",
    eli10:
      "Two friends team up to beat a bully, but they believe in totally opposite rules for the playground. Once the bully's gone, they stop trusting each other and each tries to get everyone on their side.",
    analogy:
      "The Cold War began like two chess players who never actually capture a piece — they just keep threatening, blocking and building up, each afraid of the other's next move.",
    matters:
      "It matters because these origins set up every later Cold War crisis — Berlin, Cuba and the rest all grow from this basic USA–USSR divide.",
    memorise: [
      "USA = capitalism/democracy; USSR = communism",
      "Conferences: Yalta and Potsdam (1945) showed disagreement",
      "Iron Curtain speech: Churchill, 1946",
      "Containment = Truman Doctrine + Marshall Plan (1947)",
    ],
    mistakes: [
      "Treating it as a 'hot' war — it was rivalry, not direct fighting between the two",
      "Ignoring that Stalin wanted a buffer for security, not only expansion",
      "Confusing the Truman Doctrine (support) with the Marshall Plan (money)",
    ],
    oneSentence:
      "Opposing beliefs and disputes over Eastern Europe turned the USA and USSR from wartime allies into Cold War rivals.",
    threeSentence:
      "The USA and USSR held opposite beliefs and each feared the other would spread its system. They clashed over Soviet control of Eastern Europe, which Churchill called the 'Iron Curtain'. The USA adopted containment through the Truman Doctrine and Marshall Plan, deepening the divide into a Cold War.",
    fiveSentence:
      "The USA and USSR had been allies against Hitler but believed in opposite systems: capitalism and democracy versus communism. At the Yalta and Potsdam conferences their disagreements, especially over Eastern Europe, became clear. Stalin installed communist governments there, which the West saw as aggression and Churchill described as an 'Iron Curtain'. In response the USA adopted containment, promising support against communism (the Truman Doctrine) and sending aid (the Marshall Plan). Mutual suspicion hardened, and Europe split into two hostile camps.",
    peel: {
      point: "Ideological differences were a key cause of the Cold War.",
      evidence:
        "The USA supported capitalism and democracy while the USSR was communist, and each feared the spread of the other's system.",
      explain:
        "This distrust shaped their clash over Eastern Europe and led the USA to adopt containment through the Truman Doctrine and Marshall Plan.",
      link:
        "As a result, former allies became rivals and the Cold War began.",
    },
  },
  "berlin-blockade": {
    simpler:
      "Germany and Berlin were split between the West and the USSR, leaving West Berlin surrounded by communist East Germany. In 1948 Stalin blockaded it; the West supplied the city by air for nearly a year (the Airlift). Stalin gave up, Germany split for good, and NATO was formed.",
    eli10:
      "Imagine an island of your friends stuck in the middle of a rival's territory. The rival blocks all the roads, so you fly in food by helicopter every few minutes until they give up. That's the Berlin Airlift.",
    analogy:
      "The Airlift was a tug-of-war won without pulling: the West didn't force the blockade, it simply out-lasted it from the sky.",
    matters:
      "It matters because it was the Cold War's first big crisis and showed both sides would avoid direct war — while making the division of Europe permanent.",
    memorise: [
      "Germany + Berlin split into 4 zones after the war",
      "West Berlin sat inside the Soviet zone",
      "Blockade 1948 → Airlift 1948–49 → blockade lifted",
      "Results: Germany divided (West/East) + NATO formed 1949",
    ],
    mistakes: [
      "Confusing the Blockade (1948–49) with the later Berlin Wall (1961)",
      "Saying the West 'fought' through the blockade — they flew over it",
      "Forgetting NATO formed as a result",
    ],
    oneSentence:
      "Stalin's blockade of West Berlin was defeated by the Airlift, cementing a divided Germany and leading to NATO.",
    threeSentence:
      "After the war, West Berlin lay isolated inside the Soviet zone, and in 1948 Stalin blockaded it to force the West out. The West supplied the city entirely by air for almost a year until Stalin lifted the blockade. Germany was divided permanently and the Western powers formed NATO.",
    fiveSentence:
      "After the war Germany and Berlin were divided into four zones, leaving West Berlin surrounded by the Soviet zone. Alarmed by Western moves to strengthen West Germany, Stalin blockaded West Berlin in 1948, cutting off supplies to two million people. Rather than risk war, the West supplied the city by air in the Berlin Airlift. After nearly a year Stalin admitted defeat and lifted the blockade. Germany then split permanently, and the West formed NATO to defend against the Soviet threat.",
    peel: {
      point: "The Berlin Airlift was a significant success for the West.",
      evidence:
        "The West supplied two million people by air for almost a year until Stalin lifted the blockade.",
      explain:
        "This kept West Berlin free without fighting and won a propaganda victory, though it also confirmed Germany's division and led to NATO.",
      link:
        "So the Airlift was a clear short-term success, but it deepened the Cold War divide.",
    },
  },
  "cuban-missile-crisis": {
    simpler:
      "Cuba was communist and close to the USA. In 1962 the USSR secretly placed nuclear missiles there. Kennedy blockaded Cuba and demanded their removal. After thirteen tense days, Khrushchev agreed to remove them in return for US promises, and nuclear war was avoided.",
    eli10:
      "Your rival sets up something dangerous right next to your house. You block the path and say 'take it away' — but very carefully, because one wrong move could blow everything up. Both sides step back just in time.",
    analogy:
      "The crisis was like two people pointing at each other at the edge of a cliff — the winner wasn't who pushed hardest, but who found a way for both to step back.",
    matters:
      "It matters because it was the closest the Cold War came to nuclear war, and the fright afterwards led both sides to reduce tension.",
    memorise: [
      "Cuba communist under Castro, allied to USSR, 90 miles from USA",
      "Oct 1962: US spy planes find Soviet missiles",
      "Kennedy's response = naval blockade ('quarantine')",
      "Deal: USSR removes missiles; USA won't invade + removes some missiles",
    ],
    mistakes: [
      "Saying the crisis led to war — it was resolved peacefully",
      "Forgetting the secret US concession (removing its own missiles)",
      "Ignoring why the USSR placed missiles (protect Cuba + balance)",
    ],
    oneSentence:
      "The 1962 Cuban Missile Crisis brought the world to the brink of nuclear war before both sides negotiated a peaceful end.",
    threeSentence:
      "In 1962 the USSR secretly placed nuclear missiles in communist Cuba, close to the USA. Kennedy responded with a naval blockade and demanded their removal, creating thirteen tense days. Khrushchev agreed to remove them in return for US promises, and nuclear war was avoided.",
    fiveSentence:
      "Cuba became communist under Castro and allied itself with the USSR, just 90 miles from the USA. In October 1962 US spy planes discovered Soviet nuclear missile sites being built there. Kennedy ordered a naval blockade of Cuba and demanded the missiles' removal. For thirteen days the world feared nuclear war as Soviet ships approached. Finally Khrushchev agreed to remove the missiles in return for a US promise not to invade Cuba and to quietly remove some of its own missiles.",
    peel: {
      point: "The USSR placed missiles in Cuba to protect its ally and balance US power.",
      evidence:
        "Cuba was a communist state 90 miles from the USA, and the USA already had missiles near the USSR.",
      explain:
        "Missiles in Cuba would defend Castro from invasion and give the USSR a similar threat close to American soil, strengthening its Cold War position.",
      link:
        "This is why Khrushchev took the risk that triggered the crisis.",
    },
  },
  "end-of-the-cold-war": {
    simpler:
      "By the 1980s the USSR was worn out by economic problems and the arms race. Gorbachev reformed the system and refused to use force in Eastern Europe. Communist governments collapsed, the Berlin Wall fell in 1989, and the USSR broke apart in 1991 — ending the Cold War.",
    eli10:
      "Imagine holding a heavy door shut for forty years. Eventually you're exhausted and let go — and the door swings open on its own. Gorbachev letting go is what ended the Cold War.",
    analogy:
      "The USSR was like a machine running on empty. Gorbachev's choice not to force things was simply taking his foot off a pedal that had run out of fuel.",
    matters:
      "It matters because it explains how a decades-long, dangerous standoff ended peacefully rather than in war — a rare and important outcome.",
    memorise: [
      "1980s: Soviet economy weak; arms race too costly",
      "Gorbachev becomes leader 1985; reforms + eases tension",
      "Key choice: no force to hold Eastern Europe",
      "Berlin Wall falls 1989; USSR ends 1991",
    ],
    mistakes: [
      "Crediting only Gorbachev and ignoring deep economic weakness",
      "Saying the Cold War ended in a war — it ended peacefully",
      "Mixing up 1989 (Wall falls) and 1991 (USSR ends)",
    ],
    oneSentence:
      "Soviet weakness and Gorbachev's reforms and restraint brought the Cold War to a peaceful end by 1991.",
    threeSentence:
      "By the 1980s the USSR was exhausted by economic problems and the costly arms race. Gorbachev's reforms eased tension and he refused to use force to hold Eastern Europe. Communist governments fell, the Berlin Wall came down in 1989, and the USSR broke apart in 1991.",
    fiveSentence:
      "By the 1980s the Soviet Union faced serious economic problems and could no longer afford the arms race or control of Eastern Europe. In 1985 Gorbachev became leader and introduced reforms while easing tension with the West. Crucially, he signalled that the USSR would not use force to keep Eastern European governments in power. Protests spread and communist governments collapsed, and in 1989 the Berlin Wall was opened. In 1991 the Soviet Union itself broke apart, ending the Cold War.",
    peel: {
      point: "Gorbachev was crucial to ending the Cold War, but not the only cause.",
      evidence:
        "His reforms eased tension and he refused to use force in Eastern Europe, allowing communist governments to fall.",
      explain:
        "However, he was responding to deep Soviet economic weakness and the crushing cost of the arms race, which made change necessary.",
      link:
        "So Gorbachev was the decisive trigger acting on long-term problems that were already pushing the Cold War towards its end.",
    },
  },
  "the-korean-war": {
    simpler:
      "After WWII, Korea was split at the 38th parallel into a communist North and a capitalist South. In 1950 the North invaded to unite Korea. The USA led a UN force to stop communism spreading; China then joined in. The war ended in 1953 in a stalemate, with Korea still divided.",
    eli10:
      "Imagine two halves of one playground with a line down the middle. One side charges across to take over, so the other side's big friend jumps in to stop them — then the neighbour joins too. After lots of pushing, everyone ends up back at the same line.",
    analogy:
      "Korea was a tug-of-war over a line: the North pulled, the UN pulled back, China pulled again — and after all that effort, the rope ended up right where it started, at the 38th parallel.",
    matters:
      "It matters because it's the first time the Cold War turned into real fighting. It shows containment and the domino theory in action, and why the superpowers fought through 'proxy' wars rather than each other.",
    memorise: [
      "Korea split at the 38th parallel (1945): North communist, South capitalist",
      "North invades 1950 → USA leads a UN force (USSR boycotting the vote)",
      "China enters late 1950 → stalemate",
      "1953 armistice = ceasefire; Korea stays divided",
    ],
    mistakes: [
      "Saying a side 'won' — it ended in stalemate/division",
      "Forgetting the UN and China's roles",
      "Confusing armistice (ceasefire) with a full peace treaty",
    ],
    oneSentence:
      "The Korean War (1950–53) was the first 'hot' Cold War conflict, ending in a stalemate that left Korea divided at the 38th parallel.",
    threeSentence:
      "After 1945 Korea was divided into a communist North and a capitalist South. When the North invaded in 1950, the USA led a UN force to contain communism, and China then intervened. The war ended in a 1953 armistice with Korea still divided.",
    fiveSentence:
      "After the Second World War, Korea was split at the 38th parallel into a communist North backed by the USSR and a capitalist South backed by the USA. In 1950 the North invaded to unite Korea under communism. Seeing this as communism spreading, the USA led a United Nations force that pushed the North back towards China's border. Alarmed, China sent troops that drove the UN forces back to the 38th parallel. The war ended in a 1953 armistice, leaving Korea divided — the Cold War's first 'hot' war.",
    peel: {
      point: "The Korean War was a limited success for containment.",
      evidence:
        "The USA led a UN force that stopped North Korea taking over the South, saving South Korea from communism.",
      explain:
        "However, the war ended in stalemate with Korea still divided and China strengthened, so communism was contained but not defeated.",
      link:
        "It held the line against communism, but at great cost and without a clear victory.",
    },
  },
};
