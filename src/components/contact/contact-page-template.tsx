import Link from "next/link";
import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import type { ContactPageConfig, SiteConfig } from "@/domain/content/schemas";
import { AboutBreadcrumb } from "@/components/about/about-breadcrumb";
import { ContactIntakeWizard } from "@/components/contact/contact-intake-wizard";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { submitContactForm } from "@/app/(marketing)/contact/actions";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";

interface ContactPageTemplateProps {
  page: ContactPageConfig;
  site: SiteConfig;
}

export function ContactPageTemplate({ page, site }: ContactPageTemplateProps) {
  return (
    <>
      {/* 1. HERO — full-bleed ink under header */}
      <section
        id="contact-hero"
        aria-labelledby="contact-hero-heading"
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
          className="pointer-events-none absolute -right-10 top-1/3 h-56 w-56 rotate-12 border-2 border-accent/35"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-full bg-accent"
          aria-hidden="true"
        />
        <div className="container-page relative pb-16 pt-[5.5rem] sm:pb-20 sm:pt-[6.25rem] md:pt-[6.75rem]">
          <AboutBreadcrumb label="Contact" tone="onDark" />
          <div className="mt-8 grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <h1
                id="contact-hero-heading"
                className="max-w-3xl text-[clamp(2.4rem,5.5vw,4rem)] font-bold leading-[0.94] tracking-[-0.035em] text-text-on-dark"
              >
                {page.hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-text-on-dark/85">
                {page.hero.subtitle}
              </p>
            </div>
            <div className="border-l-2 border-accent/50 pl-5 lg:col-span-4 lg:pb-1">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                Hours
              </p>
              <p className="mt-2 text-sm font-semibold text-text-on-dark">
                {page.hero.hoursLine}
              </p>
              <p className="mt-1 text-sm font-medium text-text-on-dark/70">
                {page.hero.slaLine}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PATHS — stacked intent rows (menu), not equal cards */}
      <section
        id="contact-paths"
        aria-labelledby="contact-paths-heading"
        className="relative z-10 -mt-6 scroll-mt-24 sm:-mt-8"
      >
        <div className="container-page">
          <div className="border-2 border-primary bg-background shadow-[8px_8px_0_0_#C6F135]">
            <div className="border-b-2 border-primary px-5 py-4 sm:px-6">
              <h2
                id="contact-paths-heading"
                className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary"
              >
                Choose how to reach us
              </h2>
            </div>
            <ul>
              {page.paths.map((path, index) => {
                const isRoute =
                  path.href.startsWith("/") && !path.href.startsWith("/#");
                const className = cn(
                  "group grid gap-3 px-5 py-5 transition-colors sm:grid-cols-[3.25rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6 sm:px-6 sm:py-6",
                  index < page.paths.length - 1 && "border-b-2 border-primary",
                  "hover:bg-accent/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
                );
                const inner = (
                  <>
                    <span className="font-mono text-sm font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-lg font-bold leading-snug text-text-primary sm:text-xl">
                        {path.label}
                      </p>
                      <p className="mt-1 max-w-xl text-sm font-medium leading-relaxed text-text-secondary">
                        {path.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-small font-bold uppercase tracking-[0.06em] text-primary group-hover:gap-3 sm:justify-self-end">
                      {isRoute ? "Open" : "Jump"}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </>
                );
                return (
                  <li key={path.id}>
                    {isRoute ? (
                      <Link href={path.href} className={className}>
                        {inner}
                      </Link>
                    ) : (
                      <a href={path.href} className={className}>
                        {inner}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. MESSAGE — editorial split: open form + NAP list (no twin boxes) */}
      <section
        id="contact-message"
        aria-labelledby="contact-message-heading"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">
                General inquiry
              </p>
              <h2
                id="contact-message-heading"
                className="mt-3 text-[clamp(1.75rem,3vw,2.35rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary"
              >
                {page.form.heading}
              </h2>
              <p className="mt-3 max-w-lg text-base font-medium text-text-secondary">
                Quick questions only. For a prep call, use the strategy intake
                below.
              </p>
              <div className="mt-8 max-w-xl">
                <ConfigurableForm
                  formId="contact-form"
                  fields={page.form.fields}
                  submitLabel={page.form.submitLabel}
                  consentLabel={page.form.consentLabel}
                  action={submitContactForm}
                  initialState={initialFormActionState}
                />
              </div>
            </div>

            <aside
              className="lg:col-span-5 lg:sticky lg:top-28"
              aria-labelledby="contact-details-heading"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">
                Direct channels
              </p>
              <h2
                id="contact-details-heading"
                className="mt-3 text-[clamp(1.5rem,2.5vw,1.85rem)] font-bold tracking-tight text-text-primary"
              >
                {page.contactDetails.heading}
              </h2>

              <ul className="mt-8 space-y-0 border-t-2 border-primary">
                <li className="flex gap-4 border-b-2 border-primary py-5">
                  <Phone
                    className="mt-1 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                      {page.contactDetails.phoneLabel}
                    </p>
                    <a
                      href={`tel:${site.phone.tel}`}
                      className="mt-1 inline-flex min-h-11 items-center text-xl font-bold text-text-primary hover:text-link-hover"
                    >
                      {site.phone.display}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4 border-b-2 border-primary py-5">
                  <Mail
                    className="mt-1 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                      {page.contactDetails.emailLabel}
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-1 inline-flex min-h-11 items-center text-base font-semibold text-text-primary hover:underline"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4 border-b-2 border-primary py-5">
                  <Clock3
                    className="mt-1 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                      {page.contactDetails.hoursLabel}
                    </p>
                    <p className="mt-1 text-base font-medium text-text-primary">
                      {page.contactDetails.hoursValue}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4 border-b-2 border-primary py-5">
                  <MapPin
                    className="mt-1 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                      {page.contactDetails.addressLabel}
                    </p>
                    <p className="mt-1 text-base font-medium text-text-primary">
                      {site.address.formatted}
                    </p>
                    <a
                      href={page.contactDetails.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-h-11 items-center text-small font-bold uppercase tracking-[0.06em] text-primary underline-offset-4 hover:underline"
                    >
                      {page.contactDetails.mapsLabel}
                    </a>
                  </div>
                </li>
              </ul>

              {page.contactDetails.roleEmails.length > 0 ? (
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
                    Direct emails
                  </p>
                  <ul className="mt-3 space-y-2">
                    {page.contactDetails.roleEmails.map((role) => (
                      <li
                        key={role.email}
                        className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5"
                      >
                        <span className="text-sm font-medium text-text-secondary">
                          {role.label}
                        </span>
                        <a
                          href={`mailto:${role.email}`}
                          className="text-sm font-bold text-text-primary hover:underline"
                        >
                          {role.email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                {Object.entries(site.social).map(([network, href]) =>
                  href ? (
                    <li key={network}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center text-small font-bold uppercase tracking-[0.08em] text-text-secondary underline-offset-4 hover:text-primary hover:underline"
                      >
                        {network}
                      </a>
                    </li>
                  ) : null,
                )}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 4. INTAKE — full-bleed lime + sticky intro / wizard */}
      <section
        id="contact-intake"
        aria-labelledby="contact-intake-heading"
        className="scroll-mt-24 border-y-2 border-primary bg-accent py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary/70">
                Strategy intake
              </p>
              <h2
                id="contact-intake-heading"
                className="mt-3 text-[clamp(1.85rem,3.2vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-primary"
              >
                {page.intakeWizard.heading}
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-primary/80">
                {page.intakeWizard.subheading}
              </p>
              <ol className="mt-8 space-y-3 border-l-2 border-primary/25 pl-4">
                {[
                  "Details",
                  "Services",
                  "Brand",
                  "Revenue",
                  "Phone",
                ].map((label, index) => (
                  <li
                    key={label}
                    className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-primary/65"
                  >
                    {String(index + 1).padStart(2, "0")} {label}
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-8">
              <ContactIntakeWizard wizard={page.intakeWizard} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS — vertical timeline on ink (not another 3-col box) */}
      <section
        id="contact-process"
        aria-labelledby="contact-process-heading"
        className="scroll-mt-24 bg-primary py-16 text-text-on-dark sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                After you submit
              </p>
              <h2
                id="contact-process-heading"
                className="mt-3 max-w-sm text-[clamp(1.75rem,3vw,2.35rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-on-dark"
              >
                {page.process.heading}
              </h2>
            </div>

            <ol className="relative lg:col-span-8">
              {page.process.steps.map((step, index) => (
                <li
                  key={step.number}
                  className="relative grid grid-cols-[3.5rem_1fr] gap-5 pb-10 last:pb-0 sm:grid-cols-[4.5rem_1fr] sm:gap-8"
                >
                  {index < page.process.steps.length - 1 ? (
                    <span
                      className="absolute left-[1.05rem] top-10 h-[calc(100%-1.5rem)] w-0.5 bg-accent/40 sm:left-[1.35rem]"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative z-[1]">
                    <span className="inline-flex h-9 w-9 items-center justify-center border-2 border-accent bg-primary font-mono text-sm font-bold text-accent sm:h-11 sm:w-11 sm:text-base">
                      {step.number}
                    </span>
                  </div>
                  <div className="min-w-0 pt-0.5 sm:pt-1.5">
                    <h3 className="text-xl font-bold text-text-on-dark sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-body font-medium leading-relaxed text-text-on-dark/75">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 6. FAQ — Q | A columns, numbered rail */}
      <section
        id="contact-faq"
        aria-labelledby="contact-faq-heading"
        className="scroll-mt-24 border-b-2 border-primary bg-surface-muted py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">
              FAQ
            </p>
            <h2
              id="contact-faq-heading"
              className="mt-3 text-[clamp(1.75rem,3vw,2.35rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary"
            >
              {page.faq.heading}
            </h2>
          </div>
          <dl className="mt-12 divide-y-2 divide-primary border-y-2 border-primary">
            {page.faq.items.map((item, index) => (
              <div
                key={item.question}
                className="grid gap-3 py-8 sm:grid-cols-[3.5rem_1fr] sm:gap-8 lg:grid-cols-[4.5rem_minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start"
              >
                <div
                  className="font-mono text-xl font-bold text-primary"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <dt className="text-lg font-bold leading-snug text-text-primary sm:col-start-2">
                  {item.question}
                </dt>
                <dd className="text-base font-medium leading-relaxed text-text-secondary sm:col-start-2 lg:col-start-3 lg:row-start-1">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 7. LINKS — compact text strip */}
      <section
        id="contact-links"
        aria-labelledby="contact-links-heading"
        className="scroll-mt-24 py-10 sm:py-12"
      >
        <div className="container-page flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="contact-links-heading"
            className="text-base font-bold tracking-tight text-text-primary"
          >
            {page.internalLinks.heading}
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {page.internalLinks.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center gap-1.5 text-small font-bold uppercase tracking-[0.06em] text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {link.label}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
