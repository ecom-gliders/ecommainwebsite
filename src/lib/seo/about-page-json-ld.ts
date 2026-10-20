import type { AboutPageConfig, SiteConfig } from "@/domain/content/schemas";
import { absoluteUrl, getSiteUrl } from "./site-url";

interface BuildAboutPageJsonLdInput {
  page: AboutPageConfig;
  site: SiteConfig;
}

export function buildAboutPageJsonLd({
  page,
  site,
}: BuildAboutPageJsonLdInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(page.seo.canonical);
  const siteUrl = getSiteUrl();
  const organizationId = `${siteUrl}/#organization`;

  const socialProfiles = Object.values(site.social).filter(
    (url): url is string => typeof url === "string" && url.length > 0,
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: page.hero.title,
        description: page.seo.metaDescription,
        url: pageUrl,
        isPartOf: {
          "@type": "WebSite",
          name: site.name,
          url: siteUrl,
        },
        about: { "@id": organizationId },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        url: siteUrl,
        logo: absoluteUrl("/images/logo.png"),
        description: site.tagline,
        foundingDate: "2018",
        email: site.email,
        telephone: site.phone.tel,
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: 11,
          maxValue: 50,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          addressCountry: site.address.country,
        },
        ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}),
      },
    ],
  };
}
