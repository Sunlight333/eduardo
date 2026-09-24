import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { contact, site, social } from "@/content/site";
import { bio } from "@/content/career";
import { mainNav } from "@/content/navigation";
import { services, serviceHref } from "@/content/services";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/icons/social-icon";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { whatsappUrl } from "@/lib/utils";
import { Logo } from "./logo";

function FooterHeading({ children }: { children: string }) {
  return <h2 className="font-display text-sm font-bold tracking-[0.16em] text-white uppercase">{children}</h2>;
}

export function Footer() {
  const year = new Date().getFullYear();
  const { address } = contact;

  return (
    <footer>
      <div className="bg-brand-500 text-ink-900">
        <Container className="flex flex-col items-start justify-between gap-6 py-10 lg:flex-row lg:items-center">
          <div>
            <p className="font-display text-2xl font-extrabold sm:text-3xl">Vamos conversar sobre o seu projeto?</p>
            <p className="mt-1 text-lg">Locução, eventos, palestras e cursos — proposta personalizada.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contato/" variant="dark" size="lg">
              Solicitar orçamento
            </ButtonLink>
            <ButtonLink href={whatsappUrl()} variant="outline" size="lg">
              <WhatsAppIcon className="size-5" />
              WhatsApp
            </ButtonLink>
          </div>
        </Container>
      </div>

      <div className="bg-ink-900 text-white/70">
        <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="w-fit rounded-xl bg-white p-3">
              <Logo className="w-44" />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed">{bio.short}</p>
            <ul className="mt-6 flex gap-2" aria-label="Redes sociais">
              {social.map((s) => (
                <li key={s.network}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (${s.handle})`}
                    className="hover:bg-brand-500 hover:text-ink-900 grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors"
                  >
                    <SocialIcon network={s.network} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-2">
            <FooterHeading>Navegação</FooterHeading>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-400">
                  Início
                </Link>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-brand-400">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/clientes/" className="hover:text-brand-400">
                  Clientes
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <FooterHeading>Serviços</FooterHeading>
            <ul className="mt-5 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={serviceHref(service)} className="hover:text-brand-400">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cursos/" className="hover:text-brand-400">
                  Cursos de comunicação
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>Contato</FooterHeading>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 flex gap-3">
                  <MapPin className="text-brand-500 mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>
                    {address.street}
                    <br />
                    {address.neighborhood}, {address.city} – {address.state}
                    <br />
                    {address.zip}
                  </span>
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="text-brand-500 mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  {contact.phones.map((p, i) => (
                    <span key={p.href}>
                      {i > 0 && " e "}
                      <a href={p.href} className="hover:text-brand-400">
                        {p.label}
                      </a>
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 flex gap-3">
                  <WhatsAppIcon className="text-brand-500 mt-0.5 size-4 shrink-0" />
                  WhatsApp {contact.whatsappLabel}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="text-brand-500 mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span className="flex flex-col gap-1 break-all">
                  {contact.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="hover:text-brand-400">
                      {email}
                    </a>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </Container>

        <div className="border-t border-white/10">
          <Container className="flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Copyright © {year} {site.name}. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/politica-de-privacidade/" className="hover:text-white">
                Política de privacidade
              </Link>
              <a href={site.eduvoiceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                Eduvoice — estúdio e produtora
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </a>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
}
