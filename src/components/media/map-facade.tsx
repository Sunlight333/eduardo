"use client";

import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";

import { contact } from "@/content/site";
import { buttonClasses } from "@/components/ui/primitives";
import { cx } from "@/lib/utils";

/**
 * Mapa do Google (o mesmo do site antigo). Com `eager`, carrega direto (página
 * de contato); sem, mostra uma prévia e só carrega o iframe (≈1 MB) no clique.
 */
export function MapFacade({ eager = false, className }: { eager?: boolean; className?: string }) {
  const [loaded, setLoaded] = useState(eager);
  const { address } = contact;

  return (
    <div className={cx("bg-ink-900 relative aspect-[4/3] overflow-hidden rounded-xl text-white sm:aspect-[16/10]", className)}>
      {loaded ? (
        <iframe
          src={contact.mapEmbedUrl}
          title="Mapa: Eduardo Rodrigues Locutor, Tucuruvi, São Paulo"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:20px_20px] p-6 text-center">
          <span className="bg-brand-500 text-ink-900 grid size-14 place-items-center rounded-full">
            <MapPin className="size-6" aria-hidden="true" />
          </span>
          <p className="text-sm text-white/80">
            {address.street}
            <br />
            {address.neighborhood}, {address.city} – {address.state}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => setLoaded(true)} className={buttonClasses("primary", "sm")}>
              Carregar mapa
            </button>
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline-light", "sm")}>
              Google Maps
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
