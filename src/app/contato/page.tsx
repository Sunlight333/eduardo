import { Mail, MapPin, Phone } from "lucide-react";

import { contact, social } from "@/content/site";
import { Container, JsonLd, Section, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/blocks";
import { LeadForm } from "@/components/forms/lead-form";
import { MapFacade } from "@/components/media/map-facade";
import { SocialIcon } from "@/components/icons/social-icon";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Contato",
  description:
    "Solicite um orçamento de locução, mestre de cerimônias, apresentação, celebração, palestra ou curso com Eduardo Rodrigues. WhatsApp, telefone, e-mail e endereço no Tucuruvi, São Paulo.",
  path: "/contato/",
});

export default function ContatoPage() {
  const { address } = contact;
  const channels = [
    { icon: WhatsAppIcon, label: "WhatsApp", value: contact.whatsappLabel, href: whatsappUrl() },
    ...contact.phones.map((p) => ({ icon: Phone, label: "Telefone", value: p.label, href: p.href })),
    { icon: Mail, label: "E-mail", value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos conversar."
        lead="Conte o que você precisa — locução, evento, palestra ou curso — e receba uma proposta personalizada."
      />

      <Section tone="light" className="py-16 sm:py-24" aria-labelledby="form-titulo">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading id="form-titulo" eyebrow="Formulário" title="Solicite seu orçamento." />
            <LeadForm className="mt-10" />
          </div>

          <aside className="space-y-8 lg:col-span-5" aria-label="Outros canais">
            <ul className="divide-ink-900/10 divide-y rounded-3xl bg-white ring-1 ring-ink-900/10">
              {channels.map((channel) => (
                <li key={channel.value}>
                  <a
                    href={channel.href}
                    {...(channel.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    className="hover:bg-sand-100/60 flex items-center gap-4 p-5 transition-colors first:rounded-t-3xl last:rounded-b-3xl"
                  >
                    <span className="bg-ink-950 text-brand-400 grid size-11 shrink-0 place-items-center rounded-full">
                      <channel.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs tracking-[0.14em] text-stone-500 uppercase">{channel.label}</span>
                      <span className="block truncate font-medium">{channel.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div>
              <h2 className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-stone-600 uppercase">
                <MapPin className="size-4" aria-hidden="true" />
                Endereço
              </h2>
              <p className="mt-3 leading-relaxed">
                {address.street}
                <br />
                {address.neighborhood}, {address.city} – {address.state}, {address.zip}
              </p>
            </div>

            <MapFacade />

            <div>
              <h2 className="text-xs font-semibold tracking-[0.18em] text-stone-600 uppercase">Redes sociais</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {social.map((s) => (
                  <li key={s.network}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-ink-900/15 hover:border-ink-900/40 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
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
