import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface SrcFaqProps {
  service: ServicePageConfig;
}

const SCOPE = [
  {
    label: "Supplier research",
    detail: "Shortlists scored on brief fit, not unit price alone.",
    fill: 82,
  },
  {
    label: "Sample evaluation",
    detail: "Side-by-side checks before production commits.",
    fill: 70,
  },
  {
    label: "Launch handoff",
    detail: "Specs packaged for catalog and go-to-market work.",
    fill: 90,
  },
];

export function SrcFaq({ service }: SrcFaqProps) {
  if (service.faq.length === 0) return null;

  return (
    <section
      id="service-faq"
      className={cn("bg-[#0b1211] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-faq-heading"
    >
      <ServicePageShell>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent">
          Corridor FAQ
        </p>
        <h2
          id="service-faq-heading"
          className="mt-2 text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-text-on-dark"
        >
          Product sourcing questions
        </h2>

        <ul
          className="mt-7 grid grid-cols-1 gap-0 overflow-hidden border-2 border-accent sm:grid-cols-3"
          aria-label="Sourcing scope"
        >
          {SCOPE.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "bg-[#101816] p-5",
                index > 0 &&
                  "border-t-2 border-accent sm:border-t-0 sm:border-l-2",
              )}
            >
              <div
                className="mb-3 h-2 overflow-hidden border border-accent/30 bg-text-on-dark/10"
                aria-hidden="true"
              >
                <div
                  className="h-full bg-accent"
                  style={{ width: `${item.fill}%` }}
                />
              </div>
              <p className="text-lg font-black text-text-on-dark">{item.label}</p>
              <p className="mt-1.5 text-sm font-medium text-text-on-dark/65">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-9 grid gap-x-10 gap-y-0 border-t-2 border-accent/40 sm:grid-cols-2">
          {service.faq.map((item) => (
            <div
              key={item.question}
              className="border-b border-accent/25 py-5"
            >
              <dt className="text-base font-black text-text-on-dark sm:text-lg">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm font-medium leading-snug text-text-on-dark/70 sm:text-base">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </ServicePageShell>
    </section>
  );
}
