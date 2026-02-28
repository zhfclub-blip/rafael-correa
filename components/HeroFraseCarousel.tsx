"use client";

import { useState, useEffect } from "react";

const INTERVALO_MS = 15 * 1000; // 15 segundos

export default function HeroFraseCarousel({ frases }: { frases: string[] }) {
  const [indice, setIndice] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndice((i) => (i + 1) % frases.length);
        setVisible(true);
      }, 300);
    }, INTERVALO_MS);
    return () => clearInterval(id);
  }, [frases.length]);

  if (frases.length === 0) return null;

  return (
    <div className="flex-1 min-h-[280px] lg:min-h-[320px] flex items-center" aria-live="polite" aria-atomic="true">
      <div className="w-full min-h-[200px] lg:min-h-[240px] flex items-center justify-center rounded-xl border border-white/10 bg-camp-card/50 backdrop-blur-sm py-8 px-6">
        <p
          className={`text-white/95 text-base sm:text-lg lg:text-xl font-medium italic text-center transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          &ldquo;{frases[indice]}&rdquo;
        </p>
      </div>
    </div>
  );
}
