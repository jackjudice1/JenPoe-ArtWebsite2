import Link from "next/link";
import Image from "next/image";
import AnimatedReveal from "./AnimatedReveal";

const collections = [
  {
    title: "Art Prints",
    href: "/art-prints",
    blurb: "Giclée and metallic-ink prints from original studio paintings.",
    image:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1000&auto=format&fit=crop",
    span: "lg:col-span-2",
  },
  {
    title: "Mahjong Mats",
    href: "/mahjong",
    blurb: "Hand-stitched neoprene mats, standard and custom.",
    image:
      "https://images.unsplash.com/photo-1611891487122-207579d67d98?q=80&w=1000&auto=format&fit=crop",
    span: "lg:col-span-2",
  },
  {
    title: "New Arrivals",
    href: "/shop?sort=newest",
    blurb: "The latest off the press and off the frame.",
    image:
      "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1000&auto=format&fit=crop",
    span: "lg:col-span-1",
  },
  {
    title: "Best Sellers",
    href: "/shop?sort=popularity",
    blurb: "The pieces people come back and buy again for a friend.",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1000&auto=format&fit=crop",
    span: "lg:col-span-1",
  },
];

export default function CollectionsGrid() {
  return (
    <section className="mx-auto max-w-content px-5 py-20 sm:px-8">
      <AnimatedReveal className="max-w-xl">
        <p className="eyebrow">Shop by collection</p>
        <h2 className="mt-3 font-display text-4xl leading-tight">Two crafts, one palette.</h2>
      </AnimatedReveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((c, i) => (
          <AnimatedReveal key={c.title} delay={i * 0.08} className={c.span}>
            <Link
              href={c.href}
              className="group relative block h-72 overflow-hidden rounded-tile lg:h-80"
            >
              <Image
                src={c.image}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 30vw, 90vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-2xl text-ivory">{c.title}</h3>
                <p className="mt-1 text-sm text-ivory/75">{c.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-soft opacity-0 transition-opacity group-hover:opacity-100">
                  Shop now →
                </span>
              </div>
            </Link>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
