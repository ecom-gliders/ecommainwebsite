import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface BrdGatedProblemProps {
  service: ServicePageConfig;
}

/** Unprotected brand vs gated Amazon unlocks - not heatmap or export dump. */
export function BrdGatedProblem({ service }: BrdGatedProblemProps) {
  const { problem } = service;
  const unlockModule = service.modules?.find((m) => m.type === "brandUnlockGrid");
  const lockedPreview =
    unlockModule && unlockModule.type === "brandUnlockGrid"
      ? unlockModule.items.filter((item) => !item.unlocked).slice(0, 3)
      : [
          { title: "A+ Content", description: "Rich modules blocked." },
          { title: "Brand Store", description: "Storefront unavailable." },
          { title: "Report a Violation", description: "Enforcement channel closed." },
        ];

  return (
    <section
      id="service-problem"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch lg:gap-8">
          <div className="flex flex-col">
            <h2
              id="service-problem-heading"
              className="max-w-xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
            >
              {problem.heading}
            </h2>
            <ul className="mt-6 flex flex-1 flex-col gap-0 border-2 border-accent/40">
              {problem.points.map((point, index) => (
                <li
                  key={point.title}
                  className={cn(
                    "flex-1 bg-[#1a1a18] p-4 sm:p-5",
                    index > 0 && "border-t border-accent/25",
                  )}
                >
                  <h3 className="text-base font-black text-text-on-dark">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/80">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex min-h-[18rem] flex-col overflow-hidden border-2 border-accent/50 bg-[#141412]"
            aria-label="Tools gated without Brand Registry"
          >
            <div className="relative aspect-[16/9] w-full border-b border-accent/30">
              <Image
                src="/images/services/amazon-trademark-brand-registry/brd-locked.jpg"
                alt=""
                fill
                className="object-cover opacity-85"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <p className="absolute left-3 top-3 border border-accent/60 bg-primary/80 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                Without enrollment
              </p>
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="text-lg font-black text-text-on-dark">
                Amazon brand tools stay locked
              </p>
              <ul className="mt-4 flex flex-1 flex-col justify-between gap-3">
                {lockedPreview.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-3 border border-text-on-dark/20 bg-primary/40 p-3"
                  >
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-dashed border-text-on-dark/40 font-mono text-[9px] font-bold text-text-on-dark/50"
                      aria-hidden="true"
                    >
                      Lock
                    </span>
                    <div>
                      <h3 className="text-sm font-black text-text-on-dark/90">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-text-on-dark/65">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
