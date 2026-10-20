import Image from "next/image";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createHeadingId } from "@/lib/blog/slugify-heading";
import { normalizeHeadingLevels } from "@/lib/blog/normalize-heading-levels";

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
      const text = getNodeText(children);
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
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-link underline-offset-4 hover:text-link-hover hover:underline"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-border-strong pl-4 text-text-secondary italic">
        {children}
      </blockquote>
    ),
    img: ({ src, alt }) => {
      if (!src || typeof src !== "string") {
        return null;
      }

      const className =
        "my-6 h-auto w-full rounded-lg border border-border";

      if (isOptimizableImageSrc(src)) {
        return (
          <Image
            src={src}
            alt={alt ?? ""}
            width={1200}
            height={675}
            className={className}
            sizes="(max-width: 768px) 100vw, 720px"
            quality={75}
            loading="lazy"
          />
        );
      }

      return (
        // eslint-disable-next-line @next/next/no-img-element -- unknown host; keep lazy native img
        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          decoding="async"
          className={className}
        />
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

  return (
    <div className="blog-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={createMarkdownComponents()}
      >
        {normalizedContent}
      </ReactMarkdown>
    </div>
  );
}
