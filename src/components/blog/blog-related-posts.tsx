import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/domain/content/schemas";
import { Button } from "@/components/ui/button";
import { ElegantCard } from "@/components/ui/elegant-card";
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
    <section aria-labelledby={headingId} className="mt-12 border-t border-border pt-10">
      <h2 id={headingId} className="text-h2 mb-6">
        Related articles
      </h2>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <ElegantCard className="h-full bg-background">
              <article className="flex h-full flex-col p-6">
                <time
                  dateTime={post.publishedAt}
                  className="text-small text-text-secondary"
                >
                  {formatPublishedDate(post.publishedAt)}
                </time>
                <h3 className="mt-2 text-h4">
                  <Link
                    href={`/${post.slug}/`}
                    className="text-text-primary hover:text-link-hover"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-body text-text-secondary">
                  {post.excerpt}
                </p>
                <Button variant="link" className="mt-4 self-start" asChild>
                  <Link href={`/${post.slug}/`}>
                    Read article <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </article>
            </ElegantCard>
          </li>
        ))}
      </ul>
    </section>
  );
}
