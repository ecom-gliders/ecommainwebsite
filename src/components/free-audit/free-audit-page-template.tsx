import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FreeAuditPageConfig, SiteConfig } from "@/domain/content/schemas";
import { AuditFindingsList } from "@/components/free-audit/audit-findings-list";
import { AuditScopeSegments } from "@/components/free-audit/audit-scope-segments";
import { AuditScorecardPreview } from "@/components/free-audit/audit-scorecard-preview";
import { CalendlyInlineEmbed } from "@/components/free-audit/calendly-inline-embed";
import { FaqAccordion } from "@/components/sections/faq-accordion";

interface FreeAuditPageTemplateProps {
  page: FreeAuditPageConfig;
  site: SiteConfig;
}

export function FreeAuditPageTemplate({
  page,
  site,
}: FreeAuditPageTemplateProps) {
  return (
    <>
      {/* 1. HERO — lime field under header + giant score tiles */}
      <section
        id="audit-hero"
        aria-labelledby="audit-hero-heading"
        className="relative -mt-[4.75rem] scroll-mt-24 overflow-hidden border-b-2 border-primary bg-accent sm:-mt-[5.5rem] md:-mt-[6rem]"
      >
        <div
          className="pointer-events-none absolute -right-8 top-1/3 hidden h-40 w-40 rotate-12 border-2 border-primary/25 lg:block"
          aria-hidden="true"
        />
        <div className="container-page pb-14 pt-[5.5rem] sm:pb-16 sm:pt-[6.25rem] md:pt-[6.75rem] lg:pb-20">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p className="inline-flex border-2 border-primary bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent">
                Free · No obligation
              </p>
              <h1
                id="audit-hero-heading"
                className="mt-6 max-w-md text-[clamp(2.6rem,6vw,4.25rem)] font-bold leading-[0.9] tracking-[-0.04em] text-primary"
              >
                {page.hero.title}
              </h1>
              <p className="mt-5 max-w-sm text-lg font-medium leading-relaxed text-primary/85">
                {page.hero.subtitle}
              </p>
              <a
                href="#audit-booking"
                className="mt-8 inline-flex min-h-12 items-center gap-2 border-2 border-primary bg-primary px-5 text-small font-bold uppercase tracking-[0.06em] text-accent shadow-[4px_4px_0_0_#131311] transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_0_#131311] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
              >
                {page.hero.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="lg:col-span-7">
              <AuditScorecardPreview
                scorecard={page.scorecard}
                caption={page.hero.scorecardCaption}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SCOPE — ink/canvas mosaic (no tabs) */}
      <section
        id="audit-scope"
        aria-labelledby="audit-scope-heading"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <AuditScopeSegments scope={page.scope} />
        </div>
      </section>

      {/* 3. FINDINGS — ink band + stacked tickets */}
      <section
        id="audit-findings"
        aria-labelledby="audit-findings-heading"
        className="scroll-mt-24 border-y-2 border-primary bg-primary py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <AuditFindingsList findings={page.findings} />
        </div>
      </section>

      {/* 4. TURNAROUND — single lime ribbon */}
      <section
        id="audit-turnaround"
        aria-labelledby="audit-turnaround-heading"
        className="scroll-mt-24 bg-accent py-10 sm:py-12"
      >
        <div className="container-page">
          <h2 id="audit-turnaround-heading" className="sr-only">
            {page.turnaround.heading}
          </h2>
          <ol className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            {page.turnaround.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="font-mono text-2xl font-bold leading-none text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-bold text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-primary/75">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. BOOKING — Calendly inline (no multi-step funnel) */}
      <section
        id="audit-booking"
        aria-labelledby="audit-booking-heading"
        className="scroll-mt-24 py-12 sm:py-14 lg:py-16"
      >
        <div className="container-page">
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <p className="inline-flex border-2 border-primary bg-accent px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                30 min · Free · No obligation
              </p>
              <h2
                id="audit-booking-heading"
                className="mt-4 text-[clamp(1.85rem,3.2vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-text-primary"
              >
                {page.booking.heading}
              </h2>
              <p className="mt-3 max-w-md text-base font-medium leading-relaxed text-text-secondary">
                {page.booking.subheading}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {page.scope.pillars.map((pillar) => (
                  <li
                    key={pillar.id}
                    className="border-2 border-primary bg-background px-3 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-text-primary"
                  >
                    {pillar.label}
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-2 border-primary bg-primary p-4 text-text-on-dark shadow-[3px_3px_0_0_#C6FD50]">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">
                  On the call
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    "Where ad spend is leaking",
                    "Listing and catalog risks to fix first",
                    "Clear next steps — hire us or not",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm font-medium leading-snug"
                    >
                      <span
                        className="mt-0.5 h-4 w-4 shrink-0 border-2 border-accent bg-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t-2 border-primary pt-5">
                {page.trustSignals.stats.map((stat) => (
                  <li
                    key={`${stat.value}-${stat.label}`}
                    className="flex items-baseline gap-1.5"
                  >
                    <span className="text-lg font-bold text-text-primary">
                      {stat.value}
                    </span>
                    <span className="text-sm font-medium text-text-secondary">
                      {stat.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
                  {page.fallbackContact.heading}
                </p>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="mt-2 inline-flex min-h-11 items-center text-lg font-bold text-text-primary hover:underline"
                >
                  {site.phone.display}
                </a>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-text-primary hover:underline"
                  >
                    {site.email}
                  </a>
                  <Link
                    href={page.fallbackContact.contactCtaHref}
                    className="inline-flex min-h-11 items-center gap-1 text-small font-bold uppercase tracking-[0.06em] text-primary underline-offset-4 hover:underline"
                  >
                    {page.fallbackContact.contactCtaLabel}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 min-w-0">
              <div className="w-full max-w-[28rem] lg:ml-auto">
                <CalendlyInlineEmbed
                  url={page.booking.calendlyUrl}
                  title={page.booking.embedTitle}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROOF strip + FAQ */}
      <section
        id="audit-proof"
        aria-labelledby="audit-proof-heading"
        className="scroll-mt-24 border-t-2 border-primary bg-surface-muted py-16 sm:py-20"
      >
        <div className="container-page">
          <div className="flex flex-col gap-4 border-2 border-primary bg-background p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p
                id="audit-proof-heading"
                className="font-mono text-4xl font-bold tracking-tight text-primary sm:text-5xl"
              >
                {page.caseProof.metric}
              </p>
              <p className="text-sm font-bold uppercase tracking-[0.08em] text-text-secondary">
                {page.caseProof.metricLabel}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:max-w-md sm:items-end sm:text-right">
              <p className="text-sm font-medium text-text-secondary">
                {page.caseProof.summary}
              </p>
              <Link
                href={page.caseProof.href}
                className="inline-flex min-h-11 items-center gap-1.5 self-start text-small font-bold uppercase tracking-[0.06em] text-primary underline-offset-4 hover:underline sm:self-end"
              >
                {page.caseProof.label}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="mt-14" id="audit-faq">
            <h2
              id="audit-faq-heading"
              className="text-[clamp(1.5rem,2.5vw,1.85rem)] font-bold tracking-tight text-text-primary"
            >
              {page.faq.heading}
            </h2>
            <div className="mt-6 max-w-3xl">
              <FaqAccordion items={page.faq.items} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
