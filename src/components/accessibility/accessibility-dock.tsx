"use client";

import {
  Accessibility,
  ArrowUp,
  Contrast,
  Minus,
  Plus,
  RotateCcw,
  Type,
  X,
} from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "eg-a11y-prefs";

type TextScale = "md" | "lg" | "xl";

interface A11yPrefs {
  text: TextScale;
  contrast: boolean;
  reduceMotion: boolean;
}

const DEFAULT_PREFS: A11yPrefs = {
  text: "md",
  contrast: false,
  reduceMotion: false,
};

function readPrefs(): A11yPrefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<A11yPrefs>;
    return {
      text: parsed.text === "lg" || parsed.text === "xl" ? parsed.text : "md",
      contrast: Boolean(parsed.contrast),
      reduceMotion: Boolean(parsed.reduceMotion),
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

function applyPrefs(prefs: A11yPrefs) {
  const root = document.documentElement;
  if (prefs.text === "md") root.removeAttribute("data-a11y-text");
  else root.setAttribute("data-a11y-text", prefs.text);

  if (prefs.contrast) root.setAttribute("data-a11y-contrast", "high");
  else root.removeAttribute("data-a11y-contrast");

  if (prefs.reduceMotion) root.setAttribute("data-a11y-motion", "reduce");
  else root.removeAttribute("data-a11y-motion");
}

export function AccessibilityDock() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULT_PREFS);

  useEffect(() => {
    const initial = readPrefs();
    setPrefs(initial);
    applyPrefs(initial);
  }, []);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 480);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const commit = useCallback((next: A11yPrefs) => {
    setPrefs(next);
    applyPrefs(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore quota */
    }
  }, []);

  function bumpText(direction: 1 | -1) {
    const order: TextScale[] = ["md", "lg", "xl"];
    const index = order.indexOf(prefs.text);
    const next = order[Math.min(order.length - 1, Math.max(0, index + direction))];
    commit({ ...prefs, text: next });
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={`${panelId}-title`}
          className="pointer-events-auto w-[min(100vw-2rem,20rem)] rounded-[12px] border-2 border-primary bg-background p-4 shadow-[4px_4px_0_0_#131311]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                id={`${panelId}-title`}
                className="text-small font-bold uppercase tracking-wide text-primary"
              >
                Accessibility
              </p>
              <p className="mt-1 text-[12px] leading-snug text-text-secondary">
                Adjust text size and contrast. Settings stay on this device.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border-2 border-primary text-primary transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close accessibility settings"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-[10px] border-2 border-primary/20 p-3">
              <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-primary">
                <Type className="h-3.5 w-3.5" aria-hidden="true" />
                Text size
              </p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border-2 border-primary text-primary transition-colors hover:bg-accent disabled:opacity-40"
                  aria-label="Decrease text size"
                  disabled={prefs.text === "md"}
                  onClick={() => bumpText(-1)}
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="flex-1 text-center text-small font-semibold text-primary">
                  {prefs.text === "md"
                    ? "Default"
                    : prefs.text === "lg"
                      ? "Large"
                      : "Larger"}
                </p>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border-2 border-primary text-primary transition-colors hover:bg-accent disabled:opacity-40"
                  aria-label="Increase text size"
                  disabled={prefs.text === "xl"}
                  onClick={() => bumpText(1)}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <button
              type="button"
              aria-pressed={prefs.contrast}
              className={cn(
                "flex w-full items-center gap-3 rounded-[10px] border-2 px-3 py-3 text-left text-small font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                prefs.contrast
                  ? "border-accent bg-accent text-primary"
                  : "border-primary text-primary hover:bg-accent/40",
              )}
              onClick={() => commit({ ...prefs, contrast: !prefs.contrast })}
            >
              <Contrast className="h-4 w-4 shrink-0" aria-hidden="true" />
              Stronger text contrast
            </button>

            <button
              type="button"
              aria-pressed={prefs.reduceMotion}
              className={cn(
                "flex w-full items-center gap-3 rounded-[10px] border-2 px-3 py-3 text-left text-small font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                prefs.reduceMotion
                  ? "border-accent bg-accent text-primary"
                  : "border-primary text-primary hover:bg-accent/40",
              )}
              onClick={() =>
                commit({ ...prefs, reduceMotion: !prefs.reduceMotion })
              }
            >
              Reduce motion
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-[10px] border-2 border-primary px-3 py-2.5 text-small font-semibold text-primary transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => commit(DEFAULT_PREFS)}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>
      ) : null}

      <div className="pointer-events-auto flex flex-col items-end gap-2">
        {showTop ? (
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border-2 border-primary bg-background text-primary shadow-[3px_3px_0_0_#131311] transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </button>
        ) : null}

        <button
          type="button"
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-[10px] border-2 border-primary shadow-[3px_3px_0_0_#131311] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
            open ? "bg-accent text-primary" : "bg-primary text-text-on-dark hover:bg-primary-dark",
          )}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close accessibility settings" : "Open accessibility settings"}
          onClick={() => setOpen((value) => !value)}
        >
          <Accessibility className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
