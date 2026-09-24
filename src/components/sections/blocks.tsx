import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, GraduationCap, Plus, Quote, Radio, Tv, Users } from "lucide-react";

import { stats } from "@/content/site";
import { serviceHref, type Faq, type Service } from "@/content/services";
import type { CareerGroup } from "@/content/career";
import type { Testimonial } from "@/content/testimonials";
import { galleryCategories, galleryHref } from "@/content/gallery-categories";
import { gallery, galleryCover } from "@/content/gallery";
import { Container } from "@/components/ui/primitives";
import { ServiceIcon } from "@/components/icons/service-icon";
import { cx } from "@/lib/utils";

/** Cartões de serviço com foto, ícone e a descrição original. */
export function ServiceCards({ services, columns = 3 }: { services: Service[]; columns?: 3 | 4 }) {
  return (
    <ul className={cx("grid grid-cols-1 gap-5 sm:grid-cols-2", columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
      {services.map((service) => (
        <li key={service.slug}>
          <Link
            href={serviceHref(service)}
            className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={service.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                placeholder="blur"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="relative flex flex-1 flex-col px-6 pt-10 pb-6">
              <span className="bg-brand-500 text-ink-900 absolute -top-7 left-6 grid size-14 place-items-center rounded-xl shadow-lg">
                <ServiceIcon icon={service.icon} className="size-7" />
              </span>
              <h3 className="font-display text-xl font-extrabold">{service.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-neutral-600">{service.summary}</p>
              <span className="font-display text-ink-900 mt-5 inline-flex items-center gap-2 text-sm font-bold">
                Saiba mais
                <ArrowRight className="text-brand-700 size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Faixa de números sobre uma foto do acervo. */
export function StatsBand({ image, position = "50% 40%" }: { image: StaticImageData; position?: string }) {
  return (
    <section aria-label="Números" className="bg-ink-950 relative isolate overflow-hidden py-16 text-white sm:py-20">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        style={{ "--pos": position } as CSSProperties}
        className="-z-20 object-cover object-(--pos)"
      />
      <div className="bg-ink-950/85 absolute inset-0 -z-10" />
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <dt className="mt-2 text-sm font-bold tracking-wide text-white/80 uppercase">{stat.label}</dt>
              <dd className="font-display text-brand-500 order-first text-5xl font-extrabold sm:text-6xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/** Painel grande com foto de fundo e chamada (Palestras, Cursos...). */
export function ImagePanel({
  href,
  image,
  position = "50% 50%",
  eyebrow,
  title,
  text,
  cta,
  align = "left",
  className,
}: {
  href: string;
  image: StaticImageData;
  position?: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  align?: "left" | "right";
  className?: string;
}) {
  const right = align === "right";
  return (
    <Link
      href={href}
      className={cx(
        "group bg-ink-950 relative isolate flex min-h-[26rem] overflow-hidden rounded-2xl p-8 text-white sm:p-12",
        right ? "justify-end text-right" : "justify-start",
        className,
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        placeholder="blur"
        style={{ "--pos": position } as CSSProperties}
        className="-z-20 object-cover object-(--pos) transition duration-700 group-hover:scale-105"
      />
      <div
        className={cx(
          "from-ink-950/95 via-ink-950/70 absolute inset-0 -z-10 to-transparent",
          right ? "bg-gradient-to-l" : "bg-gradient-to-r",
        )}
      />
      <div className={cx("flex max-w-md flex-col justify-end", right ? "items-end" : "items-start")}>
        <p className="font-display text-brand-400 text-xs font-bold tracking-[0.2em] uppercase">{eyebrow}</p>
        <h3 className="font-display mt-3 text-3xl leading-tight font-extrabold sm:text-4xl">{title}</h3>
        <p className="mt-3 text-white/80">{text}</p>
        <span className="font-display bg-brand-500 text-ink-900 mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold">
          {cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/** As cinco galerias do site antigo, com capa e total de fotos. */
export function GalleryCards() {
  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2">
      {galleryCategories.map((category, index) => {
        const cover = galleryCover(category.slug);
        const count = gallery.filter((p) => p.category === category.slug).length;
        const featured = index === 0;
        return (
          <li key={category.slug} className={cx(featured && "col-span-2 lg:row-span-2")}>
            <Link
              href={galleryHref(category.slug)}
              className={cx(
                "group bg-ink-950 relative isolate flex h-full flex-col justify-end overflow-hidden rounded-xl p-5 text-white",
                featured ? "min-h-[18rem] lg:min-h-[28rem]" : "min-h-[11rem] lg:min-h-0",
              )}
            >
              <Image
                src={cover.src}
                alt=""
                fill
                sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                placeholder="blur"
                className="-z-20 object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="from-ink-950/90 absolute inset-0 -z-10 bg-gradient-to-t via-transparent to-transparent" />
              <p className={cx("font-display font-extrabold", featured ? "text-2xl sm:text-3xl" : "text-lg")}>{category.label}</p>
              <p className="text-sm text-white/80">
                {count} fotos
                <ArrowRight className="text-brand-400 ml-2 inline size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

const careerIcons: Record<string, typeof Radio> = { locutor: Radio, apresentador: Tv, docente: Users };

/** "Trajetória no mercado" e formação, em colunas. */
export function CareerColumns({
  groups,
  education,
}: {
  groups: CareerGroup[];
  education: { title: string; institution: string; detail?: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      <div className="bg-ink-900 rounded-xl p-6 text-white">
        <GraduationCap className="text-brand-500 size-8" aria-hidden="true" />
        <h3 className="font-display mt-4 text-lg font-extrabold">Formação</h3>
        <ul className="mt-4 space-y-3 text-sm">
          {education.map((item) => (
            <li key={item.title}>
              <span className="font-display block font-bold">{item.title}</span>
              <span className="text-white/70">{item.institution}</span>
              {item.detail && <span className="block text-xs text-white/50">{item.detail}</span>}
            </li>
          ))}
        </ul>
      </div>
      {groups.map((group) => {
        const Icon = careerIcons[group.id] ?? Radio;
        return (
          <div key={group.id} className="rounded-xl bg-white p-6 ring-1 ring-black/5">
            <Icon className="text-brand-700 size-8" aria-hidden="true" />
            <h3 className="font-display mt-4 text-lg font-extrabold">{group.title}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {group.items.map((item) => (
                <li key={item.org} className="border-brand-500 border-l-2 pl-3">
                  <span className="font-display block font-bold">{item.org}</span>
                  {item.role && <span className="text-neutral-600">{item.role}</span>}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.question} className="group rounded-xl bg-white ring-1 ring-black/5 open:shadow-md">
          <summary className="font-display flex cursor-pointer list-none items-center justify-between gap-6 p-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
            {item.question}
            <span className="bg-brand-500 text-ink-900 grid size-8 shrink-0 place-items-center rounded-full">
              <Plus className="size-4 transition-transform group-open:rotate-45" aria-hidden="true" />
            </span>
          </summary>
          <p className="-mt-1 px-5 pb-5 leading-relaxed text-neutral-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {items.map((t) => (
        <li key={t.name} className="flex flex-col rounded-xl bg-white p-7 ring-1 ring-black/5">
          <Quote className="text-brand-500 size-8" aria-hidden="true" />
          <blockquote className="mt-4 flex-1 leading-relaxed">“{t.quote}”</blockquote>
          <p className="font-display mt-6 font-bold">{t.name}</p>
          <p className="text-sm text-neutral-600">
            {t.role}
            {t.company && ` · ${t.company}`}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Chamada final com foto de fundo. */
export function CtaBanner({
  image,
  position = "50% 40%",
  eyebrow = "Orçamento",
  title,
  text,
  children,
}: {
  image: StaticImageData;
  position?: string;
  eyebrow?: string;
  title: string;
  text?: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-ink-950 relative isolate overflow-hidden py-20 text-white sm:py-24">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        style={{ "--pos": position } as CSSProperties}
        className="-z-20 object-cover object-(--pos)"
      />
      <div className="bg-ink-950/80 absolute inset-0 -z-10" />
      <Container className="text-center">
        <p className="font-display text-brand-400 text-xs font-bold tracking-[0.2em] uppercase sm:text-sm">{eyebrow}</p>
        <h2 className="font-display mx-auto mt-3 max-w-3xl text-3xl font-extrabold text-balance sm:text-5xl">{title}</h2>
        {text && <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">{text}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>
      </Container>
    </section>
  );
}
