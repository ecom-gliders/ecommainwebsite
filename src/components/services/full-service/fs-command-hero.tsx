import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface FsCommandHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Full-Service hero: title + 2x2 command board (fills left) + full intake form.
 * No pod-map graphic. Left column stretches to match form height.
 */
export function FsCommandHero({ service, site }: FsCommandHeroProps) {
  const board = service.fullService?.commandBoard;
  const metrics = service.fullService?.manifesto?.metrics;
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-background py-8 sm:py-9 lg:py-10"
      aria-labelledby="service-hero-heading"
    >
      <ServicePageShell>
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          className="flex justify-start"
        />

        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] lg:items-stretch lg:gap-8">
          <div className="flex min-w-0 flex-col">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              {board?.eyebrow ?? "Full-service Amazon"}
            </p>
            <h1
              id="service-hero-heading"
              className="mt-2 max-w-2xl text-[clamp(1.7rem,3.4vw,2.5rem)] font-black leading-[1.08] tracking-tight text-primary"
            >
              {service.hero.title}
            </h1>
            <p className="mt-2.5 max-w-xl text-sm font-medium leading-relaxed text-text-secondary sm:text-base">
              {service.hero.subtitle}
            </p>

            {board ? (
              <div className="mt-5 flex min-h-0 flex-1 flex-col overflow-hidden border-2 border-primary bg-[#F4F4F4] shadow-[4px_4px_0_0_#131311]">
                <ul
                  className="grid flex-1 sm:grid-cols-2"
                  aria-label="Account command lanes"
                >
                  {board.lanes.map((lane, index) => (
                    <li
                      key={lane.title}
                      className={cn(
                        "flex flex-col justify-center border-primary/20 p-4 sm:p-5",
                        index > 0 && "border-t-2 sm:border-t-0",
                        index % 2 === 1 && "sm:border-l-2",
                        index >= 2 && "sm:border-t-2",
                      )}
                    >
                      <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
                        Lane {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2 className="mt-1.5 text-lg font-black tracking-tight text-primary">
                        {lane.title}
                      </h2>
                      <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                        {lane.description}
                      </p>
                    </li>
                  ))}
                </ul>

                {metrics && metrics.length > 0 ? (
                  <ul className="grid grid-cols-2 border-t-2 border-primary sm:grid-cols-4">
                    {metrics.map((metric) => (
                      <li
                        key={metric.label}
                        className="border-primary/15 px-3 py-3 sm:border-l-2 sm:first:border-l-0"
                      >
                        <p className="text-base font-black tracking-tight text-primary sm:text-lg">
                          {metric.value}
                        </p>
                        <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.06em] text-text-secondary">
                          {metric.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>

          <aside
            id="service-lead-form"
            className="scroll-mt-28 h-fit border-2 border-primary bg-accent p-4 shadow-[4px_4px_0_0_#131311] sm:p-5"
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
