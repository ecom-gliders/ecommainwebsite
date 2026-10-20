import type { ContentRepository } from "@/domain/content/content-repository";
import { CompositeContentRepository } from "./composite-content-repository";
import { JsonFileContentRepository } from "./json-file-content-repository";
import { MdxBlogRepository } from "./mdx-blog-repository";

export function createContentRepository(): ContentRepository {
  const jsonRepository = new JsonFileContentRepository();
  const blogRepository = new MdxBlogRepository();

  return new CompositeContentRepository(jsonRepository, blogRepository);

  // Future CMS swap:
  // return process.env.CMS_PROVIDER === "payload"
  //   ? new PayloadContentRepository()
  //   : new CompositeContentRepository(jsonRepository, blogRepository);
}
