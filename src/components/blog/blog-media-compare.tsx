import Image from "next/image";

export interface MediaCompareSide {
  label: string;
  imageSrc?: string;
  imageAlt?: string;
  text?: string;
}

interface BlogMediaCompareProps {
  left: MediaCompareSide;
  right: MediaCompareSide;
}

function isOptimizable(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    const host = new URL(src).hostname;
    return host === "ecomgliders.com" || host === "www.ecomgliders.com";
  } catch {
    return false;
  }
}

function Side({ side }: { side: MediaCompareSide }) {
  return (
    <div className="border-2 border-primary bg-background p-4 shadow-[3px_3px_0_0_#131311]">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
        {side.label}
      </p>
      {side.imageSrc ? (
        <div className="relative mb-3 aspect-[4/3] overflow-hidden border border-border bg-surface-muted">
          {isOptimizable(side.imageSrc) ? (
            <Image
              src={side.imageSrc}
              alt={side.imageAlt || side.label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 360px"
              quality={75}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={side.imageSrc}
              alt={side.imageAlt || side.label}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>
      ) : null}
      {side.text ? (
        <p className="text-small text-text-primary">{side.text}</p>
      ) : null}
    </div>
  );
}

/** Side-by-side before/after, text vs image, or image vs image. */
export function BlogMediaCompare({ left, right }: BlogMediaCompareProps) {
  return (
    <div className="my-8 grid gap-3 md:grid-cols-2">
      <Side side={left} />
      <Side side={right} />
    </div>
  );
}

/**
 * Body:
 * ## Left label
 * image: /path.png
 * alt: ...
 * text: ...
 * ## Right label
 * ...
 */
export function parseMediaCompareBody(body: string): {
  left: MediaCompareSide;
  right: MediaCompareSide;
} | null {
  const sides: MediaCompareSide[] = [];
  let current: MediaCompareSide | null = null;

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const h = line.match(/^##\s+(.+)$/);
    if (h) {
      current = { label: h[1].trim() };
      sides.push(current);
      continue;
    }
    if (!current) continue;
    const img = line.match(/^image:\s*(.+)$/i);
    if (img) {
      current.imageSrc = img[1].trim();
      continue;
    }
    const alt = line.match(/^alt:\s*(.+)$/i);
    if (alt) {
      current.imageAlt = alt[1].trim();
      continue;
    }
    const text = line.match(/^text:\s*(.+)$/i);
    if (text) {
      current.text = text[1].trim();
      continue;
    }
    current.text = current.text ? `${current.text} ${line}` : line;
  }

  if (sides.length < 2) return null;
  return { left: sides[0], right: sides[1] };
}
