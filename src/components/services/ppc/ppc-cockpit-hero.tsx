import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";

interface PpcCockpitHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const DIALS = [
  { label: "ACoS focus", value: 28, max: 60, unit: "%" },
  { label: "TACoS band", value: 12, max: 30, unit: "%" },
  { label: "Query harvest", value: 74, max: 100, unit: "%" },
];

/**
 * Dark hero under sticky header. Circular dials only on the left board.
 */
export function PpcCockpitHero({ service, site }: PpcCockpitHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative -mt-[4.75rem] overflow-x-clip border-b-2 border-accent bg-primary text-text-on-dark sm:-mt-[5.5rem] md:-mt-[6rem]"
      aria-labelledby="service-hero-heading"
    >
      <ServicePageShell className="pb-8 pt-[5.5rem] sm:pb-9 sm:pt-[6.25rem] md:pt-[6.75rem] lg:pb-10">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          tone="onDark"
          className="flex justify-start"
        />

        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:items-stretch lg:gap-8">
          <div className="flex min-h-0 min-w-0 flex-col">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
              Amazon PPC
            </p>
            <h1
              id="service-hero-heading"
              className="mt-2 max-w-2xl shrink-0 text-[clamp(1.65rem,3.2vw,2.35rem)] font-black leading-[1.08] tracking-tight text-text-on-dark"
            >
              {service.hero.title}
            </h1>
            <p className="mt-2.5 max-w-xl shrink-0 text-sm font-medium leading-snug text-text-on-dark/90 sm:text-base">
              {service.hero.subtitle}
            </p>

            {/* No bordered box — dials fill remaining left height */}
            <div
              className="mt-6 flex min-h-0 flex-1 flex-col justify-center"
              aria-label="Illustrative PPC dials"
            >
              <ul className="grid grid-cols-3 gap-4 sm:gap-8">
                {DIALS.map((dial) => {
                  const pct = Math.round((dial.value / dial.max) * 100);
                  return (
                    <li key={dial.label} className="text-center">
                      <div
                        className="relative mx-auto aspect-square w-full max-w-[9.5rem] rounded-full border-2 border-accent/50"
                        style={{
                          background: `conic-gradient(var(--color-accent) 0 ${pct}%, transparent ${pct}% 100%)`,
                        }}
                      >
                        <div className="absolute inset-[16%] flex items-center justify-center rounded-full border-2 border-accent/40 bg-primary">
                          <span className="text-lg font-black tabular-nums text-accent sm:text-xl">
                            {dial.value}
                            {dial.unit}
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-text-on-dark/85">
                        {dial.label}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-5 text-center text-[11px] font-medium text-text-on-dark/60">
                Illustrative dials—not promised ACoS outcomes.
              </p>
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
