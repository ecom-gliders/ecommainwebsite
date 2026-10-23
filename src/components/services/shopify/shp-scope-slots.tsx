import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ShpScopeSlotsProps {
  service: ServicePageConfig;
}

/** Scope items as theme editor slots — from brandUnlockGrid JSON. */
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
            <h2
              id={`${module.id}-heading`}
              className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
            >
              {module.heading}
            </h2>
            {module.subheading ? (
              <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary">
                {module.subheading}
              </p>
            ) : null}
          </div>
          {module.sheetLabel ? (
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
              {module.sheetLabel}
            </p>
          ) : null}
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {module.items.map((item) => (
            <li
              key={item.title}
              className={cn(
                "flex flex-col border-2 border-primary p-4",
                item.unlocked ? "bg-[#FAFAF7]" : "bg-[#ECECE6]/60",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "h-3 w-3 shrink-0 border-2 border-primary",
                    item.unlocked ? "bg-accent" : "bg-background",
                  )}
                  aria-hidden="true"
                />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.06em] text-text-secondary">
                  {item.statusLabel ?? (item.unlocked ? "In scope" : "Optional")}
                </span>
              </div>
              <h3 className="mt-3 text-base font-black text-primary">{item.title}</h3>
              <p className="mt-1.5 flex-1 text-sm font-medium leading-snug text-text-secondary">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
        {module.note ? (
          <p className="mt-4 text-xs font-medium text-text-secondary">{module.note}</p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
