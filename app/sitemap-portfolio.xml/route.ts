import { NextResponse } from "next/server";
import { getPortfolioSitemapEntries, renderUrlSetXml } from "../../lib/sitemap-data";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
  const entries = getPortfolioSitemapEntries();
  const xml = renderUrlSetXml(entries);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
