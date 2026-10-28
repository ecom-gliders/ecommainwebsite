import { z } from "zod";
import { pageSeoSchema } from "./page-seo.schema";

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const roleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  locationLine: z.string(),
  employmentType: z.string(),
  summary: z.string(),
  outcomes: z.array(z.string()).min(1),
  about: z.string(),
  responsibilities: z.array(z.string()).min(1),
  mustHaves: z.array(z.string()).min(1),
  niceToHaves: z.array(z.string()).default([]),
});

export const careersPageConfigSchema = z.object({
  seo: pageSeoSchema,
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    forLine: z.string(),
    notForLine: z.string(),
    primaryCta: linkSchema,
    secondaryCta: linkSchema,
    trustChips: z.array(z.string()).default([]),
  }),
  bench: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    intro: z.string(),
    items: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
  openRoles: z.object({
    id: z.string().default("open-roles"),
    eyebrow: z.string(),
    heading: z.string(),
    intro: z.string(),
  }),
  roles: z.array(roleSchema).min(1),
  process: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    intro: z.string(),
    steps: z.array(
      z.object({
        number: z.string(),
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
  fit: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    intro: z.string(),
    hire: z.object({
      heading: z.string(),
      items: z.array(z.string()),
    }),
    pass: z.object({
      heading: z.string(),
      items: z.array(z.string()),
    }),
  }),
  faq: z.object({
    heading: z.string(),
    items: z.array(faqItemSchema).min(1),
  }),
  application: z.object({
    id: z.string().default("career-application"),
    eyebrow: z.string(),
    heading: z.string(),
    intro: z.string(),
    submitLabel: z.string(),
    successMessage: z.string(),
    errorMessage: z.string(),
    consentLabel: z.string(),
    roleOptions: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    ),
    experienceOptions: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    ),
  }),
  close: z.object({
    heading: z.string(),
    body: z.string(),
    emailLabel: z.string(),
  }),
});

export type CareersPageConfig = z.infer<typeof careersPageConfigSchema>;
