import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import type { ServicesIndexConfig } from "@/domain/content/schemas";
import { BrandLogo } from "@/components/design-system/brand-logo";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SectionShell } from "@/components/sections/section-shell";

interface ServicesIndexHeroProps {
  hero: ServicesIndexConfig["hero"];
}

function MacBrowserFrame({
  image,
  imageAlt,
  url,
}: {
  image: string;
  imageAlt: string;
  url: string;
}) {
  return (
    <figure
      className="relative w-full"
      aria-label={`Browser preview of ${url}`}
    >
      <div className="overflow-hidden rounded-[12px] border border-white/15 bg-[#ececef] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)] ring-1 ring-black/20">
        <div className="flex h-10 items-center gap-3 bg-[#e4e4e7] px-3.5">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-black/8 bg-white px-2.5 py-1 shadow-sm">
            <Lock
              className="h-3 w-3 shrink-0 text-neutral-400"
              aria-hidden="true"
            />
            <span className="truncate text-xs font-medium text-neutral-500">
              {url}
            </span>
          </div>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            quality={75}
            aria-hidden="true"
            className="scale-125 object-cover opacity-80 blur-2xl saturate-150"
            priority
          />
          <div
            className="pointer-events-none absolute inset-0 bg-primary/35"
            aria-hidden="true"
          />
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            quality={85}
            className="object-contain object-center"
            priority
          />
        </div>
      </div>
    </figure>
  );
}

export function ServicesIndexHero({ hero }: ServicesIndexHeroProps) {
  return (
    <SectionShell
      id="services-hero"
      ariaLabelledBy="services-hero-heading"
      tone="primary"
      className={
        "relative z-0 overflow-hidden " +
        "-mt-[4.75rem] pt-[calc(4.75rem+3.5rem)] pb-16 " +
        "sm:-mt-[5.5rem] sm:pt-[calc(5.5rem+4rem)] sm:pb-20 " +
        "lg:-mt-24 lg:pt-[calc(6rem+4.5rem)] lg:pb-24"
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
        <div className="max-w-xl">
          <BrandLogo
            surface="onDark"
            className="text-[1.75rem] sm:text-[2.1rem]"
            priority
          />
          <h1
            id="services-hero-heading"
            className="mt-8 text-h1 text-text-on-dark sm:mt-10"
          >
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-body text-text-on-dark/85">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <PrimaryButton variant="accent" asChild className="w-full sm:w-auto">
              <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
            </PrimaryButton>
            {hero.secondaryCta ? (
              <a
                href={hero.secondaryCta.href}
                className="inline-flex min-h-11 items-center text-body font-semibold text-text-on-dark underline-offset-4 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                {hero.secondaryCta.label}
              </a>
            ) : null}
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-8 sm:grid-cols-4 sm:gap-x-4">
            {hero.trustStrip.map((item) => (
              <li key={item.label}>
                <p className="text-[1.35rem] font-bold leading-none tracking-tight text-accent sm:text-[1.5rem]">
                  {item.value}
                </p>
                <p className="mt-2 text-small leading-snug text-text-on-dark/70">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {hero.browser ? (
          <div className="relative overflow-hidden lg:overflow-visible lg:pl-2">
            <div
              className="pointer-events-none absolute -inset-6 rounded-full bg-accent/10 blur-3xl"
              aria-hidden="true"
            />
            <MacBrowserFrame
              image={hero.browser.image}
              imageAlt={hero.browser.imageAlt}
              url={hero.browser.url}
            />
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}
