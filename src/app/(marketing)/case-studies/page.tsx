import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudiesGrid } from "@/components/case-studies/case-studies-grid";
import { CaseStudyFreeAuditCta } from "@/components/case-studies/case-study-free-audit-cta";
import { caseStudyHardPanel } from "@/components/case-studies/case-study-hard-panel";
import { SectionShell } from "@/components/sections/section-shell";
import { PrimaryButton } from "@/components/ui/primary-button";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildCaseStudiesIndexJsonLd } from "@/lib/seo/case-studies-json-ld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const repository = getContentRepository();
  const index = await repository.getCaseStudiesIndex();

  if (!index) {
    return {
      title: "Case studies | eCom Gliders",
    };
  }

  return pageSeoToMetadata(index.seo);
}

export default async function CaseStudiesIndexPage() {
  const repository = getContentRepository();
  const [index, studies, filters, site] = await Promise.all([
    repository.getCaseStudiesIndex(),
    repository.getCaseStudies(),
    repository.getCaseStudiesFilters(),
    repository.getSiteConfig(),
  ]);

  if (!index) {
    notFound();
  }

  const featured =
    studies.find((study) => study.featured) ??
    studies.find((study) => study.slug === "case-study-9") ??
    null;
  const trustStudies = studies.slice(0, 8);
  const jsonLd = buildCaseStudiesIndexJsonLd({ index, studies, site });
  const featuredScene = featured?.atmosphere || featured?.featuredImage;
  const proofStats = index.proofStats ?? [];

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main id="main-content">
        <SectionShell
          id="case-studies-hero"
          ariaLabelledBy="case-studies-hero-heading"
          className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
        >
          {featuredScene ? (
            <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
              <Image
                src={featuredScene}
                alt=""
                fill
                className="object-cover opacity-[0.14]"
                sizes="100vw"
                quality={70}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
            </div>
          ) : null}
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">
              Client results
            </p>
            <h1
              id="case-studies-hero-heading"
              className="mt-3 text-[2.25rem] font-black leading-[1.05] tracking-[-0.04em] text-primary sm:text-[3rem] lg:text-[3.75rem]"
            >
              {index.hero.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {index.hero.subtitle}
            </p>
            {proofStats.length > 0 ? (
              <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
                {proofStats.map((stat) => (
                  <li
                    key={stat.label}
                    className={cn(caseStudyHardPanel, "bg-[#F4F4F4] px-3 py-4 text-center")}
                  >
                    <p className="text-xl font-black tracking-tight text-primary sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                      {stat.label}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </SectionShell>

        {index.trustHeading ? (
          <SectionShell
            id="case-studies-trust"
            tone="muted"
            ariaLabelledBy="case-studies-trust-heading"
            className="py-10 sm:py-12"
          >
            <p
              id="case-studies-trust-heading"
              className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary"
            >
              {index.trustHeading}
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
              {trustStudies.map((study) => {
                const scene = study.atmosphere || study.featuredImage;
                return (
                  <li key={study.slug}>
                    <Link
                      href={study.href}
                      className={cn(
                        caseStudyHardPanel,
                        "group relative flex h-28 overflow-hidden bg-primary transition-transform hover:-translate-y-0.5 sm:h-32",
                      )}
                    >
                      {scene ? (
                        <Image
                          src={scene}
                          alt=""
                          fill
                          className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          quality={75}
                        />
                      ) : null}
                      <span className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                      <span className="relative z-10 mt-auto flex w-full items-center gap-2 p-3">
                        {study.featuredImage ? (
                          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[4px] border-2 border-primary bg-background shadow-[2px_2px_0_0_#131311]">
                            <Image
                              src={study.featuredImage}
                              alt=""
                              fill
                              className="object-contain p-0.5"
                              sizes="36px"
                              quality={75}
                            />
                          </span>
                        ) : null}
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-black text-accent">
                            {study.metric}
                          </span>
                          <span className="block truncate text-[11px] font-bold text-text-on-dark">
                            {study.clientDisplayName ?? study.client}
                          </span>
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SectionShell>
        ) : null}

        {featured ? (
          <SectionShell
            id="case-studies-featured"
            ariaLabelledBy="case-studies-featured-heading"
            className="py-12 sm:py-16"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">
              {index.featuredHeading ?? "Featured result"}
            </p>
            <article
              className={cn(
                caseStudyHardPanel,
                "mt-4 grid overflow-hidden bg-[#F4F4F4] lg:grid-cols-2",
              )}
            >
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">
                  {featured.category}
                  {featured.duration ? ` · ${featured.duration}` : null}
                </p>
                <h2
                  id="case-studies-featured-heading"
                  className="mt-3 border-l-[3px] border-accent pl-3 text-5xl font-black tracking-tight text-primary sm:text-6xl"
                >
                  {featured.metric}
                </h2>
                <p className="mt-2 text-xl font-bold text-primary sm:text-2xl">
                  {featured.metricLabel}
                </p>
                <p className="mt-4 text-h4">{featured.clientDisplayName ?? featured.client}</p>
                <p className="mt-4 max-w-lg text-body text-text-secondary">{featured.excerpt}</p>
                {featured.results?.metrics?.length ? (
                  <ul className="mt-6 grid grid-cols-2 gap-3">
                    {featured.results.metrics.slice(0, 4).map((metric) => (
                      <li
                        key={`${metric.label}-${metric.value}`}
                        className="rounded-[10px] border-2 border-primary bg-background px-3 py-3"
                      >
                        <p className="text-sm font-black text-primary">{metric.value}</p>
                        <p className="mt-0.5 text-[11px] text-text-secondary">{metric.label}</p>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <PrimaryButton asChild variant="accent" className="mt-8 w-fit">
                  <Link href={featured.href}>Read featured case study</Link>
                </PrimaryButton>
              </div>
              {featuredScene ? (
                <div className="relative min-h-[18rem] border-t-2 border-primary lg:min-h-full lg:border-l-2 lg:border-t-0">
                  <Image
                    src={featuredScene}
                    alt={
                      featured.atmosphereAlt ??
                      featured.featuredImageAlt ??
                      `${featured.client} featured case study`
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={85}
                    priority
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  {featured.featuredImage ? (
                    <div className="absolute left-4 top-4 h-14 w-14 overflow-hidden rounded-[6px] border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]">
                      <Image
                        src={featured.featuredImage}
                        alt={featured.featuredImageAlt ?? featured.client}
                        fill
                        className="object-contain p-1.5"
                        sizes="56px"
                        quality={80}
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </article>
          </SectionShell>
        ) : null}

        <SectionShell id="case-studies-grid" tone="muted" className="py-12 sm:py-16">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-h2">All case studies</h2>
            <p className="mt-2 text-body text-text-secondary">
              Filter by service. Every card shows a hard outcome, category, and engagement window.
            </p>
          </div>
          <CaseStudiesGrid studies={studies} filters={filters} />
        </SectionShell>

        {index.proofHeading ? (
          <SectionShell id="case-studies-proof" ariaLabelledBy="case-studies-proof-heading">
            <div className={cn(caseStudyHardPanel, "overflow-hidden bg-primary text-text-on-dark")}>
              <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-12">
                <div>
                  <h2 id="case-studies-proof-heading" className="text-h2 text-text-on-dark">
                    {index.proofHeading}
                  </h2>
                  {index.proofSubheading ? (
                    <p className="mt-4 text-body text-text-on-dark/80">{index.proofSubheading}</p>
                  ) : null}
                </div>
                {proofStats.length > 0 ? (
                  <ul className="grid grid-cols-2 gap-3">
                    {proofStats.map((stat) => (
                      <li
                        key={`proof-${stat.label}`}
                        className="rounded-[12px] border-2 border-accent/40 bg-primary px-4 py-4"
                      >
                        <p className="text-2xl font-black text-accent">{stat.value}</p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-text-on-dark/75">
                          {stat.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </SectionShell>
        ) : null}

        <CaseStudyFreeAuditCta heading={index.cta?.heading} body={index.cta?.body} />
      </main>
    </>
  );
}
