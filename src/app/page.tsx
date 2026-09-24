import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";

import perfilFoto from "@/assets/images/gallery/corporativo/apresentacao-corporativa-2021.jpg";
import retrato2021 from "@/assets/images/eduardo/retrato-2021.jpg";
import congressoSaude from "@/assets/images/gallery/corporativo/congresso-saude-sao-camilo-2012.jpg";
import heroCongressos from "@/assets/images/hero/realizacao-de-congressos.jpg";
import estudio2007 from "@/assets/images/gallery/estudio/locucao-comercial-2007-1.jpg";
import { contact, site, social } from "@/content/site";
import { career, clientSegments, education, perfil } from "@/content/career";
import { servicePages } from "@/content/services";
import { demos } from "@/content/demos";
import { videos, videosById } from "@/content/videos";
import { heroSlides } from "@/content/home";
import { testimonials } from "@/content/testimonials";
import { ButtonLink, Container, Section, SectionTitle } from "@/components/ui/primitives";
import { HeroSlider } from "@/components/sections/hero-slider";
import { CareerColumns, GalleryCards, ImagePanel, ServiceCards, StatsBand, Testimonials } from "@/components/sections/blocks";
import { LogoMarquee } from "@/components/sections/logos";
import { AudioPlaylist } from "@/components/media/audio-playlist";
import { YouTubeFacade } from "@/components/media/youtube-facade";
import { MapFacade } from "@/components/media/map-facade";
import { LeadForm } from "@/components/forms/lead-form";
import { SocialIcon } from "@/components/icons/social-icon";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { whatsappUrl } from "@/lib/utils";

const homeVideos = videosById(["Ws7-vCyzTBw", "krMKClQyl8w", "r3-w5sm4uTI", "etDKyop-d_E", "TS9bvyK6mPQ", "edItHVMONso"]);

