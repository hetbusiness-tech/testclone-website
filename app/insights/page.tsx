import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BlogCard from "../../components/BlogCard";
import { blogs } from "./constants";

export default function InsightsPage() {
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0a0b0a] pt-28 pb-24 sm:pt-36">
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
              E-commerce<br />
              <span className="text-[#ed1238]">Growth</span> Playbook
            </h1>
            <p className="text-base sm:text-lg text-white/50 max-w-xl leading-relaxed">
              Deep-dive articles on Shopify Plus, Meta Ads, CRO, SEO, and
              everything we've learned scaling DTC brands to 8 figures.
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
        <section className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 mt-24">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12 text-center">
            <p className="eyebrow text-[#ed1238] mb-4">Ready to scale?</p>
            <h2
              className="text-3xl sm:text-4xl text-white mb-4"
              style={{
                fontFamily: "var(--font-display-family)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              Let's build your growth machine
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              Book a free 45-minute strategy call and we'll audit your store, ads,
              and retention — no strings attached.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#ed1238] px-7 py-3 text-[0.8rem] font-bold font-mono tracking-[0.14em] uppercase text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_30px_rgba(237,18,56,0.5)]"
            >
              Book Strategy Call
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                className="size-3.5"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
