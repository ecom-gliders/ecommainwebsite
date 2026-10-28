import type { BlogPostFrontmatter, CaseStudyDetail, NavLink } from "@/domain/content/schemas";

/** Match service footer columns (5 links each, including hub “All …” where used). */
export const FOOTER_COLUMN_LINK_TARGET = 5;
export const FOOTER_RECENT_ITEM_LIMIT = FOOTER_COLUMN_LINK_TARGET - 1;

function caseStudySortKey(study: CaseStudyDetail): number {
  if (study.dateModified) {
    return new Date(study.dateModified).getTime();
  }
  const match = /^case-study-(\d+)$/i.exec(study.slug);
  return match ? Number(match[1]) : 0;
}

function truncateLabel(label: string, max = 56): string {
  const trimmed = label.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

export function selectFooterRecentBlogLinks(
  posts: BlogPostFrontmatter[],
  limit = FOOTER_RECENT_ITEM_LIMIT,
): NavLink[] {
  return [...posts]
    .sort(
      (left, right) =>
        new Date(right.publishedAt).getTime() -
        new Date(left.publishedAt).getTime(),
    )
    .slice(0, limit)
    .map((post) => ({
      label: truncateLabel(post.title),
      href: `/${post.slug}/`,
    }));
}

export function selectFooterRecentCaseStudyLinks(
  studies: CaseStudyDetail[],
  limit = FOOTER_RECENT_ITEM_LIMIT,
): NavLink[] {
  return [...studies]
    .sort((left, right) => {
      if (Boolean(left.featured) !== Boolean(right.featured)) {
        return left.featured ? -1 : 1;
      }
      return caseStudySortKey(right) - caseStudySortKey(left);
    })
    .slice(0, limit)
    .map((study) => {
      const brand = study.clientDisplayName ?? study.client;
      return {
        label: truncateLabel(brand),
        href: study.href,
      };
    });
}
