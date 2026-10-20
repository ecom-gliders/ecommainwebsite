/**
 * Maps audience / includes block titles to existing service imagery
 * so depth-band cards render a photo without requiring every JSON row
 * to duplicate paths.
 */

export interface ResolvedBlockImage {
  src: string;
  alt: string;
}

const SERVICE_IMAGES = {
  account: "/images/services/amazon-account-management-service.jpg",
  ppc: "/images/services/amazon-ppc-management-service.jpg",
  listing: "/images/services/amazon-listing-optimization-service.jpg",
  catalog: "/images/services/amazon-catalog-management-service.jpg",
  content: "/images/services/amazon-content-writing-service.jpg",
  visual: "/images/services/amazon-visual-creativity-service.jpg",
  video: "/images/services/amazon-video-creative-service.jpg",
  reporting: "/images/services/amazon-reporting-analytics-service.jpg",
  dsp: "/images/services/amazon-dsp-management-service.jpg",
  brand: "/images/services/amazon-trademark-brand-registry-service.jpg",
  sourcing: "/images/services/amazon-product-sourcing-service.jpg",
  company: "/images/services/amazon-company-registration-service.jpg",
} as const;

type ImageKey = keyof typeof SERVICE_IMAGES;

const RULES: Array<{ match: RegExp; key: ImageKey }> = [
  { match: /\bppc\b|paid media|advertising|campaign|acos|tacos|sponsored/i, key: "ppc" },
  { match: /\bdsp\b|display/i, key: "dsp" },
  { match: /catalog|variation|suppression|attribute/i, key: "catalog" },
  { match: /listing|seo|keyword|conversion|content coordination/i, key: "listing" },
  { match: /a\+|visual|creative|imagery|brand presentation/i, key: "visual" },
  { match: /video/i, key: "video" },
  { match: /report|analytics|performance reporting/i, key: "reporting" },
  { match: /trademark|brand registry|brand protection/i, key: "brand" },
  { match: /sourc/i, key: "sourcing" },
  { match: /compan(y|ies)|registration|llc/i, key: "company" },
  { match: /account|seller central|full[- ]service|oversight|fba|operator|founder|specialist|inventory|launch|ops|process/i, key: "account" },
  { match: /copy|writing|bullet/i, key: "content" },
];

const FALLBACK_ROTATION: ImageKey[] = [
  "account",
  "ppc",
  "listing",
  "catalog",
  "visual",
  "reporting",
  "content",
  "dsp",
];

export function resolveBlockImage(
  title: string,
  index = 0,
  explicit?: { src?: string; alt?: string } | null,
): ResolvedBlockImage {
  if (explicit?.src) {
    return {
      src: explicit.src,
      alt: explicit.alt?.trim() || `${title} preview`,
    };
  }

  const rule = RULES.find((entry) => entry.match.test(title));
  const key = rule?.key ?? FALLBACK_ROTATION[index % FALLBACK_ROTATION.length];

  return {
    src: SERVICE_IMAGES[key],
    alt: `${title} — Amazon service workstream preview`,
  };
}
