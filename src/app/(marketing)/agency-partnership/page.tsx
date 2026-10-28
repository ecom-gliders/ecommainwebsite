import type { Metadata } from "next";
import { AgencyPartnershipTemplate } from "@/components/agency-partnership/agency-partnership-template";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildAgencyPartnershipJsonLd } from "@/lib/seo/agency-partnership-json-ld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const repository = getContentRepository();
  const page = await repository.getAgencyPartnershipPage();
  return pageSeoToMetadata(page.seo);
}

export default async function AgencyPartnershipPage() {
  const repository = getContentRepository();
  const [page, site] = await Promise.all([
    repository.getAgencyPartnershipPage(),
    repository.getSiteConfig(),
  ]);

  const jsonLd = buildAgencyPartnershipJsonLd({ page, site });

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main id="main-content">
        <AgencyPartnershipTemplate page={page} site={site} />
      </main>
    </>
  );
}
