import type { Metadata } from "next";
import { HtmlSitemapTemplate } from "@/components/resources/html-sitemap-template";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildHtmlSitemapGroups } from "@/lib/seo/build-html-sitemap-groups";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";
import { absoluteUrl } from "@/lib/seo/site-url";

const pageSeo = {
  metaTitle: "eCom Gliders Sitemap | HTML Site Directory",
  metaDescription:
    "eCom Gliders sitemap: browse HTML links to homepage, services, case studies, Contact Us, partnership, careers, FAQ, Free Amazon Tools, and more.",
  canonical: "/site-map/",
  ogImage: "/images/about/hero.png",
} as const;

export function generateMetadata(): Metadata {
  return pageSeoToMetadata(pageSeo);
}

export default async function HtmlSitemapPage() {
  const repository = getContentRepository();
  const groups = await buildHtmlSitemapGroups(repository);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl("/site-map/#webpage"),
        name: "eCom Gliders sitemap",
        description: pageSeo.metaDescription,
        url: absoluteUrl("/site-map/"),
        isPartOf: {
          "@type": "WebSite",
          name: "eCom Gliders",
          url: absoluteUrl("/"),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Sitemap",
            item: absoluteUrl("/site-map/"),
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main id="main-content">
        <HtmlSitemapTemplate groups={groups} xmlHref="/sitemap.xml" />
      </main>
    </>
  );
}
