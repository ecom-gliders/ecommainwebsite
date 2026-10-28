import type { CareersPageConfig, SiteConfig } from "@/domain/content/schemas";
import { absoluteUrl, getSiteUrl } from "./site-url";

interface BuildCareersPageJsonLdInput {
  page: CareersPageConfig;
  site: SiteConfig;
}

export function buildCareersPageJsonLd({
  page,
  site,
}: BuildCareersPageJsonLdInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(page.seo.canonical);
  const siteUrl = getSiteUrl();
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const webpageId = `${pageUrl}#webpage`;
  const organizationId = `${siteUrl.replace(/\/$/, "")}/#organization`;
  const datePosted = new Date().toISOString().slice(0, 10);

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
          name: "Careers",
          item: pageUrl,
        },
      ],
    },
  ];

  for (const role of page.roles) {
    const roleUrl = `${pageUrl}#${role.slug}`;
    graph.push({
      "@type": "JobPosting",
      "@id": `${pageUrl}#job-${role.slug}`,
      title: role.title,
      description: [
        role.about,
        "",
        "Responsibilities:",
        ...role.responsibilities.map((item) => `- ${item}`),
        "",
        "Must-haves:",
        ...role.mustHaves.map((item) => `- ${item}`),
      ].join("\n"),
      datePosted,
      employmentType: "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        sameAs: siteUrl,
      },
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: {
        "@type": "Country",
        name: "United States",
      },
      url: roleUrl,
      identifier: {
        "@type": "PropertyValue",
        name: site.name,
        value: role.slug,
      },
      directApply: true,
    });
  }

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
