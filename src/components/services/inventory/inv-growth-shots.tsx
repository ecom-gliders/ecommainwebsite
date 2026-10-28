import Image from "next/image";
import { BrowserProofStage } from "@/components/services/modules/browser-proof-stage";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import type { ServicePageConfig } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";

interface InvGrowthShotsProps {
  service: ServicePageConfig;
}

/** Growth windows that need inventory cover — dark terminal framing. */
export function InvGrowthShots({ service }: InvGrowthShotsProps) {
  const proof = service.modules?.find(
    (module) => module.type === "browserProof",
  );
  if (!proof || proof.type !== "browserProof" || proof.images.length === 0) {
    return null;
  }

  return (
    <section
      id="service-growth-proof"
      className={cn("bg-[#0c0c0b] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-growth-proof-heading"
    >
      <ServicePageShell>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent">
          Peak demand windows
        </p>
        <h2
          id="service-growth-proof-heading"
          className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-text-on-dark"
        >
          {proof.heading ?? "Growth windows that need inventory cover"}
        </h2>
        {proof.subheading ? (
          <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-text-on-dark/70">
            {proof.subheading}
          </p>
        ) : null}

        <div className="mt-8 border-2 border-accent/50 bg-[#141412] p-3 sm:p-4">
          <BrowserProofStage images={proof.images} callout={proof.callout} />
        </div>

        <ul
          className={cn(
            "mt-6 grid gap-4",
            proof.images.length === 1 && "max-w-md sm:grid-cols-1",
            proof.images.length === 2 && "sm:grid-cols-2",
            proof.images.length >= 3 && "sm:grid-cols-3",
          )}
        >
          {proof.images.map((image) => (
            <li
              key={image.src}
              className="relative aspect-[16/10] overflow-hidden border-2 border-accent/40 bg-[#141412]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain p-3"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
