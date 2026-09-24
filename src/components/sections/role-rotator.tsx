"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 2400;

/** Alterna as especialidades como no hero do site antigo, respeitando movimento reduzido. */
export function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [roles.length]);

  return (
    <span className="inline-grid">
      <span className="sr-only">{roles.join(", ")}</span>
      <span key={index} aria-hidden="true" className="animate-role-in text-brand-400 font-display italic">
        {roles[index]}
      </span>
    </span>
  );
}
