import type {
  FreeAmazonToolPageConfig,
  FreeAmazonToolsPageConfig,
  SiteConfig,
} from "@/domain/content/schemas";
import { absoluteUrl } from "./site-url";

interface BuildFreeAmazonToolsDirectoryJsonLdInput {
  page: FreeAmazonToolsPageConfig;
  site: SiteConfig;
}

/** CollectionPage + ItemList for the Free Amazon Tools directory. */
export function buildFreeAmazonToolsDirectoryJsonLd({
  page,
  site,
}: BuildFreeAmazonToolsDirectoryJsonLdInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(page.seo.canonical);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.seo.metaTitle,
        description: page.seo.metaDescription,
        isPartOf: {
          "@type": "WebSite",
          name: site.name,
          url: absoluteUrl("/"),
        },
        about: {
          "@type": "Thing",
          name: "Amazon seller tools",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Free Amazon Tools",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        name: page.hero.title,
        numberOfItems: page.tools.length,
        itemListElement: page.tools.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: tool.title,
          url: absoluteUrl(`/free-amazon-tools/${tool.slug}/`),
          description: tool.description,
        })),
      },
    ],
  };
}

interface BuildFreeAmazonToolPageJsonLdInput {
  tool: FreeAmazonToolPageConfig;
  site: SiteConfig;
}

/** WebApplication + BreadcrumbList (+ HowTo when instructions exist). */
export function buildFreeAmazonToolPageJsonLd({
  tool,
  site,
}: BuildFreeAmazonToolPageJsonLdInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(tool.seo.canonical);
  const directoryUrl = absoluteUrl("/free-amazon-tools/");

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebApplication",
      "@id": `${pageUrl}#app`,
      name: tool.hero.title,
      description: tool.seo.metaDescription,
      url: pageUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      provider: {
        "@type": "Organization",
        name: site.name,
        url: absoluteUrl("/"),
      },
      isAccessibleForFree: true,
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: tool.seo.metaTitle,
      description: tool.seo.metaDescription,
      isPartOf: {
        "@type": "WebSite",
        name: site.name,
        url: absoluteUrl("/"),
      },
      mainEntity: { "@id": `${pageUrl}#app` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Free Amazon Tools",
          item: directoryUrl,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: tool.hero.title,
          item: pageUrl,
        },
      ],
    },
  ];

  if (tool.instructions.length > 0) {
    graph.push({
      "@type": "HowTo",
      "@id": `${pageUrl}#howto`,
      name: `How to use ${tool.hero.title}`,
      description: tool.intro,
      step: tool.instructions.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text: step.body,
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
