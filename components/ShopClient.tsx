"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Product, ProductCategory } from "@/lib/types";
import ProductCard from "./ProductCard";

type SortKey = "newest" | "popularity" | "price-asc" | "price-desc" | "best-sellers";

export default function ShopClient({
  products,
  lockCategory,
}: {
  products: Product[];
  lockCategory?: ProductCategory;
}) {
  const searchParams = useSearchParams();
  const initialSort = (searchParams.get("sort") as SortKey) || "popularity";
  const initialCategory = (searchParams.get("category") as ProductCategory) || "all";

  const [category, setCategory] = useState<ProductCategory | "all">(lockCategory ?? initialCategory);
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [maxPrice, setMaxPrice] = useState(200);
  const [color, setColor] = useState<string>("all");
  const [style, setStyle] = useState<string>("all");

  useEffect(() => {
    const s = searchParams.get("sort") as SortKey;
    if (s) setSort(s);
  }, [searchParams]);

  const colors = useMemo(
    () => ["all", ...Array.from(new Set(products.flatMap((p) => p.colors)))],
    [products]
  );
  const styles = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.style)))],
    [products]
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (color !== "all") list = list.filter((p) => p.colors.includes(color));
    if (style !== "all") list = list.filter((p) => p.style === style);

    switch (sort) {
      case "newest":
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case "best-sellers":
        list = [...list].sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
        break;
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      default:
        list = [...list].sort((a, b) => b.popularityScore - a.popularityScore);
    }
    return list;
  }, [products, category, color, style, maxPrice, sort]);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
      <aside className="space-y-8">
        {!lockCategory && (
          <div>
            <h3 className="eyebrow mb-3">Category</h3>
            <div className="flex flex-col gap-1.5 text-sm">
              {[
                { key: "all", label: "All" },
                { key: "art-print", label: "Art Prints" },
                { key: "mahjong-mat", label: "Mahjong Mats" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setCategory(opt.key as ProductCategory | "all")}
                  className={`w-fit rounded-full px-3 py-1.5 text-left transition-colors ${
                    category === opt.key ? "bg-ink text-ivory" : "text-ink/70 hover:bg-parchment"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="eyebrow mb-3">Price</h3>
          <input
            type="range"
            min={50}
            max={200}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-lacquer"
          />
          <p className="mt-1 font-mono text-xs text-ink/60">Up to ${maxPrice}</p>
        </div>

        <div>
          <h3 className="eyebrow mb-3">Color</h3>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-ivory px-3 py-2 text-sm"
          >
            {colors.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All colors" : c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="eyebrow mb-3">Style</h3>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-ivory px-3 py-2 text-sm"
          >
            {styles.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All styles" : s}
              </option>
            ))}
          </select>
        </div>
      </aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink/60">{filtered.length} results</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-ink/15 bg-ivory px-3 py-2 text-sm"
            aria-label="Sort products"
          >
            <option value="popularity">Popularity</option>
            <option value="newest">Newest</option>
            <option value="best-sellers">Best Sellers</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-tile border border-ink/10 bg-parchment p-10 text-center text-sm text-ink/60">
            Nothing matches those filters yet — try widening your price range.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
