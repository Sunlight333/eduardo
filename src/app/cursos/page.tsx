import Image from "next/image";
import { MapPin, MonitorPlay } from "lucide-react";

import estudio2007 from "@/assets/images/gallery/estudio/locucao-comercial-2007-3.jpg";
import radio2009 from "@/assets/images/gallery/estudio/locucao-estudio-2009.jpg";
import estudioEduvoice from "@/assets/images/gallery/estudio/eduvoice-2021.jpg";
import { modalities, visibleCourses, type Modality } from "@/content/courses";
import { contact } from "@/content/site";
import { ButtonLink, Container, JsonLd, Section, SectionTitle } from "@/components/ui/primitives";
import { PageBanner } from "@/components/sections/page-banner";
import { FaqList } from "@/components/sections/blocks";
import { CourseCard } from "@/components/sections/course-card";
import { LeadForm } from "@/components/forms/lead-form";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cursos de comunicação",
  description:
    "Cursos online e presenciais de locução, oratória e comunicação com Eduardo Rodrigues, docente do curso de locução do SENAC. Turmas presenciais na sede, no Tucuruvi, São Paulo.",
  path: "/cursos/",
});

const icons: Record<Modality, typeof MonitorPlay> = { online: MonitorPlay, presencial: MapPin };
const trackImages = { online: radio2009, presencial: estudioEduvoice };

// REVISAR: perguntas genéricas até o cliente definir plataforma, formato e valores.
const faq = [
  {
    question: "Preciso ter experiência para começar?",
    answer: "Não. Os cursos partem dos fundamentos e avançam para a prática, respeitando o ritmo de cada aluno.",
  },
  {
    question: "Onde acontecem as aulas presenciais?",
    answer: `Na sede, na ${contact.address.street}, ${contact.address.neighborhood}, zona norte de São Paulo.`,
  },
  {
    question: "Como fico sabendo das próximas turmas?",
    answer: "Deixe seu contato na lista de interesse desta página. Você recebe as datas assim que as inscrições abrirem.",
  },
];

export default function CursosPage() {
  const tracks = (Object.keys(modalities) as Modality[]).map((modality) => ({
    modality,
    ...modalities[modality],
    courses: visibleCourses(modality),
  }));

  return (
    <>
      <PageBanner
        image={estudio2007}
        position="70% 30%"
        eyebrow="Docente Curso de Rádio"
        title="Cursos de comunicação"
        lead="Locução, oratória e condução de eventos com quem é docente do curso profissionalizante de locução do SENAC — online ou em turmas presenciais na sede."
        crumbs={[{ name: "Cursos", path: "/cursos/" }]}
      >
        <ButtonLink href="#online" size="lg">
          Cursos online
        </ButtonLink>
        <ButtonLink href="#presencial" variant="outline-light" size="lg">
          Cursos presenciais
        </ButtonLink>
      </PageBanner>

      {tracks.map((track, index) => {
        const Icon = icons[track.modality];
        return (
          <Section key={track.modality} id={track.modality} tone={index % 2 === 0 ? "white" : "paper"} aria-labelledby={`${track.modality}-titulo`}>
            <Container>
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <span className="bg-brand-500 text-ink-900 grid size-14 place-items-center rounded-xl">
                    <Icon className="size-7" aria-hidden="true" />
                  </span>
                  <SectionTitle id={`${track.modality}-titulo`} title={track.title} lead={track.description} className="mt-6" />
                </div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:col-span-5">
                  <Image src={trackImages[track.modality]} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" placeholder="blur" className="object-cover" />
                </div>
              </div>
              {track.courses.length > 0 ? (
                <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {track.courses.map((course) => (
                    <li key={course.slug}>
                      <CourseCard course={course} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="bg-ink-900 mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl p-8 text-white sm:flex-row sm:items-center sm:p-10">
                  <div>
                    <p className="font-display text-2xl font-extrabold">Novas turmas em breve</p>
                    <p className="mt-1 text-white/75">Entre na lista de interesse e seja avisado quando as inscrições abrirem.</p>
                  </div>
                  <ButtonLink href="#interesse">Entrar na lista</ButtonLink>
                </div>
              )}
            </Container>
          </Section>
        );
      })}

      <Section tone="white" aria-labelledby="faq-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionTitle id="faq-titulo" eyebrow="Dúvidas" title="Perguntas frequentes" />
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faq} />
          </div>
        </Container>
      </Section>

      <Section tone="dark" id="interesse" aria-labelledby="interesse-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle
              dark
              id="interesse-titulo"
              eyebrow="Lista de interesse"
              title="Quero ser avisado das próximas turmas"
              lead="Conte qual curso e modalidade você procura. Você recebe datas, valores e condições assim que as inscrições abrirem."
            />
          </div>
          <div className="lg:col-span-7">
            <LeadForm variant="curso" tone="dark" submitLabel="Quero ser avisado" />
          </div>
        </Container>
      </Section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Cursos", path: "/cursos/" }])} />
    </>
  );
}
