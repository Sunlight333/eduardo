import type { StaticImageData } from "next/image";

import estudioMicrofone from "@/assets/images/eduardo/estudio-microfone-2021.jpg";
import palcoIbgc from "@/assets/images/eduardo/palco-congresso-ibgc.jpg";
import podioFormatura from "@/assets/images/gallery/formaturas/max-planck-2013-2.jpg";
import apresentador from "@/assets/images/gallery/apresentador/apresentador-2009-1.jpg";
import debutante from "@/assets/images/gallery/festas/debutante-buffet-2008.jpg";
import type { GalleryCategory } from "./gallery";

export type ServiceIcon = "mic" | "stage" | "tv" | "rings" | "presentation";

export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  title: string;
  /** Linha usada em cards e na meta description. */
  summary: string;
  icon: ServiceIcon;
  image: StaticImageData;
  imageAlt: string;
  /** Página própria fora de /servicos (ex.: /palestras). */
  href?: string;
  intro?: string[];
  includes?: string[];
  demos?: boolean;
  videoIds?: string[];
  galleryCategories?: GalleryCategory[];
  faq?: Faq[];
};

const orcamentoFaq: Faq = {
  question: "Como solicito um orçamento?",
  answer:
    "Envie os detalhes pelo formulário desta página ou pelo WhatsApp: tipo de trabalho, data, local e duração. Você recebe uma proposta personalizada para o seu projeto.",
};

// Descrições expandidas a partir da página /servicos do site antigo.
// REVISAR: validar textos e perguntas frequentes com o cliente.
export const services: Service[] = [
  {
    slug: "locucao",
    title: "Locução",
    summary:
      "Spots para rádio e TV, vinhetas, vídeos institucionais, narrações, URA, e-learning, chamadas e programas eleitorais.",
    icon: "mic",
    image: estudioMicrofone,
    imageAlt: "Eduardo Rodrigues sorrindo diante de um microfone em estúdio com espuma acústica",
    intro: [
      "Uma voz versátil, do tom clássico e institucional ao jovem varejo, com a experiência de quem gravou chamadas para HBO Brasil e History Channel.",
      "A gravação é feita em estúdio profissional, com direção de texto e entrega no formato que a sua campanha precisa.",
    ],
    includes: [
      "Spots para rádio e TV",
      "Voice over",
      "Vinhetas e chamadas de programação",
      "Vídeos institucionais",
      "Narrações e documentários",
      "URA e mensagens de espera",
      "E-learning e treinamentos",
      "Programas eleitorais",
    ],
    demos: true,
    videoIds: ["krMKClQyl8w", "Y4i-tsEbEfs", "TS9bvyK6mPQ", "owamRudMUUo", "BoiphAT3epM", "dUQGWjzQr6E"],
    galleryCategories: ["estudio"],
    faq: [
      orcamentoFaq,
      {
        question: "Posso ouvir exemplos antes de contratar?",
        answer:
          "Sim. Nesta página e no portfólio estão demos nos estilos clássico, jovem varejo, voz natural, institucional, e-learning, URA, rádio e chamadas.",
      },
      {
        question: "Você grava a partir do meu roteiro?",
        answer:
          "Sim. O texto é alinhado com você antes da gravação, e ajustes de ritmo, tom e pronúncia fazem parte do processo.",
      },
    ],
  },
  {
    slug: "mestre-de-cerimonias",
    title: "Mestre de cerimônias",
    summary: "Formaturas, congressos, seminários, simpósios, mesas-redondas, painéis e eventos corporativos.",
    icon: "stage",
    image: podioFormatura,
    imageAlt: "Eduardo Rodrigues conduzindo uma colação de grau no púlpito",
    intro: [
      "Condução segura e elegante para eventos acadêmicos e corporativos, do roteiro ao encerramento, com a naturalidade de quem já apresentou congressos no Anhembi, no Expo Center Norte e no Mackenzie.",
      "Atuação alinhada com a produção, respeitando protocolo, tempo de palco e a identidade de cada instituição.",
    ],
    includes: [
      "Colações de grau e formaturas",
      "Congressos e convenções",
      "Seminários e simpósios",
      "Mesas-redondas e painéis",
      "Premiações",
      "Eventos corporativos e lançamentos",
      "Formaturas online e híbridas",
    ],
    videoIds: ["Ws7-vCyzTBw", "r3-w5sm4uTI", "edItHVMONso"],
    galleryCategories: ["corporativo", "formaturas"],
    faq: [
      orcamentoFaq,
      {
        question: "Você participa da preparação do roteiro?",
        answer:
          "Sim. O roteiro, o protocolo e a nominata são revisados com a organização antes do evento para que a condução aconteça sem surpresas.",
      },
      {
        question: "Também conduz eventos online?",
        answer: "Sim, inclusive formaturas online, como a colação de grau da Unifaj transmitida em 2020.",
      },
    ],
  },
  {
    slug: "apresentador",
    title: "Apresentador",
    summary: "Jornalista e entrevistador, com passagens por TV Band, TV Gazeta, RedeTV e Canal Magistral.",
    icon: "tv",
    image: apresentador,
    imageAlt: "Retrato de Eduardo Rodrigues de camisa e gravata",
    intro: [
      "Jornalista formado pelo Mackenzie, Eduardo apresenta programas, entrevistas e reportagens com clareza, ritmo e credibilidade.",
      "Experiência em TV aberta, canais segmentados e produções para web, do programa de varejo ao conteúdo institucional.",
    ],
    includes: [
      "Programas de TV e web",
      "Entrevistas",
      "Reportagens",
      "Programas de varejo",
      "Apresentação de shows e eventos",
    ],
    videoIds: ["etDKyop-d_E", "9ik7DlqQRGk", "KRjqN13hrAM"],
    galleryCategories: ["apresentador"],
    faq: [orcamentoFaq],
  },
  {
    slug: "celebrante",
    title: "Celebrante",
    summary: "Casamentos, bodas, festas de debutante e outras celebrações.",
    icon: "rings",
    image: debutante,
    imageAlt: "Eduardo Rodrigues ao microfone ao lado de uma debutante em festa de 15 anos",
    intro: [
      "Cerimônias conduzidas com emoção e cuidado, construídas a partir da história de cada família.",
      "Da troca de alianças às bodas e festas de 15 anos, cada celebração tem um roteiro personalizado.",
    ],
    includes: ["Casamentos", "Bodas", "Festas de 15 anos", "Cerimônias personalizadas", "Bailes de formatura"],
    galleryCategories: ["festas"],
    faq: [
      orcamentoFaq,
      {
        question: "A cerimônia é personalizada?",
        answer:
          "Sim. Antes do evento há uma conversa com os noivos ou a família para construir um roteiro com a história e o estilo de vocês.",
      },
    ],
  },
  {
    slug: "palestras",
    title: "Palestras",
    summary: "Comunicação, oratória e presença de palco para equipes e lideranças, em formato presencial ou online.",
    icon: "presentation",
    image: palcoIbgc,
    imageAlt: "Eduardo Rodrigues discursando no púlpito do 15º Congresso IBGC",
    href: "/palestras/",
  },
];

export const servicePages = services.filter((s) => !s.href);

export function serviceHref(service: Service): string {
  return service.href ?? `/servicos/${service.slug}/`;
}

export function getService(slug: string): Service | undefined {
  return servicePages.find((s) => s.slug === slug);
}
