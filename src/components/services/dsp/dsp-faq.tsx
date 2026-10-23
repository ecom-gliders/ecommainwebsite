import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface DspFaqProps {
  service: ServicePageConfig;
}

const GATES = [
  { label: "Registry", detail: "Brand Registry path clear" },
  { label: "PPC base", detail: "Sponsored Ads disciplined" },
  { label: "Listings", detail: "Hero ASINs convert" },
  { label: "Creative", detail: "Display and video ready" },
  { label: "Budget", detail: "Awareness targets set" },
  { label: "Measure", detail: "View-through rules agreed" },
];

/**
 * FAQ: full-width equal readiness cards (no lime chips) + 2-col Q&A from JSON.
 */
export function DspFaq({ service }: DspFaqProps) {
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
          Questions about Amazon DSP
        </h2>

        <ul
          className="mt-5 grid grid-cols-2 gap-0 overflow-hidden border-2 border-primary sm:grid-cols-3"
          aria-label="Readiness gates"
        >
          {GATES.map((gate, index) => (
            <li
              key={gate.label}
              className={cn(
                "border-primary/20 bg-background px-3 py-3",
                index % 2 === 1 && "border-l-2 sm:border-l-0",
                index % 3 !== 0 && "sm:border-l-2",
                index >= 2 && "border-t-2 sm:border-t-0",
                index >= 3 && "sm:border-t-2",
              )}
            >
              <span className="font-mono text-[10px] font-bold text-text-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 text-sm font-black text-primary">{gate.label}</p>
              <p className="mt-0.5 text-xs font-medium text-text-secondary">
                {gate.detail}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-8 grid gap-x-8 gap-y-0 border-t-2 border-primary sm:grid-cols-2">
          {service.faq.map((item) => (
            <div
              key={item.question}
              className="border-b-2 border-primary py-5"
            >
              <dt className="text-base font-bold leading-snug text-primary">
                {item.question}
              </dt>
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
