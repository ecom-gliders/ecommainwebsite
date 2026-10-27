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
 * Lilac-wash lifecycle cadence loop hero + lime form.
 * Sticky underlap; clean loop panel (no diagram photo); cards fill leftover height.
 */
export function EmlLoopHero({ service, site }: EmlLoopHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative -mt-[4.75rem] overflow-x-clip border-b-2 border-primary bg-[#E6E2EC] sm:-mt-[5.5rem] md:-mt-[6rem]"
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

      <ServicePageShell className="relative pb-5 pt-[5.75rem] sm:pb-6 sm:pt-[6.5rem] md:pt-[6.75rem]">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          className="flex justify-start"
        />

        <div className="mt-2 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,23rem)] lg:items-stretch lg:gap-5">
          <div className="flex min-h-0 min-w-0 flex-col gap-3 lg:h-full">
            <div className="shrink-0">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-text-secondary">
                Cadence loop · Owned list
              </p>
              <h1
                id="service-hero-heading"
                className="mt-1.5 max-w-2xl text-[clamp(1.35rem,2.4vw,1.75rem)] font-black leading-[1.1] tracking-tight text-primary"
              >
                {service.hero.title}
              </h1>
              <p className="mt-1.5 max-w-xl text-sm font-medium leading-snug text-text-secondary">
                {service.hero.subtitle}
              </p>
            </div>

            <div
              className="flex min-h-0 flex-1 flex-col overflow-hidden border-2 border-primary bg-[#F3F0F8] shadow-[3px_3px_0_0_#131311]"
              aria-label="Lifecycle cadence loop preview"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b-2 border-primary bg-primary px-2.5 py-1.5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                  Cadence loop · owned list
                </p>
                <p className="font-mono text-[8px] font-bold text-text-on-dark/70">
                  Looped · not one send
                </p>
              </div>

              <div className="relative flex min-h-0 flex-1 flex-col p-3 sm:p-4">
                <svg
                  className="pointer-events-none absolute inset-4 text-primary/20 sm:inset-5"
                  viewBox="0 0 320 240"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <ellipse
                    cx="160"
                    cy="120"
                    rx="130"
                    ry="95"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                  />
                  <path
                    d="M 290 120 A 130 95 0 0 1 30 120"
                    fill="none"
                    stroke="#C6F135"
                    strokeWidth="2.5"
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

                <ol className="relative grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2.5 sm:gap-3">
                  {LOOP_STAGES.map((stage, index) => {
                    const isAccent = index === 0 || index === 3;
                    return (
                      <li key={stage.label} className="min-h-0">
                        <div
                          className={cn(
                            "flex h-full min-h-[5.5rem] flex-col justify-center border-2 border-primary px-3 py-3 sm:px-4 sm:py-4",
                            isAccent
                              ? "bg-accent shadow-[3px_3px_0_0_#131311]"
                              : "bg-background",
                          )}
                        >
                          <p className="font-mono text-[8px] font-black uppercase tracking-[0.08em] text-text-secondary">
                            Loop {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-1 text-base font-black text-primary sm:text-lg">
                            {stage.label}
                          </p>
                          <p className="mt-1.5 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
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
            className="border-2 border-primary bg-accent px-3 py-3 text-primary shadow-[3px_3px_0_0_#C6F135] sm:px-3.5 sm:py-3.5"
          >
            <h2 className="text-base font-black tracking-tight text-primary">
              {form.heading}
            </h2>
            {form.subheading ? (
              <p className="mt-1 text-xs font-medium leading-snug text-primary/80">
                {form.subheading}
              </p>
            ) : null}
            <div className="mt-2.5">
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
                className="gap-y-2 [&_button[role=combobox]]:h-9 [&_button[role=combobox]]:border-2 [&_button[role=combobox]]:border-primary [&_input]:h-9 [&_input]:border-2 [&_input]:border-primary [&_label]:mb-0.5 [&_label]:text-xs [&_textarea]:border-2 [&_textarea]:border-primary"
              />
            </div>
            <p className="mt-2.5 text-center text-[11px] font-medium text-primary/70">
              Or call {site.phone.display}
            </p>
          </aside>
        </div>
      </ServicePageShell>
    </section>
  );
}
