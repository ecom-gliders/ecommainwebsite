export function isHoneypotTriggered(value: FormDataEntryValue | null): boolean {
  if (typeof value !== "string") {
    return false;
  }

  return value.trim().length > 0;
}
