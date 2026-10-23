import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface PpcFaqProps {
  service: ServicePageConfig;
}

const MATCH_TYPES = [
  {
    label: "Exact",
    job: "Convert",
    detail: "High-intent queries already proven to sell.",
  },
  {
    label: "Phrase",
    job: "Expand",
    detail: "Close variants around converting terms.",
  },
  {
    label: "Broad",
    job: "Discover",
    detail: "Controlled discovery with tight negatives.",
  },
  {
    label: "Auto",
    job: "Harvest",
    detail: "Amazon suggestions mined into manual lanes.",
  },
];

/**
 * FAQ: compact match-type strip under the heading + 2-col Q&A from JSON.
 * No sparse sidebar ladder. No invented filler copy.
 */
export function PpcFaq({ service }: PpcFaqProps) {
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
          Questions about Amazon PPC management
        </h2>

        <ul
          className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
          aria-label="Match types we structure"
        >
          {MATCH_TYPES.map((match, index) => (
            <li
              key={match.label}
              className="border-2 border-primary bg-background px-3 py-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold text-text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-sm border border-primary bg-accent px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-primary">
                  {match.job}
                </span>
              </div>
              <p className="mt-2 text-sm font-black text-primary">{match.label}</p>
              <p className="mt-1 text-xs font-medium leading-snug text-text-secondary">
                {match.detail}
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
