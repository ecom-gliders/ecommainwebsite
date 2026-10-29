"use server";

import { headers } from "next/headers";
import { careerApplicationFormSchema } from "@/domain/forms/career-application-form.schema";
import {
  type FormActionState,
  getFormString,
} from "@/domain/forms/form-action-state";
import { resolveFormAttribution } from "@/infrastructure/forms/form-attribution";
import { notifyFormSubmission } from "@/infrastructure/forms/form-notifier";
import { getFormNotificationMeta } from "@/infrastructure/forms/form-notification-meta";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { getRateLimitKey, isRateLimited } from "@/lib/security/rate-limit";

const ROLE_LABELS: Record<string, string> = {
  "brand-manager": "Brand Manager",
  "junior-ppc-specialist": "Junior PPC Specialist",
};

export async function submitCareerApplicationForm(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const copy = getFormNotificationMeta("career-application");
  const requestHeaders = await headers();
  const rateLimitKey = getRateLimitKey(requestHeaders, "career-application");

  if (isRateLimited(rateLimitKey)) {
    return {
      success: false,
      message: copy.rateLimited,
    };
  }

  if (isHoneypotTriggered(formData.get("website"))) {
    return {
      success: true,
      message: copy.submitSuccess,
    };
  }

  const parsed = careerApplicationFormSchema.safeParse({
    name: getFormString(formData, "name") ?? "",
    email: getFormString(formData, "email") ?? "",
    phone: getFormString(formData, "phone") ?? "",
    role: getFormString(formData, "role") ?? "",
    linkedinUrl: getFormString(formData, "linkedinUrl") ?? "",
    resumeUrl: getFormString(formData, "resumeUrl") ?? "",
    amazonExperience: getFormString(formData, "amazonExperience") ?? "",
    fitNote: getFormString(formData, "fitNote") ?? "",
    consent: formData.get("consent") === "true" ? "true" : undefined,
    website: getFormString(formData, "website") ?? "",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: copy.validationFailed,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { website: _honeypot, consent: _consent, ...fields } = parsed.data;
  const roleLabel = ROLE_LABELS[fields.role] ?? fields.role;
  const attribution = await resolveFormAttribution(formData);

  const delivery = await notifyFormSubmission({
    formType: "career-application",
    subject: `Career application: ${roleLabel} — ${fields.name}`,
    fields: {
      Name: fields.name,
      Email: fields.email,
      Phone: fields.phone,
      Role: roleLabel,
      LinkedIn: fields.linkedinUrl,
      "Resume / portfolio URL": fields.resumeUrl,
      "Amazon experience": fields.amazonExperience,
      "Fit note": fields.fitNote,
      ...attribution,
    },
  });

  if (!delivery.delivered) {
    return {
      success: false,
      message: copy.deliveryFailed,
    };
  }

  return {
    success: true,
    message: copy.submitSuccess,
  };
}
