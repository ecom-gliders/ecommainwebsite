import Image from "next/image";
import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VidProofProps {
  service: ServicePageConfig;
}

const PROOF_FRAMES: Record<string, string> = {
  nikketta: "/images/services/amazon-video-creative/vid-proof-case-a.jpg",
  gosports: "/images/services/amazon-video-creative/vid-proof-case-b.jpg",
};

function resolveFrame(brand: string) {
  const key = brand.toLowerCase();
  if (key.includes("nikketta") || key.includes("pet")) return PROOF_FRAMES.nikketta;
  if (key.includes("gosports") || key.includes("sports")) return PROOF_FRAMES.gosports;
  return PROOF_FRAMES.nikketta;
}

/** Case frames with timecode bars - not pull-quote typography. */
export function VidProof({ service }: VidProofProps) {
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
        <ul className="mt-8 grid gap-4 lg:grid-cols-2">
          {results.items.map((item, index) => (
            <li key={item.metric}>
              <Link
                href={item.href}
                className="group flex h-full flex-col overflow-hidden border-2 border-primary bg-[#F7F3EA] hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <div className="flex items-center justify-between border-b-2 border-primary bg-primary px-4 py-2">
                  <span className="font-mono text-[10px] font-bold text-accent">
                    CASE {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-text-on-dark/50">
                    00:00 / still + A+
                  </span>
                </div>
                <div className="relative aspect-[16/9] w-full border-b-2 border-primary bg-[#EDE8DF]">
                  <Image
                    src={resolveFrame(item.brand)}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-2xl font-black tracking-tight text-primary sm:text-[1.65rem]">
                    {item.metric}
                  </p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.06em] text-text-secondary">
                    {item.brand}
                  </p>
                  <p className="mt-3 flex-1 text-sm font-medium leading-snug text-text-secondary">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex w-fit border-2 border-primary bg-accent px-2 py-1 font-mono text-[10px] font-black uppercase text-primary">
                    Open case study
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
