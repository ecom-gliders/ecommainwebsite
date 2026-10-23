import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LstFaqProps {
  service: ServicePageConfig;
}

const STATUS = [
  {
    label: "Indexed",
    sample: "waterproof · hiking boots",
    detail: "Present in title or backend and eligible to rank.",
    tone: "hit" as const,
  },
  {
    label: "Partial",
    sample: "trail grip · mud sole",
    detail: "Synonym only — weak match to the query shoppers type.",
    tone: "partial" as const,
  },
  {
    label: "Missing",
    sample: "wide fit · gore-tex",
    detail: "Buyer language absent from every field that matters.",
    tone: "miss" as const,
  },
];

/** Index-status legend + FAQ — not equal lime focus cards. */
export function LstFaq({ service }: LstFaqProps) {
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
          Listing optimization questions
        </h2>

        <ul
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
          aria-label="Index status legend"
        >
          {STATUS.map((item) => (
            <li
              key={item.label}
              className={cn(
                "border-2 p-4",
                item.tone === "hit" && "border-accent bg-accent text-primary",
                item.tone === "partial" &&
                  "border-accent/50 bg-transparent text-text-on-dark",
                item.tone === "miss" &&
                  "border-text-on-dark/25 bg-[#1a1a18] text-text-on-dark/70",
              )}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
                {item.label}
              </p>
              <p
                className={cn(
                  "mt-2 font-mono text-xs font-bold",
                  item.tone === "miss" && "line-through",
                )}
              >
                {item.sample}
              </p>
              <p
                className={cn(
                  "mt-2 text-sm font-medium leading-snug",
                  item.tone === "hit" ? "text-primary/85" : "opacity-85",
                )}
              >
                {item.detail}
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
              <dt className="text-sm font-black text-text-on-dark sm:text-base">
                {item.question}
              </dt>
              <dd className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/80">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </ServicePageShell>
    </section>
  );
}
