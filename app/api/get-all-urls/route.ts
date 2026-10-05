import { NextResponse } from 'next/server';
import { SEO_PAGES, getAllCityPageParams } from '../../../lib/seo-pages';

const SITE_URL = "https://technostripe.com";

export async function GET(request: Request) {
  // Optional: You can add an Authorization header check here to secure this endpoint
  // if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new NextResponse('Unauthorized', { status: 401 });
  // }

  const seoPageUrls = SEO_PAGES.map((page) => `${SITE_URL}/${page.slug}`);
  const citySeoPageUrls = getAllCityPageParams().map((p) => `${SITE_URL}/${p.slug}/${p.service}`);
  
  const allUrls = [...seoPageUrls, ...citySeoPageUrls];

  return NextResponse.json({
    total: allUrls.length,
    urls: allUrls
  });
}
