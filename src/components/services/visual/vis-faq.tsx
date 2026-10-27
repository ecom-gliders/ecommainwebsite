import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VisFaqProps {
  service: ServicePageConfig;
}

const SLOT_LEGEND = [
  {
    slot: "Main",
    rule: "White fill - product 85%+",
    src: "/images/services/amazon-visual-creativity/vis-faq-main.jpg",
  },
  {
    slot: "Secondary",
    rule: "One job per frame",
    src: "/images/services/amazon-visual-creativity/vis-faq-secondary.jpg",
  },
  {
    slot: "Mobile",
    rule: "Type legible at phone width",
    src: "/images/services/amazon-visual-creativity/vis-faq-mobile.jpg",
  },
] as const;

/** Amazon image slot legend + FAQ - not voice register cards. */
export function VisFaq({ service }: VisFaqProps) {
  if (service.faq.length === 0) return null;

  return (
    <section
      id="service-faq"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-faq-heading"
    >
      <ServicePageShell>
        <h2
          id="service-faq-heading"
          className="text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.9rem]"
        >
          Visual creative questions
        </h2>

        <ul
          className="mt-6 grid grid-cols-1 gap-0 overflow-hidden border-2 border-accent sm:grid-cols-3"
          aria-label="Image slot rules"
        >
          {SLOT_LEGEND.map((item, index) => (
            <li
              key={item.slot}
              className={cn(
                "bg-[#1a1a18] p-4",
                index > 0 &&
                  "border-t-2 border-accent sm:border-t-0 sm:border-l-2",
              )}
            >
              <div className="relative mx-auto h-20 w-20 overflow-hidden border-2 border-accent/50">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
                {item.slot}
              </p>
              <p className="mt-1 text-base font-medium text-text-on-dark/85">
                {item.rule}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-8 grid gap-x-8 gap-y-0 border-t-2 border-accent/40 sm:grid-cols-2">
          {service.faq.map((item) => (
            <div
              key={item.question}
              className="border-b border-accent/25 py-4"
            >
              <dt className="text-lg font-black text-text-on-dark sm:text-lg">
                {item.question}
              </dt>
              <dd className="mt-1.5 text-base font-medium leading-snug text-text-on-dark/75">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </ServicePageShell>
    </section>
  );
}
