import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cx } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

type Tone = "white" | "paper" | "dark" | "brand";

const toneClasses: Record<Tone, string> = {
  white: "bg-white text-ink-900",
  paper: "bg-paper text-ink-900",
  dark: "bg-ink-900 text-white",
  brand: "bg-brand-500 text-ink-900",
};

export function Section({
  tone = "white",
  className,
  id,
  children,
  "aria-labelledby": labelledBy,
  "aria-label": label,
}: {
  tone?: Tone;
  className?: string;
  id?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cx(toneClasses[tone], "py-16 sm:py-24", className)}
    >
      {children}
    </section>
  );
}

/** Título de seção com a barra amarela, como os títulos do site antigo. */
export function SectionTitle({
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
  const center = align === "center";
  return (
    <div className={cx("max-w-3xl", center && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cx(
            "font-display text-xs font-bold tracking-[0.2em] uppercase",
            dark ? "text-brand-400" : "text-brand-700",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cx(
          "font-display mt-3 text-3xl leading-tight font-extrabold text-balance sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      <span aria-hidden="true" className={cx("bg-brand-500 mt-5 block h-1 w-14 rounded-full", center && "mx-auto")} />
      {lead && (
        <p className={cx("mt-5 text-lg leading-relaxed text-pretty", dark ? "text-white/75" : "text-neutral-600")}>{lead}</p>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "dark" | "outline" | "outline-light" | "ghost-light";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-ink-900 hover:bg-brand-400 shadow-sm",
  dark: "bg-ink-900 text-white hover:bg-ink-800",
  outline: "border-2 border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white",
  "outline-light": "border-2 border-white/80 text-white hover:bg-white hover:text-ink-900",
  "ghost-light": "text-white hover:text-brand-400",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cx(
    "font-display inline-flex items-center justify-center gap-2 rounded-lg font-bold whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
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
  if (/^(https?:|mailto:|tel:)/.test(href)) {
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
