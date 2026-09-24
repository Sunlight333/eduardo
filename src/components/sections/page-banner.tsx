import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/ui/primitives";
import { cx } from "@/lib/utils";

export type Crumb = { name: string; path: string };

/**
 * Banner das páginas internas: foto do acervo ao fundo, título e trilha de
 * navegação (como o "featured title" do site antigo, agora com imagem).
 */
export function PageBanner({
  image,
  position = "50% 50%",
  title,
  lead,
  eyebrow,
  crumbs = [],
  align = "left",
  children,
}: {
  image?: StaticImageData;
  position?: string;
  title: ReactNode;
  lead?: ReactNode;
  eyebrow?: string;
  crumbs?: Crumb[];
  align?: "left" | "right";
  children?: ReactNode;
}) {
  const right = align === "right";
  return (
    <section className="bg-ink-950 relative isolate overflow-hidden text-white">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            style={{ "--pos": position } as CSSProperties}
            className="animate-kenburns -z-20 object-cover object-(--pos)"
          />
          <div
            className={cx(
              "from-ink-950/95 via-ink-950/75 to-ink-950/30 absolute inset-0 -z-10",
              right ? "bg-gradient-to-l" : "bg-gradient-to-r",
            )}
          />
        </>
      )}
      <Container className={cx("flex min-h-[20rem] flex-col justify-end py-12 sm:min-h-[24rem] sm:py-16", right && "items-end text-right")}>
        <nav aria-label="Trilha de navegação" className="mb-5">
          <ol className={cx("flex flex-wrap items-center gap-1.5 text-sm text-white/70", right && "justify-end")}>
            <li>
              <Link href="/" className="hover:text-brand-400">
                Início
              </Link>
            </li>
            {crumbs.map((crumb, i) => (
              <li key={crumb.path} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" aria-hidden="true" />
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-white">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="hover:text-brand-400">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && (
          <p className="font-display text-brand-400 text-xs font-bold tracking-[0.2em] uppercase sm:text-sm">{eyebrow}</p>
        )}
        <h1 className="font-display mt-2 max-w-3xl text-4xl leading-[1.05] font-extrabold text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <span aria-hidden="true" className="bg-brand-500 mt-5 block h-1 w-16 rounded-full" />
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{lead}</p>}
        {children && <div className={cx("mt-8 flex flex-wrap gap-3", right && "justify-end")}>{children}</div>}
      </Container>
    </section>
  );
}
