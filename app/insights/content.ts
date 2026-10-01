import type { BlogPost } from "./types";

import howToScale from "./articles/how-to-scale-your-shopify-store-in-2025.md";
import croFramework from "./articles/cro-framework-for-dtc-brands.md";
import metaAdsPlaybook from "./articles/meta-ads-scaling-playbook-2025.md";

const markdownByFile: Record<string, unknown> = {
  "app/insights/articles/how-to-scale-your-shopify-store-in-2025.md": howToScale,
  "app/insights/articles/cro-framework-for-dtc-brands.md": croFramework,
  "app/insights/articles/meta-ads-scaling-playbook-2025.md": metaAdsPlaybook,
};

/** Safely extract a string from a webpack asset/source import.
 *  The module may resolve as a plain string OR as `{ default: string }`
 *  depending on the runtime context. */
function rawString(val: unknown): string {
  if (typeof val === "string") return val;
  if (
    val &&
    typeof val === "object" &&
    "default" in val &&
    typeof (val as { default: unknown }).default === "string"
  ) {
    return (val as { default: string }).default;
  }
  return "";
}

/** Get markdown content string for a blog. Content is bundled at build time
 * (via the `.md` -> asset/source webpack rule) so it works in serverless /
 * edge runtimes that have no filesystem access, e.g. Cloudflare Workers. */
export function getBlogMarkdownContent(blog: BlogPost): string {
  if (!blog?.contentFile) return "";
  const raw = rawString(markdownByFile[blog.contentFile]);
  return raw.replace(/^---[\s\S]*?---\s*/, "");
}
