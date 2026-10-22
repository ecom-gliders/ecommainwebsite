import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SwingCallout } from "@/components/ui/swing-callout";
import { cn } from "@/lib/utils";
import { readNavLink, readRecordArray, readString } from "./section-data";
import { SectionShell } from "./section-shell";

interface CaseStudiesSectionProps {
  id: string;
  data: Record<string, unknown>;
}

interface CaseItem {
  metric: string;
  brand: string;
  category: string;
  service: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  atmosphere: string;
  atmosphereAlt: string;
}

/**
 * See Work companion — quiet hard case cards only (no brand chip row).
 * eCom metrics and brands only.
 */
export function CaseStudiesSection({ id, data }: CaseStudiesSectionProps) {
  const eyebrow = readString(data.eyebrow, "Selected results");
  const heading = readString(data.heading);
  const subheading = readString(data.subheading);
  const swingNote = readString(data.swingNote);
  const cta = readNavLink(data.cta);
  const headingId = `${id}-heading`;

  const items: CaseItem[] = readRecordArray(data.items)
    .map((item) => {
      const metric = readString(item.metric);
      const brand = readString(item.brand);
      if (!brand && !metric) return null;
      return {
        metric,
        brand,
        category: readString(item.category),
        service: readString(item.service),
        description: readString(item.description),
        href: readString(item.href),
        image: readString(item.image),
        imageAlt: readString(item.imageAlt, brand),
        atmosphere: readString(item.atmosphere),
        atmosphereAlt: readString(item.atmosphereAlt, brand),
      };
    })
    .filter((item): item is CaseItem => item !== null);

  if (items.length === 0) return null;

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={headingId}
      className="overflow-x-clip py-12 sm:py-16 lg:py-20"
    >
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="relative max-w-2xl">
          {eyebrow ? (
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary sm:text-xs">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={headingId}
            className="mt-3 text-[1.85rem] font-black leading-[1.05] tracking-[-0.04em] text-primary text-balance sm:text-[2.5rem] lg:text-[3rem] lg:leading-[1.05]"
          >
            {heading}
          </h2>
          {subheading ? (
            <p className="mt-4 text-base font-medium leading-relaxed text-text-secondary sm:text-lg">
              {subheading}
            </p>
          ) : null}
          {swingNote ? (
            <SwingCallout
              text={swingNote}
              arrow="down-right"
              className="absolute -right-4 top-0 xl:-right-40 xl:top-2"
              tilt="rotate-[-4deg]"
            />
          ) : null}
        </div>
        {cta ? (
          <PrimaryButton
            asChild
            variant="primary"
            className="hidden w-full shrink-0 sm:inline-flex sm:w-auto"
          >
            <Link href={cta.href}>{cta.label}</Link>
          </PrimaryButton>
        ) : null}
      </div>

      <ul className="mt-8 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-10 sm:gap-5 [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:items-stretch md:overflow-visible md:pb-0">
        {items.map((item) => {
          const key = `${item.brand}-${item.metric}`;
          const scene = item.atmosphere || item.image;
          const sceneAlt = item.atmosphereAlt || item.imageAlt || item.brand;

          return (
            <li
              key={key}
              className="flex h-full w-[min(85vw,20rem)] shrink-0 md:w-auto md:min-w-0"
            >
              <article
                className={cn(
                  "case-proof-card group flex w-full flex-1 flex-col overflow-hidden rounded-[16px] border-2 border-primary bg-[#F4F4F4]",
                  "shadow-[4px_4px_0_0_#131311] transition-transform duration-300",
                  "hover:-translate-y-0.5",
                  "focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2",
                )}
              >
                {scene ? (
                  <div className="case-proof-media relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-primary">
                    <Image
                      src={scene}
                      alt=""
                      fill
                      aria-hidden="true"
                      className="case-proof-blur scale-125 object-cover opacity-70 blur-2xl"
                      sizes="(max-width: 768px) 85vw, 33vw"
                      quality={70}
                      loading="lazy"
                    />
                    <Image
                      src={scene}
                      alt={sceneAlt}
                      fill
                      className="media-hover-zoom object-cover"
                      sizes="(max-width: 768px) 85vw, 33vw"
                      quality={80}
                      loading="lazy"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"
                      aria-hidden="true"
                    />

                    {item.image ? (
                      <div className="absolute left-3 top-3 z-10 h-11 w-11 overflow-hidden rounded-[5px] border-2 border-primary bg-background shadow-[3px_3px_0_0_#131311] sm:h-12 sm:w-12">
                        <Image
                          src={item.image}
                          alt={item.imageAlt || item.brand}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                          quality={80}
                          loading="lazy"
                        />
                      </div>
                    ) : null}

                    {item.metric ? (
                      <p className="absolute bottom-3 left-3 right-3 z-10 text-2xl font-black tracking-tight text-accent sm:bottom-4 sm:left-4 sm:text-3xl">
                        {item.metric}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
                  {item.brand ? (
                    <h3 className="text-lg font-bold tracking-tight text-primary sm:text-xl">
                      {item.brand}
                    </h3>
                  ) : null}

                  {(item.category || item.service) && (
                    <p className="mt-1 text-sm font-semibold leading-snug text-text-secondary">
                      {[item.category, item.service]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}

                  {item.description ? (
                    <p className="mt-3 line-clamp-2 flex-1 text-[0.9375rem] font-medium leading-relaxed text-text-primary/80 sm:text-base">
                      {item.description}
                    </p>
                  ) : null}

                  {item.href ? (
                    <Link
                      href={item.href}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      Read case study
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {cta ? (
        <div className="mt-8 flex sm:hidden">
          <PrimaryButton asChild variant="primary" className="w-full">
            <Link href={cta.href}>{cta.label}</Link>
          </PrimaryButton>
        </div>
      ) : null}
    </SectionShell>
  );
}
