import type { Metadata } from "next";
import type { PageSeo } from "@/domain/content/schemas";
import {
  OG_LANDSCAPE,
  OG_SQUARE,
  resolveOgImages,
} from "@/lib/seo/og-images";
import { absoluteUrl } from "./site-url";

interface PageMetadataOptions {
  openGraphType?: "website" | "article";
  siteName?: string;
  /** On-page primary image when seo.ogImage is missing */
  featuredImage?: string;
  ogImageAlt?: string;
}

export function pageSeoToMetadata(
  seo: PageSeo,
  options: PageMetadataOptions = {},
): Metadata {
  const canonical = absoluteUrl(seo.canonical);
  const robots = seo.robots ?? { index: true, follow: true };
  const siteName = options.siteName ?? "eCom Gliders";

  const imagesResolved = resolveOgImages({
    ogImage: seo.ogImage,
    featuredImage: options.featuredImage,
    alt: options.ogImageAlt ?? seo.ogImageAlt,
    metaTitle: seo.metaTitle,
  });

  const ogImages: NonNullable<Metadata["openGraph"]>["images"] = [
    {
      url: absoluteUrl(imagesResolved.landscape),
      width: OG_LANDSCAPE.width,
      height: OG_LANDSCAPE.height,
      alt: imagesResolved.alt,
    },
  ];

  if (imagesResolved.square) {
    ogImages.push({
      url: absoluteUrl(imagesResolved.square),
      width: OG_SQUARE.width,
      height: OG_SQUARE.height,
      alt: imagesResolved.alt,
    });
  }

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
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [absoluteUrl(imagesResolved.landscape)],
    },
  };
}
