import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";

interface DspCloseProps {
  service: ServicePageConfig;
}

export function DspClose({ service }: DspCloseProps) {
  const related = service.relatedServices;

  return (
    <section
      id="service-close"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-close-heading"
    >
      <ServicePageShell>
        {related.length > 0 ? (
          <div>
            <h2 className="text-lg font-black tracking-tight text-primary sm:text-xl">
              Related media and account work
            </h2>
            <ul
              className={cn(
                "mt-5 grid gap-3",
                related.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
              )}
            >
              {related.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex h-full flex-col border-2 border-primary bg-[#F4F4F4] p-4 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <span
                      className="font-mono text-[10px] font-bold text-text-secondary"
                      aria-hidden="true"
                    >
                      Ring {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-2 font-bold text-primary">
                      {item.title}
                    </span>
                    <span className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                      {item.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div
          className={cn(
            "border-2 border-primary bg-primary p-6 text-text-on-dark sm:p-7",
            related.length > 0 && "mt-8",
          )}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="min-w-0 flex-1">
              <h2
                id="service-close-heading"
                className="text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
              >
                {service.cta.heading}
              </h2>
              {service.cta.subheading ? (
                <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-text-on-dark/90 sm:text-base">
                  {service.cta.subheading}
                </p>
              ) : null}
            </div>
            <PrimaryButton asChild variant="accent" size="lg" className="shrink-0">
              <Link href={service.cta.button.href}>
                {service.cta.button.label}
              </Link>
            </PrimaryButton>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
