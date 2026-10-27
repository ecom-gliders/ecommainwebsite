import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface InvCoverageProblemProps {
  service: ServicePageConfig;
}

const BROKEN = [
  "Ads keep spending into empty bays",
  "Restocks start after the stockout",
  "Launch and inbound on different clocks",
];

const PROTECTED = [
  "Cover thresholds before spend scales",
  "Inbound owners against ranked SKUs",
  "Go-live gated by days of cover",
];

/** Empty aisle vs protected cover — warehouse contrast, not KPI ledger. */
export function InvCoverageProblem({ service }: InvCoverageProblemProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] lg:items-stretch lg:gap-9">
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
              Coverage failure modes
            </p>
            <h2
              id="service-problem-heading"
              className="mt-2 max-w-md text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-text-on-dark"
            >
              {problem.heading}
            </h2>
            <ul className="mt-7 space-y-4">
              {problem.points.map((point, index) => (
                <li key={point.title} className="border-l-2 border-accent pl-4">
                  <p className="font-mono text-[10px] font-bold text-accent">
                    Gap {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-base font-black leading-snug text-text-on-dark sm:text-lg">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/70 sm:text-base">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex flex-col overflow-hidden border-2 border-accent"
            aria-label="Broken cover versus protected cover"
          >
            <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col bg-[#161614] p-5 sm:p-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-on-dark/45">
                  Broken cover
                </p>
                <div className="relative mt-4 aspect-video w-full overflow-hidden border border-text-on-dark/20 bg-[#0c0c0b]">
                  <Image
                    src="/images/services/amazon-inventory-management/inv-problem-empty-v2.jpg"
                    alt=""
                    fill
                    className="object-cover opacity-90"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                  <p className="absolute bottom-2 left-2 border border-text-on-dark/30 bg-primary/85 px-1.5 py-0.5 font-mono text-[9px] font-black text-[#E8B0B0]">
                    Bays empty · ads live
                  </p>
                </div>
                <ul className="mt-4 space-y-2 text-sm font-medium text-text-on-dark/50">
                  {BROKEN.map((line) => (
                    <li
                      key={line}
                      className="line-through decoration-text-on-dark/35"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col border-t-2 border-accent bg-accent p-5 text-primary sm:border-l-2 sm:border-t-0 sm:p-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary/65">
                  Protected cover
                </p>
                <div className="relative mt-4 aspect-video w-full overflow-hidden border-2 border-primary bg-[#0c0c0b]">
                  <Image
                    src="/images/services/amazon-inventory-management/inv-problem-healthy-v2.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                </div>
                <ul className="mt-4 space-y-2 text-sm font-bold text-primary/90">
                  {PROTECTED.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
