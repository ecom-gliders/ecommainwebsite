import type { ServicesIndexConfig, SiteConfig } from "@/domain/content/schemas";
import { absoluteUrl, getSiteUrl } from "./site-url";

interface BuildServicesIndexJsonLdInput {
  index: ServicesIndexConfig;
  site: SiteConfig;
}

export function buildServicesIndexJsonLd({
  index,
  site,
}: BuildServicesIndexJsonLdInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(index.seo.canonical);
  const services = index.categories.flatMap((category) => category.services);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: index.hero.title,
        description: index.seo.metaDescription,
        url: pageUrl,
        isPartOf: {
          "@type": "WebSite",
          name: site.name,
          url: getSiteUrl(),
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: services.map((service, position) => ({
            "@type": "ListItem",
            position: position + 1,
            name: service.title,
            url: absoluteUrl(service.href),
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: index.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
