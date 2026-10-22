"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PUBLISHER_SRC = "https://news.google.com/swg/js/v1/publisher.js";
const DEEPLINK = "https://www.google.com/preferences/source?q=ecomgliders.com";

type PreferredSourceApi = {
  init: (options: { theme?: "light" | "dark"; lang?: string }) => void;
  addPreferredSource: () => void;
};

declare global {
  interface Window {
    PREFERRED_SOURCE?: Array<(api: PreferredSourceApi) => void>;
  }
}

function GoogleGMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

/**
 * Dawn-style Preferred Sources.
 *
 * Dawn uses Google’s publisher.js flow so readers add the source on-page
 * (popup / sheet) and return to the article — not a forced preferences tab.
 * We use the same advanced pattern: manual control + addPreferredSource().
 * Deeplink opens only if the Google SDK never becomes ready.
 *
 * @see https://developers.google.com/search/docs/appearance/preferred-sources
 */
export function BlogPreferredSourceButton() {
  const apiRef = useRef<PreferredSourceApi | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  const bindApi = useCallback((api: PreferredSourceApi) => {
    try {
      api.init({ theme: "light", lang: "en" });
      apiRef.current = api;
      setReady(true);
    } catch {
      // Domain may not be eligible in Google’s preferences tool yet
    }
  }, []);

  useEffect(() => {
    window.PREFERRED_SOURCE = window.PREFERRED_SOURCE || [];
    window.PREFERRED_SOURCE.push(bindApi);

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${PUBLISHER_SRC}"]`,
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = PUBLISHER_SRC;
    script.async = true;
    // Prevent auto-scanning DOM buttons — we trigger manually (Dawn pattern)
    script.setAttribute("preferred-sources-control", "manual");
    document.head.appendChild(script);

    return () => {
      // Keep script cached for other articles in the SPA session
    };
  }, [bindApi]);

  function handleClick() {
    if (apiRef.current) {
      setBusy(true);
      try {
        apiRef.current.addPreferredSource();
      } finally {
        window.setTimeout(() => setBusy(false), 800);
      }
      return;
    }
    window.open(DEEPLINK, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-[#f8f9fa] px-3 py-1.5 text-[13px] font-medium text-[#202124] shadow-sm transition-colors hover:bg-[#f1f3f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-60"
      aria-label="Add eCom Gliders to Google Preferred Sources"
      title={
        ready
          ? "Add as a preferred source in Google Search"
          : "Loading Google… if this opens a new tab, the site may not be listed in Preferred Sources yet"
      }
    >
      <GoogleGMark className="h-4 w-4 shrink-0" />
      Add to Preferred Sources
    </button>
  );
}
