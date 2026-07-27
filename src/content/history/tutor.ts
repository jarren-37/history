/**
 * Pre-authored "AI Tutor" and "Exam Memory" content, one entry per chapter,
 * keyed by chapter slug. Written to stay strictly within the 2261 syllabus so
 * everything works offline and never invents extra facts.
 */

export interface TutorContent {
  simpler: string;
  eli10: string;
  analogy: string;
  matters: string;
  memorise: string[];
  mistakes: string[];
  oneSentence: string;
  threeSentence: string;
  fiveSentence: string;
  peel: { point: string; evidence: string; explain: string; link: string };
}

export const TUTOR: Record<string, TutorContent> = {
  "paris-peace-conference": {
    simpler:
      "After WWI, the Big Three made Germany sign the harsh Treaty of Versailles (blame, reparations, disarmament, lost land). New nation-states were created by self-determination, and the League of Nations was set up to keep peace — but it was weak.",
    eli10:
      "The winners of a huge fight made the loser say sorry, pay up and give things away. They also set up a 'club' to stop future fights — but the club had no muscle, so bullies could ignore it.",
    analogy:
      "The League was a referee with a whistle but no power to send anyone off — fine for small squabbles, useless against a determined cheat.",
    matters:
      "It sets the stage for everything after: German resentment and a weak League are the seeds of the next war.",
    memorise: [
      "Big Three: Clemenceau, Wilson, Lloyd George",
      "Versailles: War Guilt Clause, reparations, demilitarisation, lost land",
      "Self-determination → new nation-states from old empires",
      "League weak: no USA, no army",
    ],
    mistakes: [
      "Listing terms without explaining why they caused anger",
      "Calling the League a total failure (it had 1920s successes)",
      "Forgetting the USA never joined the League",
    ],
    oneSentence:
      "The 1919 peace punished Germany and created a well-meaning but weak League of Nations.",
    threeSentence:
      "The Treaty of Versailles blamed and punished Germany, breeding resentment. New nation-states were formed by self-determination. The League of Nations was set up for collective security but was weak, with no US membership and no army.",
    fiveSentence:
      "At the Paris Peace Conference the Big Three shaped a harsh peace. The Treaty of Versailles forced Germany to accept blame, pay reparations, disarm and lose land. Across Europe, old empires broke up into new nation-states guided by self-determination. To keep the peace, the League of Nations was created on the idea of collective security. But it was weak — the USA never joined and it had no army — so it worked only while the stakes were low.",
    peel: {
      point: "The League of Nations was flawed from the start.",
      evidence: "The USA never joined, it had no army, and it could not compel great powers.",
      explain: "This meant it relied only on persuasion and sanctions, which determined aggressors could ignore.",
      link: "So while it managed small disputes in the 1920s, it was not equipped for the crises to come.",
    },
  },
  "nazi-germany": {
    simpler:
      "The weak Weimar democracy was blamed for Versailles and battered by the Depression. Hitler and the Nazis used propaganda, force and elections to win power in 1933, then built a one-party dictatorship with rearmament, nationalism and the persecution of minorities.",
    eli10:
      "When people are scared and jobless, a loud leader promising to fix everything can get very popular — even if his ideas are dangerous. Once in charge, Hitler banned everyone who could say no.",
    analogy:
      "Weimar was a house with cracked foundations; the Depression was the earthquake; Hitler was the man who promised to rebuild it — then locked everyone inside.",
    matters:
      "It shows HOW a democracy can collapse into dictatorship — a key source-based case study.",
    memorise: [
      "Weimar weaknesses: blamed for Versailles, unstable constitution",
      "Depression → unemployment → Nazi support",
      "Nazi methods: propaganda, force (SA), elections",
      "Consolidation: one-party state, war economy, persecution",
    ],
    mistakes: [
      "Saying Hitler seized power violently — he was legally made Chancellor",
      "Ignoring the Weimar weaknesses that came before Hitler",
      "Forgetting the persecution/control side of Nazi rule",
    ],
    oneSentence:
      "Weimar weakness and the Depression let Hitler win power and build a one-party dictatorship.",
    threeSentence:
      "The Weimar Republic was weak and blamed for Versailles, and the Depression brought mass unemployment. Hitler's Nazis used propaganda, force and elections to gain power in 1933. He then built a one-party dictatorship with rearmament, nationalism and the persecution of minorities.",
    fiveSentence:
      "Germany's Weimar democracy was fragile, blamed for accepting Versailles and prone to instability. The Great Depression then caused mass unemployment and desperation. Hitler and the Nazi Party exploited this with powerful propaganda, the force of the SA, and success in elections, so that in 1933 he was legally made Chancellor. He quickly destroyed the democracy, banning rivals to create a one-party state. His rule cut unemployment and rearmed Germany, but rested on fierce nationalism, tight control and the brutal persecution of minorities.",
    peel: {
      point: "The Depression was crucial to Hitler's rise.",
      evidence: "It caused mass unemployment that the Weimar government could not solve.",
      explain: "Desperate Germans abandoned moderate parties for the Nazis, who promised jobs and pride.",
      link: "So economic collapse turned a fringe party into a movement that could take power.",
    },
  },
  "militarist-japan": {
    simpler:
      "Japan's weak, distrusted democracy struggled with economic hardship and the Depression. Ultranationalist army officers won support through military success and assassinated moderates. By the 1930s the militarists ruled, controlling industry, militarising schools and crushing unions.",
    eli10:
      "When the normal leaders looked weak and times were hard, the army stepped in promising strength — and scared off anyone who disagreed.",
    analogy:
      "Japan's democracy was a captain the crew stopped trusting in a storm; the army seized the wheel, promising to steer to safety through conquest.",
    matters:
      "It's the Asian parallel to Nazi Germany — how hardship and weak democracy produce military dictatorship.",
    memorise: [
      "Weak, distrusted democracy",
      "Economic troubles: inflation, unemployment, landlord–tenant disputes, Depression",
      "Ultranationalists: military successes + assassinations",
      "Control: state-run industry, militarised education, crushed unions",
    ],
    mistakes: [
      "Forgetting the economic causes of the army's rise",
      "Ignoring political assassinations as a method",
      "Confusing this domestic chapter with the outbreak of war",
    ],
    oneSentence:
      "Weak democracy and economic misery let Japan's militarists seize power and reshape society for war.",
    threeSentence:
      "Japan's democracy was weak and distrusted, and economic hardship worsened by the Depression spread anger. Ultranationalists gained support through military success and silenced moderates with assassinations. By the 1930s the militarists controlled the government, industry, education and labour.",
    fiveSentence:
      "In the 1920s Japan had a democracy, but it was seen as weak and corrupt. Economic troubles — inflation, unemployment and bitter landlord–tenant disputes — were made worse by the Great Depression. Ultranationalist army officers argued that only military strength and empire could save Japan, and their successes made them popular. They also used assassination to remove moderate leaders. By the 1930s the militarists dominated the government, increasing state control of industry, militarising education and crushing labour unions.",
    peel: {
      point: "Economic hardship was central to the militarists' rise.",
      evidence: "Inflation, unemployment and the Depression caused widespread suffering and anger.",
      explain: "This discredited the democratic politicians and made the ultranationalists' promise of empire and strength appealing.",
      link: "So economic misery opened the door for the army to take control.",
    },
  },
  "outbreak-europe": {
    simpler:
      "In the 1930s the League failed (disarmament collapsed; the Abyssinian Crisis exposed it). Hitler undid Versailles step by step — Saar, Rhineland, Anschluss, Sudetenland/Czechoslovakia. Britain and France appeased him, but after the Nazi-Soviet Pact he invaded Poland in 1939 and war broke out.",
    eli10:
      "Feeding a bully your lunch to be left alone only makes him hungrier. Giving Hitler what he wanted just made him take more — until there was no choice but to fight.",
    analogy:
      "Appeasement was letting a burglar take one room, then another, hoping he'd stop — until he took the whole house.",
    matters:
      "It answers a classic exam question — why war broke out — and the big debate about appeasement.",
    memorise: [
      "League fails: disarmament + Abyssinian Crisis (1935)",
      "Steps: Saar 1935 → Rhineland 1936 → Anschluss 1938 → Sudetenland/Czechoslovakia 1938–39",
      "Appeasement = giving in to avoid war (Munich 1938)",
      "Nazi-Soviet Pact 1939 → invasion of Poland → war",
    ],
    mistakes: [
      "Getting the order of Hitler's actions wrong",
      "Blaming only appeasement and ignoring Hitler's aims",
      "Forgetting the Nazi-Soviet Pact's role",
    ],
    oneSentence:
      "A weak League and appeasement let Hitler's step-by-step aggression end in the invasion of Poland and war.",
    threeSentence:
      "In the 1930s the League proved powerless, as the Abyssinian Crisis showed. Hitler broke Versailles step by step while Britain and France appeased him. After the Nazi-Soviet Pact, he invaded Poland in 1939 and Britain and France declared war.",
    fiveSentence:
      "The League of Nations failed in the 1930s: disarmament collapsed and the Abyssinian Crisis showed it could not stop aggression. Hitler exploited this, undoing Versailles step by step — the Saar, the Rhineland, the Anschluss, and the Sudetenland at Munich. Rather than fight, Britain and France appeased him, but in 1939 he seized the rest of Czechoslovakia, breaking his word. The Nazi-Soviet Pact then removed the fear of a two-front war. Hitler invaded Poland, and Britain and France finally declared war.",
    peel: {
      point: "Appeasement made war more likely but was not its main cause.",
      evidence: "Britain and France gave in at Munich in 1938, letting Germany take the Sudetenland.",
      explain: "This convinced Hitler the powers were weak, encouraging him to invade Poland — yet the deeper cause was his own aim to expand.",
      link: "So appeasement contributed to war, but Hitler's ambitions were the fundamental reason it broke out.",
    },
  },
  "outbreak-asia": {
    simpler:
      "The League could not stop Japan taking Manchuria (1931). Japan invaded China (1937) for an empire — the Co-Prosperity Sphere — and needed oil. When the USA cut off oil, Japan attacked Pearl Harbor in 1941, bringing America into the war.",
    eli10:
      "Japan grabbed its neighbours' land for supplies. When the biggest neighbour (the USA) cut off its fuel, Japan lashed out and hit Pearl Harbor.",
    analogy:
      "Japan was a runner who couldn't stop: each conquest needed more fuel, which meant grabbing more land — until it collided with the USA.",
    matters:
      "It explains how the war spread to the Asia-Pacific and drew in the USA.",
    memorise: [
      "Manchuria 1931 → League powerless → Japan leaves 1933",
      "China 1937; Greater East Asia Co-Prosperity Sphere",
      "US–Japan relations worsen; US oil embargo",
      "Pearl Harbor 1941 → USA enters the war",
    ],
    mistakes: [
      "Forgetting the League's failure over Manchuria",
      "Not linking the oil embargo to Pearl Harbor",
      "Mixing up the Manchuria (1931) and China (1937) dates",
    ],
    oneSentence:
      "Japan's expansion for resources and empire, plus a US oil embargo, led to the attack on Pearl Harbor in 1941.",
    threeSentence:
      "The League failed to stop Japan seizing Manchuria in 1931. Japan invaded China in 1937 for empire and resources, worsening relations with the USA, which cut off oil. Rather than back down, Japan attacked Pearl Harbor in 1941, bringing the USA into the war.",
    fiveSentence:
      "In 1931 Japan seized Manchuria, and the League could only condemn it. Japan invaded China in 1937, aiming to build the Greater East Asia Co-Prosperity Sphere, and its war devoured resources such as oil. As Japan pushed south, relations with the USA collapsed and the USA cut off oil. Facing this embargo, Japan chose to seize resources by force, attacking Pearl Harbor in 1941 — a strike that brought the full weight of the USA into the war.",
    peel: {
      point: "The US oil embargo was the trigger for Pearl Harbor.",
      evidence: "The USA cut off oil to pressure Japan over its aggression in China.",
      explain: "This forced Japan to choose between abandoning its empire or seizing resources by force, and it chose war.",
      link: "So the embargo turned a slow-burning rivalry into the attack that brought the USA into the war.",
    },
  },
  "end-of-ww2": {
    simpler:
      "The Allies won because of overwhelming strengths — US resources and manpower, the huge Soviet effort, and strategies like D-Day, island hopping and the atomic bomb. The Axis lost partly through their own weaknesses: Germany's two-front war and poor command, Japan's overextended empire.",
    eli10:
      "One team had way more players and supplies and smarter plans; the other spread itself too thin and made big mistakes. The result wasn't close.",
    analogy:
      "The Axis were two boxers who punched themselves out and fought on too many fronts; the Allies were fresh, better-fed and better-organised.",
    matters:
      "It explains why the war ended — and sets up the two superpowers who would dominate the Cold War.",
    memorise: [
      "Allied strengths: US resources/manpower, Soviet role, D-Day, island hopping, atomic bomb",
      "German weakness: ineffective command, war on two fronts",
      "Japanese weakness: overextension, can't ship raw materials home",
    ],
    mistakes: [
      "Naming only one cause of victory",
      "Forgetting the Soviet contribution in the east",
      "Confusing 'strengths of the Allies' with 'weaknesses of the Axis'",
    ],
    oneSentence:
      "The Allies won through overwhelming resources and strategy, helped by serious Axis weaknesses.",
    threeSentence:
      "The Allies had overwhelming strengths: American resources and manpower, the Soviet war effort, and strategies like D-Day, island hopping and the atomic bomb. The Axis had crippling weaknesses — Germany's two-front war and poor command, Japan's overextended empire. Together these brought victory in 1945.",
    fiveSentence:
      "When the USA entered the war it brought vast economic resources and manpower, out-producing the Axis. In the east the Soviet Union destroyed huge German forces. The Allies used war-winning strategies: D-Day opened a second front, island hopping closed in on Japan, and the atomic bomb ended the war. Germany was weakened by an ineffective command structure and a self-inflicted war on two fronts. Japan was overextended, unable to ship raw materials home — so both Axis powers were ground down to defeat by 1945.",
    peel: {
      point: "Allied strengths were the decisive factor in victory.",
      evidence: "US industry and manpower and the Soviet army overwhelmed the Axis, backed by strategies like D-Day and the atomic bomb.",
      explain: "These advantages were made even more effective by Axis weaknesses such as Germany's two-front war and Japan's overextension.",
      link: "So Allied strengths won the war, magnified by the enemy's own mistakes.",
    },
  },
  "cold-war-origins": {
    simpler:
      "The USA and USSR emerged as superpowers with opposite systems and grew to distrust each other over Eastern Europe (the 'Iron Curtain'). The USA used containment (Truman Doctrine, Marshall Plan); the USSR responded with the Berlin Blockade and its own bloc, and Europe split into NATO and the Warsaw Pact.",
    eli10:
      "Two friends who beat a bully together fell out because they believed in totally opposite rules — and each tried to get everyone on their side.",
    analogy:
      "Two chess players who never capture a piece — just threaten, block and build up, each afraid of the other's next move.",
    matters:
      "These origins set up every later Cold War crisis, from Korea to the fall of the USSR.",
    memorise: [
      "USA = capitalism/democracy; USSR = communism",
      "Yalta & Potsdam (1945) → mistrust; Iron Curtain (1946)",
      "Containment = Truman Doctrine + Marshall Plan (1947)",
      "Soviet response: Berlin Blockade (1948); NATO 1949 vs Warsaw Pact 1955",
    ],
    mistakes: [
      "Treating it as a 'hot' war — it was rivalry, not direct fighting",
      "Ignoring Stalin's fear of invasion (buffer, not only expansion)",
      "Confusing the Truman Doctrine (support) with the Marshall Plan (money)",
    ],
    oneSentence:
      "Opposing beliefs and the division of Europe turned the USA and USSR into Cold War rivals of containment and response.",
    threeSentence:
      "The USA and USSR emerged as superpowers with opposing systems and clashed over Eastern Europe, the 'Iron Curtain'. The USA adopted containment through the Truman Doctrine and Marshall Plan. The USSR responded with the Berlin Blockade, and Europe split into NATO and the Warsaw Pact.",
    fiveSentence:
      "The war left the USA and USSR as rival superpowers believing in opposite systems — capitalism and democracy versus communism. At Yalta and Potsdam their alliance broke down over Eastern Europe, where Stalin installed communist governments behind what Churchill called an 'Iron Curtain'. The USA answered with containment: the Truman Doctrine promised support against communism, and the Marshall Plan rebuilt Western Europe. Stalin struck back with the Berlin Blockade, defeated by the Berlin Airlift. Europe hardened into two armed camps — NATO and the Warsaw Pact.",
    peel: {
      point: "Ideological differences were a key cause of the Cold War.",
      evidence: "The USA backed capitalism and democracy while the USSR was communist, and each feared the other's spread.",
      explain: "This distrust shaped the clash over Eastern Europe and drove US containment and the Soviet response.",
      link: "So former allies became rivals, and the Cold War began.",
    },
  },
  "korean-war": {
    simpler:
      "Korea was split at the 38th parallel (communist North, capitalist South). With China now communist, the North invaded in 1950. The USA led a UN force (containment); China intervened. The 1953 armistice left Korea divided, with a DMZ and sharper NATO–Warsaw tension.",
    eli10:
      "Two halves of one country, one charges across the line, the other's big friend (the USA/UN) jumps in, then the neighbour (China) joins — and it ends right back at the line.",
    analogy:
      "A tug-of-war over a line: the North pulled, the UN pulled back, China pulled again — and the rope ended up where it started.",
    matters:
      "It's the first time the Cold War became a real war, showing containment and the domino theory in action.",
    memorise: [
      "Korea partitioned at the 38th parallel (1945)",
      "Communist China (1949) + Sino-Soviet alliance",
      "1950 North invades → UN force led by USA → China enters",
      "1953 armistice; DMZ; NATO–Warsaw tension rises",
    ],
    mistakes: [
      "Saying a side 'won' — it ended in stalemate",
      "Forgetting the UN and China's roles",
      "Confusing armistice (ceasefire) with a peace treaty",
    ],
    oneSentence:
      "The Korean War (1950–53) was the Cold War's first 'hot' conflict, ending in a stalemate that left Korea divided.",
    threeSentence:
      "Korea was divided at the 38th parallel, and the rise of communist China raised the stakes. When the North invaded in 1950, the USA led a UN force to contain communism, and China intervened. A 1953 armistice left Korea divided with a demilitarised zone.",
    fiveSentence:
      "After the war Korea was partitioned at the 38th parallel into a communist North and a capitalist South. In 1949 China too became communist, allied to the USSR, and America feared communism was spreading. When the North invaded the South in 1950, the USA led a United Nations force to defend it — containment in action — pushing towards China's border. China then sent huge numbers of troops, driving the UN back to a stalemate. The 1953 armistice left Korea divided by a demilitarised zone and sharpened tension between NATO and the Warsaw Pact.",
    peel: {
      point: "The Korean War was a limited success for containment.",
      evidence: "The USA-led UN force stopped North Korea taking the South.",
      explain: "But the war ended in stalemate with Korea still divided and China strengthened, so communism was contained, not defeated.",
      link: "It held the line, but at great cost and without a clear victory.",
    },
  },
  "vietnam-war": {
    simpler:
      "Vietnam was split in 1954 (communist North under Ho Chi Minh, unstable South). The promised 1956 elections were never held, and Diem's harsh rule bred an insurgency backed by the North. Fearing the domino theory, the USA sent troops — but could not win, withdrew, and Vietnam reunified under communism in 1975.",
    eli10:
      "A divided country where the popular side was communist; the USA propped up the shaky other side, got stuck in a jungle war it couldn't win, and eventually left.",
    analogy:
      "The USA waded into quicksand: the harder it pushed, the deeper it sank — until it had to pull out.",
    matters:
      "It's the second Cold War case study, showing the limits of containment and the start of détente.",
    memorise: [
      "Vietnam partitioned 1954 (Geneva Accords)",
      "1956 elections never held; Diem unpopular; Northern-backed insurgency",
      "USA in for the domino theory; North backed by USSR & China",
      "US withdrawal → reunification 1975 → détente",
    ],
    mistakes: [
      "Forgetting the domino theory as the US motive",
      "Ignoring the South's instability and Diem's unpopularity",
      "Thinking the USA 'won' — it withdrew and the North united Vietnam",
    ],
    oneSentence:
      "Fearing the domino theory, the USA fought in Vietnam but could not win, withdrawing before the North reunified the country in 1975.",
    threeSentence:
      "Vietnam was partitioned in 1954, with an unstable South whose promised elections were never held. Fearing the domino theory, the USA backed the South against a Northern-supported insurgency. Unable to win, the USA withdrew, and Vietnam was reunified under communism in 1975.",
    fiveSentence:
      "The Geneva Accords partitioned Vietnam in 1954 into a communist North under Ho Chi Minh and a non-communist South. The elections promised for 1956 were never held, for fear the communists would win, and the South's leader Ngo Dinh Diem grew unpopular. The North backed a growing insurgency in the South, and — fearing the domino theory — the USA sent aid and then troops, while the North was supported by the USSR and China. The war proved unwinnable and hugely costly, so the USA withdrew. In 1975 the North's victory reunified Vietnam under communism, even as the superpowers began to ease tension in a period of détente.",
    peel: {
      point: "The domino theory drove US involvement in Vietnam.",
      evidence: "The USA feared that if South Vietnam fell to communism, its neighbours would follow.",
      explain: "This made containing communism in Vietnam seem essential, so the USA escalated its aid and sent troops.",
      link: "So a Cold War fear turned a local conflict into a major American war.",
    },
  },
  "end-of-cold-war": {
    simpler:
      "The Soviet command economy was inefficient and living standards lagged. Military spending, the cost of the bloc, and a renewed 1980s arms race crushed it. Gorbachev's glasnost and perestroika failed to revive the economy but let anger surface; the bloc collapsed, the Wall fell (1989) and the USSR broke up (1991).",
    eli10:
      "Imagine holding a heavy door shut for forty years while broke and exhausted — eventually you let go, and it swings open on its own.",
    analogy:
      "The USSR was a machine running on empty; Gorbachev's reforms simply took his foot off a pedal that had already run out of fuel.",
    matters:
      "It explains how a decades-long, dangerous standoff ended peacefully.",
    memorise: [
      "Command economy: inefficient, low living standards",
      "Burdens: military spending, holding the bloc/Warsaw Pact",
      "1980s: US re-intensified the arms race",
      "Gorbachev: glasnost + perestroika → bloc collapse, Wall falls 1989, USSR ends 1991",
    ],
    mistakes: [
      "Crediting only Gorbachev and ignoring deep economic weakness",
      "Saying the Cold War ended in a war — it ended peacefully",
      "Mixing up 1989 (Wall falls) and 1991 (USSR ends)",
    ],
    oneSentence:
      "Soviet economic weakness, unbearable burdens and Gorbachev's failed reforms brought the peaceful collapse of the USSR by 1991.",
    threeSentence:
      "The Soviet command economy was inefficient and could not compete, while military spending, the cost of the bloc and a renewed arms race drained it. Gorbachev's reforms failed to revive the economy but let people voice their anger. The communist bloc collapsed, the Berlin Wall fell in 1989, and the USSR disintegrated in 1991.",
    fiveSentence:
      "By the 1980s the Soviet command economy was rigid and inefficient, leaving living standards far behind the West. On top of this came crushing burdens: huge military spending and the cost of holding the communist bloc together. When the USA re-intensified the arms race, the strained Soviet economy could not keep up. Gorbachev tried to save the system with glasnost and perestroika, but the reforms failed to revive the economy while openness unleashed long-hidden anger. Confidence collapsed, the bloc broke free, the Berlin Wall fell in 1989, and in 1991 the Soviet Union itself disintegrated.",
    peel: {
      point: "Gorbachev was the trigger, but Soviet weakness was the deeper cause.",
      evidence: "His glasnost and perestroika and refusal to use force let the bloc collapse.",
      explain: "But he was responding to a failing command economy and crushing military and bloc costs that made change unavoidable.",
      link: "So Gorbachev was decisive, acting on long-term weaknesses already pushing the USSR towards collapse.",
    },
  },
};
