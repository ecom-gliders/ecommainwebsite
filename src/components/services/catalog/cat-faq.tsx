import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CatFaqProps {
  service: ServicePageConfig;
}

const STATUS_LEGEND = [
  {
    label: "Live",
    detail: "Offer active and indexed for priority queries.",
    src: "/images/services/amazon-catalog-management/cat-faq-live.jpg",
  },
  {
    label: "At risk",
    detail: "Attributes or variation theme needs correction before spend scales.",
    src: "/images/services/amazon-catalog-management/cat-faq-risk.jpg",
  },
  {
    label: "Suppressed",
    detail: "ASIN hidden from search until remediation completes.",
    src: "/images/services/amazon-catalog-management/cat-faq-supp.jpg",
  },
] as const;

/** Buyability status legend + FAQ - not voice register cards. */
export function CatFaq({ service }: CatFaqProps) {
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
          Catalog management questions
        </h2>

        <ul
          className="mt-6 grid grid-cols-1 gap-0 overflow-hidden border-2 border-primary sm:grid-cols-3"
          aria-label="Listing status legend"
        >
          {STATUS_LEGEND.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "p-4",
                item.label === "Live" && "bg-accent text-primary",
                item.label === "At risk" && "bg-[#FFF8E6] text-primary",
                item.label === "Suppressed" && "bg-[#F4F4F4] text-primary",
                index > 0 &&
                  "border-t-2 border-primary sm:border-t-0 sm:border-l-2",
              )}
            >
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[11rem] overflow-hidden border-2 border-primary">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className={cn(
                    "object-cover",
                    item.label === "Suppressed" && "grayscale opacity-80",
                  )}
                  sizes="176px"
                />
              </div>
              <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                Status
              </p>
              <p className="mt-2 text-sm font-black">{item.label}</p>
              <p className="mt-1.5 text-sm font-medium text-text-secondary">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-8 grid gap-x-8 gap-y-0 border-t-2 border-primary sm:grid-cols-2">
          {service.faq.map((item) => (
            <div
              key={item.question}
              className="border-b-2 border-primary/15 py-4"
            >
              <dt className="text-sm font-black text-primary sm:text-base">
                {item.question}
              </dt>
              <dd className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </ServicePageShell>
    </section>
  );
}
