import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/images/brand/edulogo.gif";
import { cx } from "@/lib/utils";

/** Logo original do site antigo (GIF 298×115 com fundo branco). */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label="Eduardo Rodrigues, locutor e jornalista — página inicial" className={cx("block shrink-0", className)}>
      <Image
        src={logo}
        alt="Eduardo Rodrigues — locutor e jornalista"
        priority={priority}
        sizes="180px"
        className="h-auto w-full"
      />
    </Link>
  );
}
