import type { Metadata } from "next";
import type { ReactNode } from "react";

const SITE_URL = "https://www.technostripe.in";

export const metadata: Metadata = {
  title: "About Us | Technostripe Solutions",
  description:
    "Learn about Technostripe Solutions — a full-stack Shopify Plus agency founded to help D2C brands across India, UK, and US scale with strategy, speed, and results.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Technostripe | Who We Are",
    description:
      "Built by e-commerce obsessives. We partner with ambitious D2C brands to drive real, measurable growth through Shopify Plus, performance marketing, and CRO.",
    url: `${SITE_URL}/about`,
    siteName: "Technostripe Solutions",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
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
      "Built by e-commerce obsessives. We partner with ambitious D2C brands to drive real growth.",
      images: [`${SITE_URL}/og-image.png`],
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
