import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, HeartHandshake, MicVocal, Plus, Podium, Presentation, Quote, Tv } from "lucide-react";

import { stats } from "@/content/site";
import { serviceHref, type Faq, type Service, type ServiceIcon } from "@/content/services";
import type { CareerGroup } from "@/content/career";
import type { Testimonial } from "@/content/testimonials";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { cx, whatsappUrl } from "@/lib/utils";

const serviceIcons: Record<ServiceIcon, typeof MicVocal> = {
  mic: MicVocal,
  stage: Podium,
  tv: Tv,
  rings: HeartHandshake,
  presentation: Presentation,
};

export function ServiceGlyph({ icon, className }: { icon: ServiceIcon; className?: string }) {
  const Icon = serviceIcons[icon];
  return <Icon className={className} aria-hidden="true" />;
}

export function StatsBar({ dark = true }: { dark?: boolean }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className={cx("flex flex-col border-l pl-5", dark ? "border-white/15" : "border-ink-900/15")}>
          <dt className={cx("text-sm leading-snug", dark ? "text-stone-400" : "text-stone-600")}>{stat.label}</dt>
          <dd className={cx("font-display order-first text-5xl sm:text-6xl", dark ? "text-sand-50" : "text-ink-950")}>
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ServiceCards({ services }: { services: Service[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <li key={service.slug} className={cx(index === 0 && "lg:row-span-2")}>
          <Link
            href={serviceHref(service)}
            className="group hover:border-ink-900/25 relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/10 bg-white transition-shadow hover:shadow-xl hover:shadow-ink-900/5"
          >
            {index === 0 && (
              <div className="relative aspect-[4/3] lg:aspect-auto lg:flex-1">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-7">
              <span className="bg-sand-100 text-brand-700 grid size-12 place-items-center rounded-2xl">
                <ServiceGlyph icon={service.icon} className="size-6" />
              </span>
              <h3 className="font-display mt-6 text-3xl">{service.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-stone-600">{service.summary}</p>
              <span className="text-ink-900 mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                Saiba mais
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FeatureCard({
  href,
  image,
  eyebrow,
  title,
  text,
  cta,
}: {
  href: string;
  image: StaticImageData;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
}) {
  return (
    <Link href={href} className="group bg-ink-950 relative flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-3xl p-8 text-sand-50 sm:p-10">
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        placeholder="blur"
        className="object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-60"
      />
      <div aria-hidden="true" className="from-ink-950 via-ink-950/70 absolute inset-0 bg-gradient-to-t to-transparent" />
      <div className="relative">
        <Eyebrow dark>{eyebrow}</Eyebrow>
        <h3 className="font-display mt-4 max-w-md text-4xl leading-[1.05] text-balance">{title}</h3>
        <p className="mt-3 max-w-md text-stone-300">{text}</p>
        <span className="text-brand-400 mt-6 inline-flex items-center gap-2 font-semibold">
          {cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function CtaBand({
  title = "Vamos dar voz ao seu projeto?",
  lead = "Conte o que você precisa — locução, evento, palestra ou curso — e receba uma proposta personalizada.",
  whatsappMessage,
}: {
  title?: string;
  lead?: string;
  whatsappMessage?: string;
}) {
  return (
    <section className="bg-ink-950 relative overflow-hidden text-sand-50">
      <div
        aria-hidden="true"
        className="from-brand-500/20 pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-radial to-transparent blur-3xl"
      />
      <Container className="relative py-20 text-center sm:py-24">
        <h2 className="font-display mx-auto max-w-3xl text-4xl leading-[1.05] text-balance sm:text-6xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-stone-300">{lead}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contato/" size="lg">
            Solicitar orçamento
          </ButtonLink>
          <ButtonLink href={whatsappUrl(whatsappMessage)} variant="outline-dark" size="lg">
            <WhatsAppIcon className="size-5" />
            Chamar no WhatsApp
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

export function FaqList({ items, dark = false }: { items: Faq[]; dark?: boolean }) {
  return (
    <div className={cx("divide-y border-y", dark ? "divide-white/10 border-white/10" : "divide-ink-900/10 border-ink-900/10")}>
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
            {item.question}
            <Plus className="size-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className={cx("mt-3 max-w-3xl leading-relaxed", dark ? "text-stone-300" : "text-stone-600")}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function CareerTimeline({ groups }: { groups: CareerGroup[] }) {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {groups.map((group) => (
        <li key={group.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <h3 className="text-brand-400 text-xs font-semibold tracking-[0.18em] uppercase">{group.title}</h3>
          <ul className="mt-5 space-y-3">
            {group.items.map((item) => (
              <li key={item.org} className="flex flex-col">
                <span className="font-display text-2xl">{item.org}</span>
                {item.role && <span className="text-sm text-stone-400">{item.role}</span>}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

export function Testimonials({ items, dark = false }: { items: Testimonial[]; dark?: boolean }) {
  if (items.length === 0) return null;
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((t) => (
        <li
          key={t.name}
          className={cx("flex flex-col rounded-3xl p-7", dark ? "bg-white/[0.04] text-sand-50" : "bg-white ring-1 ring-ink-900/10")}
        >
          <Quote className="text-brand-500 size-7" aria-hidden="true" />
          <blockquote className="mt-4 flex-1 leading-relaxed">“{t.quote}”</blockquote>
          <p className="mt-6 font-semibold">{t.name}</p>
          <p className={cx("text-sm", dark ? "text-stone-400" : "text-stone-600")}>
            {t.role}
            {t.company && ` · ${t.company}`}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  image?: StaticImageData;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-ink-950 relative overflow-hidden text-sand-50">
      <Container className={cx("relative grid grid-cols-1 items-center gap-10 py-16 sm:py-24", image && "lg:grid-cols-12")}>
        <div className={cx(image && "lg:col-span-7")}>
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="font-display mt-5 text-5xl leading-[1.02] text-balance sm:text-7xl">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-300 sm:text-xl">{lead}</p>}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-5">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" placeholder="blur" className="object-cover" />
          </div>
        )}
      </Container>
    </section>
  );
}
