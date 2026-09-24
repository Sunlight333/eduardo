import Image from "next/image";

import { clients, type Client } from "@/content/clients";
import { cx } from "@/lib/utils";

function LogoCard({ client, decorative = false }: { client: Client; decorative?: boolean }) {
  return (
    <div className="grid h-20 w-40 shrink-0 place-items-center rounded-xl bg-white px-4 shadow-sm ring-1 ring-black/5">
      <Image
        src={client.logo}
        alt={decorative ? "" : client.name}
        sizes="160px"
        className="h-auto max-h-14 w-auto object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </div>
  );
}

/** Faixa contínua de logos; com movimento reduzido vira uma grade estática. */
export function LogoMarquee({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        "group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:mx-auto motion-reduce:max-w-6xl motion-reduce:px-5 motion-reduce:[mask-image:none] sm:motion-reduce:px-8",
        className,
      )}
    >
      <div className="animate-marquee flex w-max gap-4 group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
        <ul className="flex gap-4 motion-reduce:flex-wrap motion-reduce:justify-center" aria-label="Clientes e parceiros">
          {clients.map((client) => (
            <li key={client.name}>
              <LogoCard client={client} />
            </li>
          ))}
        </ul>
        <ul className="flex gap-4 motion-reduce:hidden" aria-hidden="true">
          {clients.map((client) => (
            <li key={client.name}>
              <LogoCard client={client} decorative />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function LogoGrid() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" aria-label="Clientes e parceiros">
      {clients.map((client) => (
        <li key={client.name} className="[&>div]:w-full">
          <LogoCard client={client} />
        </li>
      ))}
    </ul>
  );
}
