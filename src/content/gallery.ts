import type { StaticImageData } from "next/image";

import type { GalleryCategory } from "./gallery-categories";

export { galleryCategories, type GalleryCategory } from "./gallery-categories";

import saudeSaoCamilo from "@/assets/images/gallery/corporativo/congresso-saude-sao-camilo-2012.jpg";
import enangrad from "@/assets/images/gallery/corporativo/enangrad-campinas-2016.jpg";
import angrad from "@/assets/images/gallery/corporativo/congresso-angrad-sp-2016.jpg";
import mackenzie from "@/assets/images/gallery/corporativo/seminario-mackenzie-2016.jpg";
import ibgc from "@/assets/images/gallery/corporativo/congresso-ibgc-anhembi.jpg";
import corporativa2021 from "@/assets/images/gallery/corporativo/apresentacao-corporativa-2021.jpg";

import policamp1 from "@/assets/images/gallery/formaturas/policamp-2011-1.jpg";
import policamp2 from "@/assets/images/gallery/formaturas/policamp-2011-2.jpg";
import policamp3 from "@/assets/images/gallery/formaturas/policamp-2011-3.jpg";
import policamp4 from "@/assets/images/gallery/formaturas/policamp-2011-4.jpg";
import faj2013 from "@/assets/images/gallery/formaturas/faj-2013.jpg";
import maxPlanck1 from "@/assets/images/gallery/formaturas/max-planck-2013-1.jpg";
import maxPlanck2 from "@/assets/images/gallery/formaturas/max-planck-2013-2.jpg";
import fajPronatec from "@/assets/images/gallery/formaturas/faj-pronatec-2014.jpg";
import maxPlanck2014 from "@/assets/images/gallery/formaturas/max-planck-2014.jpg";
import formatura2016 from "@/assets/images/gallery/formaturas/formatura-2016.jpg";

import debutante from "@/assets/images/gallery/festas/debutante-buffet-2008.jpg";
import baile1 from "@/assets/images/gallery/festas/baile-mendes-santos-2007-1.jpg";
import baile2 from "@/assets/images/gallery/festas/baile-mendes-santos-2007-2.jpg";

import comercial1 from "@/assets/images/gallery/estudio/locucao-comercial-2007-1.jpg";
import comercial2 from "@/assets/images/gallery/estudio/locucao-comercial-2007-2.jpg";
import comercial3 from "@/assets/images/gallery/estudio/locucao-comercial-2007-3.jpg";
import estudio2009 from "@/assets/images/gallery/estudio/locucao-estudio-2009.jpg";
import hboEstudio from "@/assets/images/gallery/estudio/hbo-brasil-2009.jpg";
import eduvoice2021 from "@/assets/images/gallery/estudio/eduvoice-2021.jpg";

import apresentador1 from "@/assets/images/gallery/apresentador/apresentador-2009-1.jpg";
import apresentador2 from "@/assets/images/gallery/apresentador/apresentador-2009-2.jpg";
import mestre2009 from "@/assets/images/gallery/apresentador/mestre-de-cerimonias-2009.jpg";
import hbo2009 from "@/assets/images/gallery/apresentador/hbo-2009.jpg";
import retrato2009 from "@/assets/images/gallery/apresentador/retrato-2009.jpg";

export type GalleryPhoto = {
  src: StaticImageData;
  caption: string;
  year?: number;
  category: GalleryCategory;
};

// Legendas do site antigo (com correções de digitação). Fotos sem legenda no
// site antigo receberam uma descrição a partir do nome do arquivo.
export const gallery: GalleryPhoto[] = [
  { src: ibgc, caption: "15º Congresso IBGC — Anhembi, São Paulo", category: "corporativo" },
  { src: saudeSaoCamilo, caption: "Conduzindo o Congresso Nacional de Saúde São Camilo — Expo Center Norte", year: 2012, category: "corporativo" },
  { src: enangrad, caption: "Congresso de Educação Enangrad — Campinas", year: 2016, category: "corporativo" },
  { src: angrad, caption: "Apresentando o Congresso da Angrad — São Paulo", year: 2016, category: "corporativo" },
  { src: mackenzie, caption: "Seminário educacional na sede do Mackenzie — São Paulo", year: 2016, category: "corporativo" },
  { src: corporativa2021, caption: "Apresentação de evento corporativo", year: 2021, category: "corporativo" },

  { src: maxPlanck2, caption: "Conduzindo a formatura de 500 alunos da UniMAX", year: 2013, category: "formaturas" },
  { src: policamp3, caption: "Cobrindo reportagem para TV corporativa", year: 2011, category: "formaturas" },
  { src: policamp4, caption: "Em colação de grau, sendo parabenizado", year: 2011, category: "formaturas" },
  { src: faj2013, caption: "No púlpito, em mais um evento", year: 2013, category: "formaturas" },
  { src: fajPronatec, caption: "Mestre de cerimônias em ação", year: 2014, category: "formaturas" },
  { src: maxPlanck2014, caption: "Apresentação de evento acadêmico", year: 2014, category: "formaturas" },
  { src: formatura2016, caption: "Passando o roteiro com a produção", year: 2016, category: "formaturas" },
  { src: policamp1, caption: "Formatura Policamp", year: 2011, category: "formaturas" },
  { src: policamp2, caption: "Formatura Policamp", year: 2011, category: "formaturas" },
  { src: maxPlanck1, caption: "Formatura Max Planck", year: 2013, category: "formaturas" },

  { src: debutante, caption: "Apresentando festa de debutante em buffet — São Paulo", year: 2008, category: "festas" },
  { src: baile1, caption: "Mestre de cerimônias no baile de formatura — Clube Mendes Santos", year: 2007, category: "festas" },
  { src: baile2, caption: "Mestre de cerimônias no baile de formatura — Clube Mendes Santos", year: 2007, category: "festas" },

  { src: eduvoice2021, caption: "Gravando na Eduvoice Produtora", year: 2021, category: "estudio" },
  { src: hboEstudio, caption: "Gravação no estúdio da HBO Brasil", year: 2009, category: "estudio" },
  { src: estudio2009, caption: "Locução comercial em estúdio", year: 2009, category: "estudio" },
  { src: comercial3, caption: "Locução comercial em estúdio de gravação", year: 2007, category: "estudio" },
  { src: comercial1, caption: "Locução comercial em estúdio de gravação", year: 2007, category: "estudio" },
  { src: comercial2, caption: "Locução comercial em estúdio de gravação", year: 2007, category: "estudio" },

  { src: apresentador1, caption: "Apresentador", year: 2009, category: "apresentador" },
  { src: mestre2009, caption: "Mestre de cerimônias", year: 2009, category: "apresentador" },
  { src: hbo2009, caption: "Em trabalho na HBO", year: 2009, category: "apresentador" },
  { src: apresentador2, caption: "Apresentador", year: 2009, category: "apresentador" },
  { src: retrato2009, caption: "Retrato de divulgação", year: 2009, category: "apresentador" },
];

export function photosIn(...categories: GalleryCategory[]): GalleryPhoto[] {
  return gallery.filter((p) => categories.includes(p.category));
}
