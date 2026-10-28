import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface FsManifestoProps {
  service: ServicePageConfig;
}

/** Ownership ring diagram + statements — not text-only. */
export function FsManifesto({ service }: FsManifestoProps) {
  const manifesto = service.fullService?.manifesto;
  if (!manifesto) return null;

  const ring = manifesto.statements;

  return (
    <section
      id="service-manifesto"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-manifesto-heading"
    >
      <ServicePageShell>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
          <div
            className="relative mx-auto aspect-square w-full max-w-[20rem] overflow-hidden px-3 sm:max-w-[22rem] sm:overflow-visible sm:px-0"
            aria-hidden="true"
          >
            <div className="absolute inset-[14%] rounded-full border-2 border-primary bg-accent/40 sm:inset-[12%]" />
            <div className="absolute inset-[30%] flex items-center justify-center rounded-full border-2 border-primary bg-primary text-center text-accent sm:inset-[28%]">
              <span className="px-3 text-sm font-black leading-tight">
                One
                <br />
                owner
              </span>
            </div>
            {ring.map((item, index) => {
              const angle = -90 + index * (360 / ring.length);
              const rad = (angle * Math.PI) / 180;
              const x = 50 + 36 * Math.cos(rad);
              const y = 50 + 36 * Math.sin(rad);
              return (
                <div
                  key={item.title}
                  className="absolute w-[5.75rem] -translate-x-1/2 -translate-y-1/2 border-2 border-primary bg-background px-1.5 py-1.5 text-center shadow-[3px_3px_0_0_#131311] sm:w-[7.5rem] sm:px-2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <p className="text-xs font-bold leading-tight text-primary sm:text-xs">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>

          <div>
            <h2
              id="service-manifesto-heading"
              className="text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
            >
              {manifesto.heading}
            </h2>
            <ol className="mt-6 space-y-5">
              {manifesto.statements.map((item, index) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border-2 border-primary bg-accent font-mono text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-primary sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-text-secondary sm:text-[0.9375rem]">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {manifesto.metrics && manifesto.metrics.length > 0 ? (
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {manifesto.metrics.map((metric) => (
                  <li
                    key={metric.label}
                    className="border-2 border-primary bg-[#F4F4F4] px-3 py-3"
                  >
                    <p className="text-xl font-black tracking-tight text-primary">
                      {metric.value}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.06em] text-text-secondary">
                      {metric.label}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
