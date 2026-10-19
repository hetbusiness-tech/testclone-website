import type { Metadata } from "next";
import type { ReactNode } from "react";

const SITE_URL = "https://technostripe.com";

export const metadata: Metadata = {
  title: "Thank You | Technostripe Solutions",
  description:
    "Thank you for reaching out to Technostripe Solutions. Our team will review your inquiry and get back to you within 24 hours.",
  alternates: {
    canonical: `${SITE_URL}/thank-you`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
