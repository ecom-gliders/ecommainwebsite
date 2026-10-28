"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

const CALENDLY_SCRIPT_SRC =
  "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_STYLESHEET_HREF =
  "https://assets.calendly.com/assets/external/widget.css";

const ALLOWED_CALENDLY_ORIGIN = "https://calendly.com";

/**
 * Brand tokens (hex without #) — matches design-system.json accent cards.
 * background = lime; text/primary = ink for contrast on lime slot UI.
 */
const EMBED_THEME = {
  backgroundColor: "C6FD50",
  textColor: "131311",
  primaryColor: "131311",
} as const;

/** Visible calendar viewport — scroll happens on our shell (branded), not Calendly’s grey bar */
const EMBED_VIEWPORT_PX = 560;

interface CalendlyApi {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
    resize?: boolean;
  }) => void;
}

declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}

export interface CalendlyInlineEmbedProps {
  /** Full Calendly event URL, e.g. https://calendly.com/ecomgliders-llc/30min */
  url: string;
  title?: string;
  /** Small label above the calendar slot (defaults to Free audit call). */
  eyebrow?: string;
}

function assertAllowedCalendlyUrl(url: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("Calendly URL is invalid.");
  }
  if (parsed.origin !== ALLOWED_CALENDLY_ORIGIN || parsed.protocol !== "https:") {
    throw new Error("Calendly URL must be an https://calendly.com link.");
  }
  return parsed;
}

/** Append brand theme + embed flags without dropping the event path. */
function buildThemedEmbedUrl(baseUrl: string): string {
  const parsed = assertAllowedCalendlyUrl(baseUrl);
  parsed.searchParams.set("background_color", EMBED_THEME.backgroundColor);
  parsed.searchParams.set("text_color", EMBED_THEME.textColor);
  parsed.searchParams.set("primary_color", EMBED_THEME.primaryColor);
  parsed.searchParams.set("hide_gdpr_banner", "1");
  parsed.searchParams.set("hide_event_type_details", "1");
  parsed.searchParams.set("hide_landing_page_details", "1");
  return parsed.toString();
}

function ensureCalendlyAssets(): Promise<void> {
  if (typeof document === "undefined") {
    return Promise.resolve();
  }

  if (!document.querySelector(`link[href="${CALENDLY_STYLESHEET_HREF}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CALENDLY_STYLESHEET_HREF;
    document.head.appendChild(link);
  }

  if (window.Calendly) {
    return Promise.resolve();
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${CALENDLY_SCRIPT_SRC}"]`,
  );
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.Calendly) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Calendly script failed to load.")),
        { once: true },
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Calendly script failed to load."));
    document.body.appendChild(script);
  });
}

function isCalendlyMessage(data: unknown): data is { event: string } {
  return (
    typeof data === "object" &&
    data !== null &&
    "event" in data &&
    typeof (data as { event: unknown }).event === "string" &&
    (data as { event: string }).event.startsWith("calendly.")
  );
}

function CalendlyLoader() {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-accent"
      role="status"
      aria-live="polite"
    >
      <span
        className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-primary/80">Loading calendar…</p>
    </div>
  );
}

/**
 * Inline Calendly booking widget.
 * Fixed compact height + resize off → Calendly’s stepped date → time flow inside the iframe.
 */
export function CalendlyInlineEmbed({
  url,
  title = "Schedule a meeting",
  eyebrow = "Free audit call",
}: CalendlyInlineEmbedProps) {
  const regionId = useId();
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const themedUrl = useMemo(() => buildThemedEmbedUrl(url), [url]);
  const openInTabUrl = useMemo(
    () => assertAllowedCalendlyUrl(url).toString(),
    [url],
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let revealed = false;
    const startedAt = Date.now();
    const MIN_LOADER_MS = 450;
    setReady(false);
    setFailed(false);

    const reveal = () => {
      if (cancelled || revealed) return;
      revealed = true;
      const wait = Math.max(0, MIN_LOADER_MS - (Date.now() - startedAt));
      window.setTimeout(() => {
        if (!cancelled) setReady(true);
      }, wait);
    };

    const onMessage = (event: MessageEvent) => {
      if (cancelled) return;
      if (
        typeof event.origin === "string" &&
        !event.origin.includes("calendly.com")
      ) {
        return;
      }
      if (!isCalendlyMessage(event.data)) return;
      if (
        event.data.event === "calendly.event_type_viewed" ||
        event.data.event === "calendly.date_and_time_selected" ||
        event.data.event === "calendly.profile_page_viewed"
      ) {
        reveal();
      }
    };

    window.addEventListener("message", onMessage);

    void ensureCalendlyAssets()
      .then(() => {
        if (cancelled || !hostRef.current || !window.Calendly) return;
        hostRef.current.replaceChildren();
        window.Calendly.initInlineWidget({
          url: themedUrl,
          parentElement: hostRef.current,
          // Grow inner content; our shell scrolls with brand scrollbar colors
          resize: true,
        });
        window.setTimeout(() => {
          reveal();
        }, 3500);
      })
      .catch(() => {
        if (cancelled || !hostRef.current) return;
        setFailed(true);
        const iframe = document.createElement("iframe");
        const fallback = new URL(themedUrl);
        fallback.searchParams.set("embed_type", "Inline");
        iframe.src = fallback.toString();
        iframe.title = title;
        iframe.className = "w-full border-0";
        iframe.style.minHeight = `${EMBED_VIEWPORT_PX}px`;
        iframe.setAttribute("loading", "eager");
        iframe.setAttribute(
          "allow",
          "camera; microphone; fullscreen; payment",
        );
        iframe.onload = () => {
          reveal();
        };
        hostRef.current.replaceChildren(iframe);
      });

    return () => {
      cancelled = true;
      window.removeEventListener("message", onMessage);
      host.replaceChildren();
    };
  }, [themedUrl, title]);

  return (
    <div
      id={regionId}
      role="region"
      aria-label={title}
      aria-busy={!ready}
      className="w-full overflow-hidden border-2 border-primary bg-accent text-primary shadow-[4px_4px_0_0_#131311]"
    >
      <div className="flex items-center justify-between gap-3 border-b-2 border-primary px-3 py-2 sm:px-4">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary">
          {eyebrow}
        </p>
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary/70">
          Pick a slot
        </p>
      </div>
      <div
        className="calendly-brand-scroll relative w-full overflow-x-hidden overflow-y-auto bg-accent"
        style={{ height: EMBED_VIEWPORT_PX, maxHeight: EMBED_VIEWPORT_PX }}
      >
        {!ready ? <CalendlyLoader /> : null}
        <div
          ref={hostRef}
          className={`calendly-inline-widget w-full bg-accent [&_iframe]:w-full ${
            ready ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{ minWidth: 320, minHeight: EMBED_VIEWPORT_PX }}
          data-url={themedUrl}
          aria-hidden={!ready}
        />
      </div>
      <p className="border-t-2 border-primary px-3 py-2 text-sm font-medium text-primary/80 sm:px-4">
        {failed
          ? "Calendar could not load in place. "
          : "Prefer a new tab? "}
        <a
          href={openInTabUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-primary underline-offset-4 hover:underline"
        >
          Open Calendly
        </a>
      </p>
    </div>
  );
}
