import Image from "next/image";
import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface LncCountdownHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const COUNTDOWN_TILES = [
  {
    phase: "Prep",
    tMinus: "T-14",
    signal: "Listing gates",
    status: "Hold spend",
    src: "/images/services/amazon-product-launch-services/lnc-phase-prep-v2.jpg",
  },
  {
    phase: "Soft launch",
    tMinus: "T-3",
    signal: "Limited ads",
    status: "Learn queries",
    src: "/images/services/amazon-product-launch-services/lnc-phase-soft-v2.jpg",
  },
  {
    phase: "Push",
    tMinus: "T-0",
    signal: "Scale window",
    status: "Stock aligned",
    src: "/images/services/amazon-product-launch-services/lnc-phase-push-v2.jpg",
  },
  {
    phase: "Stabilize",
    tMinus: "T+14",
    signal: "Cadence handoff",
    status: "Ops rhythm",
    src: "/images/services/amazon-product-launch-services/lnc-phase-stabilize-v2.jpg",
  },
] as const;

/** Dark launch pad hero: T-minus phase tiles + lime intake form. */
export function LncCountdownHero({ service, site }: LncCountdownHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-accent bg-[#0a0a09] py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(198,241,53,0.04) 0%, transparent 35%), radial-gradient(circle at 50% 100%, rgba(198,241,53,0.08), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <ServicePageShell className="relative">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          tone="onDark"
          className="flex justify-start"
        />

        <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:items-stretch lg:gap-7">
          <div className="flex h-full min-h-0 min-w-0 flex-col">
            <p className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
              Launch countdown board
            </p>
            <h1
              id="service-hero-heading"
              className="mt-1.5 max-w-2xl shrink-0 text-[clamp(1.55rem,3vw,2.2rem)] font-black leading-[1.08] tracking-tight text-text-on-dark"
            >
              {service.hero.title}
            </h1>
            <p className="mt-2 max-w-xl shrink-0 text-sm font-medium leading-snug text-text-on-dark/75">
              {service.hero.subtitle}
            </p>

            <div
              className="mt-4 flex min-h-[20rem] flex-1 flex-col border-2 border-accent/60 bg-[#121210] shadow-[4px_4px_0_0_#C6F135]"
              aria-label="Launch pad countdown preview"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-accent/30 px-3 py-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                  Pad status · staged sequence
                </p>
                <p className="font-mono text-[10px] font-bold text-text-on-dark/45">
                  All systems nominal
                </p>
              </div>

              <div className="flex min-h-0 flex-1 flex-col justify-center p-3 sm:p-4">
                <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                  {COUNTDOWN_TILES.map((tile, index) => (
                    <li
                      key={tile.phase}
                      className={cn(
                        "flex min-h-[10.5rem] flex-col border border-text-on-dark/22 bg-[#1a1a17]",
                        index === 2 && "ring-1 ring-accent",
                      )}
                    >
                      <div className="flex items-center justify-between border-b border-text-on-dark/12 px-2 py-1.5">
                        <span className="font-mono text-[9px] font-black uppercase tracking-[0.06em] text-accent">
                          {tile.tMinus}
                        </span>
                        <span className="font-mono text-[8px] font-bold text-text-on-dark/35">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-2">
                        <p className="text-[11px] font-black uppercase tracking-[0.04em] text-text-on-dark">
                          {tile.phase}
                        </p>
                        <div className="relative mt-2 aspect-[4/3] w-full overflow-hidden border border-text-on-dark/18 bg-[#0c0c0b]">
                          <Image
                            src={tile.src}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 40vw, 140px"
                            priority={index === 0}
                          />
                        </div>
                        <div className="mt-2 flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-text-on-dark/80">
                            {tile.signal}
                          </span>
                          <span className="inline-flex w-fit border border-accent/50 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase text-accent">
                            {tile.status}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-center font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-text-on-dark/35">
                  Staged launch · not cold go-live
                </p>
              </div>
            </div>
          </div>

          <aside
            id="service-lead-form"
            className="flex h-full min-h-0 flex-col self-stretch border-2 border-primary bg-accent p-4 text-primary shadow-[4px_4px_0_0_#C6F135] sm:p-5"
          >
            <h2 className="text-lg font-black tracking-tight text-primary sm:text-xl">
              {form.heading}
            </h2>
            {form.subheading ? (
              <p className="mt-1.5 text-sm font-medium leading-snug text-primary/80">
                {form.subheading}
              </p>
            ) : null}
            <div className="mt-4 flex-1">
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
