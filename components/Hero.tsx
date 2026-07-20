"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/data/site-config";

const SLIDE_DURATION = 5000;

const slides = [
  "/images/paintings/forest-glade.png",
  "/images/paintings/blue-dapple-abstract.png",
  "/images/paintings/bluebird-branches.png",
  "/images/paintings/confetti-abstract.png",
];

export default function Hero() {
  const { hero } = siteConfig;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={slides[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index]}
              alt=""
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[560px] max-w-content flex-col justify-center gap-8 px-5 py-24 sm:px-8 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="eyebrow text-gold-soft">{hero.eyebrow}</p>
          <h1 className="mt-4 font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight sm:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/80">{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={hero.primaryCta.href} className="btn-primary">
              {hero.primaryCta.label}
            </Link>
            <Link href={hero.secondaryCta.href} className="btn-ghost-ivory">
              {hero.secondaryCta.label}
            </Link>
          </div>
        </motion.div>

        {slides.length > 1 && (
          <div className="flex gap-2" role="tablist" aria-label="Painting slideshow">
            {slides.map((src, i) => (
              <button
                key={src + i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show painting ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-gold-soft" : "w-1.5 bg-ivory/40 hover:bg-ivory/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
