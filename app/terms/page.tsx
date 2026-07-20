import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 font-display text-4xl">Terms of Service</h1>
      <p className="mt-6 text-sm leading-relaxed text-ink/70">
        This is placeholder copy. Replace it with real terms before launch — cover order
        acceptance, pricing and payment, shipping and risk of loss, returns and cancellations
        (including that custom mahjong mats are final sale), intellectual property in the
        artwork, and limitation of liability. Have a lawyer review the final version for{" "}
        {siteConfig.brand.name}.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-ink/70">
        Questions in the meantime? Email {siteConfig.business.email}.
      </p>
    </div>
  );
}
