"use client";

const tags = [
  "AI AUTOMATION",
  "NEXT.JS",
  "FLUTTERFLOW",
  "GOOGLE ADS",
  "META ADS",
  "SEO",
  "HUBSPOT",
  "TAILWIND CSS",
  "SHOPIFY PLUS",
  "CRO & SPEED",
];

export default function TechTicker() {
  return (
    <div className="relative z-20 w-full overflow-hidden border-y border-white/10 bg-black/40 py-3 backdrop-blur-sm">
      <div className="flex w-max gap-8 animate-[marquee_26s_linear_infinite]">
        {[...tags, ...tags, ...tags, ...tags].map((tag, idx) => (
          <div
            key={idx}
            className="flex items-center gap-8 font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-white/70 uppercase"
          >
            <span className="text-[#ed1238] text-xs">✦</span>
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

