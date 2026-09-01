"use client";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ScrollMarquee from "../components/ScrollMarquee";
import WhatWeDoSection from "../components/WhatWeDoSection";
import InteractiveServices from "../components/InteractiveServices";
import PortfolioStack from "../components/PortfolioStack";
import ApproachSection from "../components/ApproachSection";
import TestimonialsMarquee from "../components/TestimonialsMarquee";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

// Technostripe (formerly Navbar Digital) — E-commerce growth partner delivering conversion-focused Shopify experiences like Kiwiana Immigration & LuxeAura.
export default function Home() {
  return (
    <main className="min-h-screen bg-ink text-paper selection:bg-[#ed1238] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Hero Section — title, CTAs, stats */}
      <HeroSection />

      {/* 3. "Let's Build" collision, overlapping into What We Do */}
      <ScrollMarquee>
        <WhatWeDoSection />
      </ScrollMarquee>

      {/* 4. Interactive Services List */}
      <section id="services" className="relative z-10 bg-ink">
        <InteractiveServices />
      </section>

      {/* 5. Portfolio Stack Projects */}
      <section className="relative z-10 bg-ink">
        <PortfolioStack />
      </section>

      {/* 6. Our Approach */}
      <ApproachSection />

      {/* 7. Client Testimonials */}
      <section className="relative z-10 bg-ink py-20 border-t border-white/10 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 mb-12">
          <span className="eyebrow text-[#ed1238] font-mono tracking-widest uppercase font-bold">
            ( TESTIMONIALS )
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
            Proof, not promises.
          </h2>
          <p className="mt-3 text-sm text-paper/60">
            Scaling E-commerce, conversion-focused Shopify experiences, and Full-stack digital growth for high-ambition DTC brands.
          </p>
        </div>
        <TestimonialsMarquee />
      </section>

      {/* 8. Pre-Footer CTA */}
      <CTASection />

      {/* 9. Brand Footer */}
      <Footer />
    </main>
  );
}
