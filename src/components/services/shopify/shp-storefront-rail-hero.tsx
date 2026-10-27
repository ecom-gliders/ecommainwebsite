"use client";

import Image from "next/image";
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

const IMG = {
  hero: "/images/services/shopify-website-development/shp-preview-hero-v2.jpg",
  collection:
    "/images/services/shopify-website-development/shp-preview-collection-v2.jpg",
  pdp: "/images/services/shopify-website-development/shp-preview-pdp-v2.jpg",
  cart: "/images/services/shopify-website-development/shp-preview-cart-v2.jpg",
  owned: "/images/services/shopify-website-development/shp-problem-owned-v2.jpg",
  amazon:
    "/images/services/shopify-website-development/shp-problem-amazon-v2.jpg",
} as const;

const RAIL: { id: ShopSection; label: string; caption: string }[] = [
  { id: "hero", label: "Hero", caption: "Brand-led first fold" },
  { id: "collection", label: "Collection", caption: "Shopable grid rhythm" },
  { id: "pdp", label: "PDP", caption: "Proof + add to cart" },
  { id: "cart", label: "Cart", caption: "Checkout-ready path" },
];

const COLLECTION_THUMBS = [
  { src: IMG.collection, pos: "20% 30%" },
  { src: IMG.pdp, pos: "50% 40%" },
  { src: IMG.hero, pos: "70% 35%" },
  { src: IMG.owned, pos: "40% 50%" },
  { src: IMG.cart, pos: "30% 45%" },
  { src: IMG.amazon, pos: "60% 40%" },
  { src: IMG.collection, pos: "80% 55%" },
  { src: IMG.pdp, pos: "25% 60%" },
] as const;

