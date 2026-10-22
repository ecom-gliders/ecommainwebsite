import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/domain/content/schemas";
import { formatPublishedDate } from "@/components/sections/format-date";

interface BlogRelatedPostsProps {
  posts: BlogPost[];
}

export function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  const headingId = "blog-related-posts-heading";

  return (
    <section
      aria-labelledby={headingId}
      className="mt-14 border-t-2 border-primary pt-10"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
            Keep reading
          </p>
          <h2 id={headingId} className="mt-1 text-h3">
            Related articles
          </h2>
        </div>
        <Link
          href="/blog/"
          className="inline-flex items-center gap-1.5 text-small font-semibold text-primary hover:underline"
        >
          All articles
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <ul className="m-0 list-none divide-y divide-border border-2 border-primary bg-surface p-0 shadow-[4px_4px_0_0_#131311]">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/${post.slug}/`}
              className="group flex gap-4 p-4 transition-colors hover:bg-accent/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset sm:gap-5 sm:p-5"
            >
              {post.featuredImage ? (
                <span className="relative hidden h-20 w-28 shrink-0 overflow-hidden border border-border sm:block">
                  <Image
                    src={post.featuredImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="112px"
                    quality={70}
                  />
                </span>
              ) : (
                <span
                  className="hidden h-20 w-28 shrink-0 border border-border bg-accent/40 sm:block"
                  aria-hidden="true"
                />
              )}
              <span className="min-w-0 flex-1">
                {post.categories[0] ? (
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-secondary">
                    {post.categories[0]}
                  </span>
                ) : null}
                <span className="mt-1 block text-body font-semibold text-text-primary group-hover:underline">
                  {post.title}
                </span>
                <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-text-secondary">
                  <time dateTime={post.publishedAt}>
                    {formatPublishedDate(post.publishedAt)}
                  </time>
                  {post.readingTimeMinutes ? (
                    <span>{post.readingTimeMinutes} min read</span>
                  ) : null}
                </span>
              </span>
              <ArrowRight
                className="mt-1 h-4 w-4 shrink-0 text-text-secondary transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
