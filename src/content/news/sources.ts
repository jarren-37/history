/**
 * The Gazette's trusted newsrooms — tuned for an Asia-first feed.
 *
 * Every story is fetched live (server-side) from these outlets' own RSS feeds
 * and links straight back to the original article — nothing is rewritten or
 * invented. To show live news, the app's environment must be able to reach
 * these hosts; add them to your network egress allow-list if needed:
 *
 *   www.straitstimes.com, www.channelnewsasia.com, feeds.bbci.co.uk,
 *   asia.nikkei.com, www.scmp.com, www.theguardian.com, www.aljazeera.com
 *
 * Categories drive the feed's filter chips; the feed opens on "Asia". Feed URLs
 * occasionally change; a feed that 404s is simply skipped and the rest load.
 */
export interface FeedSource {
  key: string;
  name: string;
  /** Short label for the badge, e.g. "ST". */
  short: string;
  accent: string;
  homepage: string;
  feeds: { url: string; category: string }[];
  /** Cap on stories taken from this outlet per refresh. */
  perFeedCap?: number;
}

export const NEWS_SOURCES: FeedSource[] = [
  {
    key: "straits-times",
    name: "The Straits Times",
    short: "ST",
    accent: "#1f6feb",
    homepage: "https://www.straitstimes.com",
    feeds: [
      { url: "https://www.straitstimes.com/news/asia/rss.xml", category: "Asia" },
      { url: "https://www.straitstimes.com/news/singapore/rss.xml", category: "Singapore" },
      { url: "https://www.straitstimes.com/news/business/rss.xml", category: "Business" },
    ],
  },
  {
    key: "cna",
    name: "Channel NewsAsia",
    short: "CNA",
    accent: "#e0142d",
    homepage: "https://www.channelnewsasia.com",
    feeds: [
      { url: "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6511", category: "Asia" },
      { url: "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=10416", category: "Singapore" },
      { url: "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6936", category: "Business" },
    ],
  },
  {
    key: "nikkei",
    name: "Nikkei Asia",
    short: "NIK",
    accent: "#0b7d73",
    homepage: "https://asia.nikkei.com",
    feeds: [{ url: "https://asia.nikkei.com/rss/feed/nar", category: "Asia" }],
  },
  {
    key: "scmp",
    name: "South China Morning Post",
    short: "SCMP",
    accent: "#a67c00",
    homepage: "https://www.scmp.com",
    feeds: [{ url: "https://www.scmp.com/rss/91/feed", category: "Asia" }],
  },
  {
    key: "japan-times",
    name: "The Japan Times",
    short: "JT",
    accent: "#a83232",
    homepage: "https://www.japantimes.co.jp",
    feeds: [{ url: "https://www.japantimes.co.jp/feed/", category: "Asia" }],
    perFeedCap: 8,
  },
  {
    key: "yonhap",
    name: "Yonhap News",
    short: "YNA",
    accent: "#2f6fb0",
    homepage: "https://en.yna.co.kr",
    feeds: [{ url: "https://en.yna.co.kr/RSS/news.xml", category: "Asia" }],
    perFeedCap: 8,
  },
  {
    key: "the-hindu",
    name: "The Hindu",
    short: "TH",
    accent: "#9333ea",
    homepage: "https://www.thehindu.com",
    feeds: [{ url: "https://www.thehindu.com/news/international/feeder/default.rss", category: "Asia" }],
    perFeedCap: 8,
  },
  {
    key: "bbc",
    name: "BBC News",
    short: "BBC",
    accent: "#c8102e",
    homepage: "https://www.bbc.com/news",
    feeds: [
      { url: "https://feeds.bbci.co.uk/news/world/asia/rss.xml", category: "Asia" },
      { url: "https://feeds.bbci.co.uk/news/world/rss.xml", category: "World" },
    ],
  },
  {
    key: "guardian",
    name: "The Guardian",
    short: "GDN",
    accent: "#052962",
    homepage: "https://www.theguardian.com",
    feeds: [
      { url: "https://www.theguardian.com/world/asia-pacific/rss", category: "Asia" },
      { url: "https://www.theguardian.com/world/rss", category: "World" },
    ],
    perFeedCap: 8,
  },
  {
    key: "aljazeera",
    name: "Al Jazeera",
    short: "AJ",
    accent: "#fa9000",
    homepage: "https://www.aljazeera.com",
    feeds: [{ url: "https://www.aljazeera.com/xml/rss/all.xml", category: "World" }],
    perFeedCap: 6,
  },
];

/** Preferred order for the feed's category filter chips. */
export const CATEGORY_ORDER = ["Asia", "Singapore", "World", "Business"];
/** The category the feed opens on. */
export const DEFAULT_CATEGORY = "Asia";
