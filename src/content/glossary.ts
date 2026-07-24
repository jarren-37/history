/**
 * A glossary of key terms — the "textbook" layer. Any highlighted term in the
 * story that appears here becomes tappable, unfolding a definition popup.
 *
 * Definitions are written to stay strictly within the 2261 syllabus: short,
 * exam-useful, and factual. Keys are matched case-insensitively against the
 * highlighted phrases in the narration.
 */
export const GLOSSARY: Record<string, string> = {
  // ── World War Two: Europe ──────────────────────────────────────────────
  "Treaty of Versailles":
    "The peace treaty of 1919 that officially ended the First World War for Germany. Its harsh terms — reparations, the War Guilt Clause, loss of land and army limits — caused lasting German resentment.",
  reparations:
    "Payments Germany was forced to make for the damage of the First World War. The huge sum strained the German economy and deepened resentment at Versailles.",
  "War Guilt Clause":
    "The term of the Treaty of Versailles (Article 231) that forced Germany to accept sole blame for causing the First World War. Germans found this deeply humiliating.",
  diktat:
    "A 'dictated peace'. Germans used this word to protest that they were forced to sign the Treaty of Versailles without being allowed to negotiate.",
  "Rhineland":
    "The German region bordering France. Under Versailles it had to be kept free of German troops (demilitarised); Hitler sent troops back in in 1936, breaking the treaty.",
  "League of Nations":
    "An international organisation set up in 1920 to keep peace through collective security. It was weakened from the start — the USA never joined and it had no army — so it could not stop aggression.",
  "Big Three":
    "The three leaders who dominated the 1919 peace talks: Clemenceau (France), Wilson (USA) and Lloyd George (Britain). Their differing aims shaped the compromise that was Versailles.",
  "collective security":
    "The idea that nations act together against an aggressor so that no single country dares to attack. It was the League of Nations' central principle — but it failed without force to back it.",
  "Great Depression":
    "The severe worldwide economic slump that began in 1929. Mass unemployment and hardship made people desperate and helped extreme leaders like Hitler win support.",
  "Wall Street Crash":
    "The collapse of the US stock market in 1929 that triggered the Great Depression. Its effects spread worldwide, hitting Germany especially hard.",
  "Weimar Republic":
    "Germany's democratic government from 1919 to 1933. Blamed for accepting Versailles and weakened by economic crises, it lost support to extremists like the Nazis.",
  "Nazi Party":
    "The party led by Adolf Hitler. It promised to overturn Versailles, end unemployment and restore German pride, winning mass support during the Depression.",
  appeasement:
    "The policy of Britain and France in the 1930s of giving in to some of Hitler's demands to avoid another war. It failed when Hitler invaded Poland in 1939.",
  "Munich Agreement":
    "The 1938 agreement in which Britain and France let Germany take the Sudetenland, hoping to satisfy Hitler. It is the classic example of appeasement.",
  "Sudetenland":
    "The German-speaking border region of Czechoslovakia that Hitler demanded in 1938. Britain and France handed it over at Munich.",
  Anschluss:
    "The union of Germany and Austria in 1938, forbidden by the Treaty of Versailles. Hitler achieved it without resistance from Britain or France.",
  "Nazi-Soviet Pact":
    "The 1939 agreement between Germany and the USSR not to attack each other, with a secret plan to divide Poland. It cleared the way for Hitler to invade Poland.",

  // ── World War Two: Asia-Pacific ────────────────────────────────────────
  Manchuria:
    "A resource-rich region of northern China invaded by Japan in 1931. The League condemned it but could not act, exposing the League's weakness.",
  "Pearl Harbor":
    "The US naval base in Hawaii that Japan attacked by surprise in December 1941. The attack brought the USA fully into the Second World War.",
  militarism:
    "A belief that a country should build strong armed forces and use them to expand. Military leaders dominated Japan's government in the 1930s.",
  "oil embargo":
    "The US decision to cut off oil and other vital supplies to Japan to pressure it over its aggression in China. It pushed Japan to seize resources by force.",

  // ── The Cold War ───────────────────────────────────────────────────────
  "Cold War":
    "The period of hostility and rivalry between the USA and the USSR after 1945. The two never fought each other directly, but competed through alliances, propaganda, an arms race and proxy conflicts.",
  capitalism:
    "An economic system based on private business and free markets, supported by the USA. The opposite of the USSR's communist system.",
  communism:
    "A system of one-party rule and state control of the economy, followed by the USSR. Its rivalry with capitalism drove the Cold War.",
  democracy:
    "A system in which people choose their government through free elections, valued by the USA and the West.",
  "Yalta Conference":
    "The February 1945 meeting of Allied leaders (Roosevelt, Churchill, Stalin) to plan the post-war world. They agreed on some points but disagreed over Eastern Europe.",
  "Potsdam Conference":
    "The July 1945 meeting where, with new leaders and growing suspicion, disagreements between the USA and USSR over Germany and Eastern Europe deepened.",
  "Iron Curtain":
    "Churchill's 1946 phrase for the divide between the communist East and the democratic West of Europe.",
  containment:
    "The US policy of stopping the spread of communism, put into action through the Truman Doctrine and the Marshall Plan.",
  "Truman Doctrine":
    "The 1947 US pledge to support countries resisting communism. It committed the USA to containing Soviet influence.",
  "Marshall Plan":
    "US economic aid to rebuild Western Europe after the war. Prosperous countries were thought less likely to turn communist, so it was part of containment.",
  "Berlin Blockade":
    "Stalin's 1948 attempt to force the West out of Berlin by cutting off all land routes into West Berlin.",
  "Berlin Airlift":
    "The Western operation of 1948–49 that supplied West Berlin entirely by air for nearly a year until Stalin lifted the blockade.",
  NATO:
    "The North Atlantic Treaty Organisation, a Western defensive military alliance formed in 1949 to protect against the Soviet threat.",
  "Warsaw Pact":
    "The communist military alliance of the USSR and Eastern European states, formed in 1955 in response to NATO.",
  "Korean War":
    "The 1950–53 conflict in which the Cold War turned 'hot' as communist and Western-backed forces fought over Korea.",
  "Cuban Missile Crisis":
    "The 1962 confrontation when the USSR placed nuclear missiles in Cuba. After thirteen tense days, a deal removed them and avoided nuclear war.",
  "Bay of Pigs":
    "The failed 1961 US-backed invasion of Cuba. It pushed Castro closer to the USSR for protection.",
  quarantine:
    "The naval blockade Kennedy ordered around Cuba in 1962 to stop Soviet ships bringing more missiles, while leaving room to negotiate.",
  détente:
    "A relaxing of tension between the superpowers, encouraged after the fright of the Cuban Missile Crisis.",
  "arms race":
    "The competition between the USA and USSR to build ever more powerful weapons. Its huge cost strained the Soviet economy.",
  glasnost:
    "Gorbachev's policy of 'openness' in the USSR, allowing more freedom of speech and criticism.",
  perestroika:
    "Gorbachev's policy of 'restructuring' the struggling Soviet economy and system.",
  Solidarity:
    "The independent trade union movement in Poland that challenged communist rule, part of the wave that ended communism in Eastern Europe.",
  "Berlin Wall":
    "The barrier built in 1961 dividing East and West Berlin. Its opening in 1989 became the great symbol of the Cold War's end.",
};

/** Case-insensitive lookup of a glossary definition. */
export function lookupTerm(term: string): string | undefined {
  const key = Object.keys(GLOSSARY).find(
    (k) => k.toLowerCase() === term.toLowerCase().trim()
  );
  return key ? GLOSSARY[key] : undefined;
}
