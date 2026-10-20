import type { TocItem } from "@/lib/blog/extract-table-of-contents";

interface BlogTableOfContentsProps {
  items: TocItem[];
}

function TocList({ items }: BlogTableOfContentsProps) {
  if (items.length === 0) {
    return (
      <p className="text-small text-text-secondary">
        No sections available for this article.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.id}
          style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
        >
          <a
            href={`#${item.id}`}
            className="text-small text-text-secondary hover:text-link-hover hover:underline"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <details className="mb-8 rounded-lg border border-border bg-surface p-4 lg:hidden">
        <summary className="cursor-pointer text-body font-semibold text-text-primary">
          Table of contents
        </summary>
        <nav aria-label="Table of contents" className="mt-4">
          <TocList items={items} />
        </nav>
      </details>

      <aside className="hidden lg:block">
        <nav
          aria-label="Table of contents"
          className="sticky top-24 rounded-lg border border-border bg-surface p-4"
        >
          <p className="mb-3 text-small font-semibold uppercase tracking-wide text-text-secondary">
            On this page
          </p>
          <TocList items={items} />
        </nav>
      </aside>
    </>
  );
}
