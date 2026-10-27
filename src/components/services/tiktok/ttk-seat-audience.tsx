import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface TtkSeatAudienceProps {
  service: ServicePageConfig;
}

const SEATS = [
  {
    label: "Creator seat",
    src: "/images/services/tiktok-shop-ads/ttk-phone-hook.jpg",
  },
  {
    label: "Brand seat",
    src: "/images/services/tiktok-shop-ads/ttk-phone-demo.jpg",
  },
  {
    label: "Ops seat",
    src: "/images/services/tiktok-shop-ads/ttk-phone-scale.jpg",
  },
  {
    label: "Amazon seat",
    src: "/images/services/tiktok-shop-ads/ttk-phone-refresh.jpg",
  },
] as const;

/** Audience seats with real phone stills — no empty black placeholders. */
export function TtkSeatAudience({ service }: TtkSeatAudienceProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

  const points = audience.points.slice(0, 4);

  return (
    <section
      id="service-audience"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-audience-heading"
    >
      <ServicePageShell>
        <h2
          id="service-audience-heading"
          className="max-w-3xl text-[clamp(1.5rem,2.8vw,1.85rem)] font-black tracking-tight text-primary"
        >
          {audience.heading}
        </h2>

        <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {points.map((point, index) => {
            const seat = SEATS[index] ?? SEATS[0];
            return (
              <li
                key={point.title}
                className="flex flex-col border-2 border-primary bg-[#F4F4F4] p-3 sm:p-4"
              >
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                  {seat.label}
                </p>
                <div className="relative mx-auto mt-3 aspect-[9/16] w-full max-w-[5rem] overflow-hidden border-2 border-primary sm:max-w-[5.5rem]">
                  <Image
                    src={seat.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="88px"
                  />
                </div>
                <h3 className="mt-3 text-sm font-black leading-snug text-primary sm:text-base">
                  {point.title}
                </h3>
                <p className="mt-2 flex-1 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
                  {point.description}
                </p>
              </li>
            );
          })}
        </ul>
      </ServicePageShell>
    </section>
  );
}
