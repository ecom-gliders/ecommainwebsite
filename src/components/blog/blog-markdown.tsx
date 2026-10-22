import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { renderBlogBlock } from "@/lib/blog/blocks/registry";
import { createHeadingId } from "@/lib/blog/slugify-heading";
import { normalizeHeadingLevels } from "@/lib/blog/normalize-heading-levels";
import { splitBlogBlocks } from "@/lib/blog/split-blog-blocks";

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }

  if (node && typeof node === "object" && "props" in node) {
    const element = node as { props?: { children?: React.ReactNode } };
    return getNodeText(element.props?.children ?? "");
  }

  return "";
}

function isCtaLink(href: string | undefined, label: string): boolean {
  if (!href) return false;
  const h = href.toLowerCase();
  const l = label.toLowerCase();
  const pathHit =
    /free-audit|get-in-touch|contact|request-a-quote|book|consultation/.test(h);
  const labelHit =
    /free audit|book a call|get in touch|consultation|request a quote|contact us|grow support|account audit/.test(
      l,
    );
  return pathHit || labelHit;
}

function isInternalHref(href: string): boolean {
  if (href.startsWith("/")) return true;
  try {
    return new URL(href).hostname.replace(/^www\./, "") === "ecomgliders.com";
  } catch {
    return false;
  }
}

function toInternalPath(href: string): string {
  if (href.startsWith("/")) return href;
  try {
    const url = new URL(href);
    return `${url.pathname}${url.search}${url.hash}` || "/";
  } catch {
    return href;
  }
}

function isOptimizableImageSrc(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    const host = new URL(src).hostname;
    return host === "ecomgliders.com" || host === "www.ecomgliders.com";
  } catch {
    return false;
  }
}

function createMarkdownComponents(): Components {
  const usedIds = new Map<string, number>();

  const createHeading =
    (Tag: "h2" | "h3" | "h4" | "h5", className: string) =>
    ({ children }: { children?: React.ReactNode }) => {
      const text = getNodeText(children)
        .replace(
          /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F1E0}-\u{1F1FF}\u{200D}\u{20E3}]/gu,
          "",
        )
        .replace(/\s{2,}/g, " ")
        .trim();
      const id = createHeadingId(text, usedIds);

      return (
        <Tag id={id} className={className}>
          {children}
        </Tag>
      );
    };

  return {
    h2: createHeading("h2", "text-h2 mt-10 mb-4 scroll-mt-24"),
    h3: createHeading("h3", "text-h3 mt-8 mb-3 scroll-mt-24"),
    h4: createHeading("h4", "text-h4 mt-6 mb-2 scroll-mt-24"),
    h5: createHeading("h5", "text-body mt-5 mb-2 font-semibold scroll-mt-24"),
    p: ({ children }) => (
      <p className="text-body mb-4 text-text-primary">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="text-body mb-4 list-disc space-y-2 pl-6">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="text-body mb-4 list-decimal space-y-2 pl-6">{children}</ol>
    ),
    li: ({ children }) => <li className="text-text-primary">{children}</li>,
    a: ({ href, children }) => {
      const label = getNodeText(children);
      if (href && isCtaLink(href, label)) {
        const className =
          "my-4 inline-flex min-h-11 items-center gap-2 border-2 border-primary bg-accent px-5 py-2.5 text-small font-semibold text-primary shadow-[3px_3px_0_0_#131311] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#131311] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
        const body = (
          <>
            {children}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        );
        if (isInternalHref(href)) {
          return (
            <Link href={toInternalPath(href)} className={className}>
              {body}
            </Link>
          );
        }
        return (
          <a
            href={href}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
          >
            {body}
          </a>
        );
      }

      return (
        <a
          href={href}
          className="text-link underline-offset-4 hover:text-link-hover hover:underline"
          {...(href && /^https?:\/\//.test(href) && !isInternalHref(href)
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-border-strong pl-4 text-text-secondary italic">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="my-6 w-full overflow-x-auto border-2 border-primary shadow-[3px_3px_0_0_#131311]">
        <table className="w-full min-w-[32rem] border-collapse text-left text-small">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-primary text-text-on-dark">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-border last:border-b-0">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 font-semibold">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-text-primary">{children}</td>
    ),
    img: ({ src, alt, title }) => {
      if (!src || typeof src !== "string") {
        return null;
      }

      const resolvedAlt =
        (typeof alt === "string" && alt.trim()) ||
        src.split("/").pop()?.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ") ||
        "Blog image";
      const caption =
        (typeof title === "string" && title.trim()) || undefined;

      const imageClassName = "object-cover";

      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] overflow-hidden border-2 border-primary bg-surface-muted shadow-[3px_3px_0_0_#131311]">
            {isOptimizableImageSrc(src) ? (
              <Image
                src={src}
                alt={resolvedAlt}
                fill
                className={imageClassName}
                sizes="(max-width: 768px) 100vw, 720px"
                quality={75}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- unknown host
              <img
                src={src}
                alt={resolvedAlt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          {caption ? (
            <figcaption className="mt-2 text-center text-small text-text-secondary">
              {caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    hr: () => <hr className="my-8 border-border" />,
  };
}

interface BlogMarkdownProps {
  content: string;
}

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  const normalizedContent = normalizeHeadingLevels(content);
  const segments = splitBlogBlocks(normalizedContent);
  const components = createMarkdownComponents();

  const renderMarkdown = (markdown: string) => (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {markdown}
    </ReactMarkdown>
  );

  return (
    <div className="blog-content">
      {segments.map((segment, index) => {
        if (segment.type === "block") {
          return (
            <div key={`block-${segment.language}-${index}`}>
              {renderBlogBlock(segment.language, segment.body, {
                markdownRenderer: renderMarkdown,
              })}
            </div>
          );
        }

        if (!segment.content.trim()) {
          return null;
        }

        return (
          <div key={`md-${index}`}>{renderMarkdown(segment.content)}</div>
        );
      })}
    </div>
  );
}
