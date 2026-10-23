import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface FsFaqProps {
  service: ServicePageConfig;
}

/** Full-width decision strip + balanced FAQ grid — not a cramped sidebar. */
export function FsFaq({ service }: FsFaqProps) {
  if (service.faq.length === 0) return null;

  const nodes = [
    { label: "Scope", detail: "What we own" },
    { label: "Owner", detail: "Who is accountable" },
    { label: "Cadence", detail: "Weekly loop" },
    { label: "Report", detail: "Shared pack" },
  ];

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
          Questions about full-service management
        </h2>

        <ol
          className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
          aria-label="Decision flow"
        >
          {nodes.map((node, index) => (
            <li
              key={node.label}
              className="relative border-2 border-primary bg-[#F4F4F4] px-3 py-3"
            >
              <span className="font-mono text-[10px] font-bold text-text-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 text-sm font-black text-primary">{node.label}</p>
              <p className="mt-0.5 text-xs font-medium text-text-secondary">
                {node.detail}
              </p>
              {index < nodes.length - 1 ? (
                <span
                  className="absolute -right-2 top-1/2 z-10 hidden h-0.5 w-3 -translate-y-1/2 bg-primary sm:block"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          ))}
        </ol>

        <dl className="mt-8 grid gap-x-8 gap-y-0 sm:grid-cols-2">
          {service.faq.map((item) => (
            <div
              key={item.question}
              className="border-t-2 border-primary py-5 first:border-t-2 sm:[&:nth-child(2)]:border-t-2"
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
