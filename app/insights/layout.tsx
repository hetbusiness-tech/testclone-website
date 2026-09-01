import type { Metadata } from "next";
import type { ReactNode } from "react";

const SITE_URL = "https://www.technostripe.in";

export const metadata: Metadata = {
  title: "Insights | Technostripe Solutions",
  description:
    "Expert articles, guides, and strategies on Shopify Plus development, performance marketing, CRO, SEO, and e-commerce growth from the Technostripe team.",
  alternates: {
    canonical: `${SITE_URL}/insights`,
  },
  openGraph: {
    title: "Insights — E-commerce Growth Blog | Technostripe",
    description:
      "Deep-dive articles on Shopify Plus, Meta Ads, CRO, SEO, and DTC brand scaling from the experts at Technostripe Solutions.",
    url: `${SITE_URL}/insights`,
    siteName: "Technostripe Solutions",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "Technostripe Insights — E-commerce Growth Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | Technostripe Solutions",
    description:
      "Expert guides on Shopify Plus, performance marketing, CRO & DTC growth.",
    images: [`${SITE_URL}/og.png`],
  },
};

export default function InsightsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
