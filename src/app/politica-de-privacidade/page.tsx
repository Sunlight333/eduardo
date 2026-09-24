import { contact, site } from "@/content/site";
import { Container, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/blocks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Política de privacidade",
  description: `Como ${site.name} coleta, usa e protege os dados enviados pelo site, conforme a LGPD.`,
  path: "/politica-de-privacidade/",
});

// REVISAR: modelo base alinhado à LGPD (Lei 13.709/2018). Recomenda-se revisão jurídica.
const sections = [
  {
    title: "1. Quem somos",
    body: [
      `Este site é mantido por ${site.name}, com sede na ${contact.address.street}, ${contact.address.neighborhood}, ${contact.address.city} – ${contact.address.state}. Para qualquer assunto relacionado a dados pessoais, fale pelo e-mail ${contact.email}.`,
    ],
  },
  {
    title: "2. Dados que coletamos",
    body: [
      "Formulários: nome, e-mail, WhatsApp e as informações que você escolher enviar (serviço, data, cidade, empresa, mensagem).",
      "Navegação: somente com o seu consentimento, cookies de medição (Google Tag Manager e ferramentas associadas) registram dados como páginas visitadas, dispositivo e origem do acesso.",
    ],
  },
  {
    title: "3. Para que usamos",
    body: [
      "Para responder ao seu contato, elaborar propostas e enviar informações sobre cursos e turmas que você pediu.",
      "Para entender, de forma agregada, como o site é usado e melhorar o conteúdo.",
    ],
  },
  {
    title: "4. Bases legais",
    body: [
      "Procedimentos preliminares a um contrato solicitados por você (art. 7º, V, da LGPD) e consentimento para cookies de medição (art. 7º, I).",
    ],
  },
  {
    title: "5. Compartilhamento",
    body: [
      "Os dados não são vendidos. Podem ser processados por fornecedores que viabilizam o site, como hospedagem, envio de e-mails e ferramentas de medição, sempre para as finalidades acima.",
    ],
  },
  {
    title: "6. Por quanto tempo guardamos",
    body: [
      "Mensagens de contato são mantidas pelo tempo necessário para o atendimento e eventual relação comercial, e depois excluídas, salvo obrigação legal de guarda.",
    ],
  },
  {
    title: "7. Seus direitos",
    body: [
      `Você pode pedir acesso, correção, portabilidade ou exclusão dos seus dados e revogar o consentimento a qualquer momento, pelo e-mail ${contact.email}. Para rever sua escolha sobre cookies, limpe os dados do site no navegador e o aviso aparecerá novamente.`,
    ],
  },
];

export default function PrivacidadePage() {
  return (
    <>
      <PageHero eyebrow="LGPD" title="Política de privacidade" lead="Transparência sobre os dados enviados por este site." />
      <Section tone="light" className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-3xl">{section.title}</h2>
                <div className="mt-3 space-y-3 leading-relaxed text-stone-700">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
