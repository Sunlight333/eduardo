import { Building2, Clapperboard, Handshake, Megaphone, RadioTower } from "lucide-react";

import seminarioMackenzie from "@/assets/images/gallery/corporativo/seminario-mackenzie-2016.jpg";
import heroEventos from "@/assets/images/hero/eventos-corporativos.jpg";
import { clientSegments, clientsPage } from "@/content/career";
import { clients } from "@/content/clients";
import { ButtonLink, Container, JsonLd, Section, SectionTitle } from "@/components/ui/primitives";
import { PageBanner } from "@/components/sections/page-banner";
import { CtaBanner } from "@/components/sections/blocks";
import { LogoGrid } from "@/components/sections/logos";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Clientes",
  description:
    "Agências de marketing, estúdios, emissoras de rádio e TV, empresas, sindicatos e associações que já contaram com a voz de Eduardo Rodrigues.",
  path: "/clientes/",
});

const segmentIcons = [Megaphone, Clapperboard, RadioTower, Building2, Handshake];

export default function ClientesPage() {
  return (
    <>
      <PageBanner
        image={seminarioMackenzie}
        position="85% 30%"
        eyebrow="Clientes"
        title="Clientes e Parceiros"
        lead={`Mais de ${clients.length} marcas e instituições já contaram com a voz de Eduardo Rodrigues.`}
        crumbs={[{ name: "Clientes", path: "/clientes/" }]}
      />

      <Section tone="white" aria-labelledby="areas-titulo">
        <Container>
          <SectionTitle id="areas-titulo" eyebrow="Áreas de atuação" title={clientsPage.intro} />
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {clientSegments.map((segment, i) => {
              const Icon = segmentIcons[i % segmentIcons.length];
              return (
                <li key={segment} className="bg-paper flex flex-col gap-4 rounded-xl p-6">
                  <span className="bg-brand-500 text-ink-900 grid size-12 place-items-center rounded-lg">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-lg leading-snug font-extrabold">{segment}</span>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section tone="paper" aria-labelledby="logos-titulo">
        <Container>
          <SectionTitle id="logos-titulo" eyebrow="Clientes" title={clientsPage.logosHeading} />
          <div className="mt-12">
            <LogoGrid />
          </div>
        </Container>
      </Section>

      <CtaBanner image={heroEventos} position="60% 40%" title="Sua marca pode ser a próxima." text="Solicite uma proposta para locução, eventos ou palestras.">
        <ButtonLink href="/contato/" size="lg">
          Solicitar orçamento
        </ButtonLink>
        <ButtonLink href={whatsappUrl()} variant="outline-light" size="lg">
          WhatsApp
        </ButtonLink>
      </CtaBanner>

      <JsonLd data={breadcrumbJsonLd([{ name: "Clientes", path: "/clientes/" }])} />
    </>
  );
}
