import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface DspOrbitHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/** Counsel: title + 3–5 word detail; equal row cells. */
const GATES = [
  { label: "Brand Registry", detail: "DSP eligibility" },
  { label: "Sponsored Ads", detail: "Capture ready" },
  { label: "Listings", detail: "ASINs convert" },
  { label: "Creative", detail: "Display and video" },
];

const JOBS = [
  { title: "Prospecting", detail: "Upper-funnel reach" },
  { title: "Retargeting", detail: "Return to ASINs" },
  { title: "Creative delivery", detail: "Display and video" },
  { title: "PPC alignment", detail: "With Sponsored Ads" },
];

/**
 * Short-copy DSP hero: two mid-size 4-cell rows + h-fit form.
 */
export function DspOrbitHero({ service, site }: DspOrbitHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-background py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <ServicePageShell>
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          className="flex justify-start"
        />

        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:items-stretch lg:gap-8">
          <div className="flex min-h-0 min-w-0 flex-col">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Amazon DSP
            </p>
            <h1
              id="service-hero-heading"
              className="mt-2 max-w-2xl shrink-0 text-[clamp(1.65rem,3.2vw,2.35rem)] font-black leading-[1.08] tracking-tight text-primary"
            >
              {service.hero.title}
            </h1>
            <p className="mt-2.5 max-w-xl shrink-0 text-sm font-medium leading-snug text-text-secondary sm:text-base">
              {service.hero.subtitle}
            </p>

            <div className="mt-5 flex min-h-0 flex-1 flex-col overflow-hidden border-2 border-primary bg-[#F4F4F4] shadow-[4px_4px_0_0_#131311]">
              <div className="shrink-0 border-b-2 border-primary bg-primary px-3 py-2.5">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent sm:text-sm">
                  Before DSP scales
                </p>
              </div>

              <ul
                className="grid min-h-0 flex-1 grid-cols-2 sm:grid-cols-4"
                aria-label="DSP readiness gates"
              >
                {GATES.map((gate, index) => (
                  <li
                    key={gate.label}
                    className={cn(
                      "flex flex-col justify-center bg-background px-3 py-4 sm:px-4",
                      index % 2 === 1 && "border-l-2 border-primary/20",
                      index >= 2 && "border-t-2 border-primary/20 sm:border-t-0",
                      index >= 2 && "sm:border-l-2 sm:border-primary/20",
                    )}
                  >
                    <p className="text-base font-black text-primary sm:text-lg">
                      {gate.label}
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-text-secondary">
                      {gate.detail}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="shrink-0 border-y-2 border-primary bg-primary px-3 py-2.5">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent sm:text-sm">
                  After gates clear
                </p>
              </div>

              <ul
                className="grid min-h-0 flex-1 grid-cols-2 sm:grid-cols-4"
                aria-label="DSP workstreams"
              >
                {JOBS.map((job, index) => (
                  <li
                    key={job.title}
                    className={cn(
                      "flex flex-col justify-center px-3 py-4 sm:px-4",
                      index % 2 === 1 && "border-l-2 border-primary/20",
                      index >= 2 && "border-t-2 border-primary/20 sm:border-t-0",
                      index >= 2 && "sm:border-l-2 sm:border-primary/20",
                    )}
                  >
                    <h2 className="text-base font-black tracking-tight text-primary sm:text-lg">
                      {job.title}
                    </h2>
                    <p className="mt-1.5 text-sm font-medium text-text-secondary">
                      {job.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside
            id="service-lead-form"
            className="h-fit scroll-mt-28 self-start border-2 border-primary bg-accent p-4 text-primary shadow-[4px_4px_0_0_#131311] sm:p-5"
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
