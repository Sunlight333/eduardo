import type { Metadata } from "next";

import { contact, site, social } from "@/content/site";
import { education } from "@/content/career";
import type { Course } from "@/content/courses";

export const PERSON_ID = `${site.url}/#pessoa`;
export const BUSINESS_ID = `${site.url}/#negocio`;

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

/** Metadados por página com canonical e Open Graph consistentes. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: site.name,
        url: site.url,
        jobTitle: ["Locutor", "Mestre de cerimônias", "Apresentador", "Palestrante", "Professor de comunicação"],
        description: site.description,
        email: `mailto:${contact.email}`,
        telephone: contact.phones[1].href.replace("tel:", ""),
        sameAs: social.map((s) => s.href),
        alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.institution })),
        worksFor: { "@id": BUSINESS_ID },
      },
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS_ID,
        name: `${site.name} — Locutor e Mestre de Cerimônias`,
        url: site.url,
        image: absoluteUrl("/opengraph-image.jpg"),
        telephone: contact.phones.map((p) => p.href.replace("tel:", "")),
        email: contact.email,
        founder: { "@id": PERSON_ID },
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.address.street,
          addressLocality: contact.address.city,
          addressRegion: contact.address.state,
          postalCode: contact.address.zip,
          addressCountry: "BR",
        },
        geo: { "@type": "GeoCoordinates", latitude: contact.geo.lat, longitude: contact.geo.lng },
        hasMap: contact.mapsUrl,
        areaServed: "BR",
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Início", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": PERSON_ID },
    areaServed: "BR",
  };
}

export function courseJsonLd(course: Course, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.summary,
    url: absoluteUrl(path),
    inLanguage: "pt-BR",
    provider: { "@id": PERSON_ID },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.modality === "online" ? "online" : "onsite",
      instructor: { "@id": PERSON_ID },
      ...(course.modality === "presencial" && {
        location: {
          "@type": "Place",
          name: "Sede — Tucuruvi",
          address: `${contact.address.street}, ${contact.address.neighborhood}, ${contact.address.city} – ${contact.address.state}`,
        },
      }),
    },
  };
}
