import Image from "next/image";
import Link from "next/link";
import { submitAuditForm } from "@/app/(marketing)/free-audit-2/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { PrimaryButton } from "@/components/ui/primary-button";
import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";
import { CatalogHealthBoard } from "./modules/catalog-health-board";
import { ServiceBreadcrumb } from "./service-breadcrumb";

interface ServiceHeroProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

const FALLBACK_REVENUE_OPTIONS = [
  { value: "", label: "Please select" },
  { value: "new", label: "New on Amazon, no sales yet" },
  { value: "under-10k", label: "$1 to $10,000" },
  { value: "10k-25k", label: "$10,000 to $25,000" },
  { value: "25k-50k", label: "$25,000 to $50,000" },
  { value: "50k-250k", label: "$50,000 to $250,000" },
  { value: "250k-plus", label: "$250,000+" },
];

/**
 * Per-layout hero grammar.
 * console-lead / proof-lead defer the lead form so the first viewport is physical proof, not a lime intake card.
 */
export type HeroPresentation =
  | "split-accent"
  | "split-panel"
  | "ops-sheet"
  | "stack-light"
  | "console-lead"
  | "proof-lead";

const HERO_BY_LAYOUT: Record<string, HeroPresentation> = {
  "catalog-ops": "console-lead",
  "brand-pathway": "split-panel",
  "entity-setup": "stack-light",
  "sourcing-ops": "ops-sheet",
  "dtc-channel": "split-panel",
  "lifecycle-ops": "proof-lead",
  "ppc-ops": "proof-lead",
  "reporting-ops": "ops-sheet",
  "dsp-ops": "split-accent",
  "account-ops": "proof-lead",
  "listing-seo": "split-panel",
  "copy-ops": "stack-light",
  "visual-ops": "proof-lead",
  "video-ops": "split-accent",
  "tiktok-ops": "stack-light",
  default: "split-accent",
};

export function getServiceHeroPresentation(
  layout: string,
): HeroPresentation {
  return HERO_BY_LAYOUT[layout] ?? HERO_BY_LAYOUT.default;
}

export function heroDefersForm(presentation: HeroPresentation): boolean {
  return presentation === "console-lead" || presentation === "proof-lead";
}

/**
 * Service hero — presentation varies by layout so pages do not share one form template.
 */
