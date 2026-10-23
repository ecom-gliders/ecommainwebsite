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
    detail: "Brief, category fit, supplier criteria",
    gates: ["Brief locked", "Category scoped"],
  },
  {
    id: "sample",
    label: "Sample",
    detail: "Comparable units against written spec",
    gates: ["Request sent", "Side-by-side eval"],
  },
  {
    id: "qc",
    label: "QC",
    detail: "Packaging, marks, defect thresholds",
    gates: ["Golden sample", "Inspection notes"],
  },
  {
    id: "ship",
    label: "Ship",
    detail: "PO terms, inbound prep, launch handoff",
    gates: ["Deposit gate", "Launch pack"],
  },
] as const;

/**
 * Sourcing lane map hero: teal/gray wash + stacked supply corridors.
 * Lime intake form. Fill-fill grid — no hollow column gap.
 */
export function SrcLaneHero({ service, site }: SrcLaneHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-[#D8E4E2] py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.35)_0%,transparent_40%),repeating-linear-gradient(90deg,transparent,transparent_47px,rgba(19,19,17,0.04)_48px)]"
        aria-hidden="true"
      />

      <ServicePageShell className="relative">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          className="flex justify-start"
        />

        <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:items-stretch lg:gap-7">
          <div className="flex min-h-0 min-w-0 flex-col">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Amazon product sourcing
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
              className="mt-4 flex min-h-[22rem] flex-1 flex-col border-2 border-primary bg-[#EEF3F2]/90 shadow-[4px_4px_0_0_#131311] lg:min-h-0"
              aria-label="Supply route lane map"
            >
              <div className="flex shrink-0 items-center justify-between gap-2 border-b-2 border-primary bg-primary px-3 py-2.5 sm:px-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
                  Gated sourcing lanes
                </p>
                <span className="font-mono text-[10px] font-bold text-text-on-dark/80">
                  Research → Sample → QC → Ship
                </span>
              </div>

              <ul className="flex min-h-0 flex-1 flex-col">
                {CORRIDORS.map((corridor, index) => (
                  <li
                    key={corridor.id}
                    className={cn(
                      "relative flex flex-1 flex-col justify-center px-3 py-2.5 sm:px-4 sm:py-3",
                      index > 0 && "border-t-2 border-primary/25",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-primary bg-accent font-mono text-xs font-black text-primary"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-sm font-black text-primary sm:text-base">
                          {corridor.label}
                        </h2>
                        <p className="text-xs font-medium text-text-secondary sm:text-[13px]">
                          {corridor.detail}
                        </p>
                      </div>
                    </div>

                    <div
                      className="relative mt-2.5 h-2.5 overflow-hidden border border-primary/30 bg-[#C5D6D3]"
                      aria-hidden="true"
                    >
                      <div
                        className="absolute inset-y-0 left-0 bg-accent"
                        style={{ width: `${72 + index * 6}%` }}
                      />
                      {corridor.gates.map((_, gateIndex) => (
                        <span
                          key={gateIndex}
                          className="absolute top-0 bottom-0 w-0.5 bg-primary"
                          style={{
                            left: `${((gateIndex + 1) / (corridor.gates.length + 1)) * 100}%`,
                          }}
                        />
                      ))}
                    </div>

                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {corridor.gates.map((gate) => (
                        <li
                          key={gate}
                          className="border border-primary bg-background px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.06em] text-primary"
                        >
                          {gate}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside
            id="service-lead-form"
            className="h-fit scroll-mt-28 self-start border-2 border-primary bg-accent p-4 text-primary shadow-[4px_4px_0_0_#131311] sm:p-5 lg:self-stretch lg:flex lg:flex-col"
          >
            <h2 className="text-lg font-black tracking-tight text-primary sm:text-xl">
              {form.heading}
            </h2>
            {form.subheading ? (
              <p className="mt-1.5 text-sm font-medium leading-snug text-primary/80">
                {form.subheading}
              </p>
            ) : null}
            <div className="mt-4 lg:flex-1">
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
