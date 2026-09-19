import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CaseStudyCard from "../../components/CaseStudyCard";
import CTASection from "../../components/CTASection";
import { caseStudies } from "../../lib/case-studies";

export default function CaseStudiesPage() {
  const featured = caseStudies.find((c) => c.featured);
  const rest = caseStudies.filter((c) => c.slug !== featured?.slug);

  return (
    <>
      <Navbar />

      <main id="main-content" className="min-h-screen bg-[#0a0b0a] pt-28 pb-24 sm:pt-36">
        {/* ── Hero Header ─────────────────────────────── */}
        <section className="relative overflow-hidden px-4 sm:px-8 lg:px-12 pb-14 sm:pb-18">
          {/* Background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[420px] rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(237,18,56,0.35) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <div className="mx-auto max-w-7xl relative z-10">
            <p className="eyebrow text-[#ed1238] mb-4 tracking-[0.3em]">Case Studies</p>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl text-white mb-6 leading-[0.95]"
              style={{
                fontFamily: "var(--font-display-family)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              Work That Delivers <br />
              <span className="text-[#ed1238]">Real Growth.</span>
            </h1>
            <p className="text-base sm:text-lg text-white/50 max-w-xl leading-relaxed">
              Explore how we engineer high-converting Shopify Plus stores, deploy
              profitable ad funnels, and scale 8-figure D2C brands.
            </p>
          </div>
        </section>

        {/* ── Divider ─────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12 sm:mb-16" />
        </div>

        {/* ── Case Studies Grid ───────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          {caseStudies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="size-16 rounded-full bg-white/5 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-7 text-white/25"
                >
                  <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
                  <path d="M17 4v6h-6M7 13h10M7 17h6" />
                </svg>
              </div>
              <p className="text-white/30 font-mono text-sm tracking-widest uppercase">
                No case studies yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {caseStudies.map((study) => (
                <CaseStudyCard key={study.slug} caseStudy={study} />
              ))}
            </div>
          )}
        </section>

        {/* ── CTA Section ──────────────────────────────── */}
        <div className="mt-20">
          <CTASection variant="portfolio" />
        </div>
      </main>

      <Footer />
    </>
  );
}
