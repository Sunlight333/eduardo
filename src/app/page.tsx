import Image from "next/image";
import { ArrowRight, Check, Headphones, Mail, Phone } from "lucide-react";

import retrato from "@/assets/images/eduardo/retrato-2021.jpg";
import estudioMicrofone from "@/assets/images/eduardo/estudio-microfone-2021.jpg";
import palcoIbgc from "@/assets/images/eduardo/palco-congresso-ibgc.jpg";
import locucaoPanoramica from "@/assets/images/eduardo/locucao-estudio-panoramica.jpg";
import { contact, site } from "@/content/site";
import { bio, broadcasters } from "@/content/career";
import { services } from "@/content/services";
import { featuredDemos } from "@/content/demos";
import { featuredVideo } from "@/content/videos";
import { testimonials } from "@/content/testimonials";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { FeatureCard, ServiceCards, StatsBar, Testimonials } from "@/components/sections/blocks";
import { LogoMarquee } from "@/components/sections/logos";
import { RoleRotator } from "@/components/sections/role-rotator";
import { AudioPlaylist } from "@/components/media/audio-playlist";
import { YouTubeFacade } from "@/components/media/youtube-facade";
import { LeadForm } from "@/components/forms/lead-form";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { whatsappUrl } from "@/lib/utils";

const stageHighlights = [
  "15º Congresso IBGC — Anhembi, São Paulo",
  "Congresso Nacional de Saúde São Camilo",
  "Formatura de 500 alunos da UniMAX",
  "Formaturas online e híbridas desde 2020",
];

