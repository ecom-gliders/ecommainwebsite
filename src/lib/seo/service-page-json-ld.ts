import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { absoluteUrl, getSiteUrl } from "./site-url";

/**
 * Official Amazon Seller Central markets supported on homepage FAQ.
 * Keep in sync with content/config/homepage.json markets + FAQ answer.
 */
const AMAZON_SELLER_CENTRAL_MARKETS = [
  "United States",
  "Canada",
  "Mexico",
  "Brazil",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Belgium",
  "Ireland",
  "Sweden",
  "Poland",
  "Turkey",
  "United Arab Emirates",
  "Saudi Arabia",
  "Egypt",
  "South Africa",
  "India",
  "Japan",
  "Australia",
  "Singapore",
] as const;

interface BuildServicePageJsonLdInput {
  service: ServicePageConfig;
  site: SiteConfig;
}

export function buildServicePageJsonLd({
  service,
  site,
}: BuildServicePageJsonLdInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(service.seo.canonical);
  const organizationId = `${getSiteUrl()}/#organization`;

  const serviceNode: Record<string, unknown> = {
    "@type": "Service",
    name: service.hero.title,
    description: service.hero.subtitle,
    url: pageUrl,
    provider: {
      "@type": "Organization",
      "@id": organizationId,
      name: site.name,
      url: getSiteUrl(),
    },
    areaServed: AMAZON_SELLER_CENTRAL_MARKETS.map((name) => ({
      "@type": "Country",
      name,
    })),
    serviceType: service.breadcrumbLabel,
  };

  const graph: Record<string, unknown>[] = [serviceNode];

  if (service.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: pageUrl,
      mainEntity: service.faq.map((item) => ({
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
