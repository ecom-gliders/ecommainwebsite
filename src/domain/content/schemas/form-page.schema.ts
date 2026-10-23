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
  }),
  benefits: z.object({
    heading: z.string(),
    items: z.array(z.string()),
  }),
  form: formConfigSchema,
  trustSignals: z.object({
    heading: z.string(),
    stats: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    ),
    testimonial: z
      .object({
        quote: z.string(),
        author: z.string(),
        role: z.string(),
      })
      .optional(),
  }),
  fallbackContact: z.object({
    heading: z.string(),
    phoneLabel: z.string(),
    emailLabel: z.string(),
  }),
  faq: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),
  seo: pageSeoSchema,
});

export type ContactPageConfig = z.infer<typeof contactPageConfigSchema>;
export type FreeAuditPageConfig = z.infer<typeof freeAuditPageConfigSchema>;