function SectionPreview({ section }: { section: ShopSection }) {
  if (section === "hero") {
    return (
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#141412]">
        <div className="relative min-h-0 flex-1">
          <Image
            src={IMG.hero}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0c0c0b] via-[#0c0c0b]/55 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 space-y-2 p-3 sm:p-4">
            <div className="h-1.5 w-20 bg-accent" aria-hidden="true" />
            <div className="h-5 w-3/4 max-w-xs bg-text-on-dark" aria-hidden="true" />
            <div className="h-1.5 w-1/2 max-w-[12rem] bg-text-on-dark/35" aria-hidden="true" />
            <span
              className="mt-1 inline-flex h-8 items-center border-2 border-accent bg-accent px-3 font-mono text-[9px] font-black uppercase text-primary"
              aria-hidden="true"
            >
              Shop now
            </span>
          </div>
        </div>
        <div
          className="grid shrink-0 grid-cols-3 gap-1.5 border-t border-accent/25 bg-[#0c0c0b] p-2"
          aria-hidden="true"
        >
          {[IMG.collection, IMG.pdp, IMG.owned].map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section === "collection") {
    return (
      <div className="grid h-full min-h-0 grid-cols-2 gap-1.5 overflow-hidden bg-[#141412] p-2 sm:grid-cols-4 sm:p-2.5">
        {COLLECTION_THUMBS.map((thumb, i) => (
          <div
            key={`${thumb.src}-${i}`}
            className="flex min-h-0 flex-col gap-1 border border-accent/20 bg-[#1a1a17] p-1"
          >
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <Image
                src={thumb.src}
                alt=""
                fill
                className="object-cover"
                style={{ objectPosition: thumb.pos }}
                sizes="140px"
              />
            </div>
            <div className="h-1 w-full bg-text-on-dark/20" aria-hidden="true" />
            <div className="h-1 w-1/2 bg-accent/70" aria-hidden="true" />
          </div>
        ))}
      </div>
    );
  }

  if (section === "pdp") {
    return (
      <div className="grid h-full min-h-0 grid-cols-[minmax(0,44%)_minmax(0,1fr)] overflow-hidden bg-[#141412]">
        <div className="relative min-h-0 border-r border-accent/25">
          <Image
            src={IMG.pdp}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 40vw, 22vw"
          />
        </div>
        <div className="flex min-h-0 flex-col gap-1.5 overflow-hidden p-2.5 sm:p-3">
          <div className="h-1.5 w-1/4 bg-text-on-dark/25" aria-hidden="true" />
          <div className="h-4 w-4/5 bg-text-on-dark" aria-hidden="true" />
          <div className="h-1.5 w-1/3 bg-accent" aria-hidden="true" />
          <ul className="mt-0.5 space-y-1">
            {[1, 2, 3].map((n) => (
              <li
                key={n}
                className="h-1 w-full bg-text-on-dark/15"
                aria-hidden="true"
              />
            ))}
          </ul>
          <div className="mt-auto flex gap-1.5">
            {["S", "M", "L"].map((size) => (
              <span
                key={size}
                className="flex h-6 w-6 items-center justify-center border border-accent/40 font-mono text-[8px] font-bold text-text-on-dark/70"
                aria-hidden="true"
              >
                {size}
              </span>
            ))}
          </div>
          <span
            className="mt-1 flex h-8 w-full max-w-[9rem] items-center justify-center border-2 border-accent bg-accent font-mono text-[8px] font-black uppercase text-primary"
            aria-hidden="true"
          >
            Add to cart
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 overflow-hidden bg-[#141412] p-2.5 sm:p-3">
      {[
        { src: IMG.cart, label: "A" },
        { src: IMG.pdp, label: "B" },
      ].map((row) => (
        <div
          key={row.label}
          className="flex items-center gap-2.5 border-b border-accent/20 pb-2"
        >
          <div className="relative h-11 w-11 shrink-0 overflow-hidden border border-accent/30">
            <Image
              src={row.src}
              alt=""
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="h-1.5 w-2/3 bg-text-on-dark/30" aria-hidden="true" />
            <div className="h-1.5 w-1/4 bg-accent/60" aria-hidden="true" />
          </div>
          <div
            className="flex h-6 w-14 items-center justify-center border border-accent/40 font-mono text-[8px] text-text-on-dark/60"
            aria-hidden="true"
          >
            Qty 1
          </div>
        </div>
      ))}
      <div className="mt-auto flex items-center justify-between border-t border-accent/30 pt-2">
        <span className="font-mono text-[9px] font-bold uppercase text-text-on-dark/45">
          Subtotal
        </span>
        <span className="h-2.5 w-14 bg-accent" aria-hidden="true" />
      </div>
      <span
        className="flex h-9 w-full items-center justify-center border-2 border-accent bg-accent font-mono text-[9px] font-black uppercase text-primary"
        aria-hidden="true"
      >
        Checkout
      </span>
    </div>
  );
}

/** Dark interactive storefront mockups - form-matched height, images in media slots. */
export function ShpStorefrontRailHero({
  service,
  site,
}: ShpStorefrontRailHeroProps) {
  const form = service.hero.form;
  const [active, setActive] = useState<ShopSection>("hero");
  if (!form) return null;

  const activeTab = RAIL.find((tab) => tab.id === active) ?? RAIL[0];

  return (
    <section
      id="service-hero"
      className="relative -mt-[4.75rem] overflow-x-clip border-b-2 border-accent bg-[#0c0c0b] sm:-mt-[5.5rem] md:-mt-[6rem]"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 75% 0%, rgba(198,241,53,0.12), transparent 42%)",
        }}
        aria-hidden="true"
      />

      <ServicePageShell className="relative pb-7 pt-[5.5rem] sm:pb-8 sm:pt-[6.25rem] md:pt-[6.75rem]">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          tone="onDark"
          className="flex justify-start"
        />

        <div className="mt-3">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
            DTC storefront rail
          </p>
          <h1
            id="service-hero-heading"
            className="mt-2 max-w-3xl text-[clamp(1.55rem,3vw,2.2rem)] font-black leading-[1.06] tracking-tight text-text-on-dark"
          >
            {service.hero.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-snug text-text-on-dark/75 sm:text-base">
            {service.hero.subtitle}
          </p>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:grid-rows-1 lg:items-stretch lg:gap-6">
          <div
            className="flex h-full min-h-[22rem] flex-col overflow-hidden border-2 border-accent/70 bg-[#141412] shadow-[4px_4px_0_0_#C6F135]"
            aria-label="Interactive storefront preview"
          >
            <div className="flex shrink-0 items-center gap-2 border-b border-accent/35 bg-[#1a1a17] px-3 py-2">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full border border-text-on-dark/30 bg-[#E8A598]" />
                <span className="h-2.5 w-2.5 rounded-full border border-text-on-dark/30 bg-[#E8D598]" />
                <span className="h-2.5 w-2.5 rounded-full border border-text-on-dark/30 bg-[#98C698]" />
              </span>
              <span
                className="flex h-7 min-w-0 flex-1 items-center truncate border border-accent/25 bg-[#0c0c0b] px-2 font-mono text-[10px] text-text-on-dark/55 sm:text-[11px]"
                aria-hidden="true"
              >
                yourbrand.com / {activeTab.id}
              </span>
            </div>

            <div
              className="flex shrink-0 border-b border-accent/35 bg-primary"
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
                    "min-w-0 flex-1 border-r border-primary/30 px-2 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.08em] transition-colors last:border-r-0 sm:text-[10px]",
                    active === tab.id
                      ? "bg-accent text-primary"
                      : "bg-primary text-text-on-dark/85 hover:bg-[#1a1a18]",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div
              className="relative min-h-0 flex-1"
              role="tabpanel"
              aria-label={`${activeTab.label}: ${activeTab.caption}`}
            >
              <div className="absolute inset-0">
                <SectionPreview section={active} />
              </div>
            </div>

            <div className="shrink-0 border-t border-accent/30 bg-[#1a1a17] px-3 py-1.5">
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-accent">
                  {activeTab.caption}
                </p>
                <ul className="flex w-24 gap-1" aria-hidden="true">
                  {RAIL.map((tab) => (
                    <li
                      key={tab.id}
                      className={cn(
                        "h-1.5 flex-1 transition-colors",
                        active === tab.id ? "bg-accent" : "bg-text-on-dark/15",
                      )}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside
            id="service-lead-form"
            className="flex h-full min-h-0 flex-col border-2 border-primary bg-accent p-4 text-primary shadow-[4px_4px_0_0_#C6F135] sm:p-5"
          >
            <h2 className="shrink-0 text-lg font-black tracking-tight text-primary sm:text-xl">
              {form.heading}
            </h2>
            {form.subheading ? (
              <p className="mt-1.5 shrink-0 text-sm font-medium leading-snug text-primary/80">
                {form.subheading}
              </p>
            ) : null}
            <div className="mt-3 min-h-0 flex-1">
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
            <p className="mt-4 shrink-0 text-center text-xs font-medium text-primary/70">
              Or call {site.phone.display}
            </p>
          </aside>
        </div>
      </ServicePageShell>
    </section>
  );
}
