"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLineItem, Product } from "./types";
import { getProductById } from "./utils";

interface CartContextValue {
  items: CartLineItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, variantId: string | undefined, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "lacquer-ivory-cart";

function lineKey(productId: string, variantId?: string) {
  return `${productId}::${variantId ?? "default"}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem: CartContextValue["addItem"] = (product, variantId, quantity = 1) => {
    setItems((prev) => {
      const key = lineKey(product.id, variantId);
      const existing = prev.find((i) => lineKey(i.productId, i.variantId) === key);
      if (existing) {
        return prev.map((i) =>
          lineKey(i.productId, i.variantId) === key
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { productId: product.id, variantId, quantity }];
    });
    setIsOpen(true);
  };

  const removeItem: CartContextValue["removeItem"] = (productId, variantId) => {
    setItems((prev) =>
      prev.filter((i) => lineKey(i.productId, i.variantId) !== lineKey(productId, variantId))
    );
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (productId, variantId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        lineKey(i.productId, i.variantId) === lineKey(productId, variantId)
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const product = getProductById(item.productId);
      if (!product) return sum;
      const variant = product.variants?.find((v) => v.id === item.variantId);
      const unitPrice = product.price + (variant?.priceModifier ?? 0);
      return sum + unitPrice * item.quantity;
    }, 0);
  }, [items]);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
