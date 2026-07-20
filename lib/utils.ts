import productsData from "@/data/products.json";
import type { Product } from "./types";

const products = productsData as Product[];

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count);
}

export function getBestSellers(count = 4): Product[] {
  return [...products]
    .filter((p) => p.isBestSeller)
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, count);
}

export function getNewArrivals(count = 4): Product[] {
  return [...products].filter((p) => p.isNew).slice(0, count);
}
