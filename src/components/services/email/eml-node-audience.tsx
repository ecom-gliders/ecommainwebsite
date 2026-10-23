import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EmlNodeAudienceProps {
  service: ServicePageConfig;
}

const NODE_LABELS = ["Welcome node", "Nurture node", "Winback node", "Loyalty node"] as const;

/** Audience seats as loop nodes — not phone tiles or orbit cards. */
export function EmlNodeAudience({ service }: EmlNodeAudienceProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

  const points = audience.points.slice(0, 4);

  return (
    <section
      id="service-audience"
      className={cn("bg-[#F3F0F8]", serviceSectionPad)}
      aria-labelledby="service-audience-heading"
    >
      <ServicePageShell>
        <h2
          id="service-audience-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {audience.heading}
        </h2>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {points.map((point, index) => (
            <li
              key={point.title}
              className="relative flex min-h-[12rem] flex-col border-2 border-primary bg-background p-4"
            >
              <div
                className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center border-2 border-primary bg-accent font-mono text-[10px] font-black text-primary"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                {NODE_LABELS[index] ?? `Node ${index + 1}`}
              </p>
              <div
                className="mt-3 flex h-14 w-full items-center justify-center border border-dashed border-primary/30 bg-[#E6E2EC]/60"
                aria-hidden="true"
              >
                <svg viewBox="0 0 48 24" className="h-6 w-12 text-primary/40">
                  <path
                    d="M4 12 H36 M32 8 L40 12 L32 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="mt-3 text-sm font-black leading-snug text-primary sm:text-base">
                {point.title}
              </h3>
              <p className="mt-2 flex-1 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
