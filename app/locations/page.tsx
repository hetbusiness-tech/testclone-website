import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CITIES } from "../../lib/seo-pages";

const SITE_URL = "https://technostripe.com";

export const metadata: Metadata = {
  title: "Global Locations & Service Hubs | Technostripe Solutions",
  description:
    "Explore Technostripe's global service locations across the UK, US, UAE, and India. High-performance Shopify development, e-commerce SEO, and D2C scaling in your city.",
  alternates: {
    canonical: `${SITE_URL}/locations`,
  },
  openGraph: {
    title: "Global Locations & Service Hubs | Technostripe Solutions",
    description:
      "Explore Technostripe's global service locations across the UK, US, UAE, and India. High-performance Shopify development, e-commerce SEO, and D2C scaling in your city.",
    url: `${SITE_URL}/locations`,
    siteName: "Technostripe Solutions",
    type: "website",
  },
};

export default function LocationsPage() {
  const sortedCities = [...CITIES].sort((a, b) => a.name.localeCompare(b.name));

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
        name: "Locations",
        item: `${SITE_URL}/locations`,
      },
    ],
  };

  return (
    <>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main id="main-content" className="min-h-screen bg-[#fffafa]">
        {/* HERO */}
        <section className="relative overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-20 border-b border-black/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(237,18,56,0.12)_0%,transparent_55%)]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 text-center">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center justify-center gap-2 text-[0.7rem] font-mono tracking-wider text-black/30"
            >
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-black/55">Locations</span>
            </nav>

            <span className="inline-block rounded-full border border-[#ed1238]/30 bg-[#ed1238]/15 px-3 py-0.5 text-[0.65rem] font-mono tracking-[0.15em] uppercase text-[#ff4d6d] mb-4">
              Worldwide Reach · Local Expertise
            </span>

            <h1
              className="text-3xl sm:text-5xl lg:text-6xl text-black leading-[1.1] max-w-4xl mx-auto"
              style={{
                fontFamily: "var(--font-display-family)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              Our Global Service Locations
            </h1>

            <p className="mt-5 text-base sm:text-lg text-black/70 leading-relaxed max-w-2xl mx-auto">
              We partner with forward-thinking D2C and e-commerce brands worldwide.
              Find your city below to discover local Shopify development, performance marketing, and SEO capabilities.
            </p>
          </div>
        </section>

        {/* CITIES DIRECTORY GRID */}
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-black/10">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-black">
              All Active Cities ({sortedCities.length})
            </h2>
            <p className="text-xs font-mono text-black/40">
              Alphabetical Index
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {sortedCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-black/8 bg-black/[0.02] p-4 transition-all duration-200 hover:border-[#ed1238]/40 hover:bg-[#ed1238]/[0.03] hover:shadow-sm"
              >
                <div>
                  <h3 className="text-sm font-semibold text-black group-hover:text-[#ed1238] transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-[11px] font-mono text-black/40 mt-1">
                    Shopify &amp; SEO
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-medium text-[#ed1238] flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View Services</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <section className="mt-16 sm:mt-24 rounded-2xl border border-[#ed1238]/20 bg-[#ed1238]/5 p-8 sm:p-12 text-center">
            <p className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-[#ed1238] mb-3">
              Don&apos;t see your location?
            </p>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-black mb-3">
              We Work With Brands Remotely Worldwide
            </h3>
            <p className="text-base text-black/75 leading-relaxed mb-6 max-w-xl mx-auto">
              Our engineering and growth team provides 24/7 turnaround and seamless communication across all major time zones.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ed1238] px-7 py-3.5 text-sm font-bold font-mono tracking-[0.14em] uppercase text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_25px_rgba(237,18,56,0.5)]"
            >
              Talk With Our Team
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
