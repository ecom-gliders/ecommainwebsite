"use client";

import { useState } from "react";
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

/** Cadence legend + FAQ accordion. */
export function EmlFaq({ service }: EmlFaqProps) {
  const [open, setOpen] = useState(0);
  if (service.faq.length === 0) return null;

  return (
    <section
      id="service-faq"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-faq-heading"
    >
      <ServicePageShell>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
          Email retention FAQ
        </p>
        <h2
          id="service-faq-heading"
          className="mt-2 text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
        >
          Email retention questions
        </h2>

        <ul
          className="mt-7 grid grid-cols-1 gap-0 overflow-hidden border-2 border-primary sm:grid-cols-3"
          aria-label="Cadence loop legend"
        >
          {CADENCE_LEGEND.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "border-primary bg-background p-5",
                index > 0 && "border-t-2 sm:border-l-2 sm:border-t-0",
              )}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-text-secondary">
                Loop stage
              </p>
              <p className="mt-1 text-lg font-black text-primary">{item.label}</p>
              <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-9 border-2 border-primary bg-background">
          {service.faq.map((item, index) => {
            const isOpen = open === index;
            return (
              <div
                key={item.question}
                className="border-b-2 border-primary last:border-b-0"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-4 text-left transition-colors sm:px-5",
                    isOpen ? "bg-[#F3F0F8]" : "bg-background hover:bg-[#F3F0F8]",
                  )}
                >
                  <span className="mt-0.5 font-mono text-[10px] font-bold text-text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-base font-black text-primary sm:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "mt-1 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-primary font-mono text-[12px] font-bold text-primary transition-transform",
                      isOpen && "rotate-45 bg-accent",
                    )}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen ? (
                  <div className="border-t border-primary/20 bg-[#FAFAF8] px-4 pb-5 sm:px-5">
                    <p className="pl-8 text-sm font-medium leading-snug text-text-secondary sm:pl-9 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </ServicePageShell>
    </section>
  );
}
