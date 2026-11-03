import { ArrowRight } from "lucide-react";
import type { SiteConfig } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";
import { readString } from "./section-data";
import { SectionShell } from "./section-shell";

interface AskAiSectionProps {
  id: string;
  data: Record<string, unknown>;
  announcementBar: SiteConfig["announcementBar"];
}

/**
 * Homepage close — prominent Compare-with-AI panel (same prompts as the top bar).
 */
export function AskAiSection({
  id,
  data,
  announcementBar,
}: AskAiSectionProps) {
  const eyebrow = readString(data.eyebrow, announcementBar.kicker ?? "Compare with AI");
  const heading = readString(
    data.heading,
    "Ask AI whether eCom Gliders fits your Amazon brand",
  );
  const subheading = readString(
    data.subheading,
    announcementBar.message ??
      "Open ChatGPT, Claude, Gemini, or Perplexity with a ready prompt about working with eCom Gliders.",
  );
  const actions = announcementBar.actions ?? [];
  const headingId = `${id}-heading`;

  if (actions.length === 0) {
    return null;
  }

  return (
    <SectionShell
      id={id}
      tone="primary"
      ariaLabelledBy={headingId}
      className="py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-4xl text-center">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className="mt-3 text-[1.75rem] font-black leading-[1.08] tracking-[-0.03em] text-text-on-dark text-balance sm:text-[2.35rem] lg:text-[2.75rem]"
        >
          {heading}
        </h2>
        {subheading ? (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-on-dark/75 sm:text-lg">
            {subheading}
          </p>
        ) : null}

        <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4">
          {actions.map((action, index) => (
            <li key={`${action.href}-${action.label}`}>
              <a
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "group flex h-full items-center gap-4 rounded-[14px] border-2 border-text-on-dark/15 bg-text-on-dark px-4 py-4 text-left text-primary shadow-[4px_4px_0_0_#0a0a09] transition-transform sm:px-5 sm:py-5",
                  "hover:-translate-y-0.5 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
                  index % 2 === 1 && "sm:bg-accent",
                )}
              >
                {action.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element -- tiny local SVGs
                  <img
                    src={action.icon}
                    alt={`${action.label} logo`}
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 object-contain"
                    decoding="async"
                    fetchPriority="low"
                  />
                ) : null}
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-black tracking-tight">
                    {action.label}
                  </span>
                  <span className="mt-0.5 block text-small font-medium text-primary/70">
                    Open with a ready prompt
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-primary text-text-on-dark"
                >
                  <ArrowRight size={15} strokeWidth={2.5} />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
