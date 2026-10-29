/**
 * Single source of truth for form notification labels, Discord routing, and copy.
 *
 * Webhooks:
 * - DISCORD_FORM_WEBHOOK_URL → full funnel (multi-step audit) + other site forms
 * - DISCORD_GET_IN_TOUCH_WEBHOOK_URL → short Get in Touch leads (hero / service forms)
 */

export type FormNotificationType =
  | "contact"
  | "contact-intake"
  | "get-in-touch"
  | "audit-funnel"
  | "agency-partner"
  | "career-application"
  | "newsletter";

/** @deprecated Prefer get-in-touch | audit-funnel. Kept for any stale callers. */
export type LegacyAuditFormType = "audit";

export type AnyFormNotificationType = FormNotificationType | LegacyAuditFormType;

export type DiscordWebhookChannel = "full-funnel" | "get-in-touch";

export interface FormNotificationMeta {
  /** Short label for Discord title / email H1 */
  label: string;
  /** Header eyebrow in team email */
  teamEyebrow: string;
  /** Discord content line prefix */
  discordLead: string;
  /** Confirmation email eyebrow */
  confirmationEyebrow: string;
  confirmationSubject: string;
  confirmationIntro: (name: string) => string;
  confirmationNext: string;
  webhook: DiscordWebhookChannel;
  /** On-page success after submit */
  submitSuccess: string;
  /** Generic rate-limit copy */
  rateLimited: string;
  /** Zod / field validation failed */
  validationFailed: string;
  /** SMTP + Discord both failed */
  deliveryFailed: string;
}

const RATE_LIMITED =
  "You have sent several requests recently. Please wait a minute and try again.";

