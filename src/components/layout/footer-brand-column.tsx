import { existsSync } from "node:fs";
import { join } from "node:path";
import type { SiteConfig } from "@/domain/content/schemas";
import { PartnerBadgesRow } from "@/components/brand/partner-badges-row";
import { BrandLogo } from "@/components/design-system/brand-logo";
import { FooterSocialLinks } from "@/components/layout/footer-social-links";

function BrandContactBlock({ site }: { site: SiteConfig }) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-on-dark/45">
        Contact
      </p>
      <address className="flex flex-col not-italic">
        <p className="max-w-[18rem] text-sm font-medium leading-relaxed text-text-on-dark/80">
          {site.address.formatted}
        </p>
        <a
          href={`tel:${site.phone.tel}`}
          className="mt-2 inline-flex min-h-10 items-center text-sm font-medium text-text-on-dark/80 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {site.phone.display}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex min-h-10 items-center break-all text-sm font-medium text-text-on-dark/80 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {site.email}
        </a>
      </address>
    </div>
  );
}

interface FooterBrandColumnProps {
  title: string;
  site: SiteConfig;
}

function partnerBadgeImageExists(imagePath: string): boolean {
  if (!imagePath.startsWith("/")) {
    return existsSync(imagePath);
  }

  return existsSync(join(process.cwd(), "public", imagePath.replace(/^\//, "")));
}

/** Same column rhythm as the footer link directory (xl: 4 cols). */
const bandGridClass =
  "grid w-full grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 md:grid-cols-3 lg:gap-x-12 xl:grid-cols-4 xl:gap-x-10";

export function FooterBrandColumn({ title, site }: FooterBrandColumnProps) {
  const partnerBadges = site.partnerBadges.filter(
    (badge) => badge.image && partnerBadgeImageExists(badge.image),
  );
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
        <p className="max-w-[18rem] text-sm font-medium leading-relaxed text-text-on-dark/70">
          {site.tagline}
        </p>
      </div>

      {/* Col 2 — partner proof (no Free Audit; already in header / pre-footer / Company) */}
      <div className="flex min-w-0 flex-col gap-3">
        {partnerBadges.length > 0 ? (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-on-dark/45">
              Partners
            </p>
            <PartnerBadgesRow
              badges={partnerBadges}
              surface="dark"
              align="between"
              size="footer"
            />
          </>
        ) : null}
      </div>

      {/* Col 3 — Contact (kept out of the 8-column link directory below) */}
      <BrandContactBlock site={site} />

      {/* Col 4 — Follow (newsletter lives in pre-footer punch strip) */}
      {hasSocial ? (
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-on-dark/45">
            Follow
          </p>
          <FooterSocialLinks social={site.social} />
        </div>
      ) : null}
    </div>
  );
}
