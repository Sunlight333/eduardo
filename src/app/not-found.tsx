import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="bg-ink-950 text-sand-50">
      <Container className="flex min-h-[70vh] flex-col items-start justify-center py-24">
        <p className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] text-stone-400 uppercase">
          <span aria-hidden="true" className="size-2 rounded-full bg-stone-600" />
          Fora do ar · 404
        </p>
        <h1 className="font-display mt-6 max-w-3xl text-5xl leading-[1.02] sm:text-7xl">
          Esta página saiu do ar — mas a voz continua.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-stone-300">
          O endereço pode ter mudado com o novo site. Que tal começar pelas demos ou pelos serviços?
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Ir para o início
          </ButtonLink>
          <ButtonLink href="/portfolio/" variant="outline-dark" size="lg">
            Ouvir demos
          </ButtonLink>
          <ButtonLink href="/servicos/" variant="ghost-dark" size="lg">
            Serviços
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
