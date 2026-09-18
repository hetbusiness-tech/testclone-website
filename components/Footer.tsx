"use client";

import Link from "next/link";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink pt-16 pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          <div className="md:col-span-2 space-y-4">
            <BrandLogo
              height={58}
              className="drop-shadow-[0_0_18px_rgba(237,18,56,0.18)]"
            />
            <p className="text-sm text-paper/60 max-w-sm leading-relaxed">
              Technostripe helps modern e-commerce brands scale through Shopify development, performance marketing, e-commerce SEO, creative systems, and conversion optimization.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/technostripe.growth/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-paper/60 transition-all duration-200 hover:border-[#ed1238]/50 hover:bg-[#ed1238]/10 hover:text-[#ed1238]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="3.5" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/919714734563"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-paper/60 transition-all duration-200 hover:border-[#ed1238]/50 hover:bg-[#ed1238]/10 hover:text-[#ed1238]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/technostripe-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-paper/60 transition-all duration-200 hover:border-[#ed1238]/50 hover:bg-[#ed1238]/10 hover:text-[#ed1238]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Facebook (using Instagram link for now) */}
              <a
                href="https://www.instagram.com/technostripe.growth/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-paper/60 transition-all duration-200 hover:border-[#ed1238]/50 hover:bg-[#ed1238]/10 hover:text-[#ed1238]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#ed1238]">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-paper/70">
              <li>
                <Link href="/services#ecommerce-website-development" className="hover:text-[#ed1238] transition-colors">
                  E-commerce Website Development
                </Link>
              </li>
              <li>
                <Link href="/services#paid-ads" className="hover:text-[#ed1238] transition-colors">
                  Paid Ads
                </Link>
              </li>
              <li>
                <Link href="/services#ecommerce-seo-services" className="hover:text-[#ed1238] transition-colors">
                  E-commerce SEO
                </Link>
              </li>
              <li>
                <Link href="/services#social-media-creative" className="hover:text-[#ed1238] transition-colors">
                  Social Media & Creative
                </Link>
              </li>
              <li>
                <Link href="/services#brand-positioning-cro" className="hover:text-[#ed1238] transition-colors">
                  Brand Positioning & CRO
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#ed1238]">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-paper/70">
              <li>
                <Link href="/portfolio" className="hover:text-[#ed1238] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#ed1238] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-[#ed1238] transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#ed1238] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#ed1238]">
              Contact
            </h4>
            <div className="text-sm text-paper/70 space-y-3">
              <div>
                <p className="text-[11px] text-paper/40 font-mono uppercase tracking-wider mb-0.5">Email</p>
                <a
                  href="mailto:Growth@technostripe.com"
                  className="text-paper/85 hover:text-[#ed1238] transition-colors font-medium break-all"
                >
                  Growth@technostripe.com
                </a>
              </div>
              <div>
                <p className="text-[11px] text-paper/40 font-mono uppercase tracking-wider mb-0.5">Phone</p>
                <a
                  href="tel:+919714734563"
                  className="text-paper/85 hover:text-[#ed1238] transition-colors font-medium"
                >
                  +91 9714734563
                </a>
              </div>
              <div className="pt-1 border-t border-white/8">
                <p className="font-medium text-white text-xs">Global D2C Partner</p>
                <p className="text-xs text-paper/50">Scaling High-Growth Brands</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-paper/50">
          <p>© {new Date().getFullYear()} Technostripe. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-[#ed1238] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-[#ed1238] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
