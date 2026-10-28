"use client";

import { useState } from "react";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ShpFaqProps {
  service: ServicePageConfig;
}

const CHANNEL_NOTES = [
  {
    label: "Complement",
    detail: "Shopify supports brand and retention alongside Amazon growth.",
    fill: 86,
  },
  {
    label: "Rebuild",
    detail: "Existing stores can be refined when speed or conversion lags.",
    fill: 72,
  },
  {
    label: "Align",
    detail: "Owned-site copy can mirror proven Amazon product points.",
    fill: 90,
  },
];

/** Interactive FAQ accordion — one open answer at a time. */
export function ShpFaq({ service }: ShpFaqProps) {
  const [open, setOpen] = useState(0);
  if (service.faq.length === 0) return null;

  return (
    <section
      id="service-faq"
      className={cn("bg-[#0c0c0b] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-faq-heading"
    >
      <ServicePageShell>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent">
          Storefront FAQ
        </p>
        <h2
          id="service-faq-heading"
          className="mt-2 text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-text-on-dark"
        >
          Shopify development questions
        </h2>

        <ul
          className="mt-7 grid grid-cols-1 gap-0 overflow-hidden border-2 border-accent sm:grid-cols-3"
          aria-label="Channel notes"
        >
          {CHANNEL_NOTES.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "bg-[#141412] p-5",
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

        <div className="mt-9 border-2 border-accent">
          {service.faq.map((item, index) => {
            const isOpen = open === index;
            return (
              <div
                key={item.question}
                className="border-b border-accent/30 last:border-b-0"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-4 text-left transition-colors sm:px-5",
                    isOpen
                      ? "bg-[#1a1a17]"
                      : "bg-[#0c0c0b] hover:bg-[#141412]",
                  )}
                >
                  <span className="mt-0.5 font-mono text-xs font-bold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-base font-black text-text-on-dark sm:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "mt-1 flex h-5 w-5 shrink-0 items-center justify-center border border-accent font-mono text-xs font-bold text-accent transition-transform",
                      isOpen && "rotate-45",
                    )}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen ? (
                  <div className="border-t border-accent/20 bg-[#141412] px-4 pb-5 pt-0 sm:px-5">
                    <p className="pl-8 text-sm font-medium leading-snug text-text-on-dark/70 sm:pl-9 sm:text-base">
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
