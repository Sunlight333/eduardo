"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AudioLines, Pause, Play } from "lucide-react";

import type { Demo } from "@/content/demos";
import { announcePlay, onOtherMediaPlay } from "@/lib/media-bus";
import { cx, formatTime } from "@/lib/utils";

const BAR_COUNT = 64;

/** Forma de onda decorativa, determinística a partir do slug da faixa. */
function waveform(seed: string): number[] {
  let h = 0;
  for (const char of seed) h = (h * 31 + char.charCodeAt(0)) >>> 0;
  return Array.from({ length: BAR_COUNT }, (_, i) => {
    h = (h * 1103515245 + 12345) >>> 0;
    const noise = (h % 1000) / 1000;
    const envelope = 0.55 + 0.45 * Math.sin((i / BAR_COUNT) * Math.PI);
    return Math.max(0.12, Math.min(1, envelope * (0.35 + noise * 0.75)));
  });
}

export function AudioPlaylist({ demos, className }: { demos: Demo[]; className?: string }) {
  const playerId = useId();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loadedDuration, setLoadedDuration] = useState<number | null>(null);

  const track = demos[active];
  const duration = loadedDuration ?? track.duration;
  const bars = useMemo(() => waveform(track.slug), [track.slug]);
  const progress = duration > 0 ? currentTime / duration : 0;

  useEffect(() => onOtherMediaPlay(playerId, () => audioRef.current?.pause()), [playerId]);

  // O src é controlado aqui, e não via prop: reatribuir src num <audio>
  // reinicia o carregamento e interromperia a reprodução.
  function ensureSource(audio: HTMLAudioElement, index: number) {
    const src = demos[index].src;
    if (audio.getAttribute("src") !== src) audio.src = src;
  }

  function select(index: number) {
    const audio = audioRef.current;
    if (!audio) return;
    if (index === active) {
      ensureSource(audio, index);
      if (audio.paused) void audio.play();
      else audio.pause();
      return;
    }
    ensureSource(audio, index);
    setActive(index);
    setCurrentTime(0);
    setLoadedDuration(null);
    void audio.play();
  }

  function seek(time: number) {
    const audio = audioRef.current;
    if (!audio) return;
    ensureSource(audio, active);
    audio.currentTime = time;
    setCurrentTime(time);
  }

  return (
    <div className={cx("bg-ink-900 overflow-hidden rounded-3xl border border-white/10 text-sand-50", className)}>
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => {
          setPlaying(true);
          announcePlay(playerId);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setLoadedDuration(e.currentTarget.duration)}
      />

      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => select(active)}
            className="bg-brand-500 text-ink-950 hover:bg-brand-400 grid size-16 shrink-0 place-items-center rounded-full transition-colors"
            aria-label={playing ? `Pausar ${track.title}` : `Tocar ${track.title}`}
          >
            {playing ? <Pause className="size-7 fill-current" /> : <Play className="size-7 translate-x-0.5 fill-current" />}
          </button>
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.18em] text-stone-400 uppercase">
              {playing ? "Tocando agora" : "Demo de voz"}
            </p>
            <p className="font-display mt-1 truncate text-3xl">{track.title}</p>
            <p className="mt-1 truncate text-sm text-stone-400">{track.description}</p>
          </div>
        </div>

        <div className="relative mt-7 flex h-16 items-center gap-[3px] rounded-lg has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-brand-500">
          {bars.map((height, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={cx(
                "flex-1 rounded-full transition-colors duration-150",
                i / BAR_COUNT < progress ? "bg-brand-400" : "bg-white/15",
              )}
              style={{ height: `${height * 100}%` }}
            />
          ))}
          <input
            type="range"
            min={0}
            max={duration || 1}
            step={0.1}
            value={currentTime}
            onChange={(e) => seek(Number(e.currentTarget.value))}
            aria-label={`Posição em ${track.title}`}
            aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-stone-500 tabular-nums">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <ol className="border-t border-white/10">
        {demos.map((demo, index) => {
          const isActive = index === active;
          return (
            <li key={demo.slug} className="border-b border-white/5 last:border-b-0">
              <button
                type="button"
                onClick={() => select(index)}
                aria-label={isActive && playing ? `Pausar ${demo.title}` : `Tocar ${demo.title}`}
                className={cx(
                  "flex w-full items-center gap-4 px-6 py-3.5 text-left transition-colors sm:px-8",
                  isActive ? "bg-white/5" : "hover:bg-white/[0.03]",
                )}
              >
                <span className="grid w-6 shrink-0 place-items-center text-sm text-stone-500 tabular-nums">
                  {isActive && playing ? (
                    <AudioLines className="text-brand-400 size-4" aria-hidden="true" />
                  ) : (
                    String(index + 1).padStart(2, "0")
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cx("block truncate font-medium", isActive && "text-brand-400")}>{demo.title}</span>
                  <span className="hidden truncate text-sm text-stone-500 sm:block">{demo.description}</span>
                </span>
                <span className="text-sm text-stone-500 tabular-nums">{formatTime(demo.duration)}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
