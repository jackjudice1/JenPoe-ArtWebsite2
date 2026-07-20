import { Suspense } from "react";
import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/utils";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Art Prints",
  description: "Giclée and metallic-ink art prints from original studio paintings.",
};

const rooms = ["Living Room", "Bedroom", "Dining Room", "Office", "Entryway", "Kitchen"];

export default function ArtPrintsPage() {
  const prints = getProductsByCategory("art-print");

  return (
    <div>
      <section className="relative overflow-hidden bg-plum text-ivory">
        <div className="tile-grid-bg-light pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-content px-5 py-20 sm:px-8">
          <p className="eyebrow text-gold-soft">The Art Print Collection</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
            Original paintings, printed in small batches.
          </h1>
          <p className="mt-5 max-w-lg text-ivory/75">
            Giclée on cotton rag, with a spot-gold ink pass on select pieces. Browse by style,
            color, or the room you&apos;re shopping for.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-10 sm:px-8">
        <p className="eyebrow mb-3">Shop by room</p>
        <div className="flex flex-wrap gap-2">
          {rooms.map((room) => (
            <span
              key={room}
              className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/70"
            >
              {room}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 pb-20 sm:px-8">
        <Suspense fallback={<p className="text-sm text-ink/50">Loading products…</p>}>
          <ShopClient products={prints} lockCategory="art-print" />
        </Suspense>
      </section>
    </div>
  );
}
