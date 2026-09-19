import type { Metadata } from "next";
import type { ReactNode } from "react";

const SITE_URL = "https://technostripe.com";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our proven portfolio in Shopify Plus development, conversion rate optimization, and performance marketing for scaling D2C brands.",
  alternates: {
    canonical: `${SITE_URL}/portfolio`,
  },
  openGraph: {
    title: "Portfolio & Client Results | Technostripe Solutions",
    description:
      "Real growth results, revenue metrics, and technical transformations built for leading e-commerce & D2C brands.",
    url: `${SITE_URL}/portfolio`,
    siteName: "Technostripe Solutions",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Technostripe Solutions — Portfolio & Client Results",
      },
    ],
  },
};

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
