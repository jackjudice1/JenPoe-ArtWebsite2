import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 font-display text-4xl">Privacy Policy</h1>
      <p className="mt-6 text-sm leading-relaxed text-ink/70">
        This is placeholder copy. Replace it with your actual privacy policy before launch —
        cover what data you collect (checkout details, newsletter emails, analytics), how it's
        stored, which third parties process it (payment processor, shipping carrier, email
        provider), and how customers can request deletion. A generator like Termly or a lawyer
        familiar with e-commerce can help you get this right for {siteConfig.brand.name}.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-ink/70">
        Questions in the meantime? Email {siteConfig.business.email}.
      </p>
    </div>
  );
}
