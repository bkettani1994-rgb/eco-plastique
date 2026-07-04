"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "🚚 Livraison rapide partout au Maroc",
  "💵 Paiement à la livraison",
];

const INTERVAL = 3500;

export function TopBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % MESSAGES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-8 overflow-hidden bg-primary text-xs font-semibold text-white sm:text-sm">
      {MESSAGES.map((message, i) => (
        <span
          key={i}
          className="absolute inset-0 flex items-center justify-center text-center transition-opacity duration-700"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          {message}
        </span>
      ))}
    </div>
  );
}
