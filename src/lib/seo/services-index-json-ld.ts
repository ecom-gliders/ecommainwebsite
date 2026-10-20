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
  const listedServices = [
    {
      title: index.flagship.heading,
      href: index.flagship.cta.href,
    },
    ...index.capabilityRail.items.map((item) => ({
      title: item.title,
      href: item.href,
    })),
    ...index.alsoAvailable.items.map((item) => ({
      title: item.title,
      href: item.href,
    })),
  ];

  const uniqueByHref = listedServices.filter(
    (service, indexInList, all) =>
      all.findIndex((candidate) => candidate.href === service.href) ===
      indexInList,
  );

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
          itemListElement: uniqueByHref.map((service, position) => ({
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
