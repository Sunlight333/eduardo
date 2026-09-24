import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { getService, servicePages, serviceHref } from "@/content/services";
import { SERVICE_OPTION_BY_SLUG } from "@/content/lead-options";
import { demos } from "@/content/demos";
import { videosById } from "@/content/videos";
import { photosIn } from "@/content/gallery";
import { galleryCategories, galleryHref } from "@/content/gallery-categories";
import { ButtonLink, Container, JsonLd, Section, SectionTitle } from "@/components/ui/primitives";
import { PageBanner } from "@/components/sections/page-banner";
import { FaqList, ServiceCards } from "@/components/sections/blocks";
import { AudioPlaylist } from "@/components/media/audio-playlist";
import { YouTubeFacade } from "@/components/media/youtube-facade";
import { Gallery } from "@/components/media/gallery";
import { LeadForm } from "@/components/forms/lead-form";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { whatsappUrl } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.summary, path: serviceHref(service) });
}

export default async function ServicoPage({ params }: PageProps<"/servicos/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = serviceHref(service);
  const videos = videosById(service.videoIds ?? []);
  const photos = service.galleryCategories ? photosIn(...service.galleryCategories).slice(0, 6) : [];
  const galleries = galleryCategories.filter((c) => service.galleryCategories?.includes(c.slug));
  const whatsappMessage = `Olá, Eduardo! Vim pela página de ${service.title.toLowerCase()} e gostaria de um orçamento.`;
  const others = servicePages.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageBanner
        image={service.banner}
        position={service.bannerPosition}
        eyebrow="Serviços"
        title={service.title}
        lead={service.summary}
        crumbs={[
          { name: "Serviços", path: "/servicos/" },
          { name: service.title, path },
        ]}
      >
        <ButtonLink href="#orcamento" size="lg">
          Solicitar orçamento
        </ButtonLink>
        <ButtonLink href={whatsappUrl(whatsappMessage)} variant="outline-light" size="lg">
          <WhatsAppIcon className="size-5" />
          WhatsApp
        </ButtonLink>
      </PageBanner>

      <Section tone="white" aria-labelledby="inclui-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionTitle eyebrow={service.title} title="Como posso ajudar" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-700">
              {service.intro?.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
          {service.includes && (
            <div className="bg-ink-900 rounded-2xl p-8 text-white lg:col-span-5">
              <h2 id="inclui-titulo" className="font-display text-brand-400 text-xs font-bold tracking-[0.2em] uppercase">
                Para quem e para quê
              </h2>
              <ul className="mt-5 space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="text-brand-500 mt-0.5 size-5 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      {service.demos && (
        <Section tone="paper" id="demos" aria-labelledby="demos-titulo">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <SectionTitle
                id="demos-titulo"
                eyebrow="Demos"
                title="Ouça os estilos de voz"
                lead="Nove demos, do repertório completo às locuções para URA e e-learning."
              />
            </div>
            <div className="lg:col-span-8">
              <AudioPlaylist demos={demos} />
            </div>
          </Container>
        </Section>
      )}

      {videos.length > 0 && (
        <Section tone="dark" aria-labelledby="videos-titulo">
          <Container>
            <SectionTitle dark id="videos-titulo" eyebrow="Vídeos" title="Trabalhos em vídeo" />
            <ul className="mt-12 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <li key={video.id}>
                  <YouTubeFacade video={video} />
                  <p className="font-display mt-3 text-sm font-bold">{video.title}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {photos.length > 0 && (
        <Section tone="white" aria-labelledby="fotos-titulo">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionTitle id="fotos-titulo" eyebrow="Galeria" title="Em ação" />
              <div className="flex flex-wrap gap-2">
                {galleries.map((g) => (
                  <ButtonLink key={g.slug} href={galleryHref(g.slug)} variant="outline" size="sm">
                    Galeria {g.label}
                  </ButtonLink>
                ))}
              </div>
            </div>
            <div className="mt-12">
              <Gallery photos={photos} filters={false} />
            </div>
          </Container>
        </Section>
      )}

      {service.faq && service.faq.length > 0 && (
        <Section tone="paper" aria-labelledby="faq-titulo">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionTitle id="faq-titulo" eyebrow="Dúvidas" title="Perguntas frequentes" />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={service.faq} />
            </div>
          </Container>
        </Section>
      )}

      <Section tone="white" id="orcamento" aria-labelledby="orcamento-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionTitle
              id="orcamento-titulo"
              eyebrow="Orçamento"
              title={`Contrate: ${service.title}`}
              lead="Envie os detalhes do seu projeto e receba uma proposta personalizada."
            />
          </div>
          <div className="lg:col-span-8">
            <LeadForm defaultService={SERVICE_OPTION_BY_SLUG[service.slug]} />
          </div>
        </Container>
      </Section>

      <Section tone="paper" aria-labelledby="outros-titulo">
        <Container>
          <SectionTitle id="outros-titulo" eyebrow="Serviços" title="Conheça também" />
          <div className="mt-12">
            <ServiceCards services={others} />
          </div>
        </Container>
      </Section>

      <JsonLd data={serviceJsonLd({ name: service.title, description: service.summary, path })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Serviços", path: "/servicos/" },
          { name: service.title, path },
        ])}
      />
    </>
  );
}
