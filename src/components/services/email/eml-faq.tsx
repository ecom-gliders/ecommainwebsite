import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EmlFaqProps {
  service: ServicePageConfig;
}

const CADENCE_LEGEND = [
  { label: "Welcome", detail: "Confirm opt-in before promos." },
  { label: "Nurture", detail: "Post-purchase and replenishment beats." },
  { label: "Winback", detail: "Re-engage before list decay." },
] as const;

/** Cadence legend + FAQ — not voice register or index-status cards. */
export function EmlFaq({ service }: EmlFaqProps) {
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
          Email retention questions
        </h2>

        <ul
          className="mt-6 grid grid-cols-1 gap-0 overflow-hidden border-2 border-primary sm:grid-cols-3"
          aria-label="Cadence loop legend"
        >
          {CADENCE_LEGEND.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "border-primary bg-background p-4",
                index > 0 && "border-t-2 sm:border-l-2 sm:border-t-0",
              )}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-text-secondary">
                Loop stage
              </p>
              <p className="mt-1 text-sm font-black text-primary">{item.label}</p>
              <p className="mt-1 text-xs font-medium leading-snug text-text-secondary">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-8 divide-y-2 divide-primary border-2 border-primary bg-background">
          {service.faq.map((item) => (
            <div key={item.question} className="p-4 sm:p-5">
              <dt className="text-sm font-black text-primary sm:text-base">{item.question}</dt>
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
