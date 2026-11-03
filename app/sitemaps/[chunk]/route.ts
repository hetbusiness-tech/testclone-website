import { NextResponse } from "next/server";
import {
  getLocationSitemapChunkEntries,
  renderUrlSetXml,
  getTotalLocationSitemapChunks,
} from "../../../lib/sitemap-data";

export const dynamic = "force-static";
export const revalidate = 86400;

export function generateStaticParams() {
  const totalChunks = getTotalLocationSitemapChunks();
  const params: { chunk: string }[] = [];
  for (let i = 1; i <= totalChunks; i++) {
    params.push({ chunk: i.toString() });
  }
  return params;
}

export async function GET(
  _request: Request,
  { params }: { params: { chunk: string } }
) {
  const chunkIndex = parseInt(params.chunk, 10);
  const totalChunks = getTotalLocationSitemapChunks();

  if (isNaN(chunkIndex) || chunkIndex < 1 || chunkIndex > totalChunks) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const entries = getLocationSitemapChunkEntries(chunkIndex);
  const xml = renderUrlSetXml(entries);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}

