import Link from "next/link";
import type { NavLink } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";

interface FooterLinkProps {
  link: NavLink;
  className?: string;
  tone?: "default" | "onDark";
}

export function FooterLink({
  link,
  className,
  tone = "default",
}: FooterLinkProps) {
  const sharedClassName = cn(
    "text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
    tone === "onDark"
      ? "font-medium text-text-on-dark/75 hover:text-accent focus-visible:ring-offset-primary"
      : "text-text-secondary hover:text-link-hover focus-visible:ring-offset-background",
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
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={sharedClassName}>
      {link.label}
    </Link>
  );
}
