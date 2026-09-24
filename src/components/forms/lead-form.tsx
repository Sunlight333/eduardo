"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useId, useRef, type ReactNode } from "react";
import { CircleCheck, LoaderCircle } from "lucide-react";

import { submitLead, type LeadState, type LeadVariant } from "@/app/actions/lead";
import { buttonClasses } from "@/components/ui/primitives";
import { SERVICE_OPTIONS } from "@/content/lead-options";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { cx, whatsappUrl } from "@/lib/utils";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;


const initialState: LeadState = { status: "idle" };

type Tone = "light" | "dark";

const errorText = (tone: Tone) => (tone === "dark" ? "text-red-400" : "text-red-700");

function Field({
  label,
  name,
  error,
  required,
  className,
  tone,
  children,
}: {
  label: string;
  name: string;
  error?: string[];
  required?: boolean;
  className?: string;
  tone: Tone;
  children: (props: { id: string; "aria-invalid"?: true; "aria-describedby"?: string }) => ReactNode;
}) {
  const id = `${useId()}-${name}`;
  const errorId = `${id}-erro`;
  return (
    <div className={className}>
      <label htmlFor={id} className={cx("font-display mb-1.5 block text-sm font-bold", tone === "dark" ? "text-white/85" : "text-ink-900")}>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {children({ id, ...(error && { "aria-invalid": true, "aria-describedby": errorId }) })}
      {error && (
        <p id={errorId} className={cx("mt-1.5 text-sm", errorText(tone))}>
          {error[0]}
        </p>
      )}
    </div>
  );
}

function Turnstile({ resetSignal }: { resetSignal: unknown }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const render = () => {
    if (!TURNSTILE_SITE_KEY || !containerRef.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(containerRef.current, { sitekey: TURNSTILE_SITE_KEY, language: "pt-br" });
  };

  // Tokens do Turnstile valem uma vez: renova após cada envio.
  useEffect(() => {
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
  }, [resetSignal]);

  useEffect(
    () => () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    },
    [],
  );

  if (!TURNSTILE_SITE_KEY) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={render} />
      <div ref={containerRef} className="min-h-[65px]" />
    </>
  );
}

