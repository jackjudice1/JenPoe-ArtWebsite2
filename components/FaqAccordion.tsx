"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/types";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/10 rounded-tile border border-ink/10">
      {items.map((item, i) => (
        <div key={item.question}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
          >
            <span className="font-body text-sm font-semibold">{item.question}</span>
            <span className="text-lg text-ink/40">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <p className="px-5 pb-4 text-sm leading-relaxed text-ink/65">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}
