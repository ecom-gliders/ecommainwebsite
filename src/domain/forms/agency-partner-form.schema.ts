import { z } from "zod";

export const agencyPartnerFormSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.string().email("Enter a valid work email."),
  phone: z.string().min(7, "Enter a phone number."),
  agencyName: z.string().min(2, "Enter your agency name."),
  agencyWebsite: z
    .string()
    .min(4, "Enter your agency website.")
    .refine(
      (value) => {
        const normalized = value.startsWith("http") ? value : `https://${value}`;
        try {
          const url = new URL(normalized);
          return Boolean(url.hostname.includes("."));
        } catch {
          return false;
        }
      },
      { message: "Enter a valid website URL." },
    ),
  partnershipLane: z.enum(["white-label", "referral", "co-manage"]),
  servicesOffered: z.string().min(8, "Describe the services you offer today."),
  amazonGap: z
    .string()
    .min(8, "Describe the Amazon work your clients need that you do not staff."),
  volumeIntent: z.string().min(1, "Select an approximate volume."),
  fitNote: z.string().min(12, "Add a short note on why this partnership fits."),
  consent: z.literal("true", {
    message: "You must agree to the privacy policy.",
  }),
  website: z.string().optional(),
});

export type AgencyPartnerFormValues = z.infer<typeof agencyPartnerFormSchema>;
