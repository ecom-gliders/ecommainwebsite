import Image from "next/image";
import Link from "next/link";
import type { BlogIndexTopicStack } from "@/lib/blog/build-blog-index-model";
import { formatPublishedDate } from "@/components/sections/format-date";
import { SectionShell } from "@/components/sections/section-shell";

interface BlogIndexTopicStacksProps {
  topics: BlogIndexTopicStack[];
}

export function BlogIndexTopicStacks({ topics }: BlogIndexTopicStacksProps) {
  if (topics.length === 0) {
    return null;
  }

  return (
    <SectionShell
      id="blog-index-topics"
      tone="muted"
      ariaLabelledBy="blog-topics-heading"
      className="py-12 sm:py-14"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">
            Browse by topic
          </p>
          <h2
            id="blog-topics-heading"
            className="mt-2 text-h2 tracking-tight text-primary"
          >
            Focus areas
          </h2>
        </div>
        <a
          href="#latest"
          className="text-small font-semibold text-primary underline-offset-4 decoration-accent decoration-2 hover:text-link-hover hover:underline"
        >
          Jump to latest
        </a>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 xl:gap-12">
        {topics.map((topic) => (
          <section
            key={topic.id}
            id={`topic-${topic.id}`}
            className="scroll-mt-28"
            aria-labelledby={`topic-${topic.id}-heading`}
          >
            <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-border pb-3">
              <h3
                id={`topic-${topic.id}-heading`}
                className="text-h3 tracking-tight text-primary"
              >
                {topic.label}
              </h3>
              <a
                href="#latest"
                className="shrink-0 text-small font-semibold text-text-secondary underline-offset-4 decoration-accent decoration-2 hover:text-link-hover hover:underline"
              >
                See more
              </a>
            </div>
            <ul className="flex flex-col gap-4">
              {topic.posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/${post.slug}/`}
                    className="group grid grid-cols-[88px_minmax(0,1fr)] gap-3 sm:grid-cols-[104px_minmax(0,1fr)] sm:gap-4"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden border border-border bg-background">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="104px"
                          quality={70}
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <time
                        dateTime={post.publishedAt}
                        className="text-[12px] text-text-secondary"
                      >
                        {formatPublishedDate(post.publishedAt)}
                      </time>
                      <p className="mt-1 text-small font-semibold leading-snug text-primary transition-colors group-hover:text-link-hover sm:text-base">
                        {post.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SectionShell>
  );
}
