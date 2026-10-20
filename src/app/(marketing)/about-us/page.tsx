import type { Metadata } from "next";
import { AboutPageTemplate } from "@/components/about/about-page-template";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildAboutPageJsonLd } from "@/lib/seo/about-page-json-ld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const repository = getContentRepository();
  const page = await repository.getAboutPage();
  return pageSeoToMetadata(page.seo);
}

export default async function AboutUsPage() {
  const repository = getContentRepository();
  const [page, site] = await Promise.all([
    repository.getAboutPage(),
    repository.getSiteConfig(),
  ]);

  const jsonLd = buildAboutPageJsonLd({ page, site });

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main id="main-content">
        <AboutPageTemplate page={page} site={site} />
      </main>
    </>
  );
}
