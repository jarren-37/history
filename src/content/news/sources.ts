/**
 * The Gazette's trusted newsrooms.
 *
 * Every story in the feed is fetched live (server-side) from these outlets' own
 * RSS feeds and links straight back to the original article — nothing is
 * rewritten or invented. To show live news, the app's environment must be able
 * to reach these hosts; add them to your network egress allow-list if needed:
 *
 *   www.straitstimes.com, www.channelnewsasia.com, feeds.bbci.co.uk,
 *   www.theguardian.com, www.aljazeera.com
 *
 * Feed URLs occasionally change; a feed that 404s is simply skipped, and the
 * others still load. Add, remove or reorder outlets here.
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
      { url: "https://www.straitstimes.com/news/singapore/rss.xml", category: "Singapore" },
      { url: "https://www.straitstimes.com/news/asia/rss.xml", category: "Asia" },
      { url: "https://www.straitstimes.com/news/world/rss.xml", category: "World" },
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
      { url: "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=10416", category: "Singapore" },
      { url: "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6511", category: "Asia" },
      { url: "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6311", category: "World" },
    ],
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
    accent: "#c70000",
    homepage: "https://www.theguardian.com",
    feeds: [{ url: "https://www.theguardian.com/world/rss", category: "World" }],
  },
  {
    key: "aljazeera",
    name: "Al Jazeera",
    short: "AJ",
    accent: "#fa9000",
    homepage: "https://www.aljazeera.com",
    feeds: [{ url: "https://www.aljazeera.com/xml/rss/all.xml", category: "World" }],
  },
];
