import Image from "next/image";
import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface TtkSparkHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const CREATIVE_SLOTS = [
  {
    stage: "Test",
    spark: "Hook v1",
    src: "/images/services/tiktok-shop-ads/ttk-phone-hook.jpg",
  },
  {
    stage: "Test",
    spark: "Hook v2",
    src: "/images/services/tiktok-shop-ads/ttk-phone-demo.jpg",
  },
  {
    stage: "Scale",
    spark: "Winner",
    src: "/images/services/tiktok-shop-ads/ttk-phone-scale.jpg",
  },
  {
    stage: "Refresh",
    spark: "Swap",
    src: "/images/services/tiktok-shop-ads/ttk-phone-refresh.jpg",
  },
] as const;

/** Compact hero — short stage strip; form density tight; row height = form. */
export function TtkSparkHero({ service, site }: TtkSparkHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative -mt-[4.75rem] overflow-x-clip border-b-2 border-accent bg-[#0c0c0b] sm:-mt-[5.5rem] md:-mt-[6rem]"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(198,241,53,0.08), transparent 45%)",
        }}
        aria-hidden="true"
      />

      <ServicePageShell className="relative pb-5 pt-[5.75rem] sm:pb-6 sm:pt-[6.5rem] md:pt-[6.75rem]">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          tone="onDark"
          className="flex justify-start"
        />

        <div className="mt-2 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,23rem)] lg:items-stretch lg:gap-5">
          <div className="flex min-h-0 min-w-0 flex-col gap-3 lg:h-full">
            <div className="shrink-0">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-accent">
                Spark rail · Shop ads
              </p>
              <h1
                id="service-hero-heading"
                className="mt-1.5 max-w-2xl text-[clamp(1.35rem,2.4vw,1.75rem)] font-black leading-[1.1] tracking-tight text-text-on-dark"
              >
                {service.hero.title}
              </h1>
              <p className="mt-1.5 max-w-xl text-sm font-medium leading-snug text-text-on-dark/75">
                {service.hero.subtitle}
              </p>
            </div>

            <div
              className="flex min-h-0 flex-1 flex-col overflow-hidden border-2 border-accent/60 bg-[#141412] shadow-[3px_3px_0_0_#C6F135]"
              aria-label="Spark ads creative rail preview"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-accent/25 px-2.5 py-1.5">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
                  Creative stages
                </p>
                <p className="font-mono text-[8px] font-bold text-text-on-dark/40">
                  Stage rail below
                </p>
              </div>
              <div className="grid min-h-0 flex-1 grid-cols-2 gap-1.5 p-2 sm:grid-cols-4 sm:gap-2 sm:p-2.5">
                {CREATIVE_SLOTS.map((slot, index) => (
                  <div
                    key={`${slot.spark}-${index}`}
                    className={cn(
                      "flex h-full min-h-0 flex-col overflow-hidden border border-text-on-dark/20 bg-[#1c1c1a]",
                      index === 2 && "ring-1 ring-accent/70",
                    )}
                  >
                    <div className="flex shrink-0 items-center justify-between px-1.5 py-1">
                      <span className="font-mono text-[8px] font-bold uppercase text-accent">
                        {slot.stage}
                      </span>
                      <span className="font-mono text-[8px] font-bold text-text-on-dark/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="relative min-h-[6.5rem] w-full flex-1 sm:min-h-[8rem]">
                      <Image
                        src={slot.src}
                        alt=""
                        fill
                        className="object-cover object-center"
                        sizes="140px"
                        priority={index < 2}
                      />
                    </div>
                    <p className="shrink-0 truncate px-1 py-1.5 text-center text-xs font-black uppercase text-text-on-dark">
                      {slot.spark}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside
            id="service-lead-form"
            className="border-2 border-primary bg-accent px-3 py-3 text-primary shadow-[3px_3px_0_0_#C6F135] sm:px-3.5 sm:py-3.5"
          >
            <h2 className="text-base font-black tracking-tight text-primary">
              {form.heading}
            </h2>
            {form.subheading ? (
              <p className="mt-1 text-xs font-medium leading-snug text-primary/80">
                {form.subheading}
              </p>
            ) : null}
            <div className="mt-2.5">
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
                className="gap-y-2 [&_button[role=combobox]]:h-9 [&_button[role=combobox]]:border-2 [&_button[role=combobox]]:border-primary [&_input]:h-9 [&_input]:border-2 [&_input]:border-primary [&_label]:mb-0.5 [&_label]:text-xs [&_textarea]:border-2 [&_textarea]:border-primary"
              />
            </div>
            <p className="mt-2.5 text-center text-xs font-medium text-primary/70">
              Or call {site.phone.display}
            </p>
          </aside>
        </div>
      </ServicePageShell>
    </section>
  );
}
