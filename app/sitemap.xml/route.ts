import { NextResponse } from "next/server";
import {
  SITE_URL,
  renderSitemapIndexXml,
} from "../../lib/sitemap-data";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function GET() {
  const sitemaps = [
    `${SITE_URL}/sitemap-main.xml`,
    `${SITE_URL}/sitemap-portfolio.xml`,
    `${SITE_URL}/sitemap-insights.xml`,
    `${SITE_URL}/sitemap-us.xml`,
  ];

  const xml = renderSitemapIndexXml(sitemaps);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
