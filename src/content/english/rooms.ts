import type { Room } from "./types";

/**
 * The halls of the Lexicon.
 *
 * Each hall is a vocabulary theme with its own palette and mood. Scattered
 * through every hall are discoverable objects — click one and a word treasure
 * is revealed. Object positions (x, y) are percentages within the scene.
 */
export const ROOMS: Room[] = [
  {
    id: "nature",
    name: "The Conservatory of Wild Things",
    theme: "Nature",
    tagline: "Where the library breathes and the walls have taken root.",
    intro:
      "Ivy has crept in through cracked skylights and moss velvets the reading desks. Somewhere water is trickling. The words here are alive — you can almost feel them growing.",
    palette: "nature",
    motif: "🌿",
    mood: "Wild and breathing",
    objects: [
      { id: "n1", label: "a still, mossy pool", emoji: "🪷", hint: "The water has not rippled in a hundred years…", wordId: "serene", x: 22, y: 62 },
      { id: "n2", label: "a trampled seedling", emoji: "🌱", hint: "Crushed twice, yet somehow standing…", wordId: "resilient", x: 68, y: 70 },
      { id: "n3", label: "a jar of grey dust", emoji: "🏺", hint: "Nothing has grown in it for an age…", wordId: "barren", x: 44, y: 34 },
      { id: "n4", label: "a glowing green valley in a painting", emoji: "🖼️", hint: "So green it seems to shine…", wordId: "verdant", x: 80, y: 40 },
      { id: "n5", label: "a butterfly pinned mid-flight", emoji: "🦋", hint: "Beautiful — and gone almost before you look…", wordId: "ephemeral", x: 14, y: 30 },
      { id: "n6", label: "a waterfall bursting through the ceiling", emoji: "🌧️", hint: "The rain here does not fall — it pours…", wordId: "torrential", x: 86, y: 78 },
    ],
  },
  {
    id: "emotion",
    name: "The Gallery of Feeling",
    theme: "Emotion",
    tagline: "Every portrait here is wearing a different heart.",
    intro:
      "Masks line the walls, each frozen in a feeling. A single candle throws shifting expressions across them. Stand still long enough and you begin to feel what they feel.",
    palette: "emotion",
    motif: "🎭",
    mood: "The colour of feeling",
    objects: [
      { id: "e1", label: "a balloon straining upward", emoji: "🎈", hint: "Something here is lighter than joy itself…", wordId: "elated", x: 74, y: 30 },
      { id: "e2", label: "rain against a dark window", emoji: "🌧️", hint: "A soft, thoughtful kind of sadness…", wordId: "melancholy", x: 24, y: 44 },
      { id: "e3", label: "a clock outside an exam hall", emoji: "🕰️", hint: "The hands crawl and the stomach tightens…", wordId: "apprehensive", x: 52, y: 66 },
      { id: "e4", label: "a faded childhood photograph", emoji: "🖼️", hint: "A gentle ache for what is gone…", wordId: "wistful", x: 82, y: 62 },
      { id: "e5", label: "a torn-up unfair verdict", emoji: "😤", hint: "Something here burns with wounded fairness…", wordId: "indignant", x: 15, y: 76 },
    ],
  },
  {
    id: "conflict",
    name: "The Hall of Clashing Shields",
    theme: "Conflict",
    tagline: "Old arguments still echo between these stone walls.",
    intro:
      "Cracked shields and broken treaties hang side by side. The air feels charged, as if a single wrong word could set the whole room alight. Tread carefully.",
    palette: "conflict",
    motif: "⚔️",
    mood: "Tension in the air",
    objects: [
      { id: "c1", label: "a snarling war mask", emoji: "😠", hint: "It looks ready to pick a fight with anyone…", wordId: "belligerent", x: 20, y: 40 },
      { id: "c2", label: "a bottle that hisses and steams", emoji: "🌋", hint: "One shake and it could erupt…", wordId: "volatile", x: 70, y: 34 },
      { id: "c3", label: "two hands meeting over a torn map", emoji: "🕊️", hint: "After all the fighting, a chance to mend…", wordId: "reconcile", x: 48, y: 68 },
      { id: "c4", label: "a lone chess piece across the board", emoji: "♟️", hint: "The one who stands against you…", wordId: "adversary", x: 82, y: 64 },
      { id: "c5", label: "a raised fist against a wall", emoji: "✊", hint: "It will not back down…", wordId: "defiant", x: 15, y: 74 },
    ],
  },
  {
    id: "success",
    name: "The Vault of Triumphs",
    theme: "Success",
    tagline: "Every trophy here was won the hard way.",
    intro:
      "Gold light spills over medals, laurels and worn climbing ropes. None of it was luck. Each object here remembers the long, quiet hours that earned it.",
    palette: "success",
    motif: "🏆",
    mood: "The summit calls",
    objects: [
      { id: "s1", label: "a beehive humming with work", emoji: "🐝", hint: "Never idle, always at the task…", wordId: "diligent", x: 24, y: 36 },
      { id: "s2", label: "a rope worn from many climbs", emoji: "🧗", hint: "It failed four times, and tried a fifth…", wordId: "perseverance", x: 66, y: 40 },
      { id: "s3", label: "a golden trophy still warm", emoji: "🏆", hint: "The roar of the crowd still clings to it…", wordId: "triumphant", x: 46, y: 66 },
      { id: "s4", label: "a watchmaker's eyeglass", emoji: "🔍", hint: "Every tiny detail, checked and checked again…", wordId: "meticulous", x: 82, y: 60 },
      { id: "s5", label: "ivy gripping the old stonework", emoji: "🦾", hint: "It simply refuses to let go…", wordId: "tenacious", x: 15, y: 74 },
    ],
  },
  {
    id: "failure",
    name: "The Chamber of Broken Things",
    theme: "Failure",
    tagline: "Not a sad place — a wise one. Every failure taught something.",
    intro:
      "Dust settles over abandoned inventions and torn-up plans. It is quiet here, almost gentle. Failure, the room seems to whisper, is only the beginning of understanding.",
    palette: "failure",
    motif: "🌫️",
    mood: "Lessons in the dust",
    objects: [
      { id: "f1", label: "a teacup bailing a sinking boat", emoji: "🕳️", hint: "No amount of effort could ever be enough…", wordId: "futile", x: 22, y: 42 },
      { id: "f2", label: "a purse with a hole in it", emoji: "💸", hint: "So much wasted, so carelessly…", wordId: "squander", x: 68, y: 38 },
      { id: "f3", label: "a cracked warning lantern", emoji: "⚠️", hint: "One wrong move puts everything at risk…", wordId: "jeopardise", x: 48, y: 66 },
      { id: "f4", label: "a chair with three legs", emoji: "🤦", hint: "Built with the best intentions, and no skill…", wordId: "inept", x: 82, y: 62 },
      { id: "f5", label: "a candle burned almost to nothing", emoji: "📉", hint: "Growing smaller by the hour…", wordId: "dwindle", x: 15, y: 74 },
    ],
  },
  {
    id: "science",
    name: "The Observatory of Wonders",
    theme: "Science",
    tagline: "Where curiosity is measured, tested and set free.",
    intro:
      "Brass instruments glint under a glass dome. Charts of stars and strange machines cover the walls. Everything here begins with the same small, dangerous question: what if?",
    palette: "science",
    motif: "🔬",
    mood: "Curiosity uncaged",
    objects: [
      { id: "sc1", label: "a bubbling flask marked with a '?'", emoji: "🧪", hint: "A guess, waiting to be tested…", wordId: "hypothesis", x: 22, y: 40 },
      { id: "sc2", label: "a chart of careful measurements", emoji: "📊", hint: "Not opinion — proof you can see…", wordId: "empirical", x: 70, y: 34 },
      { id: "sc3", label: "a spark leaping between two coils", emoji: "⚗️", hint: "One small thing sets everything moving…", wordId: "catalyst", x: 46, y: 68 },
      { id: "sc4", label: "a lake glowing electric blue", emoji: "🌠", hint: "A marvel no one can quite explain…", wordId: "phenomenon", x: 82, y: 62 },
      { id: "sc5", label: "a raised eyebrow over a 'miracle' bottle", emoji: "🤨", hint: "It believes nothing without proof…", wordId: "sceptical", x: 15, y: 74 },
      { id: "sc6", label: "a checklist run a hundred times over", emoji: "🔬", hint: "Nothing skipped, nothing assumed, everything tested…", wordId: "rigorous", x: 86, y: 78 },
    ],
  },
  {
    id: "politics",
    name: "The Senate of Whispers",
    theme: "Politics",
    tagline: "Here, the sharpest weapon has always been a well-chosen word.",
    intro:
      "Marble columns rise into shadow. Scales, ballot boxes and old speeches fill the room. Power moves quietly here — carried on persuasion, tact and the promises people keep.",
    palette: "politics",
    motif: "⚖️",
    mood: "Power and persuasion",
    objects: [
      { id: "p1", label: "a toolbox beside a broken throne", emoji: "🧩", hint: "Forget ideals — what will actually work?…", wordId: "pragmatic", x: 22, y: 40 },
      { id: "p2", label: "a folded top hat", emoji: "🎩", hint: "It knows how to say hard things gently…", wordId: "diplomatic", x: 70, y: 36 },
      { id: "p3", label: "a broken chain on a torch", emoji: "🗽", hint: "The sweet, hard-won right to rule oneself…", wordId: "autonomy", x: 46, y: 66 },
      { id: "p4", label: "a megaphone on a soapbox", emoji: "📣", hint: "A voice raised for a cause…", wordId: "advocate", x: 82, y: 60 },
      { id: "p5", label: "a show of every hand at once", emoji: "🗳️", hint: "Not one voice against…", wordId: "unanimous", x: 15, y: 74 },
    ],
  },
  {
    id: "travel",
    name: "The Cartographer's Landing",
    theme: "Travel",
    tagline: "Every map here is missing one road — the one you'll find yourself.",
    intro:
      "Rolled charts, a battered compass and a globe worn smooth by fingers. Salt is in the air. This room does not want you to stay; it wants you to go, and to come back changed.",
    palette: "travel",
    motif: "🧭",
    mood: "Beyond the horizon",
    objects: [
      { id: "t1", label: "a kit packed for a long journey", emoji: "🗺️", hint: "A journey with a purpose and a plan…", wordId: "expedition", x: 20, y: 40 },
      { id: "t2", label: "a river that refuses to run straight", emoji: "🏞️", hint: "It wanders, in no hurry at all…", wordId: "meander", x: 68, y: 34 },
      { id: "t3", label: "a calm sea with ice beneath", emoji: "🌊", hint: "It looks safe. It is not…", wordId: "treacherous", x: 46, y: 66 },
      { id: "t4", label: "a tent folded onto a camel", emoji: "🐫", hint: "Home is wherever tonight's fire is lit…", wordId: "nomadic", x: 80, y: 60 },
      { id: "t5", label: "a four-leaf clover in a missed train ticket", emoji: "🍀", hint: "You weren't even looking — and there it was…", wordId: "serendipity", x: 14, y: 66 },
      { id: "t6", label: "boots that have climbed every peak", emoji: "🧗", hint: "Fearless, and always first up the mountain…", wordId: "intrepid", x: 86, y: 78 },
    ],
  },
  {
    id: "relationships",
    name: "The Parlour of Bonds",
    theme: "Relationships",
    tagline: "The warmest room in the whole cold library.",
    intro:
      "A fire crackles. Two armchairs face each other, worn from long conversations. Letters, photographs and clasped-hand statues fill the shelves. Everything here is about connection.",
    palette: "relationships",
    motif: "🤝",
    mood: "Bonds and belonging",
    objects: [
      { id: "r1", label: "a pair of shoes turned toward you", emoji: "💗", hint: "To stand, for a moment, in another's place…", wordId: "empathy", x: 22, y: 42 },
      { id: "r2", label: "two cups sharing one saucer", emoji: "🫱", hint: "Strangers who suddenly feel like old friends…", wordId: "rapport", x: 68, y: 36 },
      { id: "r3", label: "a torn photograph, both halves kept", emoji: "💔", hint: "Once close, now far — and quietly missed…", wordId: "estranged", x: 46, y: 66 },
      { id: "r4", label: "a dog waiting at a gate", emoji: "🔗", hint: "Loyal through every season, asking nothing…", wordId: "devoted", x: 82, y: 62 },
      { id: "r5", label: "a fresh pot of tea for a guest", emoji: "🍵", hint: "A warm welcome, straight from the heart…", wordId: "cordial", x: 15, y: 74 },
      { id: "r6", label: "two rivals shaking hands, both smiling", emoji: "🕊️", hint: "They disagreed — and parted as friends…", wordId: "amicable", x: 86, y: 78 },
    ],
  },
  {
    id: "technology",
    name: "The Workshop of Tomorrow",
    theme: "Technology",
    tagline: "Gears from every century, all still turning.",
    intro:
      "Cogs mesh with glowing circuits. A machine the size of a wall hums beside a chip the size of a seed. Here the old and the new argue endlessly about what 'progress' really means.",
    palette: "technology",
    motif: "⚙️",
    mood: "The machine awakes",
    objects: [
      { id: "te1", label: "a lamp shaped like a new-born star", emoji: "💡", hint: "A brand-new idea, glowing…", wordId: "innovative", x: 22, y: 40 },
      { id: "te2", label: "a dusty machine behind velvet rope", emoji: "📟", hint: "Once mighty, now utterly out of date…", wordId: "obsolete", x: 70, y: 34 },
      { id: "te3", label: "a screen glowing on every wall", emoji: "🌐", hint: "It is everywhere you turn…", wordId: "ubiquitous", x: 46, y: 68 },
      { id: "te4", label: "three tangled pipes merged into one", emoji: "🛠️", hint: "Cut the clutter; let the work flow…", wordId: "streamline", x: 82, y: 60 },
      { id: "te5", label: "a device unlocked at the first touch", emoji: "👆", hint: "No manual, no lessons — you simply knew how…", wordId: "intuitive", x: 15, y: 74 },
    ],
  },
  {
    id: "education",
    name: "The Scriptorium",
    theme: "Education",
    tagline: "The oldest, deepest hall — where the Lexicon began.",
    intro:
      "Quills rest in dried inkwells beside towers of manuscripts. This is where words are not just kept but sharpened into thought. The finest treasures in the library wait here.",
    palette: "education",
    motif: "📜",
    mood: "The mind sharpened",
    objects: [
      { id: "ed1", label: "a podium worn smooth by great speakers", emoji: "🗣️", hint: "Words that flow, and win every heart…", wordId: "eloquent", x: 22, y: 40 },
      { id: "ed2", label: "a well with no visible bottom", emoji: "🌌", hint: "Ideas that reach all the way down…", wordId: "profound", x: 70, y: 36 },
      { id: "ed3", label: "an inkwell mid-sentence", emoji: "✍️", hint: "The knack of finding exactly the right words…", wordId: "articulate", x: 46, y: 66 },
      { id: "ed4", label: "a child's endless list of 'why?'", emoji: "🔎", hint: "A mind that will not stop asking…", wordId: "inquisitive", x: 82, y: 62 },
      { id: "ed5", label: "scattered notes ordered into one clear thread", emoji: "🧩", hint: "Every part fits together…", wordId: "coherent", x: 15, y: 74 },
      { id: "ed6", label: "an owl reading between the lines", emoji: "🦉", hint: "It sees at once what everyone else missed…", wordId: "astute", x: 86, y: 78 },
    ],
  },
];

/** Fast lookup by id. */
export const ROOM_BY_ID: Record<string, Room> = Object.fromEntries(
  ROOMS.map((r) => [r.id, r])
);

export function getRoom(id: string): Room | undefined {
  return ROOM_BY_ID[id];
}
