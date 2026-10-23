import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface EmlLoopHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const LOOP_STAGES = [
  { label: "Welcome", detail: "Confirm opt-in and set expectations" },
  { label: "Nurture", detail: "Post-purchase and replenishment timing" },
  { label: "Winback", detail: "Re-engage subscribers who went quiet" },
  { label: "Loyalty", detail: "Repeat purchase and launch access" },
] as const;

/**
 * Lilac-wash lifecycle cadence loop hero + lime form (cpy-desk rhythm).
 * Circular retention loop — not DSP funnel rings or broadcast-only strip.
 */
export function EmlLoopHero({ service, site }: EmlLoopHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-[#E6E2EC] py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,245,66,0.12) 0%, transparent 55%), repeating-linear-gradient(135deg, rgba(19,19,17,0.03) 0, rgba(19,19,17,0.03) 1px, transparent 1px, transparent 24px)",
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
              Email retention marketing
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
              className="mt-4 flex min-h-[20rem] flex-1 flex-col border-2 border-primary bg-[#F3F0F8] shadow-[4px_4px_0_0_#131311] lg:min-h-0"
              aria-label="Lifecycle cadence loop preview"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b-2 border-primary bg-primary px-3 py-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                  Cadence loop · owned list
                </p>
                <p className="font-mono text-[10px] font-bold text-text-on-dark/70">
                  Looped · not one send
                </p>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-6">
                <svg
                  className="pointer-events-none absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] text-primary/25 sm:inset-6"
                  viewBox="0 0 320 200"
                  aria-hidden="true"
                >
                  <ellipse
                    cx="160"
                    cy="100"
                    rx="128"
                    ry="72"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                  />
                  <path
                    d="M 288 100 A 128 72 0 0 1 32 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-accent"
                    markerEnd="url(#eml-loop-arrow)"
                  />
                  <defs>
                    <marker
                      id="eml-loop-arrow"
                      markerWidth="8"
                      markerHeight="8"
                      refX="6"
                      refY="4"
                      orient="auto"
                    >
                      <path d="M0,0 L8,4 L0,8 Z" fill="#C6F135" />
                    </marker>
                  </defs>
                </svg>

                <ol className="relative grid w-full max-w-md grid-cols-2 gap-3 sm:gap-4">
                  {LOOP_STAGES.map((stage, index) => {
                    const isAccent = index === 0 || index === 3;
                    return (
                      <li
                        key={stage.label}
                        className={cn(
                          index === 1 && "sm:translate-y-2",
                          index === 2 && "sm:translate-y-2",
                        )}
                      >
                        <div
                          className={cn(
                            "border-2 border-primary px-3 py-2.5 sm:px-4 sm:py-3",
                            isAccent
                              ? "bg-accent shadow-[3px_3px_0_0_#131311]"
                              : "bg-background",
                          )}
                        >
                          <p className="font-mono text-[9px] font-black uppercase tracking-[0.08em] text-text-secondary">
                            Loop {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-0.5 text-sm font-black text-primary sm:text-[15px]">
                            {stage.label}
                          </p>
                          <p className="mt-1 text-xs font-medium leading-snug text-text-secondary">
                            {stage.detail}
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
