import type { Metadata } from "next";
import { HtmlSitemapTemplate } from "@/components/resources/html-sitemap-template";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildHtmlSitemapGroups } from "@/lib/seo/build-html-sitemap-groups";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";

const pageSeo = {
  metaTitle: "Sitemap | eCom Gliders",
  metaDescription:
    "Browse the eCom Gliders HTML sitemap: homepage, services, case studies, Contact Us, partnership, careers, FAQ, Free Amazon Tools, and more.",
  canonical: "/site-map/",
} as const;

export function generateMetadata(): Metadata {
  return pageSeoToMetadata(pageSeo);
}

export default async function HtmlSitemapPage() {
  const repository = getContentRepository();
  const groups = await buildHtmlSitemapGroups(repository);

  return (
    <main id="main-content">
      <HtmlSitemapTemplate groups={groups} xmlHref="/sitemap.xml" />
    </main>
  );
}
