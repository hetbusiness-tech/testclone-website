"use client";

import Link from "next/link";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink pt-16 pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          <div className="md:col-span-2 space-y-4">
            <BrandLogo height={42} />
            <p className="text-sm text-paper/60 max-w-sm leading-relaxed">
              Technostripe helps modern e-commerce brands scale through Shopify development, performance marketing, e-commerce SEO, creative systems, and conversion optimization.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#ed1238]">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-paper/70">
              <li>
                <Link href="/services#ecommerce-website-development" className="hover:text-white transition-colors">
                  Shopify Development
                </Link>
              </li>
              <li>
                <Link href="/services#paid-ads" className="hover:text-white transition-colors">
                  Paid Ads & Scaling
                </Link>
              </li>
              <li>
                <Link href="/services#ecommerce-seo-services" className="hover:text-white transition-colors">
                  E-commerce SEO
                </Link>
              </li>
              <li>
                <Link href="/services#social-media-creative" className="hover:text-white transition-colors">
                  Social & UGC Creative
                </Link>
              </li>
              <li>
                <Link href="/services#brand-positioning-cro" className="hover:text-white transition-colors">
                  Brand & Store CRO
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
                <Link href="/#work" className="hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#ed1238]">
              Locations & Reach
            </h4>
            <div className="text-sm text-paper/70 space-y-2">
              <p className="font-medium text-white">Mumbai, India</p>
              <p className="text-xs text-paper/50">BKC, Bandra East</p>
              <p className="font-medium text-white pt-2">Global DTC Partner</p>
              <p className="text-xs text-paper/50">Serving India, UK & US Brands</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-paper/50">
          <p>© {new Date().getFullYear()} Technostripe. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
