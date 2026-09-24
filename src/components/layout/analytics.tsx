import { GoogleTagManager } from "@next/third-parties/google";

import { CONSENT_STORAGE_KEY } from "@/lib/consent";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Google Consent Mode v2: tudo começa "negado" e só é liberado quando o
 * visitante aceita o banner (LGPD). Precisa rodar antes do GTM, por isso é
 * injetado com strategy="beforeInteractive" no layout raiz.
 */
export const consentDefaultScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{if(localStorage.getItem('${CONSENT_STORAGE_KEY}')==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}`;

/** Sem NEXT_PUBLIC_GTM_ID nada é carregado (dev e previews ficam fora das métricas). */
export function Analytics() {
  if (!GTM_ID) return null;
  return <GoogleTagManager gtmId={GTM_ID} />;
}
