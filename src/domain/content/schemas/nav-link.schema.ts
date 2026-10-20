import { z } from "zod";

export const navLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  description: z.string().optional(),
  external: z.boolean().optional(),
  featured: z.boolean().optional(),
  icon: z.string().optional(),
});

export const phoneSchema = z.object({
  display: z.string().min(1),
  tel: z.string().min(1),
});

export type NavLink = z.infer<typeof navLinkSchema>;
export type Phone = z.infer<typeof phoneSchema>;
