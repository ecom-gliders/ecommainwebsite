import type { BlogPost, BlogPostFrontmatter } from "@/domain/content/schemas";

export function selectRelatedPostSlugs(
  current: BlogPostFrontmatter,
  candidates: BlogPostFrontmatter[],
  limit = 3,
): string[] {
  const others = candidates.filter((post) => post.slug !== current.slug);

  const sameCategory = others.filter((post) =>
    post.categories.some((category) => current.categories.includes(category)),
  );

  const sameTag = others.filter((post) =>
    post.tags.some((tag) => current.tags.includes(tag)),
  );

  const pool =
    sameCategory.length >= limit
      ? sameCategory
      : sameTag.length >= limit
        ? sameTag
        : others;

  return pool
    .sort(
      (left, right) =>
        new Date(right.publishedAt).getTime() -
        new Date(left.publishedAt).getTime(),
    )
    .slice(0, limit)
    .map((post) => post.slug);
}

export function toRelatedPostCards(posts: BlogPost[]) {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    href: `/${post.slug}/`,
  }));
}
