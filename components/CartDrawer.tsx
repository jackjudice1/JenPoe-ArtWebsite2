"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { getProductById, formatPrice } from "@/lib/utils";

const ESTIMATED_TAX_RATE = 0.0845; // Louisiana state + local average — replace with real tax calc at checkout.
const FLAT_SHIPPING = 12;

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const tax = subtotal * ESTIMATED_TAX_RATE;
  const shipping = items.length === 0 ? 0 : FLAT_SHIPPING;
  const total = subtotal + tax + shipping;

  function applyCoupon() {
    if (!coupon.trim()) return;
    // Placeholder — wire this up to a real discount-code service later.
    setCouponMessage(`Codes aren't live yet — "${coupon.trim()}" wasn't applied.`);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[100] flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-display text-xl">Your Cart</h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-parchment"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-display text-lg">Your cart is empty</p>
                  <p className="mt-1 text-sm text-ink/60">Time to find something for the wall or the table.</p>
                  <Link href="/shop" onClick={closeCart} className="btn-primary mt-6">
                    Browse the shop
                  </Link>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    const variant = product.variants?.find((v) => v.id === item.variantId);
                    const unitPrice = product.price + (variant?.priceModifier ?? 0);
                    return (
                      <li key={`${item.productId}-${item.variantId ?? "default"}`} className="flex gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-tile bg-parchment">
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="80px" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-body text-sm font-semibold leading-snug">{product.name}</p>
                            <button
                              onClick={() => removeItem(item.productId, item.variantId)}
                              className="text-xs text-ink/50 hover:text-lacquer"
                              aria-label={`Remove ${product.name}`}
                            >
                              Remove
                            </button>
                          </div>
                          {variant && <p className="mt-0.5 text-xs text-ink/55">{variant.label}</p>}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-ink/15">
                              <button
                                className="px-2.5 py-1 text-sm"
                                onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="min-w-6 text-center font-mono text-xs">{item.quantity}</span>
                              <button
                                className="px-2.5 py-1 text-sm"
                                onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-mono text-sm">{formatPrice(unitPrice * item.quantity)}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-5">
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="w-full rounded-full border border-ink/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-lacquer"
                  />
                  <button onClick={applyCoupon} className="btn-secondary !px-5 !py-2.5 !text-xs">
                    Apply
                  </button>
                </div>
                {couponMessage && <p className="mt-2 text-xs text-ink/55">{couponMessage}</p>}

                <div className="mt-4 space-y-1.5 text-sm">
                  <div className="flex justify-between text-ink/70">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-ink/70">
                    <span>Estimated shipping</span>
                    <span className="font-mono">{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-ink/70">
                    <span>Estimated tax</span>
                    <span className="font-mono">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between border-t border-ink/10 pt-2 text-base font-semibold">
                    <span>Total</span>
                    <span className="font-mono">{formatPrice(total)}</span>
                  </div>
                </div>

                <Link href="/checkout" onClick={closeCart} className="btn-primary mt-5 w-full">
                  Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
