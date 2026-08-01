/** A single normalised story shown in The Gazette feed. */
export interface NewsItem {
  /** Stable id derived from the article URL. */
  id: string;
  title: string;
  /** Plain-text dek/summary (HTML stripped), may be empty. */
  summary: string;
  /** Canonical link to the full article on the source's own site. */
  url: string;
  /** Display name of the outlet, e.g. "The Straits Times". */
  source: string;
  /** Machine key of the outlet, e.g. "straits-times". */
  sourceKey: string;
  /** Short badge label, e.g. "ST". */
  sourceShort: string;
  /** Accent colour for the source. */
  accent: string;
  /** Section this came from, e.g. "Singapore", "World". */
  category: string;
  /** Lead image URL if the feed supplied one. */
  image?: string;
  /** Publication time in epoch milliseconds (0 if unknown). */
  publishedAt: number;
}

/** Shape returned by GET /api/news. */
export interface NewsResponse {
  /** True when at least one live story was fetched. */
  ok: boolean;
  items: NewsItem[];
  /** The outlets the feed draws from (for the empty state + legend). */
  sources: { key: string; name: string; short: string; accent: string; homepage: string }[];
  /** When the server assembled this response (epoch ms). */
  fetchedAt: number;
  /** Feed URLs that could not be reached or parsed. */
  failed: string[];
  /** Human-readable explanation when ok is false. */
  reason?: string;
}
