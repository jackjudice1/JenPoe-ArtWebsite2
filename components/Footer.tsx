import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <p className="font-display text-2xl">{siteConfig.brand.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/65">
              {siteConfig.brand.description}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:border-gold hover:text-gold"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href={siteConfig.social.pinterest}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:border-gold hover:text-gold"
                aria-label="Pinterest"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M9 17c1-3 1.4-5 2.2-8.2A2.5 2.5 0 1 1 15.8 10c-.3 1.6-1 3-2.6 3-1.3 0-2-1-1.7-2.4" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </a>
              <a
                href={siteConfig.social.tiktok}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:border-gold hover:text-gold"
                aria-label="TikTok"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M14 4v9.5a3.2 3.2 0 1 1-2.4-3.1M14 4c.4 2 1.9 3.4 4 3.6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow text-gold-soft">Shop</p>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.footerLinks.shop.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ivory/70 hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-gold-soft">Studio</p>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.footerLinks.studio.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ivory/70 hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-gold-soft">Policies</p>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.footerLinks.policies.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ivory/70 hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.</p>
          <p>{siteConfig.business.address} · {siteConfig.business.email}</p>
        </div>
      </div>
    </footer>
  );
}
