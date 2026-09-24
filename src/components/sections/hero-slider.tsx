"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, Camera, Headphones, Pause, Play } from "lucide-react";

import type { HeroSlide } from "@/content/home";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { RoleRotator } from "./role-rotator";
import { cx } from "@/lib/utils";

const INTERVAL_MS = 6500;

export function HeroSlider({ slides, roles }: { slides: HeroSlide[]; roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, slides.length]);

  return (
    <section aria-roledescription="carrossel" aria-label="Destaques" className="bg-ink-950 relative isolate overflow-hidden text-white">
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, i) => (
          <div
            key={slide.caption}
            aria-hidden={i !== index}
            className={cx("absolute inset-0 transition-opacity duration-1000", i === index ? "opacity-100" : "opacity-0")}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              placeholder="blur"
              style={{ "--pos": slide.position, "--pos-m": slide.mobilePosition } as CSSProperties}
              className={cx("object-cover object-(--pos-m) lg:object-(--pos)", i === index && "animate-kenburns")}
            />
          </div>
        ))}
        <div className="from-ink-950 via-ink-950/70 to-ink-950/25 lg:from-ink-950/95 lg:via-ink-950/65 absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r lg:to-transparent" />
        <div className="from-ink-950/80 absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
      </div>

      <Container className="flex min-h-[calc(100svh_-_5rem)] flex-col justify-end pt-28 pb-28 md:min-h-[calc(100svh_-_7.5rem)] lg:h-[min(calc(100svh_-_8rem),46rem)] lg:min-h-[38rem] lg:justify-center lg:py-24">
        <div className="animate-rise max-w-2xl">
          <p className="font-display text-brand-400 inline-flex items-center gap-3 text-xs font-bold tracking-[0.22em] uppercase sm:text-sm">
            <span aria-hidden="true" className="bg-brand-500 h-0.5 w-8" />
            Locutor e Mestre de Cerimônias
          </p>
          <h1 className="font-display mt-5 text-[3.25rem] leading-[0.95] font-extrabold tracking-tight uppercase sm:text-7xl xl:text-8xl">
            Eduardo
            <br />
            Rodrigues
          </h1>
          <p className="font-display mt-6 min-h-[1.3em] text-2xl font-bold sm:text-3xl">
            <RoleRotator roles={roles} />
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            Há mais de 30 anos em rádio, TV e eventos. Jornalista pelo Mackenzie, locutor e docente formado pelo SENAC,
            com trabalhos para HBO Brasil, History Channel, TV Band, TV Gazeta e RedeTV.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contato/" size="lg">
              Solicitar orçamento
              <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#demos" variant="outline-light" size="lg">
              <Headphones className="size-5" aria-hidden="true" />
              Ouvir demos
            </ButtonLink>
          </div>
        </div>
      </Container>

      <Container className="absolute inset-x-0 bottom-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.caption}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Mostrar destaque ${i + 1}: ${slide.caption}`}
              aria-current={i === index ? "true" : undefined}
              className="flex h-8 w-10 items-center sm:w-16"
            >
              <span className="relative block h-1 w-full overflow-hidden rounded-full bg-white/30">
                <span
                  key={i === index ? `ativo-${index}-${paused}` : "inativo"}
                  className={cx(
                    "bg-brand-500 absolute inset-y-0 left-0 w-full origin-left",
                    i === index ? (paused ? "scale-x-100" : "animate-grow") : "scale-x-0",
                  )}
                />
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Retomar apresentação" : "Pausar apresentação"}
            className="ml-2 grid size-8 place-items-center rounded-full bg-white/15 hover:bg-white/25"
          >
            {paused ? <Play className="size-3.5 fill-current" /> : <Pause className="size-3.5 fill-current" />}
          </button>
        </div>
        <p className="hidden items-center gap-2 text-sm text-white/80 sm:flex" aria-live="polite">
          <Camera className="text-brand-400 size-4" aria-hidden="true" />
          {slides[index].caption}
        </p>
      </Container>
    </section>
  );
}
