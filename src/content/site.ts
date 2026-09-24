// Conteúdo global do site. Itens marcados com REVISAR dependem de confirmação
// do cliente (ver "Content to confirm with the client" no README).

export const site = {
  name: "Eduardo Rodrigues",
  url: "https://edurodrigues.com.br",
  title: "Eduardo Rodrigues — Locutor, Mestre de Cerimônias e Apresentador",
  description:
    "Locutor publicitário, voice over, mestre de cerimônias, apresentador, celebrante, palestrante e professor de comunicação em São Paulo. Mais de 30 anos em rádio, TV e eventos.",
  tagline: "Locutor · Mestre de cerimônias · Apresentador",
  roles: [
    "Locução publicitária",
    "Voice over",
    "Mestre de cerimônias",
    "Narrações",
    "Apresentador",
    "Docente de rádio",
    "Palestrante",
  ],
  // REVISAR: o site antigo dizia "mais de 26 anos" em 2021.
  careerYears: "30+",
  eduvoiceUrl: "https://eduvoice.com.br",
};

export const contact = {
  // REVISAR: o site antigo exibia também edulocutor@terra.com.br no rodapé.
  email: "locutor@edurodrigues.com.br",
  phones: [
    { label: "(11) 2261-2753", href: "tel:+551122612753" },
    { label: "(11) 99615-9398", href: "tel:+5511996159398" },
  ],
  // REVISAR: confirmar que o celular é o número de WhatsApp.
  whatsapp: "5511996159398",
  whatsappLabel: "(11) 99615-9398",
  address: {
    street: "Avenida Nova Cantareira, 2233 – Conjunto 81",
    neighborhood: "Tucuruvi",
    city: "São Paulo",
    state: "SP",
    zip: "02331-003",
  },
  geo: { lat: -23.47593578608751, lng: -46.6141909345988 },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Eduardo%20Rodrigues%20Locutor%2C%20Avenida%20Nova%20Cantareira%202233%2C%20S%C3%A3o%20Paulo",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d914.89273894777!2d-46.6141909345988!3d-23.47593578608751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef71111aa4d2f%3A0xca7a186f4de4df4!2sEduardo%20Rodrigues%20Locutor!5e0!3m2!1spt-BR!2sbr!4v1626956347563!5m2!1spt-BR!2sbr",
};

export const social = [
  { network: "instagram", label: "Instagram", handle: "@edu.locutor", href: "https://www.instagram.com/edu.locutor/" },
  { network: "facebook", label: "Facebook", handle: "eduardorodriguesavoz", href: "https://www.facebook.com/eduardorodriguesavoz" },
  { network: "linkedin", label: "LinkedIn", handle: "Eduardo Rodrigues", href: "https://www.linkedin.com/in/eduardo-rodrigues-4969007b/" },
  { network: "youtube", label: "YouTube", handle: "@eduvoiceestudio", href: "https://www.youtube.com/@eduvoiceestudio" },
] as const;

export type SocialNetwork = (typeof social)[number]["network"];

export const nav = [
  { label: "Sobre", href: "/sobre/" },
  { label: "Serviços", href: "/servicos/" },
  { label: "Palestras", href: "/palestras/" },
  { label: "Cursos", href: "/cursos/" },
  { label: "Portfólio", href: "/portfolio/" },
  { label: "Contato", href: "/contato/" },
];

// Números derivados do conteúdo existente. REVISAR com o cliente e, se possível,
// trocar por métricas mais fortes (eventos conduzidos, alunos formados...).
export const stats = [
  { value: site.careerYears, label: "anos de carreira em rádio, TV e eventos" },
  { value: "24+", label: "marcas e instituições atendidas" },
  { value: "5", label: "emissoras de rádio" },
  { value: "6", label: "canais de TV" },
];
