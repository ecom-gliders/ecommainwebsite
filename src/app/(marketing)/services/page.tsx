import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicesIndexTemplate } from "@/components/services/services-index-template";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";
import { buildServicesIndexJsonLd } from "@/lib/seo/services-index-json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const repository = getContentRepository();
  const index = await repository.getServicesIndex();

  if (!index) {
    return {
      title: "Amazon Growth Services | eCom Gliders",
    };
  }

  return pageSeoToMetadata(index.seo);
}

export default async function ServicesIndexPage() {
  const repository = getContentRepository();
  const [index, site] = await Promise.all([
    repository.getServicesIndex(),
    repository.getSiteConfig(),
  ]);

  if (!index) {
    notFound();
  }

  const jsonLd = buildServicesIndexJsonLd({ index, site });

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main id="main-content">
        <ServicesIndexTemplate index={index} site={site} />
      </main>
    </>
  );
}
