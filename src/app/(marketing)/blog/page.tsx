import type { Metadata } from "next";
import Link from "next/link";
import { formatPublishedDate } from "@/components/sections/format-date";
import { SectionShell } from "@/components/sections/section-shell";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { absoluteUrl } from "@/lib/seo/site-url";
import { JsonLdScript } from "@/lib/seo/json-ld-script";

const POSTS_PER_PAGE = 24;

export const metadata: Metadata = {
  title: "Amazon Seller Blog | PPC, SEO and Growth Tips | eCom Gliders",
  description:
    "328 articles on Amazon PPC, listing optimization, account management, and seller growth strategies from eCom Gliders.",
  alternates: {
    canonical: absoluteUrl("/blog/"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function BlogIndexPage() {
  const repository = getContentRepository();
  const [site, posts] = await Promise.all([
    repository.getSiteConfig(),
    repository.getAllBlogPostFrontmatter(),
  ]);

  const sorted = [...posts].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() -
      new Date(left.publishedAt).getTime(),
  );

  const visible = sorted.slice(0, POSTS_PER_PAGE);
  const totalCount = sorted.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Amazon Seller Insights",
    description:
      "Articles on Amazon PPC, listing optimization, account management, and seller growth.",
    url: absoluteUrl("/blog/"),
        isPartOf: {
          "@type": "WebSite",
          name: site.name,
          url: absoluteUrl("/"),
        },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: visible.length,
      itemListElement: visible.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/${post.slug}/`),
        name: post.title,
      })),
    },
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main id="main-content">
        <SectionShell id="blog-index-hero" ariaLabelledBy="blog-index-heading">
          <div className="mx-auto max-w-3xl">
            <h1 id="blog-index-heading" className="text-h1">
              Amazon Seller Insights
            </h1>
            <p className="mt-4 text-body text-text-secondary">
              {totalCount} articles on Amazon PPC, SEO, listing optimization, and
              account management.
            </p>
          </div>
        </SectionShell>

        <SectionShell id="blog-index-list" tone="muted">
          <ul className="mx-auto max-w-3xl divide-y divide-border border-y border-border bg-background">
            {visible.map((post) => (
              <li key={post.slug} className="px-4 py-5 sm:px-6">
                <article>
                  <time
                    dateTime={post.publishedAt}
                    className="text-small text-text-secondary"
                  >
                    {formatPublishedDate(post.publishedAt)}
                  </time>
                  <h2 className="mt-2 text-h4">
                    <Link
                      href={`/${post.slug}/`}
                      className="text-text-primary underline-offset-4 hover:text-link-hover hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt ? (
                    <p className="mt-2 line-clamp-2 text-body text-text-secondary">
                      {post.excerpt}
                    </p>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
          {totalCount > POSTS_PER_PAGE ? (
            <p className="mx-auto mt-8 max-w-3xl text-center text-small text-text-secondary">
              Showing the {POSTS_PER_PAGE} most recent articles. Additional posts
              remain available at their preserved URLs.
            </p>
          ) : null}
        </SectionShell>
      </main>
    </>
  );
}
