import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface TtkSparkHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const CREATIVE_SLOTS = [
  {
    stage: "Test",
    spark: "Hook v1",
    note: "Muted scroll · product in frame",
  },
  {
    stage: "Test",
    spark: "Hook v2",
    note: "Demo-led short-form cut",
  },
  {
    stage: "Scale",
    spark: "Winner set",
    note: "Budget on proven hooks",
  },
  {
    stage: "Refresh",
    spark: "Creative swap",
    note: "New angles before fatigue",
  },
] as const;

/**
 * Dark social canvas hero: vertical phone-frame slots + spark stage labels + lime form.
 * Not storyboard timecodes, ledger box, or storefront rail.
 */
export function TtkSparkHero({ service, site }: TtkSparkHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-accent bg-[#0c0c0b] py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(198,241,53,0.06), transparent 45%), radial-gradient(circle at 80% 70%, rgba(198,241,53,0.04), transparent 40%)",
        }}
        aria-hidden="true"
      />

      <ServicePageShell className="relative">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          tone="onDark"
          className="flex justify-start"
        />

        <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:items-stretch lg:gap-7">
          <div className="flex h-full min-h-0 min-w-0 flex-col">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
              TikTok Shop ads
            </p>
            <h1
              id="service-hero-heading"
              className="mt-1.5 max-w-2xl shrink-0 text-[clamp(1.55rem,3vw,2.2rem)] font-black leading-[1.08] tracking-tight text-text-on-dark"
            >
              {service.hero.title}
            </h1>
            <p className="mt-2 max-w-xl shrink-0 text-sm font-medium leading-snug text-text-on-dark/75">
              {service.hero.subtitle}
            </p>

            <div
              className="mt-4 flex min-h-[20rem] flex-1 flex-col border-2 border-accent/55 bg-[#141412] shadow-[4px_4px_0_0_#C6F135] lg:min-h-0"
              aria-label="Spark ads creative rail preview"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-accent/25 px-3 py-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                  Spark rail · Shop ads
                </p>
                <p className="font-mono text-[10px] font-bold text-text-on-dark/45">
                  Campaign stage
                </p>
              </div>

              <div className="flex min-h-0 flex-1 flex-col justify-center p-3 sm:p-4">
                <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                  {CREATIVE_SLOTS.map((slot, index) => (
                    <li
                      key={`${slot.spark}-${index}`}
                      className={cn(
                        "flex flex-col rounded-sm border border-text-on-dark/20 bg-[#1c1c1a]",
                        index === 2 && "ring-1 ring-accent/70",
                      )}
                    >
                      <div className="flex items-center justify-between border-b border-text-on-dark/12 px-2 py-1">
                        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.08em] text-accent">
                          {slot.stage}
                        </span>
                        <span className="font-mono text-[8px] font-bold text-text-on-dark/35">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-2">
                        <div
                          className="mx-auto aspect-[9/16] w-full max-w-[4.5rem] border-2 border-text-on-dark/25 bg-[#0c0c0b] sm:max-w-none"
                          aria-hidden="true"
                        >
                          <div className="flex h-full flex-col justify-between p-1.5">
                            <span className="block h-1 w-4 rounded-sm bg-text-on-dark/20" />
                            <span className="mx-auto block h-6 w-6 rounded-full border border-dashed border-accent/40" />
                            <span className="block h-1.5 w-full rounded-sm bg-accent/30" />
                          </div>
                        </div>
                        <p className="mt-2 text-center text-[10px] font-black uppercase tracking-[0.05em] text-text-on-dark">
                          {slot.spark}
                        </p>
                        <p className="mt-1 text-center text-[9px] font-medium leading-snug text-text-on-dark/55">
                          {slot.note}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-center font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-text-on-dark/35">
                  Native short-form · Shop destination ready
                </p>
              </div>
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
            <p className="mt-3 shrink-0 text-center text-xs font-medium text-primary/70">
              Or call {site.phone.display}
            </p>
          </aside>
        </div>
      </ServicePageShell>
    </section>
  );
}
