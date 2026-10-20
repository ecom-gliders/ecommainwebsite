import type { BlogPost, BlogPostFrontmatter } from "@/domain/content/schemas";

/** Keyword hints per service slug for Related Articles selection. */
const SERVICE_TOPIC_HINTS: Record<string, string[]> = {
  "full-service-amazon-agency": [
    "account management",
    "full account",
    "amazon agency",
    "seller growth",
  ],
  "amazon-ppc-management-agency": ["ppc", "acos", "sponsored", "advertising"],
  "amazon-listing-optimization": ["listing", "seo", "keyword", "ranking"],
  "amazon-content-writing": ["content", "a+", "copy", "listing"],
  "amazon-visual-creativity": ["image", "creative", "a+", "visual"],
  "amazon-video-creative": ["video", "creative", "listing"],
  "amazon-catalog-management": ["catalog", "suppression", "variation"],
  "amazon-dsp-management": ["dsp", "display", "retarget"],
  "amazon-reporting-analytics": ["report", "analytics", "tacos", "metrics"],
  "amazon-trademark-brand-registry": ["brand registry", "trademark", "brand"],
  "amazon-company-registration": ["llc", "company", "registration", "entity"],
  "amazon-product-sourcing": ["sourcing", "supplier", "fba"],
  "shopify-website-development": ["shopify", "dtc", "website"],
  "tiktok-shop-ads": ["tiktok", "shop ads"],
  "email-retention-marketing": ["email", "retention", "lifecycle"],
  "amazon-product-launch-services": ["launch", "new product", "seo", "ppc"],
  "amazon-inventory-management": ["inventory", "fba", "stock", "restock"],
  "amazon-seller-central-services": [
    "seller central",
    "account management",
    "operations",
  ],
  "amazon-account-operations": [
    "account management",
    "full account",
    "amazon agency",
  ],
  "amazon-account-health": ["account health", "suspension", "policy", "odr"],
};

function scorePost(slug: string, post: BlogPostFrontmatter): number {
  const hints = SERVICE_TOPIC_HINTS[slug] ?? [slug.replace(/-/g, " ")];
  const haystack = [
    post.title,
    post.excerpt,
    ...post.categories,
    ...post.tags,
    post.slug,
  ]
    .join(" ")
    .toLowerCase();

  let score = 0;
  for (const hint of hints) {
    if (haystack.includes(hint.toLowerCase())) score += 3;
  }
  return score;
}

export function selectServiceRelatedPostSlugs(
  serviceSlug: string,
  candidates: BlogPostFrontmatter[],
  limit = 3,
): string[] {
  return [...candidates]
    .map((post) => ({
      slug: post.slug,
      score: scorePost(serviceSlug, post),
      publishedAt: post.publishedAt,
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return (
        new Date(right.publishedAt).getTime() -
        new Date(left.publishedAt).getTime()
      );
    })
    .slice(0, limit)
    .map((entry) => entry.slug);
}

export async function loadServiceRelatedPosts(
  getFrontmatter: () => Promise<BlogPostFrontmatter[]>,
  getPost: (slug: string) => Promise<BlogPost | null>,
  serviceSlug: string,
  limit = 3,
): Promise<BlogPost[]> {
  const frontmatter = await getFrontmatter();
  const slugs = selectServiceRelatedPostSlugs(serviceSlug, frontmatter, limit);
  const posts = await Promise.all(slugs.map((slug) => getPost(slug)));
  return posts.filter((post): post is BlogPost => Boolean(post));
}
