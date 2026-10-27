import Image from "next/image";
import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VisProofProps {
  service: ServicePageConfig;
}

const PROOF_FRAMES: Record<
  string,
  { before: string; after: string }
> = {
  nikketta: {
    before: "/images/services/amazon-visual-creativity/vis-proof-nik-before.jpg",
    after: "/images/services/amazon-visual-creativity/vis-proof-nik-after.jpg",
  },
  gosports: {
    before: "/images/services/amazon-visual-creativity/vis-proof-go-before.jpg",
    after: "/images/services/amazon-visual-creativity/vis-proof-go-after.jpg",
  },
};

function resolveFrames(brand: string) {
  const key = brand.toLowerCase();
  if (key.includes("nikketta") || key.includes("pet")) return PROOF_FRAMES.nikketta;
  if (key.includes("gosports") || key.includes("sports")) return PROOF_FRAMES.gosports;
  return PROOF_FRAMES.nikketta;
}

/** Case outcomes as mounted frame pairs - not pull-quote typography alone. */
export function VisProof({ service }: VisProofProps) {
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
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.9rem]"
        >
          {results.heading}
        </h2>
        <ul className="mt-8 grid gap-5 lg:grid-cols-2">
          {results.items.map((item) => {
            const frames = resolveFrames(item.brand);
            return (
              <li key={item.metric}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col border-2 border-primary bg-[#F4F4F4] p-5 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-6"
                >
                  <div className="flex gap-3" aria-hidden="true">
                    <div className="w-1/2 border-2 border-primary bg-[#EDE8DF] p-1 opacity-80">
                      <div className="relative aspect-square overflow-hidden bg-primary/10">
                        <Image
                          src={frames.before}
                          alt=""
                          fill
                          className="object-cover grayscale"
                          sizes="200px"
                        />
                      </div>
                      <p className="mt-1 text-center font-mono text-xs font-bold uppercase text-text-secondary">
                        Before
                      </p>
                    </div>
                    <div className="w-1/2 border-2 border-primary bg-background p-1 shadow-[2px_2px_0_0_#C6F135]">
                      <div className="relative aspect-square overflow-hidden bg-[#F4F4F4]">
                        <Image
                          src={frames.after}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                      </div>
                      <p className="mt-1 text-center font-mono text-xs font-bold uppercase text-primary">
                        After
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-xl font-black tracking-tight text-primary sm:text-2xl">
                    {item.metric}
                  </p>
                  <p className="mt-1 text-base font-bold uppercase tracking-[0.06em] text-text-secondary">
                    {item.brand}
                  </p>
                  <p className="mt-2 flex-1 text-base font-medium leading-snug text-text-secondary">
                    {item.description}
                  </p>
                  <span className="mt-4 font-mono text-xs font-bold uppercase tracking-[0.1em] text-primary group-hover:text-primary">
                    View case study
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </ServicePageShell>
    </section>
  );
}
