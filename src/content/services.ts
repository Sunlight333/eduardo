import type { StaticImageData } from "next/image";

import estudioMicrofone from "@/assets/images/eduardo/estudio-microfone-2021.jpg";
import palcoIbgc from "@/assets/images/eduardo/palco-congresso-ibgc.jpg";
import heroLocucao from "@/assets/images/hero/locucao.jpg";
import heroCongressos from "@/assets/images/hero/realizacao-de-congressos.jpg";
import heroEventos from "@/assets/images/hero/eventos-corporativos.jpg";
import podioFormatura from "@/assets/images/gallery/formaturas/max-planck-2013-2.jpg";
import angrad from "@/assets/images/gallery/corporativo/congresso-angrad-sp-2016.jpg";
import apresentador from "@/assets/images/gallery/apresentador/apresentador-2009-1.jpg";
import apresentadorBanner from "@/assets/images/gallery/apresentador/apresentador-2009-2.jpg";
import debutante from "@/assets/images/gallery/festas/debutante-buffet-2008.jpg";
import type { GalleryCategory } from "./gallery-categories";

export type ServiceIcon = "mic" | "stage" | "tv" | "rings" | "presentation";

export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  title: string;
  /** Descrição original da página /servicos/ do site antigo. */
  summary: string;
  /** Linha curta para o menu. */
  navLine: string;
  icon: ServiceIcon;
  image: StaticImageData;
  imageAlt: string;
  /** Imagem larga de fundo do banner da página. */
  banner: StaticImageData;
  /** object-position do banner (onde está o Eduardo na foto). */
  bannerPosition?: string;
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

// REVISAR: textos de apoio (intro, itens e perguntas) foram escritos a partir do
// conteúdo do site antigo e precisam ser validados com o cliente.
export const services: Service[] = [
  {
    slug: "locucao",
    title: "Locutor",
    summary: "Produz spots (rádio e TV), vinhetas, institucionais, narrações, treinamentos, chamadas e programas eleitorais.",
    navLine: "Spots, voice over, narrações, URA",
    icon: "mic",
    image: estudioMicrofone,
    imageAlt: "Eduardo Rodrigues sorrindo diante de um microfone em estúdio com espuma acústica",
    banner: heroLocucao,
    bannerPosition: "70% 40%",
    intro: [
      "Uma voz versátil, do tom clássico e institucional ao jovem varejo, com a experiência de quem gravou chamadas para HBO Brasil e History Channel.",
      "A gravação é feita em estúdio profissional, com direção de texto e entrega no formato que a sua campanha precisa.",
    ],
    includes: [
      "Spots para rádio e TV",
      "Voice over",
      "Vinhetas e chamadas",
      "Vídeos institucionais",
      "Narrações",
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
        answer: "Sim. O texto é alinhado com você antes da gravação, e ajustes de ritmo, tom e pronúncia fazem parte do processo.",
      },
    ],
  },
  {
    slug: "mestre-de-cerimonias",
    title: "Mestre de Cerimônias",
    summary: "Formaturas, congressos, seminários, simpósios, mesas redondas, painéis e muito mais.",
    navLine: "Formaturas, congressos e seminários",
    icon: "stage",
    image: podioFormatura,
    imageAlt: "Eduardo Rodrigues conduzindo uma colação de grau no púlpito da Eduvoice",
    banner: angrad,
    bannerPosition: "75% 35%",
    intro: [
      "Condução segura e elegante para eventos acadêmicos e corporativos, do roteiro ao encerramento, com a experiência de quem já apresentou congressos no Anhembi, no Expo Center Norte e no Mackenzie.",
      "Atuação alinhada com a produção, respeitando protocolo, tempo de palco e a identidade de cada instituição.",
    ],
    includes: [
      "Colações de grau e formaturas",
      "Congressos e convenções",
      "Seminários e simpósios",
      "Mesas redondas e painéis",
      "Premiações",
      "Eventos corporativos",
      "Formaturas online e híbridas",
    ],
    videoIds: ["Ws7-vCyzTBw", "r3-w5sm4uTI", "edItHVMONso"],
    galleryCategories: ["corporativo", "formaturas"],
    faq: [
      orcamentoFaq,
      {
        question: "Você participa da preparação do roteiro?",
        answer: "Sim. O roteiro, o protocolo e a nominata são revisados com a organização antes do evento.",
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
    summary: "Jornalista e entrevistador.",
    navLine: "Programas, entrevistas e reportagens",
    icon: "tv",
    image: apresentador,
    imageAlt: "Retrato de Eduardo Rodrigues de camisa e gravata",
    banner: apresentadorBanner,
    bannerPosition: "80% 20%",
    intro: [
      "Jornalista formado pelo Mackenzie, Eduardo apresenta programas, entrevistas e reportagens com clareza, ritmo e credibilidade.",
      "Passagens pelo Canal Magistral (Programa Magistral), TV Band (programa de varejo), TV Gazeta, TV Bandeirantes e RedeTV.",
    ],
    includes: ["Programas de TV e web", "Entrevistas", "Reportagens", "Programas de varejo", "Apresentação de shows e eventos"],
    videoIds: ["etDKyop-d_E", "9ik7DlqQRGk", "KRjqN13hrAM"],
    galleryCategories: ["eduardo-rodrigues"],
    faq: [orcamentoFaq],
  },
  {
    slug: "celebrante",
    title: "Celebrante",
    summary: "Casamento, Bodas, Debutante e outros.",
    navLine: "Casamentos, bodas e debutantes",
    icon: "rings",
    image: debutante,
    imageAlt: "Eduardo Rodrigues ao microfone ao lado de uma debutante em festa de 15 anos",
    banner: debutante,
    bannerPosition: "60% 30%",
    intro: [
      "Cerimônias conduzidas com emoção e cuidado, construídas a partir da história de cada família.",
      "Da troca de alianças às bodas e festas de 15 anos, cada celebração tem um roteiro personalizado.",
    ],
    includes: ["Casamentos", "Bodas", "Festas de debutante", "Cerimônias personalizadas", "Bailes de formatura"],
    galleryCategories: ["festas"],
    faq: [
      orcamentoFaq,
      {
        question: "A cerimônia é personalizada?",
        answer: "Sim. Antes do evento há uma conversa com os noivos ou a família para construir um roteiro com a história de vocês.",
      },
    ],
  },
  {
    slug: "palestras",
    title: "Palestrante",
    summary: "Palestras de comunicação, oratória e presença de palco, em formato presencial, online ou in company.",
    navLine: "Oratória, voz e comunicação",
    icon: "presentation",
    image: palcoIbgc,
    imageAlt: "Eduardo Rodrigues discursando no púlpito do 15º Congresso IBGC",
    banner: heroCongressos,
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

export const servicesBanner = heroEventos;
