import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing use of technostripe.com and Technostripe Solutions' Shopify Plus, performance marketing, SEO, and CRO services.",
  alternates: {
    canonical: "https://technostripe.com/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "services", title: "2. Services & Engagements" },
  { id: "website-use", title: "3. Acceptable Use of This Website" },
  { id: "fees-payment", title: "4. Fees & Payment" },
  { id: "intellectual-property", title: "5. Intellectual Property" },
  { id: "confidentiality", title: "6. Confidentiality" },
  { id: "liability", title: "7. Disclaimers & Limitation of Liability" },
  { id: "termination", title: "8. Termination" },
  { id: "governing-law", title: "9. Governing Law" },
  { id: "changes", title: "10. Changes to These Terms" },
  { id: "contact", title: "11. Contact" },
];

export default function TermsPage() {
  const lastUpdated = "March 11, 2026";

  return (
    <>
      <Navbar />

      <main id="main-content" className="relative min-h-screen bg-[#0a0b0a] text-[#f4f4f4] pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden selection:bg-[#ed1238] selection:text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-[420px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(237,18,56,0.4) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        <header className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 text-center pb-12 sm:pb-16 border-b border-white/10">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="inline-flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest">
              <li>
                <Link href="/" className="hover:text-[#ed1238] transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-white/80">Terms of Service</li>
            </ol>
          </nav>

          <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#ed1238] px-3.5 py-1 rounded-full border border-[#ed1238]/30 bg-[#ed1238]/10 mb-4">
            <span className="size-1.5 rounded-full bg-[#ed1238] animate-pulse" />
            Legal & Compliance
          </span>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mt-2 leading-[1.08]">
            Terms of Service
          </h1>

          <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
            These terms govern your use of technostripe.com and any Shopify Plus development, performance marketing, SEO, or CRO services you engage Technostripe Solutions for.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-white/40 bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full">
            <span>Last Updated:</span>
            <span className="text-white/80 font-medium">{lastUpdated}</span>
          </div>
        </header>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
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
                  <p className="text-[11px] text-white/40 mb-2 font-mono">Questions about these terms?</p>
                  <a
                    href="mailto:growth@technostripe.com"
                    className="inline-flex items-center gap-1.5 text-xs text-[#ed1238] hover:underline font-semibold"
                  >
                    <span>growth@technostripe.com</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3">
                      <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </aside>

            <article className="lg:col-span-8 space-y-10 sm:space-y-12 leading-relaxed text-sm sm:text-base text-white/75">
              <section id="acceptance" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">01</span>
                  Acceptance of Terms
                </h2>
                <p>
                  By accessing{" "}
                  <Link href="/" className="text-[#ed1238] hover:underline">
                    technostripe.com
                  </Link>{" "}
                  or engaging Technostripe Solutions (&quot;Technostripe&quot;, &quot;we&quot;, &quot;us&quot;) for Shopify Plus development, performance marketing, SEO, CRO, or related services, you agree to be bound by these Terms of Service. If you do not agree, please do not use this website or our services.
                </p>
              </section>

              <section id="services" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">02</span>
                  Services & Engagements
                </h2>
                <p>
                  The specific scope, deliverables, timeline, and fees for any paid engagement are defined in a separate proposal, statement of work, or contract agreed between Technostripe and the client. These Terms apply generally to the website and to any engagement not otherwise covered by a signed agreement.
                </p>
              </section>

              <section id="website-use" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">03</span>
                  Acceptable Use of This Website
                </h2>
                <p>
                  You agree not to misuse this website, including attempting unauthorized access to our systems, scraping content for republication without permission, or submitting false or malicious information through our contact forms.
                </p>
              </section>

              <section id="fees-payment" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">04</span>
                  Fees & Payment
                </h2>
                <p>
                  Fees, payment schedules, and currency for paid services are set out in the applicable proposal or contract. Late payments may result in a pause of active work until the account is brought current.
                </p>
              </section>

              <section id="intellectual-property" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">05</span>
                  Intellectual Property
                </h2>
                <p>
                  All content on this website — including copy, design, graphics, and case study material — is owned by Technostripe Solutions or its licensors and may not be reproduced without permission. Upon full payment, deliverables created specifically for a client under a signed agreement transfer to that client as described in the applicable contract.
                </p>
              </section>

              <section id="confidentiality" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">06</span>
                  Confidentiality
                </h2>
                <p>
                  Information shared with us about your store, revenue, or advertising performance is treated as confidential and used solely to deliver the requested services. See our{" "}
                  <Link href="/privacy-policy" className="text-[#ed1238] hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  for how we handle personal data.
                </p>
              </section>

              <section id="liability" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">07</span>
                  Disclaimers & Limitation of Liability
                </h2>
                <p>
                  This website and any free audits, teardowns, or strategy calls are provided &quot;as is&quot; for informational purposes. Growth, revenue, and ROAS figures shown in case studies reflect specific past client results and are not guarantees of future performance. To the maximum extent permitted by law, Technostripe is not liable for indirect, incidental, or consequential damages arising from use of this website.
                </p>
              </section>

              <section id="termination" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">08</span>
                  Termination
                </h2>
                <p>
                  Either party may terminate an active engagement as described in the applicable signed contract. We reserve the right to suspend access to this website for any use that violates these Terms.
                </p>
              </section>

              <section id="governing-law" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">09</span>
                  Governing Law
                </h2>
                <p>
                  These Terms are governed by the laws of India, without regard to conflict-of-law principles, unless a signed client contract specifies otherwise.
                </p>
              </section>

              <section id="changes" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">10</span>
                  Changes to These Terms
                </h2>
                <p>
                  We may update these Terms from time to time. The &quot;Last Updated&quot; date above reflects the latest revision. Continued use of the website after changes constitutes acceptance of the updated Terms.
                </p>
              </section>

              <section id="contact" className="scroll-mt-32 space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-[#ed1238] font-mono text-sm font-semibold">11</span>
                  Contact
                </h2>
                <p>
                  Questions about these Terms of Service can be sent to:
                </p>
                <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.05] via-[#141514] to-[#0d0e0d] p-6 sm:p-8 space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">Technostripe Solutions</h3>
                    <p className="text-xs text-white/50 font-mono">Shopify Plus Agency & Digital Growth Partner</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
                    <div>
                      <p className="font-mono text-white/40 uppercase tracking-wider text-[11px] mb-1">Email Inquiries</p>
                      <a href="mailto:growth@technostripe.com" className="text-white hover:text-[#ed1238] transition-colors font-medium">
                        growth@technostripe.com
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
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>

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
