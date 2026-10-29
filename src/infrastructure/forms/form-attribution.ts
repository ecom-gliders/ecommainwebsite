import { getFormString } from "@/domain/forms/form-action-state";
import { headers } from "next/headers";

/** Hidden form field names for client-side page attribution. */
export const FORM_ATTRIBUTION_KEYS = [
  "pageUrl",
  "pagePath",
  "pageReferrer",
] as const;

function sanitizeAttributionValue(
  raw: string | undefined,
  max = 500,
): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim().slice(0, max);
  if (!trimmed) return undefined;
  // Absolute pages, relative paths, or common marketing query URLs.
  if (
    trimmed.startsWith("/") ||
    /^https?:\/\//i.test(trimmed) ||
    trimmed.startsWith("?")
  ) {
    return trimmed;
  }
  return undefined;
}

/**
 * Resolve where the lead submitted from for Discord + team email metrics.
 * Prefers client hidden fields; falls back to request Referer.
 */
export async function resolveFormAttribution(
  formData: FormData,
): Promise<Record<string, string>> {
  const pageUrl = sanitizeAttributionValue(getFormString(formData, "pageUrl"));
  const pagePath = sanitizeAttributionValue(getFormString(formData, "pagePath"));
  const pageReferrer = sanitizeAttributionValue(
    getFormString(formData, "pageReferrer"),
  );

  let submittedFrom = pageUrl ?? pagePath;

  if (!submittedFrom) {
    const requestHeaders = await headers();
    submittedFrom = sanitizeAttributionValue(
      requestHeaders.get("referer") ?? undefined,
    );
  }

  const fields: Record<string, string> = {};
  if (submittedFrom) {
    fields["Submitted from"] = submittedFrom;
  }
  if (pagePath && pagePath !== submittedFrom) {
    fields["Page path"] = pagePath;
  }
  if (pageReferrer && pageReferrer !== submittedFrom) {
    fields["Prior referrer"] = pageReferrer;
  }

  return fields;
}
