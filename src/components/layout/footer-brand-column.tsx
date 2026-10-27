import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { SiteConfig } from "@/domain/content/schemas";
import { BrandLogo } from "@/components/design-system/brand-logo";
import { FooterSocialLinks } from "@/components/layout/footer-social-links";
import { Badge } from "@/components/ui/badge";

interface FooterBrandColumnProps {
  title: string;
  site: SiteConfig;
}

function partnerBadgeImageExists(imagePath: string): boolean {
  if (!imagePath.startsWith("/")) {
    return existsSync(imagePath);
  }

  return existsSync(join(process.cwd(), "public", imagePath));
}

/** Same column rhythm as the footer link directory (xl: 4 cols). */
const bandGridClass =
  "grid w-full grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 md:grid-cols-3 lg:gap-x-12 xl:grid-cols-4 xl:gap-x-10";

export function FooterBrandColumn({ title, site }: FooterBrandColumnProps) {
  const partnerBadge = site.partnerBadges[0];
  const showPartnerImage =
    partnerBadge?.image && partnerBadgeImageExists(partnerBadge.image);
  const hasSocial = Object.values(site.social).some(Boolean);

  return (
    <div className={bandGridClass}>
      {/* Col 1 — aligns with Advertising */}
      <div className="flex min-w-0 flex-col gap-3">
        <BrandLogo
          className="shrink-0 text-[1.6rem] sm:text-[1.85rem]"
          priority={false}
          surface="onDark"
        />
        <p className="sr-only">{title}</p>
        <p className="max-w-[18rem] text-[15px] font-medium leading-relaxed text-text-on-dark/70 sm:text-sm">
          {site.tagline}
        </p>
      </div>

      {/* Col 2 — partner proof (no Free Audit; already in header / pre-footer / Company) */}
      <div className="flex min-w-0 flex-col gap-3">
        {partnerBadge ? (
          <>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-on-dark/45">
              Partner
            </p>
            {showPartnerImage ? (
              <Image
                src={partnerBadge.image}
                alt={partnerBadge.label}
                width={240}
                height={72}
                className="h-11 w-auto max-w-full rounded-md bg-text-on-dark px-2.5 py-1.5 object-contain sm:h-12"
                sizes="240px"
                quality={85}
                loading="lazy"
              />
            ) : (
              <Badge variant="outline">{partnerBadge.label}</Badge>
            )}
          </>
        ) : null}
      </div>

      {/* Col 3 — spacer on xl so Follow lands under Brand and Channels / Contact edge */}
      <div className="hidden min-w-0 xl:block" aria-hidden="true" />

      {/* Col 4 — Follow, outer-right aligned with last directory column */}
      {hasSocial ? (
        <div className="flex min-w-0 flex-col gap-3 sm:col-span-2 md:col-span-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-on-dark/45">
            Follow
          </p>
          <FooterSocialLinks social={site.social} />
        </div>
      ) : null}
    </div>
  );
}
