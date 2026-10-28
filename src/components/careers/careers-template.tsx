import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CareersPageConfig, SiteConfig } from "@/domain/content/schemas";
import { CareerApplicationForm } from "@/components/careers/career-application-form";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";

const hardPanel =
  "rounded-[16px] border-2 border-primary bg-background text-primary shadow-[4px_4px_0_0_#131311]";

interface CareersTemplateProps {
  page: CareersPageConfig;
  site: SiteConfig;
}

export function CareersTemplate({ page, site }: CareersTemplateProps) {
  const {
    hero,
    bench,
    openRoles,
    roles,
    process,
    fit,
    faq,
    application,
    close,
  } = page;

  return (
    <>
      {/* HERO — lime field (distinct from partnership ink) */}
      <section
        id="careers-hero"
        aria-labelledby="careers-hero-heading"
        className="relative -mt-[4.75rem] overflow-hidden border-b-2 border-primary bg-accent sm:-mt-[5.5rem] md:-mt-[6rem]"
      >
        <div
          className="pointer-events-none absolute -right-10 top-1/4 hidden h-48 w-48 rotate-12 border-2 border-primary/20 lg:block"
          aria-hidden="true"
        />
        <div className="container-page relative pb-14 pt-[5.5rem] sm:pb-16 sm:pt-[6.25rem] md:pt-[6.75rem] lg:pb-20">
          <nav aria-label="Breadcrumb" className="text-small text-primary/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-primary">Careers</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="inline-flex border-2 border-primary bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent">
                {hero.eyebrow}
              </p>
              <h1
                id="careers-hero-heading"
                className="mt-5 max-w-2xl text-[clamp(2.35rem,5.2vw,4rem)] font-bold leading-[0.95] tracking-[-0.035em] text-primary"
              >
                {hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-primary/85">
                {hero.subtitle}
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <PrimaryButton asChild variant="primary" size="lg">
                  <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
                </PrimaryButton>
                <Link
                  href={hero.secondaryCta.href}
                  className="inline-flex min-h-11 items-center gap-2 text-small font-bold uppercase tracking-[0.06em] text-primary hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {hero.secondaryCta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              {hero.trustChips.length > 0 ? (
                <ul className="mt-8 flex flex-wrap gap-2">
                  {hero.trustChips.map((chip) => (
                    <li
                      key={chip}
                      className="border-2 border-primary bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-primary"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <aside className="lg:col-span-5">
              <div className="space-y-4">
                <div className="border-2 border-primary bg-background p-5 text-primary shadow-[6px_6px_0_0_#131311] sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.14em]">
                    For
                  </p>
                  <p className="mt-3 text-sm font-medium leading-relaxed">
                    {hero.forLine.replace(/^For:\s*/i, "")}
                  </p>
                </div>
                <div className="border-2 border-primary bg-primary p-5 text-text-on-dark sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                    Not for
                  </p>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-text-on-dark/85">
                    {hero.notForLine.replace(/^Not for:\s*/i, "")}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* BENCH */}
      <section
        id="how-the-bench-works"
        aria-labelledby="bench-heading"
        className="scroll-mt-24 border-b-2 border-primary py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
            {bench.eyebrow}
          </p>
          <h2
            id="bench-heading"
            className="mt-3 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.03em] text-primary"
          >
            {bench.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-text-secondary">
            {bench.intro}
          </p>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {bench.items.map((item, index) => (
              <li key={item.title} className={cn(hardPanel, "bg-[#F4F4F4] p-6")}>
                <span className="font-mono text-sm font-bold text-text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold leading-snug text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section
        id={openRoles.id}
        aria-labelledby="open-roles-heading"
        className="scroll-mt-24 bg-primary py-16 text-text-on-dark sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
            {openRoles.eyebrow}
          </p>
          <h2
            id="open-roles-heading"
            className="mt-3 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.03em] text-text-on-dark"
          >
            {openRoles.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-text-on-dark/80">
            {openRoles.intro}
          </p>
          <ul className="mt-10 grid gap-5 lg:grid-cols-2">
            {roles.map((role) => (
              <li
                key={role.id}
                className="flex h-full flex-col border-2 border-accent bg-primary p-6 shadow-[4px_4px_0_0_#C6F135] sm:p-7"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border border-accent/60 px-2 py-1 text-xs font-bold uppercase tracking-[0.1em] text-accent">
                    {role.employmentType}
                  </span>
                  <span className="text-xs font-medium text-text-on-dark/65">
                    {role.locationLine}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-accent">{role.title}</h3>
                <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-text-on-dark/85">
                  {role.summary}
                </p>
                <ul className="mt-5 space-y-2 border-t border-text-on-dark/20 pt-4">
                  {role.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="text-sm font-medium leading-relaxed text-text-on-dark/80"
                    >
                      {outcome}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href={`#${role.slug}`}
                    className="inline-flex min-h-11 items-center text-small font-bold uppercase tracking-[0.06em] text-accent hover:text-text-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    View role details
                  </Link>
                  <Link
                    href={`#${application.id}`}
                    className="inline-flex min-h-11 items-center gap-2 border-2 border-accent bg-accent px-4 text-small font-bold uppercase tracking-[0.06em] text-primary shadow-[3px_3px_0_0_#fff] hover:translate-x-px hover:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Apply
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ROLE CRAFT */}
      <section
        id="role-craft"
        aria-labelledby="role-craft-heading"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <h2
            id="role-craft-heading"
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight tracking-[-0.03em] text-primary"
          >
            Role craft
          </h2>
          <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-text-secondary">
            Full scope for each open seat. Compensation is discussed after a fit conversation—not published on this page.
          </p>

          <div className="mt-10 space-y-10">
            {roles.map((role) => (
              <article
                key={role.id}
                id={role.slug}
                className={cn(hardPanel, "scroll-mt-28 p-6 sm:p-8")}
              >
                <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-primary pb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
                      {role.employmentType} · {role.locationLine}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">
                      {role.title}
                    </h3>
                  </div>
                  <PrimaryButton asChild variant="accent" size="default">
                    <Link href={`#${application.id}`}>Apply for this role</Link>
                  </PrimaryButton>
                </div>

                <p className="mt-6 max-w-3xl text-base font-medium leading-relaxed text-text-secondary">
                  {role.about}
                </p>

                <div className="mt-8 grid gap-8 lg:grid-cols-3">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-[0.08em] text-primary">
                      Responsibilities
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {role.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="border-l-4 border-accent pl-3 text-sm font-medium leading-relaxed text-text-secondary"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-[0.08em] text-primary">
                      Must-haves
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {role.mustHaves.map((item) => (
                        <li
                          key={item}
                          className="text-sm font-medium leading-relaxed text-text-secondary"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-[0.08em] text-primary">
                      Nice-to-haves
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {role.niceToHaves.map((item) => (
                        <li
                          key={item}
                          className="text-sm font-medium leading-relaxed text-text-secondary"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section
        id="hiring-process"
        aria-labelledby="hiring-process-heading"
        className="scroll-mt-24 border-y-2 border-primary bg-[#F4F4F4] py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
            {process.eyebrow}
          </p>
          <h2
            id="hiring-process-heading"
            className="mt-3 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.03em] text-primary"
          >
            {process.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-text-secondary">
            {process.intro}
          </p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step) => (
              <li key={step.number} className={cn(hardPanel, "p-5")}>
                <span className="font-mono text-lg font-bold text-primary">
                  {step.number}
                </span>
                <h3 className="mt-2 text-base font-bold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FIT */}
      <section
        id="fit-filter"
        aria-labelledby="fit-filter-heading"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
            {fit.eyebrow}
          </p>
          <h2
            id="fit-filter-heading"
            className="mt-3 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.03em] text-primary"
          >
            {fit.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-text-secondary">
            {fit.intro}
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className={cn(hardPanel, "p-6 sm:p-7")}>
              <h3 className="text-lg font-bold text-primary">{fit.hire.heading}</h3>
              <ul className="mt-5 space-y-3">
                {fit.hire.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm font-medium leading-relaxed text-text-secondary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-2 border-primary bg-primary p-6 text-text-on-dark shadow-[4px_4px_0_0_#C6F135] sm:p-7">
              <h3 className="text-lg font-bold text-accent">{fit.pass.heading}</h3>
              <ul className="mt-5 space-y-3">
                {fit.pass.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm font-medium leading-relaxed text-text-on-dark/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="careers-faq"
        aria-labelledby="careers-faq-heading"
        className="scroll-mt-24 border-t-2 border-primary py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page max-w-3xl">
          <h2
            id="careers-faq-heading"
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight tracking-[-0.03em] text-primary"
          >
            {faq.heading}
          </h2>
          <div className="mt-8">
            <FaqAccordion items={faq.items} variant="lime" />
          </div>
        </div>
      </section>

      {/* APPLICATION */}
      <section
        id={application.id}
        aria-labelledby="career-application-heading"
        className="scroll-mt-24 border-t-2 border-primary bg-primary py-16 text-text-on-dark sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                {application.eyebrow}
              </p>
              <h2
                id="career-application-heading"
                className="mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-tight tracking-[-0.03em] text-text-on-dark"
              >
                {application.heading}
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-text-on-dark/80">
                {application.intro}
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="border-2 border-accent bg-background p-5 text-primary shadow-[8px_8px_0_0_#C6F135] sm:p-8">
                <CareerApplicationForm application={application} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section
        id="careers-close"
        aria-labelledby="careers-close-heading"
        className="scroll-mt-24 border-t-2 border-primary bg-accent py-12 sm:py-14"
      >
        <div className="container-page">
          <h2
            id="careers-close-heading"
            className="text-2xl font-bold tracking-[-0.02em] text-primary sm:text-3xl"
          >
            {close.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-primary/85">
            {close.body}
          </p>
          <p className="mt-5 text-sm font-semibold text-primary">
            {close.emailLabel}{" "}
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {site.email}
            </a>
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/agency-partnership/"
              className="text-sm font-bold uppercase tracking-[0.06em] text-primary underline-offset-2 hover:underline"
            >
              Agency Partnership
            </Link>
            <Link
              href="/free-audit/"
              className="text-sm font-bold uppercase tracking-[0.06em] text-primary underline-offset-2 hover:underline"
            >
              Free Audit
            </Link>
            <Link
              href="/contact/"
              className="text-sm font-bold uppercase tracking-[0.06em] text-primary underline-offset-2 hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
