import type { Metadata } from "next";
import { FreeAuditPageTemplate } from "@/components/free-audit/free-audit-page-template";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildFreeAuditPageJsonLd } from "@/lib/seo/free-audit-json-ld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";

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
        <FreeAuditPageTemplate page={page} site={site} />
      </main>
    </>
  );
}
