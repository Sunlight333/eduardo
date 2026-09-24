"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Mail, Menu, Phone, X } from "lucide-react";

import { mainNav, type NavItem, type NavLink } from "@/content/navigation";
import { contact, social } from "@/content/site";
import { buttonClasses, Container } from "@/components/ui/primitives";
import { ServiceIcon } from "@/components/icons/service-icon";
import { SocialIcon } from "@/components/icons/social-icon";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { cx, whatsappUrl } from "@/lib/utils";
import { Logo } from "./logo";

const trim = (path: string) => path.split("#")[0].replace(/\/+$/, "") || "/";

/** Item ativo: primeiro pelo próprio endereço, depois pelos links do submenu. */
function activeLabel(pathname: string): string | undefined {
  const current = trim(pathname);
  const byHref = mainNav.find((item) => {
    const target = trim(item.href);
    return current === target || current.startsWith(`${target}/`);
  });
  if (byHref) return byHref.label;
  return mainNav.find((item) => item.groups?.some((g) => g.links.some((l) => trim(l.href) === current)))?.label;
}

function PanelLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="group/link hover:bg-paper flex items-center gap-3 rounded-lg p-2.5 transition-colors"
    >
      {link.icon && (
        <span className="bg-brand-100 text-ink-900 group-hover/link:bg-brand-500 grid size-10 shrink-0 place-items-center rounded-lg transition-colors">
          <ServiceIcon icon={link.icon} className="size-5" />
        </span>
      )}
      {link.image && (
        <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md">
          <Image src={link.image} alt="" fill sizes="56px" className="object-cover" />
        </span>
      )}
      <span className="min-w-0">
        <span className="font-display text-ink-900 block text-sm font-bold">{link.label}</span>
        {link.description && <span className="block text-[13px] leading-snug text-neutral-500">{link.description}</span>}
      </span>
    </Link>
  );
}

