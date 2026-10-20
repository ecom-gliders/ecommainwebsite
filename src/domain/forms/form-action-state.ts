export type FormActionState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export const initialFormActionState: FormActionState = {
  success: false,
  message: "",
};

export function formDataToRecord(formData: FormData): Record<string, string> {
  const record: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      record[key] = value;
    }
  }

  return record;
}

export function getFormString(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
