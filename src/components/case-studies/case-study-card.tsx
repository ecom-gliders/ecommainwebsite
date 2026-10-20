import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { CaseStudyCard } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";

interface CaseStudyCardItemProps {
  study: CaseStudyCard;
}

export function CaseStudyCardItem({ study }: CaseStudyCardItemProps) {
  const displayName = study.clientDisplayName ?? study.client;
  const imageAlt = study.featuredImageAlt ?? `${displayName} case study`;
  const scene = study.atmosphere || study.featuredImage;
  const sceneAlt = study.atmosphereAlt || imageAlt;

  return (
    <li className="flex h-full min-w-0">
      <article
        className={cn(
          "case-proof-card group flex w-full flex-1 flex-col overflow-hidden rounded-[16px] border-2 border-primary bg-[#F4F4F4]",
          "shadow-[4px_4px_0_0_#131311] transition-transform duration-300",
          "hover:-translate-y-0.5",
          "focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2",
        )}
      >
        {scene ? (
          <div className="case-proof-media relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-primary">
            <Image
              src={scene}
              alt=""
              fill
              aria-hidden="true"
              className="case-proof-blur scale-125 object-cover opacity-70 blur-2xl"
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={70}
              loading="lazy"
            />
            <Image
              src={scene}
              alt={sceneAlt}
              fill
              className="media-hover-zoom object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={80}
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-transparent"
              aria-hidden="true"
            />

            {study.featuredImage ? (
              <div className="absolute left-3 top-3 z-10 h-11 w-11 overflow-hidden rounded-[5px] border-2 border-primary bg-background shadow-[3px_3px_0_0_#131311] sm:h-12 sm:w-12">
                <Image
                  src={study.featuredImage}
                  alt={imageAlt}
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                  quality={80}
                  loading="lazy"
                />
              </div>
            ) : null}

            <p className="absolute bottom-3 left-3 right-3 z-10 text-2xl font-black tracking-tight text-accent sm:bottom-4 sm:left-4 sm:text-3xl">
              {study.metric}
              <span className="ml-2 text-sm font-bold uppercase tracking-wide text-background/90 sm:text-base">
                {study.metricLabel}
              </span>
            </p>
          </div>
        ) : null}

        <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
          <h3 className="text-lg font-bold tracking-tight text-primary sm:text-xl">{displayName}</h3>
          <p className="mt-1 text-sm font-normal text-text-secondary">
            {[study.category, study.service, study.duration].filter(Boolean).join(" · ")}
          </p>
          {study.secondaryMetric ? (
            <p className="mt-2 text-sm font-semibold text-primary">
              {study.secondaryMetric}
              {study.secondaryMetricLabel ? (
                <span className="font-normal text-text-secondary"> · {study.secondaryMetricLabel}</span>
              ) : null}
            </p>
          ) : null}
          <p className="mt-3 line-clamp-2 flex-1 text-sm font-normal leading-relaxed text-text-secondary">
            {study.excerpt}
          </p>
          <Link
            href={study.href}
            className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Read case study
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </li>
  );
}
