import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { ContentValidationError } from "@/domain/content/errors";
import {
  blogPostFrontmatterSchema,
  type BlogPost,
  type BlogPostFrontmatter,
} from "@/domain/content/schemas";
import { selectRelatedPostSlugs } from "@/lib/blog/select-related-posts";
import { stripMigratedTitlePollution } from "@/lib/blog/blocks/sanitize/plugins/strip-migrated-title-pollution";
import { normalizeMarkdownNewlines } from "@/lib/blog/normalize-markdown-newlines";

export class MdxBlogRepository {
  constructor(
    private readonly blogDir: string = join(process.cwd(), "content", "blog"),
  ) {}

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    const raw = this.readMdxFile(slug);
    if (!raw) {
      return null;
    }

    const { data, content } = matter(raw);
    const parsed = blogPostFrontmatterSchema.safeParse(data);

    if (!parsed.success) {
      throw new ContentValidationError(
        `Invalid frontmatter for blog post "${slug}"`,
        parsed.error,
      );
    }

    const cleaned = stripMigratedTitlePollution(
      normalizeMarkdownNewlines(content.trim()),
    );

    return {
      ...parsed.data,
      content: cleaned.content,
    };
  }

  async getAllBlogSlugs(): Promise<string[]> {
    if (!existsSync(this.blogDir)) {
      return [];
    }

    return readdirSync(this.blogDir)
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename) => filename.replace(/\.mdx$/, ""))
      .sort();
  }

  async getRecentBlogPosts(limit: number): Promise<BlogPost[]> {
    const slugs = await this.getAllBlogSlugs();
    const posts: BlogPost[] = [];

    for (const slug of slugs) {
      const post = await this.getBlogPost(slug);
      if (post) {
        posts.push(post);
      }
    }

    return posts
      .sort(
        (left, right) =>
          new Date(right.publishedAt).getTime() -
          new Date(left.publishedAt).getTime(),
      )
      .slice(0, limit);
  }

  async getAllBlogPostFrontmatter(): Promise<BlogPostFrontmatter[]> {
    const slugs = await this.getAllBlogSlugs();
    const frontmatter: BlogPostFrontmatter[] = [];

    for (const slug of slugs) {
      const raw = this.readMdxFile(slug);
      if (!raw) {
        continue;
      }

      const { data } = matter(raw);
      const parsed = blogPostFrontmatterSchema.safeParse(data);
      if (parsed.success) {
        frontmatter.push(parsed.data);
      }
    }

    return frontmatter;
  }

  async getRelatedBlogPosts(
    currentSlug: string,
    limit = 3,
  ): Promise<BlogPost[]> {
    const current = await this.getBlogPost(currentSlug);
    if (!current) {
      return [];
    }

    const candidates = await this.getAllBlogPostFrontmatter();
    const relatedSlugs = selectRelatedPostSlugs(current, candidates, limit);
    const posts: BlogPost[] = [];

    for (const slug of relatedSlugs) {
      const post = await this.getBlogPost(slug);
      if (post) {
        posts.push(post);
      }
    }

    return posts;
  }

  protected readMdxFile(slug: string): string | null {
    const filePath = join(this.blogDir, `${slug}.mdx`);
    if (!existsSync(filePath)) {
      return null;
    }
    return readFileSync(filePath, "utf-8");
  }
}
