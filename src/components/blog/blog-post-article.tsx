import Image from "next/image";
import type { BlogPost, FaqItem, SiteConfig } from "@/domain/content/schemas";
import { BlogAuthorBox } from "@/components/blog/blog-author-box";
import { BlogBreadcrumb } from "@/components/blog/blog-breadcrumb";
import { BlogMarkdown } from "@/components/blog/blog-markdown";
import { BlogPostCta } from "@/components/blog/blog-post-cta";
import { BlogPostFaq } from "@/components/blog/blog-post-faq";
import { BlogRelatedPosts } from "@/components/blog/blog-related-posts";
import { BlogTableOfContents } from "@/components/blog/blog-table-of-contents";
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
  const author = getBlogAuthor(post.author);

  const metaParts = [
    formatPostDate(post.publishedAt),
    post.readingTimeMinutes ? `${post.readingTimeMinutes} min read` : null,
    post.author,
  ].filter(Boolean);

  return (
    <>
      <article className="container-page py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <BlogBreadcrumb title={post.title} />

          <header className="mx-auto mb-8 max-w-3xl border-b border-border pb-8">
            <h1 className="text-h1 mb-4">{post.title}</h1>
            <p className="text-small text-text-secondary">{metaParts.join(" · ")}</p>
            {post.featuredImage ? (
              <div className="relative mt-6 aspect-video overflow-hidden rounded-lg border border-border bg-surface-muted">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  quality={80}
                />
              </div>
            ) : null}
          </header>

          <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <BlogTableOfContents items={tocItems} />
            <div className="min-w-0">
              <BlogMarkdown content={mainContent} />
              <BlogPostFaq items={faqItems} />
              <BlogAuthorBox author={author} />
              <BlogRelatedPosts posts={relatedPosts} />
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
