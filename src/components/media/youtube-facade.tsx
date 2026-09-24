"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

import type { Video } from "@/content/videos";
import { announcePlay } from "@/lib/media-bus";
import { cx } from "@/lib/utils";

/**
 * Mostra só a miniatura até o clique; o player do YouTube (centenas de KB de
 * JavaScript) é carregado sob demanda, via youtube-nocookie.com.
 */
export function YouTubeFacade({
  video,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
}: {
  video: Video;
  sizes?: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className={cx("bg-ink-950 relative aspect-video overflow-hidden rounded-2xl", className)}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            announcePlay(`youtube-${video.id}`);
            setActive(true);
          }}
          className="group absolute inset-0 size-full"
          aria-label={`Assistir ao vídeo: ${video.title}`}
        >
          <Image
            src={video.thumb}
            alt=""
            fill
            sizes={sizes}
            className="object-cover opacity-85 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <span
            aria-hidden="true"
            className="bg-brand-500 text-ink-950 absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full shadow-lg transition-transform group-hover:scale-110"
          >
            <Play className="size-7 translate-x-0.5 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
