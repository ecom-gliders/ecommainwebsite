import type { Metadata } from "next";
import type { PageSeo } from "@/domain/content/schemas";
import { absoluteUrl } from "./site-url";

interface PageMetadataOptions {
  openGraphType?: "website" | "article";
  siteName?: string;
}

export function pageSeoToMetadata(
  seo: PageSeo,
  options: PageMetadataOptions = {},
): Metadata {
  const canonical = absoluteUrl(seo.canonical);
  const robots = seo.robots ?? { index: true, follow: true };
  const siteName = options.siteName ?? "eCom Gliders";

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: {
      canonical,
    },
    robots: {
      index: robots.index,
      follow: robots.follow,
    },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: canonical,
      siteName,
      locale: "en_US",
      type: options.openGraphType ?? "website",
      ...(seo.ogImage
        ? {
            images: [{ url: absoluteUrl(seo.ogImage) }],
          }
        : {}),
    },
    twitter: {
      card: seo.ogImage ? "summary_large_image" : "summary",
      title: seo.metaTitle,
      description: seo.metaDescription,
    },
  };
}
