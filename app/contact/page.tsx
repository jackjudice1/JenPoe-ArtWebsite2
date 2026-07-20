import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import faqs from "@/data/faqs.json";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Lacquer & Ivory studio.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <div className="max-w-xl">
        <p className="eyebrow">Get in touch</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
          Questions, custom orders, wholesale — we read everything.
        </h1>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_1fr]">
        <ContactForm />

        <div className="space-y-8">
          <div className="rounded-tile border border-ink/10 bg-parchment p-6">
            <h2 className="font-display text-lg">Studio details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink/50">Email</dt>
                <dd>{siteConfig.business.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/50">Phone</dt>
                <dd>{siteConfig.business.phone}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/50">Studio</dt>
                <dd>{siteConfig.business.address}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-ink/55">{siteConfig.business.responseTime}</p>
            <div className="mt-4 flex gap-3">
              <a href={siteConfig.social.instagram} className="text-xs font-semibold text-lacquer hover:underline">
                Instagram
              </a>
              <a href={siteConfig.social.pinterest} className="text-xs font-semibold text-lacquer hover:underline">
                Pinterest
              </a>
              <a href={siteConfig.social.tiktok} className="text-xs font-semibold text-lacquer hover:underline">
                TikTok
              </a>
            </div>
          </div>

          <div
            className="flex aspect-[4/3] items-center justify-center rounded-tile border border-dashed border-ink/20 bg-ivory text-center text-xs text-ink/40"
            aria-label="Map placeholder"
          >
            Map embed goes here
            <br />
            (swap in Google Maps or Mapbox embed)
          </div>
        </div>
      </div>

      <div id="faq" className="mt-20 max-w-2xl">
        <p className="eyebrow">FAQ</p>
        <h2 className="mt-3 font-display text-3xl leading-tight">Shipping, returns, and customs</h2>
        <div className="mt-8">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </div>
  );
}
