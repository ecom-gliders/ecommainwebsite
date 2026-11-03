import { z } from "zod";
import { amazonStoreUrlSchema } from "@/domain/forms/amazon-store-url";
import { phoneE164Schema } from "@/domain/forms/phone.schema";

export const auditFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  phone: phoneE164Schema,
  brandName: z.string().trim().max(150).optional(),
  amazonStoreUrl: amazonStoreUrlSchema,
  // Funnel requires these client-side; service-page embeds may omit them.
  services: z.array(z.string().trim().min(1)).max(25).default([]),
  marketplaces: z.array(z.string().trim().min(1)).max(25).default([]),
  monthlyRevenue: z.string().trim().max(50).optional(),
  message: z.string().trim().max(5000).optional(),
  consent: z.literal("true", {
    message: "Please confirm you agree to the privacy policy.",
  }),
  website: z.string().max(0).optional(),
});

export type AuditFormInput = z.infer<typeof auditFormSchema>;
