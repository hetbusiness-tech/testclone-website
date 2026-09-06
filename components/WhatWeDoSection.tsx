"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TechTicker from "./TechTicker";

export default function WhatWeDoSection() {
  return (
    <section className="relative z-20 flex min-h-screen flex-col overflow-hidden bg-ink">
      <TechTicker />
      <div className="mx-auto flex w-full max-w-7xl items-center px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          {/* Left Column */}
          <div className="relative z-10 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="eyebrow text-[#ed1238] font-mono tracking-widest uppercase font-bold text-xs"
            >
              ( WHAT WE DO )
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-[31rem] font-display text-[clamp(2.35rem,3.9vw,4rem)] font-extrabold leading-[1.06] tracking-tight text-white"
            >
              <span className="block">We build the</span>
              <span className="block">websites, apps,</span>
              <span className="block">and <em className="not-italic text-[#ed1238]">growth</em></span>
              <span className="block">systems behind</span>
              <span className="block">ambitious</span>
              <span className="block">e-commerce <em className="not-italic text-[#ed1238]">brands.</em></span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 max-w-md text-base leading-relaxed text-white/70 sm:text-lg"
            >
              From powerful storefronts to smart automation, we create digital experiences that drive traffic,
              conversions, and long-term growth.
            </motion.p>

            <div className="mt-9 grid max-w-xl grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-0">
              {[
                { label: "Custom", detail: "Development", icon: "code" },
                { label: "E-commerce", detail: "Solutions", icon: "cart" },
                { label: "Growth", detail: "Systems", icon: "chart" },
                { label: "Mobile App", detail: "Development", icon: "phone" },
              ].map((item, index) => (
                <div key={item.label} className={`flex min-w-0 flex-col gap-2 border-white/20 pr-4 sm:px-4 ${index > 0 ? "sm:border-l" : "sm:pl-0"}`}>
                  <span className="flex h-8 items-center text-[#ed1238]" aria-hidden="true">
                    <span className="font-mono text-2xl leading-none">{item.icon === "code" ? "⌘" : item.icon === "cart" ? "⌑" : item.icon === "chart" ? "↗" : "▣"}</span>
                  </span>
                  <span className="font-mono text-xs leading-snug text-white/80">
                    {item.label}<br />{item.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: e-commerce growth visual */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[760px] origin-center lg:w-[128%] lg:translate-x-3 lg:scale-[1.08] xl:w-[136%] xl:scale-[1.14]"
            >
              {/* Enhanced ambient red backlight glow */}
              <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-[#ed1238]/35 via-[#ed1238]/20 to-transparent blur-3xl pointer-events-none transform -translate-y-4 scale-125" />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <Image
                  src="/what-we-do-mockup.png"
                  alt="E-commerce growth systems, apps, and Shopify store performance"
                  width={1400}
                  height={950}
                  priority
                  unoptimized
                  className="h-auto w-full origin-center object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.9)] lg:scale-[1.26] xl:scale-[1.32]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
