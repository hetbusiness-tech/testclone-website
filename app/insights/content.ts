import type { BlogPost } from "./types";
import { INSIGHTS_MARKDOWN } from "./data";

export function getBlogMarkdownContent(blog: BlogPost): string {
  if (!blog?.contentFile) return "";
  return INSIGHTS_MARKDOWN[blog.contentFile] || "";
}

