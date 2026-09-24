import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

import type { Course } from "@/content/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/cursos/${course.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={course.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {course.draft && (
          <span className="font-display absolute top-3 left-3 rounded-md bg-red-600 px-2.5 py-1 text-xs font-bold tracking-wide text-white uppercase">
            Rascunho
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-extrabold">{course.title}</h3>
        <p className="mt-2 flex-1 leading-relaxed text-neutral-600">{course.summary}</p>
        <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-600">
          {course.workload && (
            <div className="flex items-center gap-1.5">
              <dt>
                <Clock className="text-brand-700 size-4" aria-label="Carga horária" />
              </dt>
              <dd>{course.workload}</dd>
            </div>
          )}
          {course.classes?.[0] && (
            <div className="flex items-center gap-1.5">
              <dt>
                <CalendarDays className="text-brand-700 size-4" aria-label="Turma" />
              </dt>
              <dd>{course.classes[0].label}</dd>
            </div>
          )}
        </dl>
        <span className="font-display text-ink-900 mt-5 inline-flex items-center gap-2 text-sm font-bold">
          Ver curso
          <ArrowRight className="text-brand-700 size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
