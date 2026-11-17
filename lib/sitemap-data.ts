import { caseStudies } from "../app/case-studies/constants";
import { blogs } from "../app/insights/constants";

export const SITE_URL = "https://technostripe.com";

export interface SitemapEntry {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export function getMainSitemapEntries(): SitemapEntry[] {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE_URL}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}

export function getPortfolioSitemapEntries(): SitemapEntry[] {
  const now = new Date();
  return caseStudies.map((cs) => ({
    url: `${SITE_URL}/portfolio/${cs.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));
}

export function getInsightsSitemapEntries(): SitemapEntry[] {
  return blogs.map((blog) => ({
    url: `${SITE_URL}/insights/${blog.slug}`,
    lastModified: new Date(blog.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
}

export function renderUrlSetXml(entries: SitemapEntry[]): string {
  const items = entries
    .map(
      (e) => `  <url>
    <loc>${e.url}</loc>
    ${e.lastModified ? `<lastmod>${new Date(e.lastModified).toISOString()}</lastmod>` : ""}
    ${e.changeFrequency ? `<changefreq>${e.changeFrequency}</changefreq>` : ""}
    ${e.priority !== undefined ? `<priority>${e.priority.toFixed(2)}</priority>` : ""}
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;
}

export function renderSitemapIndexXml(sitemaps: string[]): string {
  const now = new Date().toISOString();
  const items = sitemaps
    .map(
      (url) => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</sitemapindex>`;
}
