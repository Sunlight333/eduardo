// Biografia e trajetória, reescritas a partir das seções "Perfil" e
// "Outras Informações" do site antigo. REVISAR: validar texto com o cliente.

export const bio = {
  short:
    "Locutor, jornalista, mestre de cerimônias e professor de comunicação. Há mais de 30 anos dando voz a marcas, conduzindo eventos e formando novos profissionais.",
  long: [
    "Com uma carreira reconhecida de mais de 30 anos, Eduardo Rodrigues fez da comunicação o seu ofício. Formado pelo SENAC nos cursos de Radialista, Locução Publicitária, Locução para FM e Locução Noticiarista, destacou-se a ponto de se tornar docente da mesma instituição que o formou.",
    "O profissionalismo como locutor e apresentador abriu portas em grandes emissoras de rádio e televisão, com trabalhos para HBO Brasil, History Channel, TV Band, TV Gazeta e RedeTV. Jornalista pelo Mackenzie e com formação em oratória pelo Instituto Reinaldo Polito, une técnica vocal, repertório jornalístico e presença de palco.",
    "Hoje, além da locução, conduz formaturas, congressos e eventos corporativos como mestre de cerimônias, celebra casamentos e bodas, ministra cursos e palestras de comunicação e dirige a Eduvoice, sua produtora de áudio, vídeo e eventos.",
  ],
  mission:
    "Ser a melhor escolha para cada cliente, com soluções personalizadas que superem expectativas e transmitam credibilidade e confiança.",
};

export const education = [
  { title: "Jornalismo", institution: "Universidade Presbiteriana Mackenzie" },
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

// REVISAR: no site antigo algumas funções apareciam soltas após as listas;
// a associação emissora → função abaixo é a leitura mais provável.
export const career: CareerGroup[] = [
  {
    id: "radio",
    title: "Rádio",
    items: [
      { org: "Rádio Boa Nova AM" },
      { org: "Rede American SAT" },
      { org: "Rádio Atual AM" },
      { org: "Rádio Trianon AM" },
      { org: "Rádio Líder FM" },
    ],
  },
  {
    id: "tv-locucao",
    title: "TV · locução",
    items: [
      { org: "HBO Brasil", role: "Locutor de chamadas" },
      { org: "History Channel", role: "Locutor de chamadas" },
      { org: "TV Mais ABC", role: "Locutor de chamadas" },
    ],
  },
  {
    id: "tv-apresentacao",
    title: "TV · apresentação",
    items: [
      { org: "Canal Magistral", role: "Programa Magistral" },
      { org: "TV Band", role: "Programa de varejo" },
      { org: "TV Gazeta" },
      { org: "RedeTV" },
    ],
  },
  {
    id: "docencia",
    title: "Docência",
    items: [{ org: "SENAC", role: "Curso profissionalizante de Locução" }],
  },
];

export const clientSegments = [
  "Agências de marketing",
  "Estúdios e produtoras",
  "Emissoras de rádio e televisão",
  "Empresas de diversos setores",
  "Sindicatos e associações",
];

export const broadcasters = ["HBO Brasil", "History Channel", "TV Band", "TV Gazeta", "RedeTV", "SENAC"];
