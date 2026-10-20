import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { readNavLink, readRecordArray, readString } from "./section-data";
import { SectionShell } from "./section-shell";

interface ServicesSectionProps {
  id: string;
  data: Record<string, unknown>;
}

interface ServiceItem {
  title: string;
  description: string;
  href: string;
  number: string;
  image: string;
  imageAlt: string;
}

/**
 * Project One card grid — hard navy borders, numbered service tiles.
 * eCom service copy + URLs only.
 */
export function ServicesSection({ id, data }: ServicesSectionProps) {
  const eyebrow = readString(data.eyebrow, "What we run");
  const heading = readString(data.heading);
  const subheading = readString(data.subheading);
  const viewAll = readNavLink(data.viewAll);
  const headingId = `${id}-heading`;

  const items: ServiceItem[] = readRecordArray(data.items)
    .map((item) => {
      const title = readString(item.title);
      if (!title) return null;
      return {
        title,
        description: readString(item.description),
        href: readString(item.href),
        number: readString(item.number),
        image: readString(item.image),
        imageAlt: readString(item.imageAlt, title),
      };
    })
    .filter((item): item is ServiceItem => item !== null);

  if (items.length === 0) return null;

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={headingId}
      className="py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary sm:text-xs">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className="mt-3 text-[1.85rem] font-bold leading-[1.08] tracking-[-0.03em] text-text-primary text-balance sm:text-4xl lg:text-[2.75rem]"
        >
          {heading}
        </h2>
        {subheading ? (
          <p className="mt-4 text-base font-normal leading-relaxed text-text-secondary sm:text-lg">
            {subheading}
          </p>
        ) : null}
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {items.map((item, index) => {
          const number = item.number || String(index + 1).padStart(2, "0");
          const punch = index % 3 === 0;
          const card = (
            <article
              className={cn(
                "group flex h-full w-full flex-col overflow-hidden rounded-[10px] border-2 border-primary",
                "transition-[transform,box-shadow] duration-200",
                "hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#131311]",
                "focus-within:shadow-[6px_6px_0_0_#131311]",
                punch
                  ? "bg-primary text-text-on-dark"
                  : "bg-background text-primary",
              )}
            >
              {item.image ? (
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b-2 border-primary">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
                    className={cn(
                      "object-cover transition-transform duration-500 ease-out",
                      "group-hover:scale-[1.03]",
                      punch && "opacity-90",
                    )}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0",
                      punch
                        ? "bg-gradient-to-t from-primary/50 to-transparent"
                        : "bg-gradient-to-t from-background/20 to-transparent",
                    )}
                    aria-hidden="true"
                  />
                </div>
              ) : null}

              <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
                <span
                  className={cn(
                    "font-mono text-sm font-bold tracking-[0.14em]",
                    punch ? "text-accent" : "text-primary",
                  )}
                >
                  {number}
                </span>
                {/* AMZ Dudes card H3 ~19px; keep explicit colors so dark tiles never inherit ink */}
                <h3
                  className={cn(
                    "mt-3 text-[1.1875rem] font-bold leading-snug tracking-tight sm:text-[1.25rem]",
                    punch ? "text-text-on-dark" : "text-primary",
                  )}
                >
                  {item.title}
                </h3>
                {item.description ? (
                  <p
                    className={cn(
                      "mt-3 flex-1 text-[0.9375rem] font-normal leading-[1.65] sm:text-base sm:leading-relaxed",
                      punch ? "text-text-on-dark/90" : "text-text-secondary",
                    )}
                  >
                    {item.description}
                  </p>
                ) : null}

                {item.href ? (
                  <span
                    className={cn(
                      "mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.04em]",
                      punch ? "text-accent" : "text-primary",
                    )}
                  >
                    Learn more
                    <span
                      className={cn(
                        "inline-flex h-7 w-7 items-center justify-center rounded-[5px]",
                        punch
                          ? "bg-accent text-primary"
                          : "bg-primary text-text-on-dark",
                      )}
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                    </span>
                  </span>
                ) : null}
              </div>
            </article>
          );

          return (
            <li key={item.title} className="flex min-h-0">
              {item.href ? (
                <Link
                  href={item.href}
                  className="flex h-full w-full rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {card}
                </Link>
              ) : (
                card
              )}
            </li>
          );
        })}
      </ul>
      {viewAll ? (
        <div className="mt-8">
          <Link
            href={viewAll.href}
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.04em] text-primary underline-offset-4 hover:underline"
          >
            {viewAll.label}
            <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
          </Link>
        </div>
      ) : null}
    </SectionShell>
  );
}