function DesktopItem({
  item,
  active,
  open,
  onOpen,
  onClose,
  onToggle,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}) {
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wide = (item.groups?.length ?? 0) > 1 || item.groups?.[0].links.some((l) => l.icon);

  const linkClasses = cx(
    "font-display relative flex h-full items-center px-3 text-[0.95rem] font-bold transition-colors",
    "after:absolute after:inset-x-3 after:bottom-0 after:h-1 after:rounded-t after:bg-brand-500 after:transition-transform",
    active || open ? "text-ink-900 after:scale-x-100" : "text-ink-700 hover:text-ink-900 after:scale-x-0",
  );

  if (!item.groups) {
    return (
      <li className="flex">
        <Link href={item.href} className={linkClasses} aria-current={active ? "page" : undefined}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative flex"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          onToggle();
          triggerRef.current?.focus();
        }
      }}
    >
      <Link href={item.href} className={cx(linkClasses, "pr-1")} aria-current={active ? "page" : undefined}>
        {item.label}
      </Link>
      <button
        ref={triggerRef}
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Submenu de ${item.label}`}
        className="text-ink-700 hover:text-ink-900 mr-1 grid w-6 place-items-center"
      >
        <ChevronDown className={cx("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>

      <div
        id={panelId}
        className={cx(
          "absolute top-full left-1/2 z-50 -translate-x-1/2 pt-1 transition duration-150",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <div className={cx("rounded-xl bg-white p-3 shadow-2xl ring-1 shadow-black/10 ring-black/5", wide ? "w-[36rem]" : "w-80")}>
          <div className={cx("grid gap-x-4", (item.groups.length > 1 || wide) && "grid-cols-2")}>
            {item.groups.map((group) => (
              <div key={group.title} className={cx(item.groups!.length === 1 && wide && "col-span-2")}>
                <p className="font-display text-brand-700 px-2.5 pt-1 pb-2 text-[11px] font-bold tracking-[0.18em] uppercase">
                  {group.title}
                </p>
                <ul className={cx(item.groups!.length === 1 && wide && "grid grid-cols-2 gap-x-2")}>
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <PanelLink link={link} onNavigate={onToggle} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {item.footer && (
            <Link
              href={item.footer.href}
              onClick={onToggle}
              className="font-display text-ink-900 hover:bg-brand-500 bg-paper mt-2 flex items-center justify-between rounded-lg px-4 py-3 text-sm font-bold transition-colors"
            >
              {item.footer.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}

function DesktopNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);
  const current = activeLabel(pathname);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <nav ref={navRef} aria-label="Principal" className="hidden h-full lg:block">
      <ul className="flex h-full">
        {mainNav.map((item) => (
          <DesktopItem
            key={item.label}
            item={item}
            active={current === item.label}
            open={open === item.label}
            onOpen={() => {
              window.clearTimeout(closeTimer.current);
              setOpen(item.label);
            }}
            onClose={() => {
              closeTimer.current = window.setTimeout(() => setOpen(null), 140);
            }}
            onToggle={() => setOpen((o) => (o === item.label ? null : item.label))}
          />
        ))}
      </ul>
    </nav>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const current = activeLabel(pathname);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="bg-ink-900 grid size-11 place-items-center rounded-lg text-white lg:hidden"
        aria-label="Abrir menu"
        aria-haspopup="dialog"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-sm bg-white p-0 backdrop:bg-black/50 open:flex open:flex-col"
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-neutral-200 px-5">
          <Logo className="w-36" />
          <button type="button" onClick={close} autoFocus className="grid size-11 place-items-center rounded-lg hover:bg-neutral-100" aria-label="Fechar menu">
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Principal (celular)" className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="divide-y divide-neutral-200">
            {mainNav.map((item) => (
              <li key={item.label}>
                {item.groups ? (
                  <details className="group" open={current === item.label}>
                    <summary className="font-display flex cursor-pointer list-none items-center justify-between py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                      <span className={cx(current === item.label && "text-brand-700")}>{item.label}</span>
                      <ChevronDown className="size-5 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="space-y-1 pb-4">
                      <li>
                        <Link href={item.href} onClick={close} className="font-display flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold">
                          Visão geral
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                      </li>
                      {item.groups.flatMap((group) => group.links).map((link) => (
                        <li key={link.href + link.label}>
                          <Link href={link.href} onClick={close} className="hover:bg-paper flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-700">
                            {link.icon && <ServiceIcon icon={link.icon} className="text-brand-700 size-4" />}
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={current === item.label ? "page" : undefined}
                    className={cx("font-display block py-4 text-lg font-bold", current === item.label && "text-brand-700")}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="bg-paper shrink-0 space-y-3 border-t border-neutral-200 p-5">
          <Link href="/contato/" onClick={close} className={buttonClasses("primary", "md", "w-full")}>
            Solicitar orçamento
          </Link>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("dark", "md", "w-full")}>
            <WhatsAppIcon className="size-5" />
            WhatsApp {contact.whatsappLabel}
          </a>
          <div className="flex items-center justify-between pt-1 text-sm text-neutral-600">
            <a href={contact.phones[0].href} className="flex items-center gap-2">
              <Phone className="size-4" aria-hidden="true" />
              {contact.phones[0].label}
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2" aria-label={`E-mail ${contact.email}`}>
              <Mail className="size-4" aria-hidden="true" />
              E-mail
            </a>
          </div>
          <ul className="flex gap-2" aria-label="Redes sociais">
            {social.map((s) => (
              <li key={s.network}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid size-10 place-items-center rounded-full bg-white ring-1 ring-neutral-200">
                  <SocialIcon network={s.network} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cx(
        "sticky top-0 z-40 border-b bg-white transition-shadow",
        scrolled ? "border-transparent shadow-lg shadow-black/5" : "border-neutral-200",
      )}
    >
      <Container className="flex h-20 items-stretch justify-between gap-6 lg:h-22">
        <div className="flex items-center">
          <Logo priority className="w-36 lg:w-44" />
        </div>
        <DesktopNav pathname={pathname} />
        <div className="flex items-center gap-3">
          <Link href="/contato/" className={buttonClasses("primary", "md", "max-xl:hidden")}>
            Solicitar orçamento
          </Link>
          <MobileNav pathname={pathname} />
        </div>
      </Container>
    </header>
  );
}
