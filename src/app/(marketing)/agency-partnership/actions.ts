"use server";

import { headers } from "next/headers";
import { agencyPartnerFormSchema } from "@/domain/forms/agency-partner-form.schema";
import {
  type FormActionState,
  getFormString,
} from "@/domain/forms/form-action-state";
import { notifyFormSubmission } from "@/infrastructure/forms/form-notifier";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { getRateLimitKey, isRateLimited } from "@/lib/security/rate-limit";

export async function submitAgencyPartnerForm(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const requestHeaders = await headers();
  const rateLimitKey = getRateLimitKey(requestHeaders, "agency-partner");

  if (isRateLimited(rateLimitKey)) {
    return {
      success: false,
      message: "Too many submissions. Please wait before trying again.",
    };
  }

  if (isHoneypotTriggered(formData.get("website"))) {
    return {
      success: true,
      message:
        "Your partner application was received. Our team will review fit and reply within about two business days.",
    };
  }

  const parsed = agencyPartnerFormSchema.safeParse({
    name: getFormString(formData, "name"),
    email: getFormString(formData, "email"),
    phone: getFormString(formData, "phone"),
    agencyName: getFormString(formData, "agencyName"),
    agencyWebsite: getFormString(formData, "agencyWebsite"),
    partnershipLane: getFormString(formData, "partnershipLane"),
    servicesOffered: getFormString(formData, "servicesOffered"),
    amazonGap: getFormString(formData, "amazonGap"),
    volumeIntent: getFormString(formData, "volumeIntent"),
    fitNote: getFormString(formData, "fitNote"),
    consent: formData.get("consent") === "true" ? "true" : undefined,
    website: getFormString(formData, "website") ?? "",
  });

  if (!parsed.success) {
    return {
      success: false,
      message:
        "We could not submit the application. Review the fields below and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { website: _honeypot, consent: _consent, ...fields } = parsed.data;

  const delivery = await notifyFormSubmission({
    formType: "agency-partner",
    subject: `Agency partner application: ${fields.agencyName}`,
    fields: {
      Name: fields.name,
      Email: fields.email,
      Phone: fields.phone,
      "Agency name": fields.agencyName,
      "Agency website": fields.agencyWebsite,
      "Partnership lane": fields.partnershipLane,
      "Services offered": fields.servicesOffered,
      "Amazon gap": fields.amazonGap,
      "Volume intent": fields.volumeIntent,
      "Fit note": fields.fitNote,
    },
  });

  if (!delivery.delivered) {
    return {
      success: false,
      message:
        "We could not deliver your application. Please email info@ecomgliders.com or try again later.",
    };
  }

  return {
    success: true,
    message:
      "Your partner application was received. Our team will review fit and reply within about two business days.",
  };
}
