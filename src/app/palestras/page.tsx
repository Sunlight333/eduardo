import { ArrowRight, Building2, MonitorPlay, Users } from "lucide-react";

import palcoIbgc from "@/assets/images/eduardo/palco-congresso-ibgc.jpg";
import { talkAudiences, talkFormats, talkPillars } from "@/content/talks";
import { featuredVideo } from "@/content/videos";
import { testimonials } from "@/content/testimonials";
import { ButtonLink, Container, JsonLd, Section, SectionHeading } from "@/components/ui/primitives";
import { PageHero, StatsBar, Testimonials } from "@/components/sections/blocks";
import { LogoMarquee } from "@/components/sections/logos";
import { YouTubeFacade } from "@/components/media/youtube-facade";
import { LeadForm } from "@/components/forms/lead-form";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Palestras",
  description:
    "Palestras e workshops de oratória, voz e comunicação com Eduardo Rodrigues, locutor, jornalista e mestre de cerimônias. Formatos presencial, online e in company.",
  path: "/palestras/",
});

const formatIcons = [Users, MonitorPlay, Building2];

export default function PalestrasPage() {
  return (
    <>
      <PageHero
        eyebrow="Palestras e workshops"
        title={
          <>
            Eduardo Rodrigues <em className="text-brand-400">no palco</em> do seu evento.
          </>
        }
        lead="Oratória, voz e comunicação com quem passou mais de 30 anos entre o microfone, as câmeras e o púlpito."
        image={palcoIbgc}
        imageAlt="Eduardo Rodrigues discursando no púlpito do 15º Congresso IBGC"
      >
        <ButtonLink href="#proposta" size="lg">
          Solicitar proposta
          <ArrowRight className="size-5" aria-hidden="true" />
        </ButtonLink>
      </PageHero>

      <Section tone="light" aria-labelledby="formatos-titulo">
        <Container>
          <SectionHeading
            id="formatos-titulo"
            eyebrow="Formatos"
            title="Qual o formato ideal para a sua empresa?"
            align="center"
            className="mx-auto"
          />
          <ul className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
            {talkFormats.map((format, index) => {
              const Icon = formatIcons[index % formatIcons.length];
              return (
                <li key={format.title} className="flex flex-col rounded-3xl bg-white p-8 ring-1 ring-ink-900/10">
                  <span className="bg-ink-950 text-brand-400 grid size-12 place-items-center rounded-2xl">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-display mt-6 text-3xl">{format.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-stone-600">{format.description}</p>
                  <ButtonLink href="#proposta" variant="outline-light" className="mt-8 self-start">
                    Solicitar proposta
                  </ButtonLink>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section tone="darker" aria-labelledby="palco-titulo">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <SectionHeading
                dark
                id="palco-titulo"
                eyebrow="No palco"
                title="O que acontece quando um comunicador de rádio e TV sobe ao palco?"
                lead="Clareza, ritmo e presença — a mesma técnica que conduz congressos e formaturas, aplicada à comunicação da sua equipe."
              />
              <ButtonLink href="#proposta" className="mt-9">
                Contratar palestra
              </ButtonLink>
            </div>
            <div className="lg:col-span-7">
              <YouTubeFacade video={featuredVideo} sizes="(min-width: 1024px) 58vw, 100vw" />
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-14">
            <StatsBar />
          </div>
        </Container>
      </Section>

      <section aria-labelledby="clientes-titulo" className="bg-sand-50 py-16 sm:py-20">
        <Container>
          <h2 id="clientes-titulo" className="font-display text-center text-3xl sm:text-4xl">
            Marcas e instituições que já confiaram no trabalho
          </h2>
        </Container>
        <LogoMarquee className="mt-10" />
      </section>

      <Section tone="sand" aria-labelledby="pilares-titulo">
        <Container>
          <SectionHeading
            id="pilares-titulo"
            eyebrow="Pilares de conteúdo"
            title="Temas personalizados para a sua estrutura, time e necessidade."
          />
          <ol className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
            {talkPillars.map((pillar, index) => (
              <li key={pillar.title} className="rounded-3xl bg-white p-8 ring-1 ring-ink-900/10">
                <span className="font-display text-brand-700 text-5xl">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-6 text-3xl">{pillar.title}</h3>
                <p className="mt-3 leading-relaxed text-stone-600">{pillar.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm font-semibold text-stone-600">Ideal para:</span>
            {talkAudiences.map((audience) => (
              <span key={audience} className="border-ink-900/15 rounded-full border bg-white/70 px-3.5 py-1.5 text-sm">
                {audience}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {testimonials.length > 0 && (
        <Section tone="light" aria-labelledby="depoimentos-titulo">
          <Container>
            <SectionHeading
              id="depoimentos-titulo"
              eyebrow="Depoimentos"
              title="Histórias que vão além do palco."
            />
            <div className="mt-12">
              <Testimonials items={testimonials} />
            </div>
          </Container>
        </Section>
      )}

      <Section tone="darker" id="proposta" aria-labelledby="proposta-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              dark
              id="proposta-titulo"
              eyebrow="Proposta"
              title="Contrate Eduardo Rodrigues para o seu evento."
              lead="Conte o formato, a data e o público. A proposta é montada sob medida para o seu objetivo."
            />
          </div>
          <div className="lg:col-span-7">
            <LeadForm variant="palestra" tone="dark" submitLabel="Solicitar proposta" />
          </div>
        </Container>
      </Section>

      <JsonLd
        data={serviceJsonLd({
          name: "Palestras de comunicação e oratória",
          description: "Palestras e workshops presenciais, online e in company sobre oratória, voz e comunicação.",
          path: "/palestras/",
        })}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Palestras", path: "/palestras/" }])} />
    </>
  );
}
