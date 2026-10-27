import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VidSilentProblemProps {
  service: ServicePageConfig;
}

/** Silent listing vs video lift strip - not draft/spec dump. */
export function VidSilentProblem({ service }: VidSilentProblemProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.2fr)] lg:items-stretch lg:gap-8">
          <div className="flex flex-col justify-center">
            <h2
              id="service-problem-heading"
              className="max-w-md text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
            >
              {problem.heading}
            </h2>
            <ul className="mt-6 space-y-3">
              {problem.points.map((point, index) => (
                <li key={point.title} className="border-l-2 border-accent pl-3">
                  <p className="font-mono text-[10px] font-bold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 text-sm font-black leading-snug text-text-on-dark sm:text-base">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-snug text-text-on-dark/70 sm:text-sm">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex flex-col overflow-hidden border-2 border-accent"
            aria-label="Silent listing versus video lift"
          >
            <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
              <div className="bg-[#1a1a18] p-5 sm:p-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-on-dark/50">
                  Silent listing
                </p>
                <div className="relative mt-4 aspect-video w-full overflow-hidden border border-text-on-dark/20 bg-[#131311]">
                  <Image
                    src="/images/services/amazon-video-creative/vid-silent.jpg"
                    alt=""
                    fill
                    className="object-cover opacity-70 grayscale"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                </div>
                <ul className="mt-4 space-y-2 text-sm font-medium text-text-on-dark/45">
                  <li className="line-through decoration-text-on-dark/40">
                    Still images only - setup unclear
                  </li>
                  <li className="line-through decoration-text-on-dark/40">
                    Scale and motion left to imagination
                  </li>
                  <li className="line-through decoration-text-on-dark/40">
                    Social film forced into PDP slot
                  </li>
                </ul>
              </div>
              <div className="border-t-2 border-accent bg-accent p-5 text-primary sm:border-t-0 sm:border-l-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary/70">
                  Video lift
                </p>
                <div className="relative mt-4 aspect-video w-full overflow-hidden border-2 border-primary bg-primary">
                  <Image
                    src="/images/services/amazon-video-creative/vid-lift.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" aria-hidden="true" />
                </div>
                <ul className="mt-4 space-y-2 text-sm font-black leading-snug text-primary">
                  <li>Product visible in the first seconds</li>
                  <li>Placement-sized cuts per channel</li>
                  <li>Claims match listing and A+</li>
                </ul>
              </div>
            </div>
            <p className="border-t-2 border-accent bg-[#222220] px-4 py-2 text-center font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-text-on-dark/50">
              Before / after · education in motion
            </p>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
