export interface CaseStudy {
  slug: string;                 // e.g. "chunks", "rihaa", "car-scratch-remover"
  projectName: string;
  category: string;             // e.g. "E-commerce Store Development" | "Performance Marketing"
  description: string;
  coverImage: string;           // path placeholder, e.g. "/case-studies/chunks/cover.png"
  mobileImage?: string;         // optional secondary mockup image
  designTools?: string;         // e.g. "Figma", "Adobe"
  backend?: string;             // e.g. "Shopify Admin"
  programmingLanguage?: string; // e.g. "Liquid Template files"
  projectLink?: string;         // external live site URL
  metrics?: {
    label: string;              // e.g. "Ad Spend", "Revenue", "ROAS", "Total Purchase", "Lead Cost"
    value: string;              // e.g. "INR 81,029", "6.53"
  }[];
  gallery?: string[];           // optional extra image placeholders
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  // ── [EXAMPLE 1: E-commerce Store Development] ──────────────────────────
  {
    slug: "luxeaura",
    projectName: "LuxeAura Fashion",
    category: "E-commerce Store Development",
    description:
      "[EXAMPLE] Engineered a high-speed Shopify Plus experience with bespoke one-click checkout, dynamic bundle builder, and mobile CRO that increased store revenue by 310%.",
    coverImage: "/case-studies/luxeaura/cover.png",
    mobileImage: "/case-studies/luxeaura/mobile.png",
    designTools: "Figma, Adobe Photoshop",
    backend: "Shopify Plus Admin",
    programmingLanguage: "Liquid, Tailwind CSS, TypeScript",
    projectLink: "https://example.com/luxeaura",
    metrics: [
      { label: "Revenue Growth", value: "+310%" },
      { label: "Conversion Rate", value: "4.8%" },
      { label: "Mobile Speed Score", value: "99/100" },
      { label: "Average Order Value", value: "₹3,450" },
    ],
    gallery: [
      "/case-studies/luxeaura/gallery-1.png",
      "/case-studies/luxeaura/gallery-2.png",
    ],
    featured: true,
  },

  // ── [EXAMPLE 2: Performance Marketing Campaign] ─────────────────────────
  {
    slug: "glowbotanics",
    projectName: "GlowBotanics Skincare",
    category: "Performance Marketing",
    description:
      "[EXAMPLE] Deployed high-converting UGC creative pipelines and multi-channel Meta & Google shopping funnels that generated $4.2M in revenue at a 4.6x blended ROAS.",
    coverImage: "/case-studies/glowbotanics/cover.png",
    mobileImage: "/case-studies/glowbotanics/mobile.png",
    designTools: "CapCut, Adobe Premiere Pro, Figma",
    backend: "Meta Ads Manager, Google Ads",
    projectLink: "https://example.com/glowbotanics",
    metrics: [
      { label: "Ad Spend", value: "₹65,40,000" },
      { label: "Generated Revenue", value: "₹3,02,00,000" },
      { label: "Blended ROAS", value: "4.62x" },
      { label: "CAC Reduction", value: "-42%" },
    ],
    gallery: [
      "/case-studies/glowbotanics/gallery-1.png",
      "/case-studies/glowbotanics/gallery-2.png",
    ],
    featured: false,
  },

  // ── [EXAMPLE 3: Creative & Brand CRO] ──────────────────────────────────
  {
    slug: "aura-jewelry",
    projectName: "Aura Jewelry DTC",
    category: "E-commerce Store Development",
    description:
      "[EXAMPLE] Crafted founder-led video storytelling, interactive 3D product visualizers, and seamless cart upsells that lifted average order value by $68.",
    coverImage: "/case-studies/aura-jewelry/cover.png",
    mobileImage: "/case-studies/aura-jewelry/mobile.png",
    designTools: "Figma, Blender 3D",
    backend: "Shopify Admin",
    programmingLanguage: "Liquid, React, Three.js",
    projectLink: "https://example.com/aura-jewelry",
    metrics: [
      { label: "AOV Lift", value: "+48%" },
      { label: "Checkout CVR", value: "5.2%" },
      { label: "Return Customer Rate", value: "34%" },
    ],
    gallery: [
      "/case-studies/aura-jewelry/gallery-1.png",
    ],
    featured: false,
  },

  // ── [EXAMPLE 4: Subscriptions & Retention] ─────────────────────────────
  {
    slug: "vitalis-wellness",
    projectName: "Vitalis Wellness DTC",
    category: "Subscriptions & Retention",
    description:
      "[EXAMPLE] Integrated automated Recharge subscription flows, seamless customer portals, and SMS lifecycle campaigns delivering consistent compounding revenue with 18k+ subscribers.",
    coverImage: "/case-studies/vitalis-wellness/cover.png",
    mobileImage: "/case-studies/vitalis-wellness/mobile.png",
    designTools: "Figma",
    backend: "Recharge, Klaviyo, Shopify",
    programmingLanguage: "Liquid, JavaScript",
    projectLink: "https://example.com/vitalis-wellness",
    metrics: [
      { label: "Monthly Subscribers", value: "18,400+" },
      { label: "Retention Rate (90-Day)", value: "68%" },
      { label: "MRR Growth", value: "+185%" },
    ],
    featured: false,
  },
];

/* ─── Helper Functions ────────────────────────────────── */

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((item) => item.slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return [...caseStudies];
}
