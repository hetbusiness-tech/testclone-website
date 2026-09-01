import type { Metadata } from "next";

const SITE_URL = "https://www.technostripe.com";

export const metadata: Metadata = {
  title: "About Technostripe | Who We Are & What We Stand For",
  description:
    "Learn about Technostripe Solutions — a full-stack Shopify Plus agency founded to help DTC brands across India, UK, and US scale with strategy, speed, and results.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Technostripe | Who We Are",
    description:
      "Built by e-commerce obsessives. We partner with ambitious DTC brands to drive real, measurable growth through Shopify Plus, performance marketing, and CRO.",
    url: `${SITE_URL}/about`,
    siteName: "Technostripe Solutions",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "About Technostripe Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Technostripe | Shopify Plus Agency",
    description:
      "Built by e-commerce obsessives. We partner with ambitious DTC brands to drive real, measurable growth.",
    images: [`${SITE_URL}/og.png`],
  },
};

export { default } from "./page";
