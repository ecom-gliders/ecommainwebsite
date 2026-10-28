import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ShpScopeSlotsProps {
  service: ServicePageConfig;
}

/** Static scope sheet — unlock grid (council: avoid tab monoculture mid-page). */
export function ShpScopeSlots({ service }: ShpScopeSlotsProps) {
  const module = service.modules?.find((m) => m.type === "brandUnlockGrid");
  if (!module || module.type !== "brandUnlockGrid") return null;

  return (
    <section
      id={module.id}
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby={`${module.id}-heading`}
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
              Scope sheet
            </p>
            <h2
              id={`${module.id}-heading`}
              className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
            >
              {module.heading}
            </h2>
            {module.subheading ? (
              <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary sm:text-base">
                {module.subheading}
              </p>
            ) : null}
          </div>
          {module.sheetLabel ? (
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
              {module.sheetLabel}
            </p>
          ) : null}
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {module.items.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                "flex flex-col border-2 border-primary p-4 sm:p-5",
                item.unlocked
                  ? "bg-background shadow-[3px_3px_0_0_#131311]"
                  : "border-dashed bg-[#FAFAF7]",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "border-2 border-primary px-2 py-0.5 font-mono text-xs font-bold uppercase",
                    item.unlocked
                      ? "bg-accent text-primary"
                      : "border-dashed bg-background text-text-secondary",
                  )}
                >
                  {item.statusLabel ??
                    (item.unlocked ? "In base build" : "Scoped if needed")}
                </span>
              </div>
              <h3 className="mt-3 text-base font-black tracking-tight text-primary sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm font-medium leading-snug text-text-secondary">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

        {module.note ? (
          <p className="mt-4 text-xs font-medium text-text-secondary">
            {module.note}
          </p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
