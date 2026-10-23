import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface InvBayAudienceProps {
  service: ServicePageConfig;
}

const BAY_CODES = ["OPS-01", "OPS-02", "OPS-03", "OPS-04"];

/** Ops roles as equal warehouse bay cards. */
export function InvBayAudience({ service }: InvBayAudienceProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

  const points = audience.points.slice(0, 4);

  return (
    <section
      id="service-audience"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-audience-heading"
    >
      <ServicePageShell>
        <h2
          id="service-audience-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {audience.heading}
        </h2>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => (
            <li
              key={point.title}
              className="flex min-h-[11rem] flex-col border-2 border-primary bg-[#E8E8E4]"
            >
              <div className="flex items-center justify-between gap-2 border-b-2 border-primary bg-primary px-3 py-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-accent">
                  Bay slot
                </span>
                <span className="font-mono text-[10px] font-black text-text-on-dark">
                  {BAY_CODES[index] ?? `B${index + 1}`}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <div
                  className="h-2 w-full border border-primary/30 bg-background"
                  aria-hidden="true"
                >
                  <div
                    className={cn(
                      "h-full bg-accent",
                      index === 1 && "w-[55%]",
                      index === 2 && "w-[72%]",
                      index === 3 && "w-[48%]",
                      index === 0 && "w-[85%]",
                    )}
                  />
                </div>
                <h3 className="mt-3 text-sm font-black leading-snug text-primary sm:text-base">
                  {point.title}
                </h3>
                <p className="mt-1.5 flex-1 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
                  {point.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