export default function HomePage() {
  return (
    <>
      <section className="bg-ink-950 relative overflow-hidden text-sand-50">
        <div
          aria-hidden="true"
          className="from-brand-500/15 pointer-events-none absolute -top-32 -right-32 size-[40rem] rounded-full bg-radial to-transparent blur-3xl"
        />
        <Container className="relative grid grid-cols-1 items-center gap-12 pt-12 pb-16 sm:pt-20 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-[0.16em] text-stone-300 uppercase">
              <span aria-hidden="true" className="animate-onair bg-onair size-2 rounded-full" />
              No ar há mais de 30 anos
            </p>
            <h1 className="font-display mt-7 text-[3.25rem] leading-[0.98] text-balance sm:text-7xl xl:text-[5.25rem]">
              Eduardo Rodrigues, <em className="text-brand-400">a voz</em> da sua marca e do seu evento.
            </h1>
            <p className="mt-7 flex flex-wrap items-baseline gap-x-2 text-xl text-stone-300 sm:text-2xl">
              <span>Especialista em</span>
              <RoleRotator roles={site.roles} />
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-stone-400">
              Jornalista pelo Mackenzie, locutor e docente formado pelo SENAC, com trabalhos para HBO Brasil, History
              Channel, TV Band, TV Gazeta e RedeTV.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contato/" size="lg">
                Solicitar orçamento
                <ArrowRight className="size-5" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="#demos" variant="outline-dark" size="lg">
                <Headphones className="size-5" aria-hidden="true" />
                Ouvir demos
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
              <Image
                src={retrato}
                alt="Eduardo Rodrigues, de jaqueta de couro e braços cruzados, sorrindo"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 448px) 448px, 100vw"
                placeholder="blur"
                className="object-cover object-[50%_20%]"
              />
              <div aria-hidden="true" className="from-ink-950/70 absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" />
            </div>
            <div className="bg-ink-900/90 absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 shadow-xl backdrop-blur sm:-left-6">
              <span className="bg-brand-500 text-ink-950 grid size-10 place-items-center rounded-full">
                <Headphones className="size-5" aria-hidden="true" />
              </span>
              <div className="text-sm leading-tight">
                <p className="font-semibold">Locução · Eventos · Cursos</p>
                <p className="text-stone-400">Sede no Tucuruvi, São Paulo</p>
              </div>
            </div>
          </div>
        </Container>

        <Container className="relative">
          <div className="border-t border-white/10 py-14">
            <StatsBar />
          </div>
        </Container>
      </section>

      <section aria-label="Clientes" className="bg-sand-50 py-16 sm:py-20">
        <Container>
          <p className="text-center text-xs font-semibold tracking-[0.18em] text-stone-500 uppercase">
            Marcas e instituições que já confiaram no trabalho
          </p>
        </Container>
        <LogoMarquee className="mt-8" />
      </section>

      <Section tone="sand" aria-labelledby="servicos-titulo">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="servicos-titulo"
              eyebrow="O que eu faço"
              title="Uma voz, muitos palcos."
              lead="Da gravação em estúdio ao púlpito de uma formatura: cinco formas de levar a sua mensagem com credibilidade."
            />
            <ButtonLink href="/servicos/" variant="outline-light" className="self-start lg:self-auto">
              Todos os serviços
            </ButtonLink>
          </div>
          <div className="mt-12">
            <ServiceCards services={services} />
          </div>
        </Container>
      </Section>

      <Section tone="darker" id="demos" aria-labelledby="demos-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              dark
              id="demos-titulo"
              eyebrow="Demos de voz"
              title={
                <>
                  Aperte o play e <em className="text-brand-400">ouça a voz</em>.
                </>
              }
              lead="Do clássico ao jovem varejo, passando por institucional, e-learning e URA. Escolha o estilo que combina com a sua marca."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/portfolio/" variant="outline-dark">
                Portfólio completo
              </ButtonLink>
              <ButtonLink href="/servicos/locucao/" variant="ghost-dark">
                Sobre locução
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <AudioPlaylist demos={featuredDemos} />
          </div>
        </Container>
      </Section>

      <Section tone="light" aria-labelledby="ensino-titulo">
        <Container>
          <SectionHeading
            id="ensino-titulo"
            eyebrow="Ensinar e inspirar"
            title="Palestras e cursos de comunicação."
            lead="Mais de 30 anos ao microfone, compartilhados com equipes, lideranças e novos profissionais."
          />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FeatureCard
              href="/palestras/"
              image={palcoIbgc}
              eyebrow="Palestras"
              title="Eduardo Rodrigues no palco do seu evento."
              text="Oratória, voz e comunicação para equipes e lideranças, em formato presencial, online ou in company."
              cta="Conhecer as palestras"
            />
            <FeatureCard
              href="/cursos/"
              image={locucaoPanoramica}
              eyebrow="Cursos"
              title="Aprenda com quem vive o microfone."
              text="Cursos online e turmas presenciais na sede, no Tucuruvi, com prática de estúdio."
              cta="Ver os cursos"
            />
          </div>
        </Container>
      </Section>

      <Section tone="dark" aria-labelledby="palco-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              dark
              id="palco-titulo"
              eyebrow="No palco"
              title="Condução segura, do protocolo ao encerramento."
              lead="Formaturas, congressos e premiações conduzidos com elegância e ritmo. Veja um trecho."
            />
            <ul className="mt-8 space-y-3">
              {stageHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-stone-300">
                  <Check className="text-brand-400 mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/servicos/mestre-de-cerimonias/" variant="outline-dark" className="mt-9">
              Mestre de cerimônias
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <div className="lg:col-span-7">
            <YouTubeFacade video={featuredVideo} sizes="(min-width: 1024px) 58vw, 100vw" />
            <p className="mt-3 text-sm text-stone-500">{featuredVideo.title}</p>
          </div>
        </Container>
      </Section>

      <Section tone="sand" aria-labelledby="sobre-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="relative aspect-[8/7] overflow-hidden rounded-3xl lg:col-span-5">
            <Image
              src={estudioMicrofone}
              alt="Eduardo Rodrigues sorrindo ao microfone em estúdio"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-7">
            <SectionHeading id="sobre-titulo" eyebrow="Sobre" title="Uma carreira entre o estúdio e o palco." />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone-700">
              {bio.long.slice(0, 2).map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Emissoras e instituições">
              {broadcasters.map((name) => (
                <li key={name} className="border-ink-900/15 rounded-full border bg-white/60 px-3.5 py-1.5 text-sm font-medium">
                  {name}
                </li>
              ))}
            </ul>
            <ButtonLink href="/sobre/" variant="outline-light" className="mt-9">
              Conheça a trajetória
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {testimonials.length > 0 && (
        <Section tone="light" aria-labelledby="depoimentos-titulo">
          <Container>
            <SectionHeading id="depoimentos-titulo" eyebrow="Depoimentos" title="Quem contratou, recomenda." />
            <div className="mt-12">
              <Testimonials items={testimonials} />
            </div>
          </Container>
        </Section>
      )}

      <Section tone="darker" id="orcamento" aria-labelledby="orcamento-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              dark
              id="orcamento-titulo"
              eyebrow="Orçamento"
              title="Vamos conversar sobre o seu projeto?"
              lead="Conte o que você precisa e receba uma proposta personalizada. Se preferir, chame direto no WhatsApp."
            />
            <ul className="mt-9 space-y-4 text-stone-300">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-sand-50">
                  <WhatsAppIcon className="text-brand-400 size-5" />
                  {contact.whatsappLabel}
                </a>
              </li>
              <li>
                <a href={contact.phones[0].href} className="flex items-center gap-3 hover:text-sand-50">
                  <Phone className="text-brand-400 size-5" aria-hidden="true" />
                  {contact.phones[0].label}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all hover:text-sand-50">
                  <Mail className="text-brand-400 size-5 shrink-0" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <LeadForm tone="dark" />
          </div>
        </Container>
      </Section>
    </>
  );
}
