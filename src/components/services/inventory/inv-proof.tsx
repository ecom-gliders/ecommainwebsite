import Image from "next/image";
import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface InvProofProps {
  service: ServicePageConfig;
}

export function InvProof({ service }: InvProofProps) {
  const { results } = service;
  if (!results?.items?.length) return null;

  return (
    <section
      id="service-results"
      className={cn("bg-[#E6E6E0]", serviceSectionPad)}
      aria-labelledby="service-results-heading"
    >
      <ServicePageShell>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
          Cover-aware outcomes
        </p>
        <h2
          id="service-results-heading"
          className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
        >
          {results.heading}
        </h2>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {results.items.map((item, index) => (
            <li key={item.metric}>
              <Link
                href={item.href}
                className="flex h-full flex-col overflow-hidden border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311] transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <div className="flex items-center justify-between border-b-2 border-primary bg-primary px-3 py-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                    Case {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-text-on-dark/60">
                    Inventory · ads
                  </span>
                </div>
                {item.image ? (
                  <div className="relative aspect-[16/10] border-b-2 border-primary bg-[#F4F4F4]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.brand}
                      fill
                      className="object-contain p-5"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-3xl font-black tracking-tight text-primary">
                    {item.metric}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-text-secondary">
                    {item.brand}
                  </p>
                  <p className="mt-3 text-sm font-medium leading-snug text-text-secondary sm:text-base">
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
