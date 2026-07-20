"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site-config";

export default function Hero() {
  const { hero } = siteConfig;

  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <div className="tile-grid-bg-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-jade/30 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-[-15%] left-[-5%] h-[360px] w-[360px] rounded-full bg-lacquer/25 blur-[110px]" />

      <div className="relative mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow text-gold-soft">{hero.eyebrow}</p>
          <h1 className="mt-4 font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight sm:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/75">{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={hero.primaryCta.href} className="btn-primary">
              {hero.primaryCta.label}
            </Link>
            <Link href={hero.secondaryCta.href} className="btn-ghost-ivory">
              {hero.secondaryCta.label}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl"
            style={{ borderRadius: "4px 4px 48px 48px" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop"
              alt="Framed art print above a mahjong table set with a custom mat"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -left-6 bottom-8 hidden w-44 rounded-tile border border-ivory/10 bg-ink/80 p-4 backdrop-blur sm:block"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-gold-soft">Now Shipping</p>
            <p className="mt-1 font-display text-sm">Amber Thread Mahjong Mat</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
