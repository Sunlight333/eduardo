import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import heroCongressos from "@/assets/images/hero/realizacao-de-congressos.jpg";
import estudio2007 from "@/assets/images/gallery/estudio/locucao-comercial-2007-1.jpg";
import heroLocucao from "@/assets/images/hero/locucao.jpg";
import { servicePages, serviceHref, servicesBanner } from "@/content/services";
import { ButtonLink, Container, JsonLd, Section, SectionTitle } from "@/components/ui/primitives";
import { PageBanner } from "@/components/sections/page-banner";
import { CtaBanner, ImagePanel } from "@/components/sections/blocks";
import { ServiceIcon } from "@/components/icons/service-icon";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { cx, whatsappUrl } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Serviços",
  description:
    "Locutor (spots, vinhetas, institucionais, narrações, chamadas), apresentador, mestre de cerimônias e celebrante. Conheça os serviços de Eduardo Rodrigues.",
  path: "/servicos/",
});

export default function ServicosPage() {
  return (
    <>
      <PageBanner
        image={servicesBanner}
        position="60% 40%"
        eyebrow="Serviços"
        title="Serviços"
        lead="Locução, apresentação, condução de eventos e celebrações — com a experiência de mais de 30 anos em rádio, TV e eventos."
        crumbs={[{ name: "Serviços", path: "/servicos/" }]}
      />

      <Section tone="white" aria-label="Lista de serviços">
        <Container>
          <ul className="space-y-8">
            {servicePages.map((service, index) => (
              <li key={service.slug}>
                <article className="grid grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 lg:grid-cols-2">
                  <div className={cx("relative aspect-[3/2] lg:aspect-auto lg:min-h-[24rem]", index % 2 === 1 && "lg:order-last")}>
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      placeholder="blur"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 sm:p-12">
                    <span className="bg-brand-500 text-ink-900 grid size-14 place-items-center rounded-xl">
                      <ServiceIcon icon={service.icon} className="size-7" />
                    </span>
                    <h2 className="font-display mt-6 text-3xl font-extrabold sm:text-4xl">{service.title}</h2>
                    <p className="mt-3 text-lg leading-relaxed text-neutral-600">{service.summary}</p>
                    {service.includes && (
                      <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {service.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm">
                            <Check className="text-brand-700 mt-0.5 size-4 shrink-0" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href={serviceHref(service)}
                      className="font-display group bg-ink-900 hover:bg-ink-800 mt-8 inline-flex items-center gap-2 self-start rounded-lg px-5 py-3 text-sm font-bold text-white"
                    >
                      Saiba mais sobre {service.title.toLowerCase()}
                      <ArrowRight className="text-brand-500 size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="paper" aria-labelledby="mais-titulo">
        <Container>
          <SectionTitle id="mais-titulo" eyebrow="Também" title="Palestras e cursos" align="center" />
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ImagePanel
              href="/palestras/"
              image={heroCongressos}
              position="39% 50%"
              align="right"
              eyebrow="Palestrante"
              title="Palestras de comunicação"
              text="Oratória, voz e presença de palco para equipes e lideranças."
              cta="Conhecer as palestras"
            />
            <ImagePanel
              href="/cursos/"
              image={estudio2007}
              position="60% 30%"
              eyebrow="Docente de rádio"
              title="Cursos online e presenciais"
              text="Locução, oratória e condução de eventos, com prática de estúdio."
              cta="Ver os cursos"
            />
          </div>
        </Container>
      </Section>

      <CtaBanner image={heroLocucao} position="60% 40%" title="Precisa de uma voz para o seu projeto?" text="Envie os detalhes e receba uma proposta personalizada.">
        <ButtonLink href="/contato/" size="lg">
          Solicitar orçamento
        </ButtonLink>
        <ButtonLink href={whatsappUrl()} variant="outline-light" size="lg">
          WhatsApp
        </ButtonLink>
      </CtaBanner>

      <JsonLd data={breadcrumbJsonLd([{ name: "Serviços", path: "/servicos/" }])} />
    </>
  );
}
