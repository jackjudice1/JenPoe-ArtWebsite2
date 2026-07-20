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
                href={siteConfig.social.facebook}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:border-gold hover:text-gold"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M14 21v-7h2.5l.5-3H14V9c0-.9.3-1.5 1.7-1.5H17V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H8v3h2.5v7h3.5Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
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
