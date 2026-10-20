import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudyBreadcrumbProps {
  label: string;
  tone?: "light" | "onDark";
  className?: string;
}

export function CaseStudyBreadcrumb({
  label,
  tone = "light",
  className,
}: CaseStudyBreadcrumbProps) {
  const onDark = tone === "onDark";

  return (
    <nav aria-label="Breadcrumb" className={cn(className)}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1 text-small",
          onDark ? "text-text-on-dark/70" : "text-text-secondary",
        )}
      >
        <li>
          <Link
            href="/"
            className={cn(
              onDark
                ? "text-text-on-dark/75 hover:text-accent"
                : "hover:text-link-hover hover:underline",
            )}
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4 opacity-70" />
        </li>
        <li>
          <Link
            href="/case-studies/"
            className={cn(
              onDark
                ? "text-text-on-dark/75 hover:text-accent"
                : "hover:text-link-hover hover:underline",
            )}
          >
            Case studies
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4 opacity-70" />
        </li>
        <li
          className={cn(
            "font-semibold",
            onDark ? "text-accent" : "text-text-primary",
          )}
          aria-current="page"
        >
          {label}
        </li>
      </ol>
    </nav>
  );
}
