"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

export default function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const variant = product.variants?.find((v) => v.id === variantId);
  const unitPrice = product.price + (variant?.priceModifier ?? 0);

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-2xl">{formatPrice(unitPrice)}</span>
        {product.compareAtPrice && (
          <span className="font-mono text-base text-ink/40 line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2 text-sm text-ink/60">
        <span aria-hidden className="text-gold">★</span>
        <span>
          {product.rating.toFixed(1)} ({product.reviewCount} reviews)
        </span>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-ink/70">{product.shortDescription}</p>

      {product.variants && product.variants.length > 0 && (
        <div className="mt-6">
          <label className="eyebrow mb-2 block">Size</label>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  variantId === v.id
                    ? "border-ink bg-ink text-ivory"
                    : "border-ink/20 text-ink/70 hover:border-ink"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center rounded-full border border-ink/20">
          <button
            className="px-3.5 py-2.5 text-lg"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-8 text-center font-mono text-sm">{quantity}</span>
          <button
            className="px-3.5 py-2.5 text-lg"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          onClick={() => setWishlisted((v) => !v)}
          aria-pressed={wishlisted}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 hover:border-lacquer"
          aria-label="Toggle wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "#C42B29" : "none"}>
            <path
              d="M12 20s-7-4.4-9.5-8.9C.7 7.6 2.4 4 6 4c2 0 3.5 1.1 4.4 2.4a5.3 5.3 0 0 1 3.2-2.4c3.6 0 5.3 3.6 3.5 7.1C19 15.6 12 20 12 20Z"
              stroke={wishlisted ? "#C42B29" : "currentColor"}
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => addItem(product, variantId, quantity)}
          className="btn-secondary flex-1"
        >
          Add to Cart
        </button>
        <button
          onClick={() => {
            addItem(product, variantId, quantity);
            router.push("/checkout");
          }}
          className="btn-primary flex-1"
        >
          Buy Now
        </button>
      </div>

      <dl className="mt-8 space-y-3 border-t border-ink/10 pt-6 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-ink/50">Dimensions</dt>
          <dd className="text-right text-ink/80">{product.dimensions}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink/50">Materials</dt>
          <dd className="text-right text-ink/80">{product.materials}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink/50">Shipping</dt>
          <dd className="text-right text-ink/80">{product.shippingInfo}</dd>
        </div>
      </dl>
    </div>
  );
}
