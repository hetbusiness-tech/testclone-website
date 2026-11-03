import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/chatgpt-auth"],
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    sitemap: [
      "https://technostripe.com/sitemap.xml",
      "https://technostripe.com/sitemap-main.xml",
      "https://technostripe.com/sitemap-services.xml",
      "https://technostripe.com/sitemap-portfolio.xml",
      "https://technostripe.com/sitemap-insights.xml",
    ],
  };
}
