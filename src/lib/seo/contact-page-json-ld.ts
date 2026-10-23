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
  const siteUrl = getSiteUrl();
  const organizationId = `${siteUrl}/#organization`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  const socialProfiles = Object.values(site.social).filter(
    (url): url is string => typeof url === "string" && url.length > 0,
  );

  const contactPoints = [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.phone.tel,
      email: site.email,
      areaServed: ["US", "GB", "CA", "EU"],
      availableLanguage: ["English"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "17:00",
      },
    },
    ...page.contactDetails.roleEmails.map((role) => ({
      "@type": "ContactPoint",
      contactType: role.label,
      email: role.email,
    })),
  ];

  const faqEntities = page.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${pageUrl}#webpage`,
        name: page.hero.title,
        description: page.seo.metaDescription,
        url: pageUrl,
        isPartOf: {
          "@type": "WebSite",
          name: site.name,
          url: siteUrl,
        },
        mainEntity: { "@id": organizationId },
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
            name: "Contact",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        url: siteUrl,
        email: site.email,
        telephone: site.phone.tel,
        sameAs: socialProfiles,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.postalCode || undefined,
          addressCountry: site.address.country,
        },
        contactPoint: contactPoints,
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Canada" },
          { "@type": "AdministrativeArea", name: "European Union" },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqEntities,
      },
    ],
  };
}
