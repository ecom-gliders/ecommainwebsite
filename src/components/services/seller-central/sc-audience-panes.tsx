import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ScAudiencePanesProps {
  service: ServicePageConfig;
}

const PANE_IMAGES = [
  "/images/services/amazon-seller-central-services/sc-aud-cases.jpg",
  "/images/services/amazon-seller-central-services/sc-aud-listing.jpg",
  "/images/services/amazon-seller-central-services/sc-aud-promo.jpg",
  "/images/services/amazon-seller-central-services/sc-aud-ops.jpg",
] as const;

export function ScAudiencePanes({ service }: ScAudiencePanesProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

  return (
    <section
      id="service-audience"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-audience-heading"
    >
      <ServicePageShell>
        <h2
          id="service-audience-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {audience.heading}
        </h2>
        <ul className="mt-8 grid grid-cols-1 overflow-hidden border-2 border-primary sm:grid-cols-2 lg:grid-cols-4">
          {audience.points.map((point, index) => (
            <li
              key={point.title}
              className={cn(
                "flex flex-col bg-[#E8E8E4]",
                index > 0 && "border-t-2 border-primary sm:border-t-0",
                index % 2 === 1 && "sm:border-l-2 sm:border-primary",
                index >= 2 && "sm:border-t-2 lg:border-t-0",
                index > 0 && "lg:border-l-2 lg:border-primary",
              )}
            >
              <div className="relative aspect-[4/3] w-full border-b-2 border-primary bg-[#F0F0EC]">
                <Image
                  src={PANE_IMAGES[index % PANE_IMAGES.length]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <span
                  className="w-fit border-2 border-primary bg-background px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-text-secondary"
                  aria-hidden="true"
                >
                  Pane {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-black leading-snug text-primary">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                  {point.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
