import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VidFaqProps {
  service: ServicePageConfig;
}

const PLACEMENT_LEGEND = [
  {
    label: "Listing / PDP",
    detail: "Education cuts sized for product detail modules.",
    src: "/images/services/amazon-video-creative/vid-faq-length.jpg",
  },
  {
    label: "Sponsored Brands",
    detail: "Hook-first autoplay with safe zones for overlays.",
    src: "/images/services/amazon-video-creative/vid-faq-ads.jpg",
  },
  {
    label: "DSP / upper funnel",
    detail: "Shorter proof arcs when retargeting is in scope.",
    src: "/images/services/amazon-video-creative/vid-faq-registry.jpg",
  },
] as const;

/** Placement legend + FAQ - not voice register cards. */
export function VidFaq({ service }: VidFaqProps) {
  if (service.faq.length === 0) return null;

  return (
    <section
      id="service-faq"
      className={cn("bg-[#1a1a18] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-faq-heading"
    >
      <ServicePageShell>
        <h2
          id="service-faq-heading"
          className="text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          Video creative questions
        </h2>

        <ul
          className="mt-6 grid grid-cols-1 gap-0 overflow-hidden border border-accent/40 sm:grid-cols-3"
          aria-label="Placement types"
        >
          {PLACEMENT_LEGEND.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "bg-[#222220] p-4",
                index > 0 &&
                  "border-t border-accent/30 sm:border-t-0 sm:border-l sm:border-accent/30",
              )}
            >
              <div className="relative mx-auto aspect-video w-full max-w-[11rem] overflow-hidden border border-accent/40">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>
              <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium leading-snug text-text-on-dark/75">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-8 grid gap-x-8 gap-y-0 border-t border-accent/30 sm:grid-cols-2">
          {service.faq.map((item) => (
            <div
              key={item.question}
              className="border-b border-text-on-dark/15 py-4"
            >
              <dt className="text-sm font-black text-text-on-dark sm:text-base">
                {item.question}
              </dt>
              <dd className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/70">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </ServicePageShell>
    </section>
  );
}
