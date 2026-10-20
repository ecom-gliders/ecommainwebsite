import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BlogBreadcrumbProps {
  title: string;
}

export function BlogBreadcrumb({ title }: BlogBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-small text-text-secondary">
        <li>
          <Link href="/" className="hover:text-link-hover hover:underline">
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4" />
        </li>
        <li>
          <Link href="/blog/" className="hover:text-link-hover hover:underline">
            Blog
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4" />
        </li>
        <li className="text-text-primary" aria-current="page">
          <span className="line-clamp-1">{title}</span>
        </li>
      </ol>
    </nav>
  );
}
