export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function createHeadingId(text: string, usedIds: Map<string, number>): string {
  const baseId = slugifyHeading(text) || "section";
  const count = usedIds.get(baseId) ?? 0;

  if (count === 0) {
    usedIds.set(baseId, 1);
    return baseId;
  }

  const nextId = `${baseId}-${count + 1}`;
  usedIds.set(baseId, count + 1);
  return nextId;
}
