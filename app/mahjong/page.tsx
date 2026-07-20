import { Suspense } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/utils";
import ShopClient from "@/components/ShopClient";
import AnimatedReveal from "@/components/AnimatedReveal";

export const metadata: Metadata = {
  title: "Mahjong Mats",
  description: "Hand-stitched neoprene mahjong mats, standard sizes and made-to-order custom builds.",
};

const textures = [
  {
    title: "Soundproof core",
    body: "A 3mm neoprene core absorbs the click of tiles for late-night games in shared apartments.",
    image: "https://images.unsplash.com/photo-1591873419446-8d09c1b0f3f7?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Hand-stitched border",
    body: "Every border is stitched at the studio, not printed — you can feel the edge under your fingers.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Built to fit a full set",
    body: "31 x 31 inches fits a standard 144-tile set with racks, discard pile, and elbow room.",
    image: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?q=80&w=900&auto=format&fit=crop",
  },
];

export default function MahjongPage() {
  const mats = getProductsByCategory("mahjong-mat");

  return (
    <div>
      <section className="relative overflow-hidden bg-jade-deep text-ivory">
        <div className="tile-grid-bg-light pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-content px-5 py-20 sm:px-8">
          <p className="eyebrow text-gold-soft">The Mahjong Collection</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
            Mats built for the table, not just the photo.
          </h1>
          <p className="mt-5 max-w-lg text-ivory/75">
            Every mat starts as a palette pulled from the studio&apos;s paintings, then gets cut,
            bound, and hand-stitched to hold up to years of weekly games.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {textures.map((t, i) => (
            <AnimatedReveal key={t.title} delay={i * 0.08}>
              <div className="overflow-hidden rounded-tile border border-ink/10">
                <div className="relative aspect-[4/3]">
                  <Image src={t.image} alt="" fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg">{t.title}</h3>
                  <p className="mt-1.5 text-sm text-ink/65">{t.body}</p>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 pb-20 sm:px-8">
        <div className="mb-8 max-w-xl">
          <p className="eyebrow">Why it&apos;s different</p>
          <h2 className="mt-3 font-display text-3xl leading-tight">
            Not a printed placemat — a made object.
          </h2>
        </div>
        <Suspense fallback={<p className="text-sm text-ink/50">Loading products…</p>}>
          <ShopClient products={mats} lockCategory="mahjong-mat" />
        </Suspense>
      </section>
    </div>
  );
}
