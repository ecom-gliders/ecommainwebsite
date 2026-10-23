import Image from "next/image";
import { BrowserProofStage } from "@/components/services/modules/browser-proof-stage";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";

interface FsGrowthShotsProps {
  service: ServicePageConfig;
}

/**
 * Live Seller / growth.ecomgliders screenshots from service modules.
 * Callout stage + full image strip so every shot is visible.
 */
export function FsGrowthShots({ service }: FsGrowthShotsProps) {
  const proof = service.modules?.find((module) => module.type === "browserProof");
  if (!proof || proof.type !== "browserProof" || proof.images.length === 0) {
    return null;
  }

  return (
    <section
      id="service-growth-proof"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-growth-proof-heading"
    >
      <ServicePageShell>
        <h2
          id="service-growth-proof-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {proof.heading ?? "Account-scale proof from live Seller tools"}
        </h2>
        {proof.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-text-secondary sm:text-base">
            {proof.subheading}
          </p>
        ) : null}

        <div className="mt-8">
          <BrowserProofStage
            images={proof.images}
            callout={proof.callout}
          />
        </div>

        <ul
          className={cn(
            "mt-6 grid gap-4",
            proof.images.length === 1 && "sm:grid-cols-1 max-w-md",
            proof.images.length === 2 && "sm:grid-cols-2",
            proof.images.length >= 3 && "sm:grid-cols-3",
          )}
        >
          {proof.images.map((image) => (
            <li
              key={image.src}
              className="overflow-hidden border-2 border-primary bg-[#F4F4F4] shadow-[3px_3px_0_0_#131311]"
            >
              <div className="relative aspect-[4/5] w-full bg-primary/5 sm:aspect-[3/4]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-top"
                />
              </div>
              <p className="border-t-2 border-primary px-3 py-2.5 text-xs font-medium leading-snug text-text-secondary">
                {image.alt}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
