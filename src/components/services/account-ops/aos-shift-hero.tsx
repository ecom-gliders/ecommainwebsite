import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface AosShiftHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const STREAMS = [
  { label: "Sponsored Ads", status: "Synced", detail: "Budget follows ASIN rank" },
  { label: "Listings", status: "Synced", detail: "Hero CVR before spend" },
  { label: "Catalog", status: "Watch", detail: "Buyability before scale" },
  { label: "Hand-offs", status: "Open", detail: "Owners + dated next step" },
];

/**
 * Account ops hero: gray wash + vertical sync spine (no ledger box).
 * Form stays lime. Distinct from PPC dark dials / reporting 2×2 pulses.
 */
export function AosShiftHero({ service, site }: AosShiftHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-[#E8E8E4] py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      {/* Soft lime wash — unique vs white FS/DSP/Reporting heroes */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-3xl bg-[linear-gradient(105deg,rgba(198,241,53,0.22)_0%,transparent_55%)]"
        aria-hidden="true"
      />

      <ServicePageShell className="relative">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          className="flex justify-start"
        />

        <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:items-stretch lg:gap-6">
          <div className="flex min-h-0 min-w-0 flex-col">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Amazon account operations
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

            {/* Spine fills remaining height — denser rows, thicker rail */}
            <ul
              className="relative mt-4 flex min-h-0 flex-1 flex-col justify-between border-l-4 border-primary bg-background/70 py-1 pl-0 shadow-[3px_3px_0_0_rgba(19,19,17,0.12)]"
              aria-label="Workstream sync spine"
            >
              {STREAMS.map((stream, index) => (
                <li
                  key={stream.label}
                  className={cn(
                    "relative flex flex-1 items-center gap-3 px-4 py-2.5 sm:gap-4 sm:px-5",
                    index > 0 && "border-t border-primary/20",
                  )}
                >
                  <span
                    className={cn(
                      "relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center border-2 border-primary font-mono text-xs font-black",
                      stream.status === "Synced"
                        ? "bg-accent text-primary"
                        : "bg-background text-primary",
                    )}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-black text-primary sm:text-lg">
                        {stream.label}
                      </h2>
                      <span
                        className={cn(
                          "border px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.06em]",
                          stream.status === "Synced"
                            ? "border-primary bg-accent text-primary"
                            : "border-primary/50 bg-background text-text-secondary",
                        )}
                      >
                        {stream.status}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm font-medium text-text-secondary">
                      {stream.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
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
