import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface BlogCtaBlockData {
  title: string;
  description?: string;
  label: string;
  href: string;
}

interface BlogCtaBlockProps {
  data: BlogCtaBlockData;
}

function isInternalHref(href: string): boolean {
  if (href.startsWith("/")) return true;
  try {
    const host = new URL(href).hostname.replace(/^www\./, "");
    return host === "ecomgliders.com";
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

export function BlogCtaBlock({ data }: BlogCtaBlockProps) {
  const internal = isInternalHref(data.href);
  const className =
    "inline-flex min-h-11 items-center gap-2 border-2 border-primary bg-accent px-5 py-2.5 text-small font-semibold text-primary shadow-[3px_3px_0_0_#131311] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#131311] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

  const label = (
    <>
      {data.label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </>
  );

  return (
    <aside className="my-8 border-2 border-primary bg-surface p-6 shadow-[3px_3px_0_0_#131311]">
      {data.title ? (
        <p className="text-h4 mb-2 text-text-primary">{data.title}</p>
      ) : null}
      {data.description ? (
        <p className="text-body mb-4 text-text-secondary">{data.description}</p>
      ) : null}
      {internal ? (
        <Link href={toInternalPath(data.href)} className={className}>
          {label}
        </Link>
      ) : (
        <a
          href={data.href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      )}
    </aside>
  );
}

/** Body: title | description | label | href  (description optional empty) */
export function parseCtaBlockBody(body: string): BlogCtaBlockData | null {
  const parts = body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const line = parts[0] ?? "";
  const cols = line.split("|").map((c) => c.trim());
  if (cols.length >= 4) {
    const [title, description, label, href] = cols;
    if (!label || !href) return null;
    return { title, description, label, href };
  }
  if (cols.length === 3) {
    const [title, label, href] = cols;
    if (!label || !href) return null;
    return { title, label, href };
  }
  return null;
}
