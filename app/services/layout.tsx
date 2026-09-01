import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

const SITE_URL = "https://www.technostripe.com";

export const metadata: Metadata = {
  title: "Services | Shopify Plus, CRO, Paid Ads & SEO — Technostripe",
  description:
    "Explore Technostripe's full range of e-commerce services: Shopify Plus development, conversion rate optimisation, Meta & Google Ads management, SEO, branding, and creative content.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "Our Services | Technostripe Solutions",
    description:
      "From Shopify Plus builds to performance marketing — we offer end-to-end e-commerce growth services for ambitious DTC brands.",
    url: `${SITE_URL}/services`,
    siteName: "Technostripe Solutions",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "Technostripe Services — Shopify Plus, CRO, Paid Ads",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Technostripe Solutions",
    description:
      "Shopify Plus, CRO, Meta & Google Ads, SEO, and creative strategy for scaling DTC brands.",
    images: [`${SITE_URL}/og.png`],
  },
};

const servicesPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/services#webpage`,
  url: `${SITE_URL}/services`,
  name: "Services | Technostripe Solutions",
  description:
    "Full-stack e-commerce growth services including Shopify Plus development, CRO, paid advertising, SEO, and brand strategy.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    ],
  },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script
        id="schema-services-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}
