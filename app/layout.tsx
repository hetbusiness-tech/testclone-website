import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import Script from "next/script";
import PageLoader from "../components/PageLoader";
import ScrollProviderWrapper from "../components/ScrollProviderWrapper";
import CustomCursor from "../components/CustomCursor";
import "./globals.css";

/* ─── Brand constants ─────────────────────────────────── */
const SITE_NAME = "Technostripe Solutions";
const SITE_URL = "https://www.technostripe.in";
const BRAND_COLOR = "#ed1238";

const SITE_TITLE =
  "Technostripe Solutions | Shopify Plus Agency & Digital Growth Partner";
const SITE_DESCRIPTION =
  "Technostripe Solutions is a full-stack Shopify Plus agency specialising in high-conversion e-commerce development, performance marketing, CRO, SEO, and brand strategy for D2C brands in India, UK & US.";
const OG_DESCRIPTION =
  "Shopify Plus builds, paid acquisition, CRO, and creative strategy — all under one roof. We scale D2C brands that mean business.";

const KEYWORDS = [
  "Shopify Plus agency",
  "Shopify Plus development India",
  "Shopify Plus agency UK",
  "Shopify Plus agency US",
  "e-commerce growth agency",
  "D2C brand scaling",
  "Shopify Plus agency for D2C brands",
  "Shopify CRO agency",
  "conversion rate optimisation",
  "performance marketing agency",
  "Meta Ads agency",
  "Google Ads agency",
  "SEO agency India",
  "full stack digital marketing",
  "Shopify store development",
  "e-commerce SEO",
  "UGC creative agency",
  "Shopify speed optimisation",
  "Technostripe",
  "Technostripe Solutions",
];

