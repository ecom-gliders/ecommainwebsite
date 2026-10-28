import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface LstPdpHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const INDEXED = ["waterproof", "hiking boots", "men", "gore-tex", "wide fit"];

const BULLETS = [
  {
    text: "Waterproof membrane keeps feet dry on wet trails",
    hits: ["Waterproof"],
  },
  {
    text: "Aggressive tread for mud and rock grip",
    hits: ["grip"],
  },
  {
    text: "Wide-fit last — less pinch on long miles",
    hits: ["Wide-fit"],
  },
  {
    text: "Breathable lining for all-day trail use",
    hits: ["Breathable"],
  },
];

const FIELDS = [
  { label: "Title", score: 92 },
  { label: "Bullets", score: 78 },
  { label: "Backend", score: 85 },
  { label: "Images", score: 70 },
];

function highlightParts(text: string, hits: string[]) {
  if (hits.length === 0) return text;
  const pattern = new RegExp(`(${hits.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, index) =>
    hits.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
      <mark key={`${part}-${index}`} className="bg-accent px-0.5 text-primary">
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Light SERP→PDP hero: dense listing card (search → PDP → field scores).
 * Form stays lime. Fills left column height with no hollow gap.
 */
export function LstPdpHero({ service, site }: LstPdpHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-background py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(198,241,53,0.16),transparent_48%),repeating-linear-gradient(0deg,transparent,transparent_23px,rgba(19,19,17,0.035)_24px)]"
        aria-hidden="true"
      />

      <ServicePageShell className="relative">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          className="flex justify-start"
        />

        <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] lg:items-stretch lg:gap-7">
          <div className="flex h-full min-h-0 min-w-0 flex-col">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Amazon listing SEO
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
              className="mt-4 flex min-h-[22rem] flex-1 flex-col border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311] lg:min-h-0"
              aria-label="Search to listing preview"
            >
              {/* Search chrome */}
              <div className="flex shrink-0 items-center gap-2 border-b-2 border-primary bg-primary px-3 py-2.5">
                <span
                  className="flex h-8 flex-1 items-center truncate border border-accent/40 bg-[#1a1a18] px-2.5 font-mono text-xs text-text-on-dark/90"
                  aria-hidden="true"
                >
                  waterproof hiking boots men
                </span>
                <span
                  className="shrink-0 border-2 border-accent bg-accent px-2.5 py-1.5 font-mono text-xs font-black uppercase tracking-wide text-primary"
                  aria-hidden="true"
                >
                  Search
                </span>
              </div>

              {/* PDP body — fills remaining height */}
              <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[minmax(9.5rem,38%)_minmax(0,1fr)]">
                {/* Product media column */}
                <div
                  className="flex min-h-0 flex-col border-b-2 border-primary bg-[#ECECE6] p-3 sm:border-b-0 sm:border-r-2 sm:p-4"
                  aria-hidden="true"
                >
                  <div className="relative flex min-h-[10rem] flex-1 flex-col items-center justify-center border-2 border-primary bg-[#F7F7F4]">
                    {/* Stylized product frame — not empty gray */}
                    <svg
                      viewBox="0 0 80 96"
                      className="h-[4.75rem] w-auto text-primary sm:h-[5.5rem]"
                      fill="none"
                      aria-hidden="true"
                    >
                      <rect
                        x="22"
                        y="4"
                        width="36"
                        height="14"
                        rx="2"
                        className="fill-accent stroke-primary"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 20h44l6 28H12L18 20Z"
                        className="fill-primary/10 stroke-primary"
                        strokeWidth="2"
                      />
                      <path
                        d="M20 48h40v36c0 4-6 8-20 8s-20-4-20-8V48Z"
                        className="fill-accent/50 stroke-primary"
                        strokeWidth="2"
                      />
                      <path
                        d="M24 70h32M28 80h24"
                        className="stroke-primary"
                        strokeWidth="2"
                      />
                    </svg>
                    <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
                      Main image
                    </p>
                    <span className="absolute left-2 top-2 border border-primary bg-accent px-1.5 py-0.5 font-mono text-xs font-black text-primary">
                      ASIN
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-1.5">
                    {["01", "02", "03", "A+"].map((label, i) => (
                      <div
                        key={label}
                        className={cn(
                          "flex aspect-square items-center justify-center border-2 border-primary font-mono text-xs font-bold",
                          i === 0
                            ? "bg-accent text-primary"
                            : "bg-background text-text-secondary",
                        )}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Copy + meta */}
                <div className="flex min-h-0 flex-col p-3 sm:p-4">
                  <p className="text-sm font-black leading-snug text-primary sm:text-base">
                    Men&apos;s{" "}
                    <mark className="bg-accent px-0.5 text-primary">
                      Waterproof
                    </mark>{" "}
                    <mark className="bg-accent px-0.5 text-primary">
                      Hiking Boots
                    </mark>{" "}
                    — Grip Sole, Wide Fit
                  </p>

                  <div
                    className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1"
                    aria-hidden="true"
                  >
                    <span className="flex items-center gap-0.5 text-accent">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className="inline-block h-2.5 w-2.5 bg-accent"
                          style={{
                            clipPath:
                              "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                          }}
                        />
                      ))}
                    </span>
                    <span className="font-mono text-xs font-bold text-text-secondary">
                      4.6 · 1,284 ratings
                    </span>
                    <span className="font-mono text-xs font-bold text-primary">
                      $89.00
                    </span>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {BULLETS.map((bullet) => (
                      <li
                        key={bullet.text}
                        className="flex gap-2 text-xs font-medium leading-snug text-text-secondary sm:text-[13px]"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-primary"
                          aria-hidden="true"
                        />
                        <span>{highlightParts(bullet.text, bullet.hits)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto border-t-2 border-primary/15 pt-3">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                      Field coverage
                    </p>
                    <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {FIELDS.map((field) => (
                        <li key={field.label}>
                          <div className="flex items-baseline justify-between gap-1">
                            <span className="font-mono text-xs font-bold uppercase text-text-secondary">
                              {field.label}
                            </span>
                            <span className="font-mono text-xs font-black tabular-nums text-primary">
                              {field.score}
                            </span>
                          </div>
                          <div
                            className="mt-1 h-1.5 border border-primary/20 bg-[#ECECE6]"
                            aria-hidden="true"
                          >
                            <div
                              className="h-full bg-accent"
                              style={{ width: `${field.score}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Indexed terms — full width footer */}
              <div className="shrink-0 border-t-2 border-primary bg-[#F4F4F4] px-3 py-2.5 sm:px-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="shrink-0 font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                    Indexed terms
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {INDEXED.map((term) => (
                      <li
                        key={term}
                        className="border border-primary bg-accent px-1.5 py-0.5 font-mono text-xs font-bold text-primary"
                      >
                        {term}
                      </li>
                    ))}
                  </ul>
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
