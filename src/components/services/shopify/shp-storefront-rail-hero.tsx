"use client";

import { useState } from "react";
import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface ShpStorefrontRailHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

type ShopSection = "hero" | "collection" | "pdp" | "cart";

const RAIL: { id: ShopSection; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "collection", label: "Collection" },
  { id: "pdp", label: "PDP" },
  { id: "cart", label: "Cart" },
];

function SectionPreview({ section }: { section: ShopSection }) {
  if (section === "hero") {
    return (
      <div className="flex h-full min-h-[11rem] flex-col gap-2 p-3 sm:p-4">
        <div className="h-3 w-2/5 bg-primary/15" aria-hidden="true" />
        <div className="h-6 w-4/5 max-w-xs bg-primary" aria-hidden="true" />
        <div className="mt-1 h-2 w-full max-w-sm bg-primary/10" aria-hidden="true" />
        <div className="mt-auto flex gap-2">
          <span className="h-8 w-24 border-2 border-primary bg-accent" aria-hidden="true" />
          <span className="h-8 w-20 border-2 border-primary/30 bg-background" aria-hidden="true" />
        </div>
      </div>
    );
  }
  if (section === "collection") {
    return (
      <div className="grid h-full min-h-[11rem] grid-cols-3 gap-2 p-3 sm:grid-cols-4 sm:p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="aspect-square border-2 border-primary/20 bg-[#ECECE6]" aria-hidden="true" />
            <div className="h-1.5 w-full bg-primary/15" aria-hidden="true" />
            <div className="h-1.5 w-2/3 bg-primary/10" aria-hidden="true" />
          </div>
        ))}
      </div>
    );
  }
  if (section === "pdp") {
    return (
      <div className="grid h-full min-h-[11rem] grid-cols-[minmax(5rem,38%)_minmax(0,1fr)] gap-0">
        <div className="border-r-2 border-primary/15 bg-[#ECECE6] p-3" aria-hidden="true">
          <div className="aspect-[4/5] border-2 border-primary/25 bg-background" />
        </div>
        <div className="flex flex-col gap-2 p-3 sm:p-4">
          <div className="h-2 w-1/4 bg-primary/15" aria-hidden="true" />
          <div className="h-5 w-3/4 bg-primary" aria-hidden="true" />
          <div className="h-2 w-1/3 bg-accent" aria-hidden="true" />
          <ul className="mt-2 space-y-1">
            {[1, 2, 3].map((n) => (
              <li key={n} className="h-1.5 w-full bg-primary/10" aria-hidden="true" />
            ))}
          </ul>
          <span className="mt-auto h-9 w-32 border-2 border-primary bg-accent" aria-hidden="true" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full min-h-[11rem] flex-col gap-3 p-3 sm:p-4">
      {[1, 2].map((row) => (
        <div key={row} className="flex items-center gap-3 border-b border-primary/10 pb-3">
          <div className="h-12 w-12 shrink-0 border-2 border-primary/20 bg-[#ECECE6]" aria-hidden="true" />
          <div className="min-w-0 flex-1 space-y-1">
            <div className="h-2 w-2/3 bg-primary/20" aria-hidden="true" />
            <div className="h-2 w-1/4 bg-primary/10" aria-hidden="true" />
          </div>
          <div className="h-6 w-14 border border-primary/30 bg-background" aria-hidden="true" />
        </div>
      ))}
      <div className="mt-auto flex items-center justify-between border-t-2 border-primary pt-3">
        <span className="font-mono text-[10px] font-bold uppercase text-text-secondary">Subtotal</span>
        <span className="h-3 w-16 bg-primary" aria-hidden="true" />
      </div>
      <span className="h-10 w-full border-2 border-primary bg-accent" aria-hidden="true" />
    </div>
  );
}

/**
 * Soft commerce wash + browser chrome and horizontal storefront rail.
 * Lime form stretches to match left column height.
 */
