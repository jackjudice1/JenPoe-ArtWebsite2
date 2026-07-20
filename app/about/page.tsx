import Image from "next/image";
import type { Metadata } from "next";
import AnimatedReveal from "@/components/AnimatedReveal";

export const metadata: Metadata = {
  title: "About",
  description: "The studio and story behind Lacquer & Ivory.",
};

const process = [
  {
    title: "Paint",
    body: "Every collection starts on the easel — gouache and ink studies, usually a dozen for every one that becomes a product.",
  },
  {
    title: "Translate",
    body: "A painting becomes either a giclée print or a mat palette, depending on which colors and shapes carry over best.",
  },
  {
    title: "Finish by hand",
    body: "Prints are signed, mats are stitched — nothing leaves the studio without a hand touching it last.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-ivory">
        <div className="tile-grid-bg-light pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-content px-5 py-20 sm:px-8">
          <p className="eyebrow text-gold-soft">Our story</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
            A painter&apos;s studio that also makes mahjong mats.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <AnimatedReveal>
            <p className="eyebrow">The founder</p>
            <h2 className="mt-3 font-display text-3xl leading-tight">
              Started at a kitchen table, still run that way.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              Lacquer & Ivory began as a series of paintings made between weekly mahjong nights
              with friends in New Orleans. The prints came first, sold out of a market booth; the
              mats followed a year later after one too many friends asked where the tablecloth
              came from.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              The studio is still small on purpose — every piece is designed, and most are
              finished, by the same hands that painted the first one.
            </p>
          </AnimatedReveal>
          <AnimatedReveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-tile">
              <Image
                src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1000&auto=format&fit=crop"
                alt="Studio painting in progress"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 90vw"
              />
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <section className="bg-parchment">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
          <AnimatedReveal className="max-w-xl">
            <p className="eyebrow">Mission</p>
            <h2 className="mt-3 font-display text-3xl leading-tight">
              Make things worth keeping, not replacing.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              We&apos;d rather sell fewer pieces that last a decade than more pieces that don&apos;t.
              That means real materials, small batches, and pricing that reflects the actual time
              a piece takes to make.
            </p>
          </AnimatedReveal>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <AnimatedReveal className="max-w-xl">
          <p className="eyebrow">Creative process</p>
          <h2 className="mt-3 font-display text-3xl leading-tight">From easel to table.</h2>
        </AnimatedReveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {process.map((step, i) => (
            <AnimatedReveal key={step.title} delay={i * 0.08}>
              <div className="rounded-tile border border-ink/10 p-6">
                <span className="font-mono text-xs text-lacquer">{`0${i + 1}`}</span>
                <h3 className="mt-3 font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.body}</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 pb-20 sm:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1611891487122-207579d67d98?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
          ].map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-lg">
              <Image src={src} alt="Studio photo" fill className="object-cover" sizes="25vw" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
