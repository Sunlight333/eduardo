// Conteúdo global do site, extraído do site antigo (ver scrape/content/site-content.json).
// Itens marcados com REVISAR dependem de confirmação do cliente
// (ver "Content to confirm with the client" no README).

export const site = {
  name: "Eduardo Rodrigues",
  url: "https://edurodrigues.com.br",
  /** Título do site antigo: "Eduardo Rodrigues – Locutor e Mestre de Cerimonias". */
  title: "Eduardo Rodrigues — Locutor e Mestre de Cerimônias",
  tagline: "Locutor e Mestre de Cerimônias",
  description:
    "Locução publicitária, voice over, mestre de cerimônias, apresentador, celebrante, palestrante e docente de rádio em São Paulo. Mais de 30 anos em rádio, TV e eventos.",
  /** Títulos rotativos do hero do site antigo, na mesma ordem. */
  roles: [
    "Locução publicitária",
    "Voice Over",
    "Mestre de cerimônias",
    "Narrações",
    "Apresentador",
    "Docente Curso de Rádio",
    "Palestrante",
  ],
  // REVISAR: o site antigo dizia "mais de 26 anos" em 2021.
  careerYears: "30+",
  eduvoiceUrl: "https://eduvoice.com.br",
};

export const contact = {
  // REVISAR: confirmar qual e-mail é o principal. O site antigo mostrava os dois:
  // locutor@ na página de contato e edulocutor@terra no rodapé.
  email: "locutor@edurodrigues.com.br",
  emails: ["locutor@edurodrigues.com.br", "edulocutor@terra.com.br"],
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
  /** Mapa incorporado exatamente como no site antigo (Google Maps, "Eduardo Rodrigues Locutor"). */
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d914.89273894777!2d-46.6141909345988!3d-23.47593578608751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef71111aa4d2f%3A0xca7a186f4de4df4!2sEduardo%20Rodrigues%20Locutor!5e0!3m2!1spt-BR!2sbr!4v1626956347563!5m2!1spt-BR!2sbr",
};

export const social = [
  { network: "facebook", label: "Facebook", handle: "eduardorodriguesavoz", href: "https://www.facebook.com/eduardorodriguesavoz" },
  { network: "instagram", label: "Instagram", handle: "@edu.locutor", href: "https://www.instagram.com/edu.locutor/" },
  { network: "linkedin", label: "LinkedIn", handle: "Eduardo Rodrigues", href: "https://www.linkedin.com/in/eduardo-rodrigues-4969007b/" },
  { network: "youtube", label: "YouTube", handle: "@eduvoiceestudio", href: "https://www.youtube.com/@eduvoiceestudio" },
] as const;

/** Os vídeos do portfólio estão em dois canais da Eduvoice. */
export const youtubeChannels = [
  { handle: "@eduvoiceestudio", href: "https://www.youtube.com/@eduvoiceestudio" },
  { handle: "@eduvoice7370", href: "https://www.youtube.com/@eduvoice7370" },
];

export type SocialNetwork = (typeof social)[number]["network"];

// Números derivados do conteúdo existente. REVISAR com o cliente e, se possível,
// trocar por métricas mais fortes (eventos conduzidos, alunos formados...).
export const stats = [
  { value: site.careerYears, label: "anos de carreira em rádio, TV e eventos" },
  { value: "24+", label: "clientes e parceiros" },
  { value: "5", label: "emissoras de rádio" },
  { value: "6", label: "canais de TV" },
];
