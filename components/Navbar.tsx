"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandLogo from "./BrandLogo";

export const navItems = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [progressVisible, setProgressVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Hide loading progress bar after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressVisible(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open on very small screens
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {progressVisible && (
        <div className="site-progress fixed top-0 left-0 right-0 z-50" aria-hidden="true">
          <div className="site-progress-fill" />
        </div>
      )}

      <header className="fixed top-3.5 sm:top-5 left-0 right-0 z-40 px-4 sm:px-8 lg:px-12 pointer-events-none">
        <div ref={menuRef} className="pointer-events-auto mx-auto max-w-6xl">
          {/* Main Navbar Pill */}
          <div className="relative z-50 flex h-[3.85rem] items-center justify-between rounded-full border border-white/15 bg-[#0a0b0a]/90 px-4 sm:px-8 shadow-[0_20px_45px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300">
            {/* Left: Brand Logo (BrandLogo already wraps its own Link) */}
            <div className="flex items-center">
              <BrandLogo height={34} priority className="sm:hidden" />
              <BrandLogo height={44} priority className="hidden sm:inline-flex" />
            </div>

            {/* Desktop Navigation (>= lg) */}
            <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-10 text-[11px] font-mono tracking-[0.2em] uppercase text-white/85">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : item.href.startsWith("/#")
                      ? false
                      : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative py-1 transition-colors duration-200 hover:text-[#ed1238] ${
                      isActive ? "text-[#ed1238] font-bold" : "text-white/85"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#ed1238]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA Button (>= lg) */}
            <div className="hidden lg:flex items-center justify-end">
              <Link
                href="https://calendly.com/techno-stripe/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 justify-center rounded-full bg-[#ed1238] px-6 py-2.5 text-[11px] font-bold font-mono tracking-[0.14em] uppercase text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_25px_rgba(237,18,56,0.6)] cursor-pointer"
              >
                <span>Book a Call</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="size-3.5">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
            </div>

            {/* Mobile & Tablet Icon-Only Menu Button (< lg) */}
            <div className="flex lg:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                className="flex size-11 items-center justify-center text-white transition-colors duration-200 hover:text-[#ed1238] cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="size-6"
                >
                  {mobileMenuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <>
                      <line x1="4" y1="7" x2="20" y2="7" />
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <line x1="4" y1="17" x2="20" y2="17" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile & Tablet Dropdown Menu Card */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-2.5 overflow-hidden rounded-[2rem] border border-white/15 bg-[#0e0f0e]/95 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl lg:hidden"
              >
                {/* Navigation Links */}
                <nav className="flex flex-col space-y-1 pb-5 border-b border-white/10 font-mono text-sm uppercase tracking-wider">
                  {navItems.map((item, idx) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : item.href.startsWith("/#")
                          ? false
                          : pathname.startsWith(item.href);

                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04, duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-[#ed1238]/15 text-[#ed1238] font-bold border border-[#ed1238]/30"
                              : "text-white/80 hover:text-white hover:bg-white/[0.04]"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`size-1.5 rounded-full ${
                                isActive ? "bg-[#ed1238]" : "bg-white/20"
                              }`}
                            />
                            {item.label}
                          </span>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`size-4 transition-transform duration-200 ${
                              isActive ? "text-[#ed1238] translate-x-0.5" : "text-white/30"
                            }`}
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Dropdown CTA Action */}
                <div className="pt-5 space-y-4">
                  <Link
                    href="https://calendly.com/techno-stripe/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ed1238] py-3.5 text-xs font-bold font-mono tracking-[0.14em] uppercase text-white shadow-[0_0_25px_rgba(237,18,56,0.4)] transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_35px_rgba(237,18,56,0.7)] cursor-pointer"
                  >
                    <span>Book a Strategy Call</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </Link>

                  {/* Direct Contact Teaser */}
                  <div className="flex items-center justify-between px-2 text-[11px] font-mono text-white/40">
                    <a
                      href="mailto:growth@technostripe.com"
                      className="hover:text-[#ed1238] transition-colors"
                    >
                      growth@technostripe.com
                    </a>
                    <a
                      href="tel:+919714734563"
                      className="hover:text-[#ed1238] transition-colors"
                    >
                      +91 9714734563
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}

