// Perfil, formação e trajetória, extraídos das seções "Perfil" e
// "Outras Informações" da home do site antigo.

/**
 * Seção "Perfil" do site antigo. O texto é o original, com a grafia corrigida
 * ("portifólio") e os anos de carreira atualizados. REVISAR com o cliente.
 */
export const perfil = {
  heading: "Perfil",
  lead: "Um profissional versátil e experiente, que atua em diversos setores da comunicação, com um vasto portfólio. Trabalhos que têm como marca principal a qualidade e o empenho.",
  paragraphs: [
    "Com uma longa e reconhecida carreira de mais de 30 anos, Eduardo Rodrigues fez da sua profissão um exemplo para muitos. Formado pelo SENAC nos cursos de Radialista, Locução Publicitária, Locução para FM e Locução Noticiarista, se destacou e se superou nestes anos de estudos e trabalho, tornando-se docente da mesma instituição que o formou.",
    "Seu profissionalismo e excelência, tanto como locutor quanto como apresentador, trouxeram oportunidades de trabalhar em grandes emissoras de rádio e de televisão. Atualmente, além deste trabalho, Eduardo Rodrigues possui uma empresa de produção audiovisual e de eventos, a Eduvoice, e atua também como mestre de cerimônias e celebrante.",
  ],
  mission:
    "Sua missão é ser a melhor opção para os seus clientes, dispondo sempre de soluções inovadoras e personalizadas que superem as expectativas dos mesmos, levando credibilidade e confiança.",
};

export const bio = {
  short:
    "Locutor, jornalista, mestre de cerimônias e docente de rádio. Há mais de 30 anos dando voz a marcas, conduzindo eventos e formando novos profissionais.",
};

export const education = [
  { title: "Jornalismo", institution: "Mackenzie" },
  { title: "Direito", institution: "FIG – UNIMESP" },
  { title: "Oratória", institution: "Instituto Reinaldo Polito" },
  {
    title: "Radialista e Locução",
    institution: "SENAC",
    detail: "Locução Publicitária, Locução para FM e Locução Noticiarista",
  },
];

export type CareerItem = { org: string; role?: string };
export type CareerGroup = { id: string; title: string; items: CareerItem[] };

// "Trajetória no mercado" do site antigo. REVISAR: algumas funções apareciam
// soltas após as listas; a associação emissora → função é a leitura mais provável.
export const career: CareerGroup[] = [
  {
    id: "locutor",
    title: "Locutor e narrador",
    items: [
      { org: "Rádio Boa Nova AM" },
      { org: "Rede American SAT" },
      { org: "Rádio Atual AM" },
      { org: "Rádio Trianon AM" },
      { org: "Rádio Líder FM" },
      { org: "HBO Brasil", role: "Locutor de chamadas" },
      { org: "History Channel", role: "Locutor de chamadas" },
      { org: "TV Mais ABC", role: "Locutor de chamadas" },
    ],
  },
  {
    id: "apresentador",
    title: "Apresentador",
    items: [
      { org: "Canal Magistral", role: "Programa Magistral" },
      { org: "TV Band", role: "Programa de varejo" },
      { org: "TV Gazeta" },
      { org: "TV Bandeirantes" },
      { org: "RedeTV" },
    ],
  },
  {
    id: "docente",
    title: "Docente",
    items: [{ org: "SENAC", role: "Curso profissionalizante de Locução" }],
  },
];

/** Página "Clientes" do site antigo (texto original). */
export const clientsPage = {
  intro: "De modo geral atendo clientes nas seguintes áreas:",
  logosHeading: "Segue abaixo alguns de meus clientes:",
};

export const clientSegments = [
  "Agências de marketing",
  "Estúdios e produtoras",
  "Emissoras de rádio e televisão",
  "Empresas diversas",
  "Sindicatos e associações",
];

export const broadcasters = ["HBO Brasil", "History Channel", "TV Band", "TV Gazeta", "RedeTV", "SENAC"];
