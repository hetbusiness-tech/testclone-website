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
