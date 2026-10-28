import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";

interface EmlCloseProps {
  service: ServicePageConfig;
}

/** Cadence loop close CTA — not spark end-card or manuscript submit. */
export function EmlClose({ service }: EmlCloseProps) {
  return (
    <section
      id="service-close"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
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
                    className="inline-flex border-2 border-accent bg-transparent px-3 py-2 text-sm font-bold text-accent hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
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
            "overflow-hidden border-2 border-accent",
            service.relatedServices.length > 0 && "mt-10",
          )}
        >
          <div className="flex items-center justify-between border-b border-accent/40 bg-[#1a1a18] px-4 py-2">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
              Cadence loop · next step
            </p>
            <p className="font-mono text-xs font-bold text-text-on-dark/45">
              Audit first
            </p>
          </div>
          <div className="flex flex-col gap-6 bg-accent p-6 text-primary sm:p-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2
                id="service-close-heading"
                className="text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
              >
                {service.cta.heading}
              </h2>
              {service.cta.subheading ? (
                <p className="mt-2 text-sm font-medium leading-relaxed text-primary/85 sm:text-base">
                  {service.cta.subheading}
                </p>
              ) : null}
            </div>
            <PrimaryButton asChild variant="primary" size="lg">
              <Link href={service.cta.button.href}>{service.cta.button.label}</Link>
            </PrimaryButton>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
