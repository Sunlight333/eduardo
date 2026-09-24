import type { Metadata, Viewport } from "next";
import { Lato, Montserrat } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import { site } from "@/content/site";
import { personJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/primitives";
import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { Analytics, consentDefaultScript, GTM_ID } from "@/components/layout/analytics";
import { ConsentBanner } from "@/components/layout/consent-banner";

// Montserrat e Lato eram as fontes do site antigo; mantidas por continuidade.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#211919",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${lato.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="bg-brand-500 text-ink-900 font-display sr-only z-50 rounded-lg px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        <TopBar />
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        {GTM_ID && <ConsentBanner />}
        <JsonLd data={personJsonLd()} />
        {GTM_ID && (
          <Script id="consent-default" strategy="beforeInteractive">
            {consentDefaultScript}
          </Script>
        )}
        <Analytics />
      </body>
    </html>
  );
}
