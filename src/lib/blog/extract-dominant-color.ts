const FALLBACK = "#ECECE8";

function toCssRgb(r: number, g: number, b: number): string {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

/**
 * Derive a dominant RGB color from an already-decoded HTMLImageElement.
 * Downsamples to a 48×48 canvas, buckets colors (4-bit channels), returns
 * the most frequent non-near-white / non-transparent bucket as `rgb(r,g,b)`.
 *
 * Prefer sampling the Next.js-rendered `<img>` (`/_next/image`, same-origin)
 * so `getImageData` is not blocked by CORS.
 */
export function extractDominantColorFromImage(
  image: HTMLImageElement,
): string {
  if (!image.naturalWidth || !image.naturalHeight) return FALLBACK;

  const size = 48;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return FALLBACK;

  try {
    ctx.drawImage(image, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);
    const buckets = new Map<
      string,
      { count: number; r: number; g: number; b: number }
    >();

    let sumR = 0;
    let sumG = 0;
    let sumB = 0;
    let sumN = 0;

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha < 128) continue;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      sumR += r;
      sumG += g;
      sumB += b;
      sumN += 1;

      // Skip near-white so letterboxed product shots still pick a brand hue
      if (r > 248 && g > 248 && b > 248) continue;

      const key = `${r >> 4},${g >> 4},${b >> 4}`;
      const existing = buckets.get(key);
      if (existing) {
        existing.count += 1;
        existing.r += r;
        existing.g += g;
        existing.b += b;
      } else {
        buckets.set(key, { count: 1, r, g, b });
      }
    }

    let best: { count: number; r: number; g: number; b: number } | null = null;
    for (const bucket of buckets.values()) {
      if (!best || bucket.count > best.count) best = bucket;
    }

    if (best) {
      return toCssRgb(
        best.r / best.count,
        best.g / best.count,
        best.b / best.count,
      );
    }

    // Image was almost entirely white/transparent — use average instead of mute gray
    if (sumN > 0) {
      return toCssRgb(sumR / sumN, sumG / sumN, sumB / sumN);
    }

    return FALLBACK;
  } catch {
    // CORS / tainted canvas — fall back to surface muted
    return FALLBACK;
  }
}

export const DOMINANT_COLOR_FALLBACK = FALLBACK;
