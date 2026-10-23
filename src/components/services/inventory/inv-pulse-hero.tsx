import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface InvPulseHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

type BayState = "in-stock" | "at-risk" | "stockout";

const BAYS: {
  id: string;
  label: string;
  sku: string;
  state: BayState;
  coverDays: number;
  pulse: number;
}[] = [
  {
    id: "A1",
    label: "Hero ASIN",
    sku: "SKU-014",
    state: "in-stock",
    coverDays: 38,
    pulse: 88,
  },
  {
    id: "B2",
    label: "Variant cluster",
    sku: "SKU-022",
    state: "at-risk",
    coverDays: 12,
    pulse: 34,
  },
  {
    id: "C3",
    label: "Paid traffic ASIN",
    sku: "SKU-031",
    state: "stockout",
    coverDays: 0,
    pulse: 6,
  },
  {
    id: "D4",
    label: "Inbound lane",
    sku: "PO-884",
    state: "at-risk",
    coverDays: 9,
    pulse: 42,
  },
];

const STATE_LABEL: Record<BayState, string> = {
  "in-stock": "In stock",
  "at-risk": "At risk",
  stockout: "Stockout",
};

function pulseTone(state: BayState): string {
  if (state === "in-stock") return "bg-accent";
  if (state === "at-risk") return "bg-[#E8C547]";
  return "bg-[#D4A0A0]";
}

/**
 * Inventory hero: light industrial wash + warehouse bay grid with stock-level pulses.
 * Not reporting KPI ledger pulses or launch countdown.
 */
export function InvPulseHero({ service, site }: InvPulseHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-[#E4E4DE] py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.45)_0%,transparent_35%),repeating-linear-gradient(0deg,transparent,transparent_23px,rgba(19,19,17,0.05)_24px),repeating-linear-gradient(90deg,transparent,transparent_23px,rgba(19,19,17,0.05)_24px)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 max-w-xl bg-[linear-gradient(270deg,rgba(198,241,53,0.18)_0%,transparent_70%)]"
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
              Amazon inventory management
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
              className="mt-4 flex min-h-[22rem] flex-1 flex-col border-2 border-primary bg-background/90 shadow-[4px_4px_0_0_#131311] lg:min-h-0"
              aria-label="Warehouse bay pulse board"
            >
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b-2 border-primary bg-primary px-3 py-2.5 sm:px-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
                  Inventory pulse board
                </p>
                <ul className="flex flex-wrap gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.06em] text-text-on-dark/90">
                  <li className="flex items-center gap-1">
                    <span className="h-2 w-2 bg-accent" aria-hidden="true" />
                    In stock
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-2 w-2 bg-[#E8C547]" aria-hidden="true" />
                    At risk
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-2 w-2 bg-[#D4A0A0]" aria-hidden="true" />
                    Stockout
                  </li>
                </ul>
              </div>

              <ul className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2">
                {BAYS.map((bay, index) => (
                  <li
                    key={bay.id}
                    className={cn(
                      "flex min-h-0 flex-col justify-between p-3 sm:p-4",
                      index % 2 === 1 && "border-l-2 border-primary/25",
                      index >= 2 && "border-t-2 border-primary/25",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-text-secondary">
                          Bay {bay.id}
                        </p>
                        <h2 className="text-sm font-black text-primary sm:text-base">
                          {bay.label}
                        </h2>
                        <p className="font-mono text-[10px] font-medium text-text-secondary">
                          {bay.sku}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 border border-primary px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase",
                          bay.state === "in-stock"
                            ? "bg-accent text-primary"
                            : "bg-background text-primary",
                        )}
                      >
                        {STATE_LABEL[bay.state]}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-end justify-between gap-2">
                        <p className="text-xs font-medium text-text-secondary">
                          Days of cover
                        </p>
                        <p className="font-mono text-lg font-black tabular-nums text-primary">
                          {bay.coverDays}
                        </p>
                      </div>
                      <div
                        className="relative mt-1.5 h-3 overflow-hidden border border-primary/40 bg-[#E8E8E4]"
                        role="img"
                        aria-label={`Stock level pulse at ${bay.pulse} percent for ${bay.label}`}
                      >
                        <div
                          className={cn(
                            "absolute inset-y-0 left-0 border-r border-primary/30",
                            pulseTone(bay.state),
                          )}
                          style={{ width: `${bay.pulse}%` }}
                        />
                        {[25, 50, 75].map((tick) => (
                          <span
                            key={tick}
                            className="absolute top-0 bottom-0 w-px bg-primary/15"
                            style={{ left: `${tick}%` }}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
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
