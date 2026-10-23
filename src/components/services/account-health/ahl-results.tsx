import Link from "next/link";
import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface AhlResultsProps {
  service: ServicePageConfig;
}

export function AhlResults({ service }: AhlResultsProps) {
  const { results } = service;
  if (!results?.items?.length) return null;

  return (
    <section
      id="service-results"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-results-heading"
    >
      <ServicePageShell>
        <h2
          id="service-results-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {results.heading}
        </h2>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {results.items.map((item) => (
            <li key={item.metric}>
              <Link
                href={item.href}
                className="flex h-full flex-col overflow-hidden border-2 border-primary bg-background hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {item.image ? (
                  <div className="relative aspect-[16/10] border-b-2 border-primary bg-[#F4F4F4]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.brand}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="text-2xl font-black tracking-tight text-primary">
                    {item.metric}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.06em] text-text-secondary">
                    {item.brand}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-snug text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
