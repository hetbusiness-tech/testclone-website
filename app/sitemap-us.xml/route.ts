import { NextResponse } from "next/server";
import { SITE_URL, renderUrlSetXml } from "../../lib/sitemap-data";
import { US_CITIES, US_CONTENT_UPDATED, getAllUsPages } from "../../lib/us-pages";
export const dynamic = "force-static";
export async function GET() {
 const paths = ["/us", ...US_CITIES.map(c=>`/us/${c.slug}`), ...getAllUsPages().map(p=>p.path)];
 return new NextResponse(renderUrlSetXml(paths.map(path=>({url:`${SITE_URL}${path}`,lastModified:US_CONTENT_UPDATED}))),{headers:{"Content-Type":"application/xml; charset=utf-8"}});
}
