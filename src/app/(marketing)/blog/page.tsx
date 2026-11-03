import type { Metadata } from "next";
import Link from "next/link";
import { BlogIndexCard } from "@/components/blog/blog-index-card";
import { BlogIndexFeatured } from "@/components/blog/blog-index-featured";
import { BlogIndexMasthead } from "@/components/blog/blog-index-masthead";
import { BlogIndexTopicRail } from "@/components/blog/blog-index-topic-rail";
import { BlogIndexTopicStacks } from "@/components/blog/blog-index-topic-stack";
import { BlogPostCta } from "@/components/blog/blog-post-cta";
import { SectionShell } from "@/components/sections/section-shell";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildBlogIndexModel } from "@/lib/blog/build-blog-index-model";
import {
  OG_LANDSCAPE,
  OG_SQUARE,
  resolveOgImages,
} from "@/lib/seo/og-images";
import { absoluteUrl } from "@/lib/seo/site-url";
import { JsonLdScript } from "@/lib/seo/json-ld-script";

const blogIndexTitle =
  "Amazon Seller Blog | PPC, SEO and Growth Tips | eCom Gliders";
const blogIndexDescription =
  "Amazon seller blog from eCom Gliders: 328 articles on Amazon PPC, listing optimization, account management, and seller growth.";
const blogIndexOg = resolveOgImages({
  ogImage: "/images/og/home-1200x630.jpg",
  alt: blogIndexTitle,
  metaTitle: blogIndexTitle,
});

export const metadata: Metadata = {
  title: blogIndexTitle,
  description: blogIndexDescription,
  alternates: {
    canonical: absoluteUrl("/blog/"),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: blogIndexTitle,
    description: blogIndexDescription,
    url: absoluteUrl("/blog/"),
    images: [
      {
        url: absoluteUrl(blogIndexOg.landscape),
        width: OG_LANDSCAPE.width,
        height: OG_LANDSCAPE.height,
        alt: blogIndexOg.alt,
      },
      ...(blogIndexOg.square
        ? [
            {
              url: absoluteUrl(blogIndexOg.square),
              width: OG_SQUARE.width,
              height: OG_SQUARE.height,
              alt: blogIndexOg.alt,
            },
          ]
        : []),
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: blogIndexTitle,
    description: blogIndexDescription,
    images: [absoluteUrl(blogIndexOg.landscape)],
  },
};

interface BlogIndexPageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

function paginationHref(page: number, query: string): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/blog/?${qs}` : "/blog/";
}

const paginationButtonClass =
  "inline-flex min-h-11 items-center rounded-[10px] border-2 border-primary bg-background px-4 text-small font-semibold text-primary shadow-[3px_3px_0_0_#131311] transition-colors hover:border-accent hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const repository = getContentRepository();
  const [{ page: pageParam, q: queryParam }, site, posts] = await Promise.all([
    searchParams,
    repository.getSiteConfig(),
    repository.getAllBlogPostFrontmatter(),
  ]);

  const model = buildBlogIndexModel(posts, pageParam, queryParam);
  const {
    totalCount,
    lead,
    secondary,
    topics,
    latestVisible,
    currentPage,
    totalPages,
    latestStartIndex,
    isFirstPage,
    query,
    matchCount,
    isSearch,
  } = model;

  const suggestions = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    category: post.categories[0]?.replace(/&amp;/gi, "&"),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Amazon seller blog",
    description:
      "Amazon seller blog from eCom Gliders: articles on Amazon PPC, listing optimization, account management, and seller growth.",
    url: absoluteUrl("/blog/"),
    isPartOf: {
      "@type": "WebSite",
      name: site.name,
      url: absoluteUrl("/"),
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: latestVisible.length,
      itemListElement: latestVisible.map((post, index) => ({
        "@type": "ListItem",
        position: latestStartIndex + index + 1,
        url: absoluteUrl(`/${post.slug}/`),
        name: post.title,
      })),
    },
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main id="main-content">
        <BlogIndexMasthead
          totalCount={totalCount}
          compact={!isFirstPage || isSearch}
          query={query}
          suggestions={suggestions}
        />

        {isFirstPage ? <BlogIndexTopicRail topics={topics} /> : null}

        {isFirstPage && lead ? (
          <BlogIndexFeatured lead={lead} secondary={secondary} />
        ) : null}

        {isFirstPage ? <BlogIndexTopicStacks topics={topics} /> : null}

        <SectionShell
          id="latest"
          tone={isFirstPage ? "default" : "muted"}
          ariaLabelledBy="blog-latest-heading"
          className="scroll-mt-28"
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">
                {isSearch ? "Search results" : isFirstPage ? "All articles" : "Archive"}
              </p>
              <h2
                id="blog-latest-heading"
                className="mt-2 text-h2 tracking-tight text-primary"
              >
                {isSearch
                  ? `${matchCount} result${matchCount === 1 ? "" : "s"} for “${query}”`
                  : isFirstPage
                    ? "Latest"
                    : `Page ${currentPage}`}
              </h2>
            </div>
            <p className="text-small font-medium text-text-secondary">
              {totalCount} articles total
            </p>
          </div>

          {latestVisible.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestVisible.map((post) => (
                <li key={post.slug}>
                  <BlogIndexCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-body font-medium text-text-secondary">
              No articles matched “{query}”.{" "}
              <Link
                href="/blog/"
                className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-link-hover"
              >
                View all articles
              </Link>
            </p>
          )}

          {totalPages > 1 ? (
            <nav
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
              aria-label="Blog pagination"
            >
              {currentPage > 1 ? (
                <Link
                  href={paginationHref(currentPage - 1, query)}
                  className={paginationButtonClass}
                >
                  Previous
                </Link>
              ) : null}
              <p className="text-small font-medium text-text-secondary">
                Page {currentPage} of {totalPages}
              </p>
              {currentPage < totalPages ? (
                <Link
                  href={paginationHref(currentPage + 1, query)}
                  className={paginationButtonClass}
                >
                  Next
                </Link>
              ) : null}
            </nav>
          ) : null}
        </SectionShell>

        <BlogPostCta site={site} />
      </main>
    </>
  );
}
