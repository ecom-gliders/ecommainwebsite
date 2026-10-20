import { z } from "zod";
import { pageSeoSchema } from "./page-seo.schema";

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

export const contactPageConfigSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  form: formConfigSchema,
  contactDetails: z.object({
    heading: z.string(),
    phoneLabel: z.string(),
    emailLabel: z.string(),
    addressLabel: z.string(),
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
