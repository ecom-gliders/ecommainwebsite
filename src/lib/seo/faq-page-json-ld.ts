import type { FaqItem, FaqPageConfig, SiteConfig } from "@/domain/content/schemas";
import { absoluteUrl, getSiteUrl } from "./site-url";

interface BuildFaqPageJsonLdInput {
  page: FaqPageConfig;
  items: FaqItem[];
  site: SiteConfig;
}

export function buildFaqPageJsonLd({
  page,
  items,
  site,
}: BuildFaqPageJsonLdInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(page.seo.canonical);
  const siteUrl = getSiteUrl();
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const webpageId = `${pageUrl}#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": webpageId,
        name: page.hero.title,
        description: page.seo.metaDescription,
        url: pageUrl,
        isPartOf: {
          "@type": "WebSite",
          name: site.name,
          url: siteUrl,
        },
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "FAQ",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
