import { Mail, MapPin, Phone } from "lucide-react";

import { contact, social } from "@/content/site";
import { Container } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/icons/social-icon";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { whatsappUrl } from "@/lib/utils";

/** Barra de contato do topo, como no site antigo (endereço, telefones e redes). */
export function TopBar() {
  const { address } = contact;
  return (
    <div className="bg-ink-900 hidden text-[13px] text-white/75 md:block">
      <Container className="flex h-10 items-center justify-between gap-6">
        <ul className="flex items-center gap-6">
          <li className="hidden items-center gap-2 xl:flex">
            <MapPin className="text-brand-500 size-3.5" aria-hidden="true" />
            {address.street} · {address.neighborhood}, {address.city} – {address.state}
          </li>
          <li>
            <a href={contact.phones[0].href} className="flex items-center gap-2 hover:text-white">
              <Phone className="text-brand-500 size-3.5" aria-hidden="true" />
              {contact.phones[0].label}
            </a>
          </li>
          <li>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
              <WhatsAppIcon className="text-brand-500 size-3.5" />
              {contact.whatsappLabel}
            </a>
          </li>
          <li className="hidden lg:block">
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="text-brand-500 size-3.5" aria-hidden="true" />
              {contact.email}
            </a>
          </li>
        </ul>
        <ul className="flex items-center gap-1" aria-label="Redes sociais">
          {social.map((s) => (
            <li key={s.network}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="hover:text-brand-500 grid size-8 place-items-center transition-colors"
              >
                <SocialIcon network={s.network} className="size-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
