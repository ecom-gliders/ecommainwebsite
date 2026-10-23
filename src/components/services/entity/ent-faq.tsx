import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EntFaqProps {
  service: ServicePageConfig;
}

const BOUNDARY_LEGEND = [
  {
    label: "Process guidance",
    detail: "Formation sequencing and document organization for sellers.",
  },
  {
    label: "Not legal advice",
    detail: "Entity choice and tax treatment require qualified professionals when needed.",
  },
  {
    label: "Amazon handoff",
    detail: "Seller Central and Brand Registry planning after entity foundations.",
  },
] as const;

export function EntFaq({ service }: EntFaqProps) {
  if (service.faq.length === 0) return null;

  return (
    <section
      id="service-faq"
      className={cn("bg-[#EDE8DF]", serviceSectionPad)}
      aria-labelledby="service-faq-heading"
    >
      <ServicePageShell>
        <h2
          id="service-faq-heading"
          className="text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          Company registration questions
        </h2>

        <ul
          className="mt-6 grid grid-cols-1 gap-0 overflow-hidden border-2 border-primary sm:grid-cols-3"
          aria-label="Service boundary legend"
        >
          {BOUNDARY_LEGEND.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "bg-background p-4",
                index > 0 && "border-t-2 border-primary sm:border-l-2 sm:border-t-0",
              )}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-text-secondary">
                {item.label}
              </p>
              <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-8 divide-y-2 divide-primary border-2 border-primary bg-background">
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
