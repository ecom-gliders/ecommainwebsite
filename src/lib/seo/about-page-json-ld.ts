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
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  const socialProfiles = Object.values(site.social).filter(
    (url): url is string => typeof url === "string" && url.length > 0,
  );

  const people = page.team.members.map((member, index) => {
    const personId = `${pageUrl}#person-${index + 1}`;
    return {
      "@type": "Person",
      "@id": personId,
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      worksFor: { "@id": organizationId },
      ...(member.image
        ? { image: absoluteUrl(member.image) }
        : {}),
    };
  });

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
        "@type": "AboutPage",
        "@id": `${pageUrl}#webpage`,
        name: page.hero.title,
        description: page.seo.metaDescription,
        url: pageUrl,
        isPartOf: {
          "@type": "WebSite",
          name: site.name,
          url: siteUrl,
        },
        about: { "@id": organizationId },
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
            name: "About",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        legalName: "eCom Gliders LLC",
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
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Canada" },
          { "@type": "Place", name: "European Union" },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          addressCountry: site.address.country,
        },
        employee: people.map((person) => ({ "@id": person["@id"] })),
        ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}),
      },
      ...people,
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqEntities,
      },
    ],
  };
}
