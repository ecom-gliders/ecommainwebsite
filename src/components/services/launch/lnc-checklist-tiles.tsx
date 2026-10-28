import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LncChecklistTilesProps {
  service: ServicePageConfig;
}

const CHECK_META = [
  {
    tag: "Gate",
    src: "/images/services/amazon-product-launch-services/lnc-del-gate-v2.jpg",
  },
  {
    tag: "Ads",
    src: "/images/services/amazon-product-launch-services/lnc-del-ads-v2.jpg",
  },
  {
    tag: "Stock",
    src: "/images/services/amazon-product-launch-services/lnc-del-stock-v2.jpg",
  },
  {
    tag: "Offer",
    src: "/images/services/amazon-product-launch-services/lnc-del-offer-v2.jpg",
  },
  {
    tag: "Rank",
    src: "/images/services/amazon-product-launch-services/lnc-del-rank-v2.jpg",
  },
  {
    tag: "Board",
    src: "/images/services/amazon-product-launch-services/lnc-del-board-v2.jpg",
  },
  {
    tag: "Handoff",
    src: "/images/services/amazon-product-launch-services/lnc-del-handoff-v2.jpg",
  },
  {
    tag: "Scope",
    src: "/images/services/amazon-product-launch-services/lnc-del-scope-v2.jpg",
  },
] as const;

/** Launch checklist deliverable tiles - not paper stack or Shop format cards. */
export function LncChecklistTiles({ service }: LncChecklistTilesProps) {
  const { deliverables } = service;
  const items = deliverables.items;

  return (
    <section
      id="service-deliverables"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-deliverables-heading"
    >
      <ServicePageShell>
        <h2
          id="service-deliverables-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {deliverables.heading}
        </h2>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const meta = CHECK_META[index % CHECK_META.length];
            return (
              <li
                key={item.title}
                className="flex flex-col overflow-hidden border-2 border-primary bg-[#F4F4F4]"
              >
                <div className="relative aspect-[16/10] w-full border-b-2 border-primary bg-[#EDE8DF]">
                  <Image
                    src={meta.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                      {meta.tag}
                    </span>
                    <span
                      className="flex h-4 w-4 shrink-0 items-center justify-center border-2 border-primary bg-accent"
                      aria-hidden="true"
                    >
                      <span className="block h-2 w-1 translate-y-[-1px] rotate-45 border-b-2 border-r-2 border-primary" />
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-xs font-bold tabular-nums text-text-secondary/70">
                    Item {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-sm font-black leading-snug text-primary sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
                    {item.description}
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
