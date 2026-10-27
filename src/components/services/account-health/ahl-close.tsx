import Image from "next/image";
import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";

interface AhlCloseProps {
  service: ServicePageConfig;
}

const CLOSE_STRIP = [
  "/images/services/amazon-account-health/ahl-problem-monitored-v2.jpg",
  "/images/services/amazon-account-health/ahl-evidence-folder-v2.jpg",
  "/images/services/amazon-account-health/ahl-phase-monitor-v2.jpg",
] as const;

export function AhlClose({ service }: AhlCloseProps) {
  return (
    <section
      id="service-close"
      className={cn("bg-[#E6E6E0]", serviceSectionPad)}
      aria-labelledby="service-close-heading"
    >
      <ServicePageShell>
        {service.relatedServices.length > 0 ? (
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
              Connected workstreams
            </p>
            <h2 className="mt-2 text-[clamp(1.35rem,2.5vw,1.75rem)] font-black tracking-tight text-primary">
              Related services
            </h2>
            <ul className="mt-6 grid gap-0 overflow-hidden border-2 border-primary sm:grid-cols-3">
              {service.relatedServices.map((item, index) => (
                <li
                  key={item.href}
                  className={cn(
                    "bg-background",
                    index > 0 &&
                      "border-t-2 border-primary sm:border-t-0 sm:border-l-2",
                  )}
                >
                  <Link
                    href={item.href}
                    className="flex h-full flex-col p-5 hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
                  >
                    <span
                      className="inline-flex w-fit border-2 border-primary bg-primary px-2 py-0.5 font-mono text-[10px] font-bold text-accent"
                      aria-hidden="true"
                    >
                      AHL-{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-4 text-lg font-black text-primary">
                      {item.title}
                    </span>
                    <span className="mt-2 text-sm font-medium leading-snug text-text-secondary sm:text-base">
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
            "relative overflow-hidden border-2 border-primary bg-accent text-primary",
            service.relatedServices.length > 0 && "mt-10",
          )}
        >
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
            <div className="min-w-0 p-5 sm:p-8 lg:p-10">
              <div className="mb-5 flex min-w-0 flex-wrap items-end gap-2" aria-hidden="true">
                {CLOSE_STRIP.map((src) => (
                  <div
                    key={src}
                    className="relative h-12 w-14 shrink-0 overflow-hidden border-2 border-primary bg-primary sm:h-16 sm:w-24"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                ))}
                <p className="hidden self-end font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary/70 sm:block">
                  Health review
                </p>
              </div>
              <h2
                id="service-close-heading"
                className="max-w-xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
              >
                {service.cta.heading}
              </h2>
              {service.cta.subheading ? (
                <p className="mt-3 max-w-xl text-base font-medium leading-relaxed text-primary/85">
                  {service.cta.subheading}
                </p>
              ) : null}
              <div className="mt-6">
                <PrimaryButton asChild variant="primary" size="lg">
                  <Link href={service.cta.button.href}>
                    {service.cta.button.label}
                  </Link>
                </PrimaryButton>
              </div>
            </div>
            <div className="relative hidden min-h-[14rem] border-l-2 border-primary lg:block">
              <Image
                src="/images/services/amazon-account-health/ahl-ops-desk-v2.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="288px"
              />
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
