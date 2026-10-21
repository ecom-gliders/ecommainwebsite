import Image from "next/image";
import Link from "next/link";
import type { BlogPostFrontmatter } from "@/domain/content/schemas";
import { formatPublishedDate } from "@/components/sections/format-date";
import { caseStudyHardPanel } from "@/components/case-studies/case-study-hard-panel";
import { cn } from "@/lib/utils";

interface BlogIndexCardProps {
  post: BlogPostFrontmatter;
}

export function BlogIndexCard({ post }: BlogIndexCardProps) {
  return (
    <article
      className={cn(
        caseStudyHardPanel,
        "flex h-full flex-col overflow-hidden bg-background",
        "transition-[transform,box-shadow] duration-200",
        "hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#131311]",
      )}
    >
      <Link
        href={`/${post.slug}/`}
        className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-primary bg-surface-muted">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={75}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-small text-text-secondary">
              No image
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <time
            dateTime={post.publishedAt}
            className="text-small text-text-secondary"
          >
            {formatPublishedDate(post.publishedAt)}
          </time>
          <h3 className="mt-2 text-h4 text-text-primary group-hover:text-link-hover">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="mt-2 line-clamp-3 flex-1 text-body text-text-secondary">
              {post.excerpt}
            </p>
          ) : null}
          <span className="mt-4 text-small font-semibold text-primary underline-offset-4 decoration-accent decoration-2 group-hover:underline group-hover:text-link-hover">
            Read article
          </span>
        </div>
      </Link>
    </article>
  );
}
