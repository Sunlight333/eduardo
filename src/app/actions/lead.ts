"use server";

import { z } from "zod";

import { contact, site } from "@/content/site";

export type LeadVariant = "contato" | "palestra" | "curso";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string[]>>;
  /** Valores enviados, para repopular o formulário quando há erro. */
  values?: Record<string, string>;
};

const optional = (max: number) => z.string().trim().max(max).optional();

const leadSchema = z.object({
  variant: z.enum(["contato", "palestra", "curso"]),
  origem: optional(200),
  nome: z.string().trim().min(2, { error: "Informe seu nome." }).max(120),
  email: z.string().trim().pipe(z.email({ error: "Informe um e-mail válido." })),
  whatsapp: optional(30),
  servico: optional(60),
  data: optional(20),
  cidade: optional(80),
  empresa: optional(120),
  participantes: optional(10),
  formato: optional(40),
  modalidade: optional(40),
  curso: optional(120),
  mensagem: z
    .string()
    .trim()
    .min(10, { error: "Conte um pouco mais sobre o que você precisa (mínimo de 10 caracteres)." })
    .max(4000),
  consentimento: z.literal("on", { error: "É preciso concordar com a política de privacidade." }),
});

type Lead = z.infer<typeof leadSchema>;

const FIELD_LABELS: Partial<Record<keyof Lead, string>> = {
  nome: "Nome",
  email: "E-mail",
  whatsapp: "WhatsApp",
  servico: "Serviço",
  data: "Data do evento",
  cidade: "Cidade",
  empresa: "Empresa",
  participantes: "Participantes",
  formato: "Formato",
  modalidade: "Modalidade",
  curso: "Curso de interesse",
  origem: "Página",
  mensagem: "Mensagem",
};

const SUBJECTS: Record<LeadVariant, string> = {
  contato: "Novo pedido de orçamento",
  palestra: "Novo pedido de proposta de palestra",
  curso: "Novo interesse em curso",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function verifyTurnstile(token: FormDataEntryValue | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token }),
  });
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

async function deliverLead(lead: Lead): Promise<boolean> {
  const rows = (Object.keys(FIELD_LABELS) as (keyof Lead)[])
    .filter((key) => lead[key])
    .map((key) => [FIELD_LABELS[key]!, String(lead[key])] as const);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] RESEND_API_KEY não configurada — lead não enviado por e-mail:", Object.fromEntries(rows));
      return true;
    }
    console.error("[lead] RESEND_API_KEY não configurada em produção.");
    return false;
  }

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<table cellpadding="6">${rows
    .map(([label, value]) => `<tr><th align="left" valign="top">${escapeHtml(label)}</th><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL ?? `Site ${site.name} <site@edurodrigues.com.br>`,
      to: [process.env.LEAD_TO_EMAIL ?? contact.email],
      reply_to: lead.email,
      subject: `${SUBJECTS[lead.variant]} — ${lead.nome}`,
      text,
      html,
    }),
  });
  if (!response.ok) console.error("[lead] Falha no envio via Resend:", response.status, await response.text());
  return response.ok;
}

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const values = Object.fromEntries(
    [...formData.entries()].filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );

  // Honeypot: robôs preenchem o campo invisível. Fingimos sucesso para não dar pistas.
  if (values.website) return { status: "success" };

  const parsed = leadSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Confira os campos destacados.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  if (!(await verifyTurnstile(formData.get("cf-turnstile-response")))) {
    return { status: "error", message: "Não foi possível validar o envio. Tente novamente.", values };
  }

  const delivered = await deliverLead(parsed.data).catch((error: unknown) => {
    console.error("[lead] Erro inesperado:", error);
    return false;
  });
  if (!delivered) {
    return {
      status: "error",
      message: "Não conseguimos enviar sua mensagem agora. Tente novamente ou fale pelo WhatsApp.",
      values,
    };
  }

  return { status: "success" };
}
