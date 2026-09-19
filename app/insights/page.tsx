import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BlogCard from "../../components/BlogCard";
import CTASection from "../../components/CTASection";
import { blogs } from "./constants";

export default function InsightsPage() {
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

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
            <p className="eyebrow text-[#ed1238] mb-4 tracking-[0.3em]">Insights</p>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl text-white mb-6 leading-[0.95]"
              style={{
                fontFamily: "var(--font-display-family)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              E-commerce <br />
              <span className="text-[#ed1238]">Growth</span> Playbook
            </h1>
            <p className="text-base sm:text-lg text-white/50 max-w-xl leading-relaxed">
              Deep-dive articles on Shopify Plus, Meta Ads, CRO, SEO, and
              everything we've learned scaling D2C brands to 8 figures.
            </p>
          </div>
        </section>

        {/* ── Divider ─────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12 sm:mb-16" />
        </div>

        {/* ── 3-Card Grid (1 Row, 3 Cards on Desktop) ──── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          {sortedBlogs.length === 0 ? (
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
                No posts yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {sortedBlogs.map((blog) => (
                <BlogCard key={blog.id || blog.slug} blog={blog} />
              ))}
            </div>
          )}
        </section>

        {/* ── CTA Section ──────────────────────────────── */}
        <div className="mt-20">
          <CTASection variant="insights" />
        </div>
      </main>

      <Footer />
    </>
  );
}
