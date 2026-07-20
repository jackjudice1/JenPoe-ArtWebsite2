import AnimatedReveal from "./AnimatedReveal";

const points = [
  {
    title: "Premium materials",
    body: "Cotton rag paper, archival ink, and 3mm soundproof neoprene — nothing made to be disposable.",
    icon: (
      <path d="M4 7l8-4 8 4-8 4-8-4Zm0 5l8 4 8-4M4 17l8 4 8-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    ),
  },
  {
    title: "High-quality printing",
    body: "Giclée printing with a spot-gold pass on select pieces, color-matched to the original painting.",
    icon: <path d="M6 3h12v6H6V3Zm-2 6h16v8H4V9Zm2 4h4M6 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  },
  {
    title: "Fast shipping",
    body: "Most orders leave the studio within 3–5 business days, tracked from door to door.",
    icon: <path d="M3 13l2-6h8l2 6M3 13h12v5H3v-5Zm12 0h4l2 3v2h-6v-5ZM7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  },
  {
    title: "Designed with love",
    body: "Every piece starts as an original studio painting before it becomes a print or a mat.",
    icon: <path d="M12 20s-7-4.4-9.5-8.9C.7 7.6 2.4 4 6 4c2 0 3.5 1.1 4.4 2.4a5.3 5.3 0 0 1 3.2-2.4c3.6 0 5.3 3.6 3.5 7.1C19 15.6 12 20 12 20Z" stroke="currentColor" strokeWidth="1.5" />,
  },
  {
    title: "Unique artwork",
    body: "Small print runs and made-to-order mats — once a run sells out, it doesn't come back the same.",
    icon: <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-content px-5 py-20 sm:px-8">
        <AnimatedReveal className="max-w-xl">
          <p className="eyebrow">Why Lacquer & Ivory</p>
          <h2 className="mt-3 font-display text-4xl leading-tight">Made slower, on purpose.</h2>
        </AnimatedReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {points.map((p, i) => (
            <AnimatedReveal key={p.title} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-tile border border-ink/10 bg-ivory p-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-lacquer" aria-hidden="true">
                  {p.icon}
                </svg>
                <h3 className="mt-4 font-display text-lg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.body}</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
