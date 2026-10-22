"use client";

import { ListTree } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogTocRailCta } from "@/components/blog/blog-toc-rail-cta";
import {
  stripLeadingOutlineNumber,
  type TocItem,
} from "@/lib/blog/extract-table-of-contents";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface BlogTableOfContentsProps {
  items: TocItem[];
  /** Show compact free-audit CTA under desktop TOC */
  showRailCta?: boolean;
  ctaHref?: string;
}

function TocList({
  items,
  activeId,
  onNavigate,
}: {
  items: TocItem[];
  activeId: string | null;
  onNavigate: (id: string) => void;
}) {
  if (items.length === 0) {
    return (
      <p className="text-sm font-medium text-text-secondary">
        No sections available for this article.
      </p>
    );
  }

  let mainIndex = 0;

  return (
    <ol className="m-0 list-none space-y-0 p-0">
      {items.map((item) => {
        const isActive = activeId === item.id;
        const isChild = item.depth > 0;
        if (!isChild) mainIndex += 1;
        // Top-level rows get a TOC index badge — strip any heading `1.` prefix
        // so labels never read as "2. 1. Tip title". Nested tips keep their
        // own outline number in the label (no badge).
        const label = isChild
          ? item.text
          : stripLeadingOutlineNumber(item.text);

        return (
          <li
            key={item.id}
            className={
              isChild ? "ml-2.5 border-l-2 border-accent/60 pl-2" : undefined
            }
          >
            <a
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.id);
              }}
              className={
                isActive
                  ? isChild
                    ? "block py-1 pl-1.5 text-[13px] font-semibold text-primary"
                    : "flex gap-2 bg-accent/30 py-1.5 pl-1.5 pr-2 text-sm font-semibold text-primary"
                  : isChild
                    ? "block py-1 pl-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary"
                    : "flex gap-2 py-1.5 pl-1.5 pr-2 text-sm font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary"
              }
              aria-current={isActive ? "location" : undefined}
            >
              {!isChild ? (
                <span
                  className={
                    isActive
                      ? "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-primary text-[11px] font-bold text-text-on-dark"
                      : "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-border text-[11px] font-semibold text-text-secondary"
                  }
                  aria-hidden="true"
                >
                  {mainIndex}
                </span>
              ) : null}
              <span className="min-w-0 leading-snug">{label}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

function resolveActiveHeadingId(items: TocItem[]): string | null {
  if (items.length === 0) return null;
  const marker = 140;
  let current = items[0].id;
  for (const item of items) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= marker) {
      current = item.id;
    }
  }
  return current;
}

export function BlogTableOfContents({
  items,
  showRailCta = true,
  ctaHref = "/free-audit-2/",
}: BlogTableOfContentsProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(
    items[0]?.id ?? null,
  );

  useEffect(() => {
    if (items.length === 0) return;
    const sync = () => setActiveId(resolveActiveHeadingId(items));
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [items]);

  function navigateTo(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  }

  if (items.length === 0) return null;

  const header = (
    <div className="mb-3 flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center bg-accent text-primary">
        <ListTree className="h-4 w-4" aria-hidden="true" />
      </span>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
        On this page
      </p>
    </div>
  );

  return (
    <>
      <details className="mb-8 border-2 border-primary bg-surface p-3 shadow-[3px_3px_0_0_#131311] lg:hidden">
        <summary className="cursor-pointer text-small font-semibold text-text-primary">
          Table of contents
        </summary>
        <nav aria-label="Table of contents" className="mt-3">
          {header}
          <TocList items={items} activeId={activeId} onNavigate={navigateTo} />
        </nav>
        {showRailCta ? (
          <div className="mt-4">
            <BlogTocRailCta href={ctaHref} />
          </div>
        ) : null}
      </details>

      <aside className="hidden lg:block">
        <div className="sticky top-28 flex max-h-[calc(100vh-7.5rem)] flex-col gap-3">
          <nav
            aria-label="Table of contents"
            className="min-h-0 flex-1 overflow-y-auto border-2 border-primary bg-surface p-3 shadow-[3px_3px_0_0_#131311]"
          >
            {header}
            <TocList
              items={items}
              activeId={activeId}
              onNavigate={navigateTo}
            />
          </nav>
          {showRailCta ? <BlogTocRailCta href={ctaHref} /> : null}
        </div>
      </aside>
    </>
  );
}
