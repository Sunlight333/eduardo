import type { StaticImageData } from "next/image";

import coverCorporativo from "@/assets/images/gallery/corporativo/congresso-ibgc-anhembi.jpg";
import coverEduardo from "@/assets/images/eduardo/retrato-2021.jpg";
import coverEstudio from "@/assets/images/gallery/estudio/eduvoice-2021.jpg";
import coverFestas from "@/assets/images/gallery/festas/debutante-buffet-2008.jpg";
import coverFormaturas from "@/assets/images/gallery/formaturas/max-planck-2013-2.jpg";
import type { ServiceIcon } from "./services";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: ServiceIcon;
  image?: StaticImageData;
};

export type NavGroup = { title: string; links: NavLink[] };

export type NavItem = {
  label: string;
  href: string;
  /** Painel do menu suspenso, em uma ou mais colunas. */
  groups?: NavGroup[];
  /** Link de rodapé do painel (ex.: "Todos os serviços"). */
  footer?: NavLink;
};

// Menu principal. Agrupa em menus suspensos o que no site antigo estava solto
// (Serviços, Galeria, Clientes, Portfólio) e acrescenta Palestras e Cursos.
export const mainNav: NavItem[] = [
  {
    label: "Sobre",
    href: "/sobre/",
    groups: [
      {
        title: "Eduardo Rodrigues",
        links: [
          { label: "Perfil", href: "/sobre/", description: "Biografia, missão e produtora" },
          { label: "Formação e trajetória", href: "/sobre/#trajetoria", description: "Rádio, TV e docência" },
          { label: "Clientes e parceiros", href: "/clientes/", description: "Marcas e instituições atendidas" },
        ],
      },
    ],
  },
  {
    label: "Serviços",
    href: "/servicos/",
    groups: [
      {
        title: "O que eu faço",
        links: [
          { label: "Locutor", href: "/servicos/locucao/", description: "Spots, voice over, narrações, URA", icon: "mic" },
          {
            label: "Mestre de Cerimônias",
            href: "/servicos/mestre-de-cerimonias/",
            description: "Formaturas, congressos e seminários",
            icon: "stage",
          },
          { label: "Apresentador", href: "/servicos/apresentador/", description: "Programas, entrevistas e reportagens", icon: "tv" },
          { label: "Celebrante", href: "/servicos/celebrante/", description: "Casamentos, bodas e debutantes", icon: "rings" },
          { label: "Palestrante", href: "/palestras/", description: "Oratória, voz e comunicação", icon: "presentation" },
        ],
      },
    ],
    footer: { label: "Ver todos os serviços", href: "/servicos/" },
  },
  { label: "Palestras", href: "/palestras/" },
  {
    label: "Cursos",
    href: "/cursos/",
    groups: [
      {
        title: "Cursos de comunicação",
        links: [
          { label: "Cursos online", href: "/cursos/#online", description: "Estude no seu ritmo, de onde estiver" },
          { label: "Cursos presenciais", href: "/cursos/#presencial", description: "Turmas na sede, no Tucuruvi" },
          { label: "Lista de interesse", href: "/cursos/#interesse", description: "Seja avisado das próximas turmas" },
        ],
      },
    ],
  },
  {
    label: "Portfólio",
    href: "/portfolio/",
    groups: [
      {
        title: "Ouça e assista",
        links: [
          { label: "Demos de voz", href: "/portfolio/#demos", description: "9 estilos de locução" },
          { label: "Vídeos", href: "/portfolio/#videos", description: "13 trabalhos em vídeo" },
        ],
      },
      {
        title: "Galeria de fotos",
        links: [
          { label: "Corporativo", href: "/corporativo/", image: coverCorporativo },
          { label: "Eduardo Rodrigues", href: "/eduardo-rodrigues/", image: coverEduardo },
          { label: "Estúdio", href: "/estudio/", image: coverEstudio },
          { label: "Festas", href: "/festas/", image: coverFestas },
          { label: "Formaturas", href: "/formaturas/", image: coverFormaturas },
        ],
      },
    ],
    footer: { label: "Ver portfólio completo", href: "/portfolio/" },
  },
  { label: "Contato", href: "/contato/" },
];
