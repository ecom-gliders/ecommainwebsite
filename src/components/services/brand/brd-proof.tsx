import Image from "next/image";
import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface BrdProofProps {
  service: ServicePageConfig;
}

const PROOF_FRAMES: Record<string, string> = {
  focusform: "/images/services/amazon-trademark-brand-registry/brd-proof-focus.jpg",
  kitchen: "/images/services/amazon-trademark-brand-registry/brd-proof-kitchen.jpg",
};

function resolveFrame(brand: string) {
  const key = brand.toLowerCase();
  if (key.includes("focus") || key.includes("office")) return PROOF_FRAMES.focusform;
  if (key.includes("kitchen")) return PROOF_FRAMES.kitchen;
  return PROOF_FRAMES.focusform;
}

/** Approval-stamp case cards - not sparklines or pull quotes. */
export function BrdProof({ service }: BrdProofProps) {
  const { results } = service;
  if (!results?.items?.length) return null;

  return (
    <section
      id="service-results"
      className={cn("bg-[#F3EDE4]", serviceSectionPad)}
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
          {results.items.map((item, index) => (
            <li key={item.metric}>
              <Link
                href={item.href}
                className="relative flex h-full flex-col overflow-hidden border-2 border-primary bg-background hover:bg-[#FAF6EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[16/9] w-full border-b-2 border-primary bg-[#EDE8DF]">
                  <Image
                    src={resolveFrame(item.brand)}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <span
                    className="pointer-events-none absolute -right-3 -top-3 flex h-14 w-14 rotate-12 items-center justify-center rounded-full border-2 border-primary/30 bg-accent/80 font-mono text-xs font-black uppercase text-primary"
                    aria-hidden="true"
                  >
                    Verified
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                    Record {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-2xl font-black tracking-tight text-primary sm:text-[1.65rem]">
                    {item.metric}
                  </p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.06em] text-text-secondary">
                    {item.brand}
                  </p>
                  <p className="mt-2 flex-1 text-sm font-medium leading-snug text-text-secondary">
                    {item.description}
                  </p>
                  <span className="mt-4 font-mono text-xs font-bold uppercase tracking-[0.1em] text-primary">
                    Case study
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
