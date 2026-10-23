import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AboutBreadcrumbProps {
  label?: string;
  tone?: "light" | "onDark";
}

export function AboutBreadcrumb({
  label = "About",
  tone = "light",
}: AboutBreadcrumbProps) {
  const onDark = tone === "onDark";

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1 text-small font-medium",
          onDark ? "text-text-on-dark/70" : "text-text-secondary",
        )}
      >
        <li>
          <Link
            href="/"
            className={cn(
              onDark
                ? "text-text-on-dark/80 hover:text-accent"
                : "hover:text-link-hover hover:underline",
            )}
          >
            Home
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
