// Every editable brand value lives here. Change copy, links, and business
// info in this one file — nothing below is hardcoded into page components.

export const siteConfig = {
  brand: {
    name: "Art by Jen Poe",
    shortName: "Jen Poe",
    tagline: "Original art and hand-finished mahjong mats, made to be lived with.",
    description:
      "Lacquer & Ivory is a small studio making premium art prints and custom mahjong mats — bold color, real materials, no two runs quite the same.",
  },
  business: {
    email: "hello@lacquerandivory.com",
    supportEmail: "support@lacquerandivory.com",
    phone: "+1 (504) 555-0148",
    address: "New Orleans, LA",
    responseTime: "We reply to every message within 1–2 business days.",
  },
  social: {
    instagram: "https://instagram.com/lacquerandivory",
    pinterest: "https://pinterest.com/lacquerandivory",
    tiktok: "https://tiktok.com/@lacquerandivory",
  },
  nav: [
    { label: "Shop All", href: "/shop" },
    { label: "Art Prints", href: "/art-prints" },
    { label: "Mahjong Mats", href: "/mahjong" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerLinks: {
    shop: [
      { label: "Art Prints", href: "/art-prints" },
      { label: "Mahjong Mats", href: "/mahjong" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Best Sellers", href: "/shop?sort=popularity" },
    ],
    studio: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/contact#faq" },
    ],
    policies: [
      { label: "Shipping & Returns", href: "/contact#faq" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  hero: {
    eyebrow: "New Orleans studio, worldwide shipping",
    headline: "Art for your walls. Tiles for your table.",
    body:
      "We paint in small batches and print even smaller ones — then take the same palette to the mahjong table with mats cut, bound, and stitched by hand.",
    primaryCta: { label: "Shop Art", href: "/art-prints" },
    secondaryCta: { label: "Shop Mahjong Mats", href: "/mahjong" },
  },
  newsletter: {
    heading: "First look at new drops",
    body: "One email a month, when a new print or mat run goes live. No spam, unsubscribe any time.",
  },
} as const;
