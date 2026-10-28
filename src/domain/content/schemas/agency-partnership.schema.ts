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

export const agencyPartnershipPageConfigSchema = z.object({
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
  demand: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    intro: z.string(),
    signals: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
  lanes: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    intro: z.string(),
    items: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        summary: z.string(),
        bestWhen: z.string(),
        brandOnWork: z.string(),
      }),
    ),
  }),
  complement: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    intro: z.string(),
    yourPractice: z.object({
      heading: z.string(),
      items: z.array(z.string()),
    }),
    ourLanes: z.object({
      heading: z.string(),
      items: z.array(
        z.object({
          label: z.string(),
          href: z.string(),
        }),
      ),
    }),
    weDoNot: z.object({
      heading: z.string(),
      items: z.array(z.string()),
    }),
  }),
  protection: z.object({
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
  cadence: z.object({
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
    approve: z.object({
      heading: z.string(),
      items: z.array(z.string()),
    }),
    decline: z.object({
      heading: z.string(),
      items: z.array(z.string()),
    }),
  }),
  faq: z.object({
    heading: z.string(),
    items: z.array(faqItemSchema).min(1),
  }),
  application: z.object({
    id: z.string().default("partner-application"),
    eyebrow: z.string(),
    heading: z.string(),
    intro: z.string(),
    submitLabel: z.string(),
    successMessage: z.string(),
    errorMessage: z.string(),
    consentLabel: z.string(),
    laneOptions: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    ),
    volumeOptions: z.array(
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

export type AgencyPartnershipPageConfig = z.infer<
  typeof agencyPartnershipPageConfigSchema
>;
