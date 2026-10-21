import {
  BlogIndexSearch,
  type BlogSearchSuggestion,
} from "@/components/blog/blog-index-search";
import { SectionShell } from "@/components/sections/section-shell";
import { cn } from "@/lib/utils";

interface BlogIndexMastheadProps {
  totalCount: number;
  compact?: boolean;
  query?: string;
  suggestions?: BlogSearchSuggestion[];
}

export function BlogIndexMasthead({
  totalCount,
  compact = false,
  query = "",
  suggestions = [],
}: BlogIndexMastheadProps) {
  return (
    <SectionShell
      id="blog-index-masthead"
      ariaLabelledBy="blog-index-heading"
      className={cn(
        "relative overflow-hidden",
        compact ? "py-10 sm:py-12" : "py-14 sm:py-16 lg:py-20",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className={cn(compact ? "max-w-3xl" : "mx-auto max-w-4xl text-center")}>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">
          eCom Gliders Insights
        </p>
        <h1
          id="blog-index-heading"
          className={cn(
            "mt-3 font-black tracking-[-0.04em] text-primary",
            compact
              ? "text-[2rem] leading-[1.1] sm:text-[2.5rem]"
              : "text-[2.25rem] leading-[1.05] sm:text-[3rem] lg:text-[3.75rem]",
          )}
        >
          Amazon Seller Insights
        </h1>
        <p
          className={cn(
            "mt-4 text-body text-text-secondary",
            !compact && "mx-auto max-w-2xl sm:text-lg",
          )}
        >
          Practical playbooks on Amazon PPC, SEO, listing optimization, and full
          account management — {totalCount} articles from the eCom Gliders team.
        </p>
        <BlogIndexSearch
          query={query}
          suggestions={suggestions}
          className={cn("mt-8", !compact && "mx-auto max-w-xl")}
        />
      </div>
    </SectionShell>
  );
}
