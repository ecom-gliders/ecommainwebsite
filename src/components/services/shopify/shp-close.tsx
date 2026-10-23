import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";

interface ShpCloseProps {
  service: ServicePageConfig;
}

/** Checkout-style CTA strip — distinct from search-bar or manuscript closes. */
export function ShpClose({ service }: ShpCloseProps) {
  return (
    <section
      id="service-close"
      className={cn("bg-[#FAFAF7]", serviceSectionPad)}
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
            "border-2 border-primary bg-background p-1 shadow-[4px_4px_0_0_#C6F135]",
            service.relatedServices.length > 0 && "mt-10",
          )}
        >
          <div className="flex flex-col gap-4 border-2 border-primary bg-[#FAFAF7] p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                Project consult
              </p>
              <h2
                id="service-close-heading"
                className="mt-1 text-xl font-black tracking-tight text-primary sm:text-2xl"
              >
                {service.cta.heading}
              </h2>
              {service.cta.subheading ? (
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-text-secondary">
                  {service.cta.subheading}
                </p>
              ) : null}
            </div>
            <PrimaryButton asChild variant="primary" size="lg" className="shrink-0">
              <Link href={service.cta.button.href}>{service.cta.button.label}</Link>
            </PrimaryButton>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
