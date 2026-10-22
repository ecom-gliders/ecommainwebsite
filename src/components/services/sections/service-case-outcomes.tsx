import Image from "next/image";
import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import { cn } from "@/lib/utils";
import { serviceHardPanel } from "../service-hard-panel";

interface ServiceCaseOutcomesProps {
  id?: string;
  heading: string;
  subheading?: string;
  items: ServicePageConfig["results"]["items"];
}

/**
 * AMZ Dudes-style case results: product/brand image + large metric + short fact line.
 */
export function ServiceCaseOutcomes({
  id = "service-case-outcomes",
  heading,
  subheading,
  items,
}: ServiceCaseOutcomesProps) {
  if (items.length === 0) return null;

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={`${id}-heading`}
      className="py-10 sm:py-12 lg:py-14"
    >
      <SectionHeading
        kicker="Case results"
        heading={heading}
        subheading={subheading}
        headingId={`${id}-heading`}
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {items.map((item) => (
          <li key={`${item.brand}-${item.metric}`}>
            <Link
              href={item.href}
              className={cn(
                serviceHardPanel,
                "group flex h-full flex-col overflow-hidden bg-background",
                "transition-[transform,box-shadow] duration-200",
                "hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#131311]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              )}
            >
              {item.image ? (
                <div className="relative aspect-[16/10] w-full border-b-2 border-primary bg-surface-muted">
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? `${item.brand} case study`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="border-l-[3px] border-accent pl-3 text-[clamp(1.75rem,3vw,2.35rem)] font-black leading-none tracking-tight text-primary">
                  {item.metric}
                </p>
                <h3 className="mt-3 text-h4 text-primary group-hover:underline group-hover:underline-offset-4">
                  {item.brand}
                </h3>
                <p className="mt-2 flex-1 text-[0.9375rem] font-medium leading-[1.65] text-text-primary/80 sm:text-base sm:leading-relaxed">
                  {item.description}
                </p>
                <span className="mt-4 text-sm font-bold uppercase tracking-[0.04em] text-primary">
                  Read case study
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
