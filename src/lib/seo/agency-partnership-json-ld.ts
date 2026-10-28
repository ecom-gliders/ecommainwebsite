import type {
  AgencyPartnershipPageConfig,
  SiteConfig,
} from "@/domain/content/schemas";
import { absoluteUrl, getSiteUrl } from "./site-url";

interface BuildAgencyPartnershipJsonLdInput {
  page: AgencyPartnershipPageConfig;
  site: SiteConfig;
}

export function buildAgencyPartnershipJsonLd({
  page,
  site,
}: BuildAgencyPartnershipJsonLdInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(page.seo.canonical);
  const siteUrl = getSiteUrl();
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const webpageId = `${pageUrl}#webpage`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
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
          name: "Agency Partnership",
          item: pageUrl,
        },
      ],
    },
  ];

  if (page.faq.items.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: pageUrl,
      mainEntity: page.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
