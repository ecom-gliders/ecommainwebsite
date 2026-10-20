import Link from "next/link";
import type { NavLink } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";

interface NavLinkItemProps {
  link: NavLink;
  className?: string;
  showDescription?: boolean;
  compact?: boolean;
}

export function NavLinkItem({
  link,
  className,
  showDescription = false,
  compact = false,
}: NavLinkItemProps) {
  const isFeatured = Boolean(link.featured);

  const content = (
    <>
      <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span
          className={cn(
            "text-sm font-medium text-text-primary underline-offset-[3px] decoration-accent decoration-2 break-words",
            "group-hover:text-link-hover group-hover:underline",
            isFeatured && "text-primary",
          )}
        >
          {link.label}
        </span>
        {isFeatured ? (
          <span className="rounded-[3px] bg-accent px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-primary">
            Featured
          </span>
        ) : null}
      </span>
      {showDescription && link.description ? (
        <span
          className={cn(
            "mt-0.5 block text-text-secondary",
            compact ? "text-xs leading-snug" : "text-small",
          )}
        >
          {link.description}
        </span>
      ) : null}
    </>
  );

  const sharedClassName = cn(
    "group block rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
    compact ? "px-0 py-1" : "px-1 py-1.5",
    className,
  );

  if (link.external) {
    return (
      <a
        href={link.href}
        className={sharedClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className={sharedClassName}>
      {content}
    </Link>
  );
}
