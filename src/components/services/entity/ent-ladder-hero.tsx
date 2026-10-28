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
 * Dark entity-ladder hero: compact contained rungs + lime intake form.
 */
export function EntLadderHero({ service, site }: EntLadderHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative -mt-[4.75rem] overflow-x-clip border-b-2 border-accent bg-[#12100e] sm:-mt-[5.5rem] md:-mt-[6rem]"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 70% 0%, rgba(198,241,53,0.1), transparent 40%), linear-gradient(180deg, rgba(237,232,223,0.06) 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />

      <ServicePageShell className="relative pb-7 pt-[5.5rem] sm:pb-8 sm:pt-[6.25rem] md:pt-[6.75rem]">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          tone="onDark"
          className="flex justify-start"
        />

        <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] lg:items-start lg:gap-7">
          <div className="flex min-w-0 flex-col">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-accent">
              Entity setup ladder
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
              className="mt-4 w-full overflow-hidden border-2 border-accent/70 bg-[#1a1814] shadow-[4px_4px_0_0_#C6F135]"
              aria-label="Entity setup ladder preview"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-accent/35 px-2.5 py-1.5 sm:px-3">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent">
                  Jurisdiction → Amazon
                </p>
                <p className="font-mono text-[8px] font-bold uppercase tracking-[0.08em] text-text-on-dark/45">
                  Ascending rungs
                </p>
              </div>

              <ol className="divide-y divide-accent/20">
                {ENTITY_RUNGS.map((rung, index) => {
                  const isTop = index === ENTITY_RUNGS.length - 1;
                  return (
                    <li
                      key={rung.step}
                      className={cn(
                        "flex items-start gap-2.5 px-2.5 py-2 sm:px-3 sm:py-2.5",
                        isTop && "bg-accent/10",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border font-mono text-xs font-black",
                          isTop
                            ? "border-accent bg-accent text-primary"
                            : "border-accent/50 text-accent",
                        )}
                      >
                        {rung.step}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <p className="text-[13px] font-black leading-tight text-text-on-dark">
                            {rung.label}
                          </p>
                          {isTop ? (
                            <span className="border border-accent px-1 py-px font-mono text-[7px] font-bold uppercase text-accent">
                              Top rung
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-0.5 text-xs font-medium leading-snug text-text-on-dark/55">
                          {rung.detail}
                        </p>
                      </div>
                      <div
                        className="mt-1.5 h-1 w-10 shrink-0 overflow-hidden border border-accent/25 bg-[#12100e] sm:w-14"
                        aria-hidden="true"
                      >
                        <div
                          className="h-full bg-accent"
                          style={{
                            width: `${40 + ((index + 1) / ENTITY_RUNGS.length) * 60}%`,
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
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