export default function HomePage() {
  const [featured, ...moreVideos] = homeVideos;

  return (
    <>
      <HeroSlider slides={heroSlides} roles={site.roles} />

      <Section tone="paper" id="servicos" aria-labelledby="servicos-titulo">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              id="servicos-titulo"
              eyebrow="Serviços"
              title="Uma voz para cada momento"
              lead="Da gravação em estúdio ao púlpito de uma formatura: locução, condução de eventos, apresentação e celebrações."
            />
            <ButtonLink href="/servicos/" variant="outline" className="self-start lg:self-auto">
              Todos os serviços
            </ButtonLink>
          </div>
          <div className="mt-14">
            <ServiceCards services={servicePages} columns={4} />
          </div>
        </Container>
      </Section>

      <Section tone="white" aria-labelledby="perfil-titulo">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden="true" className="bg-brand-500 absolute -top-4 -left-4 h-2/3 w-2/3 rounded-2xl" />
            <div className="relative aspect-[3/4] w-4/5 overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={perfilFoto}
                alt="Eduardo Rodrigues no púlpito de acrílico, apresentando um evento corporativo"
                fill
                sizes="(min-width: 1024px) 40vw, 80vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <div className="absolute right-0 bottom-0 aspect-[3/4] w-2/5 overflow-hidden rounded-2xl border-8 border-white shadow-2xl">
              <Image
                src={retrato2021}
                alt="Eduardo Rodrigues de braços cruzados, sorrindo"
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                placeholder="blur"
                className="object-cover object-top"
              />
            </div>
            <div className="bg-ink-900 absolute bottom-8 left-4 rounded-xl px-5 py-4 text-white shadow-xl sm:left-8">
              <p className="font-display text-brand-500 text-4xl leading-none font-extrabold">{site.careerYears}</p>
              <p className="mt-1 text-xs font-bold tracking-wide uppercase">anos de carreira</p>
            </div>
          </div>

          <div>
            <SectionTitle id="perfil-titulo" eyebrow={perfil.heading} title="Um profissional versátil e experiente" />
            <p className="text-ink-900 mt-6 text-lg leading-relaxed font-bold">{perfil.lead}</p>
            <div className="mt-4 space-y-4 leading-relaxed text-neutral-700">
              {perfil.paragraphs.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <blockquote className="border-brand-500 bg-paper mt-6 rounded-r-xl border-l-4 p-5 text-neutral-700 italic">
              {perfil.mission}
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/sobre/" variant="dark">
                Conheça a trajetória
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/clientes/" variant="outline">
                Clientes e parceiros
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <StatsBand image={congressoSaude} position="50% 30%" />

      <Section tone="paper" id="demos" aria-labelledby="demos-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionTitle
              id="demos-titulo"
              eyebrow="Portfólio de voz"
              title="Aperte o play e ouça a voz"
              lead="Nove demos, do repertório completo às locuções para URA e e-learning. Escolha o estilo que combina com a sua marca."
            />
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2">
              {demos.map((demo) => (
                <li key={demo.slug} className="flex items-center gap-2 text-sm font-bold">
                  <Check className="text-brand-700 size-4 shrink-0" aria-hidden="true" />
                  {demo.title}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/servicos/locucao/">Orçamento de locução</ButtonLink>
              <ButtonLink href="/portfolio/" variant="outline">
                Portfólio completo
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <AudioPlaylist demos={demos} />
          </div>
        </Container>
      </Section>

      <Section tone="white" aria-labelledby="ensino-titulo">
        <Container>
          <SectionTitle
            id="ensino-titulo"
            eyebrow="Palestras e cursos"
            title="Experiência compartilhada no palco e na sala de aula"
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ImagePanel
              href="/palestras/"
              image={heroCongressos}
              position="39% 50%"
              align="right"
              eyebrow="Palestrante"
              title="Eduardo Rodrigues no palco do seu evento"
              text="Oratória, voz e comunicação para equipes e lideranças, em formato presencial, online ou in company."
              cta="Conhecer as palestras"
            />
            <ImagePanel
              href="/cursos/"
              image={estudio2007}
              position="60% 30%"
              eyebrow="Docente de rádio"
              title="Cursos de comunicação"
              text="Cursos online e turmas presenciais na sede, com a experiência de quem é docente de locução no SENAC."
              cta="Ver os cursos"
            />
          </div>
        </Container>
      </Section>

      <Section tone="paper" aria-labelledby="galeria-titulo">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              id="galeria-titulo"
              eyebrow="Galeria"
              title="No palco, no estúdio e nas celebrações"
              lead="Congressos, formaturas, festas e gravações: mais de 30 fotos de trabalhos realizados."
            />
            <ButtonLink href="/portfolio/#galerias" variant="outline" className="self-start lg:self-auto">
              Todas as galerias
            </ButtonLink>
          </div>
          <div className="mt-12">
            <GalleryCards />
          </div>
        </Container>
      </Section>

      <Section tone="dark" aria-labelledby="videos-titulo">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle dark id="videos-titulo" eyebrow="Vídeos" title="Trabalhos em vídeo" lead={`${videos.length} vídeos de eventos, publicidade, institucionais e apresentação.`} />
            <ButtonLink href="/portfolio/#videos" variant="outline-light" className="self-start lg:self-auto">
              Ver todos os vídeos
            </ButtonLink>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2 lg:row-span-2">
              <YouTubeFacade video={featured} sizes="(min-width: 1024px) 66vw, 100vw" />
              <p className="font-display mt-3 font-bold">{featured.title}</p>
            </div>
            {moreVideos.map((video) => (
              <div key={video.id}>
                <YouTubeFacade video={video} />
                <p className="font-display mt-3 text-sm font-bold">{video.title}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white" aria-labelledby="clientes-titulo" className="overflow-hidden">
        <Container>
          <SectionTitle
            id="clientes-titulo"
            eyebrow="Clientes"
            title="Clientes e Parceiros"
            lead="De modo geral atendo clientes nas seguintes áreas:"
            align="center"
          />
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {clientSegments.map((segment) => (
              <li key={segment} className="bg-paper font-display rounded-full px-4 py-2 text-sm font-bold">
                {segment}
              </li>
            ))}
          </ul>
        </Container>
        <LogoMarquee className="mt-12" />
        <Container className="mt-10 text-center">
          <Link href="/clientes/" className="font-display text-ink-900 decoration-brand-500 inline-flex items-center gap-2 font-bold underline decoration-4 underline-offset-8">
            Ver todos os clientes
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </Section>

      <Section tone="paper" aria-labelledby="trajetoria-titulo">
        <Container>
          <SectionTitle
            id="trajetoria-titulo"
            eyebrow="Formação e trajetória"
            title="Rádio, TV e sala de aula"
            lead="Emissoras, canais e instituições por onde a voz de Eduardo Rodrigues passou."
          />
          <div className="mt-12">
            <CareerColumns groups={career} education={education} />
          </div>
        </Container>
      </Section>

      {testimonials.length > 0 && (
        <Section tone="white" aria-labelledby="depoimentos-titulo">
          <Container>
            <SectionTitle id="depoimentos-titulo" eyebrow="Depoimentos" title="Quem contratou, recomenda" align="center" />
            <div className="mt-12">
              <Testimonials items={testimonials} />
            </div>
          </Container>
        </Section>
      )}

      <Section tone="white" id="orcamento" aria-labelledby="orcamento-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="bg-ink-900 rounded-2xl p-8 text-white">
              <p className="font-display text-brand-400 text-xs font-bold tracking-[0.2em] uppercase">Contato</p>
              <p className="font-display mt-2 text-2xl font-extrabold">Fale com Eduardo</p>
              <ul className="mt-6 space-y-4 text-white/85">
                <li>
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 flex items-center gap-3">
                    <WhatsAppIcon className="text-brand-500 size-5 shrink-0" />
                    WhatsApp {contact.whatsappLabel}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="text-brand-500 mt-0.5 size-5 shrink-0" aria-hidden="true" />
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
                <li className="flex items-start gap-3">
                  <Mail className="text-brand-500 mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  <span className="flex flex-col break-all">
                    {contact.emails.map((email) => (
                      <a key={email} href={`mailto:${email}`} className="hover:text-brand-400">
                        {email}
                      </a>
                    ))}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="text-brand-500 mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  <span>
                    {contact.address.street}
                    <br />
                    {contact.address.neighborhood}, {contact.address.city} – {contact.address.state}, {contact.address.zip}
                  </span>
                </li>
              </ul>
              <ul className="mt-6 flex gap-2" aria-label="Redes sociais">
                {social.map((s) => (
                  <li key={s.network}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="hover:bg-brand-500 hover:text-ink-900 grid size-10 place-items-center rounded-full bg-white/10 transition-colors">
                      <SocialIcon network={s.network} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <MapFacade className="mt-5" />
          </div>
          <div className="lg:col-span-7">
            <SectionTitle
              id="orcamento-titulo"
              eyebrow="Orçamento"
              title="Solicite seu orçamento"
              lead="Conte o que você precisa — locução, evento, palestra ou curso — e receba uma proposta personalizada."
            />
            <LeadForm className="mt-10" />
          </div>
        </Container>
      </Section>
    </>
  );
}
