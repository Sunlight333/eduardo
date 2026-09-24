export const galleryCategories = [
  { slug: "corporativo", label: "Eventos corporativos" },
  { slug: "formaturas", label: "Formaturas" },
  { slug: "festas", label: "Festas e celebrações" },
  { slug: "estudio", label: "Estúdio" },
  { slug: "apresentador", label: "Apresentador" },
] as const;

export type GalleryCategory = (typeof galleryCategories)[number]["slug"];
