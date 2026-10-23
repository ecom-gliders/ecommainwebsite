import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";

interface VisCloseProps {
  service: ServicePageConfig;
}

/** Export light-table strip — handoff to audit, not manuscript submit. */
export function VisClose({ service }: VisCloseProps) {
  return (
    <section
      id="service-close"
      className={cn("bg-[#131311] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-close-heading"
    >
      <ServicePageShell>
        {service.relatedServices.length > 0 ? (
          <div>
            <h2 className="text-lg font-black tracking-tight text-text-on-dark sm:text-xl">
              Related services
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {service.relatedServices.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex border-2 border-accent bg-[#1a1a18] px-3 py-2 text-sm font-bold text-text-on-dark hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#131311]"
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
            "border-2 border-accent bg-[#1a1a18] p-6 sm:p-8",
            service.relatedServices.length > 0 && "mt-10",
          )}
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <div
                className="mb-4 flex gap-2"
                aria-hidden="true"
              >
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-14 w-12 border border-accent/40 bg-[#222220]"
                  />
                ))}
                <p className="self-end font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                  Ready for upload
                </p>
              </div>
              <h2
                id="service-close-heading"
                className="text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
              >
                {service.cta.heading}
              </h2>
              {service.cta.subheading ? (
                <p className="mt-2 text-sm font-medium leading-relaxed text-text-on-dark/75 sm:text-base">
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
