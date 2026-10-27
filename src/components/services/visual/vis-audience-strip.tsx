import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VisAudienceStripProps {
  service: ServicePageConfig;
}

const FILM_ROLES = ["Brand lead", "Catalog mgr", "Launch team", "Creative partner"];

/** Four role cards as film-strip cells with sprocket rails. */
export function VisAudienceStrip({ service }: VisAudienceStripProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

  const points = audience.points.slice(0, 4);

  return (
    <section
      id="service-audience"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-audience-heading"
    >
      <ServicePageShell>
        <h2
          id="service-audience-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.9rem]"
        >
          {audience.heading}
        </h2>

        <div className="mt-8 overflow-x-auto">
          <div
            className="min-w-[min(100%,40rem)] border-2 border-accent bg-[#1a1a18] p-2 sm:min-w-full"
            aria-label="Audience film strip"
          >
            <div
              className="flex h-2 gap-3 px-1"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #C6F135 0, #C6F135 6px, transparent 6px, transparent 14px)",
              }}
              aria-hidden="true"
            />
            <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {points.map((point, index) => (
                <li
                  key={point.title}
                  className="flex flex-col border border-accent/35 bg-[#222220] p-4"
                >
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
                    {FILM_ROLES[index] ?? `Cell ${index + 1}`}
                  </p>
                  <h3 className="mt-2 text-lg font-black leading-snug text-text-on-dark">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-base font-medium leading-snug text-text-on-dark/75">
                    {point.description}
                  </p>
                  <p className="mt-3 font-mono text-xs font-bold text-text-on-dark/40">
                    Frame {String(index + 1).padStart(2, "0")}
                  </p>
                </li>
              ))}
            </ul>
            <div
              className="mt-2 flex h-2 gap-3 px-1"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #C6F135 0, #C6F135 6px, transparent 6px, transparent 14px)",
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
