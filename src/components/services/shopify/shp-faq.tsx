import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ShpFaqProps {
  service: ServicePageConfig;
}

const CHANNEL_NOTES = [
  {
    label: "Complement",
    detail: "Shopify supports brand and retention alongside Amazon growth.",
  },
  {
    label: "Rebuild",
    detail: "Existing stores can be refined when speed or conversion lags.",
  },
  {
    label: "Align",
    detail: "Owned-site copy can mirror proven Amazon product points.",
  },
];

/** Equal bordered FAQ cards — no lime chip strips. */
export function ShpFaq({ service }: ShpFaqProps) {
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
          className="text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          Shopify development questions
        </h2>

        <ul
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
          aria-label="Channel fit notes"
        >
          {CHANNEL_NOTES.map((item) => (
            <li
              key={item.label}
              className="border-2 border-text-on-dark/30 bg-[#1a1a18] p-4"
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium leading-snug text-text-on-dark/85">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-8 space-y-0 border-2 border-text-on-dark/25">
          {service.faq.map((item, index) => (
            <div
              key={item.question}
              className={cn(
                "border-text-on-dark/25 bg-[#1a1a18] p-4 sm:p-5",
                index > 0 && "border-t-2",
              )}
            >
              <dt className="text-base font-black text-text-on-dark">{item.question}</dt>
              <dd className="mt-2 text-sm font-medium leading-relaxed text-text-on-dark/80">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </ServicePageShell>
    </section>
  );
}
