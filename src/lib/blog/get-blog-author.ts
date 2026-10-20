import { readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";

const blogAuthorSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string(),
});

const blogAuthorsConfigSchema = z.record(z.string(), blogAuthorSchema);

export type BlogAuthorProfile = z.infer<typeof blogAuthorSchema>;

let cachedAuthors: Record<string, BlogAuthorProfile> | null = null;

function loadBlogAuthors(): Record<string, BlogAuthorProfile> {
  if (cachedAuthors) {
    return cachedAuthors;
  }

  const filePath = join(process.cwd(), "content/config/blog-authors.json");
  const raw = readFileSync(filePath, "utf-8");
  cachedAuthors = blogAuthorsConfigSchema.parse(JSON.parse(raw));
  return cachedAuthors;
}

export function getBlogAuthor(name: string): BlogAuthorProfile {
  const authors = loadBlogAuthors();
  return (
    authors[name] ?? {
      name,
      title: "Contributor",
      bio: `${name} contributes Amazon marketplace insights for eCom Gliders readers.`,
    }
  );
}
