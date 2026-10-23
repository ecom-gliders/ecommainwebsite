import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";

interface InvCloseProps {
  service: ServicePageConfig;
}

export function InvClose({ service }: InvCloseProps) {
  return (
    <section
      id="service-close"
      className={cn("bg-[#E8E8E4]", serviceSectionPad)}
      aria-labelledby="service-close-heading"
    >
      <ServicePageShell>
        {service.relatedServices.length > 0 ? (
          <div>
            <h2 className="text-lg font-black tracking-tight text-primary sm:text-xl">
              Related services
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {service.relatedServices.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex h-full flex-col border-2 border-primary bg-background p-4 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <span
                      className="inline-flex w-fit border border-primary bg-[#E8E8E4] px-2 py-0.5 font-mono text-[10px] font-bold text-primary"
                      aria-hidden="true"
                    >
                      INV-{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-3 font-bold text-primary">
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
            "border-2 border-primary bg-accent p-6 text-primary sm:p-8",
            service.relatedServices.length > 0 && "mt-10",
          )}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
