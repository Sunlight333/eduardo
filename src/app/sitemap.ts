import type { MetadataRoute } from "next";

import { servicePages } from "@/content/services";
import { courses } from "@/content/courses";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/sobre/", "/servicos/", "/palestras/", "/cursos/", "/portfolio/", "/contato/", "/politica-de-privacidade/"];
  return [
    ...pages.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...servicePages.map((service) => ({ url: absoluteUrl(`/servicos/${service.slug}/`), priority: 0.7 })),
    // Rascunhos nunca entram no sitemap, mesmo quando visíveis em preview.
    ...courses.filter((c) => !c.draft).map((course) => ({ url: absoluteUrl(`/cursos/${course.slug}/`), priority: 0.7 })),
  ];
}
