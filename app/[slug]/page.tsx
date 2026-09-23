import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CaseStudyCard from "../../components/CaseStudyCard";
import WhatsAppLeadForm from "../../components/WhatsAppLeadForm";
import FaqAccordion from "../../components/FaqAccordion";
import RelatedLinksSection from "../../components/RelatedLinksSection";
import {
  getAllSeoSlugs,
  getSeoPageBySlug,
  getRelatedNationalPages,
  getCityVariantsForKeyword,
  SERVICE_GROUP_TO_CONTACT_LABEL,
} from "../../lib/seo-pages";
import { getCaseStudyBySlug } from "../../lib/case-studies";

const SITE_URL = "https://technostripe.com";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSeoSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getSeoPageBySlug(params.slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `${SITE_URL}/${page.slug}`,
      siteName: "Technostripe Solutions",
      type: "website",
      images: [{ url: `${SITE_URL}${page.heroImage}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
      images: [`${SITE_URL}${page.heroImage}`],
    },
  };
}

export default function SeoPage({ params }: Props) {
  const page = getSeoPageBySlug(params.slug);
  if (!page) notFound();

  const proofCaseStudies = page.proofSlugs
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));

  const relatedServiceLinks = getRelatedNationalPages(page).map((p) => ({
    label: p.title,
    href: `/${p.slug}`,
  }));
  const cityLinks = getCityVariantsForKeyword(page.slug).map((c) => ({
    label: c.cityName,
    href: `/${c.citySlug}/${page.slug}`,
  }));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Technostripe Solutions",
      url: SITE_URL,
      logo: `${SITE_URL}/header.png`,
    },
    url: `${SITE_URL}/${page.slug}`,
    serviceType: page.serviceGroup,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main id="main-content" className="min-h-screen bg-[#0a0b0a]">
        {/* ── HERO ────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(237,18,56,0.12)_0%,transparent_55%)]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-2 text-[0.7rem] font-mono tracking-wider text-white/30"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-white/55 truncate max-w-[240px]">{page.h1}</span>
            </nav>

            {/* Mobile stacking order: badge/H1 -> form -> intro -> stats -> image.
                Desktop: left column (badge/H1, intro, stats, image) next to a
                right column that's just the form, spanning the full height. */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-6 lg:items-start">
              {/* Badge + H1 */}
              <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
                <span className="inline-block rounded-full border border-[#ed1238]/30 bg-[#ed1238]/15 px-3 py-0.5 text-[0.65rem] font-mono tracking-[0.15em] uppercase text-[#ff4d6d] mb-5">
                  {page.serviceGroup}
                </span>

                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1]"
                  style={{
                    fontFamily: "var(--font-display-family)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {page.h1}
                </h1>
              </div>

              {/* Form — spans the full right column height */}
              <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-4">
                <WhatsAppLeadForm
                  context={page.keyword}
                  preselectedService={SERVICE_GROUP_TO_CONTACT_LABEL[page.serviceGroup]}
                />
              </div>

              {/* Intro */}
              <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2">
                <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                  {page.intro}
                </p>
              </div>

              {/* Stat chips */}
              <div className="order-4 lg:order-none lg:col-start-1 lg:row-start-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {page.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 text-center"
                  >
                    <p className="text-lg sm:text-xl font-display font-extrabold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[0.6rem] font-mono uppercase tracking-wider text-white/40 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Hero image — fills the remaining left-column space */}
              <div className="order-5 lg:order-none lg:col-start-1 lg:row-start-4 relative">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#101210] shadow-2xl">
                  <Image
                    src={page.heroImage}
                    alt={page.heroImageAlt}
                    fill
                    unoptimized
                    priority
                    className="object-cover object-center"
                  />
                  <div className="pointer-events-none absolute -bottom-8 -right-8 size-40 rounded-full bg-[#ed1238]/25 blur-3xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
          {/* ── COVERAGE GRID ─────────────────────────────── */}
          <section className="border-t border-white/10 pt-14 sm:pt-20">
            <p className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-[#ed1238] mb-4">
              What this covers
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {page.coverage.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-[#ed1238]/30 hover:bg-white/[0.04]"
                >
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── STANDARDS ─────────────────────────────────── */}
          <section className="border-t border-white/10 pt-14 sm:pt-20 mt-14 sm:mt-20">
            <p className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-[#ed1238] mb-4">
              What we build with
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {page.standards.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4">
                  <span className="text-[#ed1238] font-bold shrink-0 mt-0.5">✓</span>
                  <span className="text-sm text-white/75 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── PROOF ─────────────────────────────────────── */}
          {proofCaseStudies.length > 0 && (
            <section className="border-t border-white/10 pt-14 sm:pt-20 mt-14 sm:mt-20">
              <p className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-[#ed1238] mb-4">
                Real work, not a sales pitch
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {proofCaseStudies.map((cs) => (
                  <CaseStudyCard key={cs.slug} caseStudy={cs} />
                ))}
              </div>
            </section>
          )}

          {/* ── PROCESS ───────────────────────────────────── */}
          <section className="border-t border-white/10 pt-14 sm:pt-20 mt-14 sm:mt-20">
            <p className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-[#ed1238] mb-4">
              Our process
            </p>
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {page.process.map((step, idx) => (
                  <div
                    key={step.step}
                    className={`p-6 sm:p-7 border-b sm:border-b-0 last:border-b-0 border-white/10 ${
                      idx < page.process.length - 1 ? "sm:border-r" : ""
                    }`}
                  >
                    <span className="font-mono text-xs text-white/40 font-medium">
                      {step.step}
                    </span>
                    <h4 className="mt-2 font-display text-lg font-bold text-white tracking-tight">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-sm text-white/55 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── HIRING CHECKLIST ──────────────────────────── */}
          <section className="border-t border-white/10 pt-14 sm:pt-20 mt-14 sm:mt-20">
            <p className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-[#ed1238] mb-4">
              What to check before hiring
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-4">
              {page.hiringChecklist.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#ed1238]" />
                  <span className="text-sm sm:text-base text-white/70 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── CLOSING ───────────────────────────────────── */}
          <section className="border-t border-white/10 pt-14 sm:pt-20 mt-14 sm:mt-20">
            <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
              {page.closingParagraph}
            </p>
          </section>

          {/* ── FAQ ───────────────────────────────────────── */}
          <section className="border-t border-white/10 pt-14 sm:pt-20 mt-14 sm:mt-20">
            <p className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-[#ed1238] mb-6">
              Frequently Asked Questions
            </p>
            <FaqAccordion faqs={page.faqs} />
          </section>

          {/* ── CTA ───────────────────────────────────────── */}
          <section className="mt-14 sm:mt-20 rounded-2xl border border-[#ed1238]/20 bg-[#ed1238]/5 p-8 sm:p-10 text-center">
            <p className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-[#ed1238] mb-3">
              Ready to talk?
            </p>
            <p className="text-lg text-white/80 leading-relaxed mb-6 max-w-lg mx-auto">
              Book a free strategy call and get a specific plan for your store — not a generic proposal.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ed1238] px-7 py-3.5 text-sm font-bold font-mono tracking-[0.14em] uppercase text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_25px_rgba(237,18,56,0.5)]"
            >
              Book Strategy Call
            </Link>
          </section>

          {/* ── INTERNAL LINKING (kept in strict topical/geo silos) ────── */}
          {(relatedServiceLinks.length > 0 || cityLinks.length > 0) && (
            <section className="mt-14 sm:mt-20 mb-20 space-y-10">
              {relatedServiceLinks.length > 0 && (
                <RelatedLinksSection
                  title={`More ${page.serviceGroup} Services`}
                  items={relatedServiceLinks}
                />
              )}
              {cityLinks.length > 0 && (
                <RelatedLinksSection
                  title={`${page.keyword} in Other Cities`}
                  items={cityLinks}
                />
              )}
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
