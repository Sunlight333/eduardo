import { Suspense } from "react";

import { demos } from "@/content/demos";
import { videos, type VideoCategory } from "@/content/videos";
import { gallery } from "@/content/gallery";
import { Container, JsonLd, Section } from "@/components/ui/primitives";
import { CtaBand, PageHero } from "@/components/sections/blocks";
import { AudioPlaylist } from "@/components/media/audio-playlist";
import { YouTubeFacade } from "@/components/media/youtube-facade";
import { Gallery, GalleryFromUrl } from "@/components/media/gallery";
import { PortfolioTabs, PortfolioTabsFromUrl, type PortfolioTab } from "@/components/media/portfolio-tabs";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfólio",
  description:
    "Ouça as demos de voz de Eduardo Rodrigues, assista a trabalhos em vídeo e veja fotos de congressos, formaturas, festas e gravações em estúdio.",
  path: "/portfolio/",
});

const videoGroups: VideoCategory[] = ["Eventos", "Publicidade", "Institucional", "Apresentação"];

function VideosPanel() {
  return (
    <div className="space-y-14">
      {videoGroups.map((group) => {
        const items = videos.filter((v) => v.category === group);
        return (
          <section key={group} aria-labelledby={`videos-${group}`}>
            <h2 id={`videos-${group}`} className="font-display text-3xl">
              {group}
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((video) => (
                <li key={video.id}>
                  <YouTubeFacade video={video} />
                  <p className="mt-3 font-medium">{video.title}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function AudioPanel() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <h2 className="font-display text-3xl">Demos de voz</h2>
        <p className="mt-3 leading-relaxed text-stone-600">
          Nove estilos, do repertório completo às locuções para URA e e-learning. Clique para ouvir; só uma faixa toca por vez.
        </p>
      </div>
      <div className="lg:col-span-8">
        <AudioPlaylist demos={demos} />
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const tabs: PortfolioTab[] = [
    { id: "audio", label: "Áudio", count: demos.length, panel: <AudioPanel /> },
    { id: "videos", label: "Vídeos", count: videos.length, panel: <VideosPanel /> },
    {
      id: "fotos",
      label: "Fotos",
      count: gallery.length,
      panel: (
        <Suspense fallback={<Gallery photos={gallery} />}>
          <GalleryFromUrl photos={gallery} />
        </Suspense>
      ),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Portfólio"
        title="Ouça, assista e veja o trabalho."
        lead="Demos de voz, vídeos publicitários e institucionais e fotos de congressos, formaturas, festas e gravações em estúdio."
      />
      <Section tone="light" className="py-14 sm:py-20">
        <Container>
          <Suspense fallback={<PortfolioTabs tabs={tabs} />}>
            <PortfolioTabsFromUrl tabs={tabs} />
          </Suspense>
        </Container>
      </Section>
      <CtaBand title="Gostou do que ouviu?" />
      <JsonLd data={breadcrumbJsonLd([{ name: "Portfólio", path: "/portfolio/" }])} />
    </>
  );
}
