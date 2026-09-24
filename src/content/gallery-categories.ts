// As cinco galerias do menu "Galeria" do site antigo, com os mesmos endereços
// (/corporativo/, /eduardo-rodrigues/, /estudio/, /festas/, /formaturas/).
export const galleryCategories = [
  { slug: "corporativo", label: "Corporativo", description: "Congressos, seminários e eventos corporativos." },
  { slug: "eduardo-rodrigues", label: "Eduardo Rodrigues", description: "Apresentador, mestre de cerimônias e trabalhos para a TV." },
  { slug: "estudio", label: "Estúdio", description: "Gravações de locução comercial e institucional." },
  { slug: "festas", label: "Festas", description: "Festas de debutante, bailes e celebrações." },
  { slug: "formaturas", label: "Formaturas", description: "Colações de grau e cerimônias acadêmicas." },
] as const;

export type GalleryCategory = (typeof galleryCategories)[number]["slug"];

export function galleryHref(slug: GalleryCategory): string {
  return `/${slug}/`;
}
