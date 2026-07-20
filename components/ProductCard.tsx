"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="tile-card group overflow-hidden">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[2px] bg-parchment">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          />
          {product.isNew && (
            <span className="absolute left-3 top-3 rounded-full bg-jade px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ivory">
              New
            </span>
          )}
          {product.compareAtPrice && (
            <span className="absolute left-3 top-3 rounded-full bg-lacquer px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink">
              Sale
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setFavorited((v) => !v);
            }}
            aria-pressed={favorited}
            aria-label="Toggle favorite"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/90 text-ink shadow-sm transition-transform hover:scale-105"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill={favorited ? "#E8A0B4" : "none"} aria-hidden="true">
              <path
                d="M12 20s-7-4.4-9.5-8.9C.7 7.6 2.4 4 6 4c2 0 3.5 1.1 4.4 2.4a5.3 5.3 0 0 1 3.2-2.4c3.6 0 5.3 3.6 3.5 7.1C19 15.6 12 20 12 20Z"
                stroke={favorited ? "#C15C7C" : "currentColor"}
                strokeWidth="1.5"
              />
            </svg>
          </button>

          {/* Quick add — surfaces on hover, styled like a tile sliding into view */}
          <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addItem(product, product.variants?.[0]?.id);
              }}
              className="w-full rounded-full bg-ink/90 py-2.5 font-body text-xs font-semibold tracking-wide text-ivory backdrop-blur transition-colors hover:bg-lacquer hover:text-ink"
            >
              Quick add · {formatPrice(product.price)}
            </button>
          </div>
        </div>

        <div className="px-4 pb-5 pt-3">
          <p className="eyebrow">{product.category === "art-print" ? "Art Print" : "Mahjong Mat"}</p>
          <h3 className="mt-1 font-display text-lg leading-snug">{product.name}</h3>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="font-mono text-sm">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="font-mono text-xs text-ink/40 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
