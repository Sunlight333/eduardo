import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cx } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

type Tone = "light" | "sand" | "dark" | "darker";

const toneClasses: Record<Tone, string> = {
  light: "bg-sand-50 text-ink-900",
  sand: "bg-sand-100 text-ink-900",
  dark: "bg-ink-900 text-sand-50",
  darker: "bg-ink-950 text-sand-50",
};

export function Section({
  tone = "light",
  className,
  id,
  children,
  "aria-labelledby": labelledBy,
}: {
  tone?: Tone;
  className?: string;
  id?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx(toneClasses[tone], "py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, dark = false, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p
      className={cx(
        "flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase",
        dark ? "text-brand-400" : "text-brand-700",
        className,
      )}
    >
      <span aria-hidden="true" className={cx("h-px w-6", dark ? "bg-brand-400" : "bg-brand-700")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  dark = false,
  align = "left",
  className,
}: {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center [&>p:first-child]:justify-center", className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 id={id} className="font-display mt-4 text-4xl leading-[1.05] text-balance sm:text-5xl">
        {title}
      </h2>
      {lead && (
        <p className={cx("mt-5 text-lg leading-relaxed text-pretty", dark ? "text-stone-300" : "text-stone-600")}>{lead}</p>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "outline-dark" | "outline-light" | "ghost-dark";
type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-ink-950 hover:bg-brand-400 shadow-[0_8px_24px_-12px] shadow-brand-500/60",
  "outline-dark": "border border-white/20 text-sand-50 hover:border-white/40 hover:bg-white/5",
  "outline-light": "border border-ink-900/20 text-ink-900 hover:border-ink-900/40 hover:bg-ink-900/5",
  "ghost-dark": "text-sand-50 hover:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cx(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({ href, variant, size, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(newTab && { target: "_blank", rel: "noopener noreferrer" })} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD precisa ser serializado; "<" é escapado para não fechar a tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
