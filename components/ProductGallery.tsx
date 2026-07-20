"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-tile bg-parchment">
        <Image
          src={images[active]}
          alt={name}
          fill
          priority
          className="object-cover transition-transform duration-500 hover:scale-110"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                active === i ? "border-lacquer" : "border-transparent"
              }`}
              aria-label={`Show image ${i + 1}`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
