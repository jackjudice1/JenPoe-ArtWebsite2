import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <p className="eyebrow">You might also like</p>
      <h2 className="mt-3 font-display text-3xl leading-tight">Related pieces</h2>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
