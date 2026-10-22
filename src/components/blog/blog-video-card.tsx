interface BlogVideoCardProps {
  title: string;
  href: string;
  poster?: string;
  caption?: string;
  /** embed = in-page iframe (YouTube/Vimeo only); link = poster + outbound play */
  mode?: "embed" | "link";
}

function youtubeId(href: string): string | null {
  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname.startsWith("/embed/")) {
        return url.pathname.split("/")[2] || null;
      }
      return url.searchParams.get("v");
    }
    return null;
  } catch {
    return null;
  }
}

function vimeoId(href: string): string | null {
  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");
    if (host !== "vimeo.com" && host !== "player.vimeo.com") return null;
    const parts = url.pathname.split("/").filter(Boolean);
    if (host === "player.vimeo.com" && parts[0] === "video") {
      return parts[1] || null;
    }
    const id = parts.find((p) => /^\d+$/.test(p));
    return id || null;
  } catch {
    return null;
  }
}

function embedSrc(href: string): string | null {
  const yt = youtubeId(href);
  if (yt) {
    return `https://www.youtube-nocookie.com/embed/${yt}?rel=0`;
  }
  const vim = vimeoId(href);
  if (vim) {
    return `https://player.vimeo.com/video/${vim}?title=0&byline=0&portrait=0`;
  }
  return null;
}

export function BlogVideoCard({
  title,
  href,
  poster,
  caption,
  mode = "embed",
}: BlogVideoCardProps) {
  const embed = mode === "embed" ? embedSrc(href) : null;

  if (embed) {
    return (
      <figure className="my-8 border-2 border-primary bg-background shadow-[3px_3px_0_0_#131311]">
        <div className="relative aspect-video overflow-hidden bg-primary">
          <iframe
            src={embed}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <figcaption className="border-t-2 border-primary px-4 py-3">
          <p className="text-small font-semibold text-text-primary">{title}</p>
          {caption ? (
            <p className="mt-1 text-[12px] text-text-secondary">{caption}</p>
          ) : null}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="my-8 border-2 border-primary bg-background shadow-[3px_3px_0_0_#131311]">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-video overflow-hidden bg-primary"
      >
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element -- external poster URLs
          <img
            src={poster}
            alt=""
            className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-primary/90" />
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center border-2 border-primary bg-accent text-primary shadow-[3px_3px_0_0_#131311]">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
        <span className="sr-only">Watch: {title}</span>
      </a>
      <figcaption className="border-t-2 border-primary px-4 py-3">
        <p className="text-small font-semibold text-text-primary">{title}</p>
        {caption ? (
          <p className="mt-1 text-[12px] text-text-secondary">{caption}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}

/**
 * Body lines:
 * TITLE: … (optional)
 * MODE: embed | link (optional, default embed)
 * then: `title | href | optional poster | optional caption`
 */
export function parseVideoCardBody(body: string): BlogVideoCardProps | null {
  let mode: "embed" | "link" = "embed";
  let titleOverride: string | undefined;
  let dataLine: string | undefined;

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (/^TITLE:\s*/i.test(line)) {
      titleOverride = line.replace(/^TITLE:\s*/i, "").trim();
      continue;
    }
    if (/^MODE:\s*/i.test(line)) {
      const v = line.replace(/^MODE:\s*/i, "").trim().toLowerCase();
      mode = v === "link" ? "link" : "embed";
      continue;
    }
    if (!dataLine) dataLine = line;
  }

  if (!dataLine) return null;
  const parts = dataLine.split("|").map((p) => p.trim());
  if (parts.length < 2 || !parts[0] || !parts[1]) return null;

  return {
    title: titleOverride || parts[0],
    href: parts[1],
    poster: parts[2] || undefined,
    caption: parts[3] || undefined,
    mode,
  };
}
