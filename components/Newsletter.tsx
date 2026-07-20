"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site-config";
import AnimatedReveal from "./AnimatedReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    // Placeholder — wire this up to your email provider (Klaviyo, Mailchimp, etc).
    setStatus("submitted");
  }

  return (
    <section className="bg-jade-deep">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <AnimatedReveal className="mx-auto max-w-xl text-center text-ivory">
          <h2 className="font-display text-3xl sm:text-4xl">{siteConfig.newsletter.heading}</h2>
          <p className="mt-3 text-sm text-ivory/75">{siteConfig.newsletter.body}</p>

          {status === "submitted" ? (
            <p className="mt-6 font-body text-sm font-semibold text-gold-soft">
              You&apos;re on the list — thanks for joining.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="you@email.com"
                className="w-full rounded-full border border-ivory/25 bg-ivory/10 px-5 py-3 text-sm text-ivory placeholder:text-ivory/50 outline-none focus:border-gold"
              />
              <button type="submit" className="btn-primary shrink-0">
                Sign up
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-2 text-xs text-gold-soft">Enter a valid email address to sign up.</p>
          )}
        </AnimatedReveal>
      </div>
    </section>
  );
}
