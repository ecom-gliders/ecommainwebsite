import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { ServiceBreadcrumb } from "@/components/services/service-breadcrumb";
import { ServicePageShell } from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface ScConsoleHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const NAV: { id: string; label: string; count: number; active?: boolean }[] = [
  { id: "orders", label: "Orders", count: 12 },
  { id: "cases", label: "Cases", count: 4, active: true },
  { id: "settings", label: "Settings", count: 0 },
  { id: "reports", label: "Reports", count: 0 },
];

const QUEUE = [
  { task: "Case #4821 — variation merge", owner: "Ops", status: "Due today" },
  { task: "Coupon calendar — Q2 SKU set", owner: "Promo", status: "Scheduled" },
  { task: "Listing update — hero ASIN", owner: "Catalog", status: "In progress" },
  { task: "Support follow-up — stranded FBA", owner: "Cases", status: "Waiting" },
];

export function ScConsoleHero({ service, site }: ScConsoleHeroProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <section
      id="service-hero"
      className="relative overflow-x-clip border-b-2 border-primary bg-[#E4E4E0] py-7 sm:py-8"
      aria-labelledby="service-hero-heading"
    >
      <ServicePageShell className="relative">
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          className="flex justify-start"
        />

        <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:items-stretch lg:gap-6">
          <div className="flex min-h-0 min-w-0 flex-col">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Amazon Seller Central
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
              className="mt-4 flex min-h-[22rem] flex-1 flex-col overflow-hidden border-2 border-primary bg-[#F0F0EC] shadow-[4px_4px_0_0_#131311] lg:min-h-0"
              aria-label="Seller Central console preview"
            >
              <div className="flex shrink-0 items-center justify-between border-b-2 border-primary bg-primary px-3 py-2 sm:px-4">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
                  Seller Central · operations console
                </p>
                <span className="font-mono text-xs font-bold text-accent/80">
                  Illustrative
                </span>
              </div>

              <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[9.5rem_minmax(0,1fr)]">
                <nav
                  className="flex shrink-0 flex-row gap-0 border-b-2 border-primary sm:flex-col sm:border-b-0 sm:border-r-2 sm:border-primary"
                  aria-label="Console navigation panes"
                >
                  {NAV.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "flex flex-1 items-center justify-between gap-2 px-3 py-2.5 sm:flex-none sm:py-3",
                        item.active
                          ? "bg-accent text-primary"
                          : "bg-[#E8E8E4] text-text-secondary",
                        item.id !== "reports" &&
                          "border-r border-primary/25 sm:border-r-0 sm:border-b sm:border-primary/25",
                      )}
                    >
                      <span className="text-xs font-black sm:text-sm">
                        {item.label}
                      </span>
                      {item.count > 0 ? (
                        <span
                          className={cn(
                            "font-mono text-xs font-bold tabular-nums",
                            item.active ? "text-primary" : "text-text-secondary",
                          )}
                        >
                          {item.count}
                        </span>
                      ) : null}
                    </div>
                  ))}
                </nav>

                <div className="flex min-h-0 flex-1 flex-col bg-background">
                  <div className="shrink-0 border-b border-primary/20 px-3 py-2 sm:px-4">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                      Task queue · Cases
                    </p>
                  </div>
                  <ul className="min-h-0 flex-1 divide-y divide-primary/15">
                    {QUEUE.map((row) => (
                      <li
                        key={row.task}
                        className="grid gap-1 px-3 py-2.5 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:gap-3 sm:px-4 sm:py-3"
                      >
                        <p className="text-sm font-bold text-primary">{row.task}</p>
                        <span className="font-mono text-xs font-bold uppercase text-text-secondary">
                          {row.owner}
                        </span>
                        <span className="w-fit border border-primary/40 px-1.5 py-0.5 font-mono text-xs font-bold uppercase text-primary">
                          {row.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
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
            <p className="mt-5 pb-0.5 text-center text-xs font-medium leading-normal text-primary/70">
              Or call {site.phone.display}
            </p>
          </aside>
        </div>
      </ServicePageShell>
    </section>
  );
}
