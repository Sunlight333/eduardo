"use client";

import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";

import { contact } from "@/content/site";
import { buttonClasses } from "@/components/ui/primitives";

/** O iframe do Google Maps (≈1 MB) só carrega quando o visitante pede. */
export function MapFacade() {
  const [loaded, setLoaded] = useState(false);
  const { address } = contact;

  return (
    <div className="bg-ink-900 relative aspect-[4/3] overflow-hidden rounded-3xl text-sand-50 sm:aspect-[16/10]">
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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px]">
          <span className="bg-brand-500 text-ink-950 grid size-14 place-items-center rounded-full">
            <MapPin className="size-6" aria-hidden="true" />
          </span>
          <p className="text-sm text-stone-300">
            Mapa da sede — {address.neighborhood}, {address.city}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => setLoaded(true)} className={buttonClasses("primary")}>
              Carregar mapa
            </button>
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline-dark")}>
              Abrir no Google Maps
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
