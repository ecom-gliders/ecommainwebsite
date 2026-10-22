import Image from "next/image";
import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import { resolveBlockImage } from "@/lib/services/resolve-block-image";
import { cn } from "@/lib/utils";
import { serviceHardPanel } from "../service-hard-panel";
import { ServiceAudienceSection } from "./service-audience-section";
import { ServiceProblemSection } from "./service-problem-section";
import { ServiceSolutionSection } from "./service-solution-section";

interface ServiceDepthBandProps {
  service: ServicePageConfig;
  /** When true, skip problem (already shown earlier). */
  omitProblem?: boolean;
}

/**
 * AMZ Dudes-style depth: who it's for, what is included, how engagement works.
 * Used on custom layouts that previously skipped the shared PSA stack.
 */
export function ServiceDepthBand({
  service,
  omitProblem = false,
}: ServiceDepthBandProps) {
  return (
    <>
      {omitProblem ? null : <ServiceProblemSection problem={service.problem} />}

      {service.audience ? (
        <ServiceAudienceSection audience={service.audience} />
      ) : null}

      <SectionShell
        id="service-includes"
        tone="muted"
        ariaLabelledBy="service-includes-heading"
        className="py-10 sm:py-12 lg:py-14"
      >
        <SectionHeading
          kicker="What is included"
          heading={service.deliverables.heading}
          headingId="service-includes-heading"
        />
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3.5">
          {service.deliverables.items.map((item, index) => {
            const image = resolveBlockImage(item.title, index, {
              src: item.image,
              alt: item.imageAlt,
            });

            const body = (
              <>
                <div className="relative aspect-[16/7] w-full border-b-2 border-primary bg-surface-muted">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={70}
                  />
                </div>
                <div className="flex gap-3 p-4 sm:p-5">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[1.125rem] font-bold leading-none text-primary"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[1.0625rem] font-bold leading-snug text-primary group-hover:underline group-hover:underline-offset-4 sm:text-[1.125rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-[1.6] text-text-secondary sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </>
            );

            return (
              <li
                key={item.title}
                className={cn(
                  serviceHardPanel,
                  "overflow-hidden bg-background",
                  item.href &&
                    "transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#131311]",
                )}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    aria-label={`View ${item.title}`}
                  >
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ol>
      </SectionShell>

      <ServiceSolutionSection
        solution={{
          heading: service.solution.heading,
          steps: service.solution.steps,
        }}
        tone="default"
      />

      {service.differ ? (
        <SectionShell id="service-differ-depth" ariaLabelledBy="service-differ-depth-heading">
          <SectionHeading
            kicker="How we work differently"
            heading={service.differ.heading}
            headingId="service-differ-depth-heading"
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {service.differ.points.map((point) => (
              <li key={point.title} className={cn(serviceHardPanel, "p-6")}>
                <h3 className="text-h4 text-primary">{point.title}</h3>
                <p className="mt-2 text-body font-medium text-text-secondary">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </SectionShell>
      ) : null}
    </>
  );
}
