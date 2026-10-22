import Image from "next/image";
import { CalendarDays, Clock3, UserRound } from "lucide-react";
import type { BlogPost, FaqItem, SiteConfig } from "@/domain/content/schemas";
import { BlogAskAi } from "@/components/blog/blog-ask-ai";
import { BlogAuthorBox } from "@/components/blog/blog-author-box";
import { BlogBreadcrumb } from "@/components/blog/blog-breadcrumb";
import { BlogKeyTakeaways } from "@/components/blog/blog-key-takeaways";
import { BlogMarkdown } from "@/components/blog/blog-markdown";
import { BlogPostCta } from "@/components/blog/blog-post-cta";
import { BlogPostFaq } from "@/components/blog/blog-post-faq";
import { BlogPreferredSourceButton } from "@/components/blog/blog-preferred-source-button";
import { BlogRelatedPosts } from "@/components/blog/blog-related-posts";
import { BlogShareRail } from "@/components/blog/blog-share-rail";
import { BlogTableOfContents } from "@/components/blog/blog-table-of-contents";
import { extractKeyTakeaways } from "@/lib/blog/extract-key-takeaways";
import { extractTableOfContents } from "@/lib/blog/extract-table-of-contents";
import { splitBlogContent } from "@/lib/blog/extract-faq-items";
import { getBlogAuthor } from "@/lib/blog/get-blog-author";

function formatPostDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

function shortDek(excerpt: string, max = 200): string {
  const cleaned = excerpt.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  const cut = cleaned.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : max).trimEnd()}…`;
}

interface BlogPostArticleProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  site: SiteConfig;
}

export function BlogPostArticle({
  post,
  relatedPosts,
  site,
}: BlogPostArticleProps) {
  const { mainContent, faqItems } = splitBlogContent(post.content);
  const tocItems = extractTableOfContents(mainContent);
  const takeaways = extractKeyTakeaways(mainContent);
  const author = getBlogAuthor(post.author);
  const shareUrl = post.seo.canonical || `https://ecomgliders.com/${post.slug}/`;
  const category = post.categories[0] ?? "Insights";

  return (
    <>
      <article className="pb-10 md:pb-14">
        <div className="container-page pt-6 md:pt-8">
          <div className="mx-auto max-w-6xl">
            <BlogBreadcrumb title={post.title} />
          </div>
        </div>

        {/* Forbes-style hero: wide title band + full-width featured image */}
        <header className="border-b-2 border-primary bg-[linear-gradient(180deg,#FAFAFA_0%,#F3F3F0_100%)]">
          <div className="container-page pb-0 pt-8 md:pt-12">
            <div className="mx-auto max-w-6xl">
              <p className="mb-4 inline-flex items-center border-2 border-primary bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary shadow-[2px_2px_0_0_#131311]">
                {category}
              </p>
              <h1 className="text-h1 mb-5 max-w-5xl text-balance tracking-tight md:mb-6 md:text-[2.75rem] md:leading-[1.1] lg:text-[3.25rem]">
                {post.title}
              </h1>
              {post.excerpt ? (
                <p className="text-body mb-6 max-w-3xl text-text-secondary md:text-lg md:leading-relaxed">
                  {shortDek(post.excerpt)}
                </p>
              ) : null}

              <div className="mb-6 flex flex-col gap-4 border-y border-border py-4 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-3">
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-text-secondary">
                  <li className="inline-flex items-center gap-2">
                    <CalendarDays
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                    <span>{formatPostDate(post.publishedAt)}</span>
                  </li>
                  {post.readingTimeMinutes ? (
                    <li className="inline-flex items-center gap-2">
                      <Clock3
                        className="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
                      <span>{post.readingTimeMinutes} min read</span>
                    </li>
                  ) : null}
                  <li className="inline-flex items-center gap-2">
                    <UserRound
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                    <span>{post.author}</span>
                  </li>
                </ul>
                <BlogPreferredSourceButton />
              </div>

              <div className="mb-6 xl:hidden">
                <BlogShareRail
                  url={shareUrl}
                  title={post.title}
                  orientation="horizontal"
                />
              </div>
            </div>
          </div>

          {post.featuredImage ? (
            <div className="container-page pb-8 md:pb-12">
              <div className="relative mx-auto aspect-[16/9] w-full max-w-6xl overflow-hidden border-2 border-primary bg-surface-muted shadow-[5px_5px_0_0_#131311] md:aspect-[2.2/1]">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1152px"
                  quality={80}
                />
              </div>
            </div>
          ) : (
            <div className="h-6 md:h-10" />
          )}
        </header>

        <div className="container-page pt-10 md:pt-12">
          <div className="mx-auto max-w-6xl">
            {takeaways.length > 0 ? (
              <div className="mb-6 xl:hidden">
                <BlogKeyTakeaways items={takeaways} compact />
              </div>
            ) : null}

            <div className="xl:grid xl:grid-cols-[200px_minmax(0,1fr)_200px] xl:gap-8">
              <BlogTableOfContents
                items={tocItems}
                showRailCta
                ctaHref={site.preFooter?.cta?.href ?? "/free-audit-2/"}
              />

              <div className="min-w-0 xl:max-w-[46rem]">
                <BlogMarkdown content={mainContent} />
                <BlogPostFaq items={faqItems} />
                <BlogAuthorBox author={author} />
                <BlogRelatedPosts posts={relatedPosts} />
              </div>

              <aside
                className="hidden xl:block"
                aria-label="Share, ask AI, and key takeaways"
              >
                <div className="sticky top-28 space-y-5 pb-4">
                  <BlogShareRail
                    url={shareUrl}
                    title={post.title}
                    orientation="vertical"
                  />
                  <BlogAskAi title={post.title} url={shareUrl} site={site} />
                  <BlogKeyTakeaways items={takeaways} compact />
                </div>
              </aside>
            </div>

            <div className="mt-10 xl:hidden">
              <BlogAskAi title={post.title} url={shareUrl} site={site} />
            </div>
          </div>
        </div>
      </article>
      <BlogPostCta site={site} />
    </>
  );
}

export function getBlogPostFaqItems(content: string): FaqItem[] {
  return splitBlogContent(content).faqItems;
}
