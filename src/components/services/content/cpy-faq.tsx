import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CpyFaqProps {
  service: ServicePageConfig;
}

const VOICE = [
  {
    label: "Clear",
    sample: "Waterproof · wide fit · grip sole",
    detail: "Facts a shopper can act on in one scan.",
  },
  {
    label: "Benefit-led",
    sample: "Keeps feet dry on wet trails",
    detail: "Outcome first, then the supporting spec.",
  },
  {
    label: "On-brand",
    sample: "Same voice across ASINs",
    detail: "Locked from approved examples before the batch.",
  },
];

/** Voice register legend + FAQ — not index-status or equal focus cards. */
export function CpyFaq({ service }: CpyFaqProps) {
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
          Content writing questions
        </h2>

        <ul
          className="mt-6 grid grid-cols-1 gap-0 overflow-hidden border-2 border-primary sm:grid-cols-3"
          aria-label="Voice register"
        >
          {VOICE.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "bg-[#F7F3EA] p-4",
                index > 0 &&
                  "border-t-2 border-primary sm:border-t-0 sm:border-l-2",
              )}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-black text-primary">{item.sample}</p>
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
