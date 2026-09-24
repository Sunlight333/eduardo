"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { galleryCategories, type GalleryCategory } from "@/content/gallery-categories";
import type { GalleryPhoto } from "@/content/gallery";
import { cx } from "@/lib/utils";

type Filter = GalleryCategory | "todas";

export function Gallery({
  photos,
  filters = true,
  initialCategory = "todas",
}: {
  photos: GalleryPhoto[];
  filters?: boolean;
  initialCategory?: Filter;
}) {
  const [category, setCategory] = useState<Filter>(initialCategory);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = category === "todas" ? photos : photos.filter((p) => p.category === category);
  const available = galleryCategories.filter((c) => photos.some((p) => p.category === c.slug));
  const current = openIndex === null ? null : visible[openIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  const step = (delta: number) =>
    setOpenIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length));

  return (
    <div>
      {filters && available.length > 1 && (
        <div role="group" aria-label="Filtrar fotos por categoria" className="mb-8 flex flex-wrap gap-2">
          {[{ slug: "todas" as const, label: "Todas" }, ...available].map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={category === c.slug}
              onClick={() => setCategory(c.slug)}
              className={cx(
                "font-display rounded-lg border-2 px-4 py-2 text-sm font-bold transition-colors",
                category === c.slug
                  ? "border-ink-900 bg-ink-900 text-white"
                  : "border-neutral-300 text-ink-800 hover:border-ink-900",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {visible.map((photo, index) => (
          <li key={photo.src.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-200"
              aria-label={`Ampliar foto: ${photo.caption}`}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                placeholder="blur"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-10 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-sm">
                {photo.caption}
                {photo.year && <span className="text-white/70"> · {photo.year}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Foto ampliada"
        onClose={() => setOpenIndex(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpenIndex(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-black/90"
      >
        {current && (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-10">
            <div className="relative h-full max-h-[78dvh] w-full">
              <Image src={current.src} alt={current.caption} fill sizes="100vw" className="object-contain" />
            </div>
            <p className="max-w-2xl text-center text-sm text-white/85">
              {current.caption}
              {current.year && <span className="text-white/60"> · {current.year}</span>}
              <span className="ml-3 text-white/50 tabular-nums">
                {openIndex! + 1}/{visible.length}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Fechar"
            >
              <X className="size-5" />
            </button>
            {visible.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                  aria-label="Próxima foto"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
