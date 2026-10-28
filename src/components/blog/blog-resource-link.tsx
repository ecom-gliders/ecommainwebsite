import Link from "next/link";
import { Download } from "lucide-react";

interface BlogResourceLinkProps {
  title: string;
  description?: string;
  href: string;
  label?: string;
}

function isInternal(href: string): boolean {
  if (href.startsWith("/")) return true;
  try {
    return new URL(href).hostname.replace(/^www\./, "") === "ecomgliders.com";
  } catch {
    return false;
  }
}

export function BlogResourceLink({
  title,
  description,
  href,
  label = "Open resource",
}: BlogResourceLinkProps) {
  const className =
    "mt-3 inline-flex items-center gap-2 border-2 border-primary bg-accent px-4 py-2 text-small font-semibold text-primary shadow-[2px_2px_0_0_#131311] hover:-translate-y-0.5";

  const cta = (
    <>
      <Download className="h-4 w-4" aria-hidden="true" />
      {label}
    </>
  );

  return (
    <aside className="my-8 border-2 border-primary bg-background p-5 shadow-[3px_3px_0_0_#131311]">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
        Resource
      </p>
      <p className="mt-1 text-h4 text-text-primary">{title}</p>
      {description ? (
        <p className="mt-2 text-small font-medium text-text-secondary">{description}</p>
      ) : null}
      {isInternal(href) ? (
        <Link href={href} className={className}>
          {cta}
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {cta}
        </a>
      )}
    </aside>
  );
}

/** Body: `title | description | label | href` */
export function parseResourceLinkBody(body: string): BlogResourceLinkProps | null {
  const line = body.split("\n").map((l) => l.trim()).find(Boolean);
  if (!line) return null;
  const parts = line.split("|").map((p) => p.trim());
  if (parts.length < 2) return null;
  if (parts.length === 2) {
    return { title: parts[0], href: parts[1] };
  }
  if (parts.length === 3) {
    return { title: parts[0], description: parts[1], href: parts[2] };
  }
  return {
    title: parts[0],
    description: parts[1],
    label: parts[2],
    href: parts[3],
  };
}
