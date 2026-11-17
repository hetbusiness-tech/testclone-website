import { NextResponse } from "next/server";
import {
  getMainSitemapEntries,
  getPortfolioSitemapEntries,
  getInsightsSitemapEntries,
} from "../../../lib/sitemap-data";

import { US_CITIES, getAllUsPages } from "../../../lib/us-pages";
import { SITE_URL } from "../../../lib/sitemap-data";

export async function GET() {
  const urls = [
    ...getMainSitemapEntries(),
    ...getPortfolioSitemapEntries(),
    ...getInsightsSitemapEntries(),
  ].map((entry) => entry.url);
  urls.push(`${SITE_URL}/us`, ...US_CITIES.map(c=>`${SITE_URL}/us/${c.slug}`), ...getAllUsPages().map(p=>`${SITE_URL}${p.path}`));

  return NextResponse.json({ total: urls.length, urls });
}
