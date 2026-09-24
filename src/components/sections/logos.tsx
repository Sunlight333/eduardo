import Image from "next/image";

import { clients, type Client } from "@/content/clients";
import { cx } from "@/lib/utils";

function LogoCard({ client, decorative = false, fluid = false }: { client: Client; decorative?: boolean; fluid?: boolean }) {
  return (
    <div
      className={cx(
        "grid h-24 shrink-0 place-items-center rounded-xl bg-white px-4 ring-1 ring-black/5 transition hover:shadow-lg",
        fluid ? "w-full" : "w-44",
      )}
    >
      <Image
        src={client.logo}
        alt={decorative ? "" : client.name}
        sizes="176px"
        className="h-auto max-h-16 w-auto object-contain"
      />
    </div>
  );
}

/** Carrossel contínuo de logos ("Clientes e Parceiros" da home antiga). */
export function LogoMarquee({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        "group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        "motion-reduce:mx-auto motion-reduce:max-w-7xl motion-reduce:px-5 motion-reduce:[mask-image:none] sm:motion-reduce:px-8",
        className,
      )}
    >
      <div className="animate-marquee flex w-max gap-4 py-2 group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
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
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6" aria-label="Clientes e parceiros">
      {clients.map((client) => (
        <li key={client.name}>
          <LogoCard client={client} fluid />
        </li>
      ))}
    </ul>
  );
}
