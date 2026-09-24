import type { NextConfig } from "next";

const gallery = (slug: string) => `/portfolio/?tab=fotos&galeria=${slug}`;

// Voice demos were linked directly from the old WordPress media library.
// "Repertorio_Completo" was uploaded four times (identical files).
const legacyAudio: Record<string, string> = {
  "Repertorio_Completo.mp3": "repertorio-completo",
  "Repertorio_Completo-1.mp3": "repertorio-completo",
  "Repertorio_Completo-2.mp3": "repertorio-completo",
  "Repertorio_Completo-3.mp3": "repertorio-completo",
  "Classico.mp3": "classico",
  "Jovem_Varejo.mp3": "jovem-varejo",
  "Voz_Natural.mp3": "voz-natural",
  "Chamadas_Vinhetas.mp3": "chamadas-vinhetas",
  "URA.mp3": "ura",
  "Institucional.mp3": "institucional",
  "E-Learning.mp3": "e-learning",
  "Radio.mp3": "radio",
};

const nextConfig: NextConfig = {
  // The WordPress site used trailing slashes; keeping them preserves every
  // URL that did not change (/, /servicos/, /contato/) without a redirect.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/meu-portfolio", destination: "/portfolio/", permanent: true },
      { source: "/eduardo-rodrigues", destination: "/sobre/", permanent: true },
      { source: "/clientes", destination: "/sobre/", permanent: true },
      { source: "/corporativo", destination: gallery("corporativo"), permanent: true },
      { source: "/formaturas", destination: gallery("formaturas"), permanent: true },
      { source: "/festas", destination: gallery("festas"), permanent: true },
      { source: "/estudio", destination: gallery("estudio"), permanent: true },
      ...Object.entries(legacyAudio).map(([file, slug]) => ({
        source: `/wp-content/uploads/2021/05/${file}`,
        destination: `/audio/${slug}.mp3`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
