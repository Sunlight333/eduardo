import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import hbo2009 from "@/assets/images/gallery/apresentador/hbo-2009.jpg";
import retratoClassico from "@/assets/images/eduardo/retrato-classico.jpg";
import retrato2021 from "@/assets/images/eduardo/retrato-2021.jpg";
import estudioMicrofone from "@/assets/images/eduardo/estudio-microfone-2021.jpg";
import podioEduvoice from "@/assets/images/gallery/formaturas/max-planck-2013-2.jpg";
import heroEventos from "@/assets/images/hero/eventos-corporativos.jpg";
import { bio, broadcasters, career, education, perfil } from "@/content/career";
import { site } from "@/content/site";
import { ButtonLink, Container, JsonLd, Section, SectionTitle } from "@/components/ui/primitives";
import { PageBanner } from "@/components/sections/page-banner";
import { CareerColumns, CtaBanner, StatsBand } from "@/components/sections/blocks";
import { LogoMarquee } from "@/components/sections/logos";
import congressoAngrad from "@/assets/images/gallery/corporativo/congresso-angrad-sp-2016.jpg";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Sobre",
  description:
    "Conheça Eduardo Rodrigues: jornalista pelo Mackenzie, locutor e docente formado pelo SENAC, com passagens por HBO Brasil, History Channel, TV Band, TV Gazeta e RedeTV.",
  path: "/sobre/",
});

const portraits = [
  { src: retratoClassico, alt: "Retrato de Eduardo Rodrigues de camisa e gravata, com a mão no queixo" },
  { src: estudioMicrofone, alt: "Eduardo Rodrigues sorrindo ao microfone em estúdio" },
  { src: retrato2021, alt: "Eduardo Rodrigues de jaqueta de couro e braços cruzados" },
];

export default function SobrePage() {
  return (
    <>
      <PageBanner
        image={hbo2009}
        position="80% 30%"
        eyebrow="Sobre"
        title="Eduardo Rodrigues"
        lead={bio.short}
        crumbs={[{ name: "Sobre", path: "/sobre/" }]}
      />

      <Section tone="white" aria-labelledby="perfil-titulo">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionTitle id="perfil-titulo" eyebrow={perfil.heading} title="Um profissional versátil e experiente" />
            <p className="mt-6 text-lg leading-relaxed font-bold">{perfil.lead}</p>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-neutral-700">
              {perfil.paragraphs.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Emissoras e instituições">
              {broadcasters.map((name) => (
                <li key={name} className="bg-paper font-display rounded-full px-4 py-2 text-sm font-bold">
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-5">
            {portraits.map((portrait, i) => (
              <div key={portrait.alt} className={i === 0 ? "relative col-span-2 aspect-[4/3] overflow-hidden rounded-2xl" : "relative aspect-square overflow-hidden rounded-2xl"}>
                <Image src={portrait.src} alt={portrait.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" placeholder="blur" className="object-cover object-top" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <section aria-label="Missão" className="bg-brand-500 text-ink-900 py-14">
        <Container>
          <p className="font-display text-xs font-bold tracking-[0.2em] uppercase">Missão</p>
          <blockquote className="font-display mt-3 max-w-4xl text-2xl leading-snug font-extrabold sm:text-3xl">“{perfil.mission}”</blockquote>
        </Container>
      </section>

      <Section tone="paper" id="trajetoria" aria-labelledby="trajetoria-titulo">
        <Container>
          <SectionTitle
            id="trajetoria-titulo"
            eyebrow="Formação e trajetória no mercado"
            title="Rádio, TV e sala de aula"
            lead="Emissoras, canais e instituições por onde a voz de Eduardo Rodrigues passou."
          />
          <div className="mt-12">
            <CareerColumns groups={career} education={education} />
          </div>
        </Container>
      </Section>

      <StatsBand image={congressoAngrad} position="70% 30%" />

      <Section tone="white" aria-labelledby="eduvoice-titulo">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={podioEduvoice}
              alt="Eduardo Rodrigues no púlpito com a marca Eduvoice, estúdio e produtora"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div>
            <SectionTitle
              id="eduvoice-titulo"
              eyebrow="Produtora"
              title="Eduvoice: estúdio e produtora"
              lead="Além da atuação como locutor e mestre de cerimônias, Eduardo possui uma empresa de produção audiovisual e de eventos, com estúdio próprio para gravações."
            />
            <ButtonLink href={site.eduvoiceUrl} variant="dark" className="mt-8">
              Conheça a Eduvoice
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <section aria-label="Clientes" className="bg-paper py-16">
        <Container>
          <SectionTitle eyebrow="Clientes" title="Clientes e Parceiros" align="center" />
        </Container>
        <LogoMarquee className="mt-10" />
      </section>

      <CtaBanner image={heroEventos} position="60% 40%" title="Vamos conversar sobre o seu evento?" text="Locução, condução de eventos, palestras e cursos.">
        <ButtonLink href="/contato/" size="lg">
          Solicitar orçamento
        </ButtonLink>
        <ButtonLink href={whatsappUrl()} variant="outline-light" size="lg">
          WhatsApp
        </ButtonLink>
      </CtaBanner>

      <JsonLd data={breadcrumbJsonLd([{ name: "Sobre", path: "/sobre/" }])} />
    </>
  );
}
