import { cn } from "@/lib/utils";

const BEEHIIV_EMBED_BASE =
  process.env.NEXT_PUBLIC_BEEHIIV_EMBED_URL?.trim() ||
  "https://embeds.beehiiv.com/b67089b0-4fe7-450e-bf60-7cb7fbc1e708";

function beehiivSlimSrc(base: string): string {
  try {
    const url = new URL(base);
    url.searchParams.set("slim", "true");
    return url.toString();
  } catch {
    return base.includes("?")
      ? `${base}&slim=true`
      : `${base}?slim=true`;
  }
}

interface FooterNewsletterProps {
  className?: string;
}

/**
 * Beehiiv slim iframe only — no paid API.
 * Official slim embed: height 52, transparent, no iframe radius.
 */
export function FooterNewsletter({ className }: FooterNewsletterProps) {
  return (
    <div
      className={cn(
        "w-full max-w-full overflow-hidden rounded-[12px] border-2 border-accent bg-transparent shadow-[4px_4px_0_0_#C6FD50] sm:max-w-[26rem]",
        className,
      )}
    >
      <iframe
        src={beehiivSlimSrc(BEEHIIV_EMBED_BASE)}
        title="Subscribe to the eCom Gliders newsletter"
        data-test-id="beehiiv-embed"
        width="100%"
        height={52}
        frameBorder={0}
        scrolling="no"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full max-w-full border-0 bg-transparent"
        style={{
          margin: 0,
          borderRadius: "0px",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}
