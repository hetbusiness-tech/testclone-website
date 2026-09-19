import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  brandName: string;
  email: string;
  phone?: string;
  websiteUrl: string;
  challenges?: string;
  services: string[];
  revenueRange: string;
  /** Honeypot field — real visitors never fill this in. */
  company?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const p = body as Record<string, unknown>;
  return (
    typeof p.name === "string" &&
    p.name.trim().length > 0 &&
    typeof p.brandName === "string" &&
    p.brandName.trim().length > 0 &&
    typeof p.email === "string" &&
    EMAIL_RE.test(p.email) &&
    typeof p.websiteUrl === "string" &&
    p.websiteUrl.trim().length > 0 &&
    Array.isArray(p.services) &&
    typeof p.revenueRange === "string"
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Please fill in all required fields with valid values." },
      { status: 400 }
    );
  }

  // Honeypot: silently accept but drop bot submissions.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const submission = {
    ...body,
    company: undefined,
    submittedAt: new Date().toISOString(),
  };

  // Edge/Workers-safe: no filesystem writes. Every submission is logged so it
  // is visible in platform logs (Vercel function logs / `wrangler tail`) even
  // before a downstream destination is wired up.
  console.log("[contact-form] submission", JSON.stringify(submission));

  const sheetWebhookUrl = process.env.CONTACT_SHEET_WEBHOOK_URL;
  if (sheetWebhookUrl) {
    try {
      const res = await fetch(sheetWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
      if (!res.ok) {
        console.error("[contact-form] sheet webhook responded with", res.status);
        return NextResponse.json(
          { error: "We couldn't save your inquiry. Please try again or email us directly." },
          { status: 502 }
        );
      }
    } catch (error) {
      console.error("[contact-form] sheet webhook failed", error);
      return NextResponse.json(
        { error: "We couldn't save your inquiry. Please try again or email us directly." },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({ ok: true });
}
