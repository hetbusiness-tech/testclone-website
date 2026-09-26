"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "919714734563";

const services = [
  "Shopify Development & Redesign",
  "Paid Ads (Meta & Google)",
  "E-commerce SEO Services",
  "Social Media & UGC Creative",
  "Brand Positioning & CRO",
  "Full-Stack E-commerce Scale",
];

const inputClass =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-[#ed1238]";
const labelClass =
  "block font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-paper/70 mb-1.5";

export default function WhatsAppLeadForm({
  context,
  preselectedService,
}: {
  context: string;
  preselectedService?: string;
}) {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService && services.includes(preselectedService)
      ? [preselectedService]
      : []
  );
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    email: "",
    phone: "",
    websiteUrl: "",
    challenges: "",
  });
  const [error, setError] = useState("");

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.trim() || !formData.brandName.trim() || !formData.email.trim() || !formData.websiteUrl.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");

    const lines = [
      `Hi, I'm ${formData.name.trim()} from ${formData.brandName.trim()}.`,
      `I'm interested in: ${(selectedServices.length ? selectedServices : [context]).join(", ")}.`,
      `Work email: ${formData.email.trim()}`,
      formData.phone.trim() && `Phone: ${formData.phone.trim()}`,
      `Store: ${formData.websiteUrl.trim()}`,
      formData.challenges.trim() && `Goals: ${formData.challenges.trim()}`,
    ].filter(Boolean);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 backdrop-blur-sm space-y-3.5"
    >
      <div className="flex items-center justify-end">
        <span className="rounded-full bg-[#d4f7dc] px-2.5 py-0.5 text-[0.62rem] font-mono font-semibold text-[#0d6b2f]">
          Avg response time - 15 minutes
        </span>
      </div>

      {/* Text inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="hero-name" className={labelClass}>
            Full Name *
          </label>
          <input
            id="hero-name"
            required
            type="text"
            autoComplete="name"
            placeholder="Oliver Smith"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="hero-brand" className={labelClass}>
            Brand Name *
          </label>
          <input
            id="hero-brand"
            required
            type="text"
            autoComplete="organization"
            placeholder="Hartley & Co"
            value={formData.brandName}
            onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="hero-email" className={labelClass}>
            Work Email *
          </label>
          <input
            id="hero-email"
            required
            type="email"
            autoComplete="email"
            placeholder="oliver@hartleyandco.co.uk"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="hero-phone" className={labelClass}>
            WhatsApp Number
          </label>
          <input
            id="hero-phone"
            type="tel"
            autoComplete="tel"
            pattern="^[0-9+\s()-]{7,}$"
            placeholder="+44 7700 900123"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="hero-website" className={labelClass}>
          Store Website URL *
        </label>
        <input
          id="hero-website"
          required
          type="text"
          autoComplete="url"
          placeholder="yourbrand.co.uk"
          value={formData.websiteUrl}
          onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
          className={inputClass}
        />
      </div>

      {/* Services selection */}
      <div role="group" aria-labelledby="hero-services-label">
        <p id="hero-services-label" className={labelClass}>
          Services You&apos;re Interested In
        </p>
        <div className="flex flex-wrap gap-1.5">
          {services.map((service) => {
            const isSelected = selectedServices.includes(service);
            return (
              <button
                key={service}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleService(service)}
                className={`rounded-full px-3 py-1.5 text-[0.7rem] font-semibold transition-all duration-200 cursor-pointer ${
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

      <div>
        <label htmlFor="hero-challenges" className={labelClass}>
          Current Challenges & Growth Goals
        </label>
        <textarea
          id="hero-challenges"
          rows={2}
          placeholder="What's holding your store back?"
          value={formData.challenges}
          onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && <p className="text-xs text-[#ff4d6d]">{error}</p>}

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ed1238] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_25px_rgba(237,18,56,0.5)]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        Send Message on WhatsApp
      </button>
    </form>
  );
}
