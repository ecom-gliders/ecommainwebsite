import { z } from "zod";
import { navLinkSchema, phoneSchema } from "./nav-link.schema";

const headerLinkSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    label: z.string(),
    type: z.literal("megaMenu"),
    /** Optional hub URL — label click navigates here; hover still opens mega menu */
    href: z.string().optional(),
  }),
  z.object({
    id: z.string(),
    label: z.string(),
    type: z.literal("link"),
    href: z.string(),
    external: z.boolean().optional(),
  }),
]);

const megaMenuColumnSchema = z.object({
  id: z.string(),
  title: z.string(),
  links: z.array(navLinkSchema),
});

const megaMenuPanelSchema = z.object({
  columns: z.array(megaMenuColumnSchema).min(1),
  footerLink: navLinkSchema.optional(),
  compact: z.boolean().optional(),
  ctaPanel: z
    .object({
      eyebrow: z.string().optional(),
      metric: z.string().optional(),
      title: z.string(),
      body: z.string(),
      button: navLinkSchema,
      phone: phoneSchema,
    })
    .optional(),
});

const footerLinkColumnSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.literal("brand").or(z.literal("contact")).optional(),
  links: z.array(navLinkSchema).optional(),
});

export const navigationConfigSchema = z.object({
  header: z.object({
    height: z.string(),
    sticky: z.boolean(),
    logoHref: z.string(),
    items: z.array(headerLinkSchema),
    cta: navLinkSchema,
  }),
  megaMenus: z.record(z.string(), megaMenuPanelSchema).refine(
    (menus) => Object.keys(menus).length > 0,
    { message: "At least one mega menu is required" },
  ),
  footer: z.object({
    columns: z.array(footerLinkColumnSchema).min(1),
    legal: z.array(navLinkSchema),
  }),
  mobile: z.object({
    menuLabel: z.string(),
    closeLabel: z.string(),
    servicesExpandLabel: z.string(),
  }),
});

export type NavigationConfig = z.infer<typeof navigationConfigSchema>;
export type HeaderNavItem = z.infer<typeof headerLinkSchema>;
export type MegaMenuColumn = z.infer<typeof megaMenuColumnSchema>;
export type MegaMenuPanelConfig = z.infer<typeof megaMenuPanelSchema>;
