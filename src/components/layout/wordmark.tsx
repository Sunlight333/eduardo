import Link from "next/link";

import { cx } from "@/lib/utils";

// Marca provisória em texto até a entrega do logo vetorial (o logo antigo era
// um GIF de 298×115). O ponto vermelho remete à luz de "no ar" do estúdio.
export function Wordmark({ className, subtitle = true }: { className?: string; subtitle?: boolean }) {
  return (
    <Link href="/" className={cx("group inline-flex items-center gap-3", className)} aria-label="Eduardo Rodrigues — página inicial">
      <span aria-hidden="true" className="relative flex size-2.5">
        <span className="animate-onair bg-onair absolute inset-0 rounded-full" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.65rem] tracking-tight whitespace-nowrap">Eduardo Rodrigues</span>
        {subtitle && (
          <span className="mt-1 text-[0.65rem] font-semibold tracking-[0.22em] whitespace-nowrap text-stone-400 uppercase">
            Locutor · Mestre de cerimônias
          </span>
        )}
      </span>
    </Link>
  );
}
