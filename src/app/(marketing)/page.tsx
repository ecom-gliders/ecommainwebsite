import type { Metadata } from "next";
import { HomepageSections } from "@/components/sections/homepage-section-renderer";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildHomepageJsonLd } from "@/lib/seo/homepage-json-ld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const repository = getContentRepository();
  const homepage = await repository.getHomepage();

  return pageSeoToMetadata(homepage.seo);
}

export default async function HomePage() {
  const repository = getContentRepository();
  const [homepage, site] = await Promise.all([
    repository.getHomepage(),
    repository.getSiteConfig(),
  ]);

  const jsonLd = buildHomepageJsonLd({ homepage, site });

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main id="main-content">
        <HomepageSections sections={homepage.sections} site={site} />
      </main>
    </>
  );
}
