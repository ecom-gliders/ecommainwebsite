"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { cn } from "@/lib/utils";

export interface BlogSearchSuggestion {
  slug: string;
  title: string;
  category?: string;
}

interface BlogIndexSearchProps {
  query?: string;
  suggestions?: BlogSearchSuggestion[];
  className?: string;
}

const MAX_SUGGESTIONS = 6;

function scoreSuggestion(item: BlogSearchSuggestion, needle: string): number {
  const title = item.title.toLowerCase();
  const slug = item.slug.toLowerCase();
  const category = (item.category ?? "").toLowerCase();
  if (title.startsWith(needle)) return 100;
  if (title.includes(needle)) return 80;
  if (category.includes(needle)) return 60;
  if (slug.includes(needle)) return 40;
  return 0;
}

export function BlogIndexSearch({
  query = "",
  suggestions = [],
  className,
}: BlogIndexSearchProps) {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(query);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [, startTransition] = useTransition();
  const deferredValue = useDeferredValue(value);

  useEffect(() => {
    setValue(query);
  }, [query]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const matches = useMemo(() => {
    const needle = deferredValue.trim().toLowerCase();
    if (needle.length < 2) return [];
    return suggestions
      .map((item) => ({ item, score: scoreSuggestion(item, needle) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, MAX_SUGGESTIONS)
      .map((entry) => entry.item);
  }, [deferredValue, suggestions]);

  const showPanel = open && value.trim().length >= 2;

  function goToSearch(nextQuery: string) {
    const trimmed = nextQuery.trim();
    setOpen(false);
    setActiveIndex(-1);
    startTransition(() => {
      router.push(trimmed ? `/blog/?q=${encodeURIComponent(trimmed)}` : "/blog/");
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activeIndex >= 0 && matches[activeIndex]) {
      router.push(`/${matches[activeIndex].slug}/`);
      setOpen(false);
      return;
    }
    goToSearch(value);
  }

  return (
    <div ref={rootRef} className={cn("relative z-50", className)}>
      <form action="/blog/" method="get" role="search" onSubmit={onSubmit}>
        <label htmlFor="blog-search" className="sr-only">
          Search articles
        </label>
        <div className="flex min-h-11 overflow-hidden rounded-[10px] border-2 border-primary bg-background shadow-[3px_3px_0_0_#131311] focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <Search
              className="h-4 w-4 shrink-0 text-text-secondary"
              aria-hidden="true"
            />
            <input
              id="blog-search"
              name="q"
              type="search"
              value={value}
              placeholder="Search PPC, SEO, listings…"
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls={listId}
              aria-expanded={showPanel}
              aria-activedescendant={
                activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
              }
              role="combobox"
              className="min-w-0 flex-1 bg-transparent text-small text-text-primary placeholder:text-text-secondary focus:outline-none"
              onChange={(event) => {
                setValue(event.target.value);
                setOpen(true);
                setActiveIndex(-1);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={(event) => {
                if (!showPanel || matches.length === 0) return;
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setActiveIndex((index) =>
                    index < matches.length - 1 ? index + 1 : 0,
                  );
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setActiveIndex((index) =>
                    index > 0 ? index - 1 : matches.length - 1,
                  );
                } else if (event.key === "Escape") {
                  setOpen(false);
                  setActiveIndex(-1);
                }
              }}
            />
          </div>
          <button
            type="submit"
            className="shrink-0 border-l-2 border-primary bg-accent px-4 text-small font-bold uppercase tracking-wide text-primary transition-colors hover:bg-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
          >
            Search
          </button>
        </div>
      </form>

      {showPanel ? (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 z-50 mt-2 max-h-[min(24rem,70vh)] overflow-y-auto rounded-[10px] border-2 border-primary bg-background text-left shadow-[4px_4px_0_0_#131311]"
        >
          {matches.length > 0 ? (
            <ul>
              {matches.map((item, index) => (
                <li key={item.slug} role="option" aria-selected={index === activeIndex}>
                  <Link
                    id={`${listId}-option-${index}`}
                    href={`/${item.slug}/`}
                    className={cn(
                      "block px-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
                      index === activeIndex
                        ? "bg-accent/40"
                        : "hover:bg-accent/25",
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setOpen(false)}
                  >
                    <span className="block text-small font-semibold text-primary">
                      {item.title}
                    </span>
                    {item.category ? (
                      <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                        {item.category}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
              <li className="border-t border-border">
                <button
                  type="button"
                  className="w-full px-4 py-2.5 text-left text-small font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-link-hover"
                  onClick={() => goToSearch(value)}
                >
                  Search all for “{value.trim()}”
                </button>
              </li>
            </ul>
          ) : (
            <p className="px-4 py-3 text-small text-text-secondary">
              No matching articles. Press Search to look across the full library.
            </p>
          )}
        </div>
      ) : null}

      {query ? (
        <p className="mt-2 text-center text-small text-text-secondary sm:text-left">
          <Link
            href="/blog/"
            className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-link-hover"
          >
            Clear search
          </Link>
        </p>
      ) : null}
    </div>
  );
}
