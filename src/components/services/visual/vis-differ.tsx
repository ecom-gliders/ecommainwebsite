import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VisDifferProps {
  service: ServicePageConfig;
}

const GENERIC_STACK = [
  "Stock template pack",
  "Random upload order",
  "No mobile hierarchy",
  "Detached from copy",
];

const DIFFER_IMAGES = [
  "/images/services/amazon-visual-creativity/vis-differ-gallery.jpg",
  "/images/services/amazon-visual-creativity/vis-differ-modules.jpg",
  "/images/services/amazon-visual-creativity/vis-differ-standards.jpg",
  "/images/services/amazon-visual-creativity/vis-differ-audit.jpg",
] as const;

/** Template stack vs sequenced frames - not manuscript quote blocks. */
export function VisDiffer({ service }: VisDifferProps) {
  const differ = service.differ;
  if (!differ?.points?.length) return null;

  return (
    <section
      id="service-differ"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-differ-heading"
    >
      <ServicePageShell>
        <h2
          id="service-differ-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.9rem]"
        >
          {differ.heading}
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch">
          <div
            className="relative border-2 border-primary/30 bg-background p-5"
            aria-label="Generic visual stack"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
              Generic stack
            </p>
            <ul className="relative mt-6 h-48">
              {GENERIC_STACK.map((line, index) => (
                <li
                  key={line}
                  className="absolute left-0 w-[85%] border border-primary/20 bg-[#EDE8DF] px-3 py-2 text-xs font-medium text-text-secondary line-through"
                  style={{
                    top: `${index * 2.25}rem`,
                    marginLeft: `${index * 0.75}rem`,
                    zIndex: GENERIC_STACK.length - index,
                  }}
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {differ.points.map((point, index) => (
              <li
                key={point.title}
                className="flex flex-col border-2 border-primary bg-primary p-4 text-text-on-dark"
              >
                <div className="relative mb-3 h-20 overflow-hidden border border-accent/40 bg-[#1a1a18]">
                  <Image
                    src={DIFFER_IMAGES[index] ?? DIFFER_IMAGES[0]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                </div>
                <h3 className="text-lg font-black sm:text-lg">{point.title}</h3>
                <p className="mt-1.5 text-base font-medium leading-snug text-text-on-dark/80">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </ServicePageShell>
    </section>
  );
}
