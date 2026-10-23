import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface AosFaqProps {
  service: ServicePageConfig;
}

const COVERAGE = [
  {
    label: "Weekly board",
    detail: "Owners, blockers, and hand-offs in one review.",
  },
  {
    label: "Shared priorities",
    detail: "ASINs and actions every specialist uses.",
  },
  {
    label: "Escalation path",
    detail: "Option to consolidate into full-service.",
  },
];

export function AosFaq({ service }: AosFaqProps) {
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
          Account operations questions
        </h2>

        <ul
          className="mt-5 grid grid-cols-1 gap-0 overflow-hidden border-2 border-primary sm:grid-cols-3"
          aria-label="Operations coverage"
        >
          {COVERAGE.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "bg-[#F4F4F4] p-4",
                index > 0 &&
                  "border-t-2 border-primary sm:border-t-0 sm:border-l-2",
              )}
            >
              <p className="text-base font-black text-primary">{item.label}</p>
              <p className="mt-1 text-sm font-medium text-text-secondary">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-8 grid gap-x-8 gap-y-0 border-t-2 border-primary sm:grid-cols-2">
          {service.faq.map((item) => (
            <div
              key={item.question}
              className="border-b-2 border-primary/20 py-4"
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
