import type { FreeAuditPageConfig, SiteConfig } from "@/domain/content/schemas";
import { absoluteUrl, getSiteUrl } from "./site-url";

interface BuildFreeAuditPageJsonLdInput {
  page: FreeAuditPageConfig;
  site: SiteConfig;
}

export function buildFreeAuditPageJsonLd({
  page,
  site,
}: BuildFreeAuditPageJsonLdInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(page.seo.canonical);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      name: page.hero.title,
      description: page.seo.metaDescription,
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: site.name,
        url: getSiteUrl(),
      },
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
