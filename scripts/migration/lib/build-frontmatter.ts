import type { BlogPostFrontmatter } from "../../../src/domain/content/schemas/blog-post.schema";
import { stripHtml } from "./extract-post-html";

interface WordPressPost {
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  author: number;
  categories: number[];
  tags: number[];
  featured_media: number;
  yoast_head_json?: {
    title?: string;
    description?: string;
    canonical?: string;
    og_description?: string;
    og_image?: Array<{ url: string }>;
    author?: string;
    robots?: {
      index?: string;
      follow?: string;
    };
    twitter_misc?: Record<string, string>;
  };
}

interface LookupMaps {
  authors: Map<number, string>;
  categories: Map<number, string>;
  tags: Map<number, string>;
  media: Map<number, string>;
}

export function buildFrontmatter(
  post: WordPressPost,
  maps: LookupMaps,
  markdownBody: string,
): BlogPostFrontmatter {
  const yoast = post.yoast_head_json ?? {};
  const title = stripHtml(post.title.rendered);
  const excerpt = buildExcerpt(post.excerpt.rendered, markdownBody, title);
  const metaDescription = buildMetaDescription(
    yoast.description,
    yoast.og_description,
    excerpt,
    title,
  );

  const featuredImage =
    yoast.og_image?.[0]?.url ??
    maps.media.get(post.featured_media) ??
    "";

  const readingTimeMinutes = parseReadingTime(yoast.twitter_misc);

  const frontmatter: BlogPostFrontmatter = {
    slug: post.slug,
    title,
    excerpt,
    publishedAt: normalizeDate(post.date),
    updatedAt: normalizeDate(post.modified),
    author: yoast.author ?? maps.authors.get(post.author) ?? "eCom Gliders",
    categories: post.categories
      .map((id) => maps.categories.get(id))
      .filter((name): name is string => Boolean(name)),
    tags: post.tags
      .map((id) => maps.tags.get(id))
      .filter((name): name is string => Boolean(name)),
    featuredImage,
    seo: {
      metaTitle: yoast.title ?? stripHtml(post.title.rendered),
      metaDescription,
      canonical: yoast.canonical ?? `https://ecomgliders.com/${post.slug}/`,
      ogImage: featuredImage || undefined,
      robots: {
        index: yoast.robots?.index !== "noindex",
        follow: yoast.robots?.follow !== "nofollow",
      },
      schema: "Article",
    },
  };

  if (readingTimeMinutes) {
    frontmatter.readingTimeMinutes = readingTimeMinutes;
  }

  return frontmatter;
}

function normalizeDate(value: string): string {
  return new Date(value).toISOString();
}

function buildExcerpt(
  excerptHtml: string,
  markdownBody: string,
  title: string,
): string {
  const fromExcerpt = cleanWpBoilerplate(stripHtml(excerptHtml), title);
  if (fromExcerpt.length >= 80 && !looksPolluted(fromExcerpt)) {
    return truncateText(fromExcerpt, 320);
  }

  const firstParagraph = markdownBody
    .split("\n\n")
    .map((block) => block.replace(/^#+\s*/gm, "").replace(/\[(.+?)\]\(.+?\)/g, "$1").trim())
    .find((block) => block.length >= 80 && !/^introduction$/i.test(block));

  const fromBody = firstParagraph ?? markdownBody
    .split("\n\n")
    .map((block) => block.replace(/^#+\s*/gm, "").replace(/\[(.+?)\]\(.+?\)/g, "$1").trim())
    .find((block) => block.length >= 40);
  if (fromBody) {
    return truncateText(fromBody, 320);
  }

  return truncateText(fromExcerpt || title, 320);
}

function buildMetaDescription(
  description: string | undefined,
  ogDescription: string | undefined,
  excerpt: string,
  title: string,
): string {
  if (description?.trim()) {
    return truncateText(description.trim(), 160);
  }

  const cleanedOg = ogDescription
    ? cleanWpBoilerplate(ogDescription.trim(), title)
    : "";

  if (cleanedOg.length >= 40 && !looksPolluted(cleanedOg) && cleanedOg.length <= 200) {
    return truncateText(cleanedOg, 160);
  }

  return truncateText(excerpt, 160);
}

function cleanWpBoilerplate(text: string, title: string): string {
  let cleaned = text
    .replace(/\bContact us\b/gi, " ")
    .replace(
      /\b(Facebook|Twitter|LinkedIn|Reddit|Email|WhatsApp|Pinterest)\b/gi,
      " ",
    )
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.startsWith(title)) {
    cleaned = cleaned.slice(title.length).trim();
  }

  return cleaned;
}

function looksPolluted(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("contact us") ||
    /\b(facebook|linkedin|whatsapp|pinterest)\b/.test(lower)
  );
}

function truncateText(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

function parseReadingTime(
  twitterMisc: Record<string, string> | undefined,
): number | undefined {
  const raw = twitterMisc?.["Est. reading time"];
  if (!raw) {
    return undefined;
  }

  const match = raw.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : undefined;
}
