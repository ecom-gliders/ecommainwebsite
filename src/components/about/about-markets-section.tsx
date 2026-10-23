"use client";

import Link from "next/link";
import { Globe2, MapPin, Plus, Languages } from "lucide-react";
import type { AboutPageConfig } from "@/domain/content/schemas";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const MARKET_CODES: Record<string, string> = {
  "United States": "US",
  "United Kingdom": "UK",
  Canada: "CA",
  "European Union": "EU",
};

const LEFT_ICONS = [
  { icon: Globe2, label: "North America" },
  { icon: MapPin, label: "Europe and UK" },
  { icon: Languages, label: "Localized strategy" },
] as const;

interface AboutMarketsSectionProps {
  markets: AboutPageConfig["markets"];
}

export function AboutMarketsSection({ markets }: AboutMarketsSectionProps) {
  const moreLabel = markets.moreLabel || "More markets";

  return (
    <section
      id="about-markets"
      aria-labelledby="about-markets-heading"
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
    >
      <div className="container-page">
        <Sheet>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">
                Coverage
              </p>
              <h2
                id="about-markets-heading"
                className="mt-3 max-w-md text-[clamp(1.85rem,3.2vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary"
              >
                {markets.heading}
              </h2>
              <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-text-secondary">
                {markets.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {LEFT_ICONS.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    title={label}
                    className="inline-flex h-11 w-11 items-center justify-center bg-accent text-primary"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5 stroke-[2.25]" aria-hidden="true" />
                  </span>
                ))}
                <SheetTrigger asChild>
                  <button
                    type="button"
                    title={moreLabel}
                    aria-label={`${moreLabel}: view all ${markets.countries.length} Amazon marketplaces`}
                    className="inline-flex h-11 w-11 items-center justify-center bg-primary text-accent transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <Plus className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
                  </button>
                </SheetTrigger>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {markets.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex min-h-11 items-center border-2 border-primary bg-background px-4 text-small font-bold uppercase tracking-[0.06em] shadow-[3px_3px_0_0_#131311] hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-3 lg:col-span-7 lg:gap-4">
              {markets.items.map((market, index) => {
                const code =
                  MARKET_CODES[market] ?? market.slice(0, 2).toUpperCase();
                const ink = index % 2 === 0;
                return (
                  <li
                    key={market}
                    className={cn(
                      "relative flex min-h-[9.5rem] flex-col justify-between overflow-hidden border-2 border-primary p-5 shadow-[5px_5px_0_0_#131311] sm:min-h-[11rem] sm:p-6",
                      ink
                        ? "bg-primary text-text-on-dark"
                        : "bg-accent text-primary",
                    )}
                  >
                    <p
                      className={cn(
                        "font-mono text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-tighter",
                        ink ? "text-accent" : "text-primary/25",
                      )}
                      aria-hidden="true"
                    >
                      {code}
                    </p>
                    <p className="text-base font-bold sm:text-lg">{market}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <SheetContent
            side="right"
            closeLabel="Close marketplace list"
            className="w-[min(100%,26rem)] border-l-2 border-primary sm:max-w-md"
          >
            <SheetHeader className="border-b-2 border-primary bg-accent px-5 py-4 pr-14">
              <SheetTitle className="text-lg font-bold tracking-tight text-primary">
                Amazon marketplaces we support
              </SheetTitle>
              <SheetDescription className="mt-1 text-sm font-medium text-primary/75">
                Official Seller Central stores. Scope for a specific account is
                confirmed during your audit.
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <ol className="grid gap-2">
                {markets.countries.map((country, index) => (
                  <li
                    key={country}
                    className="flex items-center gap-3 border-2 border-primary bg-surface-muted px-3 py-2.5 shadow-[2px_2px_0_0_#131311]"
                  >
                    <span
                      className="font-mono text-xs font-bold text-text-secondary"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-bold text-text-primary">
                      {country}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}
