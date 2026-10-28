import type { Metadata } from "next";
import { FreeAmazonToolsDirectoryTemplate } from "@/components/tools/free-amazon-tools-directory-template";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildFreeAmazonToolsDirectoryJsonLd } from "@/lib/seo/free-amazon-tools-json-ld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const repository = getContentRepository();
  const page = await repository.getFreeAmazonToolsPage();
  return pageSeoToMetadata(page.seo);
}

export default async function FreeAmazonToolsPage() {
  const repository = getContentRepository();
  const [page, site] = await Promise.all([
    repository.getFreeAmazonToolsPage(),
    repository.getSiteConfig(),
  ]);

  return (
    <>
      <JsonLdScript
        data={buildFreeAmazonToolsDirectoryJsonLd({ page, site })}
      />
      <main id="main-content">
        <FreeAmazonToolsDirectoryTemplate page={page} />
      </main>
    </>
  );
}
