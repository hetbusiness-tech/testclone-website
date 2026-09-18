"use client";

import { motion } from "framer-motion";
import TechTicker from "./TechTicker";

export default function WhatWeDoSection() {
  const stats = [
    {
      value: "52+",
      label: "Projects delivered",
    },
    {
      value: "5+ years",
      label: "Driving global growth",
    },
    {
      value: "4.8/5",
      label: "Client Satisfaction",
    },
    {
      value: "3.2x",
      label: "Avg. Blended ROAS",
    },
  ];

  return (
    <section className="relative z-20 flex flex-col justify-between overflow-hidden bg-ink pt-4 pb-8 sm:pt-6 sm:pb-10">
      {/* Top Ticker Bar */}
      <TechTicker />

      {/* Main Editorial Content Area */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 sm:px-10 lg:px-12 my-auto pt-6 pb-6 sm:pt-8 sm:pb-8">

        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow inline-block text-[#ed1238] font-mono tracking-widest uppercase font-bold text-xs sm:text-sm">
            ( WHAT WE DO )
          </span>
        </motion.div>

        {/* Shortened, Compact & Impactful Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.12] tracking-tight text-white"
        >
          We build the Shopify storefronts, performance ads, and growth systems behind ambitious e-commerce brands.
        </motion.h2>

        {/* Punchy Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-white/65 font-normal"
        >
          Technostripe scales D2C brands with bespoke Shopify engineering, high-ROAS paid media, and conversion-optimized architectures.
        </motion.p>
      </div>

      {/* Bottom Stats Row */}
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-12">
        <div className="border-t border-white/10 pt-5 pb-2 sm:pt-7 sm:pb-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-6 lg:gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.07 }}
                className="flex min-w-0 flex-col"
              >
                <span className="whitespace-nowrap font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight tabular-nums text-[#ed1238] leading-none">
                  {stat.value}
                </span>
                <span className="mt-2 text-[0.65rem] leading-tight sm:mt-2.5 sm:text-sm font-mono text-white/60 font-medium tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

