import blogBlocksJson from "../../../../content/config/blog-blocks.json";
import type { BlogBlocksConfig } from "@/lib/blog/blocks/types";

export function loadBlogBlocksConfig(): BlogBlocksConfig {
  return blogBlocksJson as BlogBlocksConfig;
}
