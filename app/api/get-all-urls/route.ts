import { NextResponse } from 'next/server';
import { SEO_PAGES, getAllCityPageParams, CITIES } from '../../../lib/seo-pages';

const SITE_URL = "https://technostripe.com";

export async function GET(request: Request) {
  const cityHubUrls = CITIES.map((c) => `${SITE_URL}/${c.slug}`);
  const seoPageUrls = SEO_PAGES.map((page) => `${SITE_URL}/${page.slug}`);
  const citySeoPageUrls = getAllCityPageParams().map((p) => `${SITE_URL}/${p.slug}/${p.service}`);
  
  const allUrls = [`${SITE_URL}/locations`, ...cityHubUrls, ...seoPageUrls, ...citySeoPageUrls];

  return NextResponse.json({
    total: allUrls.length,
    urls: allUrls
  });
}
