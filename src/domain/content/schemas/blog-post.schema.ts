import { z } from "zod";
import { pageSeoSchema } from "./page-seo.schema";

export const blogPostFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string(),
  author: z.string(),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  featuredImage: z.string(),
  readingTimeMinutes: z.number().optional(),
  seo: pageSeoSchema,
});

export type BlogPostFrontmatter = z.infer<typeof blogPostFrontmatterSchema>;

export interface BlogPost extends BlogPostFrontmatter {
  content: string;
}
