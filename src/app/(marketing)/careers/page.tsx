import type { Metadata } from "next";
import { CareersTemplate } from "@/components/careers/careers-template";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildCareersPageJsonLd } from "@/lib/seo/careers-page-json-ld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const repository = getContentRepository();
  const page = await repository.getCareersPage();
  return pageSeoToMetadata(page.seo);
}

export default async function CareersPage() {
  const repository = getContentRepository();
  const [page, site] = await Promise.all([
    repository.getCareersPage(),
    repository.getSiteConfig(),
  ]);

  const jsonLd = buildCareersPageJsonLd({ page, site });

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main id="main-content">
        <CareersTemplate page={page} site={site} />
      </main>
    </>
  );
}
