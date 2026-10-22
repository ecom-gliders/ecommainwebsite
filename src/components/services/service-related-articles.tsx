import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/domain/content/schemas";
import { formatPublishedDate } from "@/components/sections/format-date";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import { cn } from "@/lib/utils";
import { serviceHardPanel } from "./service-hard-panel";

interface ServiceRelatedArticlesProps {
  posts: BlogPost[];
}

export function ServiceRelatedArticles({ posts }: ServiceRelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <SectionShell
      id="service-related-articles"
      tone="muted"
      ariaLabelledBy="service-related-articles-heading"
      className="py-14 sm:py-16 lg:py-20"
    >
      <SectionHeading
        kicker="From the blog"
        heading="Related articles"
        headingId="service-related-articles-heading"
        subheading="Practical reading that pairs with this service—not filler keyword pages."
      />
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/${post.slug}/`}
              className={cn(
                serviceHardPanel,
                "group flex h-full flex-col overflow-hidden bg-background",
                "transition-[transform,box-shadow] duration-200",
                "hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#131311]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              )}
            >
              {post.featuredImage ? (
                <div className="relative aspect-[16/10] w-full border-b-2 border-primary bg-surface-muted">
                  <Image
                    src={post.featuredImage}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={75}
                  />
                </div>
              ) : null}
              <article className="flex flex-1 flex-col p-5 sm:p-6">
                <time
                  dateTime={post.publishedAt}
                  className="text-small font-medium text-text-secondary"
                >
                  {formatPublishedDate(post.publishedAt)}
                </time>
                <h3 className="mt-3 text-[1.125rem] font-bold leading-snug text-primary group-hover:underline group-hover:underline-offset-4 sm:text-[1.1875rem]">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-[1.65] text-text-secondary line-clamp-3 sm:text-base">
                  {post.excerpt}
                </p>
                <span className="mt-5 text-sm font-bold uppercase tracking-[0.04em] text-primary">
                  Read article
                </span>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
