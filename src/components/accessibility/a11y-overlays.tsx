"use client";

import { useEffect, useState } from "react";
import type { A11yPrefs } from "@/lib/a11y/prefs";

interface HeadingItem {
  id: string;
  level: number;
  text: string;
}

function ensureHeadingId(el: HTMLElement, index: number): string {
  if (el.id) return el.id;
  const slug = `a11y-heading-${index}`;
  el.id = slug;
  return slug;
}

export function A11yReadingOverlays({ cursor }: { cursor: A11yPrefs["cursor"] }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (cursor !== 2 && cursor !== 3) return;
    function onMove(event: MouseEvent) {
      setPos({ x: event.clientX, y: event.clientY });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursor]);

  if (cursor === 2) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 z-[55] h-10 border-y-2 border-accent bg-accent/25"
        style={{ top: Math.max(0, pos.y - 20) }}
      />
    );
  }

  if (cursor === 3) {
    const band = 140;
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[55]"
        style={{
          background: `linear-gradient(to bottom,
            rgba(19,19,17,0.72) 0,
            rgba(19,19,17,0.72) calc(${pos.y}px - ${band / 2}px),
            transparent calc(${pos.y}px - ${band / 2}px),
            transparent calc(${pos.y}px + ${band / 2}px),
            rgba(19,19,17,0.72) calc(${pos.y}px + ${band / 2}px),
            rgba(19,19,17,0.72) 100%)`,
        }}
      />
    );
  }

  return null;
}

export function A11yImageTooltips({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const images = Array.from(document.querySelectorAll("img"));
    const previous = new Map<HTMLImageElement, string | null>();

    for (const img of images) {
      previous.set(img, img.getAttribute("title"));
      const alt = img.getAttribute("alt")?.trim();
      if (alt && !img.getAttribute("title")) {
        img.setAttribute("title", alt);
        img.dataset.a11yTooltip = "1";
      }
    }

    return () => {
      for (const [img, title] of previous) {
        if (img.dataset.a11yTooltip === "1") {
          if (title === null) img.removeAttribute("title");
          else img.setAttribute("title", title);
          delete img.dataset.a11yTooltip;
        }
      }
    };
  }, [enabled]);

  return null;
}

export function A11yPageStructurePanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    if (!open) return;
    const nodes = Array.from(
      document.querySelectorAll("main h1, main h2, main h3, main h4"),
    ) as HTMLElement[];
    setHeadings(
      nodes.map((el, index) => ({
        id: ensureHeadingId(el, index),
        level: Number(el.tagName.slice(1)),
        text: el.innerText.trim() || el.tagName,
      })),
    );
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Page structure"
      data-a11y-chrome="true"
      className="pointer-events-auto fixed bottom-24 right-4 z-[61] w-[min(100vw-2rem,20rem)] rounded-[12px] border-2 border-primary bg-background p-4 shadow-[4px_4px_0_0_#131311] sm:right-6"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-small font-bold uppercase tracking-wide text-primary">
          Page structure
        </p>
        <button
          type="button"
          className="text-small font-semibold text-primary underline-offset-2 hover:underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      {headings.length === 0 ? (
        <p className="mt-3 text-xs text-text-secondary">
          No headings found on this page.
        </p>
      ) : (
        <ul className="mt-3 max-h-64 space-y-1 overflow-y-auto">
          {headings.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="w-full rounded-[8px] px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{ paddingLeft: `${(item.level - 1) * 10 + 8}px` }}
                onClick={() => {
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  onClose();
                }}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
