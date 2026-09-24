import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { getService, servicePages } from "@/content/services";
import { SERVICE_OPTIONS } from "@/content/lead-options";
import { demos } from "@/content/demos";
import { videosById } from "@/content/videos";
import { photosIn } from "@/content/gallery";
import { ButtonLink, Container, JsonLd, Section, SectionHeading } from "@/components/ui/primitives";
import { FaqList, PageHero } from "@/components/sections/blocks";
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
  return pageMetadata({ title: service.title, description: service.summary, path: `/servicos/${service.slug}/` });
}

export default async function ServicoPage({ params }: PageProps<"/servicos/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/servicos/${service.slug}/`;
  const videos = videosById(service.videoIds ?? []);
  const photos = service.galleryCategories ? photosIn(...service.galleryCategories).slice(0, 6) : [];
  const formService = SERVICE_OPTIONS.find((option) => option.toLowerCase() === service.title.toLowerCase());
  const whatsappMessage = `Olá, Eduardo! Vim pela página de ${service.title.toLowerCase()} e gostaria de um orçamento.`;

  return (
    <>
      <PageHero eyebrow="Serviços" title={service.title} lead={service.summary} image={service.image} imageAlt={service.imageAlt}>
        <ButtonLink href="#orcamento" size="lg">
          Solicitar orçamento
        </ButtonLink>
        <ButtonLink href={whatsappUrl(whatsappMessage)} variant="outline-dark" size="lg">
          <WhatsAppIcon className="size-5" />
          WhatsApp
        </ButtonLink>
      </PageHero>

      <Section tone="light" aria-labelledby="inclui-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-5 text-lg leading-relaxed text-stone-700 lg:col-span-7">
            {service.intro?.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          {service.includes && (
            <div className="bg-sand-100 rounded-3xl p-8 lg:col-span-5">
              <h2 id="inclui-titulo" className="text-xs font-semibold tracking-[0.18em] text-stone-600 uppercase">
                Para quem e para quê
              </h2>
              <ul className="mt-5 space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="text-brand-700 mt-0.5 size-5 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      {service.demos && (
        <Section tone="darker" aria-labelledby="demos-titulo">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <SectionHeading
                dark
                id="demos-titulo"
                eyebrow="Demos"
                title="Ouça os estilos de voz."
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
        <Section tone={service.demos ? "dark" : "darker"} aria-labelledby="videos-titulo">
          <Container>
            <SectionHeading dark id="videos-titulo" eyebrow="Vídeos" title="Trabalhos em vídeo." />
            <ul className="mt-12 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <li key={video.id}>
                  <YouTubeFacade video={video} />
                  <p className="mt-3 font-medium">{video.title}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {photos.length > 0 && (
        <Section tone="sand" aria-labelledby="fotos-titulo">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading id="fotos-titulo" eyebrow="Fotos" title="Em ação." />
              <ButtonLink
                href={`/portfolio/?tab=fotos&galeria=${service.galleryCategories![0]}`}
                variant="outline-light"
                className="self-start"
              >
                Ver galeria completa
              </ButtonLink>
            </div>
            <div className="mt-12">
              <Gallery photos={photos} filters={false} />
            </div>
          </Container>
        </Section>
      )}

      {service.faq && service.faq.length > 0 && (
        <Section tone="light" aria-labelledby="faq-titulo">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading id="faq-titulo" eyebrow="Dúvidas" title="Perguntas frequentes." />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={service.faq} />
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
              title={`Vamos falar sobre ${service.title.toLowerCase()}?`}
              lead="Envie os detalhes e receba uma proposta personalizada."
            />
          </div>
          <div className="lg:col-span-7">
            <LeadForm tone="dark" defaultService={formService} />
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
