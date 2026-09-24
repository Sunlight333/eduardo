import { MapPin, MonitorPlay } from "lucide-react";

import locucaoPanoramica from "@/assets/images/eduardo/locucao-estudio-panoramica.jpg";
import { modalities, visibleCourses, type Modality } from "@/content/courses";
import { contact } from "@/content/site";
import { Container, JsonLd, Section, SectionHeading } from "@/components/ui/primitives";
import { FaqList, PageHero } from "@/components/sections/blocks";
import { CourseCard } from "@/components/sections/course-card";
import { LeadForm } from "@/components/forms/lead-form";
import { ButtonLink } from "@/components/ui/primitives";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cursos de comunicação",
  description:
    "Cursos online e presenciais de locução, oratória e comunicação com Eduardo Rodrigues, docente formado pelo SENAC. Turmas presenciais na sede, no Tucuruvi, São Paulo.",
  path: "/cursos/",
});

const icons: Record<Modality, typeof MonitorPlay> = { online: MonitorPlay, presencial: MapPin };

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
    answer: "Deixe seu contato no formulário desta página. Você recebe as datas assim que as inscrições abrirem.",
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
      <PageHero
        eyebrow="Cursos"
        title={
          <>
            Aprenda comunicação com quem vive <em className="text-brand-400">o microfone</em>.
          </>
        }
        lead="Locução, oratória e condução de eventos, em cursos online ou em turmas presenciais na sede, com a experiência de um docente formado pelo SENAC."
        image={locucaoPanoramica}
        imageAlt="Eduardo Rodrigues gravando em estúdio com fones de ouvido"
      >
        <ButtonLink href="#online" size="lg">
          Cursos online
        </ButtonLink>
        <ButtonLink href="#presencial" variant="outline-dark" size="lg">
          Turmas presenciais
        </ButtonLink>
      </PageHero>

      {tracks.map((track, index) => {
        const Icon = icons[track.modality];
        return (
          <Section key={track.modality} id={track.modality} tone={index % 2 === 0 ? "light" : "sand"} aria-labelledby={`${track.modality}-titulo`}>
            <Container>
              <div className="flex items-start gap-5">
                <span className="bg-ink-950 text-brand-400 hidden size-14 shrink-0 place-items-center rounded-2xl sm:grid">
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <SectionHeading id={`${track.modality}-titulo`} title={track.title} lead={track.description} />
              </div>
              {track.courses.length > 0 ? (
                <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {track.courses.map((course) => (
                    <li key={course.slug}>
                      <CourseCard course={course} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="border-ink-900/20 mt-12 rounded-3xl border border-dashed p-8 sm:p-10">
                  <p className="font-display text-3xl">Novas turmas em breve.</p>
                  <p className="mt-2 max-w-xl text-stone-600">
                    Deixe seu contato na lista de interesse e seja avisado assim que as inscrições abrirem.
                  </p>
                  <ButtonLink href="#interesse" variant="outline-light" className="mt-6">
                    Entrar na lista de interesse
                  </ButtonLink>
                </div>
              )}
            </Container>
          </Section>
        );
      })}

      <Section tone="light" aria-labelledby="faq-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="faq-titulo" eyebrow="Dúvidas" title="Perguntas frequentes." />
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faq} />
          </div>
        </Container>
      </Section>

      <Section tone="darker" id="interesse" aria-labelledby="interesse-titulo">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              dark
              id="interesse-titulo"
              eyebrow="Lista de interesse"
              title="Quero ser avisado das próximas turmas."
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
