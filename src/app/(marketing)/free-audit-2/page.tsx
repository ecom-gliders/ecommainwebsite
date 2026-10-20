import type { Metadata } from "next";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import { Card, CardContent } from "@/components/ui/card";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildFreeAuditPageJsonLd } from "@/lib/seo/free-audit-json-ld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { submitAuditForm } from "./actions";

export async function generateMetadata(): Promise<Metadata> {
  const repository = getContentRepository();
  const page = await repository.getFreeAuditPage();
  return pageSeoToMetadata(page.seo);
}

export default async function FreeAuditPage() {
  const repository = getContentRepository();
  const [page, site] = await Promise.all([
    repository.getFreeAuditPage(),
    repository.getSiteConfig(),
  ]);

  const jsonLd = buildFreeAuditPageJsonLd({ page, site });

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main id="main-content">
        <SectionShell id="audit-hero" ariaLabelledBy="audit-hero-heading">
          <div className="mx-auto max-w-3xl text-center">
            <h1 id="audit-hero-heading" className="text-h1">
              {page.hero.title}
            </h1>
            <p className="mt-4 text-body text-text-secondary">{page.hero.subtitle}</p>
          </div>
        </SectionShell>

        <SectionShell id="audit-benefits" tone="muted" ariaLabelledBy="audit-benefits-heading">
          <SectionHeading heading={page.benefits.heading} headingId="audit-benefits-heading" />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {page.benefits.items.map((item) => (
              <li
                key={item.slice(0, 40)}
                className="rounded-lg border border-border bg-background p-5 text-body text-text-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
        </SectionShell>

        <SectionShell id="audit-form" ariaLabelledBy="audit-form-heading">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 id="audit-form-heading" className="text-h2">
                {page.form.heading}
              </h2>
              <div className="mt-8 rounded-lg border border-border bg-surface p-6 md:p-8">
                <ConfigurableForm
                  formId="audit-form"
                  fields={page.form.fields}
                  submitLabel={page.form.submitLabel}
                  consentLabel={page.form.consentLabel}
                  action={submitAuditForm}
                  initialState={initialFormActionState}
                />
              </div>
            </div>

            <aside className="lg:col-span-2 space-y-8" aria-labelledby="audit-trust-heading">
              <div>
                <h2 id="audit-trust-heading" className="text-h2">
                  {page.trustSignals.heading}
                </h2>
                <ul className="mt-6 grid grid-cols-2 gap-4">
                  {page.trustSignals.stats.map((stat) => (
                    <li key={`${stat.value}-${stat.label}`}>
                      <Card className="h-full border-border bg-background">
                        <CardContent className="p-4">
                          <p className="text-stat text-text-primary">{stat.value}</p>
                          <p className="mt-1 text-small text-text-secondary">{stat.label}</p>
                        </CardContent>
                      </Card>
                    </li>
                  ))}
                </ul>
              </div>

              {page.trustSignals.testimonial ? (
                <blockquote className="rounded-lg border border-border bg-background p-6">
                  <p className="text-body text-text-secondary">
                    &ldquo;{page.trustSignals.testimonial.quote}&rdquo;
                  </p>
                  <footer className="mt-4 text-small text-text-secondary">
                    <cite className="not-italic font-medium text-text-primary">
                      {page.trustSignals.testimonial.author}
                    </cite>
                    {page.trustSignals.testimonial.role
                      ? `, ${page.trustSignals.testimonial.role}`
                      : null}
                  </footer>
                </blockquote>
              ) : null}

              <div>
                <h3 className="text-h4">{page.fallbackContact.heading}</h3>
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-small text-text-secondary">{page.fallbackContact.phoneLabel}</p>
                    <a
                      href={`tel:${site.phone.tel}`}
                      className="inline-flex min-h-11 items-center font-medium text-text-primary hover:text-link-hover hover:underline"
                    >
                      {site.phone.display}
                    </a>
                  </div>
                  <div>
                    <p className="text-small text-text-secondary">{page.fallbackContact.emailLabel}</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="inline-flex min-h-11 items-center font-medium text-text-primary hover:text-link-hover hover:underline"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </SectionShell>

        <SectionShell id="audit-faq" tone="muted" ariaLabelledBy="audit-faq-heading">
          <SectionHeading
            heading="Frequently asked questions"
            headingId="audit-faq-heading"
            className="max-w-4xl"
          />
          <div className="mt-8 w-full">
            <FaqAccordion items={page.faq} />
          </div>
        </SectionShell>
      </main>
    </>
  );
}
