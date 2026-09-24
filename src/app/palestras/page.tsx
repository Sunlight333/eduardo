import { ArrowRight, Building2, MonitorPlay, Users } from "lucide-react";

import heroCongressos from "@/assets/images/hero/realizacao-de-congressos.jpg";
import palcoIbgc from "@/assets/images/eduardo/palco-congresso-ibgc.jpg";
import { talkAudiences, talkFormats, talkPillars } from "@/content/talks";
import { videosById } from "@/content/videos";
import { testimonials } from "@/content/testimonials";
import { ButtonLink, Container, JsonLd, Section, SectionTitle } from "@/components/ui/primitives";
import { PageBanner } from "@/components/sections/page-banner";
import { StatsBand, Testimonials } from "@/components/sections/blocks";
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
const [stageVideo, ...moreVideos] = videosById(["Ws7-vCyzTBw", "r3-w5sm4uTI", "edItHVMONso"]);

export default function PalestrasPage() {
  return (
    <>
      <PageBanner
        image={heroCongressos}
        position="50% 40%"
        align="right"
        eyebrow="Palestrante"
        title="Eduardo Rodrigues no palco do seu evento"
        lead="Oratória, voz e comunicação com quem passou mais de 30 anos entre o microfone, as câmeras e o púlpito."
        crumbs={[{ name: "Palestras", path: "/palestras/" }]}
      >
        <ButtonLink href="#proposta" size="lg">
          Solicitar proposta
          <ArrowRight className="size-5" aria-hidden="true" />
        </ButtonLink>
      </PageBanner>

      <Section tone="white" aria-labelledby="formatos-titulo">
        <Container>
          <SectionTitle id="formatos-titulo" eyebrow="Formatos" title="Qual o formato ideal para a sua empresa?" align="center" />
          <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {talkFormats.map((format, index) => {
              const Icon = formatIcons[index % formatIcons.length];
              return (
                <li key={format.title} className="bg-paper hover:border-brand-500 flex flex-col rounded-2xl border-t-4 border-transparent p-8 transition-colors">
                  <span className="bg-ink-900 text-brand-500 grid size-14 place-items-center rounded-xl">
                    <Icon className="size-7" aria-hidden="true" />
                  </span>
                  <h3 className="font-display mt-6 text-2xl font-extrabold">{format.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-neutral-600">{format.description}</p>
                  <ButtonLink href="#proposta" variant="dark" className="mt-8 self-start">
                    Solicitar proposta
                  </ButtonLink>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section tone="dark" aria-labelledby="palco-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionTitle
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
            <YouTubeFacade video={stageVideo} sizes="(min-width: 1024px) 58vw, 100vw" />
            <div className="mt-5 grid grid-cols-2 gap-5">
              {moreVideos.map((video) => (
                <div key={video.id}>
                  <YouTubeFacade video={video} sizes="(min-width: 1024px) 28vw, 50vw" />
                  <p className="font-display mt-2 text-sm font-bold">{video.title}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <StatsBand image={palcoIbgc} position="30% 40%" />

      <Section tone="paper" aria-labelledby="pilares-titulo">
        <Container>
          <SectionTitle id="pilares-titulo" eyebrow="Pilares de conteúdo" title="Personalize a palestra para a sua estrutura, time e necessidade" />
          <ol className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {talkPillars.map((pillar, index) => (
              <li key={pillar.title} className="rounded-2xl bg-white p-8 ring-1 ring-black/5">
                <span className="font-display bg-brand-500 text-ink-900 grid size-12 place-items-center rounded-full text-lg font-extrabold">
                  {index + 1}
                </span>
                <h3 className="font-display mt-6 text-2xl font-extrabold">{pillar.title}</h3>
                <p className="mt-3 leading-relaxed text-neutral-600">{pillar.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="font-display mr-2 text-sm font-bold">Ideal para:</span>
            {talkAudiences.map((audience) => (
              <span key={audience} className="rounded-full bg-white px-4 py-2 text-sm ring-1 ring-black/10">
                {audience}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <section aria-labelledby="clientes-titulo" className="bg-white py-16 sm:py-20">
        <Container>
          <SectionTitle id="clientes-titulo" eyebrow="Clientes" title="Marcas e instituições que já confiaram no trabalho" align="center" />
        </Container>
        <LogoMarquee className="mt-10" />
      </section>

      {testimonials.length > 0 && (
        <Section tone="paper" aria-labelledby="depoimentos-titulo">
          <Container>
            <SectionTitle id="depoimentos-titulo" eyebrow="Depoimentos" title="Histórias que vão além do palco" align="center" />
            <div className="mt-12">
              <Testimonials items={testimonials} />
            </div>
          </Container>
        </Section>
      )}

      <Section tone="dark" id="proposta" aria-labelledby="proposta-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle
              dark
              id="proposta-titulo"
              eyebrow="Proposta"
              title="Contrate Eduardo Rodrigues para o seu evento"
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
