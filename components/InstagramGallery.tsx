import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import AnimatedReveal from "./AnimatedReveal";

const shots = [
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611891487122-207579d67d98?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=600&auto=format&fit=crop",
];

export default function InstagramGallery() {
  return (
    <section className="mx-auto max-w-content px-5 py-20 sm:px-8">
      <AnimatedReveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">In the wild</p>
          <h2 className="mt-3 font-display text-4xl leading-tight">@jenniferpoeartist</h2>
        </div>
        <a
          href={siteConfig.social.instagram}
          className="text-sm font-semibold text-lacquer hover:underline"
        >
          Follow along →
        </a>
      </AnimatedReveal>

      <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
        {shots.map((src, i) => (
          <a
            key={src + i}
            href={siteConfig.social.instagram}
            className="group relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={src}
              alt="Lacquer & Ivory artwork and mahjong mats in customer homes"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(min-width: 768px) 16vw, 30vw"
            />
            <div className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/25" />
          </a>
        ))}
      </div>
    </section>
  );
}
