import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

const SITE_URL = "https://www.technostripe.com";

export const metadata: Metadata = {
  title: "Contact Us | Book a Free Strategy Call — Technostripe",
  description:
    "Ready to scale your e-commerce brand? Get in touch with Technostripe Solutions. Book a free strategy call with our Shopify Plus experts.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact Technostripe | Book a Strategy Call",
    description:
      "Let's talk growth. Book a free strategy call with Technostripe and discover how we can scale your DTC brand.",
    url: `${SITE_URL}/contact`,
    siteName: "Technostripe Solutions",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "Contact Technostripe Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Technostripe | Book a Strategy Call",
    description:
      "Let's talk growth. Book a free strategy call and discover how we scale DTC brands.",
    images: [`${SITE_URL}/og.png`],
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#webpage`,
  url: `${SITE_URL}/contact`,
  name: "Contact Technostripe Solutions",
  description: "Book a free strategy call with Technostripe's Shopify Plus experts.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
    ],
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script
        id="schema-contact-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}
