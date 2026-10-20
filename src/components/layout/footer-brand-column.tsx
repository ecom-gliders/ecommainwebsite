import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { SiteConfig } from "@/domain/content/schemas";
import { BrandLogo } from "@/components/design-system/brand-logo";
import { Badge } from "@/components/ui/badge";
import { FooterLink } from "@/components/layout/footer-link";

interface FooterBrandColumnProps {
  title: string;
  site: SiteConfig;
}

const socialLabels: Record<string, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
};

function partnerBadgeImageExists(imagePath: string): boolean {
  if (!imagePath.startsWith("/")) {
    return existsSync(imagePath);
  }

  return existsSync(join(process.cwd(), "public", imagePath));
}

export function FooterBrandColumn({ title, site }: FooterBrandColumnProps) {
  const partnerBadge = site.partnerBadges[0];
  const socialEntries = Object.entries(site.social).filter(
    ([, url]) => Boolean(url),
  );
  const showPartnerImage =
    partnerBadge?.image && partnerBadgeImageExists(partnerBadge.image);

  return (
    <div>
      <BrandLogo
        width={180}
        height={54}
        className="mb-4 h-10 w-auto sm:h-11"
        priority={false}
        surface="onDark"
      />
      <p className="text-sm font-bold text-text-on-dark">{title}</p>
      <p className="mt-2 text-sm font-medium leading-snug text-text-on-dark/65">
        {site.tagline}
      </p>

      {partnerBadge ? (
        <div className="mt-4">
          {showPartnerImage ? (
            <Image
              src={partnerBadge.image}
              alt={partnerBadge.label}
              width={240}
              height={72}
              className="h-14 w-auto rounded-md bg-text-on-dark px-2.5 py-1.5 sm:h-16"
              sizes="240px"
              quality={85}
              loading="lazy"
            />
          ) : (
            <Badge variant="outline">{partnerBadge.label}</Badge>
          )}
        </div>
      ) : null}

      {socialEntries.length > 0 ? (
        <ul className="mt-4 space-y-2" aria-label="Social media links">
          {socialEntries.map(([network, url]) => (
            <li key={network}>
              <FooterLink
                tone="onDark"
                className="text-base font-bold text-text-on-dark hover:text-accent"
                link={{
                  label: socialLabels[network] ?? network,
                  href: url as string,
                  external: true,
                }}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
