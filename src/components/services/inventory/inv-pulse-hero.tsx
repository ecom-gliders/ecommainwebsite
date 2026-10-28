import Image from "next/image";
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
  src: string;
}[] = [
  {
    id: "A1",
    label: "Hero ASIN",
    sku: "SKU-014",
    state: "in-stock",
    coverDays: 38,
    pulse: 88,
    src: "/images/services/amazon-inventory-management/inv-bay-01.jpg",
  },
  {
    id: "B2",
    label: "Variant cluster",
    sku: "SKU-022",
    state: "at-risk",
    coverDays: 12,
    pulse: 34,
    src: "/images/services/amazon-inventory-management/inv-bay-02.jpg",
  },
  {
    id: "C3",
    label: "Paid traffic",
    sku: "SKU-031",
    state: "stockout",
    coverDays: 0,
    pulse: 6,
    src: "/images/services/amazon-inventory-management/inv-door-stockout.jpg",
  },
  {
    id: "D4",
    label: "Inbound lane",
    sku: "PO-884",
    state: "at-risk",
    coverDays: 9,
    pulse: 42,
    src: "/images/services/amazon-inventory-management/inv-inbound-stage-v2.jpg",
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
  return "bg-[#C97878]";
}

function stateChip(state: BayState): string {
  if (state === "in-stock") return "border-accent bg-accent text-primary";
  if (state === "at-risk")
    return "border-[#E8C547]/70 bg-[#E8C547]/15 text-[#E8C547]";
  return "border-[#C97878]/70 bg-[#C97878]/15 text-[#E8B0B0]";
}

/**
 * Dark stock-cover terminal: vertical rack columns stretch with the form.
 */
export function InvPulseHero({ service, site }: InvPulseHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative -mt-[4.75rem] overflow-x-clip border-b-2 border-accent bg-[#0c0c0b] sm:-mt-[5.5rem] md:-mt-[6rem]"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 18% 20%, rgba(198,241,53,0.12), transparent 42%), linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(198,241,53,0.55) 48px)",
        }}
        aria-hidden="true"
      />

      <ServicePageShell className="relative pb-7 pt-[5.5rem] sm:pb-8 sm:pt-[6.25rem] md:pt-[6.75rem]">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          tone="onDark"
          className="flex justify-start"
        />

        <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] lg:items-stretch lg:gap-7">
          <div className="flex h-full min-h-0 min-w-0 flex-col">
            <p className="shrink-0 font-mono text-xs font-bold uppercase tracking-[0.14em] text-accent">
              Stock cover terminal
            </p>
            <h1
              id="service-hero-heading"
              className="mt-2 max-w-2xl shrink-0 text-[clamp(1.65rem,3.2vw,2.35rem)] font-black leading-[1.06] tracking-tight text-text-on-dark"
            >
              {service.hero.title}
            </h1>
            <p className="mt-2 max-w-xl shrink-0 text-sm font-medium leading-snug text-text-on-dark/75 sm:text-base">
              {service.hero.subtitle}
            </p>

            <div
              className="mt-4 flex min-h-[18rem] flex-1 flex-col overflow-hidden border-2 border-accent/70 bg-[#121210] shadow-[4px_4px_0_0_#C6F135]"
              aria-label="Stock cover rack"
            >
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-accent/35 px-3 py-2">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
                  Cover rack · days of stock
                </p>
                <ul className="flex flex-wrap gap-2.5 font-mono text-[8px] font-bold uppercase tracking-[0.06em] text-text-on-dark/80">
                  <li className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
                    In stock
                  </li>
                  <li className="flex items-center gap-1">
                    <span
                      className="h-1.5 w-1.5 bg-[#E8C547]"
                      aria-hidden="true"
                    />
                    At risk
                  </li>
                  <li className="flex items-center gap-1">
                    <span
                      className="h-1.5 w-1.5 bg-[#C97878]"
                      aria-hidden="true"
                    />
                    Stockout
                  </li>
                </ul>
              </div>

              <ol className="grid min-h-0 flex-1 auto-rows-fr grid-cols-2 sm:grid-cols-4">
                {BAYS.map((bay, index) => (
                  <li
                    key={bay.id}
                    className={cn(
                      "flex h-full min-h-0 flex-col",
                      index % 2 === 1 && "border-l border-accent/25",
                      index >= 2 && "border-t border-accent/25 sm:border-t-0",
                      index > 0 && "sm:border-l sm:border-accent/25",
                    )}
                  >
                    <div className="relative h-20 w-full shrink-0 border-b border-accent/25 sm:h-24">
                      <Image
                        src={bay.src}
                        alt=""
                        fill
                        className="object-cover opacity-90"
                        sizes="(max-width: 640px) 50vw, 160px"
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121210] via-transparent to-transparent" />
                      <span className="absolute left-2 top-2 font-mono text-xs font-black uppercase tracking-[0.08em] text-accent">
                        Bay {bay.id}
                      </span>
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col justify-between gap-3 p-2.5 sm:p-3">
                      <div className="flex items-start justify-between gap-1">
                        <div className="min-w-0">
                          <h2 className="truncate text-[13px] font-black leading-tight text-text-on-dark sm:text-sm">
                            {bay.label}
                          </h2>
                          <p className="mt-0.5 font-mono text-xs font-medium text-text-on-dark/45">
                            {bay.sku}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "shrink-0 border px-1 py-px font-mono text-[7px] font-bold uppercase",
                            stateChip(bay.state),
                          )}
                        >
                          {STATE_LABEL[bay.state]}
                        </span>
                      </div>

                      <div className="flex min-h-0 flex-1 items-stretch gap-2.5">
                        <div
                          className="relative w-3.5 shrink-0 self-stretch overflow-hidden border border-text-on-dark/20 bg-[#1a1a17]"
                          aria-hidden="true"
                        >
                          <div
                            className={cn(
                              "absolute inset-x-0 bottom-0",
                              pulseTone(bay.state),
                            )}
                            style={{ height: `${bay.pulse}%` }}
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col justify-end">
                          <p className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-text-on-dark/40">
                            Days of cover
                          </p>
                          <p className="mt-1 font-mono text-2xl font-black tabular-nums leading-none text-text-on-dark sm:text-[1.65rem]">
                            {bay.coverDays}
                          </p>
                          <div
                            className="relative mt-2 h-1.5 overflow-hidden border border-text-on-dark/20 bg-[#1a1a17]"
                            role="img"
                            aria-label={`Stock level pulse at ${bay.pulse} percent for ${bay.label}`}
                          >
                            <div
                              className={cn(
                                "absolute inset-y-0 left-0",
                                pulseTone(bay.state),
                              )}
                              style={{ width: `${bay.pulse}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside
            id="service-lead-form"
            className="flex h-full min-h-0 flex-col self-stretch border-2 border-primary bg-accent p-4 text-primary shadow-[4px_4px_0_0_#C6F135] sm:p-5"
          >
            <h2 className="text-lg font-black tracking-tight text-primary sm:text-xl">
              {form.heading}
            </h2>
            {form.subheading ? (
              <p className="mt-1.5 text-sm font-medium leading-snug text-primary/80">
                {form.subheading}
              </p>
            ) : null}
            <div className="mt-4 flex-1">
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
            <p className="mt-4 shrink-0 text-center text-xs font-medium text-primary/70">
              Or call {site.phone.display}
            </p>
          </aside>
        </div>
      </ServicePageShell>
    </section>
  );
}
