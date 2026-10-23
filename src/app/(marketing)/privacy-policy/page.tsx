import type { Metadata } from "next";
import { LegalDocumentTemplate } from "@/components/legal/legal-document-template";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildLegalPageJsonLd } from "@/lib/seo/legal-page-json-ld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const repository = getContentRepository();
  const page = await repository.getPrivacyPage();
  return pageSeoToMetadata(page.seo);
}

export default async function PrivacyPolicyPage() {
  const repository = getContentRepository();
  const [page, site] = await Promise.all([
    repository.getPrivacyPage(),
    repository.getSiteConfig(),
  ]);

  return (
    <>
      <JsonLdScript data={buildLegalPageJsonLd({ page, site })} />
      <main id="main-content">
        <LegalDocumentTemplate page={page} />
      </main>
    </>
  );
}
