import Image from "next/image";

import heroLocucao from "@/assets/images/hero/locucao.jpg";
import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="bg-ink-950 relative isolate overflow-hidden text-white">
      <Image src={heroLocucao} alt="" fill sizes="100vw" placeholder="blur" className="-z-20 object-cover object-[60%_50%]" />
      <div className="from-ink-950 via-ink-950/80 absolute inset-0 -z-10 bg-gradient-to-r to-transparent" />
      <Container className="flex min-h-[70vh] flex-col items-start justify-center py-24">
        <p className="font-display text-brand-400 text-sm font-bold tracking-[0.2em] uppercase">Erro 404</p>
        <h1 className="font-display mt-4 max-w-2xl text-4xl leading-tight font-extrabold sm:text-6xl">Esta página saiu do ar.</h1>
        <span aria-hidden="true" className="bg-brand-500 mt-5 block h-1 w-16 rounded-full" />
        <p className="mt-6 max-w-xl text-lg text-white/80">
          O endereço pode ter mudado com o novo site. Que tal começar pelas demos de voz ou pelos serviços?
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Ir para o início
          </ButtonLink>
          <ButtonLink href="/portfolio/" variant="outline-light" size="lg">
            Ouvir demos
          </ButtonLink>
          <ButtonLink href="/servicos/" variant="outline-light" size="lg">
            Serviços
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
