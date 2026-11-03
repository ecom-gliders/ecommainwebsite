/**
 * Open Graph / social preview image helpers.
 * Spec: docs/seo/OG-IMAGE-STANDARD.md
 */

export const OG_LANDSCAPE = { width: 1200, height: 630 } as const;
export const OG_SQUARE = { width: 1200, height: 1200 } as const;

export const OG_DEFAULT_LANDSCAPE = "/images/og/default-1200x630.jpg";
export const OG_DEFAULT_SQUARE = "/images/og/default-1200x1200.jpg";

/** Landscape path ending in -1200x630 → companion square -1200x1200 */
export function ogSquareCompanionPath(landscapePath: string): string | undefined {
  if (landscapePath.includes("-1200x630.")) {
    return landscapePath.replace("-1200x630.", "-1200x1200.");
  }
  return undefined;
}

export interface ResolvedOgImages {
  landscape: string;
  square?: string;
  alt: string;
}

/**
 * Resolve landscape (+ optional square) OG paths.
 * Priority: explicit ogImage → featuredImage → site defaults.
 */
export function resolveOgImages(input: {
  ogImage?: string;
  featuredImage?: string;
  alt?: string;
  metaTitle?: string;
}): ResolvedOgImages {
  const alt =
    input.alt?.trim() ||
    input.metaTitle?.trim() ||
    "eCom Gliders";

  const primary =
    input.ogImage?.trim() ||
    input.featuredImage?.trim() ||
    OG_DEFAULT_LANDSCAPE;

  const square =
    ogSquareCompanionPath(primary) ||
    (primary === OG_DEFAULT_LANDSCAPE ? OG_DEFAULT_SQUARE : undefined);

  return {
    landscape: primary,
    square,
    alt,
  };
}
