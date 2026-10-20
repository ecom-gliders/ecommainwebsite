import type { Metadata } from "next";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { SectionShell } from "@/components/sections/section-shell";
import { Card, CardContent } from "@/components/ui/card";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildContactPageJsonLd } from "@/lib/seo/contact-page-json-ld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { submitContactForm } from "./actions";

export async function generateMetadata(): Promise<Metadata> {
  const repository = getContentRepository();
  const page = await repository.getContactPage();
  return pageSeoToMetadata(page.seo);
}

export default async function ContactPage() {
  const repository = getContentRepository();
  const [page, site] = await Promise.all([
    repository.getContactPage(),
    repository.getSiteConfig(),
  ]);

  const jsonLd = buildContactPageJsonLd({ page, site });

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main id="main-content">
        <SectionShell id="contact-hero" ariaLabelledBy="contact-hero-heading">
          <div className="mx-auto max-w-3xl text-center">
            <h1 id="contact-hero-heading" className="text-h1">
              {page.hero.title}
            </h1>
            <p className="mt-4 text-body text-text-secondary">{page.hero.subtitle}</p>
          </div>
        </SectionShell>

        <SectionShell id="contact-content" tone="muted">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="text-h2">{page.form.heading}</h2>
              <div className="mt-8 rounded-lg border border-border bg-background p-6 md:p-8">
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

            <aside className="lg:col-span-2" aria-labelledby="contact-details-heading">
              <h2 id="contact-details-heading" className="text-h2">
                {page.contactDetails.heading}
              </h2>
              <Card className="mt-8 border-border bg-background">
                <CardContent className="space-y-6 p-6">
                  <div>
                    <p className="text-small font-medium text-text-secondary">
                      {page.contactDetails.phoneLabel}
                    </p>
                    <a
                      href={`tel:${site.phone.tel}`}
                      className="mt-1 inline-flex min-h-11 items-center text-body font-medium text-text-primary hover:text-link-hover hover:underline"
                    >
                      {site.phone.display}
                    </a>
                  </div>
                  <div>
                    <p className="text-small font-medium text-text-secondary">
                      {page.contactDetails.emailLabel}
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-1 inline-flex min-h-11 items-center text-body font-medium text-text-primary hover:text-link-hover hover:underline"
                    >
                      {site.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-small font-medium text-text-secondary">
                      {page.contactDetails.addressLabel}
                    </p>
                    <p className="mt-1 text-body text-text-primary">{site.address.formatted}</p>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </SectionShell>
      </main>
    </>
  );
}
