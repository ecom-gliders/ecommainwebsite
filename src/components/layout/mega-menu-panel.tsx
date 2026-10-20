import Link from "next/link";
import type { MegaMenuPanelConfig } from "@/domain/content/schemas";
import { PrimaryButton } from "@/components/ui/primary-button";
import { NavLinkItem } from "@/components/layout/nav-link-item";
import { cn } from "@/lib/utils";

interface MegaMenuPanelProps {
  megaMenu: MegaMenuPanelConfig;
  className?: string;
}

export function MegaMenuPanel({ megaMenu, className }: MegaMenuPanelProps) {
  const { columns, ctaPanel, footerLink, compact = true } = megaMenu;
  const columnCount = columns.length;
  const hasCta = Boolean(ctaPanel);

  return (
    <div className={cn("w-full min-w-0 bg-background", className)}>
      <div className="container-page min-w-0">
        <div
          className={cn(
            "grid min-w-0 gap-6 sm:gap-8",
            compact ? "py-5" : "py-6",
            hasCta
              ? "lg:grid-cols-[minmax(0,1fr)_minmax(180px,220px)] lg:gap-8"
              : null,
          )}
        >
          <div
            className={cn(
              "grid min-w-0 gap-6 sm:gap-8",
              columnCount >= 4 && "sm:grid-cols-2 xl:grid-cols-4",
              columnCount === 3 && "sm:grid-cols-3",
              columnCount === 2 && "sm:grid-cols-2",
              columnCount === 1 && "grid-cols-1",
            )}
          >
            {columns.map((column) => (
              <div key={column.id} className="min-w-0">
                <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  {column.title}
                </h3>
                <ul className={cn(compact ? "space-y-0" : "space-y-1")}>
                  {column.links.map((link) => (
                    <li key={`${column.id}-${link.href}-${link.label}`} className="min-w-0">
                      <NavLinkItem
                        link={link}
                        compact={compact}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {ctaPanel ? (
            <aside className="min-w-0 border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              {ctaPanel.eyebrow ? (
                <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                  {ctaPanel.eyebrow}
                </p>
              ) : null}
              {ctaPanel.metric ? (
                <p className="mt-1 border-l-[3px] border-accent pl-2 text-sm font-semibold text-primary">
                  {ctaPanel.metric}
                </p>
              ) : null}
              <h3 className="mt-3 text-sm font-semibold text-text-primary">
                {ctaPanel.title}
              </h3>
              <div className="mt-4 space-y-3">
                <PrimaryButton asChild variant="primary" size="sm" className="w-full text-sm">
                  <Link href={ctaPanel.button.href}>{ctaPanel.button.label}</Link>
                </PrimaryButton>
                <a
                  href={`tel:${ctaPanel.phone.tel}`}
                  className="block text-xs font-medium text-text-primary underline-offset-4 hover:text-link-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {ctaPanel.phone.display}
                </a>
              </div>
            </aside>
          ) : null}
        </div>

        {footerLink ? (
          <div className="border-t border-border py-3">
            <Link
              href={footerLink.href}
              className="text-xs font-medium text-text-primary underline-offset-4 hover:text-link-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {footerLink.label}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
