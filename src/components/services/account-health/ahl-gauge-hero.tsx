import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface AhlGaugeHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const POLICIES = [
  {
    label: "Order defect rate (ODR)",
    value: 0.65,
    max: 1.2,
    threshold: 1,
    unit: "%",
    status: "Within target",
  },
  {
    label: "Late shipment rate",
    value: 2.4,
    max: 5,
    threshold: 4,
    unit: "%",
    status: "Watch band",
  },
  {
    label: "Pre-fulfillment cancel rate",
    value: 1.1,
    max: 3,
    threshold: 2.5,
    unit: "%",
    status: "Within target",
  },
  {
    label: "Valid tracking rate",
    value: 96,
    max: 100,
    threshold: 95,
    unit: "%",
    status: "Above floor",
    invert: true,
  },
] as const;

function PolicyBar({
  label,
  value,
  max,
  threshold,
  unit,
  status,
  invert,
}: {
  label: string;
  value: number;
  max: number;
  threshold: number;
  unit: string;
  status: string;
  invert?: boolean;
}) {
  const fillPct = Math.min(100, (value / max) * 100);
  const thresholdPct = Math.min(100, (threshold / max) * 100);
  const inBand = invert ? value >= threshold : value < threshold;

  return (
    <li className="border-b border-accent/20 px-4 py-3 last:border-b-0 sm:px-5 sm:py-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-black text-text-on-dark sm:text-base">{label}</p>
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg font-black tabular-nums text-accent">
            {value}
            {unit}
          </span>
          <span
            className={cn(
              "border px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase",
              inBand
                ? "border-accent/60 text-accent"
                : "border-red-300/80 text-red-200",
            )}
          >
            {status}
          </span>
        </div>
      </div>
      <div
        className="relative mt-3 h-4 w-full border border-accent/30 bg-[#0d0d0c]"
        role="img"
        aria-label={`${label}: ${value}${unit}, threshold ${threshold}${unit}`}
      >
        <div
          className="absolute inset-y-0 left-0 bg-accent/90"
          style={{ width: `${fillPct}%` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 w-0.5 bg-text-on-dark/90"
          style={{ left: `${thresholdPct}%` }}
          aria-hidden="true"
        />
        <div
          className="absolute -top-4 font-mono text-[8px] font-bold uppercase text-text-on-dark/70"
          style={{ left: `calc(${thresholdPct}% - 1.5rem)` }}
          aria-hidden="true"
        >
          Limit {threshold}
          {unit}
        </div>
      </div>
    </li>
  );
}

export function AhlGaugeHero({ service, site }: AhlGaugeHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-background py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <ServicePageShell className="relative">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          className="flex justify-start"
        />

        <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:items-stretch lg:gap-6">
          <div className="flex min-h-0 min-w-0 flex-col">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Amazon account health
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
              className="mt-4 flex min-h-[22rem] flex-1 flex-col overflow-hidden border-2 border-primary bg-primary shadow-[4px_4px_0_0_#131311] lg:min-h-0"
              aria-label="Account health compliance panel"
            >
              <div className="shrink-0 border-b-2 border-accent/40 px-4 py-3 sm:px-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
                  Policy health gauges
                </p>
                <p className="mt-0.5 text-xs font-medium text-text-on-dark/75">
                  Illustrative thresholds. Actual limits vary by marketplace.
                </p>
              </div>
              <ul className="min-h-0 flex-1">
                {POLICIES.map((policy) => (
                  <PolicyBar key={policy.label} {...policy} />
                ))}
              </ul>
              <div className="shrink-0 border-t border-accent/20 bg-[#0d0d0c] px-4 py-2.5 sm:px-5">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-text-on-dark/60">
                  Open notices: 2 · Cases awaiting docs: 1
                </p>
              </div>
            </div>
          </div>

          <aside
            id="service-lead-form"
            className="scroll-mt-28 border-2 border-primary bg-accent p-4 text-primary shadow-[4px_4px_0_0_#131311] sm:p-5 lg:flex lg:flex-col lg:self-stretch"
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
            <p className="mt-3 text-center text-xs font-medium text-primary/70 lg:mt-auto">
              Or call {site.phone.display}
            </p>
          </aside>
        </div>
      </ServicePageShell>
    </section>
  );
}
