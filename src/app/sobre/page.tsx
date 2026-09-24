import Image from "next/image";
import { ArrowUpRight, GraduationCap } from "lucide-react";

import retrato from "@/assets/images/eduardo/retrato-2021.jpg";
import podioEduvoice from "@/assets/images/gallery/formaturas/max-planck-2013-2.jpg";
import { bio, career, clientSegments, education } from "@/content/career";
import { site } from "@/content/site";
import { ButtonLink, Container, JsonLd, Section, SectionHeading } from "@/components/ui/primitives";
import { CareerTimeline, CtaBand, PageHero, StatsBar } from "@/components/sections/blocks";
import { LogoGrid } from "@/components/sections/logos";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sobre",
  description:
    "Conheça a trajetória de Eduardo Rodrigues: jornalista pelo Mackenzie, locutor e docente formado pelo SENAC, com passagens por HBO Brasil, History Channel, TV Band, TV Gazeta e RedeTV.",
  path: "/sobre/",
});

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre"
        title={
          <>
            Mais de 30 anos dando <em className="text-brand-400">voz</em> à comunicação.
          </>
        }
        lead={bio.short}
        image={retrato}
        imageAlt="Eduardo Rodrigues, de jaqueta de couro e braços cruzados, sorrindo"
      />

      <Section tone="light" aria-labelledby="bio-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="bio-titulo" eyebrow="Biografia" title="Do rádio ao palco." />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-stone-700 lg:col-span-8">
            {bio.long.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <blockquote className="border-brand-500 font-display text-ink-900 mt-10 border-l-2 pl-6 text-3xl leading-snug">
              “{bio.mission}”
            </blockquote>
          </div>
        </Container>
      </Section>

      <Section tone="darker" aria-labelledby="trajetoria-titulo">
        <Container>
          <SectionHeading
            dark
            id="trajetoria-titulo"
            eyebrow="Trajetória"
            title="Rádio, TV e sala de aula."
            lead="Emissoras, canais e instituições por onde a voz de Eduardo passou."
          />
          <div className="mt-12">
            <CareerTimeline groups={career} />
          </div>
          <div className="mt-16 border-t border-white/10 pt-14">
            <StatsBar />
          </div>
        </Container>
      </Section>

      <Section tone="sand" aria-labelledby="formacao-titulo">
        <Container>
          <SectionHeading id="formacao-titulo" eyebrow="Formação" title="Técnica, repertório e oratória." />
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {education.map((item) => (
              <li key={item.title} className="rounded-3xl bg-white p-7 ring-1 ring-ink-900/10">
                <GraduationCap className="text-brand-700 size-7" aria-hidden="true" />
                <h3 className="font-display mt-5 text-2xl">{item.title}</h3>
                <p className="mt-1 font-medium text-stone-700">{item.institution}</p>
                {item.detail && <p className="mt-2 text-sm text-stone-500">{item.detail}</p>}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="light" id="clientes" aria-labelledby="clientes-titulo">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                id="clientes-titulo"
                eyebrow="Clientes"
                title="Quem já confiou no trabalho."
                lead="De modo geral, atendo clientes nas seguintes áreas:"
              />
            </div>
            <ul className="grid grid-cols-1 content-end gap-x-8 gap-y-3 sm:grid-cols-2 lg:col-span-7">
              {clientSegments.map((segment) => (
                <li key={segment} className="border-ink-900/10 border-b pb-3 text-lg">
                  {segment}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-14">
            <LogoGrid />
          </div>
        </Container>
      </Section>

      <Section tone="sand" aria-labelledby="eduvoice-titulo">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[3/2] overflow-hidden rounded-3xl">
            <Image
              src={podioEduvoice}
              alt="Eduardo Rodrigues no púlpito com a marca Eduvoice estúdio e produtora"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              id="eduvoice-titulo"
              eyebrow="Produtora"
              title="Eduvoice: estúdio, áudio, vídeo e eventos."
              lead="Além da atuação pessoal, Eduardo dirige a Eduvoice, produtora de áudio, vídeo e eventos com estúdio próprio para gravações."
            />
            <ButtonLink href={site.eduvoiceUrl} variant="outline-light" className="mt-8">
              Conheça a Eduvoice
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <CtaBand />
      <JsonLd data={breadcrumbJsonLd([{ name: "Sobre", path: "/sobre/" }])} />
    </>
  );
}
