import Link from "next/link";
import { cn } from "@/lib/utils";

interface ServiceBreadcrumbProps {
  label: string;
  className?: string;
  tone?: "light" | "onDark";
}

/**
 * Compact trail for service heroes — low visual weight.
 */
export function ServiceBreadcrumb({
  label,
  className,
  tone = "light",
}: ServiceBreadcrumbProps) {
  const onDark = tone === "onDark";

  return (
    <nav
      aria-label="Breadcrumb"
      className={className ?? "flex justify-center"}
    >
      <ol
        className={cn(
          "flex flex-wrap items-center justify-start gap-x-1.5 gap-y-1 text-xs font-medium",
          onDark ? "text-text-on-dark/70" : "text-text-secondary",
        )}
      >
        <li>
          <Link
            href="/"
            className={cn(
              "transition-colors hover:underline",
              onDark
                ? "text-text-on-dark/80 hover:text-accent"
                : "hover:text-primary",
            )}
          >
            Home
          </Link>
        </li>
        <li
          aria-hidden="true"
          className={onDark ? "text-text-on-dark/40" : "text-text-secondary/50"}
        >
          /
        </li>
        <li>
          <span className={onDark ? "text-text-on-dark/65" : "text-text-secondary/80"}>
            Services
          </span>
        </li>
        <li
          aria-hidden="true"
          className={onDark ? "text-text-on-dark/40" : "text-text-secondary/50"}
        >
          /
        </li>
        <li
          className={onDark ? "font-semibold text-accent" : "text-primary"}
          aria-current="page"
        >
          {label}
        </li>
      </ol>
    </nav>
  );
}
