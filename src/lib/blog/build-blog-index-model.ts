import type { BlogPostFrontmatter } from "@/domain/content/schemas";

export const BLOG_INDEX_PAGE1_LATEST = 12;
export const BLOG_INDEX_PAGE_SIZE = 24;

export interface BlogTopicDefinition {
  id: string;
  label: string;
  /** Lowercase category fragments that map into this bucket */
  matchers: string[];
}

export const BLOG_INDEX_TOPICS: BlogTopicDefinition[] = [
  {
    id: "ppc",
    label: "Amazon PPC",
    matchers: ["ppc", "advertising"],
  },
  {
    id: "seo",
    label: "Amazon SEO",
    matchers: ["seo", "ranking", "fba guide"],
  },
  {
    id: "account",
    label: "Account Management",
    matchers: ["account management", "full account"],
  },
  {
    id: "guides",
    label: "Guides",
    matchers: ["guide"],
  },
  {
    id: "market",
    label: "Market & News",
    matchers: [
      "market analysis",
      "news",
      "ecommerce news",
      "business strategy",
      "prime day",
    ],
  },
];

export interface BlogIndexTopicStack {
  id: string;
  label: string;
  posts: BlogPostFrontmatter[];
}

export interface BlogIndexModel {
  totalCount: number;
  sorted: BlogPostFrontmatter[];
  lead: BlogPostFrontmatter | null;
  secondary: BlogPostFrontmatter[];
  featuredSlugs: Set<string>;
  topics: BlogIndexTopicStack[];
  latestPool: BlogPostFrontmatter[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  latestVisible: BlogPostFrontmatter[];
  latestStartIndex: number;
  isFirstPage: boolean;
  /** Active search query (trimmed); empty when browsing normally */
  query: string;
  matchCount: number;
  isSearch: boolean;
}

function normalizeCategory(value: string): string {
  return value
    .replace(/&amp;/gi, "&")
    .toLowerCase()
    .trim();
}

function postMatchesTopic(
  post: BlogPostFrontmatter,
  topic: BlogTopicDefinition,
): boolean {
  const categories = post.categories.map(normalizeCategory);
  const haystack = categories.join(" | ");
  return topic.matchers.some((matcher) => haystack.includes(matcher));
}

function sortByPublishedDesc(
  posts: BlogPostFrontmatter[],
): BlogPostFrontmatter[] {
  return [...posts].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() -
      new Date(left.publishedAt).getTime(),
  );
}

function matchesQuery(post: BlogPostFrontmatter, query: string): boolean {
  const needle = query.toLowerCase();
  if (
    post.title.toLowerCase().includes(needle) ||
    post.excerpt.toLowerCase().includes(needle) ||
    post.slug.toLowerCase().includes(needle)
  ) {
    return true;
  }
  if (post.categories.some((category) => category.toLowerCase().includes(needle))) {
    return true;
  }
  if (post.tags.some((tag) => tag.toLowerCase().includes(needle))) {
    return true;
  }
  return false;
}

export function buildBlogIndexModel(
  posts: BlogPostFrontmatter[],
  pageParam?: string,
  queryParam?: string,
): BlogIndexModel {
  const sorted = sortByPublishedDesc(posts);
  const totalCount = sorted.length;
  const query = (queryParam ?? "").trim();
  const isSearch = query.length > 0;

  const lead = sorted[0] ?? null;
  // Four secondary stories keep the featured rail height balanced with the lead.
  const secondary = sorted.slice(1, 5);
  const featuredSlugs = new Set(
    [lead, ...secondary].filter(Boolean).map((post) => post!.slug),
  );

  const topics: BlogIndexTopicStack[] = [];
  for (const topic of BLOG_INDEX_TOPICS) {
    const matched = sorted
      .filter((post) => !featuredSlugs.has(post.slug))
      .filter((post) => postMatchesTopic(post, topic))
      .slice(0, 4);
    if (matched.length > 0) {
      topics.push({
        id: topic.id,
        label: topic.label,
        posts: matched,
      });
    }
  }

  const latestPool = isSearch
    ? sorted.filter((post) => matchesQuery(post, query))
    : sorted.filter((post) => !featuredSlugs.has(post.slug));
  const matchCount = latestPool.length;

  const requestedPage = Number.parseInt(pageParam ?? "1", 10);
  const safeRequested = Number.isFinite(requestedPage) ? requestedPage : 1;

  let totalPages: number;
  let currentPage: number;
  let isFirstPage: boolean;
  let latestVisible: BlogPostFrontmatter[];
  let latestStartIndex: number;
  let pageSize: number;

  if (isSearch) {
    pageSize = BLOG_INDEX_PAGE_SIZE;
    totalPages = Math.max(1, Math.ceil(latestPool.length / pageSize) || 1);
    currentPage = Math.min(Math.max(1, safeRequested), totalPages);
    isFirstPage = false;
    latestStartIndex = (currentPage - 1) * pageSize;
    latestVisible = latestPool.slice(
      latestStartIndex,
      latestStartIndex + pageSize,
    );
  } else {
    // Page 1 uses a smaller latest slice; later pages use full page size.
    const page1Size = BLOG_INDEX_PAGE1_LATEST;
    const laterSize = BLOG_INDEX_PAGE_SIZE;
    const remainingAfterPage1 = Math.max(0, latestPool.length - page1Size);
    const laterPages = Math.ceil(remainingAfterPage1 / laterSize);
    totalPages = Math.max(1, 1 + laterPages);
    currentPage = Math.min(Math.max(1, safeRequested), totalPages);
    isFirstPage = currentPage === 1;

    if (isFirstPage) {
      pageSize = page1Size;
      latestStartIndex = 0;
      latestVisible = latestPool.slice(0, page1Size);
    } else {
      pageSize = laterSize;
      latestStartIndex = page1Size + (currentPage - 2) * laterSize;
      latestVisible = latestPool.slice(
        latestStartIndex,
        latestStartIndex + laterSize,
      );
    }
  }

  return {
    totalCount,
    sorted,
    lead,
    secondary,
    featuredSlugs,
    topics,
    latestPool,
    currentPage,
    totalPages,
    pageSize,
    latestVisible,
    latestStartIndex,
    isFirstPage,
    query,
    matchCount,
    isSearch,
  };
}
