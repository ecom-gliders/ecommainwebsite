import type { LegalPageConfig, SiteConfig } from "@/domain/content/schemas";
import { absoluteUrl, getSiteUrl } from "./site-url";

interface BuildLegalPageJsonLdInput {
  page: LegalPageConfig;
  site: SiteConfig;
}

export function buildLegalPageJsonLd({
  page,
  site,
}: BuildLegalPageJsonLdInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(page.seo.canonical);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        name: page.h1,
        description: page.seo.metaDescription,
        url: pageUrl,
        dateModified: page.dateValue,
        isPartOf: {
          "@type": "WebSite",
          name: site.name,
          url: getSiteUrl(),
        },
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: getSiteUrl(),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: getSiteUrl(),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.h1,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
