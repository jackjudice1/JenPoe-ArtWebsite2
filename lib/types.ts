export type ProductCategory = "art-print" | "mahjong-mat";

export interface ProductVariant {
  id: string;
  label: string; // e.g. size or dimension
  priceModifier: number; // added to base price
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  currency: "USD";
  shortDescription: string;
  description: string;
  images: string[];
  colors: string[];
  style: string;
  theme?: string;
  room?: string[];
  dimensions: string;
  materials: string;
  shippingInfo: string;
  isNew: boolean;
  isBestSeller: boolean;
  popularityScore: number;
  rating: number;
  reviewCount: number;
  variants?: ProductVariant[];
  tags: string[];
}

export interface CartLineItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  avatar: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
