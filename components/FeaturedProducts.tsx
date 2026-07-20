import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import AnimatedReveal from "./AnimatedReveal";
import Link from "next/link";

export default function FeaturedProducts({
  title,
  eyebrow,
  products,
  viewAllHref,
}: {
  title: string;
  eyebrow: string;
  products: Product[];
  viewAllHref: string;
}) {
  return (
    <section className="mx-auto max-w-content px-5 py-20 sm:px-8">
      <AnimatedReveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl leading-tight">{title}</h2>
        </div>
        <Link href={viewAllHref} className="text-sm font-semibold text-lacquer hover:underline">
          View all →
        </Link>
      </AnimatedReveal>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {products.map((product, i) => (
          <AnimatedReveal key={product.id} delay={i * 0.05}>
            <ProductCard product={product} />
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
