"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Menu, Phone } from "lucide-react";
import type { HeaderNavItem, NavigationConfig } from "@/domain/content/schemas";
import type { SiteConfig } from "@/domain/content/schemas";
import { BrandLogo } from "@/components/design-system/brand-logo";
import {
  suppressAutoPopupForToday,
  useOptionalFreeAuditFunnel,
} from "@/components/free-audit/free-audit-funnel-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PrimaryButton } from "@/components/ui/primary-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  navigation: NavigationConfig;
  site: SiteConfig;
  className?: string;
}

function MobileNavLink({
  href,
  label,
  featured,
  external,
  onNavigate,
  className,
}: {
  href: string;
  label: string;
  featured?: boolean;
  external?: boolean;
  onNavigate: () => void;
  className?: string;
}) {
  const shared = cn(
    "flex min-h-10 items-center gap-2 rounded-sm px-1 py-1.5 text-sm font-medium text-text-primary transition-colors",
    "hover:text-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
    className,
  );

  const content = (
    <span className="flex min-w-0 items-center gap-2">
      <span className="leading-snug">{label}</span>
      {featured ? (
        <span className="shrink-0 rounded-[3px] bg-accent px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide text-primary">
          Featured
        </span>
      ) : null}
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        className={shared}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={shared} onClick={onNavigate}>
      {content}
    </Link>
  );
}

export function MobileNav({ navigation, site, className }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const funnel = useOptionalFreeAuditFunnel();
  const { header, megaMenus, mobile } = navigation;

  const megaItems = header.items.filter(
    (item): item is Extract<HeaderNavItem, { type: "megaMenu" }> =>
      item.type === "megaMenu" && Boolean(megaMenus[item.id]),
  );
  const linkItems = header.items.filter(
    (item): item is Extract<HeaderNavItem, { type: "link" }> =>
      item.type === "link",
  );

  const closeMenu = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          "inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] text-text-primary transition-colors hover:text-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 lg:hidden",
          className,
        )}
        aria-label={mobile.menuLabel}
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </SheetTrigger>

      <SheetContent
        side="right"
        closeLabel={mobile.closeLabel}
        aria-label={mobile.menuLabel}
      >
        <SheetHeader>
          <SheetTitle className="sr-only">{site.name}</SheetTitle>
          <Link
            href={header.logoHref}
            className="inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label={`${site.name} home`}
            onClick={closeMenu}
          >
            <BrandLogo surface="default" />
          </Link>
        </SheetHeader>

        <nav
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-1 [scrollbar-width:thin]"
          aria-label="Mobile"
        >
          {megaItems.length > 0 ? (
            <Accordion type="multiple" className="w-full">
              {megaItems.map((item) => {
                const panel = megaMenus[item.id];
                if (!panel) {
                  return null;
                }

                return (
                  <AccordionItem key={item.id} value={item.id} className="border-border">
                    <AccordionTrigger className="text-[0.9375rem] font-semibold">
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pb-1 pl-1">
                        {item.href ? (
                          <MobileNavLink
                            href={item.href}
                            label={
                              item.id === "services"
                                ? "All services"
                                : item.id === "company"
                                  ? "About us"
                                  : item.id === "case-studies"
                                    ? "All case studies"
                                    : item.id === "blog"
                                      ? "All articles"
                                      : `View all ${item.label.toLowerCase()}`
                            }
                            onNavigate={closeMenu}
                            className="font-semibold text-link hover:text-link-hover"
                          />
                        ) : null}

                        {panel.columns.map((column) => (
                          <div key={column.id}>
                            <p className="mb-1 px-1 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                              {column.title}
                            </p>
                            <ul>
                              {column.links.map((link) => (
                                <li
                                  key={`${column.id}-${link.href}-${link.label}`}
                                >
                                  <MobileNavLink
                                    href={link.href}
                                    label={link.label}
                                    featured={link.featured}
                                    external={link.external}
                                    onNavigate={closeMenu}
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {panel.footerLink ? (
                          <MobileNavLink
                            href={panel.footerLink.href}
                            label={panel.footerLink.label}
                            external={panel.footerLink.external}
                            onNavigate={closeMenu}
                            className="mt-1 font-semibold text-link hover:text-link-hover"
                          />
                        ) : null}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : null}

          <ul>
            {linkItems.map((item) => (
              <li key={item.id} className="border-b border-border">
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center px-1 text-[0.9375rem] font-semibold text-text-primary transition-colors hover:text-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 space-y-3 border-t border-border bg-surface px-4 py-4">
          <PrimaryButton asChild variant="accent" className="w-full">
            <Link
              href={header.cta.href}
              prefetch={false}
              onClick={() => {
                suppressAutoPopupForToday();
                funnel?.closeFunnel();
                closeMenu();
              }}
            >
              {header.cta.label}
            </Link>
          </PrimaryButton>

          <div className="flex flex-col gap-1">
            <a
              href={`tel:${site.phone.tel}`}
              className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-text-primary transition-colors hover:text-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              onClick={closeMenu}
            >
              <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
              {site.phone.display}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-text-primary transition-colors hover:text-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              onClick={closeMenu}
            >
              <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
              {site.email}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
