import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface EntLadderHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const ENTITY_RUNGS = [
  { step: "01", label: "Seller intent", detail: "US entity goal + marketplace plan" },
  { step: "02", label: "Jurisdiction", detail: "State choice tied to filing path" },
  { step: "03", label: "Formation", detail: "Articles and ownership on record" },
  { step: "04", label: "Tax ID", detail: "EIN letter for verification prep" },
  { step: "05", label: "Amazon ready", detail: "Seller Central inputs aligned" },
] as const;

/**
 * Light-wash entity ladder hero + lime form (cpy-desk-hero rhythm).
 * Ascending rungs — not manuscript, SERP, spine, or seal pathway.
 */
export function EntLadderHero({ service, site }: EntLadderHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-[#EDE8DF] py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(200,245,66,0.08) 0%, transparent 45%), repeating-linear-gradient(90deg, rgba(19,19,17,0.04) 0, rgba(19,19,17,0.04) 1px, transparent 1px, transparent 32px)",
        }}
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
              US company registration
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
              className="mt-4 flex min-h-[20rem] flex-1 flex-col border-2 border-primary bg-[#F7F3EA] shadow-[4px_4px_0_0_#131311] lg:min-h-0"
              aria-label="Entity setup ladder preview"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b-2 border-primary bg-primary px-3 py-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                  Entity ladder · jurisdiction to Amazon
                </p>
                <p className="font-mono text-[10px] font-bold text-text-on-dark/70">
                  Ascending rungs
                </p>
              </div>

              <div className="relative flex min-h-0 flex-1 flex-col justify-end p-4 sm:p-5">
                <div
                  className="pointer-events-none absolute bottom-8 left-6 top-6 w-1 bg-primary sm:left-8"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute bottom-8 left-6 top-6 w-1 translate-x-3 bg-primary/25 sm:left-8 sm:translate-x-4"
                  aria-hidden="true"
                />

                <ol className="relative flex flex-col-reverse gap-2 sm:gap-2.5">
                  {ENTITY_RUNGS.map((rung, index) => {
                    const isTop = index === ENTITY_RUNGS.length - 1;
                    return (
                      <li
                        key={rung.step}
                        className="relative pl-10 sm:pl-12"
                        style={{ marginLeft: `${index * 0.65}rem` }}
                      >
                        <span
                          className={cn(
                            "absolute left-0 top-1/2 h-0.5 w-8 -translate-y-1/2 bg-primary sm:w-10",
                            isTop && "bg-accent",
                          )}
                          aria-hidden="true"
                        />
                        <div
                          className={cn(
                            "border-2 border-primary px-3 py-2 sm:px-4 sm:py-2.5",
                            isTop
                              ? "bg-accent shadow-[3px_3px_0_0_#131311]"
                              : "bg-background",
                          )}
                        >
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <span className="font-mono text-[10px] font-black tabular-nums text-text-secondary">
                              Rung {rung.step}
                            </span>
                            <p className="text-sm font-black text-primary sm:text-[15px]">
                              {rung.label}
                            </p>
                          </div>
                          <p className="mt-0.5 text-xs font-medium leading-snug text-text-secondary">
                            {rung.detail}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
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
