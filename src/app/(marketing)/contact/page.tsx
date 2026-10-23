import type { Metadata } from "next";
import { ContactPageTemplate } from "@/components/contact/contact-page-template";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildContactPageJsonLd } from "@/lib/seo/contact-page-json-ld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";

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
        <ContactPageTemplate page={page} site={site} />
      </main>
    </>
  );
}
