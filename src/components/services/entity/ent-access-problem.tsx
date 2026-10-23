import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EntAccessProblemProps {
  service: ServicePageConfig;
}

const BLOCKED_ACCESS = {
  status: "Marketplace access blocked",
  sellerCentral: "Verification pending",
  gaps: ["No consistent entity record", "Tax ID not on file", "Payout path incomplete"],
};

const READY_ENTITY = {
  status: "Entity ready for handoff",
  sellerCentral: "Inputs aligned for registration",
  signals: ["Formation on record", "EIN documentation organized", "Address matches filings"],
};

/** Blocked marketplace access vs ready entity — not heatmap or ledger dump. */
export function EntAccessProblem({ service }: EntAccessProblemProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <h2
          id="service-problem-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {problem.heading}
        </h2>

        <div className="mt-8 grid gap-0 overflow-hidden border-2 border-accent lg:grid-cols-2">
          <div className="bg-[#1a1a18] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-on-dark/50">
                Before entity readiness
              </p>
              <span className="border border-text-on-dark/30 px-1.5 py-px font-mono text-[9px] font-bold uppercase text-text-on-dark/60">
                Blocked
              </span>
            </div>
            <p className="mt-3 text-base font-black text-text-on-dark">
              {BLOCKED_ACCESS.status}
            </p>
            <p className="mt-1 font-mono text-xs font-bold text-text-on-dark/55">
              Seller Central: {BLOCKED_ACCESS.sellerCentral}
            </p>
            <ul className="mt-4 space-y-2">
              {BLOCKED_ACCESS.gaps.map((gap) => (
                <li
                  key={gap}
                  className="flex gap-2 text-sm font-medium text-text-on-dark/55"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 bg-text-on-dark/40"
                    aria-hidden="true"
                  />
                  {gap}
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3 border-t border-text-on-dark/15 pt-4">
              {problem.points.slice(0, 2).map((point) => (
                <li key={point.title}>
                  <h3 className="text-sm font-black text-accent">{point.title}</h3>
                  <p className="mt-0.5 text-xs font-medium leading-snug text-text-on-dark/75">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-2 border-accent bg-[#222220] p-5 sm:border-t-0 sm:border-l-2 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                After entity foundations
              </p>
              <span className="border border-accent bg-accent/15 px-1.5 py-px font-mono text-[9px] font-bold uppercase text-accent">
                Ready
              </span>
            </div>
            <p className="mt-3 text-base font-black text-text-on-dark">
              {READY_ENTITY.status}
            </p>
            <p className="mt-1 font-mono text-xs font-bold text-accent/90">
              {READY_ENTITY.sellerCentral}
            </p>
            <ul className="mt-4 space-y-2">
              {READY_ENTITY.signals.map((signal) => (
                <li
                  key={signal}
                  className="flex gap-2 text-sm font-medium text-text-on-dark/90"
                >
                  <span
                    className="mt-1.5 flex h-3 w-3 shrink-0 items-center justify-center border-2 border-accent bg-accent"
                    aria-hidden="true"
                  >
                    <span className="h-1.5 w-1.5 bg-primary" />
                  </span>
                  {signal}
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3 border-t border-accent/25 pt-4">
              {problem.points.slice(2).map((point) => (
                <li key={point.title}>
                  <h3 className="text-sm font-black text-text-on-dark">{point.title}</h3>
                  <p className="mt-0.5 text-xs font-medium leading-snug text-text-on-dark/75">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
