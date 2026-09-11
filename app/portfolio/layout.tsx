import type { Metadata } from "next";
import type { ReactNode } from "react";

const SITE_URL = "https://www.technostripe.in";

export const metadata: Metadata = {
  title: "Portfolio | Technostripe Solutions",
  description:
    "Explore our proven portfolio in Shopify Plus development, conversion rate optimization, and performance marketing for scaling DTC brands.",
  alternates: {
    canonical: `${SITE_URL}/portfolio`,
  },
  openGraph: {
    title: "Portfolio & Client Results | Technostripe Solutions",
    description:
      "Real growth results, revenue metrics, and technical transformations built for leading e-commerce & DTC brands.",
    url: `${SITE_URL}/portfolio`,
    siteName: "Technostripe Solutions",
    type: "website",
  },
};

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
