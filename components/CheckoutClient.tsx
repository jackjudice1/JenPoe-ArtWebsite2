"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { getProductById, formatPrice } from "@/lib/utils";

const TAX_RATE = 0.0845;
const SHIPPING = 12;

export default function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderNumber] = useState(() => `LI-${Math.floor(10000 + Math.random() * 89999)}`);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING;

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder — replace with a real Stripe Checkout Session or Payment
    // Intent call from a server route (e.g. app/api/checkout/route.ts),
    // then clear the cart once payment is confirmed by the webhook.
    setPlaced(true);
    clearCart();
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg py-24 text-center">
        <p className="eyebrow">Order confirmed</p>
        <h1 className="mt-3 font-display text-3xl">Thank you — order {orderNumber}</h1>
        <p className="mt-3 text-sm text-ink/65">
          A confirmation email is on its way. This is a demo checkout — no payment was actually
          charged and no order was really placed.
        </p>
        <Link href="/shop" className="btn-primary mt-8 inline-flex">
          Keep browsing
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-24 text-center">
        <h1 className="font-display text-3xl">Your cart is empty</h1>
        <p className="mt-3 text-sm text-ink/65">Add something from the shop before checking out.</p>
        <Link href="/shop" className="btn-primary mt-8 inline-flex">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
      <form onSubmit={handlePlaceOrder} className="space-y-10">
        <section>
          <h2 className="font-display text-xl">Shipping</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input required placeholder="First name" className="input" />
            <input required placeholder="Last name" className="input" />
            <input required placeholder="Email" type="email" className="input sm:col-span-2" />
            <input required placeholder="Address" className="input sm:col-span-2" />
            <input required placeholder="City" className="input" />
            <input required placeholder="State" className="input" />
            <input required placeholder="ZIP code" className="input" />
            <input required placeholder="Country" className="input" defaultValue="United States" />
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl">Billing</h2>
          <label className="mt-4 flex items-center gap-2 text-sm text-ink/70">
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-lacquer" />
            Same as shipping address
          </label>
        </section>

        <section>
          <h2 className="font-display text-xl">Payment</h2>
          <p className="mt-2 text-xs text-ink/50">
            This demo does not process real payments. In production, this section renders a
            Stripe Elements / Stripe Checkout form here.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input required placeholder="Card number" className="input sm:col-span-2" />
            <input required placeholder="MM / YY" className="input" />
            <input required placeholder="CVC" className="input" />
          </div>
        </section>

        <button type="submit" className="btn-primary w-full">
          Place order — {formatPrice(total)}
        </button>
      </form>

      <aside className="h-fit rounded-tile border border-ink/10 bg-parchment p-6">
        <h2 className="font-display text-lg">Order summary</h2>
        <ul className="mt-4 space-y-4">
          {items.map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;
            const variant = product.variants?.find((v) => v.id === item.variantId);
            const unitPrice = product.price + (variant?.priceModifier ?? 0);
            return (
              <li key={`${item.productId}-${item.variantId ?? "default"}`} className="flex gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-ivory">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-semibold leading-snug">{product.name}</p>
                  <p className="text-ink/50">Qty {item.quantity}</p>
                </div>
                <p className="font-mono text-sm">{formatPrice(unitPrice * item.quantity)}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 space-y-1.5 border-t border-ink/10 pt-4 text-sm">
          <div className="flex justify-between text-ink/70">
            <span>Subtotal</span>
            <span className="font-mono">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-ink/70">
            <span>Shipping</span>
            <span className="font-mono">{formatPrice(SHIPPING)}</span>
          </div>
          <div className="flex justify-between text-ink/70">
            <span>Tax</span>
            <span className="font-mono">{formatPrice(tax)}</span>
          </div>
          <div className="flex justify-between border-t border-ink/10 pt-2 text-base font-semibold">
            <span>Total</span>
            <span className="font-mono">{formatPrice(total)}</span>
          </div>
        </div>
      </aside>

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
    </div>
  );
}
