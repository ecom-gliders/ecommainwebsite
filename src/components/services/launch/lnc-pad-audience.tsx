import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LncPadAudienceProps {
  service: ServicePageConfig;
}

const PAD_LABELS = [
  "Listing pad",
  "Ads pad",
  "Inventory pad",
  "Ops pad",
] as const;

/** Launch roles as equal pad stations — not phone seats or passport stamps. */
export function LncPadAudience({ service }: LncPadAudienceProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

  const points = audience.points.slice(0, 4);

  return (
    <section
      id="service-audience"
      className={cn("bg-[#EDE8DF]", serviceSectionPad)}
      aria-labelledby="service-audience-heading"
    >
      <ServicePageShell>
        <h2
          id="service-audience-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {audience.heading}
        </h2>

        <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {points.map((point, index) => (
            <li
              key={point.title}
              className="flex min-h-[14rem] flex-col border-2 border-primary bg-[#0c0c0b] p-4 text-text-on-dark"
            >
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-accent">
                {PAD_LABELS[index] ?? `Pad ${index + 1}`}
              </p>
              <div
                className="mt-3 flex flex-1 flex-col justify-end rounded-sm border border-text-on-dark/20 bg-[#141412] p-3"
                aria-hidden="true"
              >
                <span className="font-mono text-[8px] font-bold uppercase text-text-on-dark/40">
                  Station
                </span>
                <span className="mt-1 font-mono text-lg font-black tabular-nums text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mt-2 h-1 w-full bg-accent/40" />
              </div>
              <h3 className="mt-3 text-sm font-black leading-snug text-text-on-dark sm:text-base">
                {point.title}
              </h3>
              <p className="mt-2 flex-1 text-xs font-medium leading-snug text-text-on-dark/70 sm:text-sm">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