export function LeadForm({
  variant = "contato",
  defaultService,
  tone = "light",
  submitLabel = "Enviar mensagem",
  className,
}: {
  variant?: LeadVariant;
  defaultService?: string;
  tone?: Tone;
  submitLabel?: string;
  className?: string;
}) {
  const pathname = usePathname();
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const values = state.values ?? {};
  const errors = state.fieldErrors ?? {};

  useEffect(() => {
    if (state.status === "success" && window.dataLayer) {
      window.dataLayer.push({ event: "generate_lead", form_variant: variant });
    }
  }, [state, variant]);

  const inputClass = cx(
    "block w-full rounded-lg border px-4 py-3 text-base transition-colors outline-none focus:ring-4",
    tone === "dark"
      ? "border-white/20 bg-white/10 text-white [color-scheme:dark] placeholder:text-white/40 focus:border-brand-500 focus:ring-brand-500/25 aria-[invalid]:border-red-400"
      : "border-neutral-300 bg-white text-ink-900 placeholder:text-neutral-400 focus:border-brand-500 focus:ring-brand-500/30 aria-[invalid]:border-red-500",
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className={cx(
          "rounded-xl p-8 text-center",
          tone === "dark" ? "bg-white/10 text-white" : "bg-paper ring-1 ring-black/5",
          className,
        )}
      >
        <CircleCheck className="text-brand-500 mx-auto size-12" aria-hidden="true" />
        <p className="font-display mt-4 text-2xl font-extrabold">Mensagem enviada!</p>
        <p className={cx("mt-2", tone === "dark" ? "text-white/80" : "text-neutral-600")}>
          Obrigado pelo contato. Eduardo retorna em breve. Se preferir, fale agora pelo WhatsApp.
        </p>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "md", "mt-6")}>
          <WhatsAppIcon className="size-4" />
          Abrir WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className={cx("grid grid-cols-1 gap-5 sm:grid-cols-2", className)}>
      <input type="hidden" name="variant" value={variant} />
      <input type="hidden" name="origem" value={pathname} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Site
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <Field label="Nome" name="nome" required error={errors.nome} tone={tone}>
        {(p) => <input {...p} name="nome" autoComplete="name" defaultValue={values.nome} className={inputClass} required />}
      </Field>
      <Field label="E-mail" name="email" required error={errors.email} tone={tone}>
        {(p) => <input {...p} name="email" type="email" autoComplete="email" defaultValue={values.email} className={inputClass} required />}
      </Field>
      <Field label="WhatsApp" name="whatsapp" error={errors.whatsapp} tone={tone}>
        {(p) => (
          <input {...p} name="whatsapp" type="tel" autoComplete="tel" placeholder="(11) 90000-0000" defaultValue={values.whatsapp} className={inputClass} />
        )}
      </Field>

      {variant === "contato" && (
        <>
          <Field label="Serviço" name="servico" error={errors.servico} tone={tone}>
            {(p) => (
              <select {...p} name="servico" defaultValue={values.servico ?? defaultService ?? ""} className={inputClass}>
                <option value="">Selecione</option>
                {SERVICE_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            )}
          </Field>
          <Field label="Data do evento" name="data" error={errors.data} tone={tone}>
            {(p) => <input {...p} name="data" type="date" defaultValue={values.data} className={inputClass} />}
          </Field>
          <Field label="Cidade" name="cidade" error={errors.cidade} tone={tone}>
            {(p) => <input {...p} name="cidade" autoComplete="address-level2" defaultValue={values.cidade} className={inputClass} />}
          </Field>
        </>
      )}

      {variant === "palestra" && (
        <>
          <Field label="Empresa" name="empresa" error={errors.empresa} tone={tone}>
            {(p) => <input {...p} name="empresa" autoComplete="organization" defaultValue={values.empresa} className={inputClass} />}
          </Field>
          <Field label="Formato" name="formato" error={errors.formato} tone={tone}>
            {(p) => (
              <select {...p} name="formato" defaultValue={values.formato ?? ""} className={inputClass}>
                <option value="">Selecione</option>
                <option>Presencial</option>
                <option>Online</option>
                <option>Workshop in company</option>
              </select>
            )}
          </Field>
          <Field label="Data prevista" name="data" error={errors.data} tone={tone}>
            {(p) => <input {...p} name="data" type="date" defaultValue={values.data} className={inputClass} />}
          </Field>
          <Field label="Nº de participantes" name="participantes" error={errors.participantes} tone={tone}>
            {(p) => <input {...p} name="participantes" inputMode="numeric" defaultValue={values.participantes} className={inputClass} />}
          </Field>
        </>
      )}

      {variant === "curso" && (
        <>
          <Field label="Modalidade" name="modalidade" error={errors.modalidade} tone={tone}>
            {(p) => (
              <select {...p} name="modalidade" defaultValue={values.modalidade ?? defaultService ?? ""} className={inputClass}>
                <option value="">Selecione</option>
                <option>Online</option>
                <option>Presencial na sede</option>
              </select>
            )}
          </Field>
          <Field label="Curso de interesse" name="curso" error={errors.curso} tone={tone} className="sm:col-span-2">
            {(p) => (
              <input {...p} name="curso" placeholder="Ex.: locução, oratória, mestre de cerimônias" defaultValue={values.curso} className={inputClass} />
            )}
          </Field>
        </>
      )}

      <Field label="Mensagem" name="mensagem" required error={errors.mensagem} tone={tone} className="sm:col-span-2">
        {(p) => <textarea {...p} name="mensagem" rows={5} defaultValue={values.mensagem} className={cx(inputClass, "resize-y")} required />}
      </Field>

      <div className="sm:col-span-2">
        <label className={cx("flex items-start gap-3 text-sm", tone === "dark" ? "text-white/80" : "text-neutral-600")}>
          <input
            type="checkbox"
            name="consentimento"
            defaultChecked={values.consentimento === "on"}
            aria-invalid={errors.consentimento ? true : undefined}
            className="accent-ink-900 mt-0.5 size-4 shrink-0"
            required
          />
          <span>
            Concordo com o uso dos meus dados para retorno deste contato, conforme a{" "}
            <Link href="/politica-de-privacidade/" className="underline underline-offset-2">
              política de privacidade
            </Link>
            .
          </span>
        </label>
        {errors.consentimento && <p className={cx("mt-1.5 text-sm", errorText(tone))}>{errors.consentimento[0]}</p>}
      </div>

      <div className="sm:col-span-2">
        <Turnstile resetSignal={state} />
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className={buttonClasses("primary", "lg")}>
          {pending && <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />}
          {pending ? "Enviando..." : submitLabel}
        </button>
        <p aria-live="polite" className={cx("text-sm", state.status === "error" ? errorText(tone) : "sr-only")}>
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}
