import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import AnimatedReveal from "./AnimatedReveal";

const shots = [
  "https://www.instagram.com/p/Da5QRkOso_6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/Da0FdxHMdfL/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/Daz_8Y1M-T-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/DZqWqe1TUVC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/DZpZgDVsNSN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/DTrH6RtFCc6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
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
