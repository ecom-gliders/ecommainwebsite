"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import type { NavigationConfig } from "@/domain/content/schemas";
import type { SiteConfig } from "@/domain/content/schemas";
import { BrandLogo } from "@/components/design-system/brand-logo";
import { HeaderNav } from "@/components/layout/header-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PrimaryButton } from "@/components/ui/primary-button";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface SiteHeaderShellProps {
  navigation: NavigationConfig;
  site: SiteConfig;
}

/**
 * Full floating ink bar — logo + nav + phone + Free Audit inside one pill.
 * Mobile: tighter bar, clearer logo, balanced Audit CTA.
 */
export function SiteHeaderShell({ navigation, site }: SiteHeaderShellProps) {
  const [scrolled, setScrolled] = useState(false);
  const { header } = navigation;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "z-50 w-full bg-transparent",
        header.sticky && "sticky top-0",
      )}
    >
      <div className="mx-auto max-w-[min(1280px,calc(100%-0.75rem))] py-2.5 sm:max-w-[min(1280px,calc(100%-1.5rem))] sm:py-3 md:max-w-[min(1280px,calc(100%-2rem))] md:py-4">
        <NavigationMenu
          delayDuration={200}
          className="relative z-50 flex w-full max-w-none flex-1 items-stretch justify-start"
        >
          <div
            className={cn(
              "flex w-full min-h-14 items-center gap-1.5 rounded-[1.1rem] border-2 border-primary bg-primary px-2 text-text-on-dark shadow-[5px_5px_0_0_#131311]",
              "sm:min-h-16 sm:gap-3 sm:rounded-[1.5rem] sm:px-3 sm:shadow-[6px_6px_0_0_#131311]",
              scrolled && "shadow-[3px_3px_0_0_#131311] sm:shadow-[4px_4px_0_0_#131311]",
            )}
          >
            <MobileNav
              navigation={navigation}
              site={site}
              className="shrink-0 rounded-[10px] text-text-on-dark hover:text-accent lg:hidden"
            />

            <Link
              href={header.logoHref}
              className="flex min-w-0 shrink items-center justify-center overflow-visible rounded-[8px] px-1 lg:flex-none lg:justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              aria-label={`${site.name} home`}
            >
              <BrandLogo priority surface="onDark" className="shrink-0" />
            </Link>

            <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
              <HeaderNav
                items={header.items}
                megaMenus={navigation.megaMenus}
                tone="onDark"
              />
            </div>

            <div className="ml-0 flex shrink-0 items-center gap-1.5 sm:ml-auto sm:gap-2.5">
              <a
                href={`tel:${site.phone.tel}`}
                className="mr-0.5 hidden items-center gap-1.5 border-l border-white/15 pl-3 text-sm font-medium text-text-on-dark/75 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary xl:inline-flex"
                aria-label={`Call ${site.phone.display}`}
              >
                <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span className="whitespace-nowrap">{site.phone.display}</span>
              </a>

              <PrimaryButton
                asChild
                variant="accent"
                size="sm"
                className="hidden lg:inline-flex"
              >
                <Link href={header.cta.href}>{header.cta.label}</Link>
              </PrimaryButton>

              <PrimaryButton
                asChild
                variant="accent"
                size="sm"
                className="inline-flex !h-9 !min-h-9 !gap-1.5 !pl-3 !pr-1.5 !text-[11px] lg:hidden"
              >
                <Link href={header.cta.href} aria-label={header.cta.label}>
                  Audit
                </Link>
              </PrimaryButton>
            </div>
          </div>
        </NavigationMenu>
      </div>
    </header>
  );
}
