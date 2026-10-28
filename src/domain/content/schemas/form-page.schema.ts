import { z } from "zod";
import { pageSeoSchema } from "./page-seo.schema";

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const formFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(["text", "email", "tel", "url", "textarea", "select"]),
  required: z.boolean(),
  placeholder: z.string().optional(),
  options: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .optional(),
});

const formConfigSchema = z.object({
  heading: z.string(),
  submitLabel: z.string(),
  successMessage: z.string(),
  errorMessage: z.string(),
  consentLabel: z.string(),
  fields: z.array(formFieldSchema),
});

const optionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const contactPageConfigSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    hoursLine: z.string(),
    slaLine: z.string(),
  }),
  paths: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        description: z.string(),
        href: z.string(),
      }),
    )
    .min(1),
  form: formConfigSchema,
  contactDetails: z.object({
    heading: z.string(),
    phoneLabel: z.string(),
    emailLabel: z.string(),
    addressLabel: z.string(),
    hoursLabel: z.string(),
    hoursValue: z.string(),
    mapsLabel: z.string(),
    mapsUrl: z.string(),
    roleEmails: z.array(
      z.object({
        label: z.string(),
        email: z.string().email(),
      }),
    ),
  }),
  intakeWizard: z.object({
    heading: z.string(),
    subheading: z.string(),
    submitLabel: z.string(),
    successMessage: z.string(),
    errorMessage: z.string(),
    consentLabel: z.string(),
    services: z.array(optionSchema).min(1),
    marketplaces: z.array(optionSchema).min(1),
    revenueOptions: z.array(optionSchema).min(1),
  }),
  process: z.object({
    heading: z.string(),
    steps: z
      .array(
        z.object({
          number: z.string(),
          title: z.string(),
          description: z.string(),
        }),
      )
      .min(1),
  }),
  faq: z.object({
    heading: z.string(),
    items: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .min(1),
  }),
  internalLinks: z.object({
    heading: z.string(),
    links: z.array(linkSchema).min(1),
  }),
  seo: pageSeoSchema,
});

export const freeAuditPageConfigSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    ctaLabel: z.string(),
    scorecardCaption: z.string(),
  }),
  scorecard: z.object({
    title: z.string(),
    pillars: z
      .array(
        z.object({
          label: z.string(),
          scoreLabel: z.string(),
          scorePercent: z.number().min(0).max(100),
        }),
      )
      .min(1),
  }),
  scope: z.object({
    heading: z.string(),
    subheading: z.string(),
    pillars: z
      .array(
        z.object({
          id: z.string(),
          label: z.string(),
          summary: z.string(),
          checks: z.array(z.string()).min(1),
        }),
      )
      .min(1),
  }),
  findings: z.object({
    heading: z.string(),
    subheading: z.string(),
    items: z
      .array(
        z.object({
          severity: z.enum(["high", "medium", "low"]),
          title: z.string(),
          impact: z.string(),
        }),
      )
      .min(1),
  }),
  turnaround: z.object({
    heading: z.string(),
    steps: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      )
      .min(1),
  }),
  booking: z.object({
    heading: z.string(),
    subheading: z.string(),
    calendlyUrl: z
      .string()
      .url()
      .refine(
        (value) => value.startsWith("https://calendly.com/"),
        "calendlyUrl must be an https://calendly.com/ link",
      ),
    embedTitle: z.string(),
  }),
  /** Multi-step intake funnel — used in Free Audit popup (Calendly remains on /free-audit/). */
  form: formConfigSchema,
  funnel: z.object({
    services: z.array(optionSchema).min(1),
    marketplaces: z.array(optionSchema).min(1),
    /** Shown inside the popup only after a successful funnel submit. */
    booking: z.object({
      heading: z.string(),
      subheading: z.string(),
      calendlyUrl: z
        .string()
        .url()
        .refine(
          (value) => value.startsWith("https://calendly.com/"),
          "funnel.booking.calendlyUrl must be an https://calendly.com/ link",
        ),
      embedTitle: z.string(),
      eyebrow: z.string(),
    }),
  }),
  trustSignals: z.object({
    heading: z.string(),
    stats: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      )
      .min(1),
  }),
  caseProof: z.object({
    metric: z.string(),
    metricLabel: z.string(),
    summary: z.string(),
    href: z.string(),
    label: z.string(),
  }),
  fallbackContact: z.object({
    heading: z.string(),
    phoneLabel: z.string(),
    emailLabel: z.string(),
    contactCtaLabel: z.string(),
    contactCtaHref: z.string(),
  }),
  faq: z.object({
    heading: z.string(),
    items: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .min(1),
  }),
  seo: pageSeoSchema,
});

export type ContactPageConfig = z.infer<typeof contactPageConfigSchema>;
export type FreeAuditPageConfig = z.infer<typeof freeAuditPageConfigSchema>;
