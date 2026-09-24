import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Check, Clock, MapPin, MonitorPlay, Wallet } from "lucide-react";

import { getCourse, modalities, visibleCourses } from "@/content/courses";
import { contact } from "@/content/site";
import { ButtonLink, Container, JsonLd, Section, SectionTitle } from "@/components/ui/primitives";
import { PageBanner } from "@/components/sections/page-banner";
import { LeadForm } from "@/components/forms/lead-form";
import { breadcrumbJsonLd, courseJsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return visibleCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cursos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    ...pageMetadata({ title: course.title, description: course.summary, path: `/cursos/${course.slug}/` }),
    ...(course.draft && { robots: { index: false, follow: false } }),
  };
}

export default async function CursoPage({ params }: PageProps<"/cursos/[slug]">) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const path = `/cursos/${course.slug}/`;
  const modality = modalities[course.modality];
  const facts = [
    { icon: course.modality === "online" ? MonitorPlay : MapPin, label: "Modalidade", value: modality.title },
    course.workload && { icon: Clock, label: "Carga horária", value: course.workload },
    course.schedule && { icon: CalendarDays, label: "Horários", value: course.schedule },
    course.price && { icon: Wallet, label: "Investimento", value: course.price },
  ].filter((fact): fact is { icon: typeof Clock; label: string; value: string } => Boolean(fact));

  return (
    <>
      {course.draft && (
        <div className="font-display bg-red-600 px-4 py-2 text-center text-sm font-bold text-white">
          Rascunho: conteúdo provisório, visível apenas em desenvolvimento/preview.
        </div>
      )}
      <PageBanner
        image={course.image}
        eyebrow={modality.title}
        title={course.title}
        lead={course.summary}
        crumbs={[
          { name: "Cursos", path: "/cursos/" },
          { name: course.title, path },
        ]}
      >
        {course.checkoutUrl ? (
          <ButtonLink href={course.checkoutUrl} size="lg">
            Inscrever-se
          </ButtonLink>
        ) : (
          <ButtonLink href="#inscricao" size="lg">
            {course.modality === "online" ? "Quero me inscrever" : "Garantir minha vaga"}
          </ButtonLink>
        )}
      </PageBanner>

      <section aria-label="Resumo do curso" className="bg-brand-500 text-ink-900">
        <Container>
          <dl className="grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-start gap-3">
                <fact.icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-display text-xs font-bold tracking-[0.14em] uppercase">{fact.label}</dt>
                  <dd className="mt-1">{fact.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section tone="white" aria-labelledby="para-quem-titulo">
        <Container className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <SectionTitle id="para-quem-titulo" eyebrow="Para quem é" title="Este curso é para você se..." />
            <ul className="mt-8 space-y-3">
              {course.forWhom.map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg">
                  <Check className="text-brand-700 mt-1 size-5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink-900 rounded-2xl p-8 text-white">
            <h2 className="font-display text-brand-400 text-xs font-bold tracking-[0.2em] uppercase">O que você vai conquistar</h2>
            <ul className="mt-6 space-y-3">
              {course.outcomes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="text-brand-500 mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="paper" aria-labelledby="conteudo-titulo">
        <Container>
          <SectionTitle id="conteudo-titulo" eyebrow="Conteúdo" title="O que você vai aprender" />
          <ol className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {course.modules.map((module, index) => (
              <li key={module.title} className="rounded-2xl bg-white p-7 ring-1 ring-black/5">
                <p className="font-display text-brand-700 text-xs font-bold tracking-[0.18em] uppercase">Módulo {index + 1}</p>
                <h3 className="font-display mt-3 text-xl font-extrabold">{module.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {module.topics.map((topic) => (
                    <li key={topic} className="bg-paper rounded-full px-3 py-1 text-sm">
                      {topic}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {course.modality === "presencial" && (
        <Section tone="white" aria-labelledby="turmas-titulo">
          <Container className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            <div>
              <SectionTitle id="turmas-titulo" eyebrow="Turmas" title="Próximas turmas na sede" />
              <ul className="mt-8 space-y-3">
                {course.classes?.map((c) => (
                  <li key={c.label} className="flex items-center gap-3 text-lg">
                    <CalendarDays className="text-brand-700 size-5" aria-hidden="true" />
                    {c.label}
                    {c.seats && <span className="text-sm text-neutral-500">· {c.seats}</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-ink-900 rounded-2xl p-8 text-white">
              <MapPin className="text-brand-500 size-7" aria-hidden="true" />
              <p className="font-display mt-4 text-2xl font-extrabold">Sede — Tucuruvi</p>
              <p className="mt-2 text-white/80">
                {contact.address.street}
                <br />
                {contact.address.neighborhood}, {contact.address.city} – {contact.address.state}, {contact.address.zip}
              </p>
              <ButtonLink href={contact.mapsUrl} variant="outline-light" className="mt-6">
                Como chegar
              </ButtonLink>
            </div>
          </Container>
        </Section>
      )}

      <Section tone="dark" id="inscricao" aria-labelledby="inscricao-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle
              dark
              id="inscricao-titulo"
              eyebrow="Inscrição"
              title={course.modality === "online" ? "Quero fazer este curso" : "Quero garantir minha vaga"}
              lead="Deixe seus dados e receba as informações de inscrição, datas e valores."
            />
          </div>
          <div className="lg:col-span-7">
            <LeadForm
              variant="curso"
              tone="dark"
              defaultService={course.modality === "online" ? "Online" : "Presencial na sede"}
              submitLabel="Enviar"
            />
          </div>
        </Container>
      </Section>

      <JsonLd data={courseJsonLd(course, path)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Cursos", path: "/cursos/" },
          { name: course.title, path },
        ])}
      />
    </>
  );
}
