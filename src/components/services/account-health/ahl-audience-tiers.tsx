import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface AhlAudienceTiersProps {
  service: ServicePageConfig;
}

const TIER_META = [
  {
    code: "T-01",
    src: "/images/services/amazon-account-health/ahl-audience-brand-v2.jpg",
  },
  {
    code: "T-02",
    src: "/images/services/amazon-account-health/ahl-ops-desk-v2.jpg",
  },
  {
    code: "T-03",
    src: "/images/services/amazon-account-health/ahl-evidence-folder-v2.jpg",
  },
  {
    code: "T-04",
    src: "/images/services/amazon-account-health/ahl-phase-monitor-v2.jpg",
  },
] as const;

/** Audience as compliance tier columns with stills. */
export function AhlAudienceTiers({ service }: AhlAudienceTiersProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

  const points = audience.points.slice(0, 4);

  return (
    <section
      id="service-audience"
      className={cn("bg-[#E6E6E0]", serviceSectionPad)}
      aria-labelledby="service-audience-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
              Compliance tiers
            </p>
            <h2
              id="service-audience-heading"
              className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
            >
              {audience.heading}
            </h2>
          </div>
          <p className="border-2 border-primary bg-background px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-[0.08em] text-primary">
            4 active tiers
          </p>
        </div>

        <ul className="mt-8 grid gap-0 overflow-hidden border-2 border-primary sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => {
            const tier = TIER_META[index] ?? TIER_META[0];
            return (
              <li
                key={point.title}
                className={cn(
                  "flex min-h-[17rem] flex-col bg-background",
                  index > 0 &&
                    "border-t-2 border-primary sm:border-t-0 sm:border-l-2",
                  index === 2 && "sm:border-t-2 lg:border-t-0",
                  index === 3 && "sm:border-t-2 lg:border-t-0",
                )}
              >
                <div className="relative h-32 w-full shrink-0 border-b-2 border-primary sm:h-36">
                  <Image
                    src={tier.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-primary/90 px-3 py-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
                      Tier
                    </span>
                    <span className="font-mono text-xs font-black text-text-on-dark">
                      {tier.code}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <span className="mb-3 h-1 w-10 bg-accent" aria-hidden="true" />
                  <h3 className="text-lg font-black leading-snug text-primary">
                    {point.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm font-medium leading-snug text-text-secondary sm:text-base">
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
