"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { buttonClasses } from "@/components/ui/primitives";
import { readConsent, saveConsent, subscribeConsent } from "@/lib/consent";

// "unknown" no servidor evita que o banner apareça no HTML estático.
const getServerSnapshot = () => "unknown" as const;
const getSnapshot = () => readConsent() ?? "pending";

export function ConsentBanner() {
  const state = useSyncExternalStore(subscribeConsent, getSnapshot, getServerSnapshot);
  if (state !== "pending") return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="border-brand-500 fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-xl border-t-4 bg-white p-5 text-sm text-neutral-700 shadow-2xl shadow-black/20 ring-1 ring-black/5 sm:inset-x-6 sm:bottom-6"
    >
      <p>
        Usamos cookies de medição para entender como o site é usado e melhorar a experiência. Você pode aceitar ou
        recusar. Saiba mais na{" "}
        <Link href="/politica-de-privacidade/" className="text-ink-900 font-bold underline underline-offset-2">
          política de privacidade
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => saveConsent("granted")} className={buttonClasses("primary", "sm")}>
          Aceitar
        </button>
        <button type="button" onClick={() => saveConsent("denied")} className={buttonClasses("outline", "sm")}>
          Recusar
        </button>
      </div>
    </div>
  );
}
