import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { services, serviceHref } from "@/content/services";
import { Container, Eyebrow, JsonLd, Section } from "@/components/ui/primitives";
import { CtaBand, PageHero, ServiceGlyph } from "@/components/sections/blocks";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { cx } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Serviços",
  description:
    "Locução publicitária e voice over, mestre de cerimônias, apresentação, celebração de casamentos e palestras com Eduardo Rodrigues, em São Paulo.",
  path: "/servicos/",
});

export default function ServicosPage() {
  return (
    <>
      <PageHero
        eyebrow="Serviços"
        title="Voz, palco e comunicação para o seu projeto."
        lead="Locução para campanhas e vídeos, condução de eventos acadêmicos e corporativos, apresentação, celebrações e palestras."
      />

      <Section tone="light" className="py-16 sm:py-24">
        <Container>
          <ul className="space-y-6">
            {services.map((service, index) => (
              <li key={service.slug}>
                <article className="grid grid-cols-1 overflow-hidden rounded-3xl bg-white ring-1 ring-ink-900/10 lg:grid-cols-2">
                  <div className={cx("relative aspect-[3/2] lg:aspect-auto lg:min-h-[26rem]", index % 2 === 1 && "lg:order-last")}>
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
                    <span className="bg-sand-100 text-brand-700 grid size-12 place-items-center rounded-2xl">
                      <ServiceGlyph icon={service.icon} className="size-6" />
                    </span>
                    <Eyebrow className="mt-6">{String(index + 1).padStart(2, "0")}</Eyebrow>
                    <h2 className="font-display mt-3 text-4xl sm:text-5xl">{service.title}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-stone-600">{service.summary}</p>
                    {service.includes && (
                      <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {service.includes.slice(0, 6).map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                            <Check className="text-brand-600 mt-0.5 size-4 shrink-0" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href={serviceHref(service)}
                      className="text-ink-900 group mt-8 inline-flex items-center gap-2 self-start font-semibold"
                    >
                      Ver detalhes de {service.title.toLowerCase()}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />
      <JsonLd data={breadcrumbJsonLd([{ name: "Serviços", path: "/servicos/" }])} />
    </>
  );
}
