import type { ContactPageConfig, SiteConfig } from "@/domain/content/schemas";
import { absoluteUrl, getSiteUrl } from "./site-url";

interface BuildContactPageJsonLdInput {
  page: ContactPageConfig;
  site: SiteConfig;
}

export function buildContactPageJsonLd({
  page,
  site,
}: BuildContactPageJsonLdInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(page.seo.canonical);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: page.hero.title,
        description: page.seo.metaDescription,
        url: pageUrl,
        mainEntity: {
          "@type": "Organization",
          name: site.name,
          url: getSiteUrl(),
          telephone: site.phone.tel,
          email: site.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: site.address.city,
            addressRegion: site.address.state,
            addressCountry: site.address.country,
          },
        },
      },
    ],
  };
}
