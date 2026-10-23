import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface CpyDeskHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const DRAFT_LINES = [
  {
    kind: "title" as const,
    label: "Title",
    weak: "Best Premium Quality New Style Product 2024 Free Shipping Hot Sale",
    strong: "Men's Waterproof Hiking Boots — Grip Sole, Wide Fit",
  },
  {
    kind: "bullet" as const,
    label: "Bullet",
    weak: "Made with high quality materials and advanced technology features",
    strong: "Waterproof membrane keeps feet dry on wet trails",
  },
  {
    kind: "bullet" as const,
    label: "Bullet",
    weak: "Perfect for all your outdoor needs and daily activities",
    strong: "Aggressive tread for mud and rock — less slip on steep grades",
  },
  {
    kind: "aplus" as const,
    label: "A+ module",
    weak: "Same five bullets in a larger font",
    strong: "Compare membrane types · When to size up · Care that lasts",
  },
];

/**
 * Paper copy-desk hero: manuscript rewrite board + lime form.
 * Not SERP mock, dials, spine, or ledger pulses.
 */
export function CpyDeskHero({ service, site }: CpyDeskHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-[#EDE8DF] py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(19,19,17,0.06) 28px)",
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
              Amazon content writing
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
              aria-label="Copy desk manuscript"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b-2 border-primary bg-primary px-3 py-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                  Manuscript · draft desk
                </p>
                <p className="font-mono text-[10px] font-bold text-text-on-dark/70">
                  Strike → rewrite
                </p>
              </div>

              <ul className="flex min-h-0 flex-1 flex-col justify-between gap-0 p-3 sm:p-4">
                {DRAFT_LINES.map((line, index) => (
                  <li
                    key={`${line.label}-${index}`}
                    className={cn(
                      "flex flex-1 flex-col justify-center border-primary/15 py-2",
                      index > 0 && "border-t",
                    )}
                  >
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                      {line.label}
                    </p>
                    <p className="mt-1 text-xs font-medium leading-snug text-text-secondary line-through decoration-primary/50 sm:text-[13px]">
                      {line.weak}
                    </p>
                    <p
                      className={cn(
                        "mt-1.5 text-sm font-bold leading-snug text-primary sm:text-[15px]",
                        line.kind === "title" && "font-black",
                      )}
                    >
                      <span className="mr-1.5 inline-block border border-primary bg-accent px-1 py-px font-mono text-[9px] font-black uppercase">
                        New
                      </span>
                      {line.strong}
                    </p>
                  </li>
                ))}
              </ul>
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
