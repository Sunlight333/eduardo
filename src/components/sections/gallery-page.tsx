import type { Metadata } from "next";
import Link from "next/link";

import heroEventos from "@/assets/images/hero/eventos-corporativos.jpg";
import { galleryCategories, galleryHref, type GalleryCategory } from "@/content/gallery-categories";
import { galleryCover, photosIn } from "@/content/gallery";
import { ButtonLink, Container, JsonLd, Section } from "@/components/ui/primitives";
import { PageBanner } from "@/components/sections/page-banner";
import { CtaBanner } from "@/components/sections/blocks";
import { Gallery } from "@/components/media/gallery";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { cx, whatsappUrl } from "@/lib/utils";

function category(slug: GalleryCategory) {
  return galleryCategories.find((c) => c.slug === slug)!;
}

export function galleryMetadata(slug: GalleryCategory): Metadata {
  const { label, description } = category(slug);
  return pageMetadata({ title: `Galeria: ${label}`, description: `${description} Fotos de Eduardo Rodrigues.`, path: galleryHref(slug) });
}

/** Páginas das galerias do site antigo (/corporativo/, /formaturas/...). */
export function GalleryPage({ slug }: { slug: GalleryCategory }) {
  const { label, description } = category(slug);
  const photos = photosIn(slug);
  const cover = galleryCover(slug);

  return (
    <>
      <PageBanner
        image={cover.src}
        position="50% 30%"
        eyebrow="Galeria"
        title={label}
        lead={`${description} ${photos.length} fotos.`}
        crumbs={[
          { name: "Portfólio", path: "/portfolio/" },
          { name: label, path: galleryHref(slug) },
        ]}
      />

      <Section tone="white" aria-label={`Fotos: ${label}`}>
        <Container>
          <nav aria-label="Galerias" className="mb-10">
            <ul className="flex flex-wrap gap-2">
              {galleryCategories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={galleryHref(c.slug)}
                    aria-current={c.slug === slug ? "page" : undefined}
                    className={cx(
                      "font-display inline-flex rounded-lg border-2 px-4 py-2 text-sm font-bold transition-colors",
                      c.slug === slug ? "border-ink-900 bg-ink-900 text-white" : "hover:border-ink-900 border-neutral-300",
                    )}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Gallery photos={photos} filters={false} />
        </Container>
      </Section>

      <CtaBanner image={heroEventos} position="60% 40%" title="Vamos fazer o seu evento acontecer?" text="Mestre de cerimônias, apresentação, locução e celebrações.">
        <ButtonLink href="/contato/" size="lg">
          Solicitar orçamento
        </ButtonLink>
        <ButtonLink href={whatsappUrl()} variant="outline-light" size="lg">
          WhatsApp
        </ButtonLink>
      </CtaBanner>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Portfólio", path: "/portfolio/" },
          { name: label, path: galleryHref(slug) },
        ])}
      />
    </>
  );
}
