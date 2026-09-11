import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Technostripe Solutions — Shopify Plus & D2C Growth Agency",
  description:
    "Learn how Technostripe Solutions collects, uses, protects, and handles your personal information, store analytics, and consulting data in compliance with global privacy standards.",
  alternates: {
    canonical: "https://www.technostripe.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Technostripe Solutions",
    description:
      "Our commitment to your privacy, data security, and confidentiality across all e-commerce consulting, Shopify development, and growth marketing services.",
    url: "https://www.technostripe.com/privacy-policy",
    siteName: "Technostripe Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Technostripe Solutions",
    description:
      "Read Technostripe Solutions' privacy policy and data security practices for e-commerce brands.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const sections = [
  { id: "overview", title: "1. Overview & Scope" },
  { id: "information-we-collect", title: "2. Information We Collect" },
  { id: "how-we-use-information", title: "3. How We Use Information" },
  { id: "client-data-security", title: "4. Client Store & API Data Security" },
  { id: "third-party-services", title: "5. Third-Party Integrations" },
  { id: "cookies-tracking", title: "6. Cookies & Tracking Technologies" },
  { id: "data-retention", title: "7. Data Retention & Transfers" },
  { id: "your-rights", title: "8. Your Privacy Rights (GDPR & CCPA)" },
  { id: "policy-updates", title: "9. Policy Updates" },
  { id: "contact-us", title: "10. Contact & Privacy Officer" },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = "March 11, 2026";

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-[#0a0b0a] text-[#f4f4f4] pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden selection:bg-[#ed1238] selection:text-white">
        {/* Ambient Top Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-[420px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(237,18,56,0.4) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        {/* ── Page Header ─────────────────────────────────── */}
        <header className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 text-center pb-12 sm:pb-16 border-b border-white/10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="inline-flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest">
              <li>
                <Link href="/" className="hover:text-[#ed1238] transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-white/80">Privacy Policy</li>
            </ol>
          </nav>

          <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#ed1238] px-3.5 py-1 rounded-full border border-[#ed1238]/30 bg-[#ed1238]/10 mb-4">
            <span className="size-1.5 rounded-full bg-[#ed1238] animate-pulse" />
            Legal & Compliance
          </span>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mt-2 leading-[1.08]">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
            At Technostripe Solutions, we treat your store data, customer insights, and personal information with utmost confidentiality, bank-grade security, and complete transparency.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-white/40 bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full">
            <span>Last Updated:</span>
            <span className="text-white/80 font-medium">{lastUpdated}</span>
          </div>
        </header>

        {/* ── Main Layout: Sidebar TOC + Content ─────────── */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Column: Sticky Table of Contents (Desktop) */}
            <aside className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-32 rounded-3xl border border-white/10 bg-[#121312]/80 backdrop-blur-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#ed1238] mb-4 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                    <path d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Table of Contents
                </p>
                <nav className="space-y-1.5 text-xs font-mono">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block py-1.5 px-3 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.05] transition-all"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-[11px] text-white/40 mb-2 font-mono">Need privacy assistance?</p>
                  <a
                    href="mailto:Growth@technostripe.com"
                    className="inline-flex items-center gap-1.5 text-xs text-[#ed1238] hover:underline font-semibold"
                  >
                    <span>Growth@technostripe.com</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3">
                      <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Column: Detailed Policy Sections */}
            <article className="lg:col-span-8 space-y-10 sm:space-y-12 leading-relaxed text-sm sm:text-base text-white/75">
              
              {/* Highlight Box: Security Commitment */}
              <div className="rounded-2xl border border-[#ed1238]/40 bg-gradient-to-r from-[#ed1238]/15 via-transparent to-transparent p-6 sm:p-7 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="size-10 shrink-0 rounded-xl bg-[#ed1238]/20 border border-[#ed1238]/40 flex items-center justify-center text-[#ed1238]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-white text-base sm:text-lg">
                      Our Privacy Pledge to Brands & Clients
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-white/70 leading-relaxed">
                      We never sell, rent, or monetize your store data, ad accounts, or customer analytics. All client credentials, strategy audits, and creative roadmaps remain strictly protected under non-disclosure confidentiality.
                    </p>
                  </div>
                </div>
              </div>

              {/* 1. Overview & Scope */}
              <section id="overview" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">01</span>
                  Overview & Scope
                </h2>
                <p>
                  This Privacy Policy outlines how <strong>Technostripe Solutions</strong> (&quot;Technostripe&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, processes, stores, and protects personal data and business analytics gathered through our website (
                  <Link href="/" className="text-[#ed1238] hover:underline">
                    technostripe.com
                  </Link>
                  ), discovery audits, consultation forms, and contracted e-commerce services.
                </p>
                <p>
                  By accessing our website or engaging with our Shopify Plus development, Meta/Google performance marketing, SEO, or CRO consulting services, you acknowledge the terms described in this Privacy Policy.
                </p>
              </section>

              {/* 2. Information We Collect */}
              <section id="information-we-collect" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">02</span>
                  Information We Collect
                </h2>
                <p>
                  Depending on how you interact with Technostripe Solutions, we may collect the following categories of information:
                </p>
                <div className="space-y-3 pt-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <h3 className="font-semibold text-white text-sm mb-1">A. Information You Provide Directly</h3>
                    <p className="text-xs sm:text-sm text-white/65">
                      Full name, business email address, phone number, brand name, store URL, monthly revenue range, advertising budget, and specific growth challenges submitted via our contact & audit booking forms.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <h3 className="font-semibold text-white text-sm mb-1">B. Client Onboarding & Collaboration Data</h3>
                    <p className="text-xs sm:text-sm text-white/65">
                      Partner account collaborator access (Shopify Partner collaborator codes, Google Analytics 4, Meta Business Manager, Klaviyo), brand design assets, product catalogs, and conversion event logs provided for development or growth services.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <h3 className="font-semibold text-white text-sm mb-1">C. Technical & Usage Information</h3>
                    <p className="text-xs sm:text-sm text-white/65">
                      IP address, device type, operating system, browser specifications, page view sequences, referral sources, and interaction timestamps captured automatically through analytics cookies.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. How We Use Information */}
              <section id="how-we-use-information" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">03</span>
                  How We Use Your Information
                </h2>
                <p>We use the data we collect solely for lawful, legitimate business purposes:</p>
                <ul className="space-y-2.5 list-none pl-0">
                  {[
                    "To prepare and deliver complimentary 45-minute growth strategy teardowns and website speed audits.",
                    "To build, customize, test, and optimize Shopify Plus themes, custom apps, and checkout flows.",
                    "To plan, execute, and scale ad campaigns across Meta Ads, Google Ads, and TikTok Ads.",
                    "To communicate project milestones, roadmap updates, and weekly performance reports.",
                    "To ensure website security, prevent malicious traffic, and diagnose infrastructure bugs.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="size-1.5 rounded-full bg-[#ed1238] mt-2.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 4. Client Store & API Data Security */}
              <section id="client-data-security" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">04</span>
                  Client Store & API Data Security
                </h2>
                <p>
                  Security is integral to how Technostripe operates. As an e-commerce partner, we adhere to stringent data isolation protocols:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <span className="text-xs font-mono text-[#ed1238] uppercase font-bold">Least Privilege</span>
                    <h3 className="text-sm font-bold text-white mt-1">Granular Partner Access</h3>
                    <p className="text-xs text-white/60 mt-1">
                      We only request collaborator permissions essential to development and marketing roles. No master passwords required.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <span className="text-xs font-mono text-[#ed1238] uppercase font-bold">Confidentiality</span>
                    <h3 className="text-sm font-bold text-white mt-1">Strict NDAs</h3>
                    <p className="text-xs text-white/60 mt-1">
                      All proprietary store figures, conversion metrics, and creative formulas are shielded by reciprocal non-disclosure terms.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. Third-Party Integrations */}
              <section id="third-party-services" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">05</span>
                  Third-Party Integrations
                </h2>
                <p>
                  To deliver seamless e-commerce performance and analytics, we interact with trusted third-party infrastructure providers that maintain industry-leading compliance:
                </p>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-[#ed1238] mt-2.5 shrink-0" />
                    <span><strong>Shopify & Shopify Plus:</strong> Store management, theme deployment, and API integration.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-[#ed1238] mt-2.5 shrink-0" />
                    <span><strong>Google Analytics 4 & Tag Manager:</strong> Website traffic analytics and telemetry.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-[#ed1238] mt-2.5 shrink-0" />
                    <span><strong>Meta Business Manager & Google Ads:</strong> Campaign attribution and advertising management.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-[#ed1238] mt-2.5 shrink-0" />
                    <span><strong>Vercel & AWS:</strong> High-performance edge hosting and serverless application infrastructure.</span>
                  </li>
                </ul>
              </section>

              {/* 6. Cookies & Tracking Technologies */}
              <section id="cookies-tracking" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">06</span>
                  Cookies & Tracking Technologies
                </h2>
                <p>
                  Our website uses cookies and lightweight tracking pixels to enhance your browsing experience, remember preferences, and analyze aggregate visitor trends.
                </p>
                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03] font-mono text-white/80">
                        <th className="p-3.5 sm:p-4">Cookie Type</th>
                        <th className="p-3.5 sm:p-4">Purpose</th>
                        <th className="p-3.5 sm:p-4">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white/70">
                      <tr>
                        <td className="p-3.5 sm:p-4 font-semibold text-white">Essential</td>
                        <td className="p-3.5 sm:p-4">Required for core site navigation, form security, and dark mode rendering.</td>
                        <td className="p-3.5 sm:p-4 font-mono">Session</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-semibold text-white">Performance & Analytics</td>
                        <td className="p-3.5 sm:p-4">Helps us evaluate page load times and user engagement via anonymous metrics.</td>
                        <td className="p-3.5 sm:p-4 font-mono">Up to 24 Months</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-semibold text-white">Marketing & Attribution</td>
                        <td className="p-3.5 sm:p-4">Measures efficacy of our outreach campaigns and case study reads.</td>
                        <td className="p-3.5 sm:p-4 font-mono">Up to 90 Days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-white/50">
                  You can control or disable cookies at any time via your browser settings.
                </p>
              </section>

              {/* 7. Data Retention & Transfers */}
              <section id="data-retention" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">07</span>
                  Data Retention & International Transfers
                </h2>
                <p>
                  We retain personal details and consultation records only for as long as necessary to fulfill the purposes described in this policy, provide client services, or satisfy legal and accounting requirements.
                </p>
                <p>
                  Because Technostripe Solutions serves DTC brands globally across India, the United Kingdom, the United States, and Europe, data may be transferred and processed securely on encrypted cloud servers worldwide under standard contractual clauses (SCCs).
                </p>
              </section>

              {/* 8. Your Rights & Choices */}
              <section id="your-rights" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">08</span>
                  Your Privacy Rights (GDPR, UK GDPR & CCPA)
                </h2>
                <p>
                  Depending on your geographic jurisdiction, you hold specific legal rights regarding your personal information:
                </p>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-[#ed1238] mt-2.5 shrink-0" />
                    <span><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-[#ed1238] mt-2.5 shrink-0" />
                    <span><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete records.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-[#ed1238] mt-2.5 shrink-0" />
                    <span><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request immediate deletion of your contact records and audit history.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-[#ed1238] mt-2.5 shrink-0" />
                    <span><strong>Right to Opt-Out:</strong> Unsubscribe from marketing newsletters and strategy reports at any time.</span>
                  </li>
                </ul>
              </section>

              {/* 9. Policy Updates */}
              <section id="policy-updates" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">09</span>
                  Policy Updates
                </h2>
                <p>
                  We may periodically revise this Privacy Policy to reflect modifications in our services, regulatory requirements, or technology stack. The updated date at the top of this document will always indicate the latest revision. We encourage you to review this page periodically.
                </p>
              </section>

              {/* 10. Contact Us & DPO */}
              <section id="contact-us" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">10</span>
                  Contact & Data Protection Officer
                </h2>
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or wish to exercise your data rights, please reach out directly:
                </p>
                <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.05] via-[#141514] to-[#0d0e0d] p-6 sm:p-8 space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">Technostripe Solutions</h3>
                    <p className="text-xs text-white/50 font-mono">Shopify Plus Agency & Digital Growth Partner</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
                    <div>
                      <p className="font-mono text-white/40 uppercase tracking-wider text-[11px] mb-1">Email Inquiries</p>
                      <a href="mailto:Growth@technostripe.com" className="text-white hover:text-[#ed1238] transition-colors font-medium">
                        Growth@technostripe.com
                      </a>
                    </div>
                    <div>
                      <p className="font-mono text-white/40 uppercase tracking-wider text-[11px] mb-1">Phone</p>
                      <a href="tel:+919714734563" className="text-white hover:text-[#ed1238] transition-colors font-medium">
                        +91 9714734563
                      </a>
                    </div>
                    <div>
                      <p className="font-mono text-white/40 uppercase tracking-wider text-[11px] mb-1">Location</p>
                      <p className="text-white/80">Ahmedabad, Gujarat, India</p>
                    </div>
                    <div>
                      <p className="font-mono text-white/40 uppercase tracking-wider text-[11px] mb-1">Response Window</p>
                      <p className="text-white/80">Within 24-48 Business Hours</p>
                    </div>
                  </div>
                </div>
              </section>

            </article>
          </div>
        </div>

        {/* ── Bottom Quick Action ───────────────────────────── */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 mt-20 pt-10 border-t border-white/10 text-center">
          <p className="text-sm text-white/60 mb-4">
            Have a project in mind or want to discuss a growth roadmap?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#ed1238] px-6 py-3 text-xs font-bold font-mono tracking-wider uppercase text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_25px_rgba(237,18,56,0.6)] cursor-pointer"
            >
              Book a Strategy Call
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-3.5">
                <path d="M7 7h10v10" /><path d="M7 17 17 7" />
              </svg>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs font-bold font-mono tracking-wider uppercase text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white cursor-pointer"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
