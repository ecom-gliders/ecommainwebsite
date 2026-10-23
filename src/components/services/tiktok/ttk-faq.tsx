import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface TtkFaqProps {
  service: ServicePageConfig;
}

const CHANNEL_LEGEND = [
  {
    label: "Shop ads",
    detail: "Product-led spark with Shop checkout destination.",
  },
  {
    label: "Complement Amazon",
    detail: "SKU tests that hand learning back to marketplace work.",
  },
  {
    label: "Creative test",
    detail: "Structured hooks before budget scale.",
  },
] as const;

/** Channel legend equal cards + FAQ — no lime chip strips. */
export function TtkFaq({ service }: TtkFaqProps) {
  if (service.faq.length === 0) return null;

  return (
    <section
      id="service-faq"
      className={cn("bg-[#141412] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-faq-heading"
    >
      <ServicePageShell>
        <h2
          id="service-faq-heading"
          className="text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          TikTok Shop ads questions
        </h2>

        <ul
          className="mt-6 grid grid-cols-1 gap-0 overflow-hidden border border-accent/40 sm:grid-cols-3"
          aria-label="Channel roles"
        >
          {CHANNEL_LEGEND.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "border-b border-accent/30 p-4 sm:border-b-0 sm:border-r sm:last:border-r-0",
                index === 1 && "bg-[#1c1c1a]",
              )}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-accent">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium leading-snug text-text-on-dark/75">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-8 divide-y divide-text-on-dark/15 border border-text-on-dark/20">
          {service.faq.map((item) => (
            <div key={item.question} className="p-4 sm:p-5">
              <dt className="text-base font-black text-text-on-dark">{item.question}</dt>
              <dd className="mt-2 text-sm font-medium leading-relaxed text-text-on-dark/75">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </ServicePageShell>
    </section>
  );
}
