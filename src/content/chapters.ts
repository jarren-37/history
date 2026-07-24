import type { Chapter } from "./types";

/**
 * The storybook chapters. Content is authored to stay strictly within the
 * Singapore Cambridge SEAB O-Level Combined History (2261) syllabus, focusing
 * on understanding (cause → effect → consequence) rather than trivia.
 */
export const CHAPTERS: Chapter[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. THE TREATY OF VERSAILLES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ch-versailles",
    slug: "treaty-of-versailles",
    number: "1.1",
    section: "World War Two",
    title: "The Treaty of Versailles",
    subtitle: "How a peace treaty planted the seeds of war",
    inquiry: "How did the peace of 1919 help cause another war?",
    palette: "versailles",
    era: "1919–1920",
    hook: "The war was over. But the peace would prove far more dangerous than anyone imagined.",
    outcomes: [
      "Explain the main terms of the Treaty of Versailles",
      "Explain why Germans resented the Treaty",
      "Link the Treaty to the later rise of Hitler and the Second World War",
    ],
    characterIds: ["hitler", "chamberlain", "churchill"],
    timelineIds: ["versailles-signed", "league-formed"],
    pages: [
      {
        id: "v-1",
        kicker: "1919 · Paris",
        title: "A room full of anger",
        scene: "treaty-signing",
        narration: [
          "The First World War had ended. Millions were dead, and the victorious nations gathered at Paris to decide what to do with Germany.",
          "France had suffered terribly and wanted Germany punished so it could never threaten Europe again. Germany was not even allowed to help write the treaty — it was simply told to sign.",
        ],
        highlights: ["First World War", "punished", "sign"],
        dialogues: [
          {
            speaker: "France",
            side: "left",
            text: "Germany must pay for the destruction it caused. Make it weak.",
          },
          {
            speaker: "Germany",
            side: "right",
            text: "We were not even invited. This is a dictated peace.",
          },
        ],
      },
      {
        id: "v-2",
        kicker: "The terms",
        title: "Germany shrinks",
        scene: "shrinking-germany",
        narration: [
          "The Treaty took land away from Germany. Its overseas colonies were removed, and the Rhineland — the region bordering France — had to be kept free of German troops.",
          "Germany's army was cut to just 100,000 men, with no air force, no submarines and almost no navy. A once-mighty power was made deliberately weak.",
        ],
        highlights: ["land", "Rhineland", "100,000 men", "weak"],
      },
      {
        id: "v-3",
        kicker: "The terms",
        title: "The mountain of debt",
        scene: "reparations-coins",
        narration: [
          "Germany was ordered to pay reparations — huge payments for the damage of the war. The bill was enormous and would take generations to repay.",
          "Worst of all for German pride was the War Guilt Clause: Germany had to accept the blame for starting the entire war. To ordinary Germans, this felt like a deep humiliation.",
        ],
        highlights: ["reparations", "War Guilt Clause", "blame", "humiliation"],
        dialogues: [
          {
            speaker: "A German worker",
            side: "left",
            text: "How can one country pay for a whole war? And why must we alone take the blame?",
          },
        ],
      },
      {
        id: "v-4",
        kicker: "The consequence",
        title: "A wound that would not heal",
        scene: "angry-crowd",
        narration: [
          "Germans called the treaty a 'diktat' — a dictated peace — and a 'stab in the back'. Anger at Versailles spread through the country.",
          "This resentment did not fade. It became fuel. Years later, a politician named Adolf Hitler would promise to tear the Treaty up — and millions of angry Germans would listen.",
        ],
        highlights: ["diktat", "resentment", "Adolf Hitler", "tear the Treaty up"],
        choice: {
          question: "If you were a German voter in the 1920s, how might you feel about the Treaty?",
          options: [
            {
              label: "Accept it — the war was lost",
              outcome:
                "Some Germans accepted it, but many felt the terms were far harsher than a lost war deserved.",
            },
            {
              label: "Resent it deeply",
              outcome:
                "This was the common feeling. That resentment is exactly what extremist leaders would later exploit.",
              historical: true,
            },
            {
              label: "Ignore it",
              outcome:
                "Hard to ignore — reparations and lost land affected daily life and national pride directly.",
            },
          ],
          reality:
            "In reality, widespread anger at Versailles weakened Germany's new democracy and gave Hitler a ready-made grievance to campaign on. The Treaty meant to prevent war helped set the stage for the next one.",
        },
      },
    ],
    boosters: [
      {
        afterPage: 2,
        booster: {
          type: "match",
          prompt: "Match each term of the Treaty to what it did.",
          pairs: [
            { left: "Reparations", right: "Germany had to pay for war damage" },
            { left: "War Guilt Clause", right: "Germany accepted blame for the war" },
            { left: "Army limit", right: "German forces cut to 100,000 men" },
            { left: "Rhineland", right: "Kept free of German troops" },
          ],
        },
      },
      {
        afterPage: 3,
        booster: {
          type: "recall",
          prompt: "Quick check before the story continues.",
          question: "Why did the War Guilt Clause anger Germans so deeply?",
          answer:
            "It forced Germany alone to accept blame for the whole war, which felt like a national humiliation — and it justified the reparations payments.",
        },
      },
    ],
    bigPicture: {
      title: "The chain that led from peace to war",
      intro: "Follow how a single treaty rippled forward into another world war.",
      nodes: [
        {
          id: "n1",
          label: "Harsh treaty",
          icon: "📜",
          detail:
            "Versailles took German land, limited its army, demanded reparations and blamed Germany for the war.",
        },
        {
          id: "n2",
          label: "German resentment",
          icon: "😠",
          detail:
            "Germans saw the treaty as an unfair 'diktat' and a humiliation that damaged national pride.",
        },
        {
          id: "n3",
          label: "Weak democracy",
          icon: "🏛️",
          detail:
            "The new German government was blamed for accepting the treaty, making it unpopular and unstable.",
        },
        {
          id: "n4",
          label: "Hitler exploits anger",
          icon: "🕯️",
          detail:
            "Hitler promised to overturn Versailles and restore Germany's pride, winning mass support.",
        },
        {
          id: "n5",
          label: "Path to war",
          icon: "🔥",
          detail:
            "Once in power, Hitler dismantled the treaty and expanded German territory, leading to the Second World War.",
        },
      ],
    },
    exam: [
      {
        id: "v-exam-1",
        skill: "Inference",
        format: "SBQ",
        marks: 5,
        question:
          "What can you infer about German feelings towards the Treaty of Versailles? Explain your answer using the source and your knowledge.",
        source: {
          label: "A German cartoon, 1920 (paraphrased description)",
          text:
            "The cartoon shows Germany as a person crushed under an enormous weight labelled 'reparations', while figures representing the Allies look on.",
        },
        markScheme: [
          "L1: Copies or describes the source with no inference (1 mark).",
          "L2: A supported inference, e.g. Germans felt the treaty was unfairly harsh (2–3 marks).",
          "L3: A developed inference using source detail AND own knowledge, e.g. Germans felt crushed and humiliated by reparations and the War Guilt Clause (4–5 marks).",
        ],
        modelAnswer:
          "The source suggests that Germans felt the Treaty was crushing and unfair. The figure buckling under a huge 'reparations' weight implies that Germans saw the payments as an unbearable burden. This fits my knowledge that Germans resented the reparations and the War Guilt Clause, viewing the treaty as a humiliating 'diktat' forced on them.",
      },
      {
        id: "v-exam-2",
        skill: "Explain (SEQ)",
        format: "SEQ",
        marks: 8,
        question:
          "Explain why many Germans were angry about the Treaty of Versailles.",
        markScheme: [
          "Identify valid reasons (e.g. reparations, War Guilt Clause, loss of land, army limits).",
          "Explain HOW each reason caused anger, not just list it.",
          "L3 answers develop at least two reasons with clear links to German resentment.",
        ],
        modelAnswer:
          "Many Germans were angry because the Treaty forced them to accept sole blame for the war through the War Guilt Clause, which felt deeply humiliating. This anger was made worse by the reparations, huge payments that damaged the German economy and daily life. On top of this, Germany lost land and had its army cut to 100,000 men, leaving Germans feeling weak and treated unfairly — a resentment that later leaders would exploit.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. THE RISE OF HITLER & APPEASEMENT
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ch-hitler",
    slug: "rise-of-hitler",
    number: "1.2",
    section: "World War Two",
    title: "The Rise of Hitler & the Road to War",
    subtitle: "From anger and depression to invasion",
    inquiry: "Why did war break out in Europe in 1939?",
    palette: "hitler",
    era: "1929–1939",
    hook: "A struggling democracy, a global depression, and a leader who promised to make Germany great again.",
    outcomes: [
      "Explain how the Depression helped Hitler gain support",
      "Describe Hitler's actions that broke the Treaty of Versailles",
      "Explain the policy of appeasement and its consequences",
    ],
    characterIds: ["hitler", "chamberlain", "churchill"],
    timelineIds: ["hitler-power", "rhineland", "munich", "poland"],
    pages: [
      {
        id: "h-1",
        kicker: "1929 · The Depression",
        title: "The world runs out of money",
        scene: "empty-factory",
        narration: [
          "In 1929 a great economic depression spread across the world. In Germany, factories closed and millions lost their jobs.",
          "Desperate people wanted answers. The moderate government seemed powerless, and Germans began to look towards leaders who promised bold change.",
        ],
        highlights: ["depression", "jobs", "powerless", "bold change"],
      },
      {
        id: "h-2",
        kicker: "1933",
        title: "A promise to make Germany great",
        scene: "rising-leader",
        narration: [
          "Adolf Hitler and the Nazi Party promised to end unemployment, restore German pride, and tear up the hated Treaty of Versailles.",
          "To Germans humiliated by defeat and crushed by depression, this message was powerful. In 1933 Hitler became leader of Germany — and soon, its dictator.",
        ],
        highlights: ["Nazi Party", "restore German pride", "Treaty of Versailles", "dictator"],
        dialogues: [
          {
            speaker: "hitler",
            characterId: "hitler",
            side: "left",
            text: "Germany will rise again. The chains of Versailles will be broken.",
          },
        ],
      },
      {
        id: "h-3",
        kicker: "1936",
        title: "Testing the world",
        scene: "marching-troops",
        narration: [
          "Hitler began to break the Treaty step by step. He rebuilt the army and, in 1936, marched troops into the demilitarised Rhineland.",
          "Britain and France did nothing. Hitler learned a dangerous lesson: the great powers would not stop him.",
        ],
        highlights: ["break the Treaty", "Rhineland", "did nothing"],
      },
      {
        id: "h-4",
        kicker: "1938 · Munich",
        title: "'Peace for our time'",
        scene: "handshake",
        narration: [
          "Rather than risk war, Britain and France followed appeasement — giving Hitler some of what he demanded, hoping he would be satisfied.",
          "At Munich in 1938 they let Germany take the Sudetenland. Prime Minister Chamberlain returned promising 'peace for our time'. But Hitler was not finished.",
        ],
        highlights: ["appeasement", "Munich", "Sudetenland", "peace for our time"],
        dialogues: [
          {
            speaker: "chamberlain",
            characterId: "chamberlain",
            side: "left",
            text: "I believe this means peace for our time.",
          },
          {
            speaker: "churchill",
            characterId: "churchill",
            side: "right",
            text: "You were given the choice between war and dishonour. You chose dishonour, and you will have war.",
          },
        ],
      },
      {
        id: "h-5",
        kicker: "1939",
        title: "The line is crossed",
        scene: "marching-troops",
        narration: [
          "In September 1939 Hitler invaded Poland. This time, Britain and France had promised to defend it.",
          "Appeasement had failed. Two days later they declared war on Germany. The Second World War in Europe had begun.",
        ],
        highlights: ["invaded Poland", "Appeasement had failed", "declared war", "Second World War"],
        choice: {
          question: "It is 1938. You are Britain. Hitler demands the Sudetenland. What do you do?",
          options: [
            {
              label: "Appease — give in to avoid war",
              outcome:
                "This is what Britain chose. It bought time but encouraged Hitler to demand more.",
              historical: true,
            },
            {
              label: "Fight now",
              outcome:
                "Britain's forces were not ready, and the public feared another war — which is partly why appeasement was chosen.",
            },
            {
              label: "Negotiate a firm limit",
              outcome:
                "Attempted at Munich, but Hitler had no intention of stopping at the Sudetenland.",
            },
          ],
          reality:
            "Britain and France appeased Hitler at Munich, hoping to satisfy him. Instead it convinced him they were weak. Within a year he invaded Poland and war broke out. Appeasement remains a debated lesson: was it a sensible attempt to avoid war, or a mistake that made war more likely?",
        },
      },
    ],
    boosters: [
      {
        afterPage: 1,
        booster: {
          type: "fill",
          prompt: "Complete the sentence.",
          sentence:
            "The {{blank}} of 1929 caused mass {{blank}} in Germany, which helped {{blank}} win support.",
          answers: ["Depression", "unemployment", "Hitler"],
          bank: ["Depression", "unemployment", "Hitler", "Churchill", "peace", "reparations"],
        },
      },
      {
        afterPage: 4,
        booster: {
          type: "order",
          prompt: "Drag Hitler's steps to war into the correct order.",
          items: [
            "Hitler comes to power (1933)",
            "Rhineland remilitarised (1936)",
            "Munich Agreement / Sudetenland (1938)",
            "Invasion of Poland (1939)",
          ],
        },
      },
    ],
    bigPicture: {
      title: "From depression to world war",
      intro: "Each link made the next one possible.",
      nodes: [
        {
          id: "n1",
          label: "Great Depression",
          icon: "📉",
          detail: "Mass unemployment made Germans desperate for strong leadership.",
        },
        {
          id: "n2",
          label: "Hitler gains support",
          icon: "🕯️",
          detail:
            "He promised jobs, pride and an end to Versailles, winning power in 1933.",
        },
        {
          id: "n3",
          label: "Breaking Versailles",
          icon: "🪖",
          detail:
            "Rearmament and the Rhineland showed the great powers would not act.",
        },
        {
          id: "n4",
          label: "Appeasement",
          icon: "🤝",
          detail:
            "Britain and France gave in at Munich, encouraging further demands.",
        },
        {
          id: "n5",
          label: "War in Europe",
          icon: "🔥",
          detail:
            "The invasion of Poland in 1939 finally triggered the Second World War.",
        },
      ],
    },
    exam: [
      {
        id: "h-exam-1",
        skill: "Explain (SEQ)",
        format: "SEQ",
        marks: 8,
        question: "Explain why Hitler was able to come to power in Germany by 1933.",
        markScheme: [
          "Valid reasons: the Depression, resentment at Versailles, weak government, Nazi promises.",
          "Each reason must be explained, showing HOW it helped Hitler.",
          "L3: at least two developed reasons with clear links.",
        ],
        modelAnswer:
          "Hitler came to power partly because of the Great Depression, which caused mass unemployment and left Germans desperate for a strong leader who promised jobs. This was made worse by lasting resentment at the Treaty of Versailles, which Hitler promised to overturn, appealing to wounded national pride. The weakness of the existing government, which seemed unable to solve the crisis, meant many Germans turned to the Nazis as a bold alternative.",
      },
      {
        id: "h-exam-2",
        skill: "Judgement (SEQ)",
        format: "SEQ",
        marks: 12,
        question:
          "'Appeasement was the main reason war broke out in 1939.' How far do you agree?",
        markScheme: [
          "Argue FOR: appeasement encouraged Hitler, gave him land and time, showed weakness.",
          "Argue AGAINST: Hitler's own aims/actions, the failure to stop rearmament, Versailles resentment.",
          "L4/L5: a balanced judgement that weighs the factors and reaches a supported conclusion.",
        ],
        modelAnswer:
          "Appeasement contributed to war because giving in at Munich convinced Hitler the great powers were weak, encouraging him to invade Poland. However, appeasement was not the main cause. The deeper cause was Hitler's own determination to overturn Versailles and expand German territory — appeasement gave him opportunities, but his aims created the danger. On balance, appeasement made war more likely, but Hitler's ambitions were the fundamental reason war broke out in 1939.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. JAPAN'S ROAD TO WAR
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ch-japan",
    slug: "japans-road-to-war",
    number: "1.3",
    section: "World War Two",
    title: "Japan's Road to War",
    subtitle: "How the war spread to the Asia-Pacific",
    inquiry: "Why did war break out in the Asia-Pacific?",
    palette: "japan",
    era: "1931–1941",
    hook: "An island nation, hungry for resources, reaches out across Asia — and towards a collision with the USA.",
    outcomes: [
      "Explain why Japan followed a policy of expansion",
      "Describe Japan's invasions of Manchuria and China",
      "Explain why Japan attacked Pearl Harbor",
    ],
    characterIds: ["hirohito-era"],
    timelineIds: ["manchuria", "china-war", "pearl-harbor"],
    pages: [
      {
        id: "j-1",
        kicker: "1930s · Japan",
        title: "A nation in need",
        scene: "rising-sun",
        narration: [
          "Japan was a rising power but a small, crowded island with few natural resources of its own. It depended on imports of raw materials to keep its industries running.",
          "The Great Depression hit Japan hard. Military leaders argued that the answer was to build an empire — to seize the land and resources Japan lacked.",
        ],
        highlights: ["few natural resources", "Depression", "empire", "resources"],
      },
      {
        id: "j-2",
        kicker: "1931",
        title: "The first grab: Manchuria",
        scene: "island-map",
        narration: [
          "In 1931 Japan invaded Manchuria in northern China, which was rich in coal, iron and farmland.",
          "The League of Nations condemned the invasion, but it had no army and could not force Japan out. Japan simply left the League and kept its conquest.",
        ],
        highlights: ["Manchuria", "League of Nations", "no army", "left the League"],
      },
      {
        id: "j-3",
        kicker: "1937",
        title: "War with China",
        scene: "marching-troops",
        narration: [
          "Encouraged by success, Japan launched a full invasion of China in 1937. The war was brutal and dragged on for years.",
          "The fighting demanded ever more oil and steel — and much of Japan's oil came from the United States, which was growing alarmed by Japanese aggression.",
        ],
        highlights: ["invasion of China", "oil", "United States", "aggression"],
      },
      {
        id: "j-4",
        kicker: "1941 · Pearl Harbor",
        title: "The road to Pearl Harbor",
        scene: "rising-sun",
        narration: [
          "To pressure Japan, the USA cut off vital supplies, including oil. Japan now faced a choice: back down, or seize the resources of Southeast Asia by force.",
          "Japan chose war. In December 1941 it launched a surprise attack on the US fleet at Pearl Harbor, hoping to cripple American power — instead, it brought the USA fully into the Second World War.",
        ],
        highlights: ["cut off vital supplies", "oil", "Pearl Harbor", "brought the USA"],
        choice: {
          question: "You are Japan in 1941. The USA has cut off your oil. What now?",
          options: [
            {
              label: "Back down and withdraw from China",
              outcome:
                "Military leaders saw this as unacceptable — it would waste years of conquest and damage national pride.",
            },
            {
              label: "Seize resources by force",
              outcome:
                "Japan chose this path, attacking to grab the oil and materials of Southeast Asia.",
              historical: true,
            },
          ],
          reality:
            "Facing an oil embargo, Japan's leaders decided to strike. The attack on Pearl Harbor was meant to disable the US Pacific fleet, but it united American opinion and brought the full weight of the USA into the war — a decision that ultimately doomed Japan's empire.",
        },
      },
    ],
    boosters: [
      {
        afterPage: 2,
        booster: {
          type: "recall",
          prompt: "Check your understanding.",
          question: "Why did the League of Nations fail to stop Japan in Manchuria?",
          answer:
            "The League had no army of its own, so although it condemned the invasion it could not force Japan out. Japan simply ignored it and left the League.",
        },
      },
      {
        afterPage: 3,
        booster: {
          type: "order",
          prompt: "Put Japan's road to war in order.",
          items: [
            "Depression pushes Japan to expand",
            "Invasion of Manchuria (1931)",
            "Full invasion of China (1937)",
            "USA cuts off oil",
            "Attack on Pearl Harbor (1941)",
          ],
        },
      },
    ],
    bigPicture: {
      title: "Why war came to the Asia-Pacific",
      nodes: [
        {
          id: "n1",
          label: "Few resources + Depression",
          icon: "📉",
          detail:
            "Japan lacked raw materials and was hit hard by the Depression, pushing leaders towards expansion.",
        },
        {
          id: "n2",
          label: "Expansion into Manchuria & China",
          icon: "🗾",
          detail:
            "Japan seized Manchuria (1931) and invaded China (1937) to gain land and resources.",
        },
        {
          id: "n3",
          label: "Clash with the USA",
          icon: "⚠️",
          detail:
            "Japanese aggression alarmed the USA, which cut off oil and other supplies.",
        },
        {
          id: "n4",
          label: "Pearl Harbor",
          icon: "🌅",
          detail:
            "Rather than back down, Japan attacked Pearl Harbor, bringing the USA into the war.",
        },
      ],
    },
    exam: [
      {
        id: "j-exam-1",
        skill: "Explain (SEQ)",
        format: "SEQ",
        marks: 8,
        question: "Explain why Japan followed a policy of expansion in the 1930s.",
        markScheme: [
          "Valid reasons: lack of resources, effects of the Depression, desire for empire/prestige.",
          "Explain HOW each reason drove expansion.",
          "L3: two developed reasons with clear links.",
        ],
        modelAnswer:
          "Japan expanded largely because it lacked natural resources and needed raw materials for its industries; seizing territory like Manchuria promised coal, iron and farmland. This need was made urgent by the Great Depression, which damaged Japan's economy and strengthened military leaders who argued that empire was the solution. Expansion also offered Japan greater power and prestige as a leading nation in Asia.",
      },
      {
        id: "j-exam-2",
        skill: "Purpose",
        format: "SBQ",
        marks: 6,
        question:
          "Why was this source published? Explain your answer using the source and your knowledge.",
        source: {
          label: "A US government poster after Pearl Harbor (paraphrased description)",
          text:
            "The poster shows the attack on Pearl Harbor and urges Americans to unite and support the war effort.",
        },
        markScheme: [
          "L1: describes the source only.",
          "L2: identifies a purpose (e.g. to gain support) with some support.",
          "L3: explains the purpose using source detail AND context (Pearl Harbor bringing the USA into the war).",
        ],
        modelAnswer:
          "The purpose of the source was to rally Americans behind the war effort after Pearl Harbor. By showing the attack, it aimed to provoke anger and unite the public. This fits the context: the surprise attack in December 1941 shocked the USA and brought it fully into the war, so the government needed to build strong public support for fighting Japan.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. ORIGINS OF THE COLD WAR
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ch-coldwar",
    slug: "origins-of-the-cold-war",
    number: "2.1",
    section: "The Cold War",
    title: "Origins of the Cold War",
    subtitle: "How wartime allies became rivals",
    inquiry: "Why did the USA and USSR become enemies after 1945?",
    palette: "coldwar",
    era: "1945–1949",
    hook: "They defeated Hitler together. Then the two most powerful nations on earth turned on each other.",
    outcomes: [
      "Explain the ideological differences between the USA and USSR",
      "Explain how wartime conferences increased tension",
      "Describe the Truman Doctrine and Marshall Plan as containment",
    ],
    characterIds: ["stalin", "truman", "roosevelt", "churchill"],
    timelineIds: ["yalta", "potsdam", "iron-curtain", "truman-doctrine"],
    pages: [
      {
        id: "c-1",
        kicker: "1945",
        title: "Two very different dreams",
        scene: "iron-curtain",
        narration: [
          "The USA and the Soviet Union had been allies against Hitler. But they believed in opposite ways of running the world.",
          "The USA believed in capitalism and democracy — free elections and free business. The USSR believed in communism — a one-party state and government control of the economy. Each feared the other would try to spread its system.",
        ],
        highlights: ["capitalism", "democracy", "communism", "spread"],
        dialogues: [
          {
            speaker: "truman",
            characterId: "truman",
            side: "left",
            text: "Free peoples must be free to choose their own governments.",
          },
          {
            speaker: "stalin",
            characterId: "stalin",
            side: "right",
            text: "The Soviet Union must be safe. We will never be invaded again.",
          },
        ],
      },
      {
        id: "c-2",
        kicker: "1945 · Yalta & Potsdam",
        title: "The cracks appear",
        scene: "handshake",
        narration: [
          "At the Yalta and Potsdam conferences, the Allies tried to plan the post-war world. But their agreement was already breaking down.",
          "The biggest disagreement was over Eastern Europe. Stalin wanted friendly communist governments as a buffer to protect the USSR. The West saw this as the Soviet Union taking over free countries by force.",
        ],
        highlights: ["Yalta", "Potsdam", "Eastern Europe", "buffer"],
      },
      {
        id: "c-3",
        kicker: "1946",
        title: "An iron curtain falls",
        scene: "divided-line",
        narration: [
          "Across Eastern Europe, Soviet-backed communist governments took power. Europe was splitting into two camps.",
          "In 1946 Churchill warned that an 'Iron Curtain' had descended across the continent, dividing the free West from the communist East. Suspicion was hardening into hostility.",
        ],
        highlights: ["communist governments", "two camps", "Iron Curtain", "hostility"],
        dialogues: [
          {
            speaker: "churchill",
            characterId: "churchill",
            side: "left",
            text: "From the Baltic to the Adriatic, an iron curtain has descended across the continent.",
          },
        ],
      },
      {
        id: "c-4",
        kicker: "1947",
        title: "America draws a line",
        scene: "money-flow",
        narration: [
          "The USA decided it must stop communism from spreading any further — a policy called containment.",
          "President Truman promised support to countries resisting communism (the Truman Doctrine), and the Marshall Plan sent billions of dollars to rebuild Western Europe — because prosperous countries were less likely to turn communist.",
        ],
        highlights: ["containment", "Truman Doctrine", "Marshall Plan", "rebuild"],
        choice: {
          question: "You are the USA in 1947. Western Europe is poor and unstable. What do you do?",
          options: [
            {
              label: "Send massive economic aid",
              outcome:
                "This was the Marshall Plan — rebuilding Europe to make communism less appealing.",
              historical: true,
            },
            {
              label: "Stay out of Europe",
              outcome:
                "The USA feared that poverty would let communism spread, so it chose to get involved.",
            },
            {
              label: "Threaten the USSR militarily",
              outcome:
                "Too dangerous so soon after the war; economic containment was preferred first.",
            },
          ],
          reality:
            "The USA chose containment. The Marshall Plan rebuilt Western Europe and tied it to the USA, while the Truman Doctrine pledged support against communism. Stalin saw these as attempts to undermine Soviet influence — deepening the divide and pushing the two sides further into a Cold War.",
        },
      },
    ],
    boosters: [
      {
        afterPage: 0,
        booster: {
          type: "match",
          prompt: "Match each superpower to its beliefs.",
          pairs: [
            { left: "USA", right: "Capitalism and democracy" },
            { left: "USSR", right: "Communism and a one-party state" },
            { left: "USA's fear", right: "Communism will spread" },
            { left: "USSR's fear", right: "Being invaded again" },
          ],
        },
      },
      {
        afterPage: 3,
        booster: {
          type: "fill",
          prompt: "Complete the definition of the US policy.",
          sentence:
            "The USA's policy of {{blank}} aimed to stop the spread of {{blank}}. The {{blank}} sent money to rebuild Western Europe.",
          answers: ["containment", "communism", "Marshall Plan"],
          bank: [
            "containment",
            "communism",
            "Marshall Plan",
            "appeasement",
            "capitalism",
            "Iron Curtain",
          ],
        },
      },
    ],
    bigPicture: {
      title: "How allies became enemies",
      nodes: [
        {
          id: "n1",
          label: "Opposing beliefs",
          icon: "⚖️",
          detail:
            "Capitalism/democracy vs communism — each side distrusted the other's system.",
        },
        {
          id: "n2",
          label: "Tension at conferences",
          icon: "❄️",
          detail:
            "Yalta and Potsdam revealed deep disagreement, especially over Eastern Europe.",
        },
        {
          id: "n3",
          label: "Soviet control of the East",
          icon: "🧱",
          detail:
            "Communist governments across Eastern Europe alarmed the West — the 'Iron Curtain'.",
        },
        {
          id: "n4",
          label: "US containment",
          icon: "💵",
          detail:
            "The Truman Doctrine and Marshall Plan committed the USA to resisting communism.",
        },
        {
          id: "n5",
          label: "A divided world",
          icon: "🌍",
          detail: "Europe split into two hostile camps — the Cold War had begun.",
        },
      ],
    },
    exam: [
      {
        id: "c-exam-1",
        skill: "Explain (SEQ)",
        format: "SEQ",
        marks: 8,
        question: "Explain why the USA and the USSR became rivals after 1945.",
        markScheme: [
          "Valid reasons: ideological differences, disagreement over Eastern Europe, mutual suspicion.",
          "Explain HOW each reason caused rivalry.",
          "L3: two developed reasons with clear links.",
        ],
        modelAnswer:
          "The USA and USSR became rivals mainly because of their opposing beliefs: the USA supported capitalism and democracy while the USSR was communist, and each feared the other would spread its system. This was deepened by disagreement over Eastern Europe, where Stalin set up communist governments that the West saw as aggression but Stalin saw as protection. Growing suspicion on both sides turned wartime allies into Cold War enemies.",
      },
      {
        id: "c-exam-2",
        skill: "Reliability",
        format: "SBQ",
        marks: 7,
        question:
          "How reliable is this source as evidence of Soviet aims after the war? Explain using the source and your knowledge.",
        source: {
          label: "A US newspaper editorial, 1947 (paraphrased description)",
          text:
            "The editorial warns that the Soviet Union is determined to spread communism across the whole of Europe and must be stopped.",
        },
        markScheme: [
          "Consider content: does it match known Soviet actions in Eastern Europe?",
          "Consider provenance/purpose: a US source during rising tension may be one-sided.",
          "L3: a balanced judgement weighing usefulness against possible bias.",
        ],
        modelAnswer:
          "The source is partly reliable. Its claim that the USSR was expanding fits real events, since Stalin did install communist governments across Eastern Europe. However, as a US editorial written during rising Cold War tension, it is likely one-sided — it presents Soviet aims as pure aggression and ignores Stalin's fear of invasion and desire for a buffer. It is therefore useful for showing Western attitudes, but not a balanced account of Soviet aims.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. THE BERLIN BLOCKADE & AIRLIFT
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ch-berlin",
    slug: "berlin-blockade",
    number: "2.2",
    section: "The Cold War",
    title: "The Berlin Blockade & Airlift",
    subtitle: "The Cold War's first great crisis",
    inquiry: "How did Berlin become the front line of the Cold War?",
    palette: "berlin",
    era: "1948–1949",
    hook: "One city, cut off and surrounded — and a rescue that flew in from the sky.",
    outcomes: [
      "Explain why Germany and Berlin were divided",
      "Explain the causes and events of the Berlin Blockade",
      "Explain the significance of the Airlift and the formation of NATO",
    ],
    characterIds: ["stalin", "truman"],
    timelineIds: ["berlin-blockade", "nato"],
    pages: [
      {
        id: "b-1",
        kicker: "After 1945",
        title: "A city split in four",
        scene: "divided-line",
        narration: [
          "After the war, Germany was divided into zones controlled by the USA, Britain, France and the USSR. Its capital, Berlin, was also split — even though it lay deep inside the Soviet zone.",
          "This left West Berlin as an island of the democratic West, surrounded entirely by communist East Germany.",
        ],
        highlights: ["divided into zones", "Berlin", "West Berlin", "surrounded"],
      },
      {
        id: "b-2",
        kicker: "1948",
        title: "The city is cut off",
        scene: "divided-line",
        narration: [
          "In 1948 the Western powers began to rebuild their zones and introduced a new currency, strengthening West Germany.",
          "Stalin was alarmed. To force the West out of Berlin, he blockaded the city — closing all road, rail and canal routes into West Berlin. Over two million people were cut off from food and fuel.",
        ],
        highlights: ["new currency", "blockaded", "road, rail and canal", "cut off"],
        dialogues: [
          {
            speaker: "stalin",
            characterId: "stalin",
            side: "right",
            text: "If the West cannot supply Berlin, they will have to leave it to us.",
          },
        ],
      },
      {
        id: "b-3",
        kicker: "1948–49",
        title: "Rescue from the sky",
        scene: "berlin-airlift",
        narration: [
          "The West refused to abandon Berlin — but fighting through the blockade risked war. Instead, they chose to supply the city entirely by air.",
          "For almost a year, planes landed day and night carrying food, coal and supplies. At its peak a plane touched down every few minutes. The Berlin Airlift kept the city alive.",
        ],
        highlights: ["supply the city entirely by air", "day and night", "Berlin Airlift", "alive"],
      },
      {
        id: "b-4",
        kicker: "1949",
        title: "A divided Germany, a divided world",
        scene: "iron-curtain",
        narration: [
          "After almost a year, Stalin admitted defeat and lifted the blockade. The West had won a great propaganda victory without firing a shot.",
          "But the crisis hardened the divide. Germany split permanently into West and East, and the Western powers formed a military alliance, NATO, to defend against the Soviet threat.",
        ],
        highlights: ["lifted the blockade", "propaganda victory", "West and East", "NATO"],
        choice: {
          question: "You are the West in 1948. Berlin is blockaded. What do you do?",
          options: [
            {
              label: "Supply Berlin by air",
              outcome:
                "This was the Airlift — a peaceful solution that kept the city alive and won global sympathy.",
              historical: true,
            },
            {
              label: "Force through the blockade",
              outcome:
                "This risked direct war with the USSR, which both sides wanted to avoid.",
            },
            {
              label: "Abandon West Berlin",
              outcome:
                "This would hand Stalin a huge victory and shake Western allies' confidence.",
            },
          ],
          reality:
            "The West chose the Airlift, supplying two million people by air for nearly a year. It avoided war, kept Berlin free, and embarrassed Stalin, who eventually lifted the blockade. The crisis confirmed the division of Germany and led directly to the formation of NATO.",
        },
      },
    ],
    boosters: [
      {
        afterPage: 1,
        booster: {
          type: "recall",
          prompt: "Check your understanding.",
          question: "Why was West Berlin in such a vulnerable position?",
          answer:
            "West Berlin was controlled by the Western powers, but it lay deep inside the Soviet zone of Germany — an island of the West completely surrounded by communist East Germany.",
        },
      },
      {
        afterPage: 3,
        booster: {
          type: "order",
          prompt: "Order the events of the Berlin crisis.",
          items: [
            "Germany and Berlin divided into zones",
            "West introduces a new currency",
            "Stalin blockades West Berlin (1948)",
            "The Berlin Airlift supplies the city",
            "Blockade lifted; NATO formed (1949)",
          ],
        },
      },
    ],
    bigPicture: {
      title: "Why Berlin mattered",
      nodes: [
        {
          id: "n1",
          label: "Divided Germany",
          icon: "🧱",
          detail: "Germany and Berlin were split between the West and the USSR.",
        },
        {
          id: "n2",
          label: "Western revival",
          icon: "💵",
          detail: "Rebuilding and a new currency alarmed Stalin.",
        },
        {
          id: "n3",
          label: "Blockade",
          icon: "🚧",
          detail: "Stalin cut off West Berlin to force the West out.",
        },
        {
          id: "n4",
          label: "Airlift",
          icon: "✈️",
          detail: "The West supplied the city by air, avoiding war and winning sympathy.",
        },
        {
          id: "n5",
          label: "NATO & permanent divide",
          icon: "🛡️",
          detail:
            "Germany split for decades and the West formed NATO to defend itself.",
        },
      ],
    },
    exam: [
      {
        id: "b-exam-1",
        skill: "Explain (SEQ)",
        format: "SEQ",
        marks: 8,
        question: "Explain why Stalin blockaded Berlin in 1948.",
        markScheme: [
          "Valid reasons: fear of a strong West Germany, the new currency, wanting the West out of Berlin.",
          "Explain HOW each reason led to the blockade.",
          "L3: two developed reasons with links.",
        ],
        modelAnswer:
          "Stalin blockaded Berlin mainly because he was alarmed by the West rebuilding its zones and introducing a new currency, which suggested a strong, capitalist West Germany was forming on the USSR's doorstep. He also wanted to force the Western powers out of West Berlin, which sat deep inside the Soviet zone and acted as an embarrassing island of Western influence. By cutting off supplies, Stalin hoped to pressure the West into abandoning the city.",
      },
      {
        id: "b-exam-2",
        skill: "Judgement (SEQ)",
        format: "SEQ",
        marks: 12,
        question:
          "'The Berlin Airlift was a success for the West.' How far do you agree?",
        markScheme: [
          "FOR: kept Berlin free, avoided war, propaganda victory, led to NATO.",
          "AGAINST: Germany split permanently, tension increased, Cold War deepened.",
          "L4/L5: balanced judgement with a supported conclusion.",
        ],
        modelAnswer:
          "The Airlift was largely a success for the West. It kept West Berlin free without firing a shot, forced Stalin to lift the blockade, and won a major propaganda victory by showing Western determination. However, it also deepened the Cold War: Germany was now permanently divided, tension increased, and the crisis led to the formation of NATO and a hardened East–West divide. On balance it was a success for the West in the short term, but it came at the cost of a more divided and dangerous Europe.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. THE CUBAN MISSILE CRISIS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ch-cuba",
    slug: "cuban-missile-crisis",
    number: "2.3",
    section: "The Cold War",
    title: "The Cuban Missile Crisis",
    subtitle: "Thirteen days on the edge of nuclear war",
    inquiry: "How close did the Cold War come to turning hot?",
    palette: "cuba",
    era: "1962",
    hook: "Ninety miles from America, Soviet missiles appear. The world holds its breath.",
    outcomes: [
      "Explain why the USSR placed missiles in Cuba",
      "Describe how the crisis unfolded and was resolved",
      "Explain the consequences of the crisis for the Cold War",
    ],
    characterIds: ["kennedy", "khrushchev", "castro"],
    timelineIds: ["cuba-crisis"],
    pages: [
      {
        id: "cu-1",
        kicker: "1959–1962 · Cuba",
        title: "A communist neighbour",
        scene: "island-map",
        narration: [
          "Cuba, an island just 90 miles from the USA, had become communist under Fidel Castro and allied itself with the Soviet Union.",
          "For the USA, having a communist state so close was alarming. For the USSR, Cuba was a valuable friend — and a perfect place to base missiles within range of America.",
        ],
        highlights: ["90 miles", "communist", "Castro", "missiles"],
      },
      {
        id: "cu-2",
        kicker: "October 1962",
        title: "The photographs",
        scene: "missiles-standoff",
        narration: [
          "In October 1962, American spy planes photographed Soviet nuclear missile sites being built in Cuba.",
          "These missiles could strike American cities within minutes. President Kennedy and his advisers faced a terrifying decision — how to respond without starting a nuclear war.",
        ],
        highlights: ["spy planes", "nuclear missile sites", "Kennedy", "nuclear war"],
        dialogues: [
          {
            speaker: "kennedy",
            characterId: "kennedy",
            side: "left",
            text: "These missiles cannot be allowed to stay. But one wrong move could end the world.",
          },
        ],
      },
      {
        id: "cu-3",
        kicker: "Thirteen days",
        title: "The standoff",
        scene: "missiles-standoff",
        narration: [
          "Kennedy ordered a naval 'quarantine' — a blockade to stop Soviet ships carrying more missiles from reaching Cuba.",
          "Soviet ships steamed towards the blockade. For thirteen days the world watched, fearing that any clash could trigger nuclear war. Then, at the last moment, the Soviet ships turned back.",
        ],
        highlights: ["quarantine", "blockade", "thirteen days", "turned back"],
      },
      {
        id: "cu-4",
        kicker: "Resolution",
        title: "Stepping back from the brink",
        scene: "handshake",
        narration: [
          "Behind the scenes, Kennedy and Khrushchev negotiated. Khrushchev agreed to remove the missiles from Cuba; in return, the USA promised not to invade Cuba and quietly removed some of its own missiles near the USSR.",
          "The world had come closer to nuclear war than ever before. Shaken, both sides took steps to reduce the danger — including a direct 'hotline' between their leaders.",
        ],
        highlights: ["negotiated", "remove the missiles", "not to invade", "hotline"],
        choice: {
          question: "You are Kennedy. Soviet missiles are in Cuba. What is your first move?",
          options: [
            {
              label: "Blockade Cuba and negotiate",
              outcome:
                "This is what Kennedy chose — firm but not an immediate act of war, leaving room to talk.",
              historical: true,
            },
            {
              label: "Invade Cuba immediately",
              outcome:
                "This risked killing Soviet troops and triggering all-out nuclear war.",
            },
            {
              label: "Do nothing",
              outcome:
                "Leaving missiles 90 miles away was politically and militarily unacceptable to the USA.",
            },
          ],
          reality:
            "Kennedy chose a naval blockade combined with secret negotiation. This applied pressure while avoiding an immediate attack, giving Khrushchev room to back down. Both leaders, frightened by how close they had come, then worked to ease tension — a turning point that made the Cold War slightly less dangerous.",
        },
      },
    ],
    boosters: [
      {
        afterPage: 1,
        booster: {
          type: "match",
          prompt: "Match each leader to their role in the crisis.",
          pairs: [
            { left: "Kennedy", right: "US President who ordered the blockade" },
            { left: "Khrushchev", right: "Soviet leader who placed the missiles" },
            { left: "Castro", right: "Communist leader of Cuba" },
          ],
        },
      },
      {
        afterPage: 3,
        booster: {
          type: "recall",
          prompt: "Check your understanding.",
          question: "How was the Cuban Missile Crisis finally resolved?",
          answer:
            "Through negotiation: Khrushchev agreed to remove the missiles from Cuba, and in return the USA promised not to invade Cuba and secretly removed some of its own missiles near the USSR.",
        },
      },
    ],
    bigPicture: {
      title: "Thirteen days that changed the Cold War",
      nodes: [
        {
          id: "n1",
          label: "Communist Cuba",
          icon: "🇨🇺",
          detail: "Cuba allied with the USSR, close to the USA.",
        },
        {
          id: "n2",
          label: "Soviet missiles",
          icon: "🚀",
          detail: "The USSR secretly placed nuclear missiles on Cuba.",
        },
        {
          id: "n3",
          label: "US blockade",
          icon: "🚢",
          detail: "Kennedy quarantined Cuba and demanded the missiles' removal.",
        },
        {
          id: "n4",
          label: "Negotiation",
          icon: "🤝",
          detail: "Both leaders stepped back and made a deal to avoid war.",
        },
        {
          id: "n5",
          label: "Reduced tension",
          icon: "☎️",
          detail:
            "The scare led to steps like the hotline to make future crises less dangerous.",
        },
      ],
    },
    exam: [
      {
        id: "cu-exam-1",
        skill: "Explain (SEQ)",
        format: "SEQ",
        marks: 8,
        question: "Explain why the USSR placed nuclear missiles in Cuba in 1962.",
        markScheme: [
          "Valid reasons: to protect communist Cuba, to match US missiles, to gain a strategic advantage.",
          "Explain HOW each reason motivated the USSR.",
          "L3: two developed reasons with links.",
        ],
        modelAnswer:
          "The USSR placed missiles in Cuba partly to protect its communist ally from a feared US invasion, giving Castro powerful protection. It also wanted to close the gap in nuclear power, since the USA had missiles based near the USSR; placing missiles in Cuba, just 90 miles from America, gave the Soviets a similar advantage. In this way Khrushchev hoped to strengthen the USSR's position in the Cold War.",
      },
      {
        id: "cu-exam-2",
        skill: "Comparison",
        format: "SBQ",
        marks: 7,
        question:
          "How similar are these two sources in their view of the crisis? Explain using the sources and your knowledge.",
        source: {
          label: "Two paraphrased sources",
          text:
            "Source A (US): Kennedy stood firm and forced the Soviets to back down. Source B (Soviet): Khrushchev wisely avoided war by making a deal to remove the missiles.",
        },
        markScheme: [
          "Identify similarities (both see the crisis ending peacefully / their own leader as wise).",
          "Identify differences (each credits its own side).",
          "L3: developed comparison of content AND provenance.",
        ],
        modelAnswer:
          "The two sources are similar in agreeing that the crisis ended without war and that their own leader acted wisely. However, they differ in who they credit: the US source praises Kennedy for standing firm, while the Soviet source praises Khrushchev for avoiding war. This difference reflects their origins, as each side presents its own leader positively. Both are useful for showing how the crisis was remembered differently on either side of the Cold War.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. THE END OF THE COLD WAR
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ch-end",
    slug: "end-of-the-cold-war",
    number: "2.4",
    section: "The Cold War",
    title: "The End of the Cold War",
    subtitle: "How the long standoff finally thawed",
    inquiry: "Why did the Cold War come to an end?",
    palette: "collapse",
    era: "1985–1991",
    hook: "After forty years of fear, the walls came down — and an empire quietly dissolved.",
    outcomes: [
      "Explain the problems facing the Soviet Union by the 1980s",
      "Explain the impact of Gorbachev's reforms",
      "Describe how communist rule ended in Eastern Europe",
    ],
    characterIds: ["gorbachev"],
    timelineIds: ["wall-falls", "ussr-ends"],
    pages: [
      {
        id: "e-1",
        kicker: "1980s · USSR",
        title: "A system under strain",
        scene: "empty-factory",
        narration: [
          "By the 1980s the Soviet Union was in deep trouble. Its economy was struggling, living standards were low, and the arms race with the USA was hugely expensive.",
          "Keeping control of Eastern Europe was also costly and difficult. The system that had once seemed unstoppable was running out of strength.",
        ],
        highlights: ["economy was struggling", "arms race", "expensive", "running out of strength"],
      },
      {
        id: "e-2",
        kicker: "1985",
        title: "A reforming leader",
        scene: "rising-leader",
        narration: [
          "In 1985 Mikhail Gorbachev became Soviet leader. He knew the USSR could not go on as before and introduced reforms to modernise the country and reduce tension with the West.",
          "Crucially, Gorbachev signalled that the USSR would no longer use force to keep the communist governments of Eastern Europe in power.",
        ],
        highlights: ["Gorbachev", "reforms", "reduce tension", "no longer use force"],
        dialogues: [
          {
            speaker: "gorbachev",
            characterId: "gorbachev",
            side: "left",
            text: "The Soviet Union cannot sustain this. We must reform, and we must ease tension.",
          },
        ],
      },
      {
        id: "e-3",
        kicker: "1989",
        title: "The wall comes down",
        scene: "falling-wall",
        narration: [
          "Once people realised the USSR would not send in troops, protests swept across Eastern Europe. One by one, communist governments fell.",
          "In 1989 the Berlin Wall — the great symbol of the divided world — was opened at last. Crowds crossed freely for the first time in decades.",
        ],
        highlights: ["protests", "communist governments fell", "Berlin Wall", "freely"],
      },
      {
        id: "e-4",
        kicker: "1991",
        title: "An empire dissolves",
        scene: "handshake",
        narration: [
          "The changes could not be stopped. In 1991 the Soviet Union itself broke apart into separate independent countries.",
          "The Cold War was over. After more than forty years, the long standoff between the superpowers had ended — not with a war, but with the peaceful collapse of one side.",
        ],
        highlights: ["Soviet Union", "broke apart", "Cold War was over", "peaceful collapse"],
        choice: {
          question: "You are Gorbachev in 1989. Protests are spreading across Eastern Europe. What do you do?",
          options: [
            {
              label: "Do not use force",
              outcome:
                "This is what Gorbachev chose — allowing change and hastening the end of the Cold War.",
              historical: true,
            },
            {
              label: "Send in the army to crush protests",
              outcome:
                "Earlier Soviet leaders had done this, but it was costly and, by the 1980s, the USSR could not afford it.",
            },
          ],
          reality:
            "Gorbachev chose not to use force. Without the threat of Soviet tanks, communist governments across Eastern Europe collapsed and the Berlin Wall fell. His reforms and restraint, combined with the USSR's deep economic problems, brought the Cold War to a peaceful end.",
        },
      },
    ],
    boosters: [
      {
        afterPage: 1,
        booster: {
          type: "recall",
          prompt: "Check your understanding.",
          question: "Why were Gorbachev's reforms so important to ending the Cold War?",
          answer:
            "He reduced tension with the West and, crucially, signalled that the USSR would no longer use force to keep Eastern Europe communist — which allowed those governments to fall.",
        },
      },
      {
        afterPage: 3,
        booster: {
          type: "order",
          prompt: "Order the end of the Cold War.",
          items: [
            "Soviet economy struggles under the arms race",
            "Gorbachev becomes leader and reforms (1985)",
            "USSR will not use force in Eastern Europe",
            "Berlin Wall falls (1989)",
            "Soviet Union breaks apart (1991)",
          ],
        },
      },
    ],
    bigPicture: {
      title: "Why the Cold War ended",
      nodes: [
        {
          id: "n1",
          label: "Soviet weakness",
          icon: "📉",
          detail: "A struggling economy and costly arms race strained the USSR.",
        },
        {
          id: "n2",
          label: "Gorbachev's reforms",
          icon: "🕊️",
          detail: "He modernised the USSR and eased tension with the West.",
        },
        {
          id: "n3",
          label: "No force in the East",
          icon: "✋",
          detail: "Gorbachev refused to use troops to hold Eastern Europe.",
        },
        {
          id: "n4",
          label: "Communism collapses",
          icon: "🧱",
          detail: "Governments fell and the Berlin Wall came down in 1989.",
        },
        {
          id: "n5",
          label: "USSR ends",
          icon: "🌍",
          detail: "The Soviet Union broke apart in 1991 and the Cold War ended.",
        },
      ],
    },
    exam: [
      {
        id: "e-exam-1",
        skill: "Explain (SEQ)",
        format: "SEQ",
        marks: 8,
        question: "Explain why the Cold War came to an end.",
        markScheme: [
          "Valid reasons: Soviet economic problems, the arms race, Gorbachev's reforms, refusal to use force.",
          "Explain HOW each contributed to the end.",
          "L3: two developed reasons with links.",
        ],
        modelAnswer:
          "The Cold War ended largely because the Soviet Union was economically exhausted, weakened by a struggling economy and the costly arms race, which meant it could no longer sustain the struggle. This was decisive under Gorbachev, whose reforms eased tension with the West and, crucially, ended the threat of using force in Eastern Europe. Once Soviet troops would not intervene, communist governments collapsed and the divided world came peacefully to an end.",
      },
      {
        id: "e-exam-2",
        skill: "Judgement (SEQ)",
        format: "SEQ",
        marks: 12,
        question:
          "'Gorbachev was the main reason the Cold War ended.' How far do you agree?",
        markScheme: [
          "FOR: his reforms, easing tension, refusing to use force in Eastern Europe.",
          "AGAINST: deep Soviet economic weakness, the costly arms race, pressure from within Eastern Europe.",
          "L4/L5: balanced judgement with a supported conclusion.",
        ],
        modelAnswer:
          "Gorbachev was very important because his reforms and his refusal to use force allowed communist governments in Eastern Europe to fall without Soviet intervention. However, he was not the only reason. The deeper cause was the USSR's severe economic weakness and the crushing cost of the arms race, which made reform necessary in the first place. On balance, Gorbachev was the crucial trigger, but he was responding to long-term Soviet problems that made the end of the Cold War increasingly likely.",
      },
    ],
  },
];

export function getChapter(slug: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.slug === slug);
}

export function chapterIndex(slug: string): number {
  return CHAPTERS.findIndex((c) => c.slug === slug);
}
