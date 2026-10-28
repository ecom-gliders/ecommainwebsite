import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";

interface BrdCloseProps {
  service: ServicePageConfig;
}

/** Pathway seal close strip — not manuscript submit or search bar. */
export function BrdClose({ service }: BrdCloseProps) {
  return (
    <section
      id="service-close"
      className={cn("border-t-2 border-primary bg-[#F3EDE4]", serviceSectionPad)}
      aria-labelledby="service-close-heading"
    >
      <ServicePageShell>
        {service.relatedServices.length > 0 ? (
          <div>
            <h2 className="text-lg font-black tracking-tight text-primary sm:text-xl">
              Related services
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {service.relatedServices.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex border-2 border-primary bg-background px-3 py-2 text-sm font-bold text-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div
          className={cn(
            "relative overflow-hidden border-2 border-primary bg-background p-6 sm:p-8",
            service.relatedServices.length > 0 && "mt-10",
          )}
        >
          <span
            className="pointer-events-none absolute -right-6 bottom-4 flex h-20 w-20 rotate-[-8deg] items-center justify-center rounded-full border-2 border-dashed border-primary/25 font-mono text-xs font-black uppercase text-primary/25"
            aria-hidden="true"
          >
            Enroll
          </span>
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                Pathway seal · next step
              </p>
              <h2
                id="service-close-heading"
                className="mt-1 text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
              >
                {service.cta.heading}
              </h2>
              {service.cta.subheading ? (
                <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary sm:text-base">
                  {service.cta.subheading}
                </p>
              ) : null}
            </div>
            <PrimaryButton asChild variant="primary" size="lg">
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
