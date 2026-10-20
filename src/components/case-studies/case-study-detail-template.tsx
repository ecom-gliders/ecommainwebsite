import Image from "next/image";
import type { CaseStudyCard, CaseStudyDetail, SiteConfig } from "@/domain/content/schemas";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import { cn } from "@/lib/utils";
import { CaseStudyBreadcrumb } from "./case-study-breadcrumb";
import { CaseStudyFreeAuditCta } from "./case-study-free-audit-cta";
import { CaseStudyRelated } from "./case-study-related";
import { caseStudyHardPanel } from "./case-study-hard-panel";
import {
  BeforeAfterBand,
  CredentialsBar,
  KeyIssuesList,
  LaunchTimeline,
  MarketChips,
  ResultsGrid,
  ServicesChips,
  StickyKpiAside,
  StrategyStages,
} from "./layouts/case-study-modules";

interface CaseStudyDetailTemplateProps {
  study: CaseStudyDetail;
  site: SiteConfig;
  relatedStudies?: CaseStudyCard[];
}

export function CaseStudyDetailTemplate({
  study,
  relatedStudies = [],
}: CaseStudyDetailTemplateProps) {
  const displayName = study.clientDisplayName ?? study.client;
  const imageAlt = study.featuredImageAlt ?? `${displayName} case study`;
  const scene = study.atmosphere || study.featuredImage;
  const sceneAlt = study.atmosphereAlt || imageAlt;
  const isFlagship = study.layout === "flagship";
  const showBeforeAfterEarly =
    study.layout === "efficiency" || study.layout === "creative";

  return (
    <>
      <section
        id="case-study-hero"
        aria-labelledby="case-study-hero-heading"
        className="relative -mt-[4.75rem] overflow-hidden border-b-2 border-primary sm:-mt-[5.5rem] md:-mt-[6rem]"
      >
        {scene ? (
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src={scene}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              quality={80}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-primary/40" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-primary" aria-hidden="true" />
        )}

        {/* Clears sticky floating header so the pill sits on the hero atmosphere */}
        <div className="relative mx-auto max-w-[1320px] px-4 pt-[5.5rem] sm:px-6 sm:pt-[6.25rem] md:pt-[6.75rem] lg:px-8">
          <CaseStudyBreadcrumb label={displayName} tone="onDark" />
        </div>

        <div className="relative mx-auto grid max-w-[1320px] gap-8 px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-10 lg:px-8 lg:pb-20 lg:pt-8">
          <div className="text-text-on-dark">
            <ServicesChips study={study} onDark />
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
              {[study.category, study.market, study.duration].filter(Boolean).join(" · ")}
            </p>
            <h1
              id="case-study-hero-heading"
              className="mt-3 max-w-3xl text-[2rem] font-black leading-[1.08] tracking-[-0.03em] text-text-on-dark sm:text-[2.75rem] lg:text-[3.25rem]"
            >
              {study.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-on-dark/85 sm:text-lg">
              {study.heroSubheadline}
            </p>
            <div className="mt-8 flex flex-wrap items-end gap-4">
              <p className="text-5xl font-black tracking-tight text-accent sm:text-6xl">
                {study.metric}
              </p>
              <p className="mb-1 text-sm font-bold uppercase tracking-wide text-text-on-dark/80">
                {study.metricLabel}
                {study.secondaryMetric ? (
                  <span className="mt-1 block font-semibold normal-case tracking-normal text-text-on-dark/70">
                    {study.secondaryMetric}
                    {study.secondaryMetricLabel ? ` · ${study.secondaryMetricLabel}` : null}
                  </span>
                ) : null}
              </p>
            </div>
            <MarketChips study={study} onDark />
            {study.featuredImage ? (
              <div className="mt-8 inline-flex items-center gap-3 rounded-[12px] border-2 border-accent/50 bg-background/95 px-3 py-2 text-primary shadow-[4px_4px_0_0_#131311]">
                <span className="relative h-12 w-12 overflow-hidden rounded-[6px] border border-primary/15 bg-[#F4F4F4]">
                  <Image
                    src={study.featuredImage}
                    alt={imageAlt}
                    fill
                    className="object-contain p-1"
                    sizes="48px"
                    quality={80}
                    priority
                  />
                </span>
                <span>
                  <span className="block text-sm font-black">{displayName}</span>
                  <span className="block text-xs text-text-secondary">{study.service}</span>
                </span>
              </div>
            ) : null}
          </div>

          {isFlagship ? (
            <div className="lg:pb-2">
              <StickyKpiAside study={study} tone="dark" />
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3">
              {study.results.metrics.slice(0, 4).map((metric) => (
                <li
                  key={`${metric.label}-${metric.value}`}
                  className="rounded-[12px] border-2 border-accent/40 bg-primary/40 px-4 py-4 backdrop-blur-sm"
                >
                  <p className="text-lg font-black text-accent sm:text-xl">{metric.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-text-on-dark/75">
                    {metric.label}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <SectionShell id="case-study-credentials" className="py-8 sm:py-10">
        <CredentialsBar study={study} />
      </SectionShell>

      {study.background ? (
        <SectionShell id="case-study-background" tone="muted" ariaLabelledBy="case-study-background-heading">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <SectionHeading heading={study.background.heading} headingId="case-study-background-heading" />
            <div className="space-y-4">
              {study.background.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-body text-text-secondary">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </SectionShell>
      ) : null}

      <SectionShell id="case-study-challenge" tone="muted" ariaLabelledBy="case-study-challenge-heading">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading heading={study.challenge.heading} headingId="case-study-challenge-heading" />
            <div className="mt-6 space-y-4">
              {study.challenge.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-body text-text-secondary">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">
              Key issues
            </p>
            <KeyIssuesList study={study} />
          </div>
        </div>
      </SectionShell>

      {showBeforeAfterEarly ? <BeforeAfterBand study={study} /> : null}

      <LaunchTimeline study={study} />
      <StrategyStages study={study} />

      {!showBeforeAfterEarly && study.beforeAfter?.length ? <BeforeAfterBand study={study} /> : null}

      <ResultsGrid study={study} />

      {scene ? (
        <SectionShell id="case-study-visual" ariaLabelledBy="case-study-visual-heading">
          <div className={cn(caseStudyHardPanel, "overflow-hidden bg-[#F4F4F4]")}>
            <div className="grid lg:grid-cols-[1.4fr_1fr]">
              <div className="relative min-h-[16rem] aspect-[16/10] lg:aspect-auto lg:min-h-[22rem]">
                <Image
                  src={scene}
                  alt={sceneAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  quality={85}
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <h2 id="case-study-visual-heading" className="text-h3">
                  Engagement snapshot
                </h2>
                <p className="mt-3 text-body text-text-secondary">
                  {displayName} · {study.category}
                  {study.market ? ` · ${study.market}` : null}
                </p>
                <ul className="mt-6 space-y-3">
                  {study.results.metrics.slice(0, 3).map((metric) => (
                    <li
                      key={`snap-${metric.label}`}
                      className="flex items-baseline justify-between gap-4 border-b border-primary/15 pb-3"
                    >
                      <span className="text-small text-text-secondary">{metric.label}</span>
                      <span className="text-right text-h4 text-primary">{metric.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SectionShell>
      ) : null}

      {study.quote ? (
        <SectionShell id="case-study-quote" ariaLabelledBy="case-study-quote-heading">
          <blockquote className={cn(caseStudyHardPanel, "mx-auto max-w-4xl bg-[#F4F4F4] p-8 sm:p-10")}>
            <p id="case-study-quote-heading" className="text-h3 text-text-primary">
              &ldquo;{study.quote.text}&rdquo;
            </p>
            <footer className="mt-6 flex items-center gap-3 text-body text-text-secondary">
              {study.featuredImage ? (
                <span className="relative h-10 w-10 overflow-hidden rounded-[5px] border-2 border-primary bg-background">
                  <Image
                    src={study.featuredImage}
                    alt=""
                    fill
                    className="object-contain p-1"
                    sizes="40px"
                  />
                </span>
              ) : null}
              <span>
                <cite className="not-italic font-bold text-text-primary">{study.quote.author}</cite>
                {study.quote.role ? (
                  <span className="block text-small">{study.quote.role}</span>
                ) : null}
              </span>
            </footer>
          </blockquote>
        </SectionShell>
      ) : null}

      <CaseStudyRelated studies={relatedStudies} />
      <CaseStudyFreeAuditCta serviceHint={study.service} />
    </>
  );
}
