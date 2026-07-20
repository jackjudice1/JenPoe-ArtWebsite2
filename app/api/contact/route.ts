import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/data/site-config";

const resend = new Resend(process.env.RESEND_API_KEY);

// Resend requires a verified sending domain to email arbitrary recipients;
// until one is verified, "onboarding@resend.dev" only delivers to the
// Resend account's own email.
const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS || "onboarding@resend.dev";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    /^\S+@\S+\.\S+$/.test(b.email) &&
    typeof b.subject === "string" &&
    b.subject.trim().length > 0 &&
    typeof b.message === "string" &&
    b.message.trim().length >= 10
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const { name, email, phone, subject, message } = body;

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: siteConfig.business.email,
      replyTo: email,
      subject: `New contact form message: ${subject}`,
      text: `From: ${name} <${email}>\nPhone: ${phone || "—"}\n\n${message}`,
    });
  } catch (error) {
    console.error("Contact form notification email failed:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  // Auto-reply is best-effort: without a verified sending domain in Resend,
  // it can only deliver to the Resend account's own email, so it will fail
  // for real visitors until a domain is verified. Don't fail the request
  // over it — the notification above already reached the studio.
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: `We received your message — ${siteConfig.brand.name}`,
      text: `Hi ${name},\n\nThanks for reaching out to ${siteConfig.brand.name}. ${siteConfig.business.responseTime}\n\nFor reference, here's what you sent us:\n"${message}"\n\n— ${siteConfig.brand.name}`,
    });
  } catch (error) {
    console.error("Contact form auto-reply email failed:", error);
  }

  return NextResponse.json({ ok: true });
}
