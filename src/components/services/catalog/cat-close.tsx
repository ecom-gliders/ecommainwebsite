import Image from "next/image";
import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";

interface CatCloseProps {
  service: ServicePageConfig;
}

const CLOSE_STRIP = [
  "/images/services/amazon-catalog-management/cat-parent.jpg",
  "/images/services/amazon-catalog-management/cat-buyable.jpg",
  "/images/services/amazon-catalog-management/cat-close-pack.jpg",
] as const;

/** Catalog triage close strip - not manuscript submit. */
export function CatClose({ service }: CatCloseProps) {
  return (
    <section
      id="service-close"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
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
            "border-2 border-primary bg-background p-6 sm:p-8",
            service.relatedServices.length > 0 && "mt-10",
          )}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <div className="mb-4 flex min-w-0 flex-wrap items-end gap-2" aria-hidden="true">
                {CLOSE_STRIP.map((src) => (
                  <div
                    key={src}
                    className="relative h-14 w-16 overflow-hidden border-2 border-primary bg-[#EDE8DF]"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ))}
                <p className="hidden self-end font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary sm:block">
                  Catalog health review
                </p>
              </div>
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
