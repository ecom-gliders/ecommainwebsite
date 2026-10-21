import Image from "next/image";
import Link from "next/link";
import type { BlogPostFrontmatter } from "@/domain/content/schemas";
import { formatPublishedDate } from "@/components/sections/format-date";
import { SectionShell } from "@/components/sections/section-shell";

interface BlogIndexFeaturedProps {
  lead: BlogPostFrontmatter;
  secondary: BlogPostFrontmatter[];
}

function categoryLabel(post: BlogPostFrontmatter): string | null {
  const raw = post.categories[0];
  if (!raw) return null;
  return raw.replace(/&amp;/gi, "&");
}

export function BlogIndexFeatured({ lead, secondary }: BlogIndexFeaturedProps) {
  const leadCategory = categoryLabel(lead);

  return (
    <SectionShell
      id="blog-index-featured"
      ariaLabelledBy="blog-featured-heading"
      className="py-10 sm:py-12 lg:py-14"
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">
            Featured
          </p>
          <h2
            id="blog-featured-heading"
            className="mt-2 text-h2 tracking-tight text-primary"
          >
            Top stories
          </h2>
        </div>
      </div>

      <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10 xl:gap-12">
        <article className="group flex h-full flex-col">
          <Link
            href={`/${lead.slug}/`}
            className="flex h-full flex-col focus-visible:outline-none"
          >
            <div className="relative aspect-[16/10] overflow-hidden border border-border bg-surface-muted lg:aspect-auto lg:min-h-[280px] lg:flex-1">
              {lead.featuredImage ? (
                <Image
                  src={lead.featuredImage}
                  alt=""
                  fill
                  priority
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  quality={85}
                />
              ) : null}
            </div>
            <div className="mt-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-text-secondary">
                {leadCategory ? (
                  <span className="font-semibold uppercase tracking-wide text-primary">
                    {leadCategory}
                  </span>
                ) : null}
                <time dateTime={lead.publishedAt}>
                  {formatPublishedDate(lead.publishedAt)}
                </time>
                {lead.readingTimeMinutes ? (
                  <span>{lead.readingTimeMinutes} min read</span>
                ) : null}
              </div>
              <h3 className="mt-3 text-[1.6rem] font-black leading-[1.15] tracking-[-0.03em] text-primary transition-colors group-hover:text-link-hover sm:text-[1.9rem]">
                {lead.title}
              </h3>
              {lead.excerpt ? (
                <p className="mt-3 line-clamp-2 text-body text-text-secondary">
                  {lead.excerpt}
                </p>
              ) : null}
              <span className="mt-4 inline-block text-small font-semibold text-primary underline-offset-4 decoration-accent decoration-2 group-hover:underline group-hover:text-link-hover">
                Read article
              </span>
            </div>
          </Link>
        </article>

        <ul className="flex h-full flex-col divide-y divide-border border border-border bg-background lg:border-l-0">
          {secondary.map((post) => {
            const category = categoryLabel(post);
            return (
              <li key={post.slug} className="flex min-h-0 flex-1">
                <article className="flex w-full">
                  <Link
                    href={`/${post.slug}/`}
                    className="group grid w-full grid-cols-[96px_minmax(0,1fr)] items-center gap-3 px-3 py-3 sm:grid-cols-[112px_minmax(0,1fr)] sm:gap-4 sm:px-4 sm:py-3.5"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden border border-border bg-surface-muted">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="112px"
                          quality={75}
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-text-secondary">
                        {category ? (
                          <span className="font-semibold uppercase tracking-wide text-primary">
                            {category}
                          </span>
                        ) : null}
                        <time dateTime={post.publishedAt}>
                          {formatPublishedDate(post.publishedAt)}
                        </time>
                      </div>
                      <h3 className="mt-1 text-small font-bold leading-snug text-primary transition-colors group-hover:text-link-hover sm:text-base">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionShell>
  );
}
