import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  Globe2,
  HeartHandshake,
  Quote,
  type LucideIcon,
} from "lucide-react";
import type { AboutPageConfig, SiteConfig } from "@/domain/content/schemas";
import { AboutBreadcrumb } from "@/components/about/about-breadcrumb";
import { AboutMarketsSection } from "@/components/about/about-markets-section";
import { PartnerBadgesRow } from "@/components/brand/partner-badges-row";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";

const VALUE_ICONS: LucideIcon[] = [
  Building2,
  BarChart3,
  HeartHandshake,
  Globe2,
];

interface AboutPageTemplateProps {
  page: AboutPageConfig;
  site: SiteConfig;
}

export function AboutPageTemplate({ page, site }: AboutPageTemplateProps) {
  const partnerBadges = site.partnerBadges;
  const heroImage = page.hero.image ?? "/images/promo/promo-team.png";
  const heroAlt =
    page.hero.imageAlt ??
    "eCom Gliders Amazon specialists collaborating on account growth";
  const pullQuote =
    page.story.paragraphs[2] ??
    "We are a strategic partner invested in measurable outcomes for your brand.";
  const featuredTeam = page.team.members.slice(0, 2);
  const remainingTeam = page.team.members.slice(2);

  return (
    <>
      {/* 1. HERO — full-bleed ink under sticky header (no white gap) */}
      <section
        id="about-hero"
        aria-labelledby="about-hero-heading"
        className="relative -mt-[4.75rem] overflow-hidden bg-primary text-text-on-dark sm:-mt-[5.5rem] md:-mt-[6rem]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 top-1/4 h-72 w-72 rotate-12 border-2 border-accent/40"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-2 w-full bg-accent"
          aria-hidden="true"
        />

        {/* Clears floating header so the ink sits behind the nav pill */}
        <div className="container-page relative pb-10 pt-[5.5rem] sm:pb-14 sm:pt-[6.25rem] md:pt-[6.75rem] lg:pb-16">
          <AboutBreadcrumb tone="onDark" />

          <div className="mt-6 grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              {page.hero.eyebrow ? (
                <p className="inline-flex items-center bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  {page.hero.eyebrow}
                </p>
              ) : null}
              <h1
                id="about-hero-heading"
                className="mt-5 max-w-lg text-[clamp(2.5rem,5.8vw,4.5rem)] font-bold leading-[0.92] tracking-[-0.035em] text-text-on-dark"
              >
                {page.hero.title}
              </h1>
              <p className="mt-6 max-w-md text-lg font-medium leading-relaxed text-text-on-dark/85 sm:text-xl">
                {page.hero.subtitle}
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <PrimaryButton asChild variant="accent" size="lg">
                  <Link href={page.hero.primaryCta.href}>
                    {page.hero.primaryCta.label}
                  </Link>
                </PrimaryButton>
                {page.hero.secondaryCta ? (
                  <Link
                    href={page.hero.secondaryCta.href}
                    className="inline-flex min-h-11 items-center gap-2 text-small font-bold uppercase tracking-[0.06em] text-text-on-dark hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    {page.hero.secondaryCta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="relative lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden border-2 border-text-on-dark shadow-[10px_10px_0_0_#C6F135] sm:aspect-[5/3]">
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 640px"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-primary/35 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS — overlapping hard proof strip (infographic bar) */}
      <section
        id="about-stats"
        aria-labelledby="about-stats-heading"
        className="relative z-10 -mt-4 scroll-mt-24 sm:-mt-6"
      >
        <div className="container-page">
          <h2 id="about-stats-heading" className="sr-only">
            Key metrics
          </h2>
          <ul className="grid border-2 border-primary bg-primary shadow-[8px_8px_0_0_#C6F135] sm:grid-cols-2 lg:grid-cols-4">
            {page.stats.map((stat, index) => {
              const inner = (
                <div className="flex h-full flex-col justify-between gap-3 px-5 py-7 sm:px-6">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="text-[clamp(1.85rem,3.2vw,2.5rem)] font-bold leading-none tracking-tight text-text-on-dark">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-small font-semibold uppercase tracking-[0.08em] text-text-on-dark/70">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
              return (
                <li
                  key={`${stat.value}-${stat.label}`}
                  className={cn(
                    "border-t-2 border-text-on-dark/15 sm:border-t-0",
                    index > 0 && "lg:border-l-2 lg:border-text-on-dark/15",
                    index % 2 === 1 && "sm:border-l-2 sm:border-text-on-dark/15",
                  )}
                >
                  {stat.href ? (
                    <Link
                      href={stat.href}
                      className="block h-full transition-colors hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
                    >
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 3. STORY — editorial + pull-quote + vertical timeline rail */}
      <section
        id="about-story"
        aria-labelledby="about-story-heading"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">
                Our story
              </p>
              <h2
                id="about-story-heading"
                className="mt-3 max-w-xl text-[clamp(1.85rem,3.5vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.025em] text-text-primary"
              >
                {page.story.heading}
              </h2>
              <div className="mt-8 space-y-5">
                {page.story.paragraphs.slice(0, 2).map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="max-w-2xl text-lg font-medium leading-relaxed text-text-secondary"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <blockquote className="relative mt-10 border-2 border-primary bg-accent p-6 shadow-[6px_6px_0_0_#131311] sm:p-8">
                <Quote
                  className="absolute right-5 top-5 h-10 w-10 text-primary/20"
                  aria-hidden="true"
                />
                <p className="relative max-w-xl text-xl font-bold leading-snug tracking-tight text-primary sm:text-2xl">
                  {pullQuote}
                </p>
              </blockquote>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full border-2 border-primary bg-surface-muted p-6 sm:p-8">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">
                  {page.timeline.heading}
                </h3>
                <ol className="relative mt-8 space-y-0">
                  {page.timeline.items.map((item, index) => (
                    <li
                      key={`${item.year}-${item.title}`}
                      className="relative grid grid-cols-[4.5rem_1fr] gap-4 pb-10 last:pb-0"
                    >
                      {index < page.timeline.items.length - 1 ? (
                        <span
                          className="absolute left-[1.05rem] top-8 h-[calc(100%-1.5rem)] w-0.5 bg-primary/25"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative z-[1]">
                        <span className="inline-flex min-w-[3.5rem] items-center justify-center border-2 border-primary bg-primary px-2 py-1 font-mono text-small font-bold text-accent">
                          {item.year}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold leading-snug text-text-primary">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-body font-medium text-text-secondary">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUES — sticky copy + alternating lime/canvas principle cards */}
      <section
        id="about-values"
        aria-labelledby="about-values-heading"
        className="scroll-mt-24 border-y-2 border-primary bg-surface-muted py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:gap-12 xl:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">
                Operating principles
              </p>
              <h2
                id="about-values-heading"
                className="mt-3 max-w-md text-[clamp(1.85rem,3.2vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary"
              >
                {page.values.heading}
              </h2>
              <p className="mt-4 max-w-sm text-base font-medium leading-relaxed text-text-secondary">
                Four commitments that shape every account we manage.
              </p>

              <ul className="mt-6 flex flex-wrap items-center gap-3">
                {page.values.items.map((item, index) => {
                  const Icon = VALUE_ICONS[index] ?? Check;
                  return (
                    <li key={`value-icon-${item.title}`}>
                      <span
                        title={item.title}
                        aria-label={item.title}
                        className="inline-flex h-11 w-11 items-center justify-center bg-accent text-primary"
                      >
                        <Icon className="h-5 w-5 stroke-[2.25]" aria-hidden="true" />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {page.values.items.map((item, index) => {
                const punch = index % 2 === 0;
                const Icon = VALUE_ICONS[index] ?? Check;
                return (
                  <li key={item.title} className="flex min-h-0">
                    <article
                      className={cn(
                        "flex h-full w-full flex-col border-2 border-primary p-5 shadow-[4px_4px_0_0_#131311] sm:min-h-[200px] sm:p-6",
                        punch ? "bg-accent text-primary" : "bg-background text-primary",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex h-9 w-9 items-center justify-center",
                          punch ? "bg-primary text-text-on-dark" : "bg-accent text-primary",
                        )}
                        aria-hidden="true"
                      >
                        <Icon className="h-4 w-4 stroke-[2.5]" />
                      </span>
                      <h3 className="mt-5 text-lg font-bold leading-snug tracking-tight">
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-2.5 text-sm font-medium leading-relaxed",
                          punch ? "text-primary/80" : "text-text-secondary",
                        )}
                      >
                        {item.description}
                      </p>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. APPROACH — horizontal process flow / infographic */}
      <section
        id="about-approach"
        aria-labelledby="about-approach-heading"
        className="scroll-mt-24 bg-primary py-16 text-text-on-dark sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              Growth framework
            </p>
            <h2
              id="about-approach-heading"
              className="mt-3 text-[clamp(1.85rem,3.2vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-on-dark"
            >
              {page.approach.heading}
            </h2>
            {page.approach.subheading ? (
              <p className="mt-4 text-lg font-medium text-text-on-dark/80">
                {page.approach.subheading}
              </p>
            ) : null}
          </div>

          <ol className="mt-12 grid gap-0 border-2 border-text-on-dark/25 lg:grid-cols-4 lg:divide-x-2 lg:divide-text-on-dark/25">
            {page.approach.steps.map((step, index) => (
              <li
                key={step.number}
                className="relative flex flex-col border-b-2 border-text-on-dark/25 p-6 last:border-b-0 lg:border-b-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-3xl font-bold text-accent">
                    {step.number}
                  </span>
                  {index < page.approach.steps.length - 1 ? (
                    <ArrowRight
                      className="mt-1 hidden h-5 w-5 shrink-0 text-accent lg:block"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
                <h3 className="mt-6 text-xl font-bold text-text-on-dark">
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-body font-medium leading-relaxed text-text-on-dark/75">
                  {step.description}
                </p>
                {step.href && step.linkLabel ? (
                  <Link
                    href={step.href}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 text-small font-bold uppercase tracking-[0.06em] text-accent hover:text-text-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    {step.linkLabel}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                ) : null}
              </li>
            ))}
          </ol>

          {/* Flow connector — visual storytelling bar */}
          <div
            className="mt-8 hidden items-center gap-2 lg:flex"
            aria-hidden="true"
          >
            {page.approach.steps.map((step, index) => (
              <div key={`flow-${step.number}`} className="flex flex-1 items-center gap-2">
                <div className="h-2 flex-1 bg-accent" />
                {index < page.approach.steps.length - 1 ? (
                  <ArrowRight className="h-4 w-4 shrink-0 text-accent" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutMarketsSection markets={page.markets} />

      {/* 7. TEAM — asymmetric mosaic (2 featured + grid) */}
      <section
        id="about-team"
        aria-labelledby="about-team-heading"
        className="scroll-mt-24 border-y-2 border-primary bg-surface-muted py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">
                The people
              </p>
              <h2
                id="about-team-heading"
                className="mt-3 text-[clamp(1.85rem,3.2vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary"
              >
                {page.team.heading}
              </h2>
              {page.team.subheading ? (
                <p className="mt-3 text-base font-medium text-text-secondary">
                  {page.team.subheading}
                </p>
              ) : null}
            </div>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
            {featuredTeam.map((member, index) => (
              <li
                key={member.name}
                className={cn(
                  "lg:col-span-6",
                  index === 0 && "lg:row-span-1",
                )}
              >
                <article className="group flex h-full flex-col overflow-hidden border-2 border-primary bg-background shadow-[6px_6px_0_0_#131311] sm:flex-row">
                  <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-primary/5 sm:aspect-auto sm:w-[44%] sm:min-h-[280px]">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.imageAlt ?? `${member.name}, ${member.role}`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 280px"
                      />
                    ) : (
                      <div
                        className="flex h-full min-h-[220px] items-center justify-center bg-accent text-5xl font-bold text-primary"
                        aria-hidden="true"
                      >
                        {member.name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-end p-6 sm:p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
                      {member.role}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-text-primary">
                      {member.name}
                    </h3>
                    <p className="mt-3 text-body font-medium text-text-secondary">
                      {member.bio}
                    </p>
                  </div>
                </article>
              </li>
            ))}

            {remainingTeam.map((member) => (
              <li key={member.name} className="lg:col-span-3">
                <article className="group flex h-full flex-col overflow-hidden border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-primary/5">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.imageAlt ?? `${member.name}, ${member.role}`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div
                        className="flex h-full items-center justify-center bg-accent text-3xl font-bold text-primary"
                        aria-hidden="true"
                      >
                        {member.name.slice(0, 1)}
                      </div>
                    )}
                    <div
                      className="absolute inset-x-0 bottom-0 h-1 bg-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="text-lg font-bold text-text-primary">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                      {member.role}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">
                      {member.bio}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. OUTCOMES — giant metric posters, alternating rows */}
      <section
        id="about-outcomes"
        aria-labelledby="about-outcomes-heading"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">
                Proof
              </p>
              <h2
                id="about-outcomes-heading"
                className="mt-3 text-[clamp(1.85rem,3.2vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary"
              >
                {page.outcomes.heading}
              </h2>
              {page.outcomes.subheading ? (
                <p className="mt-3 text-base font-medium text-text-secondary">
                  {page.outcomes.subheading}
                </p>
              ) : null}
            </div>
            <Link
              href={page.outcomes.viewAll.href}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 border-2 border-primary bg-primary px-5 text-small font-bold uppercase tracking-[0.06em] text-text-on-dark shadow-[3px_3px_0_0_#C6F135] hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {page.outcomes.viewAll.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-12 space-y-5">
            {page.outcomes.items.map((item, index) => {
              const reverse = index % 2 === 1;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group grid overflow-hidden border-2 border-primary bg-background shadow-[6px_6px_0_0_#131311] transition-colors hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:grid-cols-12",
                    )}
                  >
                    <div
                      className={cn(
                        "flex flex-col justify-center border-primary bg-primary p-6 text-text-on-dark md:col-span-4 md:p-8",
                        reverse ? "md:order-2 md:border-l-2" : "md:border-r-2",
                      )}
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                        {item.client}
                      </p>
                      <p className="mt-4 text-[clamp(2.5rem,6vw,3.75rem)] font-bold leading-none tracking-tight">
                        {item.metric}
                      </p>
                      <p className="mt-2 text-small font-semibold uppercase tracking-[0.08em] text-text-on-dark/70">
                        {item.metricLabel}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "flex flex-col justify-center p-6 md:col-span-8 md:p-8",
                        reverse && "md:order-1",
                      )}
                    >
                      <p className="text-lg font-medium leading-relaxed text-text-secondary sm:text-xl">
                        {item.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-small font-bold uppercase tracking-[0.06em] text-primary group-hover:gap-3">
                        Read case study
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 9. CERTIFICATIONS — stamp / seal band */}
      <section
        id="about-certifications"
        aria-labelledby="about-certifications-heading"
        className="scroll-mt-24 bg-accent py-14 sm:py-16"
      >
        <div className="container-page">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center border-2 border-primary bg-primary text-accent shadow-[4px_4px_0_0_#131311]">
              <Check className="h-7 w-7 stroke-[2.5]" aria-hidden="true" />
            </div>
            <h2
              id="about-certifications-heading"
              className="mt-6 text-[clamp(1.5rem,2.5vw,2rem)] font-bold tracking-tight text-primary"
            >
              {page.certifications.heading}
            </h2>
            <p className="mt-3 max-w-lg text-base font-medium text-primary/80">
              {page.certifications.description}
            </p>
            {partnerBadges.length > 0 ? (
              <div className="mt-8">
                <PartnerBadgesRow
                  badges={partnerBadges}
                  surface="light"
                  align="center"
                  size="lg"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* 10. FAQ — numbered Q/A with large index (not cards) */}
      <section
        id="about-faq"
        aria-labelledby="about-faq-heading"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">
              FAQ
            </p>
            <h2
              id="about-faq-heading"
              className="mt-3 text-[clamp(1.85rem,3.2vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary"
            >
              {page.faq.heading}
            </h2>
          </div>

          <dl className="mt-12 divide-y-2 divide-primary border-y-2 border-primary">
            {page.faq.items.map((item, index) => (
              <div
                key={item.question}
                className="grid gap-4 py-8 sm:grid-cols-[4rem_1fr] sm:gap-8 lg:grid-cols-[5rem_minmax(0,1.1fr)_minmax(0,1fr)]"
              >
                <div
                  className="font-mono text-2xl font-bold text-accent sm:pt-1"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <dt className="text-xl font-bold leading-snug text-text-primary sm:col-start-2 lg:col-start-2">
                  {item.question}
                </dt>
                <dd className="text-base font-medium leading-relaxed text-text-secondary sm:col-start-2 lg:col-start-3 lg:row-start-1 lg:pt-1">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 11. CTA — joins footer ink (no white gap / no duplicate pre-footer) */}
      <section
        id="about-cta"
        aria-labelledby="about-cta-heading"
        className="scroll-mt-24 border-t-2 border-primary bg-primary pb-10 pt-16 text-text-on-dark sm:pb-12 sm:pt-20"
      >
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="mb-5 h-1.5 w-16 bg-accent" aria-hidden="true" />
              <h2
                id="about-cta-heading"
                className="max-w-xl text-[clamp(1.85rem,3.5vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.025em] text-text-on-dark"
              >
                {page.cta.heading}
              </h2>
              <p className="mt-4 max-w-lg text-lg text-text-on-dark/85">
                {page.cta.subheading}
              </p>
            </div>
            <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end">
              <PrimaryButton asChild variant="accent" size="lg">
                <Link href={page.cta.primaryCta.href}>
                  {page.cta.primaryCta.label}
                </Link>
              </PrimaryButton>
              <div className="flex flex-col gap-2 lg:items-end">
                <a
                  href={`tel:${site.phone.tel}`}
                  className="inline-flex min-h-11 items-center text-small font-bold uppercase tracking-[0.06em] text-text-on-dark underline-offset-4 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                  {site.phone.display}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center text-small font-medium text-text-on-dark/80 underline-offset-4 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
