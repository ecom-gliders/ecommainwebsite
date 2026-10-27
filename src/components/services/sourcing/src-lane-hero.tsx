import Image from "next/image";
import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface SrcLaneHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const CORRIDORS = [
  {
    id: "research",
    label: "Research",
    detail: "Brief and criteria",
    gate: "Brief locked",
    src: "/images/services/amazon-product-sourcing/src-lane-research-v2.jpg",
  },
  {
    id: "sample",
    label: "Sample",
    detail: "Side-by-side units",
    gate: "Spec match",
    src: "/images/services/amazon-product-sourcing/src-lane-sample-v2.jpg",
  },
  {
    id: "qc",
    label: "QC",
    detail: "Defect thresholds",
    gate: "Golden sample",
    src: "/images/services/amazon-product-sourcing/src-lane-qc-v2.jpg",
  },
  {
    id: "ship",
    label: "Ship",
    detail: "Inbound handoff",
    gate: "Launch pack",
    src: "/images/services/amazon-product-sourcing/src-lane-ship-v2.jpg",
  },
] as const;

/**
 * Dark gated-corridor hero: compact contained lane board + lime intake form.
 */
export function SrcLaneHero({ service, site }: SrcLaneHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative -mt-[4.75rem] overflow-x-clip border-b-2 border-accent bg-[#0b1211] sm:-mt-[5.5rem] md:-mt-[6rem]"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 12% 0%, rgba(198,241,53,0.1), transparent 42%), linear-gradient(180deg, rgba(90,130,120,0.12) 0%, transparent 45%)",
        }}
        aria-hidden="true"
      />

      <ServicePageShell className="relative pb-7 pt-[5.5rem] sm:pb-8 sm:pt-[6.25rem] md:pt-[6.75rem]">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          tone="onDark"
          className="flex justify-start"
        />

        <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:items-start lg:gap-7">
          <div className="flex min-w-0 flex-col">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
              Gated supply corridor
            </p>
            <h1
              id="service-hero-heading"
              className="mt-2 max-w-2xl text-[clamp(1.65rem,3.2vw,2.35rem)] font-black leading-[1.06] tracking-tight text-text-on-dark"
            >
              {service.hero.title}
            </h1>
            <p className="mt-2 max-w-xl text-sm font-medium leading-snug text-text-on-dark/75 sm:text-base">
              {service.hero.subtitle}
            </p>

            <div
              className="mt-4 w-full overflow-hidden border-2 border-accent/70 bg-[#101816] shadow-[4px_4px_0_0_#C6F135]"
              aria-label="Supply route lane map"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-accent/35 px-2.5 py-1.5 sm:px-3">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-accent">
                  Research → Sample → QC → Ship
                </p>
                <p className="font-mono text-[8px] font-bold uppercase tracking-[0.08em] text-text-on-dark/45">
                  Advance on evidence
                </p>
              </div>

              <ol className="grid grid-cols-2">
                {CORRIDORS.map((corridor, index) => (
                  <li
                    key={corridor.id}
                    className={cn(
                      "flex flex-col",
                      index % 2 === 1 && "border-l border-accent/25",
                      index >= 2 && "border-t border-accent/25",
                    )}
                  >
                    <div className="relative h-14 w-full shrink-0 border-b border-accent/25 sm:h-16">
                      <Image
                        src={corridor.src}
                        alt=""
                        fill
                        className="object-cover opacity-90"
                        sizes="(max-width: 640px) 50vw, 280px"
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101816] via-transparent to-transparent" />
                      <span className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center border border-accent bg-[#101816]/90 font-mono text-[8px] font-black text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5 p-2 sm:p-2.5">
                      <div className="min-w-0">
                        <h2 className="truncate text-[13px] font-black leading-tight text-text-on-dark">
                          {corridor.label}
                        </h2>
                        <p className="truncate text-[10px] font-medium text-text-on-dark/55">
                          {corridor.detail}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-1.5 min-w-0 flex-1 overflow-hidden border border-accent/25 bg-[#0b1211]"
                          aria-hidden="true"
                        >
                          <div
                            className="h-full bg-accent"
                            style={{ width: `${68 + index * 8}%` }}
                          />
                        </div>
                        <p className="shrink-0 border border-accent/50 px-1 py-px font-mono text-[7px] font-bold uppercase tracking-[0.04em] text-accent">
                          {corridor.gate}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
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
            <p className="mt-5 text-center text-xs font-medium text-primary/70">
              Or call {site.phone.display}
            </p>
          </aside>
        </div>
      </ServicePageShell>
    </section>
  );
}
