"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const servicesOptions = [
  "Website Development",
  "Mobile App Development",
  "SEO Services",
  "Digital Marketing",
  "Paid Advertising",
  "UI/UX Design",
  "Branding & Strategy",
];

export function openContactModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  }
}

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Website Development");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const handleOpen = () => {
      setSubmitted(false);
      setIsOpen(true);
    };
    window.addEventListener("open-contact-modal", handleOpen);
    return () => window.removeEventListener("open-contact-modal", handleOpen);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 my-8 w-full max-w-4xl overflow-hidden rounded-[2.25rem] border-2 border-[#ed1238] bg-[#0c0e0c] shadow-[0_0_80px_rgba(237,18,56,0.4)]"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 z-20 flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-paper/70 transition-all hover:bg-[#ed1238] hover:text-white"
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr]">
              {/* Left Side: Contact Information & Thoughtful Line */}
              <div className="flex flex-col justify-between border-b border-white/10 p-8 sm:p-10 lg:border-b-0 lg:border-r bg-gradient-to-b from-[#141714] to-[#0c0e0c]">
                <div>
                  <span className="font-mono text-xs font-bold tracking-widest text-[#ed1238]">
                    ( GET IN TOUCH )
                  </span>
                  <h3 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-paper leading-tight">
                    Let&apos;s build something great.
                  </h3>

                  {/* Thoughtful Line */}
                  <blockquote className="mt-6 border-l-2 border-[#ed1238] pl-4 text-sm sm:text-base italic text-paper/75 leading-relaxed">
                    &ldquo;Every great digital transformation begins with a single conversation. Share your vision, and we&apos;ll engineer the solution.&rdquo;
                  </blockquote>

                  {/* Contact Details */}
                  <div className="mt-8 space-y-4 text-sm text-paper/80">
                    <div className="flex items-start gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#ed1238]/15 text-[#ed1238]">
                        📍
                      </span>
                      <div>
                        <p className="font-bold text-paper">Headquarters</p>
                        <p className="text-paper/60">Mumbai, Maharashtra, India</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#ed1238]/15 text-[#ed1238]">
                        📞
                      </span>
                      <div>
                        <p className="font-bold text-paper">Direct Line</p>
                        <a href="tel:+64220890942" className="text-paper/60 transition-colors hover:text-[#ed1238]">
                          +64 22 089 0942 / +91 98765 43210
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#ed1238]/15 text-[#ed1238]">
                        ✉️
                      </span>
                      <div>
                        <p className="font-bold text-paper">Email Us</p>
                        <a href="mailto:info@navbardigital.com" className="text-paper/60 transition-colors hover:text-[#ed1238]">
                          info@navbardigital.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-xl bg-white/5 p-3.5 border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-paper/60">
                    <span className="size-2 rounded-full bg-green-500 animate-ping" />
                    <span>Average response time: &lt; 2 hours</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Interactive Form */}
              <div className="p-8 sm:p-10">
                {submitted ? (
                  <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-[#ed1238] text-3xl text-white shadow-[0_0_40px_rgba(237,18,56,0.6)]">
                      ✓
                    </div>
                    <h4 className="mt-6 font-display text-2xl font-bold text-paper">
                      Consultation Request Received!
                    </h4>
                    <p className="mt-2 max-w-sm text-sm text-paper/70 leading-relaxed">
                      Thank you for reaching out. Our team will analyze your requirements and contact you within 2 hours.
                    </p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="mt-8 rounded-full bg-[#ed1238] px-8 py-3 text-sm font-bold text-white transition-all hover:bg-[#ff3b56]"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block font-mono text-xs text-paper/70 uppercase tracking-wider mb-2">
                        Select Service
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {servicesOptions.slice(0, 4).map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => setSelectedService(s)}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                              selectedService === s
                                ? "bg-[#ed1238] text-white"
                                : "bg-white/5 text-paper/70 border border-white/10 hover:border-white/30"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-paper/70 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-paper placeholder-white/30 focus:border-[#ed1238] focus:outline-none focus:ring-1 focus:ring-[#ed1238]"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-xs text-paper/70 uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-paper placeholder-white/30 focus:border-[#ed1238] focus:outline-none focus:ring-1 focus:ring-[#ed1238]"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-xs text-paper/70 uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-paper placeholder-white/30 focus:border-[#ed1238] focus:outline-none focus:ring-1 focus:ring-[#ed1238]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-paper/70 uppercase tracking-wider mb-1.5">
                        Tell us about your project
                      </label>
                      <textarea
                        rows={3}
                        placeholder="What are your main goals and timeline?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-paper placeholder-white/30 focus:border-[#ed1238] focus:outline-none focus:ring-1 focus:ring-[#ed1238]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 w-full rounded-full bg-[#ed1238] py-4 text-sm font-bold tracking-wide text-white shadow-[0_0_30px_rgba(237,18,56,0.4)] transition-all hover:bg-[#ff3b56] hover:shadow-[0_0_40px_rgba(237,18,56,0.6)]"
                    >
                      Book Consultation Now →
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
