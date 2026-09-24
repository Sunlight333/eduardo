import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

import type { Course } from "@/content/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/cursos/${course.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink-900/10 transition-shadow hover:shadow-xl hover:shadow-ink-900/5"
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={course.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover"
        />
        {course.draft && (
          <span className="bg-onair absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-bold tracking-wide text-white uppercase">
            Rascunho
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-3xl leading-tight">{course.title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-stone-600">{course.summary}</p>
        <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-stone-600">
          {course.workload && (
            <div className="flex items-center gap-1.5">
              <dt>
                <Clock className="size-4" aria-label="Carga horária" />
              </dt>
              <dd>{course.workload}</dd>
            </div>
          )}
          {course.classes?.[0] && (
            <div className="flex items-center gap-1.5">
              <dt>
                <CalendarDays className="size-4" aria-label="Turma" />
              </dt>
              <dd>{course.classes[0].label}</dd>
            </div>
          )}
        </dl>
        <span className="text-ink-900 mt-6 inline-flex items-center gap-2 text-sm font-semibold">
          Ver curso
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
