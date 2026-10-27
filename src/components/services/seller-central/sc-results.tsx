import Image from "next/image";
import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ScResultsProps {
  service: ServicePageConfig;
}

const FALLBACK =
  "/images/services/amazon-seller-central-services/sc-hero-ops.jpg";

export function ScResults({ service }: ScResultsProps) {
  const { results } = service;
  if (!results?.items?.length) return null;

  return (
    <section
      id="service-results"
      className={cn("bg-background", serviceSectionPad)}
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
                className="group flex h-full flex-col overflow-hidden border-2 border-primary bg-[#F0F0EC] hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[16/10] w-full border-b-2 border-primary bg-[#E4E4E0]">
                  <Image
                    src={item.image ?? FALLBACK}
                    alt={item.imageAlt ?? ""}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="border-b-2 border-primary bg-[#E4E4E0] px-4 py-3">
                  <p className="text-2xl font-black tracking-tight text-primary">
                    {item.metric}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.06em] text-text-secondary">
                    {item.brand}
                  </p>
                </div>
                <p className="flex-1 p-4 text-sm font-medium leading-snug text-text-secondary">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
