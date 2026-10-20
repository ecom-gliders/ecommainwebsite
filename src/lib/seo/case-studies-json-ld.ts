import type { CaseStudyDetail, CaseStudiesConfig, SiteConfig } from "@/domain/content/schemas";
import { absoluteUrl, getSiteUrl } from "./site-url";

interface BuildCaseStudiesIndexJsonLdInput {
  index: CaseStudiesConfig["index"];
  studies: CaseStudyDetail[];
  site: SiteConfig;
}

export function buildCaseStudiesIndexJsonLd({
  index,
  studies,
  site,
}: BuildCaseStudiesIndexJsonLdInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(index.seo.canonical);

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
        hasPart: studies.map((study) => ({
          "@type": "Article",
          headline: study.title,
          url: absoluteUrl(study.seo.canonical),
          image: study.featuredImage ? absoluteUrl(study.featuredImage) : undefined,
          ...(study.dateModified ? { dateModified: study.dateModified } : {}),
        })),
      },
    ],
  };
}

interface BuildCaseStudyDetailJsonLdInput {
  study: CaseStudyDetail;
  site: SiteConfig;
}

export function buildCaseStudyDetailJsonLd({
  study,
  site,
}: BuildCaseStudyDetailJsonLdInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(study.seo.canonical);
  const clientName = study.clientDisplayName ?? study.client;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: study.title,
        description: study.excerpt,
        url: pageUrl,
        image: study.featuredImage ? absoluteUrl(study.featuredImage) : undefined,
        ...(study.dateModified ? { dateModified: study.dateModified } : {}),
        author: {
          "@type": "Organization",
          name: site.name,
          url: getSiteUrl(),
        },
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: getSiteUrl(),
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": pageUrl,
        },
        about: {
          "@type": "Organization",
          name: clientName,
        },
      },
    ],
  };
}
