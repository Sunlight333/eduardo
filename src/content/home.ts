import type { StaticImageData } from "next/image";

import heroLocucao from "@/assets/images/hero/locucao.jpg";
import heroEventos from "@/assets/images/hero/eventos-corporativos.jpg";
import podioFormatura from "@/assets/images/gallery/formaturas/max-planck-2013-2.jpg";

export type HeroSlide = {
  image: StaticImageData;
  caption: string;
  /** object-position no desktop (texto à esquerda, Eduardo à direita). */
  position: string;
  /** object-position no celular (Eduardo centralizado). */
  mobilePosition: string;
};

// Os três banners do hero do site antigo eram "locução", "eventos corporativos" e
// "realização de congressos". O terceiro tem o Eduardo à esquerda e ficaria sob o
// texto, então ele virou o fundo da página de Palestras; aqui entra a foto do
// púlpito da formatura (fundo escuro, Eduardo à direita).
export const heroSlides: HeroSlide[] = [
  {
    image: heroLocucao,
    caption: "Locução publicitária em estúdio",
    position: "39% 50%",
    mobilePosition: "59% 50%",
  },
  {
    image: heroEventos,
    caption: "Mestre de cerimônias em eventos corporativos",
    position: "60% 50%",
    mobilePosition: "71% 50%",
  },
  {
    image: podioFormatura,
    caption: "Condução de formaturas",
    position: "50% 15%",
    mobilePosition: "60% 20%",
  },
];
