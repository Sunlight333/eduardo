import hboEstudio from "@/assets/images/gallery/estudio/hbo-brasil-2009.jpg";
import heroLocucao from "@/assets/images/hero/locucao.jpg";
import { demos } from "@/content/demos";
import { videos, type VideoCategory } from "@/content/videos";
import { youtubeChannels } from "@/content/site";
import { ButtonLink, Container, JsonLd, Section, SectionTitle } from "@/components/ui/primitives";
import { PageBanner } from "@/components/sections/page-banner";
import { CtaBanner, GalleryCards } from "@/components/sections/blocks";
import { AudioPlaylist } from "@/components/media/audio-playlist";
import { YouTubeFacade } from "@/components/media/youtube-facade";
import { YouTubeIcon } from "@/components/icons/brand-icons";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Portfólio",
  description:
    "Ouça as 9 demos de voz de Eduardo Rodrigues, assista a 13 trabalhos em vídeo e veja as galerias de fotos de congressos, formaturas, festas e gravações em estúdio.",
  path: "/portfolio/",
});

const videoGroups: VideoCategory[] = ["Eventos", "Publicidade", "Institucional", "Apresentação"];

const jump = [
  { label: "Demos de voz", href: "#demos" },
  { label: "Vídeos", href: "#videos" },
  { label: "Galerias de fotos", href: "#galerias" },
];

export default function PortfolioPage() {
  return (
    <>
      <PageBanner
        image={hboEstudio}
        position="50% 30%"
        eyebrow="Portfólio"
        title="Portfólio"
        lead="Demos de voz, vídeos publicitários, institucionais e de eventos, e as galerias de fotos no palco e no estúdio."
        crumbs={[{ name: "Portfólio", path: "/portfolio/" }]}
      >
        {jump.map((item) => (
          <ButtonLink key={item.href} href={item.href} variant="outline-light" size="sm">
            {item.label}
          </ButtonLink>
        ))}
      </PageBanner>

      <Section tone="paper" id="demos" aria-labelledby="demos-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionTitle
              id="demos-titulo"
              eyebrow="Áudio"
              title="Demos de voz"
              lead="Repertório completo, clássico, jovem varejo, voz natural, chamadas e vinhetas, URA, institucional, e-learning e rádio. Só uma faixa toca por vez."
            />
            <ButtonLink href="/servicos/locucao/" variant="dark" className="mt-8">
              Contratar locução
            </ButtonLink>
          </div>
          <div className="lg:col-span-8">
            <AudioPlaylist demos={demos} />
          </div>
        </Container>
      </Section>

      <Section tone="dark" id="videos" aria-labelledby="videos-titulo">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle dark id="videos-titulo" eyebrow="Vídeos" title={`${videos.length} trabalhos em vídeo`} />
            <ul className="flex flex-wrap gap-2">
              {youtubeChannels.map((channel) => (
                <li key={channel.handle}>
                  <ButtonLink href={channel.href} variant="outline-light" size="sm">
                    <YouTubeIcon className="size-4" />
                    {channel.handle}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 space-y-14">
            {videoGroups.map((group) => (
              <section key={group} aria-labelledby={`videos-${group}`}>
                <h3 id={`videos-${group}`} className="font-display text-brand-400 flex items-center gap-3 text-lg font-extrabold">
                  <span aria-hidden="true" className="bg-brand-500 h-1 w-8 rounded-full" />
                  {group}
                </h3>
                <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {videos
                    .filter((v) => v.category === group)
                    .map((video) => (
                      <li key={video.id}>
                        <YouTubeFacade video={video} />
                        <p className="font-display mt-3 text-sm font-bold">{video.title}</p>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white" id="galerias" aria-labelledby="galerias-titulo">
        <Container>
          <SectionTitle
            id="galerias-titulo"
            eyebrow="Galeria"
            title="Galerias de fotos"
            lead="Corporativo, Eduardo Rodrigues, Estúdio, Festas e Formaturas — as cinco galerias do acervo."
          />
          <div className="mt-12">
            <GalleryCards />
          </div>
        </Container>
      </Section>

      <CtaBanner image={heroLocucao} position="60% 40%" title="Gostou do que ouviu?" text="Solicite um orçamento de locução, evento ou palestra.">
        <ButtonLink href="/contato/" size="lg">
          Solicitar orçamento
        </ButtonLink>
        <ButtonLink href={whatsappUrl()} variant="outline-light" size="lg">
          WhatsApp
        </ButtonLink>
      </CtaBanner>

      <JsonLd data={breadcrumbJsonLd([{ name: "Portfólio", path: "/portfolio/" }])} />
    </>
  );
}
