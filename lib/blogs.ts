import fs from "fs";
import path from "path";
import { BLOG_POSTS, blogs } from "../app/insights/constants";
import type { BlogPost, BlogSEO } from "../app/insights/types";

export type { BlogPost, BlogSEO };
export { BLOG_POSTS, blogs };

/** Get blog post by slug */
export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((blog) => blog.slug === slug);
}

/** Get all blog slugs for static generation */
export function getAllBlogSlugs(): string[] {
  return blogs.map((blog) => blog.slug);
}

/** Get all blogs sorted by publishDate descending */
export function getAllBlogs(): BlogPost[] {
  return [...blogs].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

/** Get markdown content string for a blog */
export function getBlogMarkdownContent(blog: BlogPost): string {
  try {
    const fullPath = path.isAbsolute(blog.contentFile)
      ? blog.contentFile
      : path.join(process.cwd(), blog.contentFile);

    if (fs.existsSync(fullPath)) {
      const raw = fs.readFileSync(fullPath, "utf-8");
      // Strip yaml frontmatter if present
      return raw.replace(/^---[\s\S]*?---\s*/, "");
    }
  } catch (error) {
    console.error(`Failed to read content file: ${blog.contentFile}`, error);
  }
  return "";
}
