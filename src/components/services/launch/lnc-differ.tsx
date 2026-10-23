import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LncDifferProps {
  service: ServicePageConfig;
}

const COLD_SHORTCUTS = [
  "Launch spend before listing readiness",
  "Inventory treated as a post-launch surprise",
  "Freelance scramble with no shared calendar",
  "Invented average launch lift on the page",
];

/** Cold-launch pitch versus staged eCom Gliders plan — not GMV TikTok split. */
export function LncDiffer({ service }: LncDifferProps) {
  const differ = service.differ;
  if (!differ?.points?.length) return null;

  return (
    <section
      id="service-differ"
      className={cn("bg-background", serviceSectionPad)}
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
          <div className="bg-[#0c0c0b] p-6 text-text-on-dark">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-on-dark/50">
              Cold launch pitch
            </p>
            <ul className="mt-4 space-y-3">
              {COLD_SHORTCUTS.map((line) => (
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
                  Staged plan
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
