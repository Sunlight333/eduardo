// Demos de voz do portfólio antigo (gravadas em 2021). Arquivos em /public/audio.
// REVISAR: confirmar se continuam atuais ou se haverá novas gravações.

export type Demo = {
  slug: string;
  title: string;
  description: string;
  src: string;
  /** Duração em segundos (do metadado do arquivo). */
  duration: number;
};

export const demos: Demo[] = [
  {
    slug: "repertorio-completo",
    title: "Repertório completo",
    description: "Uma seleção com os principais estilos de voz.",
    src: "/audio/repertorio-completo.mp3",
    duration: 165,
  },
  {
    slug: "classico",
    title: "Clássico",
    description: "Tom sóbrio e elegante para marcas tradicionais.",
    src: "/audio/classico.mp3",
    duration: 109,
  },
  {
    slug: "jovem-varejo",
    title: "Jovem varejo",
    description: "Energia e ritmo para ofertas e promoções.",
    src: "/audio/jovem-varejo.mp3",
    duration: 93,
  },
  {
    slug: "voz-natural",
    title: "Voz natural",
    description: "Leitura próxima e conversada.",
    src: "/audio/voz-natural.mp3",
    duration: 84,
  },
  {
    slug: "chamadas-vinhetas",
    title: "Chamadas e vinhetas",
    description: "Chamadas de programação e vinhetas para rádio e TV.",
    src: "/audio/chamadas-vinhetas.mp3",
    duration: 82,
  },
  {
    slug: "institucional",
    title: "Institucional",
    description: "Vídeos e apresentações institucionais.",
    src: "/audio/institucional.mp3",
    duration: 79,
  },
  {
    slug: "e-learning",
    title: "E-learning",
    description: "Cursos, treinamentos e conteúdos educacionais.",
    src: "/audio/e-learning.mp3",
    duration: 85,
  },
  {
    slug: "ura",
    title: "URA",
    description: "Atendimento eletrônico e mensagens de espera.",
    src: "/audio/ura.mp3",
    duration: 89,
  },
  {
    slug: "radio",
    title: "Rádio",
    description: "Spots e locução para emissoras de rádio.",
    src: "/audio/radio.mp3",
    duration: 92,
  },
];

export const featuredDemos = demos.filter((d) =>
  ["repertorio-completo", "classico", "jovem-varejo", "voz-natural", "institucional"].includes(d.slug),
);
