import type { StaticImageData } from "next/image";

import abdl from "@/assets/images/clients/abdl.jpg";
import atlasEditora from "@/assets/images/clients/atlaseditora.jpg";
import christianFormon from "@/assets/images/clients/christianformon.jpg";
import folhaMetropolitana from "@/assets/images/clients/folhametropolitana.jpg";
import hbc from "@/assets/images/clients/hbc.jpg";
import herba from "@/assets/images/clients/herba.jpg";
import martmark from "@/assets/images/clients/martmark.jpg";
import metroNews from "@/assets/images/clients/metro-news.jpg";
import monitor from "@/assets/images/clients/monitor.jpg";
import mundo from "@/assets/images/clients/mundo.jpg";
import nextel from "@/assets/images/clients/nextel.jpg";
import prefGuarulhos from "@/assets/images/clients/prefguarulhos.jpg";
import prefSuzano from "@/assets/images/clients/prefsuzano.jpg";
import pt from "@/assets/images/clients/pt.jpg";
import puc from "@/assets/images/clients/puc.jpg";
import segurancaSp from "@/assets/images/clients/segurancasp.jpg";
import senac from "@/assets/images/clients/senac.jpg";
import shizen from "@/assets/images/clients/shizen.jpg";
import soccer from "@/assets/images/clients/soccer.jpg";
import starbyte from "@/assets/images/clients/starbyte.jpg";
import unidas from "@/assets/images/clients/unidas.jpg";
import vigorito from "@/assets/images/clients/vigorito.jpg";
import vilanova from "@/assets/images/clients/vilanova.jpg";
import zn from "@/assets/images/clients/zn.jpg";

export type Client = { name: string; logo: StaticImageData };

// Logos do site antigo (JPG 208×98 com fundo branco).
// REVISAR: pedir versões em SVG/PNG de alta resolução e confirmar autorização de uso.
export const clients: Client[] = [
  { name: "SENAC São Paulo", logo: senac },
  { name: "PUC", logo: puc },
  { name: "Nextel", logo: nextel },
  { name: "Unidas", logo: unidas },
  { name: "Prefeitura de Guarulhos", logo: prefGuarulhos },
  { name: "Prefeitura de Suzano", logo: prefSuzano },
  { name: "Secretaria da Segurança Pública — Governo de SP", logo: segurancaSp },
  { name: "Metro News", logo: metroNews },
  { name: "Folha Metropolitana", logo: folhaMetropolitana },
  { name: "Atlas Editora", logo: atlasEditora },
  { name: "Associação Brasileira de Difusão do Livro (ABDL)", logo: abdl },
  { name: "Herbalife", logo: herba },
  { name: "HBC Saúde", logo: hbc },
  { name: "Instituto Monitor", logo: monitor },
  { name: "Mundo Maior", logo: mundo },
  { name: "Mart Mark Publicidade", logo: martmark },
  { name: "Christian Formon Buffet", logo: christianFormon },
  { name: "Shizen", logo: shizen },
  { name: "Soccer Grass", logo: soccer },
  { name: "Starbyte", logo: starbyte },
  { name: "Vigorito", logo: vigorito },
  { name: "Vila Nova", logo: vilanova },
  { name: "Revista ZN", logo: zn },
  // REVISAR: logo de partido político (trabalhos de programa eleitoral). Avaliar
  // com o cliente se deve continuar em destaque num site comercial.
  { name: "Partido dos Trabalhadores", logo: pt },
];
