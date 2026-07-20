"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site-config";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Let us know what this is about.";
    if (form.message.trim().length < 10) next.message = "Add a little more detail (10+ characters).";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSendError("Something went wrong sending your message. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-tile border border-ink/10 bg-parchment p-8 text-center">
        <h3 className="font-display text-xl">Message sent</h3>
        <p className="mt-2 text-sm text-ink/65">{siteConfig.business.responseTime}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input"
            type="text"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input"
            type="email"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone (optional)">
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input"
            type="tel"
          />
        </Field>
        <Field label="Subject" error={errors.subject}>
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="input"
            type="text"
          />
        </Field>
      </div>

      <Field label="Message" error={errors.message}>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="input min-h-[140px] resize-y"
        />
      </Field>

      {sendError && <p className="text-xs text-lacquer-deep">{sendError}</p>}

      <button type="submit" className="btn-primary disabled:cursor-not-allowed disabled:opacity-60" disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </button>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(22, 33, 58, 0.15);
          background: transparent;
          padding: 0.65rem 1rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: #e8a0b4;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/60">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-lacquer">{error}</span>}
    </label>
  );
}
