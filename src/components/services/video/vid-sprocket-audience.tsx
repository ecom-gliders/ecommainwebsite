import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VidSprocketAudienceProps {
  service: ServicePageConfig;
}

function SprocketEdge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-3 shrink-0 flex-col justify-around bg-primary py-1",
        className,
      )}
      aria-hidden="true"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="mx-auto block h-1.5 w-1.5 rounded-sm bg-background/90"
        />
      ))}
    </div>
  );
}

/** Funnel stages on a film sprocket row — not binder tabs or orbit seats. */
export function VidSprocketAudience({ service }: VidSprocketAudienceProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

  const points = audience.points.slice(0, 4);
  const stages = ["Awareness", "Consider", "Decide", "Retain"];

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

        <div className="mt-8 overflow-x-auto">
          <ul className="flex min-w-[36rem] gap-0 border-2 border-primary">
            {points.map((point, index) => (
              <li key={point.title} className="flex min-w-0 flex-1">
                <SprocketEdge />
                <div
                  className={cn(
                    "flex min-w-0 flex-1 flex-col bg-[#1a1a18] p-4 text-text-on-dark",
                    index % 2 === 0 ? "bg-[#1a1a18]" : "bg-[#222220]",
                  )}
                >
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-accent">
                    {stages[index] ?? `Stage ${index + 1}`}
                  </p>
                  <h3 className="mt-2 text-sm font-black leading-snug text-text-on-dark sm:text-base">
                    {point.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs font-medium leading-snug text-text-on-dark/70 sm:text-sm">
                    {point.description}
                  </p>
                  <p className="mt-3 font-mono text-[9px] font-bold text-text-on-dark/40">
                    Reel {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
                {index === points.length - 1 ? <SprocketEdge /> : null}
              </li>
            ))}
          </ul>
        </div>
      </ServicePageShell>
    </section>
  );
}
