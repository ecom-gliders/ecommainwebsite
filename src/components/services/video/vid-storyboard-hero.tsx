import Image from "next/image";
import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface VidStoryboardHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const FRAMES = [
  {
    timecode: "00:00",
    label: "Hook",
    note: "Product in frame - muted autoplay",
    src: "/images/services/amazon-video-creative/vid-hook.jpg",
  },
  {
    timecode: "00:03",
    label: "Demo",
    note: "Show the job in motion",
    src: "/images/services/amazon-video-creative/vid-demo.jpg",
  },
  {
    timecode: "00:08",
    label: "Proof",
    note: "Differentiator on screen",
    src: "/images/services/amazon-video-creative/vid-proof-frame.jpg",
  },
  {
    timecode: "00:15",
    label: "CTA",
    note: "SKU recall - end card",
    src: "/images/services/amazon-video-creative/vid-cta.jpg",
  },
] as const;

/**
 * Ink-dark storyboard hero + lime form (cpy-desk-hero rhythm).
 * Horizontal frames with timecodes - not SERP, dials, rings, or ledger.
 */
export function VidStoryboardHero({ service, site }: VidStoryboardHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-accent bg-[#131311] py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(198,241,53,0.04) 48px)",
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
              Amazon video creative
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
              className="mt-4 flex min-h-[20rem] flex-1 flex-col border-2 border-accent/60 bg-[#1a1a18] shadow-[4px_4px_0_0_#C6F135] lg:min-h-0"
              aria-label="Storyboard timeline preview"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-accent/30 px-3 py-2">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
                  Storyboard · listing cut
                </p>
                <p className="font-mono text-xs font-bold text-text-on-dark/50">
                  TC IN → OUT
                </p>
              </div>

              <div className="flex min-h-0 flex-1 flex-col justify-center p-3 sm:p-4">
                <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                  {FRAMES.map((frame, index) => (
                    <li
                      key={frame.label}
                      className={cn(
                        "flex flex-col border border-text-on-dark/20 bg-[#222220]",
                        index === 0 && "ring-1 ring-accent/80",
                      )}
                    >
                      <div className="flex items-center justify-between border-b border-text-on-dark/15 px-2 py-1">
                        <span className="font-mono text-xs font-bold text-accent">
                          {frame.timecode}
                        </span>
                        <span className="font-mono text-[8px] font-bold uppercase text-text-on-dark/40">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-2.5">
                        <p className="text-xs font-black uppercase tracking-[0.06em] text-text-on-dark">
                          {frame.label}
                        </p>
                        <div className="relative mt-2 aspect-[4/3] w-full overflow-hidden border border-text-on-dark/25 bg-[#131311]">
                          <Image
                            src={frame.src}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 40vw, 140px"
                            priority={index === 0}
                          />
                        </div>
                        <p className="mt-2 text-xs font-medium leading-snug text-text-on-dark/55">
                          {frame.note}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-center font-mono text-xs font-bold uppercase tracking-[0.12em] text-text-on-dark/35">
                  Muted autoplay · safe zones per placement
                </p>
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
