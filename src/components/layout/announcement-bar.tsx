import type { SiteConfig } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";
import { PromoAnnouncementBar } from "./promo-announcement-bar";

interface AnnouncementBarProps {
  site: SiteConfig;
}

/**
 * Site top bar — event promo banner (default) or Ask-AI chip strip.
 * Promo copy/images/CTA live in site.json → announcementBar.promo.
 */
export function AnnouncementBar({ site }: AnnouncementBarProps) {
  const { announcementBar } = site;

  if (!announcementBar.enabled) {
    return null;
  }

  const variant = announcementBar.variant ?? "promo";

  if (variant === "promo" && announcementBar.promo) {
    return <PromoAnnouncementBar promo={announcementBar.promo} />;
  }

  return <AiAnnouncementBar announcementBar={announcementBar} />;
}

function AiAnnouncementBar({
  announcementBar,
}: {
  announcementBar: SiteConfig["announcementBar"];
}) {
  const message = announcementBar.message;
  const kicker = announcementBar.kicker;
  const actions = announcementBar.actions ?? [];
  const legacyItems = announcementBar.items ?? [];
  const hasPromoLayout = Boolean(message) || actions.length > 0;

  if (!hasPromoLayout && legacyItems.length === 0) {
    return null;
  }

  return (
    <div
      className="border-b border-border bg-primary text-text-on-dark"
      role="region"
      aria-label="Ask an AI assistant about eCom Gliders"
    >
      <div className="container-page flex flex-col gap-2.5 py-2.5 sm:gap-3 sm:py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-2.5">
        <div className="min-w-0 space-y-0.5 sm:space-y-1">
          {kicker ? (
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {kicker}
            </p>
          ) : null}
          {message ? (
            <>
              <p className="text-[13px] leading-snug text-text-on-dark/95 sm:hidden">
                Ready prompts about working with eCom Gliders.
              </p>
              <p className="hidden text-small leading-snug text-text-on-dark/95 sm:block sm:text-sm">
                {message}
              </p>
            </>
          ) : (
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-small">
              {legacyItems.map((item, index) => (
                <span key={item} className="inline-flex items-center gap-3">
                  {index > 0 ? (
                    <span
                      className="hidden h-3 w-px shrink-0 bg-text-on-dark/35 sm:inline-block"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span>{item}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {actions.length > 0 ? (
          <ul className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-2.5 lg:shrink-0 lg:justify-end">
            {actions.map((action) => (
              <li key={`${action.href}-${action.label}`} className="min-w-0">
                <a
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "group inline-flex h-9 w-full items-center justify-center gap-2 rounded-[8px] border border-border/20 bg-background px-2.5 text-xs font-medium text-text-primary shadow-sm sm:h-10 sm:w-auto sm:justify-start sm:gap-2.5 sm:rounded-md sm:px-3",
                    "transition-colors hover:border-accent/40 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
                  )}
                >
                  {action.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element -- tiny local SVGs
                    <img
                      src={action.icon}
                      alt={`${action.label} logo`}
                      width={20}
                      height={20}
                      className="h-4 w-4 shrink-0 object-contain sm:h-5 sm:w-5"
                      decoding="async"
                      fetchPriority="low"
                    />
                  ) : null}
                  <span className="truncate">{action.label}</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
