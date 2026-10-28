import Image from "next/image";
import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CatResultsProps {
  service: ServicePageConfig;
}

const PROOF_FRAMES: Record<string, string> = {
  kitchen: "/images/services/amazon-catalog-management/cat-proof-kitchen.jpg",
  focusform: "/images/services/amazon-catalog-management/cat-proof-focus.jpg",
};

function resolveFrame(brand: string) {
  const key = brand.toLowerCase();
  if (key.includes("kitchen") || key.includes("home")) return PROOF_FRAMES.kitchen;
  if (key.includes("focus") || key.includes("office")) return PROOF_FRAMES.focusform;
  return PROOF_FRAMES.kitchen;
}

/** Metric rail case cards - not pull-quote typography. */
export function CatResults({ service }: CatResultsProps) {
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
        <ul className="mt-8 grid gap-4 lg:grid-cols-2">
          {results.items.map((item) => (
            <li key={item.metric}>
              <Link
                href={item.href}
                className="group flex h-full flex-col overflow-hidden border-2 border-primary bg-background hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[16/9] w-full border-b-2 border-primary bg-[#EDE8DF]">
                  <Image
                    src={resolveFrame(item.brand)}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex border-b-2 border-primary">
                  <p className="flex-1 border-r-2 border-primary bg-primary px-4 py-3 font-mono text-lg font-black text-accent sm:text-xl">
                    {item.metric}
                  </p>
                  <p className="flex items-center px-4 py-3 text-xs font-bold uppercase tracking-[0.06em] text-text-secondary group-hover:text-primary">
                    {item.brand}
                  </p>
                </div>
                <p className="flex-1 p-4 text-sm font-medium leading-snug text-text-secondary group-hover:text-primary">
                  {item.description}
                </p>
                <span className="border-t-2 border-primary px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.1em] text-primary">
                  Case study
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
