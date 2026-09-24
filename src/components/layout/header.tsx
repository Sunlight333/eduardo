"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Menu, X } from "lucide-react";

import { nav } from "@/content/site";
import { buttonClasses, Container } from "@/components/ui/primitives";
import { Wordmark } from "./wordmark";
import { cx, whatsappUrl } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons/brand-icons";

const trimSlash = (path: string) => path.replace(/\/+$/, "") || "/";

function isActive(pathname: string, href: string) {
  const current = trimSlash(pathname);
  const target = trimSlash(href);
  return current === target || current.startsWith(`${target}/`);
}

export function Header() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = () => dialogRef.current?.close();

  return (
    <header className="bg-ink-950/90 sticky top-0 z-40 border-b border-white/10 text-sand-50 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cx(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive(pathname, item.href) ? "text-brand-400" : "text-stone-300 hover:text-sand-50",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contato/" className={buttonClasses("primary", "md", "max-sm:hidden")}>
            Solicitar orçamento
          </Link>
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="grid size-11 place-items-center rounded-full text-sand-50 hover:bg-white/10 lg:hidden"
            aria-label="Abrir menu"
            aria-haspopup="dialog"
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </Container>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="bg-ink-950 m-0 h-dvh max-h-none w-full max-w-none text-sand-50 backdrop:bg-black/60 open:flex open:flex-col"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <Container className="flex h-18 shrink-0 items-center justify-between border-b border-white/10">
          <Wordmark subtitle={false} />
          <button
            type="button"
            onClick={close}
            className="grid size-11 place-items-center rounded-full hover:bg-white/10"
            aria-label="Fechar menu"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </Container>
        <Container className="flex flex-1 flex-col justify-between py-8">
          <nav aria-label="Principal (celular)">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cx(
                      "font-display block py-2 text-4xl",
                      isActive(pathname, item.href) ? "text-brand-400" : "text-sand-50",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-3">
            <Link href="/contato/" onClick={close} className={buttonClasses("primary", "lg")}>
              Solicitar orçamento
            </Link>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline-dark", "lg")}>
              <WhatsAppIcon className="size-5" />
              Conversar no WhatsApp
            </a>
          </div>
        </Container>
      </dialog>
    </header>
  );
}
