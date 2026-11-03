import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

const PHONE_INVALID = "Enter a valid phone number with country code.";

/**
 * Lead-form phone: accepts common international input, stores E.164 (e.g. +15551234567).
 * Server and client share validation via isValidLeadPhone.
 */
export const phoneE164Schema = z
  .string()
  .trim()
  .min(1, PHONE_INVALID)
  .max(32, PHONE_INVALID)
  .refine((value) => isValidPhoneNumber(value), { message: PHONE_INVALID })
  .transform((value) => {
    const parsed = parsePhoneNumberFromString(value);
    return parsed?.format("E.164") ?? value;
  });

export function isValidLeadPhone(value: string | undefined | null): boolean {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return false;
  return isValidPhoneNumber(trimmed);
}

export function toE164Phone(value: string | undefined | null): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return "";
  const parsed = parsePhoneNumberFromString(trimmed);
  return parsed?.format("E.164") ?? trimmed;
}
