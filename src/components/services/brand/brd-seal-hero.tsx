import Image from "next/image";
import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface BrdSealHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const STAGE_IMAGES = [
  "/images/services/amazon-trademark-brand-registry/brd-stage-mark.jpg",
  "/images/services/amazon-trademark-brand-registry/brd-stage-filing.jpg",
  "/images/services/amazon-trademark-brand-registry/brd-stage-enroll.jpg",
  "/images/services/amazon-trademark-brand-registry/brd-stage-unlock.jpg",
] as const;

function getPathwayStages(service: ServicePageConfig) {
  const board = service.modules?.find((m) => m.type === "brandPathwayBoard");
  if (board && board.type === "brandPathwayBoard") {
    return board.stages;
  }
  return [
    {
      label: "Trademark",
      detail: "Eligible mark on file with a recognized office.",
      state: "done" as const,
    },
    {
      label: "Brand Registry",
      detail: "Enrollment aligned to Seller Central brand records.",
      state: "current" as const,
    },
    {
      label: "Unlocks",
      detail: "A+, Stores, analytics, and protection tools after approval.",
      state: "upcoming" as const,
    },
  ];
}

const STATE_LABEL = {
  done: "Stamped",
  current: "In review",
  upcoming: "Gated",
} as const;

/**
 * Cream legal wash + vertical pathway seal stamps + lime form.
 * Not manuscript, SERP, dials, thick sync spine, or ledger box.
 */
export function BrdSealHero({ service, site }: BrdSealHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  const stages = getPathwayStages(service);
  const board = service.modules?.find((m) => m.type === "brandPathwayBoard");
  const urlLabel =
    board && board.type === "brandPathwayBoard" ? board.urlLabel : "Enrollment path";

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-[#F3EDE4] py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(19,19,17,0.03) 0, rgba(19,19,17,0.03) 1px, transparent 1px, transparent 48px)",
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
              Trademark and Brand Registry
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
              className="mt-4 flex min-h-[20rem] flex-1 flex-col border-2 border-primary bg-[#FAF6EF] p-4 shadow-[4px_4px_0_0_#131311] sm:p-5 lg:min-h-0"
              aria-label="Brand Registry pathway seals"
            >
              <p className="shrink-0 font-mono text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
                {urlLabel}
              </p>

              <ol className="relative mt-4 flex min-h-0 flex-1 flex-col justify-between gap-3 pl-1">
                <span
                  className="pointer-events-none absolute bottom-6 left-[1.125rem] top-6 w-px bg-primary/35"
                  aria-hidden="true"
                />
                {stages.map((stage, index) => (
                  <li
                    key={stage.label}
                    className={cn(
                      "relative flex flex-1 items-center gap-3 py-1 sm:gap-4",
                      index > 0 && "border-t border-primary/10 pt-3",
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary font-mono text-xs font-black sm:h-10 sm:w-10",
                        stage.state === "done" && "bg-accent text-primary",
                        stage.state === "current" &&
                          "bg-background text-primary ring-2 ring-accent ring-offset-2 ring-offset-[#FAF6EF]",
                        stage.state === "upcoming" &&
                          "border-dashed bg-background/80 text-text-secondary",
                      )}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden border-2 border-primary bg-[#EDE8DF] sm:h-16 sm:w-24">
                      <Image
                        src={STAGE_IMAGES[index % STAGE_IMAGES.length]}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="96px"
                        priority={index === 0}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-black text-primary sm:text-lg">
                          {stage.label}
                        </h2>
                        <span
                          className={cn(
                            "border border-primary/40 px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.06em]",
                            stage.state === "done" && "border-primary bg-accent/40 text-primary",
                            stage.state === "current" && "border-primary bg-background text-primary",
                            stage.state === "upcoming" &&
                              "border-primary/30 bg-transparent text-text-secondary",
                          )}
                        >
                          {STATE_LABEL[stage.state]}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm font-medium leading-snug text-text-secondary">
                        {stage.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside
            id="service-lead-form"
            className="flex h-full min-h-0 flex-col scroll-mt-28 border-2 border-primary bg-accent p-4 text-primary shadow-[4px_4px_0_0_#131311] sm:p-5 lg:min-h-full"
          >
            <h2 className="shrink-0 text-lg font-black tracking-tight text-primary sm:text-xl">
              {form.heading}
            </h2>
            {form.subheading ? (
              <p className="mt-1.5 shrink-0 text-sm font-medium leading-snug text-primary/80">
                {form.subheading}
              </p>
            ) : null}
            <div className="mt-4 min-h-0 flex-1">
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