export function ShpStorefrontRailHero({ service, site }: ShpStorefrontRailHeroProps) {
  const form = service.hero.form;
  const [active, setActive] = useState<ShopSection>("hero");
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-[#FAFAF7] py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(198,241,53,0.12),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(244,244,240,0.95))]"
        aria-hidden="true"
      />

      <ServicePageShell className="relative">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          className="flex justify-start"
        />

        <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:items-stretch lg:gap-7">
          <div className="flex h-full min-h-0 min-w-0 flex-col">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Shopify website development
            </p>
            <h1
              id="service-hero-heading"
              className="mt-1.5 max-w-2xl shrink-0 text-[clamp(1.55rem,3vw,2.2rem)] font-black leading-[1.08] tracking-tight text-primary"
            >
              {service.hero.title}
            </h1>
            <p className="mt-2 max-w-xl shrink-0 text-sm font-medium leading-snug text-text-secondary">
              {service.hero.subtitle}
            </p>

            <div
              className="mt-4 flex min-h-[22rem] flex-1 flex-col border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311] lg:min-h-0"
              aria-label="Storefront preview"
            >
              <div className="flex shrink-0 items-center gap-2 border-b-2 border-primary bg-[#F0F0EB] px-3 py-2">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full border border-primary/40 bg-[#E8A598]" />
                  <span className="h-2.5 w-2.5 rounded-full border border-primary/40 bg-[#E8D598]" />
                  <span className="h-2.5 w-2.5 rounded-full border border-primary/40 bg-[#98C698]" />
                </span>
                <span
                  className="flex h-7 min-w-0 flex-1 items-center truncate border border-primary/25 bg-background px-2 font-mono text-[10px] text-text-secondary sm:text-[11px]"
                  aria-hidden="true"
                >
                  yourbrand.com
                </span>
              </div>

              <div
                className="flex shrink-0 border-b-2 border-primary bg-primary"
                role="tablist"
                aria-label="Store sections"
              >
                {RAIL.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active === tab.id}
                    onClick={() => setActive(tab.id)}
                    className={cn(
                      "min-w-0 flex-1 border-r border-primary/30 px-2 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em] last:border-r-0 sm:text-[10px]",
                      active === tab.id
                        ? "bg-accent text-primary"
                        : "bg-primary text-text-on-dark/85 hover:bg-[#1a1a18]",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="min-h-0 flex-1" role="tabpanel" aria-label={`${active} preview`}>
                <SectionPreview section={active} />
              </div>

              <div className="shrink-0 border-t-2 border-primary bg-[#F4F4F0] px-3 py-2">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                  Owned storefront rail
                </p>
                <ul className="mt-1.5 flex gap-1">
                  {RAIL.map((tab) => (
                    <li
                      key={tab.id}
                      className={cn(
                        "h-1.5 flex-1",
                        active === tab.id ? "bg-accent" : "bg-primary/15",
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside
            id="service-lead-form"
            className="flex h-full min-h-0 flex-col scroll-mt-28 border-2 border-primary bg-accent p-4 text-primary shadow-[4px_4px_0_0_#131311] sm:p-5 lg:min-h-full"
          >
            <h2 className="shrink-0 text-lg font-black tracking-tight text-primary sm:text-xl">
              {form.heading}
            </h2>
            {form.subheading ? (
              <p className="mt-1.5 shrink-0 text-sm font-medium leading-snug text-primary/80">
                {form.subheading}
              </p>
            ) : null}
            <div className="mt-4 min-h-0 flex-1">
              <ConfigurableForm
                formId={`service-audit-${service.slug}`}
                fields={form.fields}
                submitLabel={form.submitLabel ?? service.hero.cta.label}
                consentLabel="I agree to the privacy policy and to being contacted about this request."
                action={submitAuditForm}
                initialState={initialFormActionState}
                density="compact"
                columns={2}
                submitVariant="primary"
                submitFullWidth
                hiddenFields={{
                  serviceInterest: service.breadcrumbLabel,
                  serviceSlug: service.slug,
                }}
                className="[&_button[role=combobox]]:border-2 [&_button[role=combobox]]:border-primary [&_input]:border-2 [&_input]:border-primary [&_textarea]:border-2 [&_textarea]:border-primary"
              />
            </div>
            <p className="mt-3 shrink-0 text-center text-xs font-medium text-primary/70">
              Or call {site.phone.display}
            </p>
          </aside>
        </div>
      </ServicePageShell>
    </section>
  );
}
