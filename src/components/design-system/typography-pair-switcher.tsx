"use client";

import { useCallback, useEffect, useState } from "react";
import {
  TYPOGRAPHY_PAIR_STORAGE_KEY,
  applyTypographyPairToDocument,
  getTypographyPairById,
  getTypographyPairs,
  typographyThemesConfig,
  type TypographyPair,
} from "@/lib/typography-themes";
import { cn } from "@/lib/utils";

/**
 * Design-system typography pair switcher.
 * Shows 5 live previews; selecting one updates --font-display / --font-sans on this page.
 */
export function TypographyPairSwitcher() {
  const pairs = getTypographyPairs();
  const [activeId, setActiveId] = useState(typographyThemesConfig.defaultPairId);
  const active = getTypographyPairById(activeId);

  useEffect(() => {
    const stored = window.localStorage.getItem(TYPOGRAPHY_PAIR_STORAGE_KEY);
    const initial = stored
      ? getTypographyPairById(stored)
      : getTypographyPairById(typographyThemesConfig.defaultPairId);
    setActiveId(initial.id);
    const timer = window.setTimeout(() => {
      applyTypographyPairToDocument(initial);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const selectPair = useCallback((pair: TypographyPair) => {
    setActiveId(pair.id);
    applyTypographyPairToDocument(pair);
    window.localStorage.setItem(TYPOGRAPHY_PAIR_STORAGE_KEY, pair.id);
  }, []);

  return (
    <div className="mb-10 space-y-4">
      <div>
        <p className="text-small font-semibold text-text-primary">
          Typography pairs
        </p>
        <p className="text-small mt-1 max-w-2xl text-text-secondary">
          Current site uses IBM Plex Sans. Compare 4 more professional pairs
          live — headings use display, body uses sans. Active:{" "}
          <span className="font-medium text-text-primary">{active.label}</span>
        </p>
      </div>

      <div
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        role="listbox"
        aria-label="Typography pair options"
      >
        {pairs.map((pair) => {
          const selected = pair.id === activeId;
          return (
            <button
              key={pair.id}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => selectPair(pair)}
              className={cn(
                "rounded-md border p-4 text-left transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                selected
                  ? "border-accent bg-accent/10"
                  : "border-border bg-background/90 hover:border-accent/40",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-text-primary">
                  {pair.label}
                </p>
                <span
                  className={cn(
                    "rounded-sm px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                    pair.status === "Current"
                      ? "bg-primary text-text-on-dark"
                      : "bg-surface text-text-secondary",
                  )}
                >
                  {pair.status}
                </span>
              </div>

              <p
                className="mt-4 text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-text-primary"
                style={{
                  fontFamily: `var(${pair.displayVar}), ${pair.displayFamily}, system-ui, sans-serif`,
                }}
              >
                Amazon growth partner
              </p>
              <p
                className="mt-2 text-[0.9375rem] leading-relaxed text-text-secondary"
                style={{
                  fontFamily: `var(${pair.bodyVar}), ${pair.bodyFamily}, system-ui, sans-serif`,
                }}
              >
                We help sellers scale with PPC, listing optimization, and
                full-service account management.
              </p>

              <p className="mt-3 text-[11px] text-text-secondary">
                Display: {pair.displayFamily}
                {pair.displayFamily !== pair.bodyFamily
                  ? ` · Body: ${pair.bodyFamily}`
                  : " · Body: same"}
              </p>
              <p className="mt-1 text-[11px] text-text-secondary">
                {pair.character}
              </p>
            </button>
          );
        })}
      </div>

      <p className="text-small text-text-secondary">
        Selecting a pair updates the samples below and the rest of this page.
        Production stays on IBM Plex until you approve a change.
      </p>
    </div>
  );
}
