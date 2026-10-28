import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type {
  AgencyPartnershipPageConfig,
  SiteConfig,
} from "@/domain/content/schemas";
import { PartnerApplicationForm } from "@/components/agency-partnership/partner-application-form";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";

const hardPanel =
  "rounded-[16px] border-2 border-primary bg-background text-primary shadow-[4px_4px_0_0_#131311]";

interface AgencyPartnershipTemplateProps {
  page: AgencyPartnershipPageConfig;
  site: SiteConfig;
}

export function AgencyPartnershipTemplate({
  page,
  site,
}: AgencyPartnershipTemplateProps) {
  const { hero, demand, lanes, complement, protection, cadence, fit, faq, application, close } =
    page;

  return (
    <>
      {/* HERO — ink field, audience lock, dual CTA */}
      <section
        id="agency-partnership-hero"
        aria-labelledby="agency-partnership-hero-heading"
        className="relative -mt-[4.75rem] overflow-hidden bg-primary text-text-on-dark sm:-mt-[5.5rem] md:-mt-[6rem]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-2 w-full bg-accent"
          aria-hidden="true"
        />

        <div className="container-page relative pb-14 pt-[5.5rem] sm:pb-16 sm:pt-[6.25rem] md:pt-[6.75rem] lg:pb-20">
          <nav aria-label="Breadcrumb" className="text-small text-text-on-dark/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-accent">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-text-on-dark">Agency Partnership</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="inline-flex bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                {hero.eyebrow}
              </p>
              <h1
                id="agency-partnership-hero-heading"
                className="mt-5 max-w-2xl text-[clamp(2.35rem,5.2vw,4rem)] font-bold leading-[0.95] tracking-[-0.035em] text-text-on-dark"
              >
                {hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-text-on-dark/85">
                {hero.subtitle}
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <PrimaryButton asChild variant="accent" size="lg">
                  <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
                </PrimaryButton>
                <Link
                  href={hero.secondaryCta.href}
                  className="inline-flex min-h-11 items-center gap-2 text-small font-bold uppercase tracking-[0.06em] text-text-on-dark hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
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
                      className="border border-text-on-dark/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-text-on-dark/80"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <aside className="lg:col-span-5">
              <div className="space-y-4">
                <div className="border-2 border-accent bg-accent p-5 text-primary shadow-[6px_6px_0_0_rgba(255,255,255,0.15)] sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.14em]">
                    For
                  </p>
                  <p className="mt-3 text-sm font-medium leading-relaxed">
                    {hero.forLine.replace(/^For:\s*/i, "")}
                  </p>
                </div>
                <div className="border-2 border-text-on-dark/40 bg-primary p-5 text-text-on-dark sm:p-6">
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

      {/* DEMAND SIGNAL */}
      <section
        id="agency-demand"
        aria-labelledby="agency-demand-heading"
        className="scroll-mt-24 border-b-2 border-primary py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
            {demand.eyebrow}
          </p>
          <h2
            id="agency-demand-heading"
            className="mt-3 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.03em] text-primary"
          >
            {demand.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-text-secondary">
            {demand.intro}
          </p>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {demand.signals.map((signal, index) => (
              <li key={signal.title} className={cn(hardPanel, "bg-[#F4F4F4] p-6")}>
                <span className="font-mono text-sm font-bold text-text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold leading-snug text-primary">
                  {signal.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-text-secondary">
                  {signal.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* THREE LANES */}
      <section
        id="partnership-lanes"
        aria-labelledby="partnership-lanes-heading"
        className="scroll-mt-24 bg-primary py-16 text-text-on-dark sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
            {lanes.eyebrow}
          </p>
          <h2
            id="partnership-lanes-heading"
            className="mt-3 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.03em] text-text-on-dark"
          >
            {lanes.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-text-on-dark/80">
            {lanes.intro}
          </p>
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {lanes.items.map((lane) => (
              <li
                key={lane.id}
                className="flex h-full flex-col border-2 border-text-on-dark/25 bg-primary p-6 shadow-[4px_4px_0_0_#C6F135]"
              >
                <h3 className="text-xl font-bold text-accent">{lane.title}</h3>
                <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-text-on-dark/85">
                  {lane.summary}
                </p>
                <p className="mt-5 border-t border-text-on-dark/20 pt-4 text-sm font-semibold leading-relaxed text-text-on-dark">
                  {lane.bestWhen}
                </p>
                <p className="mt-2 text-xs font-medium leading-relaxed text-text-on-dark/65">
                  {lane.brandOnWork}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COMPLEMENT MAP */}
      <section
        id="complement-map"
        aria-labelledby="complement-map-heading"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
            {complement.eyebrow}
          </p>
          <h2
            id="complement-map-heading"
            className="mt-3 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.03em] text-primary"
          >
            {complement.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-text-secondary">
            {complement.intro}
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className={cn(hardPanel, "p-6 sm:p-7")}>
              <h3 className="text-lg font-bold text-primary">
                {complement.yourPractice.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {complement.yourPractice.items.map((item) => (
                  <li
                    key={item}
                    className="border-l-4 border-accent pl-3 text-sm font-medium leading-relaxed text-text-secondary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={cn(hardPanel, "bg-[#F4F4F4] p-6 sm:p-7")}>
              <h3 className="text-lg font-bold text-primary">
                {complement.ourLanes.heading}
              </h3>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {complement.ourLanes.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-10 items-center text-sm font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 border-2 border-primary bg-primary p-6 text-text-on-dark sm:p-7">
            <h3 className="text-lg font-bold text-accent">
              {complement.weDoNot.heading}
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {complement.weDoNot.items.map((item) => (
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
      </section>

      {/* CLIENT PROTECTION */}
      <section
        id="client-protection"
        aria-labelledby="client-protection-heading"
        className="scroll-mt-24 border-y-2 border-primary bg-accent py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary/70">
            {protection.eyebrow}
          </p>
          <h2
            id="client-protection-heading"
            className="mt-3 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.03em] text-primary"
          >
            {protection.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-primary/85">
            {protection.intro}
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {protection.items.map((item) => (
              <li
                key={item.title}
                className="border-2 border-primary bg-background p-5 shadow-[4px_4px_0_0_#131311] sm:p-6"
              >
                <h3 className="text-base font-bold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OPERATING CADENCE */}
      <section
        id="operating-cadence"
        aria-labelledby="operating-cadence-heading"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
            {cadence.eyebrow}
          </p>
          <h2
            id="operating-cadence-heading"
            className="mt-3 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.03em] text-primary"
          >
            {cadence.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-text-secondary">
            {cadence.intro}
          </p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {cadence.steps.map((step) => (
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

      {/* FIT CRITERIA */}
      <section
        id="fit-criteria"
        aria-labelledby="fit-criteria-heading"
        className="scroll-mt-24 border-y-2 border-primary bg-[#F4F4F4] py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
            {fit.eyebrow}
          </p>
          <h2
            id="fit-criteria-heading"
            className="mt-3 max-w-3xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.03em] text-primary"
          >
            {fit.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-text-secondary">
            {fit.intro}
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className={cn(hardPanel, "p-6 sm:p-7")}>
              <h3 className="text-lg font-bold text-primary">{fit.approve.heading}</h3>
              <ul className="mt-5 space-y-3">
                {fit.approve.items.map((item) => (
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
              <h3 className="text-lg font-bold text-accent">{fit.decline.heading}</h3>
              <ul className="mt-5 space-y-3">
                {fit.decline.items.map((item) => (
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
        id="partner-faq"
        aria-labelledby="partner-faq-heading"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page max-w-3xl">
          <h2
            id="partner-faq-heading"
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
        aria-labelledby="partner-application-heading"
        className="scroll-mt-24 border-t-2 border-primary bg-primary py-16 text-text-on-dark sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                {application.eyebrow}
              </p>
              <h2
                id="partner-application-heading"
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
                <PartnerApplicationForm application={application} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section
        id="partner-close"
        aria-labelledby="partner-close-heading"
        className="scroll-mt-24 border-t-2 border-primary bg-accent py-12 sm:py-14"
      >
        <div className="container-page">
          <h2
            id="partner-close-heading"
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
        </div>
      </section>
    </>
  );
}
