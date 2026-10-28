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
  { path: "/faq/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/site-map/", changeFrequency: "monthly", priority: 0.4 },
  { path: "/free-amazon-tools/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-conditions/", changeFrequency: "yearly", priority: 0.3 },
];

function normalizePath(path: string): string {
  if (path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path : `${path}/`;
}

function isIndexableRobots(robots?: { index?: boolean }): boolean {
  return robots?.index !== false;
}

function isIndexableBlogPost(post: BlogPostFrontmatter): boolean {
  return isIndexableRobots(post.seo.robots);
}

/**
 * XML sitemap for search engines at `/sitemap.xml`.
 * Includes static marketing routes, services, case studies, and indexable posts.
 * Excludes design-system, APIs, duplicates, and robots.index === false pages.
 */
export async function buildSitemapEntries(
  repository: ContentRepository,
): Promise<MetadataRoute.Sitemap> {
  const [serviceSlugs, caseStudySlugs, blogPosts, caseStudies, toolSlugs] =
    await Promise.all([
      repository.getAllServiceSlugs(),
      repository.getAllCaseStudySlugs(),
      repository.getAllBlogPostFrontmatter(),
      repository.getCaseStudies(),
      repository.getAllFreeAmazonToolSlugs(),
    ]);

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const services = await Promise.all(
    serviceSlugs.map((slug) => repository.getService(slug)),
  );

  for (const service of services) {
    if (!service || !isIndexableRobots(service.seo.robots)) {
      continue;
    }

    entries.push({
      url: absoluteUrl(normalizePath(`/${service.slug}`)),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  const caseBySlug = new Map(caseStudies.map((study) => [study.slug, study]));

  for (const slug of caseStudySlugs) {
    const study = caseBySlug.get(slug);
    if (study && !isIndexableRobots(study.seo.robots)) {
      continue;
    }

    entries.push({
      url: absoluteUrl(normalizePath(`/${slug}`)),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  const tools = await Promise.all(
    toolSlugs.map((slug) => repository.getFreeAmazonTool(slug)),
  );

  for (const tool of tools) {
    if (!tool || !isIndexableRobots(tool.seo.robots)) {
      continue;
    }

    entries.push({
      url: absoluteUrl(normalizePath(`/free-amazon-tools/${tool.slug}`)),
      changeFrequency: "monthly",
      priority: 0.65,
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
