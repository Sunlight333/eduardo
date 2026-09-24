import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { contact, nav, site, social } from "@/content/site";
import { bio } from "@/content/career";
import { Container } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/icons/social-icon";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { whatsappUrl } from "@/lib/utils";
import { Wordmark } from "./wordmark";

export function Footer() {
  const year = new Date().getFullYear();
  const { address } = contact;

  return (
    <footer className="bg-ink-950 text-stone-300">
      <Container className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="text-sand-50">
            <Wordmark />
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone-400">{bio.short}</p>
          <ul className="mt-6 flex gap-2" aria-label="Redes sociais">
            {social.map((s) => (
              <li key={s.network}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (${s.handle})`}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-stone-300 transition-colors hover:border-brand-400 hover:text-brand-400"
                >
                  <SocialIcon network={s.network} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-stone-500 uppercase">Navegação</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-sand-50">
                Início
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-sand-50">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-stone-500 uppercase">Contato</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-sand-50">
                <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-brand-400" />
                WhatsApp {contact.whatsappLabel}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
              <span>
                {contact.phones.map((p, i) => (
                  <span key={p.href}>
                    {i > 0 && " · "}
                    <a href={p.href} className="hover:text-sand-50">
                      {p.label}
                    </a>
                  </span>
                ))}
              </span>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-start gap-3 break-all hover:text-sand-50">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-sand-50">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                <span>
                  {address.street}
                  <br />
                  {address.neighborhood}, {address.city} – {address.state}, {address.zip}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/politica-de-privacidade/" className="hover:text-stone-300">
              Política de privacidade
            </Link>
            <a href={site.eduvoiceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-stone-300">
              Conheça a Eduvoice
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
