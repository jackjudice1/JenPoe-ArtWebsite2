"use client";

import Image from "next/image";
import { useState } from "react";
import testimonials from "@/data/testimonials.json";
import AnimatedReveal from "./AnimatedReveal";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  return (
    <section className="bg-ink text-ivory">
      <div className="mx-auto max-w-content px-5 py-20 sm:px-8">
        <AnimatedReveal className="text-center">
          <p className="eyebrow text-gold-soft">From the table and the wall</p>
          <h2 className="mt-3 font-display text-4xl">What people are saying</h2>
        </AnimatedReveal>

        <AnimatedReveal delay={0.1} className="mx-auto mt-12 max-w-2xl text-center">
          <div className="flex justify-center gap-1 text-gold" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < t.rating ? "currentColor" : "none"}>
                <path d="M12 3l2.6 5.9 6.4.6-4.8 4.4 1.4 6.3L12 17l-5.6 3.2 1.4-6.3-4.8-4.4 6.4-.6L12 3Z" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            ))}
          </div>
          <p className="mt-6 font-display text-2xl leading-snug text-ivory/95">“{t.quote}”</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full">
              <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="44px" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-ivory/55">{t.location}</p>
            </div>
          </div>
        </AnimatedReveal>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial from ${item.name}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-gold" : "w-1.5 bg-ivory/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
