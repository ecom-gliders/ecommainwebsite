import type { Metadata } from "next";
import { FaqPageTemplate } from "@/components/faq/faq-page-template";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildFaqPageJsonLd } from "@/lib/seo/faq-page-json-ld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const repository = getContentRepository();
  const page = await repository.getFaqPage();
  return pageSeoToMetadata(page.seo);
}

export default async function FaqPage() {
  const repository = getContentRepository();
  const [page, items, site] = await Promise.all([
    repository.getFaqPage(),
    repository.getFaq(),
    repository.getSiteConfig(),
  ]);

  return (
    <>
      <JsonLdScript data={buildFaqPageJsonLd({ page, items, site })} />
      <main id="main-content">
        <FaqPageTemplate page={page} items={items} />
      </main>
    </>
  );
}
