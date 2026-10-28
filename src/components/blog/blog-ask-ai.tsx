"use client";

import { MoreHorizontal, Sparkles, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { SiteConfig } from "@/domain/content/schemas";

interface BlogAskAiProps {
  title: string;
  url: string;
  site: SiteConfig;
}

function buildArticlePrompt(title: string, url: string): string {
  return [
    `I am reading this eCom Gliders article: "${title}".`,
    `URL: ${url}`,
    "Summarize the main points in plain language, list actionable takeaways for Amazon sellers, and flag anything I should verify in Seller Central.",
    "Do not invent metrics that are not in the article. Keep recommendations practical.",
  ].join(" ");
}

function withPrompt(baseHref: string, prompt: string): string {
  try {
    const parsed = new URL(baseHref);
    parsed.searchParams.set("q", prompt);
    return parsed.toString();
  } catch {
    const joiner = baseHref.includes("?") ? "&" : "?";
    return `${baseHref}${joiner}q=${encodeURIComponent(prompt)}`;
  }
}

/** Match Share rail: 4-col grid, same shell width. Show 3 + more when 4+ actions. */
const ROW_VISIBLE = 3;

const iconBtnClass =
  "inline-flex h-9 w-full items-center justify-center border-2 border-primary bg-background text-primary shadow-[2px_2px_0_0_#131311] transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const railShellClass =
  "grid w-full grid-cols-4 gap-1.5 border-2 border-primary bg-background p-2 shadow-[3px_3px_0_0_#131311]";

export function BlogAskAi({ title, url, site }: BlogAskAiProps) {
  const actions = site.announcementBar?.actions ?? [];
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
  }, [menuOpen]);

  if (actions.length === 0) return null;

  const prompt = buildArticlePrompt(title, url);
  const row = actions.slice(0, ROW_VISIBLE);

  return (
    <section aria-labelledby="blog-ask-ai-heading" className="w-full">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center bg-accent text-primary">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <h2
          id="blog-ask-ai-heading"
          className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary"
        >
          Ask AI
        </h2>
      </div>

      <div className={railShellClass}>
        {row.map((action) => (
          <a
            key={action.label}
            href={withPrompt(action.href, prompt)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ask ${action.label} about this article`}
            title={action.label}
            className={iconBtnClass}
          >
            {action.icon ? (
              // eslint-disable-next-line @next/next/no-img-element -- tiny local SVGs
              <img
                src={action.icon}
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain"
                decoding="async"
              />
            ) : (
              <span className="text-xs font-bold text-primary">
                {action.label.slice(0, 2)}
              </span>
            )}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="More AI options"
          title="More"
          className={iconBtnClass}
        >
          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
        </button>
        {/* Pad to a full 4-col row when fewer than 3 providers */}
        {row.length < ROW_VISIBLE
          ? Array.from({ length: ROW_VISIBLE - row.length }).map((_, i) => (
              <span key={`pad-${i}`} className="invisible h-9" aria-hidden="true" />
            ))
          : null}
      </div>

      <dialog
        ref={dialogRef}
        className="w-[min(100%,20rem)] border-2 border-primary bg-surface p-0 text-text-primary shadow-[6px_6px_0_0_#131311] open:fixed open:left-1/2 open:top-1/2 open:-translate-x-1/2 open:-translate-y-1/2 backdrop:bg-primary/40"
        onClose={() => setMenuOpen(false)}
        aria-labelledby={titleId}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p
            id={titleId}
            className="text-small font-bold uppercase tracking-[0.12em]"
          >
            Ask AI about this article
          </p>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center border border-border hover:bg-accent"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <ul className="m-0 flex list-none flex-col gap-2 p-3">
          {actions.map((action) => (
            <li key={action.label}>
              <a
                href={withPrompt(action.href, prompt)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center gap-3 border-2 border-primary bg-background px-3 py-2.5 text-small font-medium text-primary shadow-[2px_2px_0_0_#131311] hover:bg-accent"
                onClick={() => setMenuOpen(false)}
              >
                {action.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element -- tiny local SVGs
                  <img
                    src={action.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                    decoding="async"
                  />
                ) : null}
                {action.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </dialog>
    </section>
  );
}
