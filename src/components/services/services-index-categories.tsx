import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type {
  ServicesIndexCategory,
  ServicesIndexServiceCard,
} from "@/domain/content/schemas";
import { SectionShell } from "@/components/sections/section-shell";
import { ServicesIndexCatalogRail } from "./services-index-catalog-rail";
import { cn } from "@/lib/utils";

interface ServicesIndexCategoriesProps {
  categories: ServicesIndexCategory[];
}

function ServiceCard({
  service,
  priority,
}: {
  service: ServicesIndexServiceCard;
  priority?: boolean;
}) {
  const isFlagship = Boolean(service.featured);

  return (
    <li id={service.id} className="min-h-0">
      <Link
        href={service.href}
        className="flex h-full rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <article
          className={cn(
            "group relative h-full min-h-[220px] w-full overflow-hidden rounded-[10px] border-2 border-primary sm:min-h-[240px] lg:min-h-[260px]",
            "transition-[transform,box-shadow] duration-200",
            "hover:-translate-y-0.5",
            isFlagship
              ? "hover:shadow-[5px_5px_0_0_#9FE870]"
              : "hover:shadow-[5px_5px_0_0_#131311]",
          )}
        >
          {service.image ? (
            <Image
              src={service.image}
              alt={service.imageAlt ?? service.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              loading={priority ? "eager" : "lazy"}
              priority={priority}
            />
          ) : (
            <div
              className={cn(
                "absolute inset-0",
                isFlagship ? "bg-primary" : "bg-surface",
              )}
              aria-hidden="true"
            />
          )}

          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              isFlagship
                ? "bg-gradient-to-t from-primary via-primary/80 to-primary/20"
                : "bg-gradient-to-t from-primary/90 via-primary/50 to-transparent",
            )}
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 bottom-0 flex flex-col p-3 sm:p-3.5">
            {isFlagship ? (
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
                Flagship
              </p>
            ) : null}
            <div
              className={cn(
                "flex items-start justify-between gap-2",
                isFlagship && "mt-0.5",
              )}
            >
              <h3 className="line-clamp-2 text-sm font-bold leading-snug tracking-tight text-text-on-dark sm:text-base">
                {service.title}
              </h3>
              <ArrowUpRight
                aria-hidden="true"
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  isFlagship ? "text-accent" : "text-text-on-dark",
                )}
              />
            </div>
            <p className="mt-1 line-clamp-2 text-xs font-medium leading-snug text-text-on-dark/80">
              {service.description}
            </p>
            <span
              className={cn(
                "mt-2 inline-flex items-center text-[11px] font-bold uppercase tracking-[0.04em]",
                isFlagship ? "text-accent" : "text-text-on-dark",
              )}
            >
              Explore
            </span>
          </div>
        </article>
      </Link>
    </li>
  );
}

export function ServicesIndexCategories({
  categories,
}: ServicesIndexCategoriesProps) {
  return (
    <div id="services-catalog">
      <ServicesIndexCatalogRail
        categories={categories.map(({ id, title }) => ({ id, title }))}
      />

      {categories.map((category, categoryIndex) => (
        <SectionShell
          key={category.id}
          id={category.id}
          ariaLabelledBy={`${category.id}-heading`}
          tone={categoryIndex % 2 === 0 ? "muted" : "default"}
          className="py-10 sm:py-14"
        >
          <div className="max-w-2xl">
            <h2 id={`${category.id}-heading`} className="text-h2 text-primary">
              {category.title}
            </h2>
            <p className="mt-2 text-body text-text-secondary">
              {category.description}
            </p>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3">
            {category.services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                priority={categoryIndex === 0 && index === 0}
              />
            ))}
          </ul>
        </SectionShell>
      ))}
    </div>
  );
}
