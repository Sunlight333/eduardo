import type { StaticImageData } from "next/image";

import estudioMicrofone from "@/assets/images/eduardo/estudio-microfone-2021.jpg";
import palcoIbgc from "@/assets/images/eduardo/palco-congresso-ibgc.jpg";
import locucaoPanoramica from "@/assets/images/eduardo/locucao-estudio-panoramica.jpg";
import podioFormatura from "@/assets/images/gallery/formaturas/max-planck-2013-2.jpg";

export type Modality = "online" | "presencial";

export type Course = {
  slug: string;
  title: string;
  modality: Modality;
  /**
   * Rascunhos aparecem apenas em desenvolvimento ou com SHOW_DRAFTS=true.
   * Troque para false quando o cliente aprovar o conteúdo real.
   */
  draft: boolean;
  summary: string;
  image: StaticImageData;
  imageAlt: string;
  forWhom: string[];
  outcomes: string[];
  modules: { title: string; topics: string[] }[];
  workload?: string;
  schedule?: string;
  /** Próximas turmas (presencial). */
  classes?: { label: string; seats?: string }[];
  price?: string;
  /** Link de checkout na plataforma do curso online (Hotmart, Eduzz, Kiwify...). */
  checkoutUrl?: string;
};

export const modalities: Record<Modality, { title: string; description: string }> = {
  online: {
    title: "Cursos online",
    description: "Aulas gravadas para estudar no seu ritmo, de qualquer lugar, com exercícios práticos de voz e apresentação.",
  },
  presencial: {
    title: "Cursos presenciais na sede",
    description:
      "Turmas pequenas no estúdio da sede, no Tucuruvi (zona norte de São Paulo), com prática ao microfone e feedback individual.",
  },
};

// REVISAR: TODOS os cursos abaixo são RASCUNHOS de estrutura — títulos, ementas,
// cargas horárias e valores precisam vir do cliente (item 5 e 6 do plano).
export const courses: Course[] = [
  {
    slug: "locucao-profissional-online",
    title: "Locução profissional",
    modality: "online",
    draft: true,
    summary: "Do aquecimento vocal à gravação do primeiro spot: fundamentos da locução publicitária para começar a atuar.",
    image: locucaoPanoramica,
    imageAlt: "Eduardo Rodrigues gravando em estúdio com fones de ouvido",
    forWhom: ["Iniciantes que querem trabalhar com locução", "Profissionais de comunicação que usam a voz"],
    outcomes: ["Técnica de respiração e dicção", "Interpretação de texto publicitário", "Gravação caseira com qualidade"],
    modules: [
      { title: "A voz como instrumento", topics: ["Respiração", "Aquecimento", "Dicção"] },
      { title: "Interpretação", topics: ["Leitura de roteiro", "Ritmo e pausas", "Estilos de locução"] },
      { title: "Mercado", topics: ["Portfólio de demos", "Como se apresentar a produtoras"] },
    ],
    workload: "A definir",
    price: "A definir",
  },
  {
    slug: "oratoria-para-apresentacoes-online",
    title: "Oratória para apresentações",
    modality: "online",
    draft: true,
    summary: "Estruture e conduza apresentações com segurança, em reuniões, vídeos e eventos.",
    image: palcoIbgc,
    imageAlt: "Eduardo Rodrigues discursando no púlpito de um congresso",
    forWhom: ["Profissionais que apresentam para clientes e equipes", "Líderes e empreendedores"],
    outcomes: ["Roteiro de apresentação", "Controle do nervosismo", "Presença diante da câmera e do público"],
    modules: [
      { title: "Planejamento da fala", topics: ["Objetivo", "Estrutura", "Abertura e fechamento"] },
      { title: "Presença", topics: ["Postura", "Gestos", "Voz"] },
    ],
    workload: "A definir",
    price: "A definir",
  },
  {
    slug: "curso-de-locucao-presencial",
    title: "Curso de locução — turma presencial",
    modality: "presencial",
    draft: true,
    summary: "Prática no estúdio da sede com correção individual a cada exercício.",
    image: estudioMicrofone,
    imageAlt: "Eduardo Rodrigues diante do microfone no estúdio",
    forWhom: ["Quem quer se profissionalizar em locução", "Radialistas em formação"],
    outcomes: ["Gravações de demo ao final do curso", "Técnica vocal aplicada", "Noções de mercado"],
    modules: [
      { title: "Técnica vocal", topics: ["Respiração", "Articulação", "Projeção"] },
      { title: "Estúdio", topics: ["Postura ao microfone", "Gravação", "Direção de locução"] },
    ],
    workload: "A definir",
    schedule: "A definir",
    classes: [{ label: "Próxima turma: a definir" }],
    price: "A definir",
  },
  {
    slug: "mestre-de-cerimonias-na-pratica",
    title: "Mestre de cerimônias na prática",
    modality: "presencial",
    draft: true,
    summary: "Protocolo, roteiro e condução de formaturas e eventos corporativos.",
    image: podioFormatura,
    imageAlt: "Eduardo Rodrigues conduzindo uma formatura no púlpito",
    forWhom: ["Apresentadores e locutores", "Profissionais de eventos e cerimonial"],
    outcomes: ["Leitura de roteiro e nominata", "Protocolo de mesa", "Improviso e gestão de imprevistos"],
    modules: [
      { title: "Cerimonial", topics: ["Protocolo", "Composição de mesa", "Hinos e homenagens"] },
      { title: "Condução", topics: ["Roteiro", "Tempo de palco", "Imprevistos"] },
    ],
    workload: "A definir",
    schedule: "A definir",
    classes: [{ label: "Próxima turma: a definir" }],
    price: "A definir",
  },
];

export const showDrafts = process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "true";

export function visibleCourses(modality?: Modality): Course[] {
  return courses.filter((c) => (showDrafts || !c.draft) && (!modality || c.modality === modality));
}

export function getCourse(slug: string): Course | undefined {
  return visibleCourses().find((c) => c.slug === slug);
}