/* ─── Metadata ────────────────────────────────────────── */
export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "www.technostripe.in";
  const isLocal =
    host.includes("localhost") || host.startsWith("127.0.0.1");
  const protocol = isLocal
    ? "http"
    : (requestHeaders.get("x-forwarded-proto") ?? "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: {
      default: SITE_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: KEYWORDS,

    /* ── Canonical ─────────────────────────────────────── */
    alternates: {
      canonical: SITE_URL,
    },

    /* ── App meta ──────────────────────────────────────── */
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "E-commerce Agency",
    classification: "Business",
    referrer: "origin-when-cross-origin",

    /* ── Icons ─────────────────────────────────────────── */
    icons: {
      icon: [
        { url: "/favicon.png", type: "image/png" },
        { url: "/favicon.ico", type: "image/x-icon" },
      ],
      shortcut: "/favicon.png",
      apple: "/apple-touch-icon.png",
    },

    /* ── Open Graph ─────────────────────────────────────── */
    openGraph: {
      title: SITE_TITLE,
      description: OG_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: "en_IN",
      alternateLocale: ["en_GB", "en_US"],
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — Shopify Plus Agency & E-commerce Growth Partner`,
          type: "image/png",
        },
      ],
    },

    /* ── Twitter / X Card ──────────────────────────────── */
    twitter: {
      card: "summary_large_image",
      site: "@technostripe",
      creator: "@technostripe",
      title: `${SITE_NAME} | Shopify Plus & E-commerce Growth`,
      description: OG_DESCRIPTION,
      images: [`${SITE_URL}/og-image.png`],
    },

    /* ── Robots ────────────────────────────────────────── */
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    /* ── Verification (add your actual codes) ──────────── */
    verification: {
      google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
      // yandex: "REPLACE_WITH_YANDEX_CODE",
      // bing: "REPLACE_WITH_BING_CODE",
    },

    /* ── Manifest & theme ──────────────────────────────── */
    manifest: "/site.webmanifest",
    themeColor: [
      { media: "(prefers-color-scheme: dark)", color: "#0a0b0a" },
      { media: "(prefers-color-scheme: light)", color: "#f5f4ef" },
    ],
    colorScheme: "dark light",
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 5,
    },
  };
}

/* ─── Schema.org JSON-LD structured data ─────────────── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/header.png`,
    width: 958,
    height: 207,
  },
  description: SITE_DESCRIPTION,
  foundingDate: "2021",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 15 },
  areaServed: ["India", "United Kingdom", "United States"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@technostripe.com",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/technostripe",
    "https://www.instagram.com/technostripe",
    "https://twitter.com/technostripe",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-IN",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/header.png`,
  description:
    "Full-stack Shopify Plus agency specialising in CRO, performance marketing, and e-commerce growth.",
  image: `${SITE_URL}/og-image.png`,
  priceRange: "₹₹₹",
  currenciesAccepted: "INR, GBP, USD",
  paymentAccepted: "Bank Transfer, UPI, Credit Card",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United States" },
  ],
  hasMap: "https://maps.google.com/?q=Technostripe+Solutions",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@technostripe.com",
  },
  sameAs: [
    "https://www.linkedin.com/company/technostripe",
    "https://www.instagram.com/technostripe",
    "https://twitter.com/technostripe",
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#services`,
  name: "Full-Stack E-commerce Growth Services",
  provider: { "@id": `${SITE_URL}/#organization` },
  serviceType: "Digital Marketing & E-commerce Development",
    description:
      "Shopify Plus development, CRO, performance marketing, SEO, brand strategy, and creative content for D2C brands.",
  areaServed: ["India", "United Kingdom", "United States"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Technostripe Service Packages",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Shopify Plus Development",
          description:
            "Bespoke Shopify Plus store builds with custom checkout, bundle builders, and speed optimisation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Performance Marketing",
          description:
            "Meta Ads and Google Ads management focused on measurable ROAS and revenue growth.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Conversion Rate Optimisation (CRO)",
          description:
            "Data-driven A/B testing, funnel analysis, and UX improvements to increase store conversion rates.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO Services",
          description:
            "Technical SEO, on-page optimisation, and content strategy for e-commerce brands.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Branding & Creative Strategy",
          description:
            "Brand identity, UGC creative strategy, and social media content for D2C brands.",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Technostripe specialise in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Technostripe is a full-stack Shopify Plus agency specialising in high-conversion e-commerce development, performance marketing (Meta & Google Ads), CRO, SEO, and brand strategy for D2C brands.",
      },
    },
    {
      "@type": "Question",
      name: "Which countries does Technostripe work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work with e-commerce brands across India, United Kingdom, and the United States.",
      },
    },
    {
      "@type": "Question",
      name: "How can I get started with Technostripe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book a free strategy call through our website at technostripe.com/contact and our team will get back to you within 24 hours.",
      },
    },
    {
      "@type": "Question",
      name: "Does Technostripe work with small Shopify stores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We primarily work with scaling D2C brands generating $100k+ annually. We focus on brands ready to invest in serious growth and Shopify Plus migration.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: `${SITE_URL}/services`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "About",
      item: `${SITE_URL}/about`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contact",
      item: `${SITE_URL}/contact`,
    },
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Technostripe Solutions Growth Platform",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Shopify Plus development, CRO, SEO, performance marketing, and creative strategy services for D2C brands.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  provider: { "@id": `${SITE_URL}/#organization` },
};

/* ─── Root Layout ─────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-IN" dir="ltr">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Organization schema */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          strategy="beforeInteractive"
        />

        {/* Website schema */}
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          strategy="beforeInteractive"
        />

        {/* LocalBusiness schema */}
        <Script
          id="schema-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          strategy="beforeInteractive"
        />

        <Script
          id="schema-software"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
          strategy="beforeInteractive"
        />

        {/* Service schema */}
        <Script
          id="schema-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
          strategy="beforeInteractive"
        />

        {/* FAQ schema */}
        <Script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          strategy="beforeInteractive"
        />

        {/* Breadcrumb schema */}
        <Script
          id="schema-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="grain antialiased">
        <CustomCursor />
        <PageLoader />
        <ScrollProviderWrapper>{children}</ScrollProviderWrapper>
      </body>
    </html>
  );
}
