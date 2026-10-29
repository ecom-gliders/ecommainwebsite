/**
 * Live https://ecomgliders.com still serves Logoipsum at /images/logo.png
 * until DNS cutover to this Next app. Discord must use a working asset origin.
 */
const FALLBACK_ASSET_ORIGIN = "https://ecom-gliders.vercel.app";

export function brandAssetOrigin(): string {
  const explicit = process.env.BRAND_ASSET_ORIGIN?.trim().replace(/\/$/, "");
  if (explicit) return explicit;

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim().replace(/\/$/, "") ||
    process.env.VERCEL_URL?.trim().replace(/\/$/, "");
  if (vercel) {
    return vercel.startsWith("http") ? vercel : `https://${vercel}`;
  }

  return FALLBACK_ASSET_ORIGIN;
}

/** Square mark for Discord avatar / thumbnail. */
export function brandMonogramUrl(): string {
  return `${brandAssetOrigin()}/images/brand/eg-monogram.png`;
}
