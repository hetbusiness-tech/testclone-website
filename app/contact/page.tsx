"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const services = [
  "Shopify Development & Redesign",
  "Paid Ads (Meta & Google)",
  "E-commerce SEO Services",
  "Social Media & UGC Creative",
  "Brand Positioning & CRO",
  "Full-Stack E-commerce Scale",
];

const revenueRanges = [
  "< $10k / mo",
  "$10k - $50k / mo",
  "$50k - $200k / mo",
  "$200k+ / mo",
];

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Shopify Development & Redesign",
  ]);
  const [selectedRevenue, setSelectedRevenue] = useState("$10k - $50k / mo");
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    email: "",
    websiteUrl: "",
    adSpend: "",
    challenges: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <main className="relative min-h-screen bg-ink text-paper selection:bg-[#ed1238] selection:text-white overflow-hidden">
      {/* Red Ambient Hero Shadow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[450px] w-[800px] max-w-full rounded-full bg-[#ed1238]/15 blur-[140px] z-0" />

      {/* Shared Header */}
      <Navbar />

      {/* Main Form & Contact Information Grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1.35fr] lg:gap-16 items-start">
          
          {/* Left Column: Context & Direct Contact Details */}
          <div>
            <span className="eyebrow text-[#ed1238] font-mono tracking-widest uppercase font-bold">
              ( BOOK STRATEGY CALL )
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.04]">
              Let’s scale your e-commerce brand.
            </h1>
            <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-paper/70 font-normal">
              Tell us about your brand, current bottlenecks, and revenue goals. We’ll analyze your store and map the next opportunities for profitable scale.
            </p>

            {/* Direct Contact Cards */}
            <div className="mt-10 space-y-4">
              <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-[#ed1238]/50">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#ed1238]/10 text-[#ed1238] border border-[#ed1238]/20 shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-paper/50">Location</p>
                    <p className="mt-0.5 text-sm sm:text-base font-semibold text-white">Mumbai, India (Global DTC Scale)</p>
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-[#ed1238]/50">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#ed1238]/10 text-[#ed1238] border border-[#ed1238]/20 shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-paper/50">Direct Email</p>
                    <a href="mailto:hello@technostripe.com" className="mt-0.5 text-sm sm:text-base font-semibold text-white hover:text-[#ed1238] transition-colors">
                      hello@technostripe.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="mt-10 pt-8 border-t border-white/10 space-y-3 font-mono text-xs text-paper/60">
              <div className="flex items-center gap-2.5">
                <span className="text-[#ed1238]">✓</span>
                <span>Direct consultation with e-commerce growth strategists</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#ed1238]">✓</span>
                <span>Free Shopify conversion & speed audit included</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#ed1238]">✓</span>
                <span>No pressure, actionable growth roadmap</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Growth Inquiry Form */}
          <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-8 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#ed1238]/20 text-[#ed1238] border border-[#ed1238]/40 mb-6">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-8">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display text-3xl font-black text-white">Strategy Request Received!</h3>
                <p className="mt-3 text-sm text-paper/70 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Our growth team will review your store metrics and contact you within 24 hours to schedule your strategy session.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* 1. Services selection */}
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-paper/70 mb-3">
                    Services You&apos;re Interested In
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-[#ed1238] text-white shadow-[0_0_15px_rgba(237,18,56,0.4)]"
                              : "border border-white/15 bg-white/5 text-paper/70 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Monthly Revenue Range */}
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-paper/70 mb-3">
                    Monthly Store Revenue
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {revenueRanges.map((range) => {
                      const isSelected = selectedRevenue === range;
                      return (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setSelectedRevenue(range)}
                          className={`rounded-xl py-2.5 px-3 text-xs font-semibold text-center transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-[#ed1238] text-white shadow-[0_0_15px_rgba(237,18,56,0.4)]"
                              : "border border-white/15 bg-white/5 text-paper/70 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {range}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Text inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-paper/70 mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rohan Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-paper/30 outline-none transition-colors focus:border-[#ed1238]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-paper/70 mb-2">
                      Brand / Company Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. LuxeAura Apparel"
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-paper/30 outline-none transition-colors focus:border-[#ed1238]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-paper/70 mb-2">
                      Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="rohan@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-paper/30 outline-none transition-colors focus:border-[#ed1238]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-paper/70 mb-2">
                      Store Website URL *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="https://yourbrand.com"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-paper/30 outline-none transition-colors focus:border-[#ed1238]"
                    />
                  </div>
                </div>

                {/* Challenges & goals */}
                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-paper/70 mb-2">
                    Current Challenges & Growth Goals
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your current conversion rate, ad performance, or redesign timeline..."
                    value={formData.challenges}
                    onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-paper/30 outline-none transition-colors focus:border-[#ed1238]"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#ed1238] py-4 text-sm font-bold tracking-tight text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_30px_rgba(237,18,56,0.6)] cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting Inquiry..." : "Book Free Strategy Call ↗"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Thoughtful Quote at Bottom */}
        <div className="mt-20 pt-12 border-t border-white/10 text-center max-w-3xl mx-auto">
          <p className="font-display text-xl sm:text-2xl font-semibold text-white/90 leading-relaxed italic">
            “Where Ambition Meets Execution — We turn high-complexity ideas into market-dominating digital reality.”
          </p>
          <p className="mt-3 font-mono text-xs tracking-widest text-[#ed1238] uppercase font-bold">
            ✦ The Technostripe Team
          </p>
        </div>
      </div>

      {/* Shared Footer */}
      <Footer />
    </main>
  );
}
