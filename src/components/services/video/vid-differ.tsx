import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VidDifferProps {
  service: ServicePageConfig;
}

const CUT_SHORTCUTS = [
  "One social film for every placement",
  "Logo open with no product in frame",
  "Voiceover claims off-listing",
  "No storyboard before shoot day",
];

/** Reel versus generic studio split — not copy quote blocks. */
export function VidDiffer({ service }: VidDifferProps) {
  const differ = service.differ;
  if (!differ?.points?.length) return null;

  return (
    <section
      id="service-differ"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-differ-heading"
    >
      <ServicePageShell>
        <h2
          id="service-differ-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {differ.heading}
        </h2>

        <div className="mt-8 grid gap-0 overflow-hidden border-2 border-primary lg:grid-cols-2">
          <div className="bg-[#1a1a18] p-6 text-text-on-dark">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-on-dark/50">
              Generic studio cut
            </p>
            <ul className="mt-4 space-y-3">
              {CUT_SHORTCUTS.map((line) => (
                <li
                  key={line}
                  className="flex gap-2 text-sm font-medium text-text-on-dark/50"
                >
                  <span className="shrink-0 font-mono text-[10px] text-accent/80">
                    X
                  </span>
                  <span className="line-through decoration-text-on-dark/40">{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <ul className="divide-y-2 divide-primary border-t-2 border-primary bg-accent text-primary lg:border-t-0 lg:border-l-2">
            {differ.points.map((point) => (
              <li key={point.title} className="p-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-primary/60">
                  Amazon-ready
                </p>
                <h3 className="mt-1 text-base font-black text-primary">{point.title}</h3>
                <p className="mt-1.5 text-sm font-medium leading-snug text-primary/85">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </ServicePageShell>
    </section>
  );
}
