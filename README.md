# Art by Jen Poe

A premium e-commerce storefront for art prints and custom mahjong mats, built with
Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Brand

- **Name:** Art by Jen Poe
- **Palette:** Ivory `#F6F1E4`, Ink Navy `#16213A`, Jade `#1F6B54`, Lacquer Red `#C42B29`,
  Gold `#C6A15B`, Plum `#5B3A5C`
- **Type:** Fraunces (display) + Inter (body) + IBM Plex Mono (labels/prices)
- **Signature element:** product cards are cut like mahjong tiles — flat base, rounded
  crown, a thin carved inset border — and lift on hover the way a tile lifts off the table.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. No environment variables are required to run the site as a
front-end demo — cart, filtering, and the checkout flow all work with dummy data and
no backend.

## Project structure

```
app/                 Pages (App Router)
  page.tsx           Homepage
  shop/               Full catalog + [slug] product pages
  art-prints/         Art print collection
  mahjong/            Mahjong mat collection
  about/, contact/    Static pages
  checkout/           Checkout flow (demo — no real payment)
components/          Reusable UI (Header, Footer, ProductCard, CartDrawer, etc.)
data/                Editable content: site-config.ts, products.json, testimonials.json, faqs.json
lib/                 Types, cart context, data helpers
```

## Editing content

Everything editable lives in `data/`, not scattered through components:

- **`data/site-config.ts`** — brand name/tagline, nav, footer links, social URLs, business
  email/phone/address, hero copy, newsletter copy.
- **`data/products.json`** — the product catalog. Each product is a plain object; add a
  new one by copying an existing entry and giving it a unique `id` and `slug`. This file
  is the natural place to swap in a real CMS or database later (see below).
- **`data/testimonials.json`**, **`data/faqs.json`** — homepage testimonials and the
  contact-page FAQ list.

### Swapping in real product images

Products currently point at Unsplash placeholder URLs. Drop real photos into
`public/images/products/` and update each product's `images` array in `products.json`
to `/images/products/your-file.jpg`.

### Moving products to a CMS or database

`lib/utils.ts` is the only place that reads `products.json`. To move to a headless CMS
(Sanity, Contentful) or a database, replace the functions in that file with fetch calls —
every page already imports products through those functions, so no page code needs to
change.

## Wiring up real functionality

The site is fully designed and interactive, but three integrations are intentionally
stubbed since they need real accounts/keys:

1. **Payments (Stripe).** `components/CheckoutClient.tsx` has a `handlePlaceOrder`
   function with a comment marking where to call a server route (e.g.
   `app/api/checkout/route.ts`) that creates a Stripe Checkout Session or Payment Intent
   using `STRIPE_SECRET_KEY`. Add a webhook route to confirm payment and clear the cart
   server-side instead of optimistically on submit.
2. **Contact form + newsletter email.** `components/ContactForm.tsx` and
   `components/Newsletter.tsx` both have a comment marking where to POST to an email
   provider (Resend, Formspree, Mailchimp/Klaviyo) using the keys in `.env.example`.
3. **Coupon codes.** `components/CartDrawer.tsx` has a placeholder `applyCoupon`
   function — connect it to a real discount-code table or your payment provider's
   coupon API.

Copy `.env.example` to `.env.local` and fill in real keys once you're ready to wire
these up.

## Accounts, wishlist, order history

Not built yet — the wishlist heart icon on product cards is currently local UI state
only (not persisted). If you want real accounts, the cleanest path is Clerk or
NextAuth for auth, plus a database (e.g. Postgres via Supabase or Neon) for orders,
addresses, and saved wishlists.

## Deployment

The site is a standard Next.js app and deploys cleanly to Vercel:

```bash
npm run build
```

1. Push this repo to GitHub.
2. Import it in Vercel (or Netlify, with the Next.js adapter).
3. Add the environment variables from `.env.example` in your hosting provider's
   dashboard once payments/email are wired up.
4. Point your domain at the deployment and update `NEXT_PUBLIC_SITE_URL` and the
   `metadataBase` in `app/layout.tsx`.

## What's included vs. what's stubbed

**Fully built:** homepage (hero, collections, why-us, featured products, testimonials,
Instagram grid, newsletter), shop with filtering/sorting, dedicated Art Print and
Mahjong Mat collection pages, product detail pages with gallery/variants/related
products, sliding cart drawer, checkout UI, about page, contact page with validated
form and FAQ accordion, SEO metadata + sitemap + robots.txt, mobile-responsive layouts
throughout, reduced-motion support, keyboard focus states.

**Stubbed (needs your keys/accounts):** real payment processing, real email delivery
for the contact form and newsletter, coupon code validation, customer accounts/order
history/wishlist persistence, reviews submission (ratings shown are static demo data).
