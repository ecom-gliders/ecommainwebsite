import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface BrdFaqProps {
  service: ServicePageConfig;
}

const ENROLLMENT_STATES = [
  {
    label: "Not started",
    detail: "No eligible trademark record yet - pathway starts with readiness review.",
    src: "/images/services/amazon-trademark-brand-registry/brd-faq-notstart.jpg",
  },
  {
    label: "Pending mark",
    detail: "Application in progress - enrollment timing depends on office and Amazon rules.",
    src: "/images/services/amazon-trademark-brand-registry/brd-faq-pending.jpg",
  },
  {
    label: "Registered",
    detail: "Qualifying record on file - focus shifts to Seller Central alignment.",
    src: "/images/services/amazon-trademark-brand-registry/brd-faq-registered.jpg",
  },
] as const;

/** Enrollment-state legend + FAQ - not voice register or index legend. */
export function BrdFaq({ service }: BrdFaqProps) {
  if (service.faq.length === 0) return null;

  return (
    <section
      id="service-faq"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-faq-heading"
    >
      <ServicePageShell>
        <h2
          id="service-faq-heading"
          className="text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          Brand Registry questions
        </h2>

        <ul
          className="mt-6 grid grid-cols-1 gap-0 overflow-hidden border-2 border-primary sm:grid-cols-3"
          aria-label="Typical enrollment states"
        >
          {ENROLLMENT_STATES.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "bg-[#FAF6EF] p-4",
                index > 0 &&
                  "border-t-2 border-primary sm:border-t-0 sm:border-l-2",
              )}
            >
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[11rem] overflow-hidden border-2 border-primary">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>
              <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                {item.label}
              </p>
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