export function ServiceHero({ service, site }: ServiceHeroProps) {
  const partnerBadge = site.partnerBadges[0];
  const presentation = getServiceHeroPresentation(service.layout);
  const deferForm = heroDefersForm(presentation);
  const useAtmosphere =
    Boolean(service.hero.atmosphere) &&
    (presentation === "split-accent" ||
      presentation === "split-panel" ||
      presentation === "proof-lead");
  const atmosphere = useAtmosphere ? service.hero.atmosphere : undefined;
  const onDark = Boolean(atmosphere);
  const trustLine = [
    `${site.claims.revenueManaged} revenue managed`,
    `Helping sellers since ${site.claims.since}`,
    `${site.claims.teamSize} in-house specialists`,
    `${site.claims.retention} client retention`,
  ].join(" · ");

  const form = service.hero.form;
  const formHeading =
    form?.heading ?? `Talk to a ${service.breadcrumbLabel} specialist`;
  const formSubheading =
    form?.subheading ??
    "Share a few details. A strategist follows up within one business day.";
  const submitLabel = form?.submitLabel ?? service.hero.cta.label;

  const formFields =
    form?.fields ??
    [
      {
        name: "name",
        label: "Name",
        type: "text" as const,
        required: true,
        placeholder: "Enter name",
      },
      {
        name: "email",
        label: "Email",
        type: "email" as const,
        required: true,
        placeholder: "Enter email",
      },
      {
        name: "phone",
        label: "Phone",
        type: "tel" as const,
        required: true,
        placeholder: "201-555-0123",
      },
      {
        name: "brandName",
        label: "Brand / company",
        type: "text" as const,
        required: false,
        placeholder: "Enter brand name",
      },
      {
        name: "amazonStoreUrl",
        label: "Amazon store URL",
        type: "url" as const,
        required: false,
        placeholder: "https://www.amazon.com/stores/...",
      },
      {
        name: "monthlyRevenue",
        label: "Monthly Amazon revenue",
        type: "select" as const,
        required: false,
        options: FALLBACK_REVENUE_OPTIONS,
      },
    ];

  const consoleBoard = service.modules?.find(
    (module) => module.type === "catalogHealthBoard",
  );
  const browserProof = service.modules?.find(
    (module) => module.type === "browserProof",
  );
  const proofImage =
    browserProof && browserProof.type === "browserProof"
      ? browserProof.images[0]
      : undefined;

  const formShellClass = cn(
    "flex h-full scroll-mt-28 flex-col",
    "[&_button[role=combobox]]:rounded-[10px] [&_button[role=combobox]]:border [&_button[role=combobox]]:border-primary/25 [&_button[role=combobox]]:bg-background",
    "[&_input]:rounded-[10px] [&_input]:border [&_input]:border-primary/25 [&_input]:bg-background",
    "[&_label]:text-sm [&_label]:text-primary",
    "[&_textarea]:rounded-[10px] [&_textarea]:border [&_textarea]:border-primary/25 [&_textarea]:bg-background",
    presentation === "split-accent" &&
      "rounded-[16px] border-2 border-primary bg-accent p-5 shadow-[4px_4px_0_0_#131311] sm:p-6 lg:p-7 [&_button[role=combobox]]:border-2 [&_button[role=combobox]]:border-primary [&_input]:border-2 [&_input]:border-primary [&_textarea]:border-2 [&_textarea]:border-primary",
    presentation === "split-panel" &&
      "rounded-[14px] border border-primary/20 bg-background p-5 shadow-sm sm:p-6 lg:p-7",
    presentation === "ops-sheet" &&
      "overflow-hidden rounded-[12px] border border-primary/20 bg-background",
    presentation === "stack-light" &&
      "rounded-[12px] border border-primary/15 bg-surface-muted/80 p-5 sm:p-6",
  );

  const formInner = (
    <>
      {presentation === "ops-sheet" ? (
        <div className="flex items-center justify-between border-b border-primary/15 bg-surface-muted/80 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-text-secondary sm:px-5">
          <span>Request intake</span>
          <span>{service.breadcrumbLabel}</span>
        </div>
      ) : null}
      <div
        className={cn(
          presentation === "ops-sheet" ? "flex flex-1 flex-col p-4 sm:p-5" : null,
        )}
      >
        <h2
          className={cn(
            "font-black tracking-tight text-primary",
            presentation === "ops-sheet"
              ? "text-lg sm:text-xl"
              : "text-xl sm:text-2xl",
          )}
        >
          {formHeading}
        </h2>
        {formSubheading ? (
          <p
            className={cn(
              "mt-1.5 text-sm leading-snug sm:text-base",
              presentation === "split-accent"
                ? "text-primary/75"
                : "text-text-secondary",
            )}
          >
            {formSubheading}
          </p>
        ) : null}
        <div className="mt-5 flex-1">
          <ConfigurableForm
            formId={`service-audit-${service.slug}`}
            fields={formFields}
            submitLabel={submitLabel}
            consentLabel="I agree to the privacy policy and to being contacted about this request."
            action={submitAuditForm}
            initialState={initialFormActionState}
            density="compact"
            columns={2}
            submitVariant={
              presentation === "split-accent" ? "primary" : "accent"
            }
            submitFullWidth
            hiddenFields={{
              serviceInterest: service.breadcrumbLabel,
              serviceSlug: service.slug,
            }}
          />
        </div>
      </div>
    </>
  );

  const isStack = presentation === "stack-light";
  const isProofLead = presentation === "proof-lead";
  const isConsoleLead = presentation === "console-lead";
  const showEyebrow = !isProofLead && !isConsoleLead;

  const aside =
    isConsoleLead && consoleBoard && consoleBoard.type === "catalogHealthBoard" ? (
      <div className="min-w-0">
        <CatalogHealthBoard
          urlLabel={consoleBoard.urlLabel}
          disclaimer={consoleBoard.disclaimer}
          columns={consoleBoard.columns}
          rows={consoleBoard.rows}
          variant={consoleBoard.variant}
          boardLabel={consoleBoard.boardLabel}
        />
      </div>
    ) : isProofLead && proofImage ? (
      <div
        className={cn(
          "relative min-h-[16rem] overflow-hidden rounded-[12px] border border-accent/30 bg-primary/40 sm:min-h-[20rem]",
          "shadow-[0_24px_60px_-18px_rgba(0,0,0,0.55)]",
        )}
      >
        <Image
          src={proofImage.src}
          alt={proofImage.alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 50vw"
          quality={80}
          priority
        />
        {proofImage.caption ? (
          <p className="absolute inset-x-0 bottom-0 bg-primary/85 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
            {proofImage.caption}
          </p>
        ) : null}
      </div>
    ) : isProofLead ? (
      <div className="flex min-h-[14rem] items-end rounded-[12px] border border-accent/25 bg-primary/30 p-5 sm:min-h-[18rem]">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
          {service.breadcrumbLabel} · live account context
        </p>
      </div>
    ) : !deferForm ? (
      <div
        id="service-lead-form"
        className={cn(formShellClass, isStack && "max-w-3xl")}
      >
        {formInner}
      </div>
    ) : null;

  return (
    <section
      id="service-hero"
      aria-labelledby="service-hero-heading"
      className={cn(
        "relative scroll-mt-24 overflow-hidden",
        atmosphere
          ? "-mt-[4.75rem] border-b border-primary/20 sm:-mt-[5.5rem] md:-mt-[6rem]"
          : cn(
              "border-b border-primary/10",
              isConsoleLead ? "bg-surface-muted/40" : "bg-background",
              "pb-8 pt-7 sm:pb-10 sm:pt-9 lg:pb-12 lg:pt-10",
            ),
      )}
    >
      {atmosphere ? (
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={atmosphere.src}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            quality={80}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-primary/50" />
        </div>
      ) : null}

      <div
        className={cn(
          "container-page relative",
          atmosphere &&
            "pb-10 pt-[5.5rem] sm:pb-12 sm:pt-[6.25rem] md:pt-[6.75rem] lg:pb-14",
        )}
      >
        <ServiceBreadcrumb
          label={service.breadcrumbLabel}
          tone={onDark ? "onDark" : "light"}
          className={cn(
            "relative z-10 mb-6 flex justify-start sm:mb-7",
            !atmosphere && "mb-5 border-b border-primary/10 pb-4",
          )}
        />

        <div
          className={cn(
            "relative z-10 grid items-stretch gap-7",
            isStack || (isProofLead && !aside)
              ? "lg:grid-cols-1 lg:gap-8"
              : "lg:grid-cols-2 lg:gap-10",
          )}
        >
          <div
            className={cn(
              "flex flex-col",
              isStack || isProofLead ? "max-w-3xl" : "h-full",
            )}
          >
            {showEyebrow ? (
              <p
                className={cn(
                  "inline-flex w-fit max-w-full items-center px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] sm:text-[11px]",
                  onDark
                    ? "rounded-full border border-accent/50 bg-primary/40 text-accent backdrop-blur-sm"
                    : presentation === "ops-sheet"
                      ? "rounded-[4px] border border-primary/20 bg-surface-muted text-text-secondary"
                      : "rounded-full border border-primary/20 bg-surface-muted text-primary",
                )}
              >
                {service.breadcrumbLabel}
              </p>
            ) : null}

            <h1
              id="service-hero-heading"
              className={cn(
                "text-[clamp(1.85rem,3.4vw,2.65rem)] font-black leading-[1.08] tracking-[-0.02em] text-balance",
                showEyebrow ? "mt-4 sm:mt-5" : "mt-0",
                onDark ? "text-text-on-dark" : "text-text-primary",
              )}
            >
              {service.hero.title}
            </h1>

            <p
              className={cn(
                "mt-4 max-w-lg text-base font-normal leading-relaxed text-pretty sm:mt-5 sm:text-lg",
                onDark ? "text-text-on-dark/85" : "text-text-secondary",
                (isStack || isProofLead || isConsoleLead) && "max-w-2xl",
              )}
            >
              {service.hero.subtitle}
            </p>

            <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:mt-7 sm:flex-row sm:items-center">
              <PrimaryButton
                asChild
                variant="accent"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="#service-lead-form">{service.hero.cta.label}</Link>
              </PrimaryButton>
              <PrimaryButton
                asChild
                variant={onDark ? "onDark" : "primary"}
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link
                  href={
                    isConsoleLead
                      ? "#service-results"
                      : isProofLead
                        ? "#service-results"
                        : "#service-results"
                  }
                >
                  See case results
                </Link>
              </PrimaryButton>
            </div>

            <div
              className={cn(
                "pt-7 sm:pt-8",
                !isStack && !isProofLead && "mt-auto",
              )}
            >
              <p
                className={cn(
                  "text-sm font-medium leading-relaxed",
                  onDark ? "text-text-on-dark/75" : "text-text-secondary",
                )}
              >
                {trustLine}
              </p>
              {partnerBadge?.image ? (
                <div className="mt-5">
                  <div
                    className={cn(
                      "inline-flex items-center",
                      onDark &&
                        "rounded-[10px] border border-accent/40 bg-background/95 px-2 py-1.5",
                      !onDark &&
                        "rounded-[8px] border border-primary/15 bg-background px-2 py-1.5",
                    )}
                  >
                    <Image
                      src={partnerBadge.image}
                      alt={partnerBadge.label || "Amazon Ads Verified Partner"}
                      width={260}
                      height={74}
                      className="h-12 w-auto sm:h-14 lg:h-16"
                      sizes="260px"
                      quality={85}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {aside}
        </div>
      </div>
    </section>
  );
}
