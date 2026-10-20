import { z } from "zod";
import { faqItemSchema } from "./faq.schema";
import { navLinkSchema } from "./nav-link.schema";
import { pageSeoSchema } from "./page-seo.schema";

const servicePointSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const serviceStepSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const serviceResultSchema = z.object({
  metric: z.string(),
  brand: z.string(),
  description: z.string(),
  href: z.string(),
});

const relatedServiceCardSchema = z.object({
  title: z.string(),
  description: z.string(),
  href: z.string(),
  icon: z.string().optional(),
});

const serviceSectionSchema = z.object({
  heading: z.string(),
  points: z.array(servicePointSchema),
});

const serviceFormFieldSchema = z.object({
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

const moduleImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const moduleBaseSchema = z.object({
  id: z.string(),
  heading: z.string().optional(),
  subheading: z.string().optional(),
});

/** Mid-page visual modules — hybrid differentiation catalog */
export const serviceModuleSchema = z.discriminatedUnion("type", [
  moduleBaseSchema.extend({
    type: z.literal("browserProof"),
    images: z.array(moduleImageSchema).min(1).max(4),
  }),
  moduleBaseSchema.extend({
    type: z.literal("comparisonTable"),
    columns: z.array(z.string()).min(2).max(4),
    rows: z
      .array(
        z.object({
          label: z.string(),
          values: z.array(z.string()).min(2).max(4),
        }),
      )
      .min(2)
      .max(8),
  }),
  moduleBaseSchema.extend({
    type: z.literal("processSteps"),
    steps: z.array(serviceStepSchema).min(2).max(6),
  }),
  moduleBaseSchema.extend({
    type: z.literal("metricChart"),
    chartLabel: z.string(),
    /** bars = horizontal; columns = vertical; stack = ranked index list. */
    variant: z.enum(["bars", "columns", "stack"]).optional(),
    points: z
      .array(
        z.object({
          label: z.string(),
          value: z.number(),
        }),
      )
      .min(2)
      .max(12),
    footnote: z.string(),
  }),
  moduleBaseSchema.extend({
    type: z.literal("proofGallery"),
    items: z.array(moduleImageSchema).min(1).max(6),
  }),
  moduleBaseSchema.extend({
    type: z.literal("checklistMatrix"),
    groups: z
      .array(
        z.object({
          title: z.string(),
          items: z.array(z.string()).min(1).max(8),
        }),
      )
      .min(1)
      .max(4),
  }),
  moduleBaseSchema.extend({
    type: z.literal("infographicSpotlight"),
    image: moduleImageSchema,
  }),
  moduleBaseSchema.extend({
    type: z.literal("catalogHealthBoard"),
    urlLabel: z.string(),
    disclaimer: z.string(),
    /** mac = light browser; seller-console = dark ops; sheet = hard panel table. */
    variant: z.enum(["mac", "seller-console", "sheet"]).optional(),
    /** Chrome label on sheet/mac header (defaults: Spec sheet / browser title). */
    boardLabel: z.string().optional(),
    columns: z.array(z.string()).min(2).max(6),
    rows: z
      .array(
        z.object({
          cells: z.array(z.string()).min(2).max(6),
        }),
      )
      .min(2)
      .max(8),
  }),
  moduleBaseSchema.extend({
    type: z.literal("brandPathwayBoard"),
    urlLabel: z.string(),
    disclaimer: z.string(),
    /** mac = browser grid; rail = timeline; stamp = numbered hard stamps. */
    variant: z.enum(["mac", "rail", "stamp"]).optional(),
    stages: z
      .array(
        z.object({
          label: z.string(),
          detail: z.string(),
          state: z.enum(["done", "current", "upcoming"]),
        }),
      )
      .min(3)
      .max(6),
  }),
  moduleBaseSchema.extend({
    type: z.literal("brandUnlockGrid"),
    note: z.string().optional(),
    /** Chrome label (default: brandregistry · tool access). */
    sheetLabel: z.string().optional(),
    items: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          unlocked: z.boolean(),
          /** Overrides default Brand Registry status copy when set. */
          statusLabel: z.string().optional(),
        }),
      )
      .min(3)
      .max(8),
  }),
]);

const opsLaneSchema = z.object({
  title: z.string(),
  issue: z.string(),
  fix: z.string(),
  verify: z.string(),
});

export const servicePageConfigSchema = z.object({
  slug: z.string(),
  breadcrumbLabel: z.string(),
  /** Per-service page composition. Custom layouts skip shared PSA card stack. */
  layout: z
    .enum([
      "default",
      "catalog-ops",
      "brand-pathway",
      "entity-setup",
      "sourcing-ops",
      "dtc-channel",
      "lifecycle-ops",
      "ppc-ops",
      "reporting-ops",
      "dsp-ops",
      "account-ops",
      "listing-seo",
      "copy-ops",
      "visual-ops",
      "video-ops",
      "tiktok-ops",
    ])
    .default("default"),
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    cta: navLinkSchema,
    /** Full-bleed atmosphere under sticky header (proof / ops pages). */
    atmosphere: z
      .object({
        src: z.string(),
        alt: z.string().optional(),
      })
      .optional(),
    /** Per-service lead form — copy + qualification fields researched for intent */
    form: z
      .object({
        heading: z.string(),
        subheading: z.string().optional(),
        submitLabel: z.string().optional(),
        fields: z.array(serviceFormFieldSchema).min(3).max(8),
      })
      .optional(),
  }),
  stats: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  problem: serviceSectionSchema,
  /** Who this service is for — conversion architecture section */
  audience: serviceSectionSchema.optional(),
  solution: z.object({
    heading: z.string(),
    steps: z.array(serviceStepSchema),
  }),
  deliverables: z.object({
    heading: z.string(),
    items: z.array(servicePointSchema),
  }),
  /** Differentiation vs typical agency / DIY approaches */
  differ: serviceSectionSchema.optional(),
  /** Catalog-ops: Issue → Fix → Verify lanes (not the shared card stack) */
  opsLanes: z
    .object({
      heading: z.string(),
      subheading: z.string().optional(),
      note: z.string().optional(),
      lanes: z.array(opsLaneSchema).min(2).max(4),
    })
    .optional(),
  /** Optional mid-page visual modules (Visual Differentiation Program) */
  modules: z.array(serviceModuleSchema).max(5).optional(),
  results: z.object({
    heading: z.string(),
    items: z.array(serviceResultSchema),
  }),
  faq: z.array(faqItemSchema),
  relatedServices: z.array(relatedServiceCardSchema),
  cta: z.object({
    heading: z.string(),
    subheading: z.string().optional(),
    button: navLinkSchema,
  }),
  seo: pageSeoSchema,
});

export type ServicePageConfig = z.infer<typeof servicePageConfigSchema>;
