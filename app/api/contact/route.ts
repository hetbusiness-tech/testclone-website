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
  const isOnlyShopify =
    Array.isArray(p.services) &&
    p.services.length > 0 &&
    p.services.every((s) => s === "Shopify Development & Redesign");
  const websiteValid = isOnlyShopify
    ? typeof p.websiteUrl === "string"
    : typeof p.websiteUrl === "string" && p.websiteUrl.trim().length > 0;

  return (
    typeof p.name === "string" &&
    p.name.trim().length > 0 &&
    typeof p.brandName === "string" &&
    p.brandName.trim().length > 0 &&
    typeof p.email === "string" &&
    EMAIL_RE.test(p.email) &&
    websiteValid &&
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

  const payload = {
    name: body.name,
    brandName: body.brandName,
    email: body.email,
    phone: body.phone ?? "",
    websiteUrl: body.websiteUrl,
    services: body.services,
    revenueRange: body.revenueRange,
    challenges: body.challenges ?? "",
  };

  // Keep console.log of the submission as a fallback
  console.log("[contact-form] submission", JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }));

  const sheetWebhookUrl = process.env.CONTACT_SHEET_WEBHOOK_URL;
  if (!sheetWebhookUrl) {
    console.error("[contact-form] Missing CONTACT_SHEET_WEBHOOK_URL environment variable.");
    return NextResponse.json(
      { error: "Service temporarily unavailable. Please try again later or email us directly." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(sheetWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!res.ok) {
      console.error("[contact-form] sheet webhook returned status", res.status);
      return NextResponse.json(
        { error: "Failed to submit your inquiry. Please try again or email us directly." },
        { status: 500 }
      );
    }

    const data = await res.json().catch(() => null);
    if (!data || data.ok !== true) {
      console.error("[contact-form] sheet webhook returned unexpected response", data);
      return NextResponse.json(
        { error: "Failed to submit your inquiry. Please try again or email us directly." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[contact-form] sheet webhook failed", error);
    return NextResponse.json(
      { error: "Failed to submit your inquiry. Please try again or email us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
