import type { Word } from "./types";

/**
 * The word treasures of the Lexicon.
 *
 * Each entry is authored in full so that discovering it feels like uncovering
 * something rare: a plain-English meaning, a memory trick, a tiny story, real
 * examples and a model O-Level sentence. Words are chosen to lift a Singapore
 * O-Level English student's writing — and to be genuinely useful for life.
 */
export const WORDS: Word[] = [
  // ── NATURE ──────────────────────────────────────────────────────────────
  {
    id: "serene",
    word: "serene",
    pronunciation: "suh-REEN",
    ipa: "/səˈriːn/",
    class: "adjective",
    difficulty: 2,
    rarity: "uncommon",
    room: "nature",
    meaning: "calm, peaceful and completely untroubled.",
    synonyms: ["tranquil", "peaceful", "placid", "unruffled"],
    antonyms: ["frantic", "turbulent", "agitated"],
    mistake:
      "Don't confuse it with 'serious'. Serene is about calm, not solemnity.",
    trick:
      "Picture a still lake at dawn — 'serene' even sounds like a long, slow breath: seeee-reeene.",
    story:
      "The old librarian never rushed. Even as the storm rattled the windows, her face stayed serene, as if the thunder were only turning pages.",
    examples: [
      "A serene smile spread across her face as she watched the sunset.",
      "The monastery sat in serene silence high above the valley.",
    ],
    olevel:
      "Despite the chaos of examination season, she maintained a serene composure that steadied everyone around her.",
    collocations: ["serene smile", "serene expression", "serene landscape"],
    phrases: ["a picture of serenity"],
    quiz: {
      prompt: "Which situation best fits 'serene'?",
      options: [
        "A quiet garden at sunrise",
        "A crowded, noisy market",
        "A heated argument",
        "A rushing rush-hour train",
      ],
      answer: 0,
      explain: "Serene describes deep calm and peace.",
    },
    motif: "🌅",
  },
  {
    id: "resilient",
    word: "resilient",
    pronunciation: "rih-ZIL-yuhnt",
    ipa: "/rɪˈzɪliənt/",
    class: "adjective",
    difficulty: 3,
    rarity: "rare",
    room: "nature",
    meaning: "able to recover quickly from difficulty; tough and springy.",
    synonyms: ["tough", "hardy", "adaptable", "buoyant"],
    antonyms: ["fragile", "brittle", "vulnerable"],
    mistake:
      "It describes bouncing back, not simply being strong. A brick is strong but not resilient; a trampoline is resilient.",
    trick:
      "'Re-' means again. A resilient person rises again — like a bamboo that bends in the storm but springs back straight.",
    story:
      "The seedling had been trampled twice, yet by spring it stood taller than before — the most resilient thing in the whole garden.",
    examples: [
      "Children are often remarkably resilient after setbacks.",
      "The resilient coral began to regrow within months.",
    ],
    olevel:
      "The most resilient students are not those who never fail, but those who treat each failure as a lesson and rise once more.",
    collocations: [
      "resilient economy",
      "emotionally resilient",
      "resilient spirit",
    ],
    phrases: ["bounce back", "weather the storm"],
    quiz: {
      prompt: "A resilient person is someone who…",
      options: [
        "recovers quickly from hardship",
        "never faces any problems",
        "gives up easily",
        "is physically very tall",
      ],
      answer: 0,
      explain: "Resilience is the ability to bounce back.",
    },
    motif: "🌱",
  },
  {
    id: "barren",
    word: "barren",
    pronunciation: "BAIR-uhn",
    ipa: "/ˈbærən/",
    class: "adjective",
    difficulty: 2,
    rarity: "uncommon",
    room: "nature",
    meaning: "empty and lifeless; unable to produce plants or fruit.",
    synonyms: ["bare", "desolate", "infertile", "arid"],
    antonyms: ["fertile", "lush", "fruitful"],
    mistake:
      "Spelled with two R's — 'barren', not 'baron' (which is a nobleman).",
    trick:
      "A BARE + hidden 'n': a barren land is bare and 'nothing' grows.",
    story:
      "Nothing had grown on that hillside for a hundred years. The soil was barren, grey and cracked, as though the earth had forgotten how to be alive.",
    examples: [
      "The barren desert stretched for miles without a single tree.",
      "After the fire, the once-green slope lay barren.",
    ],
    olevel:
      "The poet contrasts the barren winter landscape with the promise of spring, mirroring the character's own despair and hope.",
    collocations: ["barren land", "barren wasteland", "barren desert"],
    phrases: ["a barren stretch of..."],
    quiz: {
      prompt: "A barren field is one that…",
      options: [
        "cannot grow anything",
        "is full of ripe crops",
        "is covered in flowers",
        "is under water",
      ],
      answer: 0,
      explain: "Barren means empty and unable to produce life.",
    },
    motif: "🏜️",
  },
  {
    id: "verdant",
    word: "verdant",
    pronunciation: "VUR-duhnt",
    ipa: "/ˈvɜːdənt/",
    class: "adjective",
    difficulty: 4,
    rarity: "epic",
    room: "nature",
    meaning: "richly green with fresh, lush plant life.",
    synonyms: ["lush", "leafy", "green", "flourishing"],
    antonyms: ["barren", "arid", "withered"],
    mistake:
      "Use it for greenery, not for the colour green on a car or a shirt.",
    trick:
      "'Verd' is green in French (vert) — a verdant valley is a very-green one.",
    story:
      "Beyond the barren pass, the travellers gasped: a verdant valley unrolled below them, so green it seemed to glow.",
    examples: [
      "Rolling, verdant hills surrounded the little village.",
      "After the rains, the whole valley turned verdant.",
    ],
    olevel:
      "The verdant countryside, described in loving detail, becomes a symbol of the innocence the narrator has lost.",
    collocations: ["verdant valley", "verdant hills", "verdant meadow"],
    phrases: ["verdant and rolling"],
    quiz: {
      prompt: "'Verdant' most nearly means…",
      options: ["lush and green", "dry and dusty", "cold and icy", "loud and busy"],
      answer: 0,
      explain: "Verdant describes rich, fresh greenery.",
    },
    motif: "🌿",
  },
  {
    id: "ephemeral",
    word: "ephemeral",
    pronunciation: "ih-FEM-er-uhl",
    ipa: "/ɪˈfɛmərəl/",
    class: "adjective",
    difficulty: 5,
    rarity: "mythical",
    room: "nature",
    meaning: "lasting for only a very short time; fleeting.",
    synonyms: ["fleeting", "transient", "momentary", "short-lived"],
    antonyms: ["permanent", "eternal", "enduring"],
    mistake:
      "It means brief, not unimportant. An ephemeral moment can be precious precisely because it is short.",
    trick:
      "A mayfly's Latin name is Ephemera — it lives a single day. Ephemeral things are here, then gone.",
    story:
      "The cherry blossoms lasted barely a week. The old gardener said their beauty was ephemeral, and that was exactly why people travelled so far to see it.",
    examples: [
      "Fame can be ephemeral, vanishing as quickly as it comes.",
      "They captured the ephemeral glow of the fireflies on camera.",
    ],
    olevel:
      "The writer lingers on the ephemeral beauty of youth, reminding us that its very fleetingness makes it worth treasuring.",
    collocations: ["ephemeral beauty", "ephemeral moment", "ephemeral fame"],
    phrases: ["here today, gone tomorrow"],
    quiz: {
      prompt: "Something ephemeral…",
      options: [
        "lasts only a short time",
        "lasts forever",
        "is extremely heavy",
        "is very expensive",
      ],
      answer: 0,
      explain: "Ephemeral means fleeting or short-lived.",
    },
    motif: "🦋",
  },

  // ── EMOTION ─────────────────────────────────────────────────────────────
  {
    id: "elated",
    word: "elated",
    pronunciation: "ih-LAY-tid",
    ipa: "/ɪˈleɪtɪd/",
    class: "adjective",
    difficulty: 3,
    rarity: "rare",
    room: "emotion",
    meaning: "extremely happy and full of joyful energy.",
    synonyms: ["overjoyed", "exhilarated", "jubilant", "thrilled"],
    antonyms: ["dejected", "despondent", "miserable"],
    mistake:
      "It's stronger than 'happy'. Save it for genuine triumphs, not mild pleasure.",
    trick:
      "Think 'elevated' — when you're elated, your mood is lifted sky-high.",
    story:
      "When her name was read out as the winner, she leapt from her seat, absolutely elated, tears and laughter arriving at the same time.",
    examples: [
      "The team was elated after their last-minute victory.",
      "He felt elated when the acceptance letter finally came.",
    ],
    olevel:
      "Rather than writing 'I was very happy', I described how I felt elated, my heart soaring as the crowd roared my name.",
    collocations: ["absolutely elated", "elated crowd", "feel elated"],
    phrases: ["over the moon", "on cloud nine"],
    quiz: {
      prompt: "'Elated' is closest in meaning to…",
      options: ["overjoyed", "slightly annoyed", "sleepy", "confused"],
      answer: 0,
      explain: "Elated means extremely, joyfully happy.",
    },
    motif: "🎈",
  },
  {
    id: "melancholy",
    word: "melancholy",
    pronunciation: "MEL-uhn-kol-ee",
    ipa: "/ˈmɛlənkəli/",
    class: "noun",
    difficulty: 4,
    rarity: "epic",
    room: "emotion",
    meaning: "a deep, thoughtful, lingering sadness.",
    synonyms: ["sorrow", "wistfulness", "gloom", "despondency"],
    antonyms: ["cheerfulness", "joy", "elation"],
    mistake:
      "Melancholy is gentle and reflective, not sudden anger or panic. It can even feel a little beautiful.",
    trick:
      "'Mellow' + sadness. A mellow, quiet sadness that settles slowly, like dusk.",
    story:
      "Rain traced the windowpane as he read her last letter. A quiet melancholy filled the room — not despair, but the ache of a good thing ended.",
    examples: [
      "A sense of melancholy hung over the empty playground.",
      "The song had a beautiful, melancholy tune.",
    ],
    olevel:
      "The autumn setting mirrors the narrator's melancholy, each falling leaf echoing the friendships he has let slip away.",
    collocations: ["a sense of melancholy", "melancholy mood", "deep melancholy"],
    phrases: ["a wave of melancholy"],
    quiz: {
      prompt: "Melancholy is a kind of…",
      options: [
        "thoughtful sadness",
        "explosive anger",
        "wild excitement",
        "sudden fear",
      ],
      answer: 0,
      explain: "Melancholy is a deep, reflective sadness.",
    },
    motif: "🌧️",
  },
  {
    id: "apprehensive",
    word: "apprehensive",
    pronunciation: "ap-rih-HEN-siv",
    ipa: "/ˌæprɪˈhɛnsɪv/",
    class: "adjective",
    difficulty: 3,
    rarity: "rare",
    room: "emotion",
    meaning: "anxious or uneasy that something bad might happen.",
    synonyms: ["anxious", "uneasy", "nervous", "worried"],
    antonyms: ["confident", "assured", "carefree"],
    mistake:
      "To 'apprehend' can mean to arrest — but 'apprehensive' is about worry, not police.",
    trick:
      "You 'apprehend' (grasp) a bad outcome before it happens, so you feel apprehensive.",
    story:
      "She stood outside the examination hall, apprehensive, her notes trembling slightly in her hands as the clock crept towards nine.",
    examples: [
      "He felt apprehensive about his first day at a new school.",
      "The travellers grew apprehensive as the sky darkened.",
    ],
    olevel:
      "Apprehensive about the interview, I rehearsed my answers until the words felt like armour against my racing heart.",
    collocations: [
      "apprehensive about",
      "increasingly apprehensive",
      "apprehensive glance",
    ],
    phrases: ["butterflies in the stomach"],
    quiz: {
      prompt: "Someone apprehensive is…",
      options: [
        "worried about what might happen",
        "extremely confident",
        "completely relaxed",
        "very angry",
      ],
      answer: 0,
      explain: "Apprehensive means anxious about a possible bad outcome.",
    },
    motif: "😟",
  },
  {
    id: "wistful",
    word: "wistful",
    pronunciation: "WIST-fuhl",
    ipa: "/ˈwɪstfʊl/",
    class: "adjective",
    difficulty: 4,
    rarity: "epic",
    room: "emotion",
    meaning: "gently sad and longing for something in the past.",
    synonyms: ["nostalgic", "longing", "yearning", "pensive"],
    antonyms: ["content", "indifferent", "carefree"],
    mistake:
      "Wistful is soft longing, not bitter regret. It looks back with tenderness.",
    trick:
      "'Wish' + 'full' → full of wishing for what's gone. A wistful sigh at an old photo.",
    story:
      "He found his childhood kite in the attic and smiled a wistful smile, remembering summers that would never come again.",
    examples: [
      "She gave a wistful glance at her old school gates.",
      "There was a wistful note in his voice as he spoke of home.",
    ],
    olevel:
      "Looking at the faded photograph, Grandmother wore a wistful expression, as though the whole of her youth lay just beyond the frame.",
    collocations: ["wistful smile", "wistful glance", "wistful longing"],
    phrases: ["a wistful look"],
    quiz: {
      prompt: "A wistful person feels…",
      options: [
        "a gentle longing for the past",
        "furious and vengeful",
        "wildly excited",
        "totally bored",
      ],
      answer: 0,
      explain: "Wistful is a soft, longing sadness for what is gone.",
    },
    motif: "🍂",
  },

  // ── CONFLICT ────────────────────────────────────────────────────────────
  {
    id: "belligerent",
    word: "belligerent",
    pronunciation: "buh-LIJ-er-uhnt",
    ipa: "/bəˈlɪdʒərənt/",
    class: "adjective",
    difficulty: 4,
    rarity: "epic",
    room: "conflict",
    meaning: "hostile and eager to fight or argue.",
    synonyms: ["hostile", "aggressive", "combative", "quarrelsome"],
    antonyms: ["peaceable", "friendly", "conciliatory"],
    mistake:
      "It describes a fighting attitude, not just anger. A belligerent person actively looks for a quarrel.",
    trick:
      "'Belli' is Latin for war (as in 'rebel'). A belligerent person is basically at war with everyone.",
    story:
      "The customer grew belligerent, jabbing his finger at the manager and daring anyone in the shop to disagree with him.",
    examples: [
      "The belligerent nation refused every offer of peace.",
      "He became belligerent whenever anyone questioned his plan.",
    ],
    olevel:
      "The dictator's belligerent rhetoric, dripping with threats, made war feel less like a risk than a promise.",
    collocations: [
      "belligerent tone",
      "belligerent attitude",
      "belligerent nation",
    ],
    phrases: ["spoiling for a fight"],
    quiz: {
      prompt: "A belligerent person is…",
      options: [
        "eager to fight or argue",
        "shy and quiet",
        "generous and kind",
        "calm and forgiving",
      ],
      answer: 0,
      explain: "Belligerent means hostile and combative.",
    },
    motif: "😠",
  },
  {
    id: "volatile",
    word: "volatile",
    pronunciation: "VOL-uh-tyle",
    ipa: "/ˈvɒlətaɪl/",
    class: "adjective",
    difficulty: 3,
    rarity: "rare",
    room: "conflict",
    meaning: "likely to change or erupt suddenly and unpredictably.",
    synonyms: ["unstable", "explosive", "unpredictable", "temperamental"],
    antonyms: ["stable", "steady", "calm"],
    mistake:
      "In British/O-Level usage the ending is '-tile' (VOL-uh-tyle), not 'vol-uh-teel'.",
    trick:
      "Volatile chemicals 'fly off' as vapour — a volatile temper can blow up in an instant.",
    story:
      "The negotiations were volatile: one careless word and the whole room could ignite, delegates half-rising from their seats.",
    examples: [
      "The stock market was highly volatile all week.",
      "He had a volatile temper that frightened his classmates.",
    ],
    olevel:
      "The situation was so volatile that a single rumour was enough to send the crowd surging into the streets.",
    collocations: [
      "volatile temper",
      "volatile situation",
      "highly volatile",
    ],
    phrases: ["a powder keg"],
    quiz: {
      prompt: "A volatile situation is one that…",
      options: [
        "could change or explode at any moment",
        "is calm and predictable",
        "never changes at all",
        "is very cheap",
      ],
      answer: 0,
      explain: "Volatile means unstable and liable to erupt.",
    },
    motif: "🌋",
  },
  {
    id: "reconcile",
    word: "reconcile",
    pronunciation: "REK-uhn-syle",
    ipa: "/ˈrɛkənsaɪl/",
    class: "verb",
    difficulty: 3,
    rarity: "rare",
    room: "conflict",
    meaning: "to restore friendly relations after a quarrel; to make agree.",
    synonyms: ["make peace", "reunite", "settle", "harmonise"],
    antonyms: ["estrange", "divide", "alienate"],
    mistake:
      "You reconcile 'with' a person, but you reconcile two ideas that seem to clash.",
    trick:
      "'Re-' (again) + 'concile' (council) → to sit in council together again, as friends.",
    story:
      "After years of silence, the two brothers finally reconciled at their mother's table, an old feud dissolving over a shared bowl of rice.",
    examples: [
      "They reconciled after months of not speaking.",
      "It is hard to reconcile his kind words with his cruel actions.",
    ],
    olevel:
      "The novel asks whether we can ever truly reconcile ambition with loyalty, or whether one must always betray the other.",
    collocations: [
      "reconcile with",
      "reconcile differences",
      "hard to reconcile",
    ],
    phrases: ["bury the hatchet", "make amends"],
    quiz: {
      prompt: "To reconcile with a friend means to…",
      options: [
        "make peace after a quarrel",
        "start a new argument",
        "ignore them forever",
        "compete against them",
      ],
      answer: 0,
      explain: "Reconcile means to restore a friendly relationship.",
    },
    motif: "🕊️",
  },
  {
    id: "adversary",
    word: "adversary",
    pronunciation: "AD-ver-ser-ee",
    ipa: "/ˈædvəsəri/",
    class: "noun",
    difficulty: 3,
    rarity: "rare",
    room: "conflict",
    meaning: "an opponent or enemy in a contest, argument or fight.",
    synonyms: ["opponent", "rival", "foe", "antagonist"],
    antonyms: ["ally", "friend", "partner"],
    mistake:
      "An adversary opposes you; an 'adversity' is a hardship. Same root, different words.",
    trick:
      "Turned 'adverse' (against you) into a person — the one turned against you.",
    story:
      "Across the chessboard sat her oldest adversary, a rival she both dreaded and, secretly, could not have improved without.",
    examples: [
      "He treated every debate opponent as a worthy adversary.",
      "The two nations had been adversaries for decades.",
    ],
    olevel:
      "A skilled writer makes even the villain a worthy adversary, so that the hero's victory feels truly earned.",
    collocations: ["worthy adversary", "formidable adversary", "old adversary"],
    phrases: ["a worthy adversary"],
    quiz: {
      prompt: "Your adversary is your…",
      options: ["opponent", "closest friend", "teacher", "helper"],
      answer: 0,
      explain: "An adversary is an opponent or enemy.",
    },
    motif: "♟️",
  },

  // ── SUCCESS ─────────────────────────────────────────────────────────────
  {
    id: "diligent",
    word: "diligent",
    pronunciation: "DIL-ih-juhnt",
    ipa: "/ˈdɪlɪdʒənt/",
    class: "adjective",
    difficulty: 2,
    rarity: "uncommon",
    room: "success",
    meaning: "hardworking and careful in everything you do.",
    synonyms: ["hardworking", "industrious", "conscientious", "assiduous"],
    antonyms: ["lazy", "careless", "negligent"],
    mistake:
      "Diligent means steady, careful effort — not just being busy or fast.",
    trick:
      "A diligent student 'delivers' work — both start with 'dili/deli' effort.",
    story:
      "While others copied last-minute, she had revised diligently for weeks, her notes as neat on the last night as on the first.",
    examples: [
      "Diligent practice turned a clumsy beginner into a pianist.",
      "The diligent detective checked every clue twice.",
    ],
    olevel:
      "Through diligent, unglamorous effort — an hour every evening — she quietly climbed to the top of the class.",
    collocations: [
      "diligent student",
      "diligent effort",
      "diligently prepare",
    ],
    phrases: ["put in the hours"],
    quiz: {
      prompt: "A diligent worker is…",
      options: [
        "hardworking and careful",
        "lazy and sloppy",
        "loud and boastful",
        "quick but careless",
      ],
      answer: 0,
      explain: "Diligent means steady, careful hard work.",
    },
    motif: "🐝",
  },
  {
    id: "perseverance",
    word: "perseverance",
    pronunciation: "pur-suh-VEER-uhns",
    ipa: "/ˌpɜːsɪˈvɪərəns/",
    class: "noun",
    difficulty: 3,
    rarity: "rare",
    room: "success",
    meaning: "continued effort to reach a goal despite difficulty or delay.",
    synonyms: ["persistence", "determination", "tenacity", "grit"],
    antonyms: ["surrender", "quitting", "idleness"],
    mistake:
      "Watch the spelling: per-se-ver-ance (no double letters). The verb is 'persevere'.",
    trick:
      "Perseverance = keep going 'severe' conditions and all. You persevere through the severe.",
    story:
      "The mountaineer had turned back four times. It was sheer perseverance that carried her, on the fifth attempt, to the summit at dawn.",
    examples: [
      "Success in any field demands perseverance.",
      "Her perseverance paid off when she finally passed.",
    ],
    olevel:
      "If talent lights the spark, it is perseverance that keeps the flame alive long after easier paths have tempted others away.",
    collocations: [
      "sheer perseverance",
      "dogged perseverance",
      "perseverance and patience",
    ],
    phrases: ["never give up", "keep at it"],
    quiz: {
      prompt: "Perseverance means…",
      options: [
        "keeping going despite difficulty",
        "giving up at the first problem",
        "winning by luck",
        "avoiding all hard work",
      ],
      answer: 0,
      explain: "Perseverance is persistent effort in the face of obstacles.",
    },
    motif: "🧗",
  },
  {
    id: "triumphant",
    word: "triumphant",
    pronunciation: "try-UM-fuhnt",
    ipa: "/traɪˈʌmfənt/",
    class: "adjective",
    difficulty: 3,
    rarity: "rare",
    room: "success",
    meaning: "feeling or showing great joy after a victory or success.",
    synonyms: ["victorious", "jubilant", "exultant", "triumphal"],
    antonyms: ["defeated", "crestfallen", "humbled"],
    mistake:
      "'Triumphant' describes the winner's feeling; 'triumphal' describes things made to celebrate it (a triumphal arch).",
    trick:
      "Trumpets sound when someone is triumphant — hear the 'trum-' in both.",
    story:
      "She crossed the finish line and threw both arms skyward, triumphant, the roar of the crowd washing over her like a wave.",
    examples: [
      "The team returned home triumphant with the trophy.",
      "He gave a triumphant grin as the last piece clicked into place.",
    ],
    olevel:
      "The novel ends on a triumphant note, yet the writer reminds us how much was sacrificed to reach that single shining moment.",
    collocations: ["triumphant return", "triumphant smile", "triumphant cry"],
    phrases: ["against all odds"],
    quiz: {
      prompt: "'Triumphant' describes someone who is…",
      options: [
        "joyful after a victory",
        "sad after losing",
        "nervous before a test",
        "bored and tired",
      ],
      answer: 0,
      explain: "Triumphant means showing the joy of success.",
    },
    motif: "🏆",
  },
  {
    id: "meticulous",
    word: "meticulous",
    pronunciation: "muh-TIK-yuh-luhs",
    ipa: "/məˈtɪkjʊləs/",
    class: "adjective",
    difficulty: 4,
    rarity: "epic",
    room: "success",
    meaning: "extremely careful and precise about even the smallest details.",
    synonyms: ["thorough", "scrupulous", "painstaking", "fastidious"],
    antonyms: ["careless", "slapdash", "sloppy"],
    mistake:
      "It's a compliment about care, not about being fussy or annoying.",
    trick:
      "A meticulous person checks every 'tick' on the list — tick, tick, tick.",
    story:
      "The watchmaker was meticulous: he polished each tiny gear under a lamp, refusing to close the case until every wheel turned in perfect silence.",
    examples: [
      "She kept meticulous notes of every experiment.",
      "The plan was carried out with meticulous care.",
    ],
    olevel:
      "His meticulous preparation — every counter-argument anticipated, every fact verified — left the opposing debater with nowhere to hide.",
    collocations: [
      "meticulous attention to detail",
      "meticulous planning",
      "meticulously prepared",
    ],
    phrases: ["leave no stone unturned"],
    quiz: {
      prompt: "A meticulous worker pays attention to…",
      options: [
        "every small detail",
        "only the big picture",
        "nothing at all",
        "speed above all",
      ],
      answer: 0,
      explain: "Meticulous means extremely careful about detail.",
    },
    motif: "🔍",
  },

  // ── FAILURE ─────────────────────────────────────────────────────────────
  {
    id: "futile",
    word: "futile",
    pronunciation: "FYOO-tyle",
    ipa: "/ˈfjuːtaɪl/",
    class: "adjective",
    difficulty: 3,
    rarity: "rare",
    room: "failure",
    meaning: "pointless because it has no chance of succeeding.",
    synonyms: ["pointless", "useless", "fruitless", "vain"],
    antonyms: ["worthwhile", "effective", "productive"],
    mistake:
      "Futile means doomed to fail, not merely difficult. A hard task can still be worthwhile; a futile one cannot succeed.",
    trick:
      "A 'few tiles' won't build a roof — a futile effort achieves nothing.",
    story:
      "They bailed water with teacups as the ship went down — a futile effort, and they knew it, yet they could not simply stand still.",
    examples: [
      "It was futile to argue with someone so stubborn.",
      "All his attempts to restart the engine proved futile.",
    ],
    olevel:
      "The soldiers' charge was futile against the machine guns, and the poet uses their pointless deaths to condemn the whole war.",
    collocations: ["futile attempt", "futile effort", "utterly futile"],
    phrases: ["a lost cause", "flogging a dead horse"],
    quiz: {
      prompt: "A futile effort is one that…",
      options: [
        "cannot possibly succeed",
        "always works perfectly",
        "is easy and quick",
        "makes lots of money",
      ],
      answer: 0,
      explain: "Futile means pointless and doomed to fail.",
    },
    motif: "🕳️",
  },
  {
    id: "squander",
    word: "squander",
    pronunciation: "SKWON-der",
    ipa: "/ˈskwɒndə/",
    class: "verb",
    difficulty: 3,
    rarity: "rare",
    room: "failure",
    meaning: "to waste something valuable carelessly or foolishly.",
    synonyms: ["waste", "fritter away", "misspend", "throw away"],
    antonyms: ["save", "conserve", "invest"],
    mistake:
      "You squander things you had a chance to use well — money, time, talent, an opportunity.",
    trick:
      "Picture money going down the 'squander drain' — squelch, and it's gone.",
    story:
      "He had every advantage and squandered them all, trading years of promise for one lazy afternoon after another.",
    examples: [
      "Don't squander this chance — it may not come again.",
      "They squandered their savings on things they never used.",
    ],
    olevel:
      "To squander one's youth chasing shallow pleasures, the writer warns, is to trade a fortune for a handful of coins.",
    collocations: [
      "squander an opportunity",
      "squander money",
      "squander talent",
    ],
    phrases: ["throw it all away", "let it slip"],
    quiz: {
      prompt: "To squander an opportunity is to…",
      options: [
        "waste it carelessly",
        "use it wisely",
        "share it fairly",
        "plan it out",
      ],
      answer: 0,
      explain: "Squander means to waste something valuable.",
    },
    motif: "💸",
  },
  {
    id: "jeopardise",
    word: "jeopardise",
    pronunciation: "JEP-er-dyze",
    ipa: "/ˈdʒɛpədaɪz/",
    class: "verb",
    difficulty: 3,
    rarity: "rare",
    room: "failure",
    meaning: "to put something valuable at risk of loss, harm or failure.",
    synonyms: ["endanger", "risk", "threaten", "imperil"],
    antonyms: ["protect", "safeguard", "secure"],
    mistake:
      "Note the silent spelling: JE-O-P (jeopardy). The American form is 'jeopardize'.",
    trick:
      "It comes from the game 'Jeopardy!' — where a wrong move puts everything at risk.",
    story:
      "One dishonest shortcut could jeopardise a reputation she had spent twenty years building — so she tore the false report in two.",
    examples: [
      "Cheating would jeopardise his entire future.",
      "The leak jeopardised the success of the mission.",
    ],
    olevel:
      "By lying to protect a friend, the narrator jeopardises not only his own standing but the trust of everyone who believed in him.",
    collocations: [
      "jeopardise your future",
      "jeopardise the chances",
      "seriously jeopardise",
    ],
    phrases: ["put at risk", "on the line"],
    quiz: {
      prompt: "To jeopardise your health means to…",
      options: [
        "put it at risk",
        "improve it greatly",
        "measure it exactly",
        "ignore it politely",
      ],
      answer: 0,
      explain: "Jeopardise means to endanger or put at risk.",
    },
    motif: "⚠️",
  },
  {
    id: "inept",
    word: "inept",
    pronunciation: "ih-NEPT",
    ipa: "/ɪˈnɛpt/",
    class: "adjective",
    difficulty: 3,
    rarity: "rare",
    room: "failure",
    meaning: "clumsy and lacking the skill to do something properly.",
    synonyms: ["incompetent", "clumsy", "bungling", "unskilful"],
    antonyms: ["competent", "skilful", "capable"],
    mistake:
      "Inept is about lack of skill, not lack of effort. Someone can try hard and still be inept.",
    trick:
      "'In-' (not) + 'ept' (from 'apt', able) → not able. An inept juggler drops everything.",
    story:
      "The new waiter was hopelessly inept, spilling soup on the mayor and setting a napkin alight — yet somehow, everyone forgave him.",
    examples: [
      "His inept handling of the crisis made things far worse.",
      "The film was an inept remake of a much better original.",
    ],
    olevel:
      "The government's inept response to the flood — too slow, too small, too late — turned a disaster into a tragedy.",
    collocations: ["inept handling", "politically inept", "hopelessly inept"],
    phrases: ["all thumbs"],
    quiz: {
      prompt: "An inept person is…",
      options: [
        "clumsy and unskilful",
        "highly talented",
        "very wealthy",
        "extremely tall",
      ],
      answer: 0,
      explain: "Inept means lacking skill; incompetent.",
    },
    motif: "🤦",
  },

  // ── SCIENCE ─────────────────────────────────────────────────────────────
  {
    id: "hypothesis",
    word: "hypothesis",
    pronunciation: "hy-POTH-uh-sis",
    ipa: "/haɪˈpɒθəsɪs/",
    class: "noun",
    difficulty: 3,
    rarity: "rare",
    room: "science",
    meaning: "a smart guess or idea that can be tested by experiment.",
    synonyms: ["theory", "supposition", "premise", "conjecture"],
    antonyms: ["proof", "certainty", "fact"],
    mistake:
      "The plural is 'hypotheses' (hy-POTH-uh-seez). A hypothesis is not yet proven — that's the point.",
    trick:
      "'Hypo-' means under. A hypothesis is the idea placed 'under' your experiment to be tested.",
    story:
      "The young scientist scribbled her hypothesis on the whiteboard — plants grow towards sound — and grinned. Now she just had to prove it.",
    examples: [
      "Their hypothesis was that sleep improves memory.",
      "The experiment was designed to test one clear hypothesis.",
    ],
    olevel:
      "A good essay, like a good experiment, states its hypothesis early and then marshals evidence to test it point by point.",
    collocations: [
      "test a hypothesis",
      "working hypothesis",
      "support the hypothesis",
    ],
    phrases: ["prove or disprove"],
    quiz: {
      prompt: "A hypothesis is…",
      options: [
        "an idea to be tested",
        "a proven fact",
        "a final conclusion",
        "a type of graph",
      ],
      answer: 0,
      explain: "A hypothesis is a testable proposed explanation.",
    },
    motif: "🧪",
  },
  {
    id: "empirical",
    word: "empirical",
    pronunciation: "em-PIR-ih-kuhl",
    ipa: "/ɛmˈpɪrɪkəl/",
    class: "adjective",
    difficulty: 5,
    rarity: "legendary",
    room: "science",
    meaning: "based on real observation and experiment rather than pure theory.",
    synonyms: ["observed", "experimental", "evidence-based", "factual"],
    antonyms: ["theoretical", "speculative", "hypothetical"],
    mistake:
      "Empirical means proven by observation, not just 'scientific-sounding'. It's the opposite of a guess.",
    trick:
      "An 'empire' is real and visible — empirical knowledge is what you can actually see and measure.",
    story:
      "The professor waved away the clever argument. 'Beautiful,' she said, 'but where is your empirical evidence? Show me what you measured.'",
    examples: [
      "There is strong empirical evidence for the theory.",
      "Their claims were not backed by any empirical data.",
    ],
    olevel:
      "A persuasive argument does not rely on emotion alone; it is anchored in empirical evidence that a doubtful reader can verify.",
    collocations: [
      "empirical evidence",
      "empirical data",
      "empirical research",
    ],
    phrases: ["backed by data"],
    quiz: {
      prompt: "'Empirical' knowledge comes from…",
      options: [
        "observation and experiment",
        "pure imagination",
        "ancient legends",
        "personal opinion",
      ],
      answer: 0,
      explain: "Empirical means based on observed, tested evidence.",
    },
    motif: "📊",
  },
  {
    id: "catalyst",
    word: "catalyst",
    pronunciation: "KAT-uh-list",
    ipa: "/ˈkætəlɪst/",
    class: "noun",
    difficulty: 4,
    rarity: "epic",
    room: "science",
    meaning:
      "something that speeds up a change or sparks an important event.",
    synonyms: ["trigger", "spark", "stimulus", "spur"],
    antonyms: ["hindrance", "obstacle", "deterrent"],
    mistake:
      "Beyond chemistry, a catalyst is a person or event that sets change in motion — not the change itself.",
    trick:
      "A 'cat' that 'lists' into action — a catalyst gets things moving fast.",
    story:
      "One quiet letter to the newspaper became the catalyst for a movement, and within a month the whole city was marching.",
    examples: [
      "The invention was a catalyst for the industrial revolution.",
      "Her speech acted as a catalyst for change.",
    ],
    olevel:
      "The stranger's arrival is the catalyst of the plot, tipping a sleepy village into a chain of events no one can stop.",
    collocations: [
      "catalyst for change",
      "act as a catalyst",
      "serve as a catalyst",
    ],
    phrases: ["set in motion", "the spark that lit the fire"],
    quiz: {
      prompt: "A catalyst is something that…",
      options: [
        "speeds up or triggers change",
        "stops all change",
        "slows everything down",
        "has no effect",
      ],
      answer: 0,
      explain: "A catalyst sparks or accelerates change.",
    },
    motif: "⚗️",
  },
  {
    id: "phenomenon",
    word: "phenomenon",
    pronunciation: "fuh-NOM-uh-non",
    ipa: "/fɪˈnɒmɪnən/",
    class: "noun",
    difficulty: 3,
    rarity: "rare",
    room: "science",
    meaning:
      "a remarkable fact or event that can be observed, especially a surprising one.",
    synonyms: ["occurrence", "marvel", "wonder", "spectacle"],
    antonyms: [],
    mistake:
      "One phenomenon, two phenomena. 'Phenomenas' is not a word.",
    trick:
      "Break it up: 'phe-NOM-e-non' — say it as four beats and it stops being scary.",
    story:
      "Scientists gathered from around the world to study the phenomenon: for one night each decade, the whole lake glowed a soft, electric blue.",
    examples: [
      "The northern lights are a stunning natural phenomenon.",
      "Viral videos are a phenomenon of the internet age.",
    ],
    olevel:
      "Social media is a curious phenomenon: it can unite strangers across oceans yet leave neighbours feeling more alone than ever.",
    collocations: [
      "natural phenomenon",
      "strange phenomenon",
      "widespread phenomenon",
    ],
    phrases: ["a phenomenon in its own right"],
    quiz: {
      prompt: "The plural of 'phenomenon' is…",
      options: ["phenomena", "phenomenons", "phenominae", "phenomenas"],
      answer: 0,
      explain: "One phenomenon, several phenomena.",
    },
    motif: "🌠",
  },

  // ── POLITICS ────────────────────────────────────────────────────────────
  {
    id: "pragmatic",
    word: "pragmatic",
    pronunciation: "prag-MAT-ik",
    ipa: "/præɡˈmætɪk/",
    class: "adjective",
    difficulty: 4,
    rarity: "epic",
    room: "politics",
    meaning:
      "dealing with problems in a practical, sensible way rather than by strict theory.",
    synonyms: ["practical", "realistic", "sensible", "level-headed"],
    antonyms: ["idealistic", "impractical", "dogmatic"],
    mistake:
      "Pragmatic is a compliment — it means practical, not cold or unfeeling.",
    trick:
      "A pragmatic person asks 'what actually works?' — think of a 'practical' mechanic.",
    story:
      "While the others argued over grand ideals, she took a pragmatic view: fix the roof first, debate the paint colour later.",
    examples: [
      "We need a pragmatic solution, not a perfect one.",
      "She took a pragmatic approach to the budget.",
    ],
    olevel:
      "The wisest leaders balance vision with a pragmatic streak, dreaming boldly while quietly making sure the trains run on time.",
    collocations: [
      "pragmatic approach",
      "pragmatic solution",
      "pragmatic decision",
    ],
    phrases: ["down to earth"],
    quiz: {
      prompt: "A pragmatic approach focuses on…",
      options: [
        "what will actually work",
        "perfect ideals only",
        "pleasing everyone",
        "impossible dreams",
      ],
      answer: 0,
      explain: "Pragmatic means practical and realistic.",
    },
    motif: "🧩",
  },
  {
    id: "diplomatic",
    word: "diplomatic",
    pronunciation: "dip-luh-MAT-ik",
    ipa: "/ˌdɪpləˈmætɪk/",
    class: "adjective",
    difficulty: 3,
    rarity: "rare",
    room: "politics",
    meaning:
      "skilled at dealing with people tactfully, without causing offence.",
    synonyms: ["tactful", "sensitive", "discreet", "politic"],
    antonyms: ["tactless", "blunt", "undiplomatic"],
    mistake:
      "It can mean 'to do with diplomacy between countries' OR 'tactful in general'. Context decides.",
    trick:
      "A diplomat smooths things over — being diplomatic means smoothing your words too.",
    story:
      "'The soup is… interesting,' he said, ever diplomatic, unwilling to tell his host it tasted of dishwater.",
    examples: [
      "She gave a diplomatic answer that upset no one.",
      "It took diplomatic skill to calm both sides.",
    ],
    olevel:
      "A diplomatic reply, chosen with care, can defuse an argument that a blunt one would only have set ablaze.",
    collocations: [
      "diplomatic answer",
      "diplomatic skill",
      "diplomatic solution",
    ],
    phrases: ["choose your words carefully"],
    quiz: {
      prompt: "A diplomatic person is…",
      options: [
        "tactful and careful not to offend",
        "rude and blunt",
        "loud and boastful",
        "shy and silent",
      ],
      answer: 0,
      explain: "Diplomatic means handling people tactfully.",
    },
    motif: "🎩",
  },
  {
    id: "autonomy",
    word: "autonomy",
    pronunciation: "aw-TON-uh-mee",
    ipa: "/ɔːˈtɒnəmi/",
    class: "noun",
    difficulty: 4,
    rarity: "epic",
    room: "politics",
    meaning:
      "the freedom to govern yourself or make your own decisions.",
    synonyms: ["independence", "self-rule", "freedom", "self-governance"],
    antonyms: ["dependence", "subjection", "control"],
    mistake:
      "Autonomy is about self-rule; 'anatomy' is the study of the body. Don't mix them up.",
    trick:
      "'Auto-' (self) + '-nomy' (rule) → self-rule. An automatic self, running itself.",
    story:
      "The colony had long wanted autonomy, and when at last it governed itself, even the smallest decisions felt sweet with freedom.",
    examples: [
      "The region was granted greater autonomy.",
      "Teenagers crave a little more autonomy each year.",
    ],
    olevel:
      "True education should nurture autonomy, teaching students not merely what to think but how to decide for themselves.",
    collocations: [
      "greater autonomy",
      "regional autonomy",
      "personal autonomy",
    ],
    phrases: ["a mind of one's own"],
    quiz: {
      prompt: "Autonomy means…",
      options: [
        "the freedom to rule yourself",
        "being controlled by others",
        "a study of the body",
        "a type of car",
      ],
      answer: 0,
      explain: "Autonomy is self-government or independence.",
    },
    motif: "🗽",
  },
  {
    id: "advocate",
    word: "advocate",
    pronunciation: "AD-vuh-kayt (verb) · AD-vuh-kit (noun)",
    ipa: "/ˈædvəkeɪt/",
    class: "verb",
    difficulty: 3,
    rarity: "rare",
    room: "politics",
    meaning: "to publicly support or argue in favour of a cause or idea.",
    synonyms: ["support", "champion", "promote", "campaign for"],
    antonyms: ["oppose", "discourage", "resist"],
    mistake:
      "As a verb it's 'AD-vuh-kayt'; as a noun (a supporter) it's 'AD-vuh-kit'. You advocate FOR something.",
    trick:
      "An advocate gives their 'vocals' (voice) to a cause — 'voc' means voice.",
    story:
      "For thirty years she advocated for cleaner rivers, and on the day the last factory pipe ran dry, the town named the bridge after her.",
    examples: [
      "He advocates a healthier school lunch menu.",
      "She is a passionate advocate for animal welfare.",
    ],
    olevel:
      "While some advocate stricter rules, I would argue that trust, not fear, is what truly changes behaviour.",
    collocations: [
      "advocate for",
      "strongly advocate",
      "leading advocate",
    ],
    phrases: ["speak up for", "stand up for"],
    quiz: {
      prompt: "To advocate a cause means to…",
      options: [
        "publicly support it",
        "secretly oppose it",
        "completely ignore it",
        "make fun of it",
      ],
      answer: 0,
      explain: "To advocate is to speak up in support of something.",
    },
    motif: "📣",
  },

  // ── TRAVEL ──────────────────────────────────────────────────────────────
  {
    id: "expedition",
    word: "expedition",
    pronunciation: "ek-spuh-DISH-uhn",
    ipa: "/ˌɛkspəˈdɪʃən/",
    class: "noun",
    difficulty: 2,
    rarity: "uncommon",
    room: "travel",
    meaning: "an organised journey made for a particular purpose, like exploring.",
    synonyms: ["journey", "voyage", "quest", "trek"],
    antonyms: ["stay", "rest"],
    mistake:
      "An expedition has a purpose and organisation — it's more than a casual trip.",
    trick:
      "You 'expedite' (speed up) a mission — an expedition is a mission with a goal.",
    story:
      "They packed for weeks: the expedition to the frozen cave would take twelve days, and the mountain forgave no one who arrived unprepared.",
    examples: [
      "The expedition to the South Pole took months.",
      "We went on a shopping expedition before the holidays.",
    ],
    olevel:
      "What began as a simple expedition became a test of character, each hardship stripping away the boys' pretences one by one.",
    collocations: [
      "mount an expedition",
      "scientific expedition",
      "polar expedition",
    ],
    phrases: ["set out on an expedition"],
    quiz: {
      prompt: "An expedition is…",
      options: [
        "an organised journey with a purpose",
        "a short nap",
        "a type of meal",
        "an argument",
      ],
      answer: 0,
      explain: "An expedition is a purposeful, organised journey.",
    },
    motif: "🗺️",
  },
  {
    id: "meander",
    word: "meander",
    pronunciation: "mee-AN-der",
    ipa: "/miˈændə/",
    class: "verb",
    difficulty: 4,
    rarity: "epic",
    room: "travel",
    meaning: "to wander slowly and without a direct route or clear purpose.",
    synonyms: ["wander", "ramble", "roam", "wind"],
    antonyms: ["rush", "hurry", "beeline"],
    mistake:
      "Rivers meander (curve gently), and so can people and conversations. It suggests relaxed, curving movement.",
    trick:
      "The Menderes river in Turkey twisted so much it gave us the word. Meander = move like a lazy river.",
    story:
      "With no train to catch, they let themselves meander through the old town, turning down whichever alley looked most inviting.",
    examples: [
      "The stream meandered through the meadow.",
      "We meandered along the beach as the sun set.",
    ],
    olevel:
      "The narrative deliberately meanders, its gentle detours mirroring a childhood summer in which time itself seemed to slow.",
    collocations: [
      "meander through",
      "meandering river",
      "meander along",
    ],
    phrases: ["take the scenic route"],
    quiz: {
      prompt: "To meander is to…",
      options: [
        "wander slowly and indirectly",
        "run in a straight line",
        "stand perfectly still",
        "climb quickly upward",
      ],
      answer: 0,
      explain: "Meander means to wind or wander without hurry.",
    },
    motif: "🏞️",
  },
  {
    id: "treacherous",
    word: "treacherous",
    pronunciation: "TRECH-er-uhs",
    ipa: "/ˈtrɛtʃərəs/",
    class: "adjective",
    difficulty: 3,
    rarity: "rare",
    room: "travel",
    meaning: "dangerous and unreliable; hiding hidden hazards.",
    synonyms: ["dangerous", "perilous", "hazardous", "deceptive"],
    antonyms: ["safe", "secure", "reliable"],
    mistake:
      "It has two senses: physically dangerous (treacherous roads) and disloyal (a treacherous friend who betrays you).",
    trick:
      "A 'traitor' is treacherous — both hide danger where you expected safety.",
    story:
      "The path looked gentle enough, but the guide warned them: beneath the fresh snow lay treacherous ice, and one wrong step meant the ravine.",
    examples: [
      "The mountain roads were treacherous after the rain.",
      "He was betrayed by a treacherous ally.",
    ],
    olevel:
      "The calm sea proved treacherous, and the writer uses its sudden fury to remind us how quickly comfort can turn to catastrophe.",
    collocations: [
      "treacherous conditions",
      "treacherous waters",
      "treacherous terrain",
    ],
    phrases: ["a wolf in sheep's clothing"],
    quiz: {
      prompt: "A treacherous path is…",
      options: [
        "dangerous, with hidden hazards",
        "flat and completely safe",
        "brightly lit and wide",
        "short and easy",
      ],
      answer: 0,
      explain: "Treacherous means dangerous and deceptively unsafe.",
    },
    motif: "🌊",
  },
  {
    id: "nomadic",
    word: "nomadic",
    pronunciation: "noh-MAD-ik",
    ipa: "/nəʊˈmædɪk/",
    class: "adjective",
    difficulty: 4,
    rarity: "epic",
    room: "travel",
    meaning:
      "roaming from place to place instead of settling in one home.",
    synonyms: ["wandering", "roaming", "itinerant", "migratory"],
    antonyms: ["settled", "sedentary", "rooted"],
    mistake:
      "Nomadic describes a way of life of constant moving, not a single trip.",
    trick:
      "A 'nomad' has 'no mad' rush to settle — home is wherever the tent goes up tonight.",
    story:
      "The family lived a nomadic life, following the herds across the plains; the children could name every star but had never seen a front door.",
    examples: [
      "Some tribes still lead a nomadic existence.",
      "His job gave him an almost nomadic lifestyle.",
    ],
    olevel:
      "The novel romanticises a nomadic freedom, yet quietly counts its cost: a life of movement is also a life without roots.",
    collocations: [
      "nomadic lifestyle",
      "nomadic tribe",
      "nomadic existence",
    ],
    phrases: ["a wandering life"],
    quiz: {
      prompt: "A nomadic people are those who…",
      options: [
        "move from place to place",
        "never leave one city",
        "live entirely underground",
        "refuse to travel",
      ],
      answer: 0,
      explain: "Nomadic means roaming rather than settled.",
    },
    motif: "🐫",
  },
  {
    id: "serendipity",
    word: "serendipity",
    pronunciation: "ser-uhn-DIP-ih-tee",
    ipa: "/ˌsɛrənˈdɪpɪti/",
    class: "noun",
    difficulty: 5,
    rarity: "mythical",
    room: "travel",
    meaning:
      "the happy chance of finding something good when you weren't looking for it.",
    synonyms: ["chance", "fortune", "luck", "fluke"],
    antonyms: ["misfortune", "design", "intention"],
    mistake:
      "Serendipity is lucky *accident*. If you planned it, it isn't serendipity.",
    trick:
      "From an old tale, 'The Three Princes of Serendip', who kept stumbling on wonderful things by accident.",
    story:
      "She missed her train, wandered into the wrong café, and there — pure serendipity — sat the stranger who would become her closest friend.",
    examples: [
      "By sheer serendipity, we found the perfect house.",
      "Many great inventions were the result of serendipity.",
    ],
    olevel:
      "It was serendipity, not skill, that led the scientist to her discovery — proof that fortune often favours the curious.",
    collocations: [
      "pure serendipity",
      "happy serendipity",
      "by serendipity",
    ],
    phrases: ["a happy accident", "a stroke of luck"],
    quiz: {
      prompt: "Serendipity is…",
      options: [
        "a lucky, unexpected discovery",
        "a carefully made plan",
        "a serious mistake",
        "a long illness",
      ],
      answer: 0,
      explain: "Serendipity is finding good things by happy chance.",
    },
    motif: "🍀",
  },

  // ── RELATIONSHIPS ───────────────────────────────────────────────────────
  {
    id: "empathy",
    word: "empathy",
    pronunciation: "EM-puh-thee",
    ipa: "/ˈɛmpəθi/",
    class: "noun",
    difficulty: 3,
    rarity: "rare",
    room: "relationships",
    meaning:
      "the ability to understand and share another person's feelings.",
    synonyms: ["compassion", "understanding", "fellow-feeling", "sensitivity"],
    antonyms: ["indifference", "coldness", "apathy"],
    mistake:
      "Empathy is *feeling with* someone; sympathy is *feeling sorry for* them. Empathy goes deeper.",
    trick:
      "'Em-' (in) + 'path' (feeling) → to step into someone's feelings, as if into their shoes.",
    story:
      "She didn't offer advice or pity. She simply sat beside him in the dark — and that quiet empathy said more than any words could.",
    examples: [
      "Good nurses treat patients with empathy.",
      "Reading fiction can build empathy for others.",
    ],
    olevel:
      "The author's great gift is empathy: she makes us feel the loneliness of a character we might, in real life, have walked straight past.",
    collocations: [
      "show empathy",
      "a sense of empathy",
      "empathy for others",
    ],
    phrases: ["put yourself in someone's shoes"],
    quiz: {
      prompt: "Empathy is the ability to…",
      options: [
        "understand and share others' feelings",
        "ignore how others feel",
        "win every argument",
        "remember lots of facts",
      ],
      answer: 0,
      explain: "Empathy is sharing in another's feelings.",
    },
    motif: "💗",
  },
  {
    id: "rapport",
    word: "rapport",
    pronunciation: "ra-POR",
    ipa: "/ræˈpɔː/",
    class: "noun",
    difficulty: 4,
    rarity: "epic",
    room: "relationships",
    meaning:
      "a friendly, understanding connection between people.",
    synonyms: ["connection", "bond", "understanding", "chemistry"],
    antonyms: ["discord", "friction", "estrangement"],
    mistake:
      "The final 't' is silent: say 'ra-POR'. You build rapport 'with' someone.",
    trick:
      "Rapport 'reports' feelings smoothly between two people — a bridge of easy understanding.",
    story:
      "Within minutes the interviewer and student had struck up an easy rapport, laughing at the same jokes as though they were old friends.",
    examples: [
      "A good teacher builds rapport with the class.",
      "The two leaders quickly established a warm rapport.",
    ],
    olevel:
      "The instant rapport between the two strangers, built on nothing but a shared umbrella, becomes the quiet heart of the story.",
    collocations: [
      "build rapport",
      "establish rapport",
      "instant rapport",
    ],
    phrases: ["hit it off", "on the same wavelength"],
    quiz: {
      prompt: "To have rapport with someone means to…",
      options: [
        "share an easy, friendly connection",
        "constantly argue with them",
        "have never met them",
        "compete against them",
      ],
      answer: 0,
      explain: "Rapport is a warm, mutual understanding.",
    },
    motif: "🫱",
  },
  {
    id: "estranged",
    word: "estranged",
    pronunciation: "ih-STRAYNJD",
    ipa: "/ɪˈstreɪndʒd/",
    class: "adjective",
    difficulty: 4,
    rarity: "epic",
    room: "relationships",
    meaning:
      "no longer close to someone you were once close to; separated by conflict.",
    synonyms: ["alienated", "separated", "distant", "divided"],
    antonyms: ["reconciled", "close", "united"],
    mistake:
      "Estranged people were once close — that's what makes it sad. It isn't just any stranger.",
    trick:
      "A once-loved person becomes a 'stranger' again → e-STRANGE-d.",
    story:
      "They had been estranged for a decade, but when the phone finally rang on New Year's Eve, neither of them said a word about the years between.",
    examples: [
      "He was estranged from his family for years.",
      "The estranged couple met only to sign papers.",
    ],
    olevel:
      "The story traces how a single careless word left father and son estranged, each too proud to make the call that both longed for.",
    collocations: [
      "estranged from",
      "estranged family",
      "become estranged",
    ],
    phrases: ["drift apart", "grow apart"],
    quiz: {
      prompt: "Two estranged siblings are…",
      options: [
        "no longer close after a falling-out",
        "closer than ever",
        "identical twins",
        "meeting for the first time",
      ],
      answer: 0,
      explain: "Estranged means separated from someone once close.",
    },
    motif: "💔",
  },
  {
    id: "devoted",
    word: "devoted",
    pronunciation: "dih-VOH-tid",
    ipa: "/dɪˈvəʊtɪd/",
    class: "adjective",
    difficulty: 2,
    rarity: "uncommon",
    room: "relationships",
    meaning:
      "very loving and loyal; giving a lot of time and energy to someone or something.",
    synonyms: ["dedicated", "loyal", "faithful", "committed"],
    antonyms: ["disloyal", "indifferent", "unfaithful"],
    mistake:
      "You are devoted 'to' someone or something. It suggests warmth and loyalty, not mere duty.",
    trick:
      "You 'vote' again and again for the one you love → de-VOTE-d, always choosing them.",
    story:
      "The old dog waited at the gate every evening, devoted to a boy who was now grown and far away, yet who it never once forgot.",
    examples: [
      "She is a devoted mother of three.",
      "He remained devoted to his craft for fifty years.",
    ],
    olevel:
      "The most moving figure in the novel is the devoted servant, whose quiet loyalty outshines the grand gestures of his masters.",
    collocations: [
      "devoted to",
      "devoted fan",
      "devoted friend",
    ],
    phrases: ["through thick and thin"],
    quiz: {
      prompt: "A devoted friend is one who is…",
      options: [
        "loyal and dedicated",
        "cold and distant",
        "brand new to you",
        "always leaving",
      ],
      answer: 0,
      explain: "Devoted means loving, loyal and committed.",
    },
    motif: "🔗",
  },

  // ── TECHNOLOGY ──────────────────────────────────────────────────────────
  {
    id: "innovative",
    word: "innovative",
    pronunciation: "IN-uh-vay-tiv",
    ipa: "/ˈɪnəveɪtɪv/",
    class: "adjective",
    difficulty: 3,
    rarity: "rare",
    room: "technology",
    meaning: "featuring new ideas; original and inventive.",
    synonyms: ["inventive", "original", "groundbreaking", "creative"],
    antonyms: ["conventional", "outdated", "unoriginal"],
    mistake:
      "Innovative means genuinely new, not just modern or expensive.",
    trick:
      "'Nova' means new (a nova is a new-born star) — innovative ideas are brand-new lights.",
    story:
      "Her innovative little device turned rainwater into drinking water, and villages that had walked miles for a well suddenly had one on the roof.",
    examples: [
      "The company is famous for its innovative designs.",
      "Teachers are trying innovative ways to keep pupils engaged.",
    ],
    olevel:
      "An innovative solution need not be complicated; often the boldest ideas are also the simplest, hiding in plain sight.",
    collocations: [
      "innovative approach",
      "highly innovative",
      "innovative technology",
    ],
    phrases: ["think outside the box", "ahead of its time"],
    quiz: {
      prompt: "Something innovative is…",
      options: [
        "new and inventive",
        "old and worn out",
        "boring and ordinary",
        "broken and useless",
      ],
      answer: 0,
      explain: "Innovative means featuring original new ideas.",
    },
    motif: "💡",
  },
  {
    id: "obsolete",
    word: "obsolete",
    pronunciation: "OB-suh-leet",
    ipa: "/ˈɒbsəliːt/",
    class: "adjective",
    difficulty: 3,
    rarity: "rare",
    room: "technology",
    meaning: "no longer used or useful because something better has replaced it.",
    synonyms: ["outdated", "outmoded", "old-fashioned", "defunct"],
    antonyms: ["current", "modern", "cutting-edge"],
    mistake:
      "Obsolete means replaced and out of use — stronger than merely 'old'. A vintage watch is old; a floppy disk is obsolete.",
    trick:
      "'Obsolete' sounds like 'absolute-ly done' — its time is absolutely over.",
    story:
      "The great machine had filled an entire hall; now, made obsolete by a chip the size of a fingernail, it gathered dust behind a velvet rope.",
    examples: [
      "Cassette tapes are now largely obsolete.",
      "New software can make old skills obsolete overnight.",
    ],
    olevel:
      "The writer warns that whole professions may become obsolete, urging us to prize adaptability over any single, perishable skill.",
    collocations: [
      "become obsolete",
      "rendered obsolete",
      "technologically obsolete",
    ],
    phrases: ["past its prime", "a thing of the past"],
    quiz: {
      prompt: "Something obsolete is…",
      options: [
        "no longer used because it's outdated",
        "brand new and popular",
        "extremely expensive",
        "hidden and secret",
      ],
      answer: 0,
      explain: "Obsolete means outdated and no longer in use.",
    },
    motif: "📟",
  },
  {
    id: "ubiquitous",
    word: "ubiquitous",
    pronunciation: "yoo-BIK-wih-tuhs",
    ipa: "/juːˈbɪkwɪtəs/",
    class: "adjective",
    difficulty: 5,
    rarity: "legendary",
    room: "technology",
    meaning: "seeming to be present everywhere at once.",
    synonyms: ["omnipresent", "everywhere", "pervasive", "universal"],
    antonyms: ["rare", "scarce", "absent"],
    mistake:
      "Ubiquitous means everywhere — not just common. Something ubiquitous is impossible to avoid.",
    trick:
      "'You-be-quick-to-us' — ubiquitous things reach you quickly, wherever you are.",
    story:
      "In a single decade the little glowing screens had become ubiquitous: on every wrist, in every pocket, glowing on faces in the dark of every train.",
    examples: [
      "Smartphones have become ubiquitous.",
      "Coffee shops are now ubiquitous in the city.",
    ],
    olevel:
      "Advertising is so ubiquitous that we scarcely notice it, and it is precisely this invisibility, the essay argues, that gives it such power.",
    collocations: [
      "ubiquitous presence",
      "become ubiquitous",
      "almost ubiquitous",
    ],
    phrases: ["everywhere you look"],
    quiz: {
      prompt: "Something ubiquitous is…",
      options: [
        "found everywhere",
        "very hard to find",
        "completely invisible",
        "only found once",
      ],
      answer: 0,
      explain: "Ubiquitous means present everywhere.",
    },
    motif: "🌐",
  },
  {
    id: "streamline",
    word: "streamline",
    pronunciation: "STREEM-lyne",
    ipa: "/ˈstriːmlaɪn/",
    class: "verb",
    difficulty: 3,
    rarity: "rare",
    room: "technology",
    meaning:
      "to make a process simpler, smoother and more efficient.",
    synonyms: ["simplify", "optimise", "rationalise", "smooth"],
    antonyms: ["complicate", "clog", "hamper"],
    mistake:
      "Streamline means remove the clutter that slows things down, not just 'speed up' by force.",
    trick:
      "A fish is streamlined so water flows past it — streamline a task so work flows without drag.",
    story:
      "The new manager streamlined the whole system: three confusing forms became one, and a queue that once took an hour melted to ten minutes.",
    examples: [
      "The app streamlines the whole booking process.",
      "We streamlined production to cut waste.",
    ],
    olevel:
      "Technology, at its best, streamlines the dull machinery of daily life, freeing our hours for the things that truly matter.",
    collocations: [
      "streamline the process",
      "streamline operations",
      "help streamline",
    ],
    phrases: ["cut out the middleman", "trim the fat"],
    quiz: {
      prompt: "To streamline a process is to…",
      options: [
        "make it simpler and more efficient",
        "make it slower and harder",
        "add lots of extra steps",
        "stop it completely",
      ],
      answer: 0,
      explain: "Streamline means to simplify for efficiency.",
    },
    motif: "🛠️",
  },

  // ── EDUCATION ───────────────────────────────────────────────────────────
  {
    id: "eloquent",
    word: "eloquent",
    pronunciation: "EL-uh-kwuhnt",
    ipa: "/ˈɛləkwənt/",
    class: "adjective",
    difficulty: 4,
    rarity: "epic",
    room: "education",
    meaning: "speaking or writing fluently, clearly and persuasively.",
    synonyms: ["articulate", "expressive", "persuasive", "silver-tongued"],
    antonyms: ["inarticulate", "tongue-tied", "halting"],
    mistake:
      "Eloquent is about speaking beautifully and persuasively — not merely speaking a lot.",
    trick:
      "'E-' (out) + 'loqu' (speak, as in 'loquacious') → words that flow beautifully out.",
    story:
      "He had been too shy to raise his hand for years; yet when he finally stood, his speech was so eloquent that the hall fell utterly silent.",
    examples: [
      "She gave an eloquent speech that moved the audience to tears.",
      "His eloquent letter changed the committee's mind.",
    ],
    olevel:
      "An eloquent argument does not shout; it persuades quietly, choosing each word so well that disagreement begins to feel unreasonable.",
    collocations: [
      "eloquent speech",
      "eloquent plea",
      "remarkably eloquent",
    ],
    phrases: ["a way with words"],
    quiz: {
      prompt: "An eloquent speaker is one who…",
      options: [
        "expresses ideas fluently and persuasively",
        "mumbles and confuses everyone",
        "refuses to speak",
        "speaks only in numbers",
      ],
      answer: 0,
      explain: "Eloquent means fluent, clear and persuasive.",
    },
    motif: "🗣️",
  },
  {
    id: "profound",
    word: "profound",
    pronunciation: "pruh-FOWND",
    ipa: "/prəˈfaʊnd/",
    class: "adjective",
    difficulty: 4,
    rarity: "epic",
    room: "education",
    meaning: "very deep, either in thought/meaning or in intensity.",
    synonyms: ["deep", "meaningful", "weighty", "far-reaching"],
    antonyms: ["shallow", "superficial", "trivial"],
    mistake:
      "Profound means deep in meaning or effect — not simply 'a lot'. A profound silence is a deep, heavy one.",
    trick:
      "'Pro-' (forward) + 'found' (bottom) → reaching far down to the bottom. Profound ideas go deep.",
    story:
      "The lesson lasted only a minute, but it had a profound effect on her: forty years on, she could still hear those few quiet words.",
    examples: [
      "The book had a profound impact on my thinking.",
      "There was a profound silence after the news.",
    ],
    olevel:
      "Beneath its simple plot lies a profound meditation on grief, one that lingers long after the final page is turned.",
    collocations: [
      "profound impact",
      "profound effect",
      "profound sense of",
    ],
    phrases: ["food for thought"],
    quiz: {
      prompt: "A profound effect is one that is…",
      options: [
        "very deep and far-reaching",
        "small and forgettable",
        "brief and shallow",
        "purely physical",
      ],
      answer: 0,
      explain: "Profound means deep in meaning or intensity.",
    },
    motif: "🌌",
  },
  {
    id: "articulate",
    word: "articulate",
    pronunciation: "ar-TIK-yuh-layt (verb) · ar-TIK-yuh-lit (adj)",
    ipa: "/ɑːˈtɪkjʊleɪt/",
    class: "verb",
    difficulty: 3,
    rarity: "rare",
    room: "education",
    meaning: "to express an idea clearly in words; (adj) able to do so.",
    synonyms: ["express", "voice", "put into words", "convey"],
    antonyms: ["mumble", "garble", "stammer"],
    mistake:
      "Verb (express) is 'ar-TIK-yuh-layt'; adjective (well-spoken) is 'ar-TIK-yuh-lit'. Same spelling, different endings.",
    trick:
      "Your joints are 'articulated' (jointed); to articulate is to fit words together, joint by joint.",
    story:
      "She felt the answer clearly but could not articulate it — until, taking a slow breath, the words finally lined up and marched out in order.",
    examples: [
      "He struggled to articulate exactly what he felt.",
      "She is a bright, articulate young woman.",
    ],
    olevel:
      "The essay's strength is not its ideas alone but the writer's power to articulate them, turning a vague unease into a sharp, clear argument.",
    collocations: [
      "articulate an idea",
      "clearly articulate",
      "articulate speaker",
    ],
    phrases: ["put into words", "find the words"],
    quiz: {
      prompt: "To articulate a thought is to…",
      options: [
        "express it clearly in words",
        "keep it completely secret",
        "forget it entirely",
        "shout it angrily",
      ],
      answer: 0,
      explain: "Articulate means to express ideas clearly.",
    },
    motif: "✍️",
  },
  {
    id: "inquisitive",
    word: "inquisitive",
    pronunciation: "in-KWIZ-ih-tiv",
    ipa: "/ɪnˈkwɪzɪtɪv/",
    class: "adjective",
    difficulty: 3,
    rarity: "rare",
    room: "education",
    meaning: "eager to learn by asking questions and exploring; curious.",
    synonyms: ["curious", "questioning", "inquiring", "probing"],
    antonyms: ["indifferent", "incurious", "uninterested"],
    mistake:
      "Inquisitive is usually a good thing (keen to learn), though it can also mean nosy about others' business.",
    trick:
      "It shares a root with 'inquiry' and 'question' (quis) — an inquisitive mind is full of questions.",
    story:
      "The inquisitive child asked 'why?' so many times that the tired old professor finally admitted, with a laugh, that he had no idea — and went to find out.",
    examples: [
      "She had a bright, inquisitive mind.",
      "The kitten was far too inquisitive for its own good.",
    ],
    olevel:
      "Curiosity is the engine of learning; an inquisitive student, forever asking why, will outrun a merely obedient one every time.",
    collocations: [
      "inquisitive mind",
      "inquisitive nature",
      "naturally inquisitive",
    ],
    phrases: ["a thirst for knowledge"],
    quiz: {
      prompt: "An inquisitive student is one who is…",
      options: [
        "eager to ask questions and learn",
        "bored by everything",
        "afraid to learn anything",
        "only interested in sleep",
      ],
      answer: 0,
      explain: "Inquisitive means curious and questioning.",
    },
    motif: "🔎",
  },
];

/** Fast lookup by id. */
export const WORD_BY_ID: Record<string, Word> = Object.fromEntries(
  WORDS.map((w) => [w.id, w])
);

export function getWord(id: string): Word | undefined {
  return WORD_BY_ID[id];
}

export function wordsInRoom(room: string): Word[] {
  return WORDS.filter((w) => w.room === room);
}
