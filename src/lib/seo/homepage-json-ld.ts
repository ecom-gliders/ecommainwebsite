import type { HomepageConfig, SiteConfig } from "@/domain/content/schemas";
import { absoluteUrl, getSiteUrl } from "./site-url";

interface BuildHomepageJsonLdInput {
  homepage: HomepageConfig;
  site: SiteConfig;
}

function getFaqItems(
  homepage: HomepageConfig,
): Array<{ question: string; answer: string }> {
  const faqSection = homepage.sections.find(
    (section) => section.type === "faq" && section.enabled,
  );

  if (!faqSection || !Array.isArray(faqSection.data.items)) {
    return [];
  }

  return faqSection.data.items
    .filter(
      (item): item is Record<string, unknown> =>
        Boolean(item) && typeof item === "object",
    )
    .map((item) => ({
      question: typeof item.question === "string" ? item.question : "",
      answer: typeof item.answer === "string" ? item.answer : "",
    }))
    .filter((item) => item.question && item.answer);
}

export function buildHomepageJsonLd({
  homepage,
  site,
}: BuildHomepageJsonLdInput): Record<string, unknown> {
  const siteUrl = getSiteUrl();
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const pageUrl = absoluteUrl(homepage.seo.canonical);

  const socialProfiles = Object.values(site.social).filter(
    (url): url is string => typeof url === "string" && url.length > 0,
  );

  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: siteUrl,
    logo: absoluteUrl("/images/logo.png"),
    description: site.tagline,
    email: site.email,
    telephone: site.phone.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      addressCountry: site.address.country,
    },
    ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}),
  };

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: site.name,
    description: site.tagline,
    publisher: { "@id": organizationId },
    inLanguage: "en-US",
  };

  const faqItems = getFaqItems(homepage);
  const faqPage: Record<string, unknown> | null =
    faqItems.length > 0
      ? {
          "@type": "FAQPage",
          "@id": `${pageUrl}#faq`,
          url: pageUrl,
          isPartOf: { "@id": websiteId },
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return {
    "@context": "https://schema.org",
    "@graph": faqPage
      ? [organization, website, faqPage]
      : [organization, website],
  };
}
