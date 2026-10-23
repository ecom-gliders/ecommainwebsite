import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface VisFrameHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const STACK_FRAMES = [
  {
    slot: "Main",
    detail: "Hero · compliant fill",
    offset: "translate-x-0 translate-y-0",
    z: "z-[3]",
  },
  {
    slot: "Lifestyle",
    detail: "In-use context",
    offset: "translate-x-6 translate-y-4 sm:translate-x-10 sm:translate-y-5",
    z: "z-[2]",
  },
  {
    slot: "Infographic",
    detail: "Benefit callouts",
    offset: "translate-x-12 translate-y-8 sm:translate-x-[4.5rem] sm:translate-y-10",
    z: "z-[1]",
  },
] as const;

function CropMarks() {
  const corner =
    "absolute h-3 w-3 border-primary/70 before:absolute before:h-px before:w-full before:bg-primary/70 after:absolute after:h-full after:w-px after:bg-primary/70";
  return (
    <>
      <span className={cn(corner, "left-1 top-1 before:left-0 before:top-0 after:left-0 after:top-0")} aria-hidden="true" />
      <span className={cn(corner, "right-1 top-1 before:right-0 before:top-0 after:right-0 after:top-0")} aria-hidden="true" />
      <span className={cn(corner, "bottom-1 left-1 before:bottom-0 before:left-0 after:bottom-0 after:left-0")} aria-hidden="true" />
      <span className={cn(corner, "bottom-1 right-1 before:bottom-0 before:right-0 after:bottom-0 after:right-0")} aria-hidden="true" />
    </>
  );
}

/**
 * Dark studio hero: stacked image frames with crop marks + lime intake form.
 */
export function VisFrameHero({ service, site }: VisFrameHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-[#131311] py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #F4F4F4 1px, transparent 0)",
          backgroundSize: "24px 24px",
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
              Amazon visual creativity
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
              className="relative mt-4 flex min-h-[20rem] flex-1 flex-col border-2 border-accent/40 bg-[#1a1a18] p-4 shadow-[4px_4px_0_0_#C6F135] sm:p-5 lg:min-h-0"
              aria-label="Creative frame stack preview"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-accent/30 pb-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                  Studio · frame stack
                </p>
                <p className="font-mono text-[10px] font-bold text-text-on-dark/50">
                  Crop → sequence
                </p>
              </div>

              <div className="relative mt-3 min-h-0 flex-1">
                {STACK_FRAMES.map((frame) => (
                  <div
                    key={frame.slot}
                    className={cn(
                      "absolute left-0 top-0 w-[min(100%,14rem)] border-2 border-[#F4F4F4] bg-[#2a2a28] p-3 sm:w-[15rem]",
                      frame.offset,
                      frame.z,
                    )}
                  >
                    <CropMarks />
                    <div className="aspect-square w-full bg-gradient-to-br from-[#F4F4F4]/25 to-[#F4F4F4]/5" />
                    <p className="mt-2 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-accent">
                      {frame.slot}
                    </p>
                    <p className="text-xs font-medium text-text-on-dark/70">
                      {frame.detail}
                    </p>
                  </div>
                ))}
                <div className="pointer-events-none absolute bottom-2 right-2 max-w-[10rem] border border-dashed border-accent/50 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-accent/80">
                  A+ module slot
                </div>
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
