import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogTocRailCtaProps {
  href?: string;
  headline?: string;
  body?: string;
  label?: string;
}

/**
 * Compact left-rail CTA under the TOC (audit offer).
 * EG theming: accent panel, ink border, offset shadow.
 */
export function BlogTocRailCta({
  href = "/free-audit/",
  headline = "See what your campaigns are missing",
  body = "Get a free audit of your account — wasted spend, missed keywords, and what to fix first.",
  label = "Get my free audit",
}: BlogTocRailCtaProps) {
  return (
    <aside
      aria-label="Free account audit"
      className="border-2 border-primary bg-accent/35 p-3.5 shadow-[3px_3px_0_0_#131311]"
    >
      <p className="text-sm font-bold leading-snug tracking-tight text-text-primary">
        {headline}
      </p>
      <p className="mt-1.5 text-[13px] font-medium leading-snug text-text-secondary">
        {body}
      </p>
      <Link
        href={href}
        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 border-2 border-primary bg-primary px-3 py-2.5 text-sm font-bold text-text-on-dark shadow-[2px_2px_0_0_#131311] transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {label}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </aside>
  );
}
