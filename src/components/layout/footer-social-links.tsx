import type { ComponentType, SVGProps } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/icons/social-icons";
import { cn } from "@/lib/utils";

type SocialNetwork = "facebook" | "linkedin" | "instagram";

interface FooterSocialLinksProps {
  social: Partial<Record<SocialNetwork, string | undefined>>;
  className?: string;
}

type SocialIconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { title?: string }
>;

const socialConfig: Record<
  SocialNetwork,
  {
    label: string;
    Icon: SocialIconComponent;
  }
> = {
  facebook: { label: "Facebook", Icon: FacebookIcon },
  linkedin: { label: "LinkedIn", Icon: LinkedInIcon },
  instagram: { label: "Instagram", Icon: InstagramIcon },
};

const networkOrder: SocialNetwork[] = ["facebook", "linkedin", "instagram"];

/**
 * Icon-only social row for footer chrome.
 * Brand SVGs (Simple Icons / CC0) — Lucide no longer ships trademarked brand icons.
 */
export function FooterSocialLinks({ social, className }: FooterSocialLinksProps) {
  const entries = networkOrder
    .map((network) => {
      const href = social[network];
      if (!href) return null;
      return { network, href, ...socialConfig[network] };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  if (entries.length === 0) {
    return null;
  }

  return (
    <ul
      className={cn("flex flex-wrap items-center gap-1.5", className)}
      aria-label="Social media"
    >
      {entries.map(({ network, href, label, Icon }) => (
        <li key={network}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            className="inline-flex size-10 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] text-text-on-dark/85 transition-colors hover:border-accent/50 hover:bg-white/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:size-11"
          >
            <Icon aria-hidden="true" className="size-[1.125rem] sm:size-5" />
            <span className="sr-only">{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
