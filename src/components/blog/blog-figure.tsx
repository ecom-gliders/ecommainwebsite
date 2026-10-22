import Image from "next/image";

interface BlogFigureProps {
  src: string;
  alt: string;
  caption?: string;
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

export function BlogFigure({ src, alt, caption }: BlogFigureProps) {
  if (!src) return null;

  return (
    <figure className="my-8">
      <div className="relative aspect-[16/9] overflow-hidden border-2 border-primary bg-surface-muted shadow-[3px_3px_0_0_#131311]">
        {isOptimizable(src) ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
            quality={75}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-small text-text-secondary">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Body: `src | alt | optional caption` */
export function parseFigureBody(body: string): {
  src: string;
  alt: string;
  caption?: string;
} | null {
  const line = body.split("\n").map((l) => l.trim()).find(Boolean);
  if (!line) return null;
  const parts = line.split("|").map((p) => p.trim());
  if (parts.length < 2 || !parts[0]) return null;
  return {
    src: parts[0],
    alt: parts[1] || "Article image",
    caption: parts[2],
  };
}
