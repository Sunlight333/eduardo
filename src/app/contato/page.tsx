import { Mail, MapPin, Phone } from "lucide-react";

import radio2009 from "@/assets/images/gallery/estudio/locucao-estudio-2009.jpg";
import { contact, social } from "@/content/site";
import { Container, JsonLd, Section, SectionTitle } from "@/components/ui/primitives";
import { PageBanner } from "@/components/sections/page-banner";
import { LeadForm } from "@/components/forms/lead-form";
import { MapFacade } from "@/components/media/map-facade";
import { SocialIcon } from "@/components/icons/social-icon";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Contato",
  description:
    "Fale com Eduardo Rodrigues: WhatsApp (11) 99615-9398, telefone (11) 2261-2753, e-mail e endereço na Avenida Nova Cantareira, Tucuruvi, São Paulo.",
  path: "/contato/",
});

export default function ContatoPage() {
  const { address } = contact;
  const cards = [
    {
      icon: WhatsAppIcon,
      title: "WhatsApp",
      lines: [{ label: contact.whatsappLabel, href: whatsappUrl() }],
    },
    {
      icon: Phone,
      title: "Telefone",
      lines: contact.phones.map((p) => ({ label: p.label, href: p.href })),
    },
    {
      icon: Mail,
      title: "E-mail",
      lines: contact.emails.map((email) => ({ label: email, href: `mailto:${email}` })),
    },
    {
      icon: MapPin,
      title: "Endereço",
      lines: [
        { label: address.street, href: contact.mapsUrl },
        { label: `${address.neighborhood}, ${address.city} – ${address.state}`, href: contact.mapsUrl },
        { label: address.zip, href: contact.mapsUrl },
      ],
    },
  ];

  return (
    <>
      <PageBanner
        image={radio2009}
        position="55% 30%"
        eyebrow="Contato"
        title="Contato"
        lead="Conte o que você precisa — locução, evento, palestra ou curso — e receba uma proposta personalizada."
        crumbs={[{ name: "Contato", path: "/contato/" }]}
      />

      <section aria-label="Canais de contato" className="bg-paper py-12">
        <Container>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <li key={card.title} className="rounded-xl bg-white p-6 ring-1 ring-black/5">
                <span className="bg-brand-500 text-ink-900 grid size-12 place-items-center rounded-lg">
                  <card.icon className="size-6" aria-hidden="true" />
                </span>
                <h2 className="font-display mt-4 text-lg font-extrabold">{card.title}</h2>
                <ul className="mt-2 space-y-1 text-neutral-700">
                  {card.lines.map((line) => (
                    <li key={line.label} className="break-all">
                      <a
                        href={line.href}
                        {...(line.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                        className="hover:text-ink-900 hover:underline"
                      >
                        {line.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section tone="white" aria-labelledby="form-titulo">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionTitle id="form-titulo" eyebrow="Formulário" title="Solicite seu orçamento" />
            <LeadForm className="mt-10" />
          </div>
          <aside className="space-y-6 lg:col-span-5" aria-label="Mapa e redes sociais">
            <MapFacade eager className="aspect-square sm:aspect-[4/3]" />
            <div>
              <h2 className="font-display text-sm font-bold tracking-[0.16em] uppercase">Redes sociais</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {social.map((s) => (
                  <li key={s.network}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display hover:border-ink-900 inline-flex items-center gap-2 rounded-lg border-2 border-neutral-300 px-4 py-2 text-sm font-bold"
                    >
                      <SocialIcon network={s.network} className="size-4" />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </Section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Contato", path: "/contato/" }])} />
    </>
  );
}
