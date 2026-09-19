import type { BlogPost } from "./types";

import howToScale from "./articles/how-to-scale-your-shopify-store-in-2025.md";
import croFramework from "./articles/cro-framework-for-dtc-brands.md";
import metaAdsPlaybook from "./articles/meta-ads-scaling-playbook-2025.md";

const markdownByFile: Record<string, string> = {
  "app/insights/articles/how-to-scale-your-shopify-store-in-2025.md": howToScale,
  "app/insights/articles/cro-framework-for-dtc-brands.md": croFramework,
  "app/insights/articles/meta-ads-scaling-playbook-2025.md": metaAdsPlaybook,
};

/** Get markdown content string for a blog. Content is bundled at build time
 * (via the `.md` -> asset/source webpack rule) so it works in serverless /
 * edge runtimes that have no filesystem access, e.g. Cloudflare Workers. */
export function getBlogMarkdownContent(blog: BlogPost): string {
  return (markdownByFile[blog.contentFile] ?? "").replace(/^---[\s\S]*?---\s*/, "");
}
