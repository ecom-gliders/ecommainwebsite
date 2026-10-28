import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LncFaqProps {
  service: ServicePageConfig;
}

const PHASE_LEGEND = [
  {
    label: "Prep",
    detail: "Listing, offer, and inventory gates before paid traffic.",
    src: "/images/services/amazon-product-launch-services/lnc-phase-prep-v2.jpg",
  },
  {
    label: "Push",
    detail: "Spend scaled only when stock and conversion can support it.",
    src: "/images/services/amazon-product-launch-services/lnc-phase-push-v2.jpg",
  },
  {
    label: "Stabilize",
    detail: "Handoff into ongoing PPC, inventory, and reporting cadence.",
    src: "/images/services/amazon-product-launch-services/lnc-phase-stabilize-v2.jpg",
  },
] as const;

/** Launch phase legend equal cards + FAQ - no lime chip strips. */
export function LncFaq({ service }: LncFaqProps) {
  if (service.faq.length === 0) return null;

  return (
    <section
      id="service-faq"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-faq-heading"
    >
      <ServicePageShell>
        <h2
          id="service-faq-heading"
          className="text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          Product launch questions
        </h2>

        <ul
          className="mt-6 grid grid-cols-1 gap-0 overflow-hidden border-2 border-primary sm:grid-cols-3"
          aria-label="Launch phase roles"
        >
          {PHASE_LEGEND.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "border-b border-primary/20 p-4 sm:border-b-0 sm:border-r sm:last:border-r-0",
                index === 1 && "bg-[#F4F4F4]",
              )}
            >
              <div className="relative mx-auto aspect-video w-full max-w-[12rem] overflow-hidden border-2 border-primary">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
              <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.08em] text-text-secondary">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium leading-snug text-text-secondary">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-8 divide-y divide-primary/15 border-2 border-primary">
          {service.faq.map((item) => (
            <div key={item.question} className="p-4 sm:p-5">
              <dt className="text-base font-black text-primary">{item.question}</dt>
              <dd className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </ServicePageShell>
    </section>
  );
}
