"use client";

import { useEffect, useState } from "react";
import type { ServicesIndexCategory } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";

interface ServicesIndexCatalogRailProps {
  categories: Pick<ServicesIndexCategory, "id" | "title">[];
}

export function ServicesIndexCatalogRail({
  categories,
}: ServicesIndexCatalogRailProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");

  useEffect(() => {
    if (categories.length === 0) return;

    const elements = categories
      .map((category) => document.getElementById(category.id))
      .filter((node): node is HTMLElement => node !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          );

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [categories]);

  return (
    <div className="sticky top-[4.5rem] z-30 border-b-2 border-primary bg-background/95 backdrop-blur-sm sm:top-[5.25rem]">
      <nav
        aria-label="Service capability groups"
        className="container-page py-3"
      >
        <ul className="flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const active = category.id === activeId;
            return (
              <li key={category.id} className="shrink-0">
                <a
                  href={`#${category.id}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "relative inline-flex min-h-10 items-center px-3 text-small font-semibold transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                    active
                      ? "text-primary"
                      : "text-text-secondary hover:text-primary",
                  )}
                >
                  {category.title}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 bottom-0 h-0.5 origin-left bg-accent transition-transform duration-200",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
