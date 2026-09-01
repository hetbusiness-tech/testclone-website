"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative z-10 bg-ink py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#ed1238] bg-gradient-to-br from-ink-soft via-[#121412] to-ink p-8 sm:p-14 lg:p-20 shadow-[0_0_60px_-10px_rgba(237,18,56,0.4)] backdrop-blur-xl">
          
          <motion.div
            animate={{
              rotate: [-12, -8, -12],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-8 -bottom-8 sm:-right-12 sm:-bottom-12 opacity-35 sm:opacity-45 pointer-events-none mix-blend-screen"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#ed1238]/30 blur-2xl transform scale-125" />
              <Image
                src="/favicon.png"
                width={280}
                height={280}
                unoptimized
                alt="Technostripe Mark"
                className="h-48 w-48 sm:h-72 sm:w-72 object-contain"
              />
            </div>
          </motion.div>

          <div className="relative z-10 max-w-2xl">
            <span className="eyebrow text-[#ed1238] font-mono tracking-widest uppercase font-bold">
              ( START SCALING )
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[0.98]">
              Ready to scale your<br />e-commerce brand?
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-paper/70 font-normal">
              Let&apos;s build a growth system designed for profitable scale. Book a free growth call with our team and let&apos;s map your roadmap.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ed1238] px-8 py-4 text-sm font-bold tracking-tight text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_35px_rgba(237,18,56,0.6)] cursor-pointer"
              >
                Book Free Growth Call
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="size-4"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
