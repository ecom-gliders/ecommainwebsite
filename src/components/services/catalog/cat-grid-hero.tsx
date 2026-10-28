import Image from "next/image";
import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface CatGridHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const VARIATION_TREE = {
  parent: {
    asin: "Parent · B0CAT001",
    label: "Waterproof boot family",
    src: "/images/services/amazon-catalog-management/cat-parent.jpg",
  },
  children: [
    {
      asin: "B0CAT002",
      size: "Size 9",
      state: "buyable" as const,
      src: "/images/services/amazon-catalog-management/cat-child-9.jpg",
    },
    {
      asin: "B0CAT003",
      size: "Size 10",
      state: "buyable" as const,
      src: "/images/services/amazon-catalog-management/cat-child-10.jpg",
    },
    {
      asin: "B0CAT004",
      size: "Size 11",
      state: "warn" as const,
      src: "/images/services/amazon-catalog-management/cat-child-11.jpg",
    },
    {
      asin: "B0CAT005",
      size: "Size 12",
      state: "suppressed" as const,
      src: "/images/services/amazon-catalog-management/cat-child-12.jpg",
    },
  ],
};

/**
 * Catalog buy-box hero: variation node board + lime form.
 * Light gray wash - not manuscript, SERP, or ops sheet chrome.
 */
export function CatGridHero({ service, site }: CatGridHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-[#F4F4F4] py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(19,19,17,0.04) 1px, transparent 1px), linear-gradient(rgba(19,19,17,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <ServicePageShell className="relative">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          className="flex justify-start"
        />

        <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] lg:items-stretch lg:gap-7">
          <div className="flex h-full min-h-0 min-w-0 flex-col">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Amazon catalog management
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
              className="mt-4 flex min-h-[20rem] flex-1 flex-col border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311] lg:min-h-0"
              aria-label="Parent-child variation board"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b-2 border-primary bg-primary px-3 py-2">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
                  Variation tree · buyability grid
                </p>
                <p className="font-mono text-xs font-bold text-text-on-dark/70">
                  Parent → child ASINs
                </p>
              </div>

              <div className="flex min-h-0 flex-1 flex-col justify-between p-4 sm:p-5">
                <div className="flex flex-col items-center">
                  <div className="flex w-full max-w-sm items-center gap-3 border-2 border-primary bg-accent p-2.5">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden border-2 border-primary bg-background sm:h-20 sm:w-20">
                      <Image
                        src={VARIATION_TREE.parent.src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                        priority
                      />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-primary/70">
                        Parent ASIN
                      </p>
                      <p className="mt-0.5 text-sm font-black text-primary">
                        {VARIATION_TREE.parent.asin}
                      </p>
                      <p className="mt-1 text-xs font-medium text-primary/80">
                        {VARIATION_TREE.parent.label}
                      </p>
                    </div>
                  </div>
                  <div className="my-2 h-6 w-px bg-primary" aria-hidden="true" />
                  <div className="h-px w-full max-w-md bg-primary" aria-hidden="true" />
                </div>

                <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {VARIATION_TREE.children.map((child) => (
                    <li
                      key={child.asin}
                      className={cn(
                        "relative flex flex-col border-2 border-primary p-2",
                        child.state === "buyable" && "bg-background",
                        child.state === "warn" && "bg-[#FFF8E6]",
                        child.state === "suppressed" && "bg-[#F4F4F4]",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute -top-2 right-2 z-[1] border-2 border-primary px-1 py-px font-mono text-[8px] font-black uppercase",
                          child.state === "buyable" && "bg-accent text-primary",
                          child.state === "warn" && "bg-primary text-accent",
                          child.state === "suppressed" &&
                            "bg-primary text-text-on-dark line-through decoration-accent/50",
                        )}
                      >
                        {child.state === "buyable"
                          ? "Buyable"
                          : child.state === "warn"
                            ? "At risk"
                            : "Suppressed"}
                      </span>
                      <div
                        className={cn(
                          "relative aspect-square w-full overflow-hidden border border-primary/20 bg-[#EDE8DF]",
                          child.state === "suppressed" && "opacity-55 grayscale",
                        )}
                      >
                        <Image
                          src={child.src}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 40vw, 120px"
                        />
                      </div>
                      <p className="mt-2 font-mono text-xs font-bold text-text-secondary">
                        {child.asin}
                      </p>
                      <p className="mt-0.5 text-xs font-black text-primary">
                        {child.size}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside
            id="service-lead-form"
            className="h-fit scroll-mt-28 self-start border-2 border-primary bg-accent p-4 text-primary shadow-[4px_4px_0_0_#C6F135] sm:p-5"
          >
            <h2 className="text-lg font-black tracking-tight text-primary sm:text-xl">
              {form.heading}
            </h2>
            {form.subheading ? (
              <p className="mt-1.5 text-sm font-medium leading-snug text-primary/80">
                {form.subheading}
              </p>
            ) : null}
            <div className="mt-4">
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
            <p className="mt-3 text-center text-xs font-medium text-primary/70">
              Or call {site.phone.display}
            </p>
          </aside>
        </div>
      </ServicePageShell>
    </section>
  );
}
