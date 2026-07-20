import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/utils";
import ProductGallery from "@/components/ProductGallery";
import ProductActions from "@/components/ProductActions";
import RelatedProducts from "@/components/RelatedProducts";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: { images: [product.images[0]] },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div>
      <div className="mx-auto max-w-content px-5 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ProductGallery images={product.images} name={product.name} />
          <div>
            <p className="eyebrow">{product.category === "art-print" ? "Art Print" : "Mahjong Mat"}</p>
            <h1 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{product.name}</h1>
            <ProductActions product={product} />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-display text-2xl">Details</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">{product.description}</p>
          </div>
          <div className="rounded-tile border border-ink/10 bg-parchment p-6">
            <h3 className="font-display text-lg">Reviews</h3>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="text-gold" aria-hidden>★</span>
              <span className="font-semibold">{product.rating.toFixed(1)} / 5</span>
              <span className="text-ink/50">· {product.reviewCount} reviews</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink/55">
              Full review threads are coming soon — in the meantime, reach out on the contact page
              and we&apos;ll happily share recent customer photos.
            </p>
          </div>
        </div>
      </div>

      <RelatedProducts products={related} />
    </div>
  );
}
