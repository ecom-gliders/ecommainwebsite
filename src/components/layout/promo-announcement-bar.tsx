import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SiteConfig } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";

type PromoConfig = NonNullable<SiteConfig["announcementBar"]["promo"]>;

interface PromoAnnouncementBarProps {
  promo: PromoConfig;
}

const RAIL =
  "relative hidden w-28 shrink-0 self-stretch overflow-visible sm:block lg:w-36";

/**
 * Clean 3-zone flash promo — equal image rails, center copy + CTA.
 * Images/copy swap via site.json → announcementBar.promo.
 */
export function PromoAnnouncementBar({ promo }: PromoAnnouncementBarProps) {
  const eyebrow = promo.eyebrow?.trim();

  const ctaClassName = cn(
    "promo-cta-pulse relative z-[1] inline-flex h-9 shrink-0 items-center justify-center gap-1.5",
    "rounded-[10px] border-2 border-primary bg-[#E23B3B] px-4",
    "text-xs font-bold uppercase tracking-[0.04em] text-white",
    "hover:bg-[#F04A4A] sm:h-10 sm:px-5 sm:text-xs",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
  );

  const ctaInner = (
    <>
      {promo.cta.label}
      <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
    </>
  );

  const cta = promo.ctaExternal ? (
    <a
      href={promo.cta.href}
      target="_blank"
      rel="noopener noreferrer"
      className={ctaClassName}
    >
      {ctaInner}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={promo.cta.href} className={ctaClassName}>
      {ctaInner}
    </Link>
  );

  return (
    <div
      className="relative overflow-hidden border-b border-accent bg-primary text-text-on-dark"
      role="region"
      aria-label={promo.headline}
    >
      <div
        aria-hidden="true"
        className="promo-shimmer pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="container-page relative flex min-h-[4.25rem] items-stretch gap-2.5 sm:min-h-[4.75rem] sm:gap-3 lg:gap-4">
        {/* Left rail — team + stamp overlay */}
        {promo.leftImage ? (
          <div className={RAIL}>
            <div className="relative h-full w-full">
              <div className="absolute inset-x-0 bottom-0 top-0">
                <Image
                  src={promo.leftImage}
                  alt={promo.leftImageAlt ?? ""}
                  fill
                  className="object-contain object-bottom"
                  sizes="144px"
                  quality={85}
                  priority
                />
              </div>
              {promo.badgeImage ? (
                <div className="absolute bottom-1.5 right-0 z-[1] h-9 w-9 rotate-[-8deg] sm:h-10 sm:w-10">
                  <Image
                    src={promo.badgeImage}
                    alt={promo.badgeImageAlt || "Audit"}
                    fill
                    className="object-contain"
                    sizes="40px"
                    quality={85}
                    priority
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Center — copy + CTA */}
        <div className="flex min-w-0 flex-1 items-center gap-2.5 py-1.5 sm:gap-4 sm:py-2">
          {promo.badgeImage ? (
            <div className="relative h-8 w-8 shrink-0 rotate-[-8deg] sm:hidden">
              <Image
                src={promo.badgeImage}
                alt={promo.badgeImageAlt || "Audit"}
                fill
                className="object-contain"
                sizes="32px"
                quality={85}
                priority
              />
            </div>
          ) : null}

          <div className="min-w-0 flex-1">
            {eyebrow ? (
              <span className="mb-0.5 block text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                {eyebrow}
              </span>
            ) : null}
            <p className="text-sm font-black leading-[1.15] tracking-[-0.03em] text-text-on-dark sm:text-base lg:text-lg">
              {promo.headline}
            </p>
            {promo.body ? (
              <p className="mt-0.5 line-clamp-2 max-w-xl text-xs leading-snug text-text-on-dark/65 sm:line-clamp-1">
                {promo.body}
              </p>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center">{cta}</div>
        </div>

        {/* Right rail — packages cutout */}
        {promo.rightImage ? (
          <div className={RAIL}>
            <div className="absolute inset-0">
              <Image
                src={promo.rightImage}
                alt={promo.rightImageAlt ?? ""}
                fill
                className="object-contain object-bottom"
                sizes="144px"
                quality={85}
                priority
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-primary to-transparent"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
