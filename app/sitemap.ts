import type { MetadataRoute } from "next";
import { caseStudies } from "./case-studies/constants";
import { blogs } from "./insights/constants";

const SITE_URL = "https://technostripe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const portfolioUrls = caseStudies.map((caseStudy) => ({
    url: `${SITE_URL}/portfolio/${caseStudy.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const caseStudyUrls = caseStudies.map((caseStudy) => ({
    url: `${SITE_URL}/case-studies/${caseStudy.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const insightUrls = blogs.map((blog) => ({
    url: `${SITE_URL}/insights/${blog.slug}`,
    lastModified: new Date(blog.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/insights`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...portfolioUrls,
    ...caseStudyUrls,
    ...insightUrls,
  ];

  return entries.sort((first, second) => (second.priority ?? 0) - (first.priority ?? 0));
}
