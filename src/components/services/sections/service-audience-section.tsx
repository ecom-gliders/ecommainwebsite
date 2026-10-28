import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import type { ServicePageConfig } from "@/domain/content/schemas";
import { resolveBlockImage } from "@/lib/services/resolve-block-image";
import { cn } from "@/lib/utils";
import { serviceHardPanel } from "../service-hard-panel";

interface ServiceAudienceSectionProps {
  audience: NonNullable<ServicePageConfig["audience"]>;
}

/**
 * Who-for cards in a compact grid — images kept short so the band stays tight.
 */
export function ServiceAudienceSection({ audience }: ServiceAudienceSectionProps) {
  return (
    <SectionShell
      id="service-audience"
      tone="muted"
      ariaLabelledBy="service-audience-heading"
      className="py-10 sm:py-12 lg:py-14"
    >
      <SectionHeading
        kicker="Who it is for"
        heading={audience.heading}
        headingId="service-audience-heading"
      />
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
        {audience.points.map((point, index) => {
          const image = resolveBlockImage(point.title, index, {
            src: point.image,
            alt: point.imageAlt,
          });

          return (
            <li
              key={point.title}
              id={`audience-${index}`}
              className={cn(
                serviceHardPanel,
                "overflow-hidden bg-background",
              )}
            >
              <div className="relative aspect-[16/8] w-full border-b-2 border-primary bg-surface-muted">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={70}
                />
              </div>
              <div className="flex gap-3 p-3.5 sm:p-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] border-2 border-primary bg-accent text-xs font-bold text-primary"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold leading-snug text-primary">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-snug text-text-secondary">
                    {point.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
