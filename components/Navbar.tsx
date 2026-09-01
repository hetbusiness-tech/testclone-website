"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "./BrandLogo";

export const navItems = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <div className="site-progress fixed top-0 left-0 right-0 z-50" aria-hidden="true">
        <div className="site-progress-fill" />
      </div>

      <header className="fixed top-3.5 sm:top-5 left-0 right-0 z-40 px-4 sm:px-8 lg:px-12 pointer-events-none">
        <div className="pointer-events-auto mx-auto flex h-[3.85rem] max-w-6xl items-center justify-between rounded-full border border-white/15 bg-[#0a0b0a]/90 px-6 sm:px-8 shadow-[0_20px_45px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300">
          <div className="flex items-center">
            <BrandLogo height={30} priority className="sm:hidden" />
            <BrandLogo height={36} priority className="hidden sm:inline-flex" />
          </div>

          <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10 text-[11px] font-mono tracking-[0.2em] uppercase text-white/85">
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
                  className={`transition-colors duration-200 hover:text-white ${
                    isActive ? "text-[#ed1238] font-bold" : "text-white/85"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 justify-center rounded-full bg-[#ed1238] px-5 sm:px-6 py-2.5 text-[11px] font-bold font-mono tracking-[0.14em] uppercase text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_25px_rgba(237,18,56,0.6)] cursor-pointer"
            >
              <span>Book Strategy Call</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="size-3.5">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
