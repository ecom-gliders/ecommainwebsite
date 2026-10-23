import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";

interface InvDifferProps {
  service: ServicePageConfig;
}

export function InvDiffer({ service }: InvDifferProps) {
  const differ = service.differ;
  if (!differ?.points?.length) return null;

  return (
    <section
      id="service-differ"
      className={serviceSectionPad}
      aria-labelledby="service-differ-heading"
    >
      <ServicePageShell>
        <h2
          id="service-differ-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {differ.heading}
        </h2>
        <ul className="mt-8 grid gap-3 border-2 border-primary sm:grid-cols-2">
          {differ.points.map((point, index) => (
            <li
              key={point.title}
              className="flex gap-4 bg-background p-4 sm:border-l-0 sm:p-5 sm:[&:nth-child(odd)]:border-r-2 sm:[&:nth-child(-n+2)]:border-b-2 sm:[&:nth-child(n+3)]:border-t-0"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-primary bg-[#E8E8E4] font-mono text-xs font-black text-primary"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-black text-primary">{point.title}</h3>
                <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
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
