import type { Metadata } from "next";
import CheckoutClient from "@/components/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-14 sm:px-8">
      <p className="eyebrow">Checkout</p>
      <h1 className="mt-3 font-display text-4xl leading-tight">Almost there.</h1>
      <div className="mt-10">
        <CheckoutClient />
      </div>
    </div>
  );
}
