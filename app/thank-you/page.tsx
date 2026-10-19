"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ThankYouPage() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen bg-ink text-paper selection:bg-[#ed1238] selection:text-white overflow-hidden"
    >
      {/* Red Ambient Hero Shadow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[450px] w-[800px] max-w-full rounded-full bg-[#ed1238]/15 blur-[140px] z-0" />

      {/* Shared Header */}
      <Navbar />

      {/* Thank You Section */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          {/* Eyebrow */}
          <span className="inline-block eyebrow text-[#ed1238] font-mono tracking-widest uppercase font-bold text-xs sm:text-sm">
            ( INQUIRY RECEIVED )
          </span>

          {/* Success Check Icon */}
          <div className="mx-auto mt-6 flex size-20 sm:size-24 items-center justify-center rounded-full bg-[#ed1238]/15 text-[#ed1238] border border-[#ed1238]/30 shadow-[0_0_35px_rgba(237,18,56,0.3)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="size-10 sm:size-12"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="mt-8 font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-[1.08] sm:leading-[1.04]">
            Thank you! We&apos;ve received your inquiry.
          </h1>

          {/* Subtitle / Description */}
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-paper/70 font-normal">
            Our growth team is currently reviewing your brand information and store metrics. We will contact you within 24 hours to schedule your strategy session.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-black/20 bg-black/5 px-8 py-3.5 text-sm font-semibold tracking-tight text-black hover:bg-black/10 transition-colors cursor-pointer"
            >
              ← Back to Home
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#ed1238] px-8 py-3.5 text-sm font-bold tracking-tight text-white hover:bg-[#ff2046] hover:shadow-[0_0_30px_rgba(237,18,56,0.5)] transition-all cursor-pointer"
            >
              Explore our services ↗
            </Link>
          </div>

          {/* Next Steps Timeline / Cards */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left">
            <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-6 backdrop-blur-sm">
              <span className="font-mono text-xs font-bold text-[#ed1238] uppercase tracking-wider">
                01 / Store Analysis
              </span>
              <h3 className="mt-2 text-base font-bold text-black">
                Comprehensive Audit
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-paper/60 leading-relaxed">
                We review your current website performance, conversion friction, and growth opportunities.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-6 backdrop-blur-sm">
              <span className="font-mono text-xs font-bold text-[#ed1238] uppercase tracking-wider">
                02 / Growth Blueprint
              </span>
              <h3 className="mt-2 text-base font-bold text-black">
                Strategic Roadmap
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-paper/60 leading-relaxed">
                We tailor actionable recommendations focused on increasing ROI and scaling your D2C brand.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-6 backdrop-blur-sm">
              <span className="font-mono text-xs font-bold text-[#ed1238] uppercase tracking-wider">
                03 / Strategy Call
              </span>
              <h3 className="mt-2 text-base font-bold text-black">
                1-on-1 Consultation
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-paper/60 leading-relaxed">
                Our specialists will meet with you to review our findings and outline next steps.
              </p>
            </div>
          </div>

          {/* Direct Support Note */}
          <div className="mt-12 rounded-2xl border border-black/10 bg-black/[0.02] p-5 text-center">
            <p className="text-xs sm:text-sm text-paper/60">
              Need immediate assistance? Reach out to us directly at{" "}
              <a
                href="mailto:technostripesolution@gmail.com"
                className="font-semibold text-black hover:text-[#ed1238] underline transition-colors"
              >
                technostripesolution@gmail.com
              </a>{" "}
              or on WhatsApp at{" "}
              <a
                href="tel:+919714734563"
                className="font-semibold text-black hover:text-[#ed1238] underline transition-colors"
              >
                +91 9714734563
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>

      {/* Shared Footer */}
      <Footer />
    </main>
  );
}
