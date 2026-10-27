import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LncPadAudienceProps {
  service: ServicePageConfig;
}

const PAD_META = [
  {
    label: "Listing pad",
    src: "/images/services/amazon-product-launch-services/lnc-pad-listing-v2.jpg",
  },
  {
    label: "Ads pad",
    src: "/images/services/amazon-product-launch-services/lnc-pad-ads-v2.jpg",
  },
  {
    label: "Inventory pad",
    src: "/images/services/amazon-product-launch-services/lnc-pad-stock-v2.jpg",
  },
  {
    label: "Ops pad",
    src: "/images/services/amazon-product-launch-services/lnc-pad-ops-v2.jpg",
  },
] as const;

/** Launch roles as equal pad stations - not phone seats or passport stamps. */
export function LncPadAudience({ service }: LncPadAudienceProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

  const points = audience.points.slice(0, 4);

  return (
    <section
      id="service-audience"
      className={cn("bg-[#EDE8DF]", serviceSectionPad)}
      aria-labelledby="service-audience-heading"
    >
      <ServicePageShell>
        <h2
          id="service-audience-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {audience.heading}
        </h2>

        <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {points.map((point, index) => {
            const pad = PAD_META[index] ?? PAD_META[0];
            return (
              <li
                key={point.title}
                className="flex min-h-[14rem] flex-col overflow-hidden border-2 border-primary bg-[#0c0c0b] text-text-on-dark"
              >
                <div className="relative aspect-[4/3] w-full border-b border-accent/30">
                  <Image
                    src={pad.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <p className="absolute left-2 top-2 border border-accent/60 bg-primary/80 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-accent">
                    {pad.label}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="font-mono text-[8px] font-bold uppercase text-text-on-dark/40">
                    Station {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-sm font-black leading-snug text-text-on-dark sm:text-base">
                    {point.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs font-medium leading-snug text-text-on-dark/70 sm:text-sm">
                    {point.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </ServicePageShell>
    </section>
  );
}
