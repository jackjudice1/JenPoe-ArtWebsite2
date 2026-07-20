import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/utils";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Browse every art print and mahjong mat from Art by Jen Poe.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="mx-auto max-w-content px-5 py-14 sm:px-8">
      <div className="mb-10 max-w-xl">
        <p className="eyebrow">Shop all</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
          Every print, every mat.
        </h1>
      </div>
      <Suspense fallback={<p className="text-sm text-ink/50">Loading products…</p>}>
        <ShopClient products={products} />
      </Suspense>
    </div>
  );
}
