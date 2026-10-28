import type { MetadataRoute } from "next";
import type { BlogPostFrontmatter } from "@/domain/content/schemas";
import type { ContentRepository } from "@/domain/content/content-repository";
import { absoluteUrl } from "./site-url";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

interface StaticRouteConfig {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

const STATIC_ROUTES: StaticRouteConfig[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/free-audit/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about-us/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/agency-partnership/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/careers/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-studies/", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog/", changeFrequency: "weekly", priority: 0.8 },
  { path: "/privacy-policy/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-conditions/", changeFrequency: "yearly", priority: 0.3 },
];

function normalizePath(path: string): string {
  if (path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path : `${path}/`;
}

function isIndexableBlogPost(post: BlogPostFrontmatter): boolean {
  const robots = post.seo.robots;
  return robots?.index !== false;
}

export async function buildSitemapEntries(
  repository: ContentRepository,
): Promise<MetadataRoute.Sitemap> {
  const [serviceSlugs, caseStudySlugs, blogPosts] = await Promise.all([
    repository.getAllServiceSlugs(),
    repository.getAllCaseStudySlugs(),
    repository.getAllBlogPostFrontmatter(),
  ]);

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  for (const slug of serviceSlugs) {
    entries.push({
      url: absoluteUrl(normalizePath(`/${slug}`)),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const slug of caseStudySlugs) {
    entries.push({
      url: absoluteUrl(normalizePath(`/${slug}`)),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const post of blogPosts) {
    if (!isIndexableBlogPost(post)) {
      continue;
    }

    entries.push({
      url: absoluteUrl(normalizePath(`/${post.slug}`)),
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  const seen = new Set<string>();

  return entries.filter((entry) => {
    if (seen.has(entry.url)) {
      return false;
    }

    seen.add(entry.url);
    return true;
  });
}
