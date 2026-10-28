import { z } from "zod";
import { navLinkSchema, phoneSchema } from "./nav-link.schema";

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  formatted: z.string(),
});

const partnerBadgeSchema = z.object({
  label: z.string(),
  image: z.string(),
  href: z.string().url().optional(),
});

export const siteConfigSchema = z.object({
  name: z.string().min(1),
  tagline: z.string(),
  phone: phoneSchema,
  email: z.string().email(),
  address: addressSchema,
  social: z.object({
    facebook: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    instagram: z.string().url().optional(),
    twitter: z.string().url().optional(),
    youtube: z.string().url().optional(),
  }),
  partnerBadges: z.array(partnerBadgeSchema),
  claims: z.object({
    revenueManaged: z.string().optional(),
    retention: z.string().optional(),
    teamSize: z.string().optional(),
    since: z.string().optional(),
  }),
  announcementBar: z.object({
    enabled: z.boolean(),
    /**
     * Top-bar presentation:
     * - promo: event banner (people / badge / copy / CTA / packages)
     * - ai: compact Ask-AI chip strip
     * - text: legacy message + items
     */
    variant: z.enum(["promo", "ai", "text"]).default("promo"),
    kicker: z.string().optional(),
    message: z.string().optional(),
    items: z.array(z.string()).default([]),
    link: navLinkSchema.optional(),
    /** Event promo banner — swap copy/images/CTA in site.json without code changes. */
    promo: z
      .object({
        eyebrow: z.string().optional(),
        headline: z.string().min(1),
        body: z.string().optional(),
        cta: navLinkSchema,
        ctaExternal: z.boolean().optional(),
        background: z.string().optional(),
        leftImage: z.string().optional(),
        leftImageAlt: z.string().optional(),
        badgeImage: z.string().optional(),
        badgeImageAlt: z.string().optional(),
        rightImage: z.string().optional(),
        rightImageAlt: z.string().optional(),
      })
      .optional(),
    /** Retained for homepage Ask AI section (and variant "ai"). */
    actions: z
      .array(
        navLinkSchema.extend({
          style: z
            .enum(["accent", "outline", "chatgpt", "claude", "ai"])
            .optional(),
          external: z.boolean().optional(),
        }),
      )
      .optional(),
  }),
  preFooter: z.object({
    headline: z.string(),
    subheadline: z.string().optional(),
    cta: navLinkSchema,
    phone: phoneSchema,
    email: z.string().email(),
  }),
  copyright: z.object({
    year: z.number().int(),
    holder: z.string(),
  }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
