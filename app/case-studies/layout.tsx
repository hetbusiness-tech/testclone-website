import type { Metadata } from "next";
import type { ReactNode } from "react";

const SITE_URL = "https://www.technostripe.in";

export const metadata: Metadata = {
  title: "Case Studies | Technostripe Solutions",
  description:
    "Explore our proven case studies in Shopify Plus development, conversion rate optimization, and performance marketing for scaling DTC brands.",
  alternates: {
    canonical: `${SITE_URL}/case-studies`,
  },
  openGraph: {
    title: "Case Studies & Client Results | Technostripe Solutions",
    description:
      "Real growth results, revenue metrics, and technical transformations built for leading e-commerce & DTC brands.",
    url: `${SITE_URL}/case-studies`,
    siteName: "Technostripe Solutions",
    type: "website",
  },
};

export default function CaseStudiesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
