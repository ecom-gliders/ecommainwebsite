import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface BlogInventoryEntry {
  slug: string;
  title: string;
  url: string;
}

export function loadBlogInventory(): BlogInventoryEntry[] {
  const filePath = join(process.cwd(), "backup/metadata/blog-inventory.json");
  const raw = readFileSync(filePath, "utf-8");
  const entries = JSON.parse(raw) as BlogInventoryEntry[];
  return entries.map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    url: entry.url,
  }));
}
