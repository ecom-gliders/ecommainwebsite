import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { readNavLink, readRecordArray, readString } from "./section-data";
import { formatPublishedDate } from "./format-date";
import { SectionHeading } from "./section-heading";
import { SectionShell } from "./section-shell";

interface BlogPreviewSectionProps {
  id: string;
  data: Record<string, unknown>;
}

export function BlogPreviewSection({ id, data }: BlogPreviewSectionProps) {
  const heading = readString(data.heading);
  const subheading = readString(data.subheading);
  const posts = readRecordArray(data.posts);
  const cta = readNavLink(data.cta);
  const headingId = `${id}-heading`;

  return (
    <SectionShell id={id} ariaLabelledBy={headingId} className="py-12 sm:py-16">
      <SectionHeading
        heading={heading}
        subheading={subheading}
        headingId={headingId}
      />
      <ul className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        {posts.map((post) => {
          const slug = readString(post.slug);
          const title = readString(post.title);
          const date = readString(post.date);
          const excerpt = readString(post.excerpt);
          const href = readString(post.href, slug ? `/${slug}/` : "/blog/");
          const image = readString(post.image);
          const imageAlt = readString(post.imageAlt, title);
          const key = slug || title;

          return (
            <li key={key}>
              <article className="flex h-full flex-col overflow-hidden rounded-[10px] border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]">
                <div className="relative aspect-[16/10] border-b-2 border-primary bg-surface">
                  {image ? (
                    <Image
                      src={image}
                      alt={imageAlt || title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      quality={75}
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-end bg-gradient-to-br from-accent/40 via-surface to-primary/10 px-5 py-4">
                      <span className="text-small font-bold uppercase tracking-[0.1em] text-primary">
                        Article
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {date ? (
                    <time
                      dateTime={date}
                      className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary"
                    >
                      {formatPublishedDate(date)}
                    </time>
                  ) : null}
                  <h3 className="mt-2 text-lg font-black leading-snug tracking-tight text-primary">
                    <Link
                      href={href}
                      className="hover:text-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {title}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                    {excerpt}
                  </p>
                  <Link
                    href={href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline"
                  >
                    Read article
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      {cta ? (
        <div className="mt-10 text-center">
          <PrimaryButton asChild variant="primary" size="lg">
            <Link href={cta.href}>{cta.label}</Link>
          </PrimaryButton>
        </div>
      ) : null}
    </SectionShell>
  );
}
