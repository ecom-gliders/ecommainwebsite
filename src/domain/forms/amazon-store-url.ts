import { z } from "zod";

/** Classic Amazon product ASIN (10 chars, starts with B). */
const ASIN_PATTERN = /^B[0-9A-Z]{9}$/i;

const AMAZON_MESSAGE =
  "Use an Amazon storefront URL, product link, or ASIN — for example amazon.com/stores/... or B0XXXXXXXXX.";

/**
 * True when hostname is an Amazon retail (or short-link) host.
 */
function isAmazonHostname(hostname: string): boolean {
  const host = hostname.replace(/^www\./i, "").toLowerCase();
  if (host === "amzn.to" || host === "a.co") return true;
  if (host === "amazon.com") return true;
  // amazon.co.uk, amazon.de, amazon.com.mx, smile.amazon.com, etc.
  if (host.startsWith("amazon.")) return true;
  if (host.endsWith(".amazon.com") || host.includes(".amazon.")) return true;
  return false;
}

/**
 * Normalize user input into a canonical https Amazon URL, or null if invalid.
 * Accepts:
 * - Bare ASIN (B0XXXXXXXXX)
 * - amazon.com/... without scheme
 * - Full http(s) Amazon / amzn.to / a.co links
 */
export function normalizeAmazonStoreOrAsin(raw: string): string | null {
  const trimmed = raw.trim().replace(/^<|>$/g, "").replace(/\s+/g, "");
  if (!trimmed || trimmed.length > 500) return null;

  if (ASIN_PATTERN.test(trimmed)) {
    return `https://www.amazon.com/dp/${trimmed.toUpperCase()}`;
  }

  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return null;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (!isAmazonHostname(url.hostname)) return null;

  // Prefer https in stored value
  url.protocol = "https:";
  return url.toString();
}

export function isAmazonStoreOrAsin(value: string): boolean {
  return normalizeAmazonStoreOrAsin(value) !== null;
}

/** @deprecated Use isAmazonStoreOrAsin */
export const isAmazonStoreUrl = isAmazonStoreOrAsin;

/** Required Amazon storefront URL, product link, or ASIN. */
export const amazonStoreUrlSchema = z
  .string()
  .trim()
  .min(1, "Enter your Amazon storefront URL or ASIN.")
  .max(500, "Keep the link under 500 characters.")
  .superRefine((value, ctx) => {
    if (!normalizeAmazonStoreOrAsin(value)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: AMAZON_MESSAGE });
    }
  })
  .transform((value) => normalizeAmazonStoreOrAsin(value)!);

/**
 * Optional field — empty allowed; when present must be Amazon/ASIN.
 */
export const optionalAmazonStoreUrlSchema = z
  .string()
  .trim()
  .max(500, "Keep the link under 500 characters.")
  .superRefine((value, ctx) => {
    if (!value) return;
    if (!normalizeAmazonStoreOrAsin(value)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: AMAZON_MESSAGE });
    }
  })
  .transform((value) => (value ? normalizeAmazonStoreOrAsin(value)! : ""));