const META: Record<FormNotificationType, FormNotificationMeta> = {
  "get-in-touch": {
    label: "Get in Touch",
    teamEyebrow: "Get in Touch lead",
    discordLead: "New Get in Touch lead",
    confirmationEyebrow: "Confirmation",
    confirmationSubject: "We received your Get in Touch request — eCom Gliders",
    confirmationIntro: (name) =>
      `Thank you, ${name}. Your Get in Touch request is with our team.`,
    confirmationNext: "We usually reply within one business day.",
    webhook: "get-in-touch",
    submitSuccess:
      "Thanks — your Get in Touch request is in. Our team typically replies within one business day.",
    rateLimited: RATE_LIMITED,
    validationFailed:
      "Please check the highlighted fields and try again.",
    deliveryFailed:
      "We could not send your Get in Touch request. Call us or email info@ecomgliders.com.",
  },
  "audit-funnel": {
    label: "Free Audit",
    teamEyebrow: "Full funnel lead",
    discordLead: "New Free Audit lead",
    confirmationEyebrow: "Confirmation",
    confirmationSubject: "We received your Free Audit request — eCom Gliders",
    confirmationIntro: (name) =>
      `Thank you, ${name}. Your Free Audit details are with our team.`,
    confirmationNext:
      "A specialist will review your answers and follow up within one business day.",
    webhook: "full-funnel",
    submitSuccess:
      "Thanks — your Free Audit details are in. A specialist will follow up within one business day.",
    rateLimited: RATE_LIMITED,
    validationFailed:
      "Please complete the required Free Audit fields and try again.",
    deliveryFailed:
      "We could not send your Free Audit request. Call us or email info@ecomgliders.com.",
  },
  contact: {
    label: "Contact message",
    teamEyebrow: "Contact form",
    discordLead: "New contact message",
    confirmationEyebrow: "Confirmation",
    confirmationSubject: "We received your message — eCom Gliders",
    confirmationIntro: (name) =>
      `Thank you, ${name}. Your message has reached our team.`,
    confirmationNext: "We usually reply within one business day.",
    webhook: "full-funnel",
    submitSuccess:
      "Thanks — your message is in. We typically reply within one business day.",
    rateLimited: RATE_LIMITED,
    validationFailed:
      "Please check the highlighted fields and try again.",
    deliveryFailed:
      "We could not send your message. Call us or email info@ecomgliders.com.",
  },
  "contact-intake": {
    label: "Strategy intake",
    teamEyebrow: "Strategy intake",
    discordLead: "New strategy intake",
    confirmationEyebrow: "Confirmation",
    confirmationSubject: "Strategy intake received — eCom Gliders",
    confirmationIntro: (name) =>
      `Thank you, ${name}. Your strategy intake is in our queue.`,
    confirmationNext: "We will review your notes and follow up on next steps.",
    webhook: "full-funnel",
    submitSuccess:
      "Thanks — your strategy intake is in. We will follow up on next steps shortly.",
    rateLimited: RATE_LIMITED,
    validationFailed:
      "Please complete the required intake fields and try again.",
    deliveryFailed:
      "We could not send your intake. Call us or email info@ecomgliders.com.",
  },
  "agency-partner": {
    label: "Agency partnership",
    teamEyebrow: "Partnership application",
    discordLead: "New partnership application",
    confirmationEyebrow: "Confirmation",
    confirmationSubject: "Partnership application received — eCom Gliders",
    confirmationIntro: (name) =>
      `Thank you, ${name}. We received your agency partnership application.`,
    confirmationNext:
      "Our partnerships team will review and reply if there is a fit.",
    webhook: "full-funnel",
    submitSuccess:
      "Thanks — your partnership application is in. Our team typically replies within about two business days.",
    rateLimited: RATE_LIMITED,
    validationFailed:
      "Please check the highlighted fields on your partnership application and try again.",
    deliveryFailed:
      "We could not send your application. Email info@ecomgliders.com or try again later.",
  },
  "career-application": {
    label: "Career application",
    teamEyebrow: "Careers",
    discordLead: "New career application",
    confirmationEyebrow: "Confirmation",
    confirmationSubject: "Application received — eCom Gliders",
    confirmationIntro: (name) =>
      `Thank you, ${name}. Your application is with our hiring team.`,
    confirmationNext:
      "We will follow up if your background matches an open role.",
    webhook: "full-funnel",
    submitSuccess:
      "Thanks — your application is in. Our hiring team typically replies within about two business days when there is a fit.",
    rateLimited: RATE_LIMITED,
    validationFailed:
      "Please check the highlighted fields on your application and try again.",
    deliveryFailed:
      "We could not send your application. Email info@ecomgliders.com or try again later.",
  },
  newsletter: {
    label: "Newsletter subscribe",
    teamEyebrow: "Newsletter",
    discordLead: "New newsletter subscriber",
    confirmationEyebrow: "Confirmation",
    confirmationSubject: "Subscription confirmed — eCom Gliders",
    confirmationIntro: (name) =>
      `Thank you, ${name}. You are subscribed to eCom Gliders insights.`,
    confirmationNext:
      "You will receive practical Amazon growth notes. Unsubscribe anytime by emailing us.",
    webhook: "full-funnel",
    submitSuccess: "You are subscribed. Watch your inbox for the next update.",
    rateLimited: RATE_LIMITED,
    validationFailed: "Please enter a valid email address and try again.",
    deliveryFailed:
      "We could not complete your subscription. Email info@ecomgliders.com or try again later.",
  },
};

export function normalizeFormType(
  formType: AnyFormNotificationType,
): FormNotificationType {
  if (formType === "audit") return "get-in-touch";
  return formType;
}

export function getFormNotificationMeta(
  formType: AnyFormNotificationType,
): FormNotificationMeta {
  return META[normalizeFormType(formType)];
}

/**
 * Resolve Discord webhook URL for a form type.
 * Full funnel + other site forms → DISCORD_FORM_WEBHOOK_URL
 * Get in Touch short forms → DISCORD_GET_IN_TOUCH_WEBHOOK_URL
 */
export function discordWebhookUrlFor(
  formType: AnyFormNotificationType,
): string | undefined {
  const meta = getFormNotificationMeta(formType);
  if (meta.webhook === "get-in-touch") {
    return (
      process.env.DISCORD_GET_IN_TOUCH_WEBHOOK_URL?.trim() ||
      process.env.DISCORD_FORM_WEBHOOK_URL?.trim()
    );
  }
  return process.env.DISCORD_FORM_WEBHOOK_URL?.trim();
}

/** Hidden form field: get-in-touch | full-funnel */
export function resolveLeadFormType(
  leadChannel: string | undefined,
): "get-in-touch" | "audit-funnel" {
  const channel = (leadChannel ?? "").trim().toLowerCase();
  if (channel === "full-funnel" || channel === "audit-funnel" || channel === "funnel") {
    return "audit-funnel";
  }
  return "get-in-touch";
}
